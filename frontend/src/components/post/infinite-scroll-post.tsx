import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostCard } from "./post-card";
import { Post } from "@/types/post";

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
    <div id="scrollableDiv" className="h-full overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-foreground scrollbar-track-background">
      <div className="p-8">
        <InfiniteScroll
          dataLength={initialData.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          {initialData.map((item: Post) => (
            <PostCard key={item.id} post={item} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};
