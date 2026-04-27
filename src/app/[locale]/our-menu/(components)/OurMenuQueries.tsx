'use client';

import {searchParams} from '@/lib/search-params';
import {useQueryState} from 'nuqs';
import {useCallback, useMemo} from 'react';

export function useMenuQueries() {
  const [typeName, setTypeName] = useQueryState(
    'filter[types.name]',
    searchParams['filter[types.name]']
      .withOptions({shallow: false, history: 'push'})
      .withDefault('')
  );
  const [setName, setSetName] = useQueryState(
    'filter[sets.name]',
    searchParams['filter[sets.name]']
      .withOptions({shallow: false, history: 'push'})
      .withDefault('')
  );

  const [pageSize, setPageSize] = useQueryState(
    'page[size]',
    searchParams['page[size]']
      .withOptions({shallow: false, history: 'push'})
      .withDefault(15)
  );
  const [pageNumber, setPageNumber] = useQueryState(
    'page[number]',
    searchParams['page[number]'].withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSetName(null);
    setTypeName(null);
    setPageSize(15);
    setPageNumber(1);
  }, [setSetName, setTypeName, setPageSize, setPageNumber]);

  const isAnyFilterActive = useMemo(() => {
    return !!typeName || !!setName;
  }, [typeName, setName]);

  return {
    typeName,
    setName,
    pageSize,
    pageNumber,
    setTypeName,
    setSetName,
    setPageSize,
    setPageNumber,
    resetFilters,
    isAnyFilterActive
  };
}
