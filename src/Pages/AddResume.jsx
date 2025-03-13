import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AddResume = ({ onCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    if (resumeName.trim()) {
      onCreate(resumeName);
      setIsModalOpen(false);
      navigate(`/resume-edit/${resumeName}`);
    }
  };

  return (
    <>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center hover:border-blue-500 transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}>
        <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span className="mt-2">إنشاء سيرة ذاتية جديدة</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">
              أدخل اسم السيرة الذاتية
            </h2>
            <input
              type="text"
              value={resumeName}
              onChange={e => setResumeName(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="اسم السيرة الذاتية"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800">
                إلغاء
              </button>
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                إنشاء
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

AddResume.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddResume;
