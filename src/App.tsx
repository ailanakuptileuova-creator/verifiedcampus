import React, { useState } from 'react';
import { ShieldCheck, Upload, FileText, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScan = () => {
    setIsScanning(true);
    setResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setResult({
        status: 'Authentic',
        score: 98,
        pHashMatch: '0% (Unique Hash)',
        clipSemantic: '99.2% Match with Official Template',
        verdict: 'Document verified against university registry.'
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <header className="max-w-5xl mx-auto flex justify-between items-center pb-8 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <h1 className="text-2xl font-bold tracking-tight">Verified Campus</h1>
        </div>
        <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
          AI Engine Active
        </span>
      </header>

      <main className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-400" /> Upload Document or Media
          </h2>
          <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center bg-slate-950/50 hover:border-slate-600 transition">
            <FileText className="w-12 h-12 mx-auto text-slate-500 mb-3" />
            <p className="text-sm text-slate-400 mb-4">Drag and drop certificates, research papers, or media files</p>
            <button 
              onClick={handleScan} 
              disabled={isScanning}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-lg transition disabled:opacity-50 flex items-center gap-2 mx-auto"
            >
              {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
              {isScanning ? 'Running AI Forensics...' : 'Run Verification Scan'}
            </button>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Verification Audit Results</h2>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs text-emerald-400 font-medium uppercase tracking-wider">Status</div>
                  <div className="text-xl font-bold text-emerald-300">{result.status}</div>
                </div>
                <div className="text-3xl font-black text-emerald-400">{result.score}%</div>
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                <p><strong>pHash Similarity:</strong> {result.pHashMatch}</p>
                <p><strong>CLIP Semantic Score:</strong> {result.clipSemantic}</p>
                <p className="text-xs text-slate-400 mt-2">{result.verdict}</p>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 text-sm flex items-center justify-center h-40 border border-slate-800 rounded-lg">
              Awaiting file scan...
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
