import { useState } from 'react';
import Header from '../Pages/Header';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const sections = [
  { key: 'personal', label: 'Personal Details' },
  { key: 'summary', label: 'Summary' },
  { key: 'experience', label: 'Experience' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills' },
];

const ResumeEdit = () => {
  const [resumeData, setResumeData] = useState({
    first_name: '',
    last_name: '',
    job_title: '',
    address: '',
    phone: '',
    email: '',
    years_experience: '',
    achievements: '',
    summary: '',
    project_name: '',
    project_description: '',
    skills: '',
  });

  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = e => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateSummary = async () => {
    try {
      const apiKeyResponse = await axios.get(
        'https://resumeai.up.railway.app/generate-api-key',
      );
      const apiKey = apiKeyResponse.data.api_key;
      const response = await axios.post(
        'https://resumeai.up.railway.app/generate-summary',
        {
          current_title: resumeData.job_title,
          years_experience: resumeData.years_experience,
          skills: resumeData.skills,
          achievements: resumeData.achievements,
        },
        {
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      setResumeData({ ...resumeData, summary: response.data.summary });
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء توليد الملخص.');
    }
  };

  const generateProjectDescription = async () => {
    try {
      const apiKeyResponse = await axios.get(
        'https://resumeai.up.railway.app/generate-api-key',
      );
      const apiKey = apiKeyResponse.data.api_key;
      const response = await axios.post(
        'https://resumeai.up.railway.app/generate-project-description',
        {
          project_name: resumeData.project_name,
          skills: resumeData.skills,
          project_description: resumeData.project_description,
        },
        {
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      setResumeData({
        ...resumeData,
        project_description: response.data.project_description,
      });
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء توليد وصف المشروع.');
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF();

    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.text('Resume', 105, 20, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.text(`Name: ${resumeData.first_name} ${resumeData.last_name}`, 20, 40);
    doc.text(`Job Title: ${resumeData.job_title}`, 20, 50);
    doc.text(`Address: ${resumeData.address}`, 20, 60);
    doc.text(`Phone: ${resumeData.phone}`, 20, 70);
    doc.text(`Email: ${resumeData.email}`, 20, 80);

    doc.text('Summary', 105, 90, { align: 'center' });
    doc.text(resumeData.summary, 20, 100, { maxWidth: 170 });

    doc.text('Experience', 105, 120, { align: 'center' });
    doc.text(resumeData.years_experience, 20, 130, { maxWidth: 170 });

    doc.text('Achievements', 105, 150, { align: 'center' });
    doc.text(resumeData.achievements, 20, 160, { maxWidth: 170 });

    doc.text('Projects', 105, 180, { align: 'center' });
    doc.text(
      `${resumeData.project_name}: ${resumeData.project_description}`,
      20,
      190,
      { maxWidth: 170 },
    );

    doc.text('Skills', 105, 210, { align: 'center' });
    doc.text(resumeData.skills, 20, 220, { maxWidth: 170 });

    doc.save('resume.pdf');
  };

  return (
    <div className="absolute inset-0 h-full w-full bg-gray-100 print:bg-transparent">
      <Header />
      <main className="py-12 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 flex">
          <div className="w-1/2 pr-6">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
              {sections[currentStep].label}
            </h1>
            {error && (
              <div className="mb-4 text-center text-red-500">{error}</div>
            )}
            <div className="space-y-4">
              {currentStep === 0 && (
                <>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    className="border p-2 w-full"
                    value={resumeData.first_name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    className="border p-2 w-full"
                    value={resumeData.last_name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="job_title"
                    placeholder="Job Title"
                    className="border p-2 w-full"
                    value={resumeData.job_title}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="border p-2 w-full"
                    value={resumeData.address}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="border p-2 w-full"
                    value={resumeData.phone}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="border p-2 w-full"
                    value={resumeData.email}
                    onChange={handleChange}
                  />
                </>
              )}
              {currentStep === 1 && (
                <>
                  <textarea
                    name="summary"
                    placeholder="Summary"
                    className="border p-2 w-full"
                    value={resumeData.summary}
                    onChange={handleChange}></textarea>
                  <button
                    onClick={generateSummary}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg">
                    Generate Summary
                  </button>
                </>
              )}
              {currentStep === 2 && (
                <input
                  type="text"
                  name="years_experience"
                  placeholder="Years of Experience"
                  className="border p-2 w-full"
                  value={resumeData.years_experience}
                  onChange={handleChange}
                />
              )}
              {currentStep === 3 && (
                <input
                  type="text"
                  name="achievements"
                  placeholder="Achievements"
                  className="border p-2 w-full"
                  value={resumeData.achievements}
                  onChange={handleChange}
                />
              )}
              {currentStep === 4 && (
                <>
                  <input
                    type="text"
                    name="project_name"
                    placeholder="Project Name"
                    className="border p-2 w-full"
                    value={resumeData.project_name}
                    onChange={handleChange}
                  />
                  <textarea
                    name="project_description"
                    placeholder="Project Description"
                    className="border p-2 w-full"
                    value={resumeData.project_description}
                    onChange={handleChange}></textarea>
                  <button
                    onClick={generateProjectDescription}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg">
                    Generate Project Description
                  </button>
                </>
              )}
              {currentStep === 5 && (
                <input
                  type="text"
                  name="skills"
                  placeholder="Skills"
                  className="border p-2 w-full"
                  value={resumeData.skills}
                  onChange={handleChange}
                />
              )}
            </div>
            <div className="flex justify-between mt-4">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg">
                  Prev
                </button>
              )}
              {currentStep < sections.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                  Next
                </button>
              ) : (
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg">
                  Save
                </button>
              )}
            </div>
          </div>
          <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow-md flex items-center justify-center">
            <div
              className="shadow-lg border-t-[20px] bg-white w-[210mm] min-h-[297mm] print:shadow-none p-12"
              style={{ borderColor: '#4F46E5' }}>
              <h2 className="text-xl font-bold text-center">
                {resumeData.first_name} {resumeData.last_name}
              </h2>
              <p className="text-center text-gray-700">
                {resumeData.job_title}
              </p>
              <hr className="my-4 border-gray-300" />
              <p className="text-gray-600">
                <strong>Address:</strong> {resumeData.address}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {resumeData.phone}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {resumeData.email}
              </p>
              <hr className="my-4 border-gray-300" />
              {resumeData.summary && (
                <>
                  <h3 className="text-lg font-semibold text-center">Summary</h3>
                  <p className="text-gray-600">{resumeData.summary}</p>
                  <hr className="my-4 border-gray-300" />
                </>
              )}
              {resumeData.years_experience && (
                <>
                  <h3 className="text-lg font-semibold text-center">
                    Experience
                  </h3>
                  <p className="text-gray-600">
                    {resumeData.years_experience} years
                  </p>
                  <hr className="my-4 border-gray-300" />
                </>
              )}
              {resumeData.achievements && (
                <>
                  <h3 className="text-lg font-semibold text-center">
                    Achievements
                  </h3>
                  <p className="text-gray-600">{resumeData.achievements}</p>
                  <hr className="my-4 border-gray-300" />
                </>
              )}
              {resumeData.project_name && (
                <>
                  <h3 className="text-lg font-semibold text-center">
                    Projects
                  </h3>
                  <p className="text-gray-600">
                    {resumeData.project_name} - {resumeData.project_description}
                  </p>
                  <hr className="my-4 border-gray-300" />
                </>
              )}
              {resumeData.skills && (
                <>
                  <h3 className="text-lg font-semibold text-center">Skills</h3>
                  <p className="text-gray-600">{resumeData.skills}</p>
                  <hr className="my-4 border-gray-300" />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={downloadPdf}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Download PDF
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResumeEdit;
