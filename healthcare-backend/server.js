require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); 
const doctorRoutes = require('./routes/doctorRoutes'); 
const financeRoutes = require('./routes/financeRoutes');
const patientRoutes = require('./routes/patientRoutes');
const multer = require('multer');


const app = express();
const upload = multer();



mongoose.connect('mongodb://localhost:27017/healthcare-db').then(() => console.log('MongoDB connected.'))
.catch((error) => console.error('MongoDB connection error:', error));



app.use(express.json()); 
app.use(upload.any());

app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes); 
app.use('/finance', financeRoutes);
app.use('/patients', patientRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
