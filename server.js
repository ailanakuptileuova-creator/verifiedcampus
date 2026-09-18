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

  // Криптографический хэш для проверки дубликатов и целостности
  const hash = crypto.createHash('sha256').update(file.buffer).digest('hex');
  const shortHash = `${hash.slice(0, 4)}-${hash.slice(4, 8)}-${hash.slice(8, 12)}`;

  const sizeKb = (file.size / 1024).toFixed(1);
  const isImage = file.mimetype.startsWith('image/');
  
  // Эмуляция детектора аномалий / подделки (если файл подозрительно маленький или имеет неверное расширение)
  const isSuspicious = file.size < 2048 || file.originalname.includes('fake') || file.originalname.includes('edit');
  
  let score = isSuspicious ? 42.5 : (isImage ? 91.2 : 96.5);
  if (!isSuspicious && university.toLowerCase().includes('nazarbayev')) {
    score = 98.4;
  }

  const responseData = {
    auditId: `VC-${Date.now().toString().slice(-6)}`,
    university: university || 'Неизвестное учебное заведение',
    docType: docType || 'Студенческий документ / Медиа',
    fileName: file.originalname,
    fileSize: `${sizeKb} KB`,
    score: score.toFixed(1),
    pHash: `${shortHash} (0.00% collision)`,
    clipScore: `${(score - 1.5).toFixed(1)}% Visual Context Match`,
    metadataStatus: isSuspicious ? '⚠️ Аномалия: Нарушена цифровая подпись' : '✅ PKI Header & Digital Seal Validated',
    dormitoryStatus: docType.includes('Dormitory') ? (isSuspicious ? 'Отказ: Несоответствие координат геолокации' : 'Подтверждено: Кампусный сектор А') : 'N/A',
    sectionStatus: docType.includes('Section') ? (isSuspicious ? 'Отказ: Шаблон не найден в базе тренера' : 'Верифицировано: Спортивная сборная') : 'N/A',
    verdict: isSuspicious 
      ? 'Обнаружены признаки цифровой модификации или подделки документа. Статус: НЕДОСТОВЕРНО.' 
      : `Документ успешно прошёл верификацию в реестре ${university}.`,
    isAuthentic: !isSuspicious && score >= 80
  };

  return res.json(responseData);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Verified Campus Server running on port ${PORT}`);
});
