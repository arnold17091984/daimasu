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
      {/* Top loader uses our muted antique gold so the page-load progress
          bar matches the luxury palette instead of the legacy red. */}
      <NextTopLoader showSpinner={false} color="#B19463" />
      {children}
    </NuqsAdapter>
  );
};

export default ClientProviders;
