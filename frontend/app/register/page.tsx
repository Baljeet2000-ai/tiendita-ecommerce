import { redirect } from 'next/navigation';
import RegisterForm from '@/app/components/RegisterForm';
import { isAuthenticated } from '@/app/lib/auth';

export default async function RegisterPage() {
  if (await isAuthenticated()) {
    redirect('/');
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-12">
      <RegisterForm />
    </main>
  );
}