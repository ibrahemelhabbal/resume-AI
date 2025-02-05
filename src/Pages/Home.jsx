import Header from '../Pages/Header';
import { useUser } from '@clerk/clerk-react';
import { AtomIcon, Edit, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const user = useUser();

  return (
    <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#ede9fe_1px,transparent_1px),linear-gradient(to_bottom,#f3e8ff_1px,transparent_1px)] bg-[size:14px_24px] print:bg-transparent print:bg-none">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 pointer-events-none print:hidden">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-violet-500 via-purple-400 to-indigo-500"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"></div>
      </div>

      <Header />
      <section className="py-12 px-6 mx-auto text-center text-white w-full">
        <h1 className="text-black mt-4 lg:mt-8 mb-4 text-5xl font-extrabold">
          Build Your Resume {}
          <span className="text-[#282b96] max-sm:block">With AI</span>
        </h1>
        <p className="mb-8 text-xl text-black max-w-md mx-auto">
          Effortlessly Craft a Professional Resume with Our AI-Powered Builder
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            to={user?.isSignedIn ? '/dashboard' : '/sign-up'}
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none">
            Get Started
          </Link>
          <Link
            to="#learn-more"
            className="inline-block py-3 px-6 bg-white border-2 border-gray-00 text-black  text-lg rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">
            Learn more
          </Link>
        </div>
      </section>

      <section className="py-12 px-6 mx-auto max-w-screen-xl text-center">
        <h2 className="font-bold text-3xl text-gray-900">How it Works?</h2>
        <p className="text-md text-gray-500 mb-8">
          Generate your resume in just 3 steps
        </p>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="cursor-pointer p-8 border border-gray-200 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <AtomIcon className="h-10 w-10 text-blue-600 mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Create Your Template
            </h2>
            <p className="mt-2 text-gray-600">
              Start by selecting your color scheme...
            </p>
          </div>
          <div className="cursor-pointer p-8 border border-gray-200 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <Edit className="h-10 w-10 text-blue-600 mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Update Your Information
            </h2>
            <p className="mt-2 text-gray-600">Enter your personal details...</p>
          </div>
          <div className="cursor-pointer p-8 border border-gray-200 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <Share2 className="h-10 w-10 text-blue-600 mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Share Your Resume
            </h2>
            <p className="mt-2 text-gray-600">
              After completing your resume...
            </p>
          </div>
        </div>
      </section>
      <footer className="bg-white-900 text-black py-6">
        <div className="text-center">
          <Link
            to="#"
            className="text-lg hover:text-blue-500 transition-all duration-300">
            Made by hema
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
