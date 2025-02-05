import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoverLetterCard from './CoverLetterCard';
import AddCoverLetter from './AddCoverLetter';

const DashboardCards = () => {
  const [coverLetterList, setCoverLetterList] = useState([]);
  const navigate = useNavigate();

  // دالة لمحاكاة جلب البيانات (يمكن استبدالها بطلب API)
  const loadCoverLetterData = () => {
    const mockCoverLetters = [
      { id: '1', title: 'رسالة تغطية 1', description: 'الوصف 1' },
      { id: '2', title: 'رسالة تغطية 2', description: 'الوصف 2' },
    ];
    setCoverLetterList(mockCoverLetters);
  };

  useEffect(() => {
    loadCoverLetterData();
  }, []);

  const handleCreateCoverLetter = name => {
    const newCoverLetter = {
      id: Date.now().toString(),
      title: name,
      description: 'لا يوجد وصف متاح',
    };
    setCoverLetterList(prev => [...prev, newCoverLetter]);
    // الانتقال مباشرةً إلى صفحة التعديل بعد إنشاء رسالة التغطية
    navigate(`/cover-letter-edit/${newCoverLetter.id}`);
  };

  const handleDeleteCoverLetter = id => {
    setCoverLetterList(prev => prev.filter(letter => letter.id !== id));
  };

  const handleEditCoverLetter = id => {
    navigate(`/cover-letter-edit/${id}`);
  };

  const handleViewCoverLetter = id => {
    navigate(`/cover-letter-edit/${id}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10 gap-8">
      <AddCoverLetter onCreate={handleCreateCoverLetter} />
      {coverLetterList.length > 0
        ? coverLetterList.map(letter => (
            <CoverLetterCard
              key={letter.id}
              coverLetter={letter}
              onEdit={handleEditCoverLetter}
              onView={handleViewCoverLetter}
              onDelete={handleDeleteCoverLetter}
            />
          ))
        : [1, 2, 3].map(index => (
            <CoverLetterCard
              key={index}
              coverLetter={{}}
              onEdit={() => {}}
              onView={() => {}}
              onDelete={() => {}}
            />
          ))}
    </div>
  );
};

export default DashboardCards;
