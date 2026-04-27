import {ReactNode} from 'react';
import Script from "next/script";
import {Metadata} from 'next';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: '大枡 | Daimasu Japanese Restaurant',
  description: 'A Taste Beyond Waves'
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({children}: Props) {
  return children;
}
