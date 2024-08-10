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

const JWT = process.env.JWT;

console.log("the key", JWT);
const DialogModel = ({ isDialogOpen, setIsDialogOpen, onSubmit }: any) => {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleUploadToIPFS = async (file) => {
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
