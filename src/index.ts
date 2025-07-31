import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads folder if it doesn't exist
const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Configure multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Serve uploaded files statically
app.use('/uploads', express.static(uploadPath));

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  const fileUrl = `/uploads/${req.file.filename}`;
  res.send(`File uploaded successfully. Access it at: ${fileUrl}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
