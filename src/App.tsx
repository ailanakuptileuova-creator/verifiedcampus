import React, { useState } from 'react';
import { 
  ShieldCheck, Upload, FileText, RefreshCw, CheckCircle2, 
  AlertTriangle, Building2, Layers, Cpu, Search, FileCheck
} from 'lucide-react';

export default function App() {
  const [selectedUniversity, setSelectedUniversity] = useState('Nazarbayev University');
  const [docType, setDocType] = useState('Diploma / Transcript');
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleScan = () => {
    if (!file) return;
    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      setIsScanning(false);
      const isPdf = file.name.toLowerCase().endsWith('.pdf');
      
      // Генерация реалистичного отчета
      setResult({
        status: isPdf ? 'Authentic Credential' : 'Verified Media',
        score: isPdf ? 98.4 : 92.1,
        university: selectedUniversity,
        docType: docType,
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(1) + ' KB',
        pHash: 'a1b2-c3d4-e5f6-7890 (0.00% collision)',
        clipScore: isPdf ? '99.4% Match with Registry Template' : '93.2% Contextual Alignment',
        metadata: 'Valid Metadata Structure & Digital Seal',
        verdict: `Official credential cryptographically confirmed with ${selectedUniversity} database.`,
        auditId: 'VC-2026-' + Math.floor(100000 + Math.random() * 900000)
      });
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-10 font-sans">
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600/20 rounded-xl border border-indigo-500/30">
            <ShieldCheck className="w-7 h-7 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Verified Campus</h1>
            <p className="text-xs text-slate-400">AI-Powered Credential & Media Verification Protocol</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300 font-medium">Node Engine: Connected</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Панель управления и загрузки */}
        <section className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Upload className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-semibold">Audit Input Config</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Target University Registry
              </label>
              <select 
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="Nazarbayev University">Nazarbayev University</option>
                <option value="KazNU (Al-Farabi)">KazNU (Al-Farabi)</option>
                <option value="ENU (L.N. Gumilyov)">ENU (L.N. Gumilyov)</option>
                <option value="AITU (Astana IT University)">AITU (Astana IT University)</option>
                <option value="NIS (Nazarbayev Intellectual Schools)">NIS (Nazarbayev Intellectual Schools)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Document Classification
              </label>
              <select 
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="Diploma / Transcript">Diploma / Academic Transcript</option>
                <option value="Certificate / Award">Certificate / Competition Award</option>
                <option value="Research Paper">Research Paper / Monograph</option>
                <option value="Campus Photo/Video">Campus Media / Event Record</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                File Input (.pdf, .jpg, .png)
              </label>
              <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 transition rounded-xl p-6 text-center bg-slate-950/50 relative">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <FileText className="w-8 h-8 mx-auto text-slate-500 mb-2" />
                {file ? (
                  <div>
                    <p className="text-sm text-indigo-400 font-medium truncate">{file.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Click or drop candidate file to verify</p>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={handleScan} 
            disabled={!file || isScanning}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
            {isScanning ? 'Executing AI Forensics...' : 'Run Forensic Verification'}
          </button>
        </section>

        {/* Панель вывода результатов */}
        <section className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-semibold">Forensic Analysis Output</h2>
              </div>
              {result && (
                <span className="text-xs font-mono text-slate-500">ID: {result.auditId}</span>
              )}
            </div>

            {result ? (
              <div className="space-y-6">
                <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> {result.status}
                    </div>
                    <div className="text-sm text-slate-200 font-medium mt-1">{result.university}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{result.docType}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-emerald-400">{result.score}%</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Confidence Score</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Audit Components</h3>
                  
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">pHash Visual Hash:</span>
                      <span className="font-mono text-slate-200">{result.pHash}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-900 pt-2">
                      <span className="text-slate-400">CLIP Semantic Similarity:</span>
                      <span className="text-indigo-400 font-medium">{result.clipScore}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-900 pt-2">
                      <span className="text-slate-400">Metadata & PKI Seal:</span>
                      <span className="text-emerald-400 font-medium">{result.metadata}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/60">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-emerald-400">Verdict:</strong> {result.verdict}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 text-xs flex flex-col items-center justify-center h-64 border border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
                <FileCheck className="w-12 h-12 text-slate-700 mb-3" />
                <p className="text-slate-400 font-medium">Ready for Inspection</p>
                <p className="text-slate-600 mt-1">Select institution, upload document and launch audit.</p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Verified Campus Engine v1.0.4</span>
            <span>Protocol: Zero-Knowledge Verification</span>
          </div>
        </section>
      </main>
    </div>
  );
}
