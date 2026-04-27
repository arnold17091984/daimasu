import {createReader} from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

export async function getHomepageContent() {
  const homepage = await reader.singletons.homepage.read();
  return homepage;
}

export async function getOurRoomsContent() {
  const ourRooms = await reader.singletons.ourRooms.read();
  return ourRooms;
}

export async function getAboutUsContent() {
  const aboutUs = await reader.singletons.aboutUs.read();
  return aboutUs;
}

export async function getMembershipContent() {
  const membership = await reader.singletons.membership.read();
  return membership;
}

export async function getFooterContent() {
  const footer = await reader.singletons.footer.read();
  return footer;
}
