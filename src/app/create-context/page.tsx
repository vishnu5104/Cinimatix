"use client";

import React, { useState } from "react";
import { trpc } from "@server/client";
import ThumbnailCard from "@/components/ThumbnailCard";

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYmYyZDIzMy02ZjgwLTRhYmYtYjlhYy03MDc1ODhmZGJkOWMiLCJlbWFpbCI6InZpc2hudXM1MTA0MTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijk4OGUyNzliM2E4YTExNzVhNWJjIiwic2NvcGVkS2V5U2VjcmV0IjoiOGE5MjYyNzI5NDJhMGM1NzA4ZWIwNzhlNzdkNDM2NzU1ODY3YzRkYTUxNWQxZjE0MDMxODkwZDljN2ZkNWM0NiIsImlhdCI6MTcyMzI5ODY1MX0.EhWRF95QnPson9C_jGVmgilCoxEqXg9BkI8BJw5aGZE";

console.log("the JWT", JWT);

const CreateContext = () => {
  const [file, setFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const getFiles = trpc.user.getFiles.useQuery();

  const uploadFile = trpc.user.uploadFile.useMutation({
    onSettled: () => {
      getFiles.refetch();
    },
  });

  console.log("the uplaod thumbnail is", getFiles.data);
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUploadToIPFS = async (file: any) => {
    if (!file) return;

    try {
      const data = new FormData();
      data.append("file", file);

      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: data,
        }
      );

      const result = await response.json();
      setThumbnailUrl(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
      console.log("the hash was successfully", result);
      return result.IpfsHash;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (file) {
      const thumbnailHash = await handleUploadToIPFS(file);
      console.log("th url", thumbnailHash);
      if (thumbnailHash) {
        // Save to database using tRPC
        uploadFile.mutate(
          {
            userId: 2343115,
            fileUrl: `https://gateway.pinata.cloud/ipfs/${thumbnailHash}`,
          },
          {
            onSuccess: () => {
              console.log("File uploaded successfully!");
            },
            onError: (error) => {
              console.error("Error uploading file:", error);
            },
          }
        );
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div className="w-full flex flex-col justify-between items-center mx-[20px]">
      <h1>Thumbnail Design Context</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="file"
            className="block text-lg font-medium text-gray-700"
          >
            Upload Thumbnail
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Upload
        </button>
      </form>

      <div className="flex flex-wrap gap-[20px] ml-[30px] mt-[20px]">
        {getFiles.data?.map((file, index) => (
          <div key={index}>
            <ThumbnailCard
              link={file.url}
              fileId={file.id}
              userId={file.userId}
            />
          </div>
        ))}
      </div>

      {/* {thumbnailUrl && (
        <div className="mt-4">
          <img
            src={thumbnailUrl}
            alt="Thumbnail Preview"
            className="w-full h-auto"
          />
        </div>
      )} */}
    </div>
  );
};

export default CreateContext;
