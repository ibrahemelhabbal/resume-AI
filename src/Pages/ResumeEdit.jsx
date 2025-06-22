import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Add this import
import PropTypes from 'prop-types';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Trash2,
  User,
  GraduationCap,
  FileText,
  Code,
  Briefcase,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
} from 'lucide-react';

const sections = [
  {
    key: 'personal',
    label: 'Personal Information',
    icon: User,
    description: 'Basic contact and profile information',
  },
  {
    key: 'summary',
    label: 'Professional Summary',
    icon: FileText,
    description: 'Brief overview of your career',
  },
  {
    key: 'experience',
    label: 'Work Experience',
    icon: Briefcase,
    description: 'Professional work history',
  },
  {
    key: 'education',
    label: 'Education',
    icon: GraduationCap,
    description: 'Academic background',
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: Code,
    description: 'Notable projects and achievements',
  },
  {
    key: 'skills',
    label: 'Skills',
    icon: Lightbulb,
    description: 'Technical and soft skills',
  },
];

const InputField = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  rows = 1,
}) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    ) : (
      <input
        type={type}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    )}
  </div>
);

const SectionCard = ({
  title,
  children,
  onRemove,
  canRemove = true,
  index,
}) => (
  <div className="p-6 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
          {index + 1}
        </span>
        {title}
      </h3>
      {canRemove && onRemove && (
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200">
          <Trash2 size={18} />
        </button>
      )}
    </div>
    {children}
  </div>
);

const ModernResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    information: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      summary: '',
      current_title: '',
      years_experience: '',
      skills: '',
      achievements: '',
    },
    education: [
      {
        school: '',
        degree: '',
        location: '',
        start_date: '',
        end_date: '',
        gpa: '',
      },
    ],
    experience: [
      {
        company: '',
        title: '',
        description: '',
        start_date: '',
        end_date: '',
      },
    ],
    projects: [
      {
        name: '',
        description: '',
        skills: '',
        end_date: '',
      },
    ],
    technical_skills: {
      'Programming Languages': [''],
      Tools: [''],
      'Other Skills': [''],
    },
    soft_skills: [''],
    output_format: 'pdf',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [completedSections, setCompletedSections] = useState(new Set());

  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [previewPdf, setPreviewPdf] = useState(null);

  const navigate = useNavigate(); // <-- Add this line

  const cleanEmptyFields = obj => {
    if (Array.isArray(obj)) {
      return obj.map(cleanEmptyFields);
    } else if (obj && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [
          k,
          v == null ? '' : cleanEmptyFields(v),
        ]),
      );
    }
    return obj == null ? '' : obj;
  };

  const getPdfPayload = () => {
    const {
      current_title,
      years_experience,
      skills,
      achievements,
      ...infoForPdf
    } = resumeData.information;

    void current_title, void years_experience, void skills, void achievements;
    return cleanEmptyFields({
      ...resumeData,
      information: infoForPdf,
    });
  };
  const generateProfessionalSummary = async ({
    current_title,
    years_experience,
    skills,
    achievements,
  }) => {
    try {
      const response = await fetch(
        'http://resumeai.webredirect.org/api/resume-flow/generate-summary',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'xXv4XI3XmiFyDR65_ltJ0RC9jukG91qkcb8046fCFoM',
          },
          body: JSON.stringify({
            current_title,
            years_experience,
            skills,
            achievements,
          }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }
      const data = await response.json();
      return data.summary;
    } catch (err) {
      setError(err.message || 'Failed to generate summary');
      return '';
    }
  };

  const generateProjectDescription = async ({
    project_name,
    skills,
    project_description,
  }) => {
    try {
      const response = await fetch(
        'http://resumeai.webredirect.org/api/resume-flow/generate-project-description',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'xXv4XI3XmiFyDR65_ltJ0RC9jukG91qkcb8046fCFoM',
          },
          body: JSON.stringify({ project_name, skills, project_description }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to generate project description');
      }
      const data = await response.json();
      return data.project_description;
    } catch (err) {
      setError(err.message || 'Failed to generate project description');
      return '';
    }
  };

  const handlePreview = async () => {
    setPreviewLoading(true);
    setPreviewError(null);
    setPreviewPdf(null);
    console.log('PDF Payload:', getPdfPayload());
    try {
      const response = await fetch(
        'http://resumeai.webredirect.org/api/resume-flow/create-resume',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'xXv4XI3XmiFyDR65_ltJ0RC9jukG91qkcb8046fCFoM',
          },
          body: JSON.stringify(getPdfPayload()),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate preview');
      }
      const result = await response.json();
      if (result.pdf_file) {
        setPreviewPdf(`data:application/pdf;base64,${result.pdf_file}`);
      } else {
        throw new Error('No preview PDF returned');
      }
    } catch (err) {
      setPreviewError(err.message || 'Failed to generate preview');
    } finally {
      setPreviewLoading(false);
    }
  };

  const generateResume = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const payload = getPdfPayload();
    console.log('PDF Payload:', payload);
    try {
      const response = await fetch(
        'http://resumeai.webredirect.org/api/resume-flow/create-resume',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'xXv4XI3XmiFyDR65_ltJ0RC9jukG91qkcb8046fCFoM',
          },
          body: JSON.stringify(getPdfPayload()),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate resume');
      }
      const result = await response.json();
      if (result.pdf_file) {
        // Download the PDF
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${result.pdf_file}`;
        link.download = 'resume.pdf';
        link.click();
        setSuccess('Resume generated and downloaded!');
      } else {
        throw new Error('No PDF returned');
      }
    } catch (err) {
      setError(err.message || 'Failed to generate resume');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (typeof Storage !== 'undefined' && localStorage) {
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
          setResumeData(JSON.parse(savedData));
        }
      }
    } catch (error) {
      console.warn('localStorage not available or data corrupted:', error);
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof Storage !== 'undefined' && localStorage) {
        const timer = setTimeout(() => {
          localStorage.setItem('resumeData', JSON.stringify(resumeData));
        }, 1000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }, [resumeData]);

  // Check section completion
  useEffect(() => {
    const completed = new Set();

    // Check personal info
    if (resumeData.information.name && resumeData.information.email) {
      completed.add('personal');
    }

    // Check summary
    if (resumeData.information.summary) {
      completed.add('summary');
    }

    // Check experience
    if (resumeData.experience.some(exp => exp.company && exp.title)) {
      completed.add('experience');
    }

    // Check education
    if (resumeData.education.some(edu => edu.school && edu.degree)) {
      completed.add('education');
    }

    // Check projects
    if (resumeData.projects.some(proj => proj.name && proj.description)) {
      completed.add('projects');
    }

    // Check skills
    if (
      Object.values(resumeData.technical_skills).some(skills =>
        skills.some(skill => skill.trim()),
      ) ||
      resumeData.soft_skills.some(skill => skill.trim())
    ) {
      completed.add('skills');
    }

    setCompletedSections(completed);
  }, [resumeData]);

  const handlePersonalChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      information: { ...prev.information, [field]: value },
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu,
      ),
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp,
      ),
    }));
  };
  const handleAutoSummary = async () => {
    const summary = await generateProfessionalSummary({
      current_title: resumeData.information.current_title || '',
      years_experience: resumeData.information.years_experience || '',
      skills: Object.values(resumeData.technical_skills).flat().join(', '),
      achievements: resumeData.information.achievements || '',
    });
    setResumeData(prev => ({
      ...prev,
      information: { ...prev.information, summary },
    }));
  };

  // Handler for AI project description
  const handleAutoProjectDescription = async index => {
    const project = resumeData.projects[index];
    const description = await generateProjectDescription({
      project_name: project.name,
      skills: project.skills,
      project_description: project.description,
    });
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) =>
        i === index ? { ...proj, description } : proj,
      ),
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) =>
        i === index ? { ...proj, [field]: value } : proj,
      ),
    }));
  };

  const handleTechnicalSkillChange = (category, index, value) => {
    setResumeData(prev => ({
      ...prev,
      technical_skills: {
        ...prev.technical_skills,
        [category]: prev.technical_skills[category].map((skill, i) =>
          i === index ? value : skill,
        ),
      },
    }));
  };

  const handleSoftSkillChange = (index, value) => {
    setResumeData(prev => ({
      ...prev,
      soft_skills: prev.soft_skills.map((skill, i) =>
        i === index ? value : skill,
      ),
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          school: '',
          degree: '',
          location: '',
          start_date: '',
          end_date: '',
          gpa: '',
        },
      ],
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: '',
          title: '',
          description: '',
          start_date: '',
          end_date: '',
        },
      ],
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: '',
          description: '',
          skills: '',
          end_date: '',
        },
      ],
    }));
  };

  const addTechnicalSkill = category => {
    setResumeData(prev => ({
      ...prev,
      technical_skills: {
        ...prev.technical_skills,
        [category]: [...prev.technical_skills[category], ''],
      },
    }));
  };

  const addSoftSkill = () => {
    setResumeData(prev => ({
      ...prev,
      soft_skills: [...prev.soft_skills, ''],
    }));
  };

  const removeItem = (section, index, category = null) => {
    setResumeData(prev => {
      if (section === 'technical_skills') {
        return {
          ...prev,
          technical_skills: {
            ...prev.technical_skills,
            [category]: prev.technical_skills[category].filter(
              (_, i) => i !== index,
            ),
          },
        };
      }
      return {
        ...prev,
        [section]: prev[section].filter((_, i) => i !== index),
      };
    });
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

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          placeholder="John Doe"
          value={resumeData.information.name}
          onChange={value => handlePersonalChange('name', value)}
          required
        />
        <InputField
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={resumeData.information.email}
          onChange={value => handlePersonalChange('email', value)}
          required
        />
        <InputField
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={resumeData.information.phone}
          onChange={value => handlePersonalChange('phone', value)}
        />
        <InputField
          label="Address"
          placeholder="123 Main St, City, State"
          value={resumeData.information.address}
          onChange={value => handlePersonalChange('address', value)}
        />
        <InputField
          label="LinkedIn Profile"
          type="url"
          placeholder="linkedin.com/in/johndoe"
          value={resumeData.information.linkedin}
          onChange={value => handlePersonalChange('linkedin', value)}
        />
        <InputField
          label="GitHub Profile"
          type="url"
          placeholder="github.com/johndoe"
          value={resumeData.information.github}
          onChange={value => handlePersonalChange('github', value)}
        />
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-4">
      <InputField
        label="Current Title"
        placeholder="e.g. Senior Software Engineer"
        value={resumeData.information.current_title || ''}
        onChange={value => handlePersonalChange('current_title', value)}
        required
      />
      <InputField
        label="Years of Experience"
        placeholder="e.g. 5+ years"
        value={resumeData.information.years_experience || ''}
        onChange={value => handlePersonalChange('years_experience', value)}
        required
      />
      <InputField
        label="Achievements"
        placeholder="e.g. Led team of 5, Reduced system latency by 40%"
        value={resumeData.information.achievements || ''}
        onChange={value => handlePersonalChange('achievements', value)}
      />
      <InputField
        label="Key Skills"
        placeholder="e.g. Python, React, AWS, Microservices"
        value={resumeData.information.skills || ''}
        onChange={value => handlePersonalChange('skills', value)}
      />
      <button
        type="button"
        onClick={handleAutoSummary}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-200">
        Generate with AI
      </button>

      <InputField
        label="Professional Summary"
        type="textarea"
        rows={6}
        placeholder="Write a compelling professional summary that highlights your experience, skills, and career objectives. Focus on your unique value proposition and what makes you stand out..."
        value={resumeData.information.summary}
        onChange={value => handlePersonalChange('summary', value)}
        required
      />
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-3">
          <Lightbulb className="text-blue-600 mt-0.5" size={18} />
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">Pro Tips:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Keep it concise (2-4 sentences)</li>
              <li>• Highlight your most relevant experience</li>
              <li>• Include specific achievements or metrics</li>
              <li>• Tailor it to your target role</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  const renderEducation = () => (
    <div className="space-y-6">
      {resumeData.education.map((edu, index) => (
        <SectionCard
          key={index}
          title={`Education ${index + 1}`}
          index={index}
          onRemove={
            resumeData.education.length > 1
              ? () => removeItem('education', index)
              : null
          }
          canRemove={resumeData.education.length > 1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="School/University"
              placeholder="University of Example"
              value={edu.school}
              onChange={value => handleEducationChange(index, 'school', value)}
              required
            />
            <InputField
              label="Degree"
              placeholder="Bachelor of Science in Computer Science"
              value={edu.degree}
              onChange={value => handleEducationChange(index, 'degree', value)}
              required
            />
            <InputField
              label="Location"
              placeholder="City, State"
              value={edu.location}
              onChange={value =>
                handleEducationChange(index, 'location', value)
              }
            />
            <InputField
              label="GPA (Optional)"
              placeholder="3.8"
              value={edu.gpa}
              onChange={value => handleEducationChange(index, 'gpa', value)}
            />
            <InputField
              label="Start Date"
              type="date"
              value={edu.start_date}
              onChange={value =>
                handleEducationChange(index, 'start_date', value)
              }
            />
            <InputField
              label="End Date"
              type="date"
              value={edu.end_date}
              onChange={value =>
                handleEducationChange(index, 'end_date', value)
              }
            />
          </div>
        </SectionCard>
      ))}
      <button
        onClick={addEducation}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 text-blue-600 border-2 border-dashed border-blue-300 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all duration-200">
        <Plus size={20} />
        Add Another Education
      </button>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      {resumeData.experience.map((exp, index) => (
        <SectionCard
          key={index}
          title={`Experience ${index + 1}`}
          index={index}
          onRemove={
            resumeData.experience.length > 1
              ? () => removeItem('experience', index)
              : null
          }
          canRemove={resumeData.experience.length > 1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField
              label="Company"
              placeholder="Tech Corp"
              value={exp.company}
              onChange={value =>
                handleExperienceChange(index, 'company', value)
              }
              required
            />
            <InputField
              label="Job Title"
              placeholder="Software Engineer"
              value={exp.title}
              onChange={value => handleExperienceChange(index, 'title', value)}
              required
            />
            <InputField
              label="Start Date"
              type="date"
              value={exp.start_date}
              onChange={value =>
                handleExperienceChange(index, 'start_date', value)
              }
            />
            <InputField
              label="End Date (or 'Present')"
              type="date"
              value={exp.end_date}
              onChange={value =>
                handleExperienceChange(index, 'end_date', value)
              }
            />
          </div>
          <InputField
            label="Job Description & Achievements"
            type="textarea"
            rows={4}
            placeholder="• Developed and maintained web applications using React and Node.js&#10;• Led a team of 3 developers on a major project that increased efficiency by 40%&#10;• Implemented automated testing that reduced bugs by 60%"
            value={exp.description}
            onChange={value =>
              handleExperienceChange(index, 'description', value)
            }
            required
          />
        </SectionCard>
      ))}
      <button
        onClick={addExperience}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 text-blue-600 border-2 border-dashed border-blue-300 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all duration-200">
        <Plus size={20} />
        Add Another Experience
      </button>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      {resumeData.projects.map((project, index) => (
        <SectionCard
          key={index}
          title={`Project ${index + 1}`}
          index={index}
          onRemove={
            resumeData.projects.length > 1
              ? () => removeItem('projects', index)
              : null
          }
          canRemove={resumeData.projects.length > 1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField
              label="Project Name"
              placeholder="My Awesome Project"
              value={project.name}
              onChange={value => handleProjectChange(index, 'name', value)}
              required
            />
            <InputField
              label="Completion Date"
              type="date"
              value={project.end_date}
              onChange={value => handleProjectChange(index, 'end_date', value)}
            />
          </div>
          <InputField
            label="Technologies Used"
            placeholder="Python, React, Node.js, MongoDB, AWS"
            value={project.skills}
            onChange={value => handleProjectChange(index, 'skills', value)}
            required
            className="mb-4"
          />
          <InputField
            label="Project Description"
            type="textarea"
            rows={4}
            placeholder="Describe your project, its purpose, your role, and the impact it had. Include specific metrics and achievements where possible."
            value={project.description}
            onChange={value => handleProjectChange(index, 'description', value)}
            required
          />
          <button
            type="button"
            onClick={() => {
              if (!project.name || !project.skills) {
                setError(
                  'Please fill in the Project Name and Technologies Used before generating a description.',
                );
                return;
              }
              handleAutoProjectDescription(index);
            }}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-200">
            Generate Description with AI
          </button>
        </SectionCard>
      ))}
      <button
        onClick={addProject}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 text-blue-600 border-2 border-dashed border-blue-300 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all duration-200">
        <Plus size={20} />
        Add Another Project
      </button>
    </div>
  );
  const renderSkills = () => (
    <div className="space-y-8">
      {/* Technical Skills */}
      <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border-2 border-blue-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Code className="text-blue-600" size={24} />
          Technical Skills
        </h3>
        {Object.entries(resumeData.technical_skills).map(
          ([category, skills]) => (
            <div key={category} className="mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                {category}
              </h4>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder={`Enter ${category
                        .toLowerCase()
                        .slice(0, -1)}`}
                      value={skill}
                      onChange={e =>
                        handleTechnicalSkillChange(
                          category,
                          index,
                          e.target.value,
                        )
                      }
                    />
                    {skills.length > 1 && (
                      <button
                        onClick={() =>
                          removeItem('technical_skills', index, category)
                        }
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addTechnicalSkill(category)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 border-2 border-blue-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 w-fit">
                  <Plus size={14} />
                  Add {category.slice(0, -1)}
                </button>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Soft Skills */}
      <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-2xl border-2 border-green-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Lightbulb className="text-green-600" size={24} />
          Soft Skills
        </h3>
        <div className="space-y-3">
          {resumeData.soft_skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                placeholder="Enter soft skill (e.g., Leadership, Communication)"
                value={skill}
                onChange={e => handleSoftSkillChange(index, e.target.value)}
              />
              {resumeData.soft_skills.length > 1 && (
                <button
                  onClick={() => removeItem('soft_skills', index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addSoftSkill}
            className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 border-2 border-green-300 rounded-lg hover:bg-green-50 hover:border-green-400 transition-all duration-200 w-fit">
            <Plus size={14} />
            Add Soft Skill
          </button>
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (sections[currentStep].key) {
      case 'personal':
        return renderPersonalInfo();
      case 'summary':
        return renderSummary();
      case 'education':
        return renderEducation();
      case 'experience':
        return renderExperience();
      case 'projects':
        return renderProjects();
      case 'skills':
        return renderSkills();
      default:
        return null;
    }
  };

  const CurrentIcon = sections[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Professional Resume Builder
              </h1>
              <p className="text-gray-600 mt-1">
                Create a stunning resume in minutes
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Step {currentStep + 1} of {sections.length}
              </div>
              <button
                onClick={handlePreview}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200">
                <Eye size={16} />
                Preview
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isCompleted = completedSections.has(section.key);
              const isCurrent = index === currentStep;

              return (
                <div key={section.key} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-lg scale-110'
                        : isCompleted
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                    }`}
                    onClick={() => setCurrentStep(index)}>
                    {isCompleted && !isCurrent ? (
                      <CheckCircle size={20} />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                  {index < sections.length - 1 && (
                    <div
                      className={`flex-1 h-2 mx-2 rounded-full transition-all duration-300 ${
                        isCompleted ? 'bg-green-400' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CurrentIcon className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {sections[currentStep].label}
                </h2>
                <p className="text-gray-600 mt-1">
                  {sections[currentStep].description}
                </p>
              </div>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-red-500 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-red-800">Error</h4>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-green-800">Success</h4>
                  <p className="text-green-700">{success}</p>
                </div>
              </div>
            )}

            {loading && (
              <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-center gap-3">
                <Loader2 className="text-blue-500 animate-spin" size={20} />
                <span className="text-blue-700">
                  Generating your resume, please wait...
                </span>
              </div>
            )}

            {/* Section Content */}
            <div>{renderCurrentSection()}</div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  currentStep === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                <ChevronLeft size={18} />
                Previous
              </button>
              {currentStep < sections.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200">
                  Next
                  <ChevronRight size={18} />
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={generateResume}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
                    <Download size={18} />
                    {loading ? 'Generating...' : 'Download Resume'}
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200">
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {previewPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full relative">
            <button
              onClick={() => setPreviewPdf(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
            <iframe
              src={previewPdf}
              title="Resume Preview"
              className="w-full h-[70vh] border rounded"
            />
          </div>
        </div>
      )}
      {previewLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 flex items-center gap-3">
            <Loader2 className="animate-spin text-blue-600" size={24} />
            <span>Generating preview...</span>
          </div>
        </div>
      )}
      {previewError && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-3">
            <AlertCircle className="text-red-500" size={24} />
            <span className="text-red-700">{previewError}</span>
            <button
              onClick={() => setPreviewError(null)}
              className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  rows: PropTypes.number,
};

SectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onRemove: PropTypes.func,
  canRemove: PropTypes.bool,
  index: PropTypes.number,
};

export default ModernResumeBuilder;
