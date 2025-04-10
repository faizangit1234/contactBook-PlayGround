const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/errorHandler.js');
const connetDb = require('./config/db.js');

connetDb();
const port = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use('/api/v1/contacts', require('./routes/contactRoutes.js'));
app.use('/api/v1/users', require('./routes/userRoutes.js'));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/hello", (req, res) => {
  res.send("hello from backend");
});
