import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeCard from './ResumeCard';
import AddResume from './AddResume';

const ResumeCards = () => {
  const [resumeList, setResumeList] = useState([]);
  const navigate = useNavigate();

  // تحميل بيانات وهمية
  const loadResumeData = () => {
    const mockResumes = [
      { id: '1', title: 'السيرة الذاتية 1', description: 'هذا وصف 1' },
      { id: '2', title: 'السيرة الذاتية 2', description: 'هذا وصف 2' },
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
            description: 'لا يوجد وصف',
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
            لا توجد سير ذاتية حتى الآن.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumeCards;
