import { useState } from 'react';
import PropTypes from 'prop-types';

const CoverLetterCard = ({ coverLetter, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition duration-300 relative group">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {coverLetter?.title || 'match cover letter'}
        </h3>
        <p className="text-sm text-gray-500 mt-1 truncate">
          {coverLetter?.description || 'this is a description'}
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
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                  onClick={() => onEdit(coverLetter?.id)}>
                  تعديل
                </button>
              </li>
              <li></li>
              <li>
                <button
                  className="block w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={() => onDelete(coverLetter?.id)}>
                  حذف
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
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CoverLetterCard;
