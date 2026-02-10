import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname
      .replace(ext, '')
      .replace(/\s+/g, '_')
      .toLowerCase();

    cb(null, `${name}_${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/pdf' &&
    path.extname(file.originalname).toLowerCase() === '.pdf'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos PDF são permitidos'), false);
  }
};

const uploadCurriculum = multer({
  storage,
  fileFilter,
  // limits: {
  //   fileSize: 5 * 1024 * 1024 // 5MB
  // }
});

export default uploadCurriculum;
