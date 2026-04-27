import localFont from 'next/font/local';

const shippori = localFont({
  src: [
    {
      path: './fonts/shippori/ShipporiMinchoB1-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/shippori/ShipporiMinchoB1-SemiBold.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/shippori/ShipporiMinchoB1-Medium.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/shippori/ShipporiMinchoB1-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  style: 'normal',
  variable: '--font-shippori',
  display: 'swap',
  fallback: ['serif']
});

const mplus = localFont({
  src: [
    {
      path: './fonts/mplus/Mplus1p-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/mplus/Mplus1p-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/mplus/Mplus1p-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-mplus',
  display: 'swap',
  fallback: ['sans-serif']
});
const poppins = localFont({
  src: [
    {
      path: './fonts/poppins/Poppins-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/poppins/Poppins-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/poppins/Poppins-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/poppins/Poppins-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-poppins',
  display: 'swap',
  fallback: [
    'system-ui',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ]
});

export {shippori, mplus, poppins};
