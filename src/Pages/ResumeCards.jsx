import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeCard from './ResumeCard';
import AddResume from './AddResume';

const ResumeCards = () => {
  const [resumeList, setResumeList] = useState([]);
  const navigate = useNavigate();

  const loadResumeData = () => {
    const mockResumes = [
      {
        id: '1',
        title: 'Resume 1',
        description: 'This is a description for Resume 1',
      },
      {
        id: '2',
        title: 'Resume 2',
        description: 'This is a description for Resume 2',
      },
      {
        id: '3',
        title: 'Resume 3',
        description: 'This is a description for Resume 3',
      },
    ];
    setResumeList(mockResumes);
  };

  useEffect(() => {
    loadResumeData();
  }, []);

  return (
    <div className="p-10">
      <AddResume
        onCreate={title => {
          const newResume = {
            id: Date.now().toString(),
            title,
            description: 'this is a description',
          };
          setResumeList([...resumeList, newResume]);
        }}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
        {resumeList.length > 0 ? (
          resumeList.map(resume => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onEdit={() => navigate(`/resume-edit/${resume.id}`)}
              onView={() => navigate(`/resume-view/${resume.id}`)}
              onDelete={() =>
                setResumeList(resumeList.filter(r => r.id !== resume.id))
              }
            />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            their is no resume yet, please add one
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumeCards;
