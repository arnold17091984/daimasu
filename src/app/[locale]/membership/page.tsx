import {getMembershipContent} from '@/lib/keystatic';
import Membership from './(components)/Membership';

export default async function MembershipPage() {
  const content = await getMembershipContent();

  return <Membership content={content} />;
}
