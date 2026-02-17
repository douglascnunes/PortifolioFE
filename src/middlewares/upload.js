import multer from 'multer';
import path from 'path';
import slugify from 'slugify';



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = slugify(file.originalname.replace(ext, ''), {
      lower: true,
      strict: true
    });

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
