import Link from 'next/link';
import { Form } from '../components/form';
import { signIn } from '../lib/auth';
import { SubmitButton } from '../components/submit-button';

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Login</h3>
          <p className="text-sm text-gray-500">
            Gunakan ID pengguna dan kata sandi yang sesuai
          </p>
        </div>
        <Form
          action={async (formData: FormData) => {
            'use server';
            await signIn('credentials', {
              redirectTo: '/',
              username: formData.get('username') as string,
              password: formData.get('password') as string,
            })
          }}
        >
          <SubmitButton>Login</SubmitButton>
        </Form>
      </div>
    </div>
  );
}
