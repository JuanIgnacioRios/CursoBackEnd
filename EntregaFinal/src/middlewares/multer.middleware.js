import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Obtener __dirname en un módulo ES6
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

// Ruta de la carpeta uploads
const uploadDir = join(__dirname, '../uploads');

// Verificar y crear la carpeta uploads si no existe
if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const originalname = file.originalname;
        cb(null, `${req.params.uid}-${originalname}`);
    }
});

// Configurar multer para aceptar múltiples archivos
const upload = multer({ storage });

export const handleFiles = upload.any(); // Middleware genérico para manejar cualquier archivo

export default upload;