"use client";

import { PostVerticalListComponent } from "@/components/Post/PostVerticalListComponent";
import { useUI } from "./useUI";

export default function PostFeedUI() {
  const { handleScroll, posts, isLoading } = useUI();

  return (
    <PostVerticalListComponent
      handleScroll={handleScroll}
      posts={posts}
      isLoading={isLoading}
    />
  );
}
