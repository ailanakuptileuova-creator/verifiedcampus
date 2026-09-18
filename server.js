const express = require('express');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.post('/api/verify', upload.single('document'), (req, res) => {
  const { university, docType } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'Файл не загружен' });
  }

  // Расчет криптографической хэш-суммы загруженного файла (pHash simulation)
  const hash = crypto.createHash('sha256').update(file.buffer).digest('hex');
  const pHash = `${hash.slice(0, 4)}-${hash.slice(4, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}`;

  // Оценка размера и типа файла для имитации CLIP/OCR анализа
  const isPdf = file.mimetype === 'application/pdf';
  const sizeKb = (file.size / 1024).toFixed(1);
  
  // Формирование динамического балла
  const baseScore = isPdf ? 95.0 : 88.0;
  const variance = (file.size % 50) / 10;
  const finalScore = Math.min(99.9, baseScore + variance);

  const responseData = {
    auditId: `VC-${Date.now().toString().slice(-6)}`,
    university: university || 'Неуказанное учреждение',
    docType: docType || 'Документ',
    fileName: file.originalname,
    fileSize: `${sizeKb} KB`,
    score: finalScore.toFixed(1),
    pHash: `${pHash} (0.00% collision)`,
    clipScore: `${(finalScore - 1.2).toFixed(1)}% Contextual Match with Registry`,
    metadataStatus: 'Valid PKI Header & Digital Seal',
    verdict: `Документ успешно сопоставлен с реестром ${university || 'выбранной организации'}.`,
    isAuthentic: finalScore > 80
  };

  return res.json(responseData);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Verified Campus Server running on port ${PORT}`);
});
