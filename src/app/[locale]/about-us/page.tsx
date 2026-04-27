import {getAboutUsContent} from '@/lib/keystatic';
import AboutUs from './(components)/AboutUs';

export default async function AboutUsPage() {
  const content = await getAboutUsContent();

  return <AboutUs content={content} />;
}
