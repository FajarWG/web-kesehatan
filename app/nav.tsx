import Navbar from './navbar';
import { auth } from './auth';

export default async function Nav({navigation}: {navigation: any}) {
  const session = await auth();
  return <Navbar navigation={navigation} user={session?.user} />;
}
