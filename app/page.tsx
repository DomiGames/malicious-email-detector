'use client';

import { useState } from 'react';

type AnalysisResult = {
  label: string;
  score: number;
}[][]; // Updated to reflect the nested structure

const Home = () => {
  const [emailContent, setEmailContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      console.log('API Response:', data); // Log the raw response for debugging

      setAnalysisResult(data);
    } catch (error) {
      console.error('Error analyzing email:', error);
      setAnalysisResult([]);
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysisResult = (result: AnalysisResult) => {
    if (!result || result.length === 0 || result[0].length === 0) {
      return <p className="text-yellow-500 font-semibold">No analysis result found.</p>;
    }

    // Get the highest scored label
    const [positive, negative] = result[0]; // The first array contains the labels
    const highest = positive.score > negative.score ? positive : negative;
    const { label, score } = highest;

    // Ensure score is a valid number before displaying
    const confidence = isNaN(score) ? 'N/A' : (score * 100).toFixed(2);

    return (
      <div className="mt-6 p-6 border rounded-lg bg-blue-50 shadow-xl">
        <h3 className="text-xl font-bold text-blue-700">Analysis Result</h3>
        <p className="mt-2 text-lg text-blue-800">
          <span className="font-semibold">Prediction:</span> {label}
        </p>
        <p className="text-blue-600">
          <span className="font-semibold">Confidence:</span> {confidence}%
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
          Domi Malicious Email Detector
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
