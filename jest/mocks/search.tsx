import type {
  SearchMutation,
  SearchProviderInnerProps,
  SearchState,
} from "@/components/organisms/SearchArea/SearchContext";
import { defaultSearchState, SearchProviderInner } from "@/components/organisms/SearchArea/SearchContext";

export const defaultMockSearchMutation: SearchMutation = {
  setHistory: jest.fn(),
  setSelectedCategory: jest.fn(),
  setSelectedTags: jest.fn(),
  setText: jest.fn(),
};

export const withMockSearchContext = (
  children: React.ReactElement,
  state?: Partial<SearchProviderInnerProps["state"]>
): React.ReactElement => {
  const mockSearchState: SearchState = {
    ...defaultSearchState,
    ...state,
  };

  return (
    <SearchProviderInner state={mockSearchState} mutation={defaultMockSearchMutation}>
      {children}
    </SearchProviderInner>
  );
};

export { defaultSearchState };
