import PageWrapper from '../Pages/PageWrapper';
import DashboardCards from '../Pages/DashboardCards';

import { Link } from 'react-router-dom';
// Mock Header Component
const Header = () => {
  return (
    <header className="px-10 py-4 border-b">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">ResumeAI</h1>
        <nav>
          <Link
            to="/profile"
            className="bg-blue-600 text-white px-4 py-2 rounded">
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

const Dashboard = () => {
  return (
    <PageWrapper>
      <Header />
      <div className="my-10 !mb-0 mx-10 md:mx-20 lg:mx-36">
        <h2 className="text-center text-2xl font-bold">
          Your Resume Dashboard
        </h2>
        <p className="text-center text-gray-600">
          Begin creating and managing your personalized resumes.
        </p>
      </div>
      <div className="p-10 md:px-24 lg:px-48">
        <DashboardCards />
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
