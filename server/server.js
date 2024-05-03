require('dotenv').config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const cors = require("cors");
const connectDB = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');
const serviceroute = require('./router/service-router');
const hospital1route = require('./router/hospitals1-router');
const adminrouter = require("./router/admin-route")

//handling cors policy
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, HEAD, PATCH",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", router); //ab iss path pe jana pdega
app.use("/api/data", serviceroute);
app.use("/api/hospital", hospital1route);
app.use("/api/admin", adminrouter);

app.use(errorMiddleware);

const PORT = 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
});