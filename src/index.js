const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuid } = require('uuid');
// Inicialización
const app = express();
require('./database');

// Configuración
app.set('port', process.env.PORT || 12345);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.use(upload.single('image'));

// Rutas
app.use(require('./routes/index'));

// Archivos estáticos
app.use(express.static(path.join(__dirname,'public')));
// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});
