import {ProductItem} from '@/app/types';
import {Card, CardContent} from '@/components/ui/card';
import Image from 'next/image';
import {FC, useState} from 'react';

export const MenuItem: FC<Partial<ProductItem>> = ({
  related,
  name,
  description,
  amount
}) => {
  const image = related?.images?.url;

  return (
    <Card className="bg-white text-black rounded-xl shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 w-full min-h-[220px]">
      <CardContent className="p-4">
        {related?.images ? (
          <img
            src={image}
            alt="product thumbnail"
            className="max-h-[230px] w-full object-cover object-center aspect-video rounded-md"
          />
        ) : (
          <img
            className="max-h-[200px] w-full object-cover object-center rounded-md"
            src="/product-fallback.png"
            alt="thumbnail fallback"
            // width={400}
            // height={400}
          />
        )}

        <div className="flex flex-col mt-3 gap-1">
          <h3 className="text-lg font-bold text-center m-0 leading-none">
            {name}
          </h3>
          <p className="text-sm text-gray-700 text-center">
            {description || 'No description'}
          </p>
          <p className="text-[#83663b] font-semibold text-lg text-center leading-none">
            {amount?.formatted}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
