"use client";
import { InfiniteScrollPost } from '@/components/post/infinite-scroll-post';
import { Post } from '@/types/post';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const BrowsePost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pageSize = 5;

  const fetchPosts = async () => {
    const newPosts: Post[] = await fetchMorePosts(posts.length>0?posts[posts.length-1].created:null, pageSize);
    if (newPosts.length > 0) {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    }
  };

  async function fetchMorePosts(timestamp: string | null, count: number): Promise<Post[]> {
    const endpoint = timestamp || new Date().toISOString();
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
  };

  const fetchLatestPostCreated = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/post/latest/created/`);
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
    const newLatestPostTimestamp = await fetchLatestPostCreated();
    if (newLatestPostTimestamp && posts.length > 0 && newLatestPostTimestamp > posts[0].created) {
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