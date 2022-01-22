const express = require('express');
const app = express();
const server = require('http').Server(app);
const clr = require('./app/lib/Color');
require('dotenv').config(); // Read .env

const PORT = process.env.PORT || 80;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Header
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
    next();
});

//Routes
const pengumumanRoutes = require('./app/routes/pengumuman')
const kelasRoutes = require('./app/routes/kelas')

//Routing
app.use('/api/v1/pengumuman', pengumumanRoutes);
app.use('/api/v1/kelas', kelasRoutes)

// Error handling
app.use((error, req, res, next) => {
    const E_STATUS = error.errorStatus || 500;
    const E_MESSAGE = error.message || "Internal server error";
    const E_DATA = error.data || null;
    res.status(E_STATUS).json({message: E_MESSAGE, data: E_DATA});
})

server.listen(PORT, ()=> clr.success("Server is running on port "+PORT));
