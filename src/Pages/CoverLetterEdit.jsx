import { useState } from 'react';
import axios from 'axios';
import {
  FileText,
  Download,
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Calendar,
  Code,
  Target,
} from 'lucide-react';

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

  const API_KEY = 'xXv4XI3XmiFyDR65_ltJ0RC9jukG91qkcb8046fCFoM';

  const generateCoverLetter = async () => {
    setLoading(true);
    setError(null);
    setCoverLetterText('');

    try {
      // Simulated API call for demo purposes
      setTimeout(() => {
        setCoverLetterText(`Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.job_post} position at your company. With my ${formData.user_degree} degree and ${formData.user_experience} years of experience as a ${formData.user_title}, I am confident that I would be a valuable addition to your team.

Throughout my career, I have developed expertise in ${formData.user_skills}, which directly aligns with the requirements for this role. My background has equipped me with both the technical skills and practical experience needed to excel in this position.

I am particularly drawn to this opportunity because it represents the perfect intersection of my professional background and career aspirations. I am excited about the possibility of contributing to your team's success and would welcome the opportunity to discuss how my experience and enthusiasm can benefit your organization.

Thank you for considering my application. I look forward to hearing from you soon.

Sincerely,
${formData.user_name}`);
        setLoading(false);
      }, 2000);

      // Actual API call (commented out for demo)

      const response = await axios.post(
        'http://resumeai.webredirect.org/api/resume-flow/generate-cover-letter',
        formData,
        {
          headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json',
          },
        },
      );
      setCoverLetterText(response.data.cover_letter);
    } catch (err) {
      console.error(err);
      setError('Error generating cover letter. Please try again.');
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    // PDF download functionality would go here
    console.log('Downloading PDF...');
    alert('PDF download functionality would be implemented here');
  };

  const inputFields = [
    {
      name: 'job_post',
      placeholder: 'Job Position',
      icon: Target,
      type: 'text',
    },
    {
      name: 'user_name',
      placeholder: 'Your Full Name',
      icon: User,
      type: 'text',
    },
    {
      name: 'user_degree',
      placeholder: 'Your Degree',
      icon: GraduationCap,
      type: 'text',
    },
    {
      name: 'user_title',
      placeholder: 'Current Job Title',
      icon: Briefcase,
      type: 'text',
    },
    {
      name: 'user_experience',
      placeholder: 'Years of Experience',
      icon: Calendar,
      type: 'text',
    },
    {
      name: 'user_skills',
      placeholder: 'Key Skills (comma separated)',
      icon: Code,
      type: 'text',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Cover Letter Generator
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Create Your Cover Letter
                </h2>
              </div>

              <p className="text-gray-600 mb-8">
                Fill in your details below to generate a personalized cover
                letter that highlights your strengths and matches the job
                requirements.
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                {inputFields.map(field => {
                  const Icon = field.icon;
                  return (
                    <div key={field.name} className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                      />
                    </div>
                  );
                })}
              </div>

              <button
                onClick={generateCoverLetter}
                disabled={loading || !formData.job_post || !formData.user_name}
                className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg">
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Cover Letter</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Your Cover Letter
                  </h3>
                </div>

                {coverLetterText && (
                  <button
                    onClick={downloadPdf}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                )}
              </div>

              <div className="relative">
                {!coverLetterText && !loading && (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <FileText className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-lg font-medium">
                      No cover letter generated yet
                    </p>
                    <p className="text-sm">
                      Fill out the form and click Generate Cover Letter
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600">
                      Crafting your perfect cover letter...
                    </p>
                  </div>
                )}

                {coverLetterText && (
                  <div className="prose max-w-none">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <pre className="whitespace-pre-wrap text-gray-800 font-serif leading-relaxed text-sm">
                        {coverLetterText}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-3">
                💡 Tips for a Great Cover Letter
              </h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Be specific about the job title and company</li>
                <li>• Highlight relevant skills and experiences</li>
                <li>• Show enthusiasm for the role and company</li>
                <li>• Keep it concise and professional</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoverLetterEdit;
