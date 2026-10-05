import { redirect } from 'next/navigation';
import LoginForm from '@/app/components/LoginForm';
import { isAuthenticated } from '@/app/lib/auth';

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect('/');
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-12">
      <LoginForm />
    </main>
  );
}