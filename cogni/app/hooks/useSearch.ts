import { useState, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const debouncedSearch = useRef(
    debounce((query: string, callback: (query: string) => void) => {
      callback(query);
    }, 300)
  ).current;

  const handleSearch = useCallback(
    (query: string, callback: (query: string) => void) => {
      setSearchQuery(query);
      debouncedSearch(query, callback);
    },
    [debouncedSearch]
  );

  return {
    searchQuery,
    handleSearch,
  };
}