import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostCard } from "@/components/post/post-card";
import { Post } from "@/types/post";
import { Icons } from "@/components/icons";

interface InfiniteScrollPostProps {
  initialData: Post[];
  fetchData: () => void;
  hasMore: boolean;
}

export const InfiniteScrollPost: React.FC<InfiniteScrollPostProps> = ({
  initialData,
  fetchData,
  hasMore,
}) => {
  return (
    <div id="scrollableDiv" className="p-8 h-full overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-foreground scrollbar-track-background">
        <InfiniteScroll
          dataLength={initialData.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<div className=" flex justify-center"><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></div>}
          scrollableTarget="scrollableDiv"
          style={{ overflow: "hidden" }}
        >
          {initialData.map((item: Post) => (
            <PostCard key={item.id} post={item} />
          ))}
        </InfiniteScroll>
    </div>
  );
};
