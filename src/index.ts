import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

// Multer config: files saved in 'uploads' folder with random filenames
const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });

// Make sure uploads folder exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Upload endpoint: POST /upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({
    message: 'File uploaded successfully',
    filename: req.file.filename, // this is the saved filename (random)
    originalName: req.file.originalname
  });
});

// Download endpoint: GET /download/:filename
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        res.status(500).send('Error downloading file');
      }
    });
  } else {
    res.status(404).send('File not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

