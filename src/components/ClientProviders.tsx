'use client';
import {NuqsAdapter} from 'nuqs/adapters/next';
import React from 'react';
import NextTopLoader from 'nextjs-toploader';

interface IClientProvider {
  children: React.ReactNode;
}

const ClientProviders: React.FC<IClientProvider> = ({children}) => {
  return (
    <NuqsAdapter>
      <NextTopLoader showSpinner={false} color="#9E0000" />
      {children}
    </NuqsAdapter>
  );
};

export default ClientProviders;
