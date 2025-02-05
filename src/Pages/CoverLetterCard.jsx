import { useState } from 'react';
import PropTypes from 'prop-types';

const CoverLetterCard = ({
  coverLetter,
  isLoading = false,
  onEdit,
  onView,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(coverLetter?.id);
    setIsDeleting(false);
  };

  if (isLoading) {
    return (
      <div className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition duration-300 relative group p-4 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
        <div className="absolute top-4 right-4">
          <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
            <span>•••</span>
          </button>
        </div>
      </div>
    );
  }

  if (!coverLetter) {
    return (
      <div className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition duration-300 relative group">
        <div className="p-4">لا توجد بيانات لرسالة التغطية</div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition duration-300 relative group">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {coverLetter?.title || 'رسالة تغطية بدون عنوان'}
        </h3>
        <p className="text-sm text-gray-500 mt-1 truncate">
          {coverLetter?.description || 'لا يوجد وصف متاح'}
        </p>
      </div>
      <div className="absolute top-4 right-4">
        <button
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
          onClick={() => setShowOptions(!showOptions)}>
          <span>•••</span>
        </button>
        {showOptions && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
            <ul className="text-sm">
              <li>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => onEdit(coverLetter?.id)}>
                  تعديل
                </button>
              </li>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => onView(coverLetter?.id)}>
                  عرض
                </button>
              </li>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={handleDelete}>
                  {isDeleting ? 'جارٍ الحذف...' : 'حذف'}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

CoverLetterCard.propTypes = {
  coverLetter: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CoverLetterCard;
