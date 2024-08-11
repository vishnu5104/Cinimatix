import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYmYyZDIzMy02ZjgwLTRhYmYtYjlhYy03MDc1ODhmZGJkOWMiLCJlbWFpbCI6InZpc2hudXM1MTA0MTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijk4OGUyNzliM2E4YTExNzVhNWJjIiwic2NvcGVkS2V5U2VjcmV0IjoiOGE5MjYyNzI5NDJhMGM1NzA4ZWIwNzhlNzdkNDM2NzU1ODY3YzRkYTUxNWQxZjE0MDMxODkwZDljN2ZkNWM0NiIsImlhdCI6MTcyMzI5ODY1MX0.EhWRF95QnPson9C_jGVmgilCoxEqXg9BkI8BJw5aGZE";

console.log("the key", JWT);
const DialogModel = ({ isDialogOpen, setIsDialogOpen, onSubmit }: any) => {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setThumbnail(file);
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
      return result.IpfsHash;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    const thumbnailHash = await handleUploadToIPFS(thumbnail);
    onSubmit({ title, theme, thumbnail: thumbnailHash });
    setIsDialogOpen();
    setTitle("");
    setTheme("");
    setThumbnail(null);
    setThumbnailUrl("");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 dark:bg-white">
        <DialogHeader>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              className="col-span-3 text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Theme
            </Label>
            <Input
              id="username"
              className="col-span-3 text-black"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">
              Thumbnail
            </Label>
            <Input
              id="picture"
              type="file"
              className="col-span-3"
              onChange={handleFileChange}
            />
          </div>
          {thumbnailUrl && (
            <div className="col-span-4 mt-4">
              <img
                src={thumbnailUrl}
                alt="Thumbnail Preview"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModel;
