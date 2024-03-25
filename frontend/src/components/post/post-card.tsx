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

type CardProps = React.ComponentProps<typeof Card> & {
  post: Post;
};

export function PostCard({ className, post, ...props }: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

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
      <CardFooter className="flex flex-col space-y-4 pb-6">
        <div className="flex justify-between w-full">
          <CardDescription>5,646 likes</CardDescription>
          <CardDescription className="flex justify-end">
            {post.count} comments
          </CardDescription>
        </div>
        <Separator />
        <div className="flex justify-between w-full mt-2">
          <Link
            href="/"
            size="2"
            color="indigo"
            weight="medium"
            underline="none"
            highContrast
          >
            <div className="flex items-center justify-center gap-1">
              <HeartIcon />
              <span>Like</span>
            </div>
          </Link>
          <Link
            href="/"
            size="2"
            color="indigo"
            weight="medium"
            underline="none"
            highContrast
          >
            <div className="flex items-center justify-center gap-1">
              <EyeOpenIcon />
              <span>Follow</span>
            </div>
          </Link>
          <Link
            href="/"
            size="2"
            color="indigo"
            weight="medium"
            underline="none"
            highContrast
          >
            <div className="flex items-center justify-center gap-1">
              <ChatBubbleIcon />
              <span>Comment</span>
            </div>
          </Link>
          <Link
            href="/"
            size="2"
            color="indigo"
            weight="medium"
            underline="none"
            highContrast
          >
            <div className="flex items-center justify-center gap-1">
              <PaperPlaneIcon />
              <span>Share</span>
            </div>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
