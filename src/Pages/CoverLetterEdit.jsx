// src/pages/CoverLetterEdit.jsx
import Header from '../Pages/Header';
import { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { useParams } from 'react-router-dom';

const CoverLetterEdit = () => {
  const { id } = useParams();

  const [coverLetterText, setCoverLetterText] = useState(`[Your Name]
[Street Address, City, ST Zip Code]  |  [Telephone]  |  [Email]

[Date]

[Recipient Name]
[Title]
[Company]
[Street Address]
[City, ST Zip Code]

Dear [Recipient Name],

[If you’re ready to write, select a line or paragraph of tip text and start typing to replace it with your own. Don’t include space to the right of the characters in your selection.]

[It’s easy to match any of the text formatting you see here. On the Home tab of the ribbon, check out the Styles gallery for all styles used in this letter.]

Sincerely,

[Your Name]`);

  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateCoverLetter = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'https://resumeai.up.railway.app/generate-project-description',
        { coverLetterId: id },
      );
      setCoverLetterText(response.data.coverLetter);
      setApiResponse('تم توليد رسالة التغطية بنجاح.');
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء توليد رسالة التغطية.');
    } finally {
      setLoading(false);
    }
  };

  // الدالة الخاصة بتوليد الملخص
  const generateSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'https://your-api-domain.com/api/generate-summary',
        { coverLetterId: id },
      );
      setCoverLetterText(
        prevText => prevText + '\n\nSummary:\n' + response.data.summary,
      );
      setApiResponse('تم توليد الملخص بنجاح.');
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء توليد الملخص.');
    } finally {
      setLoading(false);
    }
  };

  const generateProjectDescription = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'https://your-api-domain.com/api/generate-project-description',
        { coverLetterId: id },
      );
      setCoverLetterText(
        prevText =>
          prevText +
          '\n\nProject Description:\n' +
          response.data.projectDescription,
      );
      setApiResponse('تم توليد وصف المشروع بنجاح.');
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء توليد وصف المشروع.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    const lines = doc.splitTextToSize(coverLetterText, 500);
    doc.text(lines, 40, 60);
    doc.save('cover-letter.pdf');
  };

  return (
    <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#ede9fe_1px,transparent_1px),linear-gradient(to_bottom,#f3e8ff_1px,transparent_1px)] bg-[size:14px_24px] print:bg-transparent print:bg-none">
      <Header />
      <main className="py-12 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Edit Your Cover Letter
          </h1>
          {error && (
            <div className="mb-4 text-center text-red-500">{error}</div>
          )}
          {apiResponse && (
            <div className="mb-4 text-center text-green-600">{apiResponse}</div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex flex-col space-y-4">
              <button
                onClick={generateCoverLetter}
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Generate Cover Letter
              </button>
              <button
                onClick={generateSummary}
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Generate Summary
              </button>
              <button
                onClick={generateProjectDescription}
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Generate Project Description
              </button>
            </div>

            <div className="lg:col-span-2">
              <textarea
                value={coverLetterText}
                onChange={e => setCoverLetterText(e.target.value)}
                rows="20"
                className="w-full border border-gray-300 p-4 rounded-lg font-serif text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={downloadPdf}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoverLetterEdit;
