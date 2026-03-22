import multer from 'multer';
import path from 'path';
import slugify from 'slugify';


function createUploader({ folder, allowedMimeTypes, allowedExt }) {

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `src/uploads/${folder}`);
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
    const ext = path.extname(file.originalname).toLowerCase();

    if (
      allowedMimeTypes.includes(file.mimetype) &&
      allowedExt.includes(ext)
    ) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'), false);
    }
  };

  return multer({
    storage,
    fileFilter,
  });
};


export const uploadCurriculum = createUploader({
  folder: 'curriculum',
  allowedMimeTypes: ['application/pdf'],
  allowedExt: ['.pdf']
});


export const uploadTag = createUploader({
  folder: 'tag',
  allowedMimeTypes: ['image/svg+xml'],
  allowedExt: ['.svg']
});