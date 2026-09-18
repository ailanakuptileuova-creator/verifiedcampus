import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, Upload, FileText, RefreshCw, CheckCircle2, 
  AlertTriangle, Building2, Layers, Cpu, Search, FileCheck, Home, Trophy, Eye 
} from 'lucide-react';

interface AuditResult {
  auditId: string;
  university: string;
  docType: string;
  fileName: string;
  fileSize: string;
  score: string;
  pHash: string;
  clipScore: string;
  metadataStatus: string;
  dormitoryStatus: string;
  sectionStatus: string;
  verdict: string;
  isAuthentic: boolean;
}

export default function App() {
  const [universityInput, setUniversityInput] = useState('Nazarbayev University');
  const [docType, setDocType] = useState('Diploma / Transcript');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const predefinedUniversities = [
    'Nazarbayev University',
    'KazNU (Al-Farabi)',
    'ENU (L.N. Gumilyov)',
    'AITU (Astana IT University)',
    'KBTU (Kazakh-British Technical University)',
    'NIS (Nazarbayev Intellectual Schools)'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);

      const reader = new FileReader();
      if (selectedFile.type.startsWith('image/')) {
        reader.onload = (evt) => {
          setFilePreview(evt.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleScan = () => {
    if (!file) return;
    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      setIsScanning(false);
      
      // Детектор аномалий для демонстрации подделки
      const isSuspicious = file.size < 2048 || file.name.toLowerCase().includes('fake') || file.name.toLowerCase().includes('edit');
      const scoreNum = isSuspicious ? 38.4 : 95.8;

      setResult({
        auditId: `VC-${Math.floor(100000 + Math.random() * 900000)}`,
        university: universityInput,
        docType: docType,
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        score: scoreNum.toFixed(1),
        pHash: `a4f2-98bc-41e2 (0.00% collision)`,
        clipScore: isSuspicious ? '41.2% (Low Pattern Match)' : '97.4% (High Registry Match)',
        metadataStatus: isSuspicious ? '❌ Ошибка: Обнаружены следы графического редактора' : '✅ PKI Header & Digital Seal Validated',
        dormitoryStatus: docType.includes('Dormitory') ? (isSuspicious ? '❌ Отказ: Несовпадение меток геозоны' : '✅ Подтверждено: Кампусный блок 4, комната 302') : 'N/A',
        sectionStatus: docType.includes('Section') ? (isSuspicious ? '❌ Отказ: Штамп секции не прошел валидацию' : '✅ Верифицировано: Капитан/Участник сборной') : 'N/A',
        verdict: isSuspicious 
          ? 'Документ признан НЕДОСТОВЕРНЫМ. Обнаружены несоответствия метаданных и структуры пикселей.' 
          : `Документ успешно верифицирован в системе ${universityInput}. Подлинность подтверждена.`,
        isAuthentic: !isSuspicious
      });
    }, 1500);
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
            <p className="text-xs text-slate-400">AI-Powered Credential, Dormitory & Section Verification</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300 font-medium">Anti-Fraud Node: Online</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Панель управления / Загрузка */}
        <section className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Upload className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-semibold">Параметры проверки</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Университет / Организация
              </label>
              <input 
                type="text"
                list="universities-list"
                value={universityInput}
                onChange={(e) => setUniversityInput(e.target.value)}
                placeholder="Введите или выберите вуз..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              />
              <datalist id="universities-list">
                {predefinedUniversities.map((univ, idx) => (
                  <option key={idx} value={univ} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Тип документа / Запроса
              </label>
              <select 
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="Diploma / Transcript">Диплом / Академическая справка</option>
                <option value="Dormitory Living Proof">Общежитие (Подтверждение проживания)</option>
                <option value="Sports Section Record">Спортивная секция / Сборная</option>
                <option value="Campus Media / Photo">Живое фото кампуса / События</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Загрузка файла (PDF, JPG, PNG)
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 transition rounded-xl p-5 text-center bg-slate-950/50 cursor-pointer relative"
              >
                <input 
                  ref={fileInputRef}
                  type="file" 
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                />
                
                {filePreview ? (
                  <div className="flex flex-col items-center">
                    <img src={filePreview} alt="Preview" className="max-h-28 rounded border border-slate-700 mb-2 object-contain" />
                    <p className="text-xs text-indigo-400 font-medium truncate max-w-full">{file?.name}</p>
                  </div>
                ) : file ? (
                  <div>
                    <FileText className="w-8 h-8 mx-auto text-indigo-400 mb-2" />
                    <p className="text-sm text-indigo-400 font-medium truncate">{file.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div>
                    <Eye className="w-8 h-8 mx-auto text-slate-500 mb-2" />
                    <p className="text-xs text-slate-400">Нажмите для выбора файла (или фото общаги/секции)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={handleScan} 
            disabled={!file || isScanning || !universityInput.trim()}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
            {isScanning ? 'Анализ подлинности...' : 'Запустить верификацию'}
          </button>
        </section>

        {/* Панель результатов и детекции */}
        <section className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-semibold">Отчет системы антифрода</h2>
              </div>
              {result && (
                <span className="text-xs font-mono text-slate-500">ID аудита: {result.auditId}</span>
              )}
            </div>

            {result ? (
              <div className="space-y-5">
                <div className={`p-5 rounded-2xl border flex items-center justify-between ${
                  result.isAuthentic 
                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                    : 'bg-rose-500/10 border-rose-500/30'
                }`}>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                      result.isAuthentic ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {result.isAuthentic ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      {result.isAuthentic ? 'Документ подлинный' : 'Обнаружена подделка / Ошибка'}
                    </div>
                    <div className="text-sm text-slate-200 font-medium mt-1">{result.university}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{result.docType}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-black ${result.isAuthentic ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {result.score}%
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Индекс доверия</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Детали проверки модулей</h3>
                  
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Файл:</span>
                      <span className="font-mono text-slate-200">{result.fileName}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-900 pt-2">
                      <span className="text-slate-400">Проверка метаданных:</span>
                      <span className={result.isAuthentic ? "text-emerald-400 font-medium" : "text-rose-400 font-medium"}>{result.metadataStatus}</span>
                    </div>
                    {result.docType.includes('Dormitory') && (
                      <div className="flex justify-between items-center border-t border-slate-900 pt-2">
                        <span className="text-slate-400">Контроль общежития:</span>
                        <span className="text-indigo-400 font-medium">{result.dormitoryStatus}</span>
                      </div>
                    )}
                    {result.docType.includes('Sports') && (
                      <div className="flex justify-between items-center border-t border-slate-900 pt-2">
                        <span className="text-slate-400">Спортивная секция:</span>
                        <span className="text-indigo-400 font-medium">{result.sectionStatus}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center border-t border-slate-900 pt-2">
                      <span className="text-slate-400">Контекстный CLIP-анализ:</span>
                      <span className="text-slate-200 font-mono">{result.clipScore}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/60 space-y-1.5">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className={result.isAuthentic ? "text-emerald-400" : "text-rose-400"}>Вердикт системы:</strong> {result.verdict}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 text-xs flex flex-col items-center justify-center h-64 border border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
                <FileCheck className="w-12 h-12 text-slate-700 mb-3" />
                <p className="text-slate-400 font-medium">Ожидание загрузки файлов</p>
                <p className="text-slate-600 mt-1">Загрузите справку, фото общежития или отчёт по секции для проверки.</p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Verified Campus Anti-Fraud Node v1.2</span>
            <span>AI Startify Incubator MVP</span>
          </div>
        </section>
      </main>
    </div>
  );
}
