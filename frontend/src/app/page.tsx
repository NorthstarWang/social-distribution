import { Metadata } from "next";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CustomResizable from "@/components/custom-resizable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Discover",
  description: "Discover new and popular authors and posts.",
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="bg-background">
        <CustomResizable>
          <div className="col-span-3 md:col-span-4">
            <div className="h-full px-4 py-6 md:px-8">
              <Tabs defaultValue="post" className="h-full space-y-6">
                <div className="space-between flex items-center">
                  <TabsList>
                    <TabsTrigger value="post" className="relative">
                      Post
                    </TabsTrigger>
                    <TabsTrigger value="author">Author</TabsTrigger>
                    <TabsTrigger value="node" disabled>
                      Node
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent
                  value="post"
                  className="border-none p-0 outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Most Liked
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Most popular in the community.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Link href="/browse/post">
                        <Button className="btn btn-primary">View More</Button>
                      </Link>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4"></div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                  <div className="flex items-center mt-6 justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Fresh Update
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Most recent delivery, still hot.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Link href="/browse/post">
                        <Button className="btn btn-primary">View More</Button>
                      </Link>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4"></div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </TabsContent>
                <TabsContent
                  value="author"
                  className="border-none p-0 outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Top Authors
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Most popular authors in the community with most
                        followers.
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Link href="/browse/post">
                        <Button className="btn btn-primary">View More</Button>
                      </Link>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4"></div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                  <div className="flex items-center mt-6 justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Most Liked Authors
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Most popular authors in the community with most liked on
                        their posts.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Link href="/browse/post">
                        <Button className="btn btn-primary">View More</Button>
                      </Link>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4"></div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CustomResizable>
      </div>
    </main>
  );
}
