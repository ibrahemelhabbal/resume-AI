import Header from '../Pages/Header';
import { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const CoverLetterEdit = () => {
  const [formData, setFormData] = useState({
    job_post: '',
    user_name: '',
    user_degree: '',
    user_title: '',
    user_experience: '',
    user_skills: '',
  });

  const [coverLetterText, setCoverLetterText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCoverLetter = async () => {
    setLoading(true);
    setError(null);
    setCoverLetterText(null);

    try {
      console.log('Fetching API Key...');

      const apiKeyResponse = await axios.get(
        'https://resumeai.up.railway.app/generate-api-key',
      );

      if (!apiKeyResponse.data || !apiKeyResponse.data.api_key) {
        throw new Error('فشل في الحصول على مفتاح API.');
      }

      const apiKey = apiKeyResponse.data.api_key;
      console.log('API Key received:', apiKey);

      console.log('Sending request with:', JSON.stringify(formData, null, 2));

      const response = await axios.post(
        'https://resumeai.up.railway.app/generate-cover-letter',
        formData,
        {
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
          },
        },
      );

      setCoverLetterText(response.data.cover_letter);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء توليد رسالة التغطية.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF();

    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.text('Cover Letter', 105, 20, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.text(coverLetterText, 20, 40, { maxWidth: 170, align: 'left' });

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="job_post"
              placeholder="Job Post"
              className="border p-2 w-full"
              onChange={handleChange}
            />
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              className="border p-2 w-full"
              onChange={handleChange}
            />
            <input
              type="text"
              name="user_degree"
              placeholder="Degree"
              className="border p-2 w-full"
              onChange={handleChange}
            />
            <input
              type="text"
              name="user_title"
              placeholder="Job Title"
              className="border p-2 w-full"
              onChange={handleChange}
            />
            <input
              type="text"
              name="user_experience"
              placeholder="Years of Experience"
              className="border p-2 w-full"
              onChange={handleChange}
            />
            <input
              type="text"
              name="user_skills"
              placeholder="Skills"
              className="border p-2 w-full"
              onChange={handleChange}
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={generateCoverLetter}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Generate Cover Letter
            </button>
          </div>

          <div className="mt-6">
            <textarea
              value={coverLetterText}
              rows="10"
              className="w-full border p-4 rounded-lg"
              readOnly></textarea>
            <div className="mt-4 flex justify-end">
              <button
                onClick={downloadPdf}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoverLetterEdit;
