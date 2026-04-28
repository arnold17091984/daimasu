import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

// Locale-aware metadata is generated in src/app/[locale]/layout.tsx via
// `generateMetadata`. The root layout exists only because not-found.tsx
// lives at the app root, so it just passes children through.
export default function RootLayout({children}: Props) {
  return children;
}
