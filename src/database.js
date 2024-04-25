const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/apiimagen')
    .then(() => {
        console.log('DB is connected');
    })
    .catch((error) => {
        console.error(error);
    });
