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
import { Icons } from "@/components/icons";
import { CustomDropdown } from "@/components/custom-dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CustomMarkdown } from "@/components/custom-markdown";

export function CreatePost() {
  const { author } = useContext(AuthorContext);
  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lessHeight, setLessHeight] = useState(false);
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setLessHeight(window.innerHeight < 764);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
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
        toast.error("Cloudinary upload error");
      } else {
        const data = await response.json();
        imageUrl = data.secure_url;
      }
    } catch (error) {
      toast.error("Error uploading image to Cloudinary");
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
    if (!title.trim() || !markdown.trim()) {
      toast.error("Title and content of the post cannot be empty");
      return;
    }

    const payload = {
      title,
      content: markdown,
      visibility,
    };

    const promise = () =>
      new Promise<void>(async (resolve, reject) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/service/post/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
              credentials: "include",
            }
          );

          if (response.ok) {
            resolve();
          } else {
            reject("Failed to submit post");
          }
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise(), {
      loading: "Submitting your post...",
      success: () => {
        setPostDialogOpen(false);
        setMarkdown("");
        setTitle("");
        setVisibility("public");
        return "Your post had been submitted successfully";
      },
      error: () => {
        return "Failed to submit post";
      },
    });
  };

  const handleVisibilityChange = (newVisibility: string) => {
    setVisibility(newVisibility);
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
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
          content={<></>}
          footer={<></>}
          width="lg"
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
          open={postDialogOpen}
          onOpenChange={setPostDialogOpen}
          content={
            <div
              className={`flex flex-col space-y-4 ${
                lessHeight
                  ? "h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)]"
                  : "h-[calc(100vh-12rem)] md:h-[calc(100vh-20rem)]"
              }`}
            >
              <div className="grid w-full max-w-sm items-center px-4 md:px-0 gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="string"
                  id="title"
                  placeholder="Write your title here..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 px-4 md:px-0 gap-6 lg:grid-rows-1 h-full
              ${
                lessHeight
                  ? "max-h-[calc(100vh-16rem)]"
                  : "max-h-[calc(100vh-24rem)]"
              }`}
              >
                <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                  <Textarea
                    value={markdown}
                    onChange={handleMarkdownChange}
                    className={`${
                      lessHeight ? "h-[calc(100vh-16rem)]" : "h-full"
                    }`}
                    style={{ resize: "none" }}
                  />
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
                      <Icons.spinner className="animate-spin" />
                    </div>
                  )}
                </div>
                <div
                  className={`rounded-md border p-2 overflow-auto ${
                    lessHeight ? "hidden md:block" : ""
                  }`}
                >
                  <CustomMarkdown content={markdown} />
                </div>
              </div>
              <div className="flex justify-end items-center space-x-2 px-4 md:px-0">
                <CustomDropdown
                  title="Visible to"
                  optionalText
                  description="Select the visibility of the post"
                  options={[
                    { value: "public", label: "Public" },
                    { value: "private", label: "Private" },
                    { value: "unlisted", label: "Unlisted" },
                  ]}
                  onOptionChange={handleVisibilityChange}
                  defaultIndex={0}
                />
                <Button onClick={handleSubmit}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Publish
                </Button>
              </div>
            </div>
          }
          footer={<></>}
          width="6xl"
        />
      </Card>
      <Separator className="flex mx-auto mb-4 max-w-4xl" />
    </>
  );
}
