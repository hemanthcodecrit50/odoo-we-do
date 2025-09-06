import AuthForm from '@/components/auth-components';

export default function LoginPage() {
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 sm:px-6 lg:px-8">
        <AuthForm type="login" />
    </div>
  );
}
