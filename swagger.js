const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const routes=require("./src/routes/userRoutes/js")

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Your API Title",
            version: "1.0.0",
            description: "API documentation for your project",
        },
        servers: [
            {
                url: "http://localhost:5000", // change if using another port or prod URL
            },
        ],
    },
    apis: ["./src/routes/**/*.js", "./src/models/**/*.js"], // 👈 Where you write Swagger comments
    tags: [
        {
            name: "Users",
            description: "User related routes",
        },
        {
            name: "Companies",
            description: "Company related routes",
        },
    ],

    

};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
