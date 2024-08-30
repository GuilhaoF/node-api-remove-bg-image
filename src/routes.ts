import { Router } from 'express';
import multer from 'multer';
import { removeBackgroundFile } from './imageProcessor';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/main', (req, res) => {
  res.send('Hello World!');
});

router.post('/remove-background', upload.single('image'), async (req, res) => {
  try {
    console.log('File received:', req.file);
    const processedImagePath = await removeBackgroundFile(req.file!.path);
    res.download(processedImagePath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing image');
  }
});

export default router;
