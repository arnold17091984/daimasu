import {useQueryStates} from 'nuqs';
import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString
} from 'nuqs/server';

export let searchParams = {
  'page[number]': parseAsInteger.withDefault(1),
  'page[size]': parseAsInteger.withDefault(15),
  'filter[q]': parseAsString.withDefault(''),
  'filter[sets.name]': parseAsString.withDefault(''),
  'filter[types.name]': parseAsString.withDefault(''),
  sort: parseAsString.withDefault(''),
  include: parseAsString.withDefault('')
};

export function useNuqsState() {
  return useQueryStates(searchParams);
}

export let serialize = createSerializer(searchParams, {clearOnDefault: true});
export const searchParamsCache = createSearchParamsCache(searchParams);
