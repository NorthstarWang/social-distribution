"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLinkIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { UserAvatar } from "@/components/user-avatar";
import { SetStateAction, useContext, useState } from "react";
import { AuthorContext } from "@/components/context/authContext";
import { CustomDialog } from "@/components/custom-dialog";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";

export function CreatePost() {
  const { author } = useContext(AuthorContext);
  const [markdown, setMarkdown] = useState("");

  const handleMarkdownChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMarkdown(event.target.value);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (
      event.dataTransfer.items &&
      event.dataTransfer.items[0].kind === "file"
    ) {
      const file = event.dataTransfer.items[0].getAsFile();
      if (file) {
        const imageUrl = await uploadImageToCloudinary(file as Blob);
        insertImageToMarkdown(imageUrl);
      }
    }
  };

  const uploadImageToCloudinary = async (file: Blob) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary upload error: ", errorData);
        return null; // Handle this accordingly in your UI
      }
  
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary: ", error);
      return null; // Handle this accordingly in your UI
    }
  };
  

  const insertImageToMarkdown = (imageUrl: any) => {
    const imageMarkdown = `![Image](${imageUrl})\n`;
    setMarkdown((prevMarkdown) => prevMarkdown + imageMarkdown);
  };

  return (
    <>
      <Card className="flex mx-auto justify-around items-center max-w-lg w-full mb-4 px-2 py-6">
        <UserAvatar author={author} dimension={10} dropdown={false} />
        <CustomDialog
          trigger={
            <Button className="gap-1">
              <ExternalLinkIcon />
              Share a Post
            </Button>
          }
          title="Share a Post"
          titleDescription="Share the post via the shareble URI"
          content={<></>}
          footer={<></>}
        />
        <CustomDialog
          trigger={
            <Button className="gap-1">
              <Pencil2Icon />
              Write a Post
            </Button>
          }
          title="Share a Post"
          titleDescription="Share the post via the shareble URI"
          content={
            <div className="flex flex-col space-y-4">
              <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                  <Textarea
                    value={markdown}
                    onChange={handleMarkdownChange}
                    placeholder="We're writing to [inset]. Congrats from OpenAI!"
                    className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                  />
                </div>
                <div className="rounded-md border bg-muted p-2 overflow-auto  max-h-[300px] lg:max-h-[700px]">
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button>Submit</Button>
              </div>
            </div>
          }
          footer={<></>}
        />
      </Card>
      <Separator className="flex mx-auto mb-4 max-w-4xl" />
    </>
  );
}
