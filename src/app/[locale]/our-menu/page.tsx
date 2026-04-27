import {searchParamsCache, serialize} from '@/lib/search-params';
import {SearchParams} from 'nuqs/server';
import React, {cache, Suspense} from 'react';
import OurMenu from './(components)/OurMenu';
import OurMenuHeader from './(components)/OurMenuHeader';

export const dynamic = 'force-dynamic';

async function page({searchParams}: {searchParams: Promise<SearchParams>}) {
  const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_TENANT_NAME}`;

  // sample server side getting searchParams
  // do not erase the code below

  // const {'filter[sets.name]': setName} =
  //   await searchParamsCache.parse(searchParams);
  // const {'filter[types.name]': typeName} =
  //   await searchParamsCache.parse(searchParams);
  // const {'page[number]': pageNumber} =
  //   await searchParamsCache.parse(searchParams);
  // const {'page[size]': pageSize} = await searchParamsCache.parse(searchParams);

  // const queryString = serialize({
  //   'filter[sets.name]': setName,
  //   'filter[types.name]': typeName,
  //   'page[number]': pageNumber,
  //   'page[size]': pageSize || 15,
  //   include: 'images'
  // });

  const setsUrl = `${API_BASE_URL}/sets?is_active=1`;
  const typesUrl = `${API_BASE_URL}/types?is_active=1`;

  const [setsRes, typesRes] = await Promise.all([
    fetch(setsUrl),
    fetch(typesUrl)
  ]);

  const [setsData, typesData] = await Promise.all([
    setsRes.json(),
    typesRes.json()
  ]);

  return (
    <Suspense>
      <div className="flex flex-col">
        <OurMenuHeader />
        <OurMenu sets={setsData?.data} types={typesData?.data} />
      </div>
    </Suspense>
  );
}

export default page;
