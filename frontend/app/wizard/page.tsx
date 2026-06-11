'use client';

import { useState } from 'react';

export default function DiscoveryWizard() {
  const [step, setStep] = useState(1);
  const [generatedCharter, setGeneratedCharter] = useState('');
  const [useAI, setUseAI] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    industry: '',
    country: '',
    employees: '',
    project_name: '',
    business_problem: '',
    desired_outcome: '',
    strategic_objectives: '',
    budget: '',
    timeline: '',
    risks: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const generateCharter = async () => {
    const endpoint = useAI 
      ? 'http://localhost:8000/api/generate-ai-charter'
      : 'http://localhost:8000/api/generate-charter';
      
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intake: {
          company_name: formData.company_name,
          industry: formData.industry,
          country: formData.country,
          employees: parseInt(formData.employees) || 0,
          project_name: formData.project_name,
          business_problem: formData.business_problem,
          desired_outcome: formData.desired_outcome,
          strategic_objectives: formData.strategic_objectives.split(',').map(s => s.trim()),
          budget: parseFloat(formData.budget) || 0,
          timeline: formData.timeline,
          risks: formData.risks.split(',').map(r => r.trim()),
          assumptions: [],
          constraints: []
        }
      })
    });
    
    const data = await response.json();
    setGeneratedCharter(data.charter || data.error || 'Error generating charter');
    setStep(5);
  };

  const exportToPDF = async () => {
    const response = await fetch('http://localhost:8000/api/export-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intake: {
          company_name: formData.company_name,
          industry: formData.industry,
          country: formData.country,
          employees: parseInt(formData.employees) || 0,
          project_name: formData.project_name,
          business_problem: formData.business_problem,
          desired_outcome: formData.desired_outcome,
          strategic_objectives: formData.strategic_objectives.split(',').map(s => s.trim()),
          budget: parseFloat(formData.budget) || 0,
          timeline: formData.timeline,
          risks: formData.risks.split(',').map(r => r.trim()),
          assumptions: [],
          constraints: []
        }
      })
    });
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.project_name}_charter.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const resetWizard = () => {
    setStep(1);
    setUseAI(false);
    setFormData({
      company_name: '',
      industry: '',
      country: '',
      employees: '',
      project_name: '',
      business_problem: '',
      desired_outcome: '',
      strategic_objectives: '',
      budget: '',
      timeline: '',
      risks: ''
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '48px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '8px' }}>Axulo PMaaS</h1>
        <p style={{ color: '#6b7280', marginBottom: '32px' }}>Project Discovery Wizard</p>

        {/* Progress Bar */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3, 4].map((s) => (
              <div key={s} style={{ flex: 1, height: '8px', backgroundColor: step >= s ? '#2563eb' : '#e5e7eb', borderRadius: '4px' }} />
            ))}
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>Step {step} of 4</p>
        </div>

        {/* Step 1: Organization */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Organization Information</h2>
            <input name="company_name" placeholder="Company Name" onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '12px' }} />
            <input name="industry" placeholder="Industry" onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '12px' }} />
            <input name="country" placeholder="Country" onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '12px' }} />
            <input name="employees" type="number" placeholder="Number of Employees" onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
          </div>
        )}

        {/* Step 2: Project Info */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Project Information</h2>
            <input name="project_name" placeholder="Project Name" onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '12px' }} />
            <textarea name="business_problem" placeholder="Business Problem" rows={3} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '12px', fontFamily: 'inherit' }} />
            <textarea name="desired_outcome" placeholder="Desired Outcome" rows={3} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontFamily: 'inherit' }} />
          </div>
        )}

        {/* Step 3: Strategic & Financial */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Strategic &amp; Financial</h2>
            <textarea name="strategic_objectives" placeholder="Strategic Objectives (comma-separated)" rows={3} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '12px', fontFamily: 'inherit' }} />
            <input name="budget" type="number" placeholder="Budget (USD)" onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '12px' }} />
            <input name="timeline" placeholder="Timeline (e.g., 6 months)" onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
          </div>
        )}

        {/* Step 4: Risks & AI Toggle */}
        {step === 4 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Risks &amp; Final</h2>
            <textarea name="risks" placeholder="Initial Risks (comma-separated)" rows={4} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '16px', fontFamily: 'inherit' }} />
            
            {/* AI Toggle */}
            <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={useAI} 
                  onChange={(e) => setUseAI(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: '600', color: '#1e40af' }}>✨ Use AI-Powered Generation (OpenAI)</span>
              </label>
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px', marginBottom: 0 }}>
                AI generates detailed, executive-quality charters with risk analysis, ROI calculations, and stakeholder mapping
              </p>
            </div>
            
            <button onClick={generateCharter} style={{ width: '100%', backgroundColor: '#16a34a', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
              Generate Project Charter
            </button>
          </div>
        )}

        {/* Step 5: Results */}
        {step === 5 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
              {useAI ? '✨ AI-Powered ' : ''}Generated Project Charter
            </h2>
            <pre style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '13px', maxHeight: '400px', overflow: 'auto', border: '1px solid #e5e7eb' }}>
              {generatedCharter}
            </pre>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button onClick={exportToPDF} style={{ flex: 1, backgroundColor: '#dc2626', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                📄 Export to PDF
              </button>
              <button onClick={resetWizard} style={{ flex: 1, backgroundColor: '#2563eb', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                Start New Project
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
          {step > 1 && step < 5 && (
            <button onClick={prevStep} style={{ padding: '8px 24px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Back
            </button>
          )}
          {step < 4 && (
            <button onClick={nextStep} style={{ padding: '8px 24px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: 'auto' }}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
