import { useReducer } from "react";

// Define Post interface for type safety.
interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

// Define State interface to describe the shape of your state.
interface State {
  posts: Post[];
  page: number;
  isLoading: boolean;
}

// Enumerate actions for type safety and to avoid typos in action types.
enum ActionTypes {
  FetchStart = "FETCH_START",
  FetchSuccess = "FETCH_SUCCESS",
  IncrementPage = "INCREMENT_PAGE",
}

// Define Action types to clarify the reducer's expected actions.
type Action =
  | { type: ActionTypes.FetchStart }
  | { type: ActionTypes.FetchSuccess; payload: Post[] }
  | { type: ActionTypes.IncrementPage };

// Reducer function managing state transitions.
const productReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.FetchStart:
      return { ...state, isLoading: true };
    case ActionTypes.FetchSuccess:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, ...action.payload],
      };
    case ActionTypes.IncrementPage:
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};

// Initial state of the reducer.
const initialState: State = {
  posts: [],
  page: 1,
  isLoading: false,
};

// Custom hook to utilize the defined reducer and actions.
export const useReducerUI = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Action dispatchers simplify the interaction with the reducer.
  const fetchStart = () => dispatch({ type: ActionTypes.FetchStart });
  const fetchSuccess = (payload: Post[]) =>
    dispatch({ type: ActionTypes.FetchSuccess, payload });
  const incrementPage = () => dispatch({ type: ActionTypes.IncrementPage });

  return { state, fetchStart, fetchSuccess, incrementPage };
};
