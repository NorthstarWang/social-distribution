"use client";
import { InfiniteScrollPost } from '@/components/post/infinite-scroll-post';
import { Post } from '@/types/post';
import React, { useCallback, useEffect, useState } from 'react';

const BrowsePost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    const newPosts: Post[] = await fetchMorePosts(posts.length / 4 + 1);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setHasMore(newPosts.length > 0);
  }, [posts.length]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function fetchMorePosts(page: number): Promise<Post[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPosts: Post[] = [];
        for (let i = 0; i < 4; i++) {
          const uniqueId = `post-${new Date().getTime()}-${Math.floor(Math.random() * 10000)}`;
          newPosts.push({
            id: `post-${uniqueId}`,
            title: `Post ${uniqueId}`,
            description: 'This is a post description.',
            content: 'This is a simulated post content. It contains details about the post.',
            contentType: 'text/markdown',
            source: 'https://source.example.com',
            origin: 'https://origin.example.com',
            published: new Date(),
            visibility: 'PUBLIC',
            count: Math.floor(Math.random() * 100), // Random number of comments
            author: {
              id: `author-${uniqueId}`,
              host: 'https://host.example.com',
              displayName: `Author ${uniqueId}`,
              github: 'https://github.com/example',
              profileImage: 'https://example.com/profile-image.png',
              username: `author-${uniqueId}`,
              bio: 'This is a simulated author bio.',
            },
          });
        }
        resolve(newPosts);
      }, 1000);
    });
  }

  return (
    <InfiniteScrollPost
      initialData={posts}
      fetchData={fetchPosts}
      hasMore={hasMore}
    />
  );
}

export default BrowsePost