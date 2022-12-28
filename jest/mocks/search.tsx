import type { SearchMutation, SearchProviderInnerProps, SearchState } from "@/contexts/search/SearchContext";
import { defaultSearchState, SearchProviderInner } from "@/contexts/search/SearchContext";

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
