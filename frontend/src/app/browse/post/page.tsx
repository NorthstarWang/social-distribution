"use client";
import { InfiniteScrollPost } from '@/components/post/infinite-scroll-post';
import { Post } from '@/types/post';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

const BrowsePost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const fetchPosts = async () => {
    const newPosts: Post[] = await fetchMorePosts(page, pageSize);
    if (newPosts.length > 0) {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage(prevPage => prevPage + pageSize);
    }
  };

  async function fetchMorePosts(page: number, pageSize: number): Promise<Post[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/posts/${page}/${pageSize}/`);
    if (!response.ok) {
      toast.error('Failed to fetch posts');
      return [];
    }
    const data = await response.json();
    setHasMore(data.hasMore);
    return data.posts;
  }

  const fetchInitialPosts = async () => {
    const newPosts: Post[] = await fetchMorePosts(page, pageSize);
    setPosts(newPosts);
    setPage(pageSize);
  };

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  return (
    <InfiniteScrollPost
      initialData={posts}
      fetchData={fetchPosts}
      page={page}
      hasMore={hasMore}
    />
  );
}

export default BrowsePost