const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API route for media forensics
app.post('/api/verify', (req, res) => {
  const { fileName } = req.body;

  if (!fileName) {
    return res.status(400).json({ error: 'File name is required' });
  }

  // Simulated AI Verification Engine Response
  res.json({
    success: true,
    fileName: fileName,
    pHashMatchScore: 0.02,
    clipSemanticScore: 0.992,
    status: 'AUTHENTIC',
    verificationIndex: 98,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Verified Campus API running on port ${PORT}`);
});
