'use client'
import { useState } from 'react';

const Home = () => {
  const [emailContent, setEmailContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeEmail = async () => {
    setLoading(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: emailContent }),
      });

      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error('Error analyzing email:', error);
      setAnalysisResult({ error: 'Failed to analyze email content.' });
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysisResult = (result: any) => {
    if (result.error) {
      return <p className="text-red-500 font-semibold">Error: {result.error}</p>;
    }
  
    // Check if the result contains the expected data
    if (result && result[0] && result[0][0]) {
      const { label, score } = result[0][0];
      return (
        <div className="mt-6 p-6 border rounded-lg bg-blue-50 shadow-xl">
          <h3 className="text-xl font-bold text-blue-700">Analysis Result</h3>
          <p className="mt-2 text-lg text-blue-800">
            <span className="font-semibold">Prediction:</span> {label}
          </p>
          <p className="text-blue-600">
            <span className="font-semibold">Confidence:</span> {(score * 100).toFixed(2)}%
          </p>
        </div>
      );
    }
  
    // Handle case where result format is unexpected
    return <p className="text-yellow-500 font-semibold">Invalid response format.</p>;
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
          Malicious Email Detector
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Paste your email content below to analyze if it contains malicious content.
        </p>
        <textarea
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50 text-gray-800"
          placeholder="Paste your email content here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />

        <button
          className={`mt-6 w-full py-3 px-4 rounded-lg text-white font-semibold transition ${
            loading || !emailContent.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={analyzeEmail}
          disabled={loading || !emailContent.trim()}
        >
          {loading ? 'Analyzing...' : 'Analyze Email'}
        </button>
        {analysisResult && renderAnalysisResult(analysisResult)}
      </div>
    </div>
  );
};

export default Home;
