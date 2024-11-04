const admin = require('firebase-admin');
const serviceAccount = require('../../../../serviceAccountKeyDrive.json'); // Cambia la ruta al archivo de credenciales

const appDriver = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

}, 'Drivers');
module.exports = appDriver;
