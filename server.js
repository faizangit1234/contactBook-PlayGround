const express = require('express');
const process = require('process');

const port = process.env.PORT ||  3000;
const app = express();

app.listen(port, () => {       
    console.log(`Server is running on port ${port}`);
}
);

app.use('/api/v1/contacts', require("./routes/contactRoutes.js"));
