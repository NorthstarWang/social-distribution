"use client";

import {
  ChatBubbleIcon,
  ChevronDownIcon,
  PaperPlaneIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  HeartIcon,
  HeartFilledIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HoverCard,
  Link,
  Text,
} from "@radix-ui/themes";
import { Separator } from "@/components/ui/separator";
import { useLayoutEffect, useRef, useState } from "react";
import { Post } from "@/types/post";
import { Author } from "@/types/author";
import { CommentSection } from "@/components/post/comment-section";
import { Button } from "@/components/ui/button";
import { CustomDialog } from "@/components/custom-dialog";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type CardProps = React.ComponentProps<typeof Card> & {
  post: Post;
};

export function PostCard({ className, post, ...props }: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const author: Author = post.author;

  useLayoutEffect(() => {
    const currentContentRef = contentRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { height } = entry.contentRect;
        setIsOverflowing(height >= 360);
      }
    });

    if (currentContentRef) {
      resizeObserver.observe(currentContentRef);
    }

    return () => {
      if (currentContentRef) {
        resizeObserver.unobserve(currentContentRef);
      }
    };
  }, []);

  const handleCopyToClipboard = () => {
    const input = inputRef.current;
    if (input) {
      navigator.clipboard.writeText(input.value).then(() => {
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
        }, 2000);
      });
    }
  };

  return (
    <Card className={cn("w-full mb-8", className)} {...props}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          <HoverCard.Root>
            <HoverCard.Trigger>
              <Link href="#" target="_blank">
                @{author.displayName}
              </Link>
            </HoverCard.Trigger>
            <HoverCard.Content maxWidth="300px">
              <Flex gap="4">
                <Avatar
                  size="3"
                  fallback="R"
                  radius="full"
                  src={author.profileImage}
                />
                <Box>
                  <Heading size="3" as="h3">
                    {author.displayName}
                  </Heading>
                  <Text as="div" size="2" color="gray" mb="2">
                    {author.github}
                  </Text>
                  <Text as="div" size="2">
                    {author.bio || "This user has no bio."}
                  </Text>
                </Box>
              </Flex>
            </HoverCard.Content>
          </HoverCard.Root>
        </CardDescription>
      </CardHeader>
      <CardContent
        ref={contentRef}
        className={`grid gap-4 ${
          !isExpanded ? "max-h-96 overflow-hidden" : ""
        }`}
      >
        {post.content}
      </CardContent>
      {isOverflowing && !isExpanded && (
        <Link
          onClick={() => setIsExpanded(true)}
          color="indigo"
          size="2"
          weight="medium"
          underline="hover"
          highContrast
          className="flex flex-col justify-between h-full py-6"
        >
          <div className="flex items-center justify-center cursor-pointer">
            <ChevronDownIcon className="w-4 h-4" aria-hidden="true" />
            <span>Read More</span>
          </div>
        </Link>
      )}
      <CardFooter className="flex flex-col space-y-2 pb-2">
        <div className="flex justify-between w-full">
          <CardDescription>5,646 likes</CardDescription>
          <CardDescription className="flex justify-end">
            {post.count} comments
          </CardDescription>
        </div>
        <Separator />
        <div className="flex justify-between w-full">
          <Button
            variant="link"
            className="flex items-center justify-center gap-1 p-0"
          >
            <HeartIcon className="h-4 w-4" />
            Like
          </Button>
          <Button
            variant="link"
            className="flex items-center justify-center gap-1 p-0"
          >
            <EyeOpenIcon className="h-4 w-4" />
            Follow
          </Button>
          <CustomDialog
            trigger={
              <Button
                variant="link"
                className="flex items-center justify-center gap-1 p-0"
              >
                <ChatBubbleIcon className="h-4 w-4" />
                Comment
              </Button>
            }
            title="Comment"
            titleDescription="Leave your comment to the post"
            content={<CommentSection />}
            footer={<Button variant="outline">Cancel</Button>}
            width="6xl"
          />
          <CustomDialog
            trigger={
              <Button
                variant="link"
                className="flex items-center justify-center gap-1 p-0"
              >
                <PaperPlaneIcon className="h-4 w-4" />
                Share
              </Button>
            }
            title="Share"
            titleDescription="Share this post with the url below"
            content={
              <div className="flex w-full items-center space-x-2">
                <Input ref={inputRef} type="string" value={123} disabled />
                <TooltipProvider disableHoverableContent>
                  <Tooltip defaultOpen={false} disableHoverableContent open={showTooltip}>
                    <TooltipTrigger asChild>
                      <Button onClick={handleCopyToClipboard}>
                        Copy to Clipboard
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Copied!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            }
            footer={<></>}
            width="lg"
          />
        </div>
      </CardFooter>
    </Card>
  );
}
