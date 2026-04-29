'use client';

import {serialize} from '@/lib/search-params';
import {FC, Fragment, useEffect} from 'react';
import useSWRInfinite from 'swr/infinite';
import {useMenuQueries} from './OurMenuQueries';
import {API_BASE_URL} from '@/lib/utils';
import {useInView} from 'react-intersection-observer';
import {MenuItem} from './MenuItem';
import {LoaderIcon} from 'lucide-react';
import {ProductItem} from '@/app/types';
import {Skeleton} from '@/components/ui/skeleton';

const OurMenuGrid = () => {
  const fetcher = (url: string) =>
    fetch(url).then(async (r) => {
      const res = await r.json();
      return res?.data;
    });
  const {setName, typeName, pageSize} = useMenuQueries();

  const queryString = serialize({
    'filter[sets.name]': setName,
    'filter[types.name]': typeName,
    'page[size]': pageSize || 15,
    include: 'images'
  });

  const url = `${API_BASE_URL}/items/${queryString}`;

  const {data, error, size, setSize, isValidating, mutate, isLoading} =
    useSWRInfinite((index) => `${url}&page[number]=${index + 1}`, fetcher);

  const products = data ? [].concat(...(data as [])) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && (data[data.length - 1]?.length as number) < 15);
  const {ref, inView} = useInView();

  useEffect(() => {
    if (inView && !isLoadingMore && !isReachingEnd) {
      setSize(size + 1);
    }
  }, [inView, isLoadingMore]);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
        {isLoading ? (
          [...Array(9)].map((_, i) => (
            <Skeleton className="min-h-[220px] w-full" key={i} />
          ))
        ) : products?.length > 0 ? (
          products.map((item: ProductItem, index: number) => {
            const key = item?.id + item.name + index;
            return (
              <Fragment key={key}>
                <MenuItem
                  related={item?.related}
                  name={item?.name}
                  description={item?.description}
                  amount={item?.amount}
                />
                {index === products?.length - 1 && (
                  <div ref={ref} style={{height: '1px'}} />
                )}
              </Fragment>
            );
          })
        ) : (
          <p className="text-center text-gray-400 mt-10 col-span-full text-sm sm:text-base">
            No items available.
          </p>
        )}

        {/* <Skeleton className="min-h-[220px] w-full" /> */}

        {isLoadingMore && (
          <div className="bottom-0 flex h-10 w-full items-center justify-center bg-background">
            <LoaderIcon className="animate-spin repeat-infinite" />
          </div>
        )}
      </div>
    </>
  );
};

export default OurMenuGrid;
