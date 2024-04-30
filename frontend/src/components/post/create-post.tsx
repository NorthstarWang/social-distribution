"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLinkIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { UserAvatar } from "@/components/user-avatar";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { AuthorContext } from "@/components/context/authContext";
import { CustomDialog } from "@/components/custom-dialog";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import { Icons } from "@/components/icons";
import remarkGfm from 'remark-gfm';
import { CustomDropdown } from "@/components/custom-dropdown";

export function CreatePost() {
  const { author } = useContext(AuthorContext);
  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lessHeight, setLessHeight] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setLessHeight(window.innerHeight < 764);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


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
    setIsLoading(true);
    const formData = new FormData();
    let imageUrl = "";
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary upload error: ", errorData);
      } else {
        const data = await response.json();
        imageUrl = data.secure_url;
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary: ", error);
    } finally {
      setIsLoading(false);
      return imageUrl;
    }
  };

  const insertImageToMarkdown = (imageUrl: string) => {
    const imageMarkdown = `![Image](${imageUrl})\n`;
    setMarkdown((prevMarkdown) => prevMarkdown + imageMarkdown);
  };

  const handleSubmit = async () => {
    const payload = { markdown };
    try {
      const response = await fetch('/api/submit-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        console.log("Post submitted successfully");
      } else {
        console.error("Failed to submit post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
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
          title="Write a Post"
          titleDescription="Write the post to the community"
          content={
            <div className="flex flex-col space-y-4 h-[calc(100vh-12rem)] md:h-[calc(100vh-20rem)]">
              <div className="grid h-full grid-cols-1 md:grid-cols-2 px-4 md:px-0 gap-6 lg:grid-rows-1">
                <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                  <Textarea
                    value={markdown}
                    onChange={handleMarkdownChange}
                    className="h-full"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
                      <Icons.spinner className="animate-spin" />
                    </div>
                  )}
                </div>
                <div className={`rounded-md border bg-muted p-2 overflow-auto h-full ${lessHeight ? "hidden" : ""}`}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                </div>
              </div>
              <div className="flex justify-end items-center space-x-2">
                <CustomDropdown title="Visibility" description="Select the visibility of the post" options={[{ value: "public", label: "Public" }, { value: "private", label: "Private" }, { value: "unlisted", label: "Unlisted" } ]} />
              <Button onClick={handleSubmit}>Publish</Button>
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
