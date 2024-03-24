import { Metadata } from "next"
import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Sidebar } from "@/components/sidebar"

export const metadata: Metadata = {
  title: "Discover",
  description: "Discover new and popular authors and posts.",
}

export default function Home() {
  return (
    <main className="flex flex-col">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid md:grid-cols-5">
              <Sidebar className="hidden md:block h-[calc(100vh-4.125rem)]" />
              <div className="col-span-3 md:col-span-4 md:border-l">
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
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Fresh Update
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Most recent delivery, still hot.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                          </div>
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
                            Most popular authors in the community with most followers.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Most Liked Authors
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Most popular authors in the community with most liked on their posts.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
    </main>
  )
}