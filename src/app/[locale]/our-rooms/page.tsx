import {getOurRoomsContent} from '@/lib/keystatic';
import OurRooms from './(components)/OurRooms';

export default async function OurRoomsPage() {
  const content = await getOurRoomsContent();

  return <OurRooms content={content} />;
}
