import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoverLetterCard from './CoverLetterCard';
import AddCoverLetter from './AddCoverLetter';

const CoverLetterCards = () => {
  const [coverLetterList, setCoverLetterList] = useState([]);
  const navigate = useNavigate();

  // تحميل بيانات وهمية
  const loadCoverLetterData = () => {
    const mockCoverLetters = [
      { id: '1', title: 'رسالة تغطية 1', description: 'هذا وصف 1' },
      { id: '2', title: 'رسالة تغطية 2', description: 'هذا وصف 2' },
    ];
    setCoverLetterList(mockCoverLetters);
  };

  useEffect(() => {
    loadCoverLetterData();
  }, []);

  return (
    <div className="p-10">
      <AddCoverLetter
        onCreate={title => {
          const newCoverLetter = {
            id: Date.now().toString(),
            title,
            description: 'لا يوجد وصف',
          };
          setCoverLetterList([...coverLetterList, newCoverLetter]);
        }}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
        {coverLetterList.length > 0 ? (
          coverLetterList.map(letter => (
            <CoverLetterCard
              key={letter.id}
              coverLetter={letter}
              onEdit={() => navigate(`/cover-letter-edit/${letter.id}`)}
              onView={() => navigate(`/cover-letter-view/${letter.id}`)}
              onDelete={() =>
                setCoverLetterList(
                  coverLetterList.filter(l => l.id !== letter.id),
                )
              }
            />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            لا توجد رسائل تغطية حتى الآن.
          </p>
        )}
      </div>
    </div>
  );
};

export default CoverLetterCards;
