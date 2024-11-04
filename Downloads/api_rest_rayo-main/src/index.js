const express = require("express");

const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());




const appClientsRoutes = require('./modules/app_clients');
const appDriversRoutes = require('./modules/app_drivers')
const appAdminRoutes = require('./modules/app_admin')


app.use('/api/app_clients', appClientsRoutes);
app.use('/api/app_drivers', appDriversRoutes);
app.use('/api/app_admins', appAdminRoutes);


const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN PUERTO: ${PORT}`);
});
