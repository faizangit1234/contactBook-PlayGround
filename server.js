const express = require('express');
const dotenv = require('dotenv').config();
const { swaggerUi, swaggerSpec } = require('./swagger');
const userRoutes = require('./src/routes/userRoutes.js');
const contactRoutes = require('./src/routes/contactRoutes.js');
const companyRoutes = require('./src/routes/companyRoutes.js');
const departmentRoutes = require('./src/routes/departmentRoutes.js');
const uploadRoutes = require('./src/routes/uploadRoutes.js');
const errorHandler = require('./src/middlewares/errorHandler.js');
const connectDb = require('./src/utils/connectDb.js');

const app = express();
const port = process.env.PORT || 5000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to database
connectDb();

// Parse JSON body
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Contact Book');
});

// 🟢 Error handler middleware (ALWAYS at the END)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
