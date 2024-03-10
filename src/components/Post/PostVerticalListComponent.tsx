import React from "react";
import { PostComponent } from "./PostComponent";
import { PostLoadingComponent } from "./PostLoadingComponent";

interface Post {
  id: string | number;
  title: string;
  description: string;
  image: string;
  price: number;
}

// Define the props interface
interface Props {
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  posts: Post[];
  isLoading: boolean; // Assuming you want to pass the loading state as a prop
}

export const PostVerticalListComponent: React.FC<Props> = ({
  handleScroll,
  posts,
  isLoading,
}) => {
  return (
    <div onScroll={handleScroll} className="h-screen overflow-auto bg-gray-200">
      {posts.map((post, index) => (
        <>
          <PostComponent
            key={post.id}
            id={post.id.toString()}
            title={post.title}
            description={post.description}
            image={post.image}
            price={post.price}
          />
          {isLoading && <PostLoadingComponent key={"PL" + post.id} />}
        </>
      ))}
    </div>
  );
};
