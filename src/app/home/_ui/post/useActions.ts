import { FetchProductsService } from "@/ddd/product/application/FetchProductsService";
import { FakeStoreProductRepository } from "@/ddd/product/infrastructure/FakeStoreProductRepository";
import { useReducerUI } from "./useReducerUI";
export const useActionsUI = () => {
  const { state, fetchStart, fetchSuccess, incrementPage } = useReducerUI();
  return {
    state,
    fetchPostAction: async () => {
      fetchStart();
      const fetchProductsService = new FetchProductsService(
        new FakeStoreProductRepository()
      );
      const products = await fetchProductsService.execute(state.page);
      fetchSuccess(products);
    },
    fetchNextPostAction: (e: React.UIEvent<HTMLDivElement>) => {
      const hasReachedBottomOfList =
        e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
        e.currentTarget.clientHeight;
      if (hasReachedBottomOfList) incrementPage();
    },
  };
};
