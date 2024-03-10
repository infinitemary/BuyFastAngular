// useFetchProducts.ts
import { useEffect } from "react";
import { useActionsUI } from "./useActions";
interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export const useUI = (): {
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  posts: Post[];
  page: number;
  isLoading: boolean;
} => {
  const { state, fetchNextPostAction, fetchPostAction } = useActionsUI();

  useEffect(() => {
    fetchPostAction();
  }, [state.page]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    fetchNextPostAction(e);
  };

  return {
    ...state,
    handleScroll,
  };
};
