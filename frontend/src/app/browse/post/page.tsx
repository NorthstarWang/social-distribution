"use client";
import { InfiniteScrollPost } from '@/components/post/infinite-scroll-post';
import { Post } from '@/types/post';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const BrowsePost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [lastPostId, setLastPostId] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pageSize = 5;

  const fetchPosts = async () => {
    const newPosts: Post[] = await fetchMorePosts(lastPostId, pageSize);
    if (newPosts.length > 0) {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setLastPostId(newPosts[newPosts.length - 1]?.id ?? null);
    }
  };

  async function fetchMorePosts(postId: string | null, count: number): Promise<Post[]> {
    const endpoint = postId ? `${postId}` : '0';
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/posts/${endpoint}/${count}/`);
    if (!response.ok) {
      const data = await response.json();
      toast.error(data.error);
      return [];
    }
    const data = await response.json();
    setHasMore(!data.reach_end);
    return data.posts;
  }

  const fetchInitialPosts = async () => {
    const newPosts: Post[] = await fetchMorePosts(null, pageSize);
    setPosts(newPosts);
    if (newPosts.length > 0) {
      setLastPostId(newPosts[newPosts.length - 1]?.id ?? null);
    }
  };

  const fetchLatestPostId = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/post/latest/id/`);
    if (!response.ok) {
      const data = await response.json();
      toast.error(data.error);
      return null;
    }
    const data = await response.json();
    if (!data.post_attribute){
      return null;
    }
    return data.post_attribute;
  };

  
  const fetchNewPosts = async (timestamp: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/posts/latest/${timestamp}/`);
    if (!response.ok) {
      const data = await response.json();
      toast.error(data.error);
      return [];
    }
    const data = await response.json();
    return data.posts;
  };

  const checkForNewPosts = async () => {
    const newLatestPostId = await fetchLatestPostId();
    if (newLatestPostId && posts.length > 0 && newLatestPostId !== posts[0].id) {
      const latestTimestamp = posts[0].created;
      const newPosts = await fetchNewPosts(latestTimestamp);
      if (newPosts.length > 0) {
        setPosts((prevPosts) => [...newPosts, ...prevPosts]);
      }
    }
  };

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  useEffect(() => {
    
    intervalRef.current = setInterval(checkForNewPosts, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [posts]);

  return (
    <InfiniteScrollPost
      initialData={posts}
      fetchData={fetchPosts}
      hasMore={hasMore}
    />
  );
}

export default BrowsePost