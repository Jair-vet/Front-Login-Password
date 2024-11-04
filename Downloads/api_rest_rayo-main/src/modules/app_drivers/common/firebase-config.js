const admin = require('firebase-admin');
const serviceAccount = require('./../../../../serviceAccountKeyClient.json'); // Cambia la ruta al archivo de credenciales

const appClient = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
}, 'Clients');
module.exports = appClient;
