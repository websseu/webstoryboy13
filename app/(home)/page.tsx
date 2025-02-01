import { auth } from '@/auth';

export default async function HomePage() {
  const session = await auth();

  console.log('🔹 세션 정보:', session);

  return <div>HomePage</div>;
}
