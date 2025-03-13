import { useState } from 'react';
import PageWrapper from '../Pages/PageWrapper';
import ResumeCards from '../Pages/ResumeCards';
import CoverLetterCards from './CoverLetterCards';
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
  const [activeTab, setActiveTab] = useState('resume');

  return (
    <PageWrapper>
      <Header />
      <div className="my-10 !mb-0 mx-10 md:mx-20 lg:mx-36">
        <h2 className="text-center text-2xl font-bold">Your Dashboard</h2>
        <p className="text-center text-gray-600">
          Manage and organize your resumes and cover letters easily.
        </p>
      </div>

      {/* Tab Selection */}
      <div className="flex justify-center my-6">
        <button
          className={`px-6 py-2 mx-2 rounded ${
            activeTab === 'resume' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('resume')}>
          Resumes
        </button>
        <button
          className={`px-6 py-2 mx-2 rounded ${
            activeTab === 'coverletter'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('coverletter')}>
          Cover Letters
        </button>
      </div>

      {/* Display Content Based on Selection */}
      <div className="p-10 md:px-24 lg:px-48">
        {activeTab === 'resume' ? <ResumeCards /> : <CoverLetterCards />}
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
