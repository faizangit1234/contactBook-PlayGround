const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/errorHandler.js');

const port = process.env.PORT || 3000;
const app = express();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use('/api/v1/contacts', require('./routes/contactRoutes.js'));
app.use(errorHandler);
