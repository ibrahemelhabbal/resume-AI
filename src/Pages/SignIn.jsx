import { SignIn } from '@clerk/clerk-react';
const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Welcome Back
        </h1>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white',
              card: 'shadow-none',
              socialButtonsBlockButton:
                'border border-gray-300 hover:bg-gray-50',
            },
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
};

export default SignInPage;
