import { Link } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';

const Header = () => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50">
      <nav className="backdrop-blur-md px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-bold whitespace-nowrap">
              ResumeFLOW
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {isLoaded && !isSignedIn ? (
              <Link
                to="/sign-in"
                className="text-gray-800 hover:bg-primary-700/10 duration-300 focus:ring-4 focus:ring-primary-700/30 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                Log in
              </Link>
            ) : (
              <>
                <div className="mr-4 h-full items-center align-middle flex max-md:hidden justify-center">
                  <UserButton showName={true} />
                </div>
                <div className="mr-4 h-full items-center align-middle hidden max-md:flex justify-center">
                  <UserButton showName={false} />
                </div>
              </>
            )}
            <Link
              to={isSignedIn ? '/dashboard' : '/sign-up'}
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none">
              {isSignedIn ? 'Dashboard' : 'Get started'}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
