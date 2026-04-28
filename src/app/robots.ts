import {MetadataRoute} from 'next';
import {host} from '@/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/keystatic', '/api/', '/api/keystatic']
      }
    ],
    sitemap: `${host}/sitemap.xml`,
    host
  };
}
