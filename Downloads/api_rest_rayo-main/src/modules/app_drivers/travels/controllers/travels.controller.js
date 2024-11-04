const constants = require("../../../../core/helpers/constants/constants");
const pool = require("../../../../core/database/config");
const { errors } = require("../../../../core/helpers/constants/messages");
const tables = require("../../../../core/helpers/constants/tables");
const { createRecord, readAllRecord, updateRecord, readRecord } = require("../../../../core/helpers/functions");
const { sendNotification } = require("../../common/notification");



module.exports = {


    acceptedTravel: async (req, res) => {
        try {

            const { id } = req.params;
            let response = 0;
            const id_user = req.id_user;

            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }
                response = await readAllRecord(`SELECT * FROM ${tables.tables.Drivers} WHERE id_user = ${id_user}`, connection, true)
                if (response[0]) {
                    const driver = response[2][0]

                    response = await readAllRecord(`SELECT * FROM ${tables.tables.Travels} WHERE id = ${id} AND id_status = '1'`, connection, true)
                    if (response[0]) {
                        response = await updateRecord({ id_status: 3 }, tables.tables.Travels, id, connection)
                        if (response[0]) {
                            response = await createRecord({ id_driver: driver.id, id_travel: id }, tables.tables.Travels_Drivers, connection)
                            if (response[0]) {
                                const clients = await readAllRecord(`SELECT  ${tables.tables.Clients}.id_device as token FROM ${tables.tables.Travels} INNER JOIN ${tables.tables.Clients} ON ${tables.tables.Clients}.id = ${tables.tables.Travels}.id_client  WHERE ${tables.tables.Travels}.id = ${id}`, connection, true)
                                const tokens = clients[2].map(row => row.token);
                                response = await sendNotification(tokens, 'Tu viaje fue aceptado', `Tu viaje fue aceptado por ${driver.name} por favor espera en el punto de encuentro`, id)
                            }
                        }
                    }
                }
                connection.release();
                myConnection.end();

                return res.status(response[1].code).json({
                    ok: response[0],
                    message: response[1].message,
                    data: response[2],
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(errors.server.code).json({
                ok: false,
                message: errors.server.message,
            });
        }
    },

    endTravel: async (req, res) => {
        try {

            const { id } = req.params;
            let response = 0;
            const id_user = req.id_user;

            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }
                response = await readAllRecord(`SELECT * FROM ${tables.tables.Drivers} WHERE id_user = ${id_user}`, connection, true)
                if (response[0]) {
                    const driver = response[2][0]

                    response = await readAllRecord(`SELECT * FROM ${tables.tables.Travels} WHERE id = ${id} AND id_status = '4'`, connection, true)
                    if (response[0]) {
                        response = await updateRecord({ id_status: 5 }, tables.tables.Travels, id, connection)
                        if (response[0]) {
                            response = await createRecord({ id_driver: driver.id, id_travel: id }, tables.tables.Travels_Drivers, connection)
                            if (response[0]) {
                                const clients = await readAllRecord(`SELECT  ${tables.tables.Clients}.id_device as token FROM ${tables.tables.Travels} INNER JOIN ${tables.tables.Clients} ON ${tables.tables.Clients}.id = ${tables.tables.Travels}.id_client  WHERE ${tables.tables.Travels}.id = ${id}`, connection, true)
                                const tokens = clients[2].map(row => row.token);
                                response = await sendNotification(tokens, 'Viaje terminado', `Tu viaje ha terminado no olvides tus cosas`, id)
                            }
                        }
                    }
                }
                connection.release();
                myConnection.end();

                return res.status(response[1].code).json({
                    ok: response[0],
                    message: response[1].message,
                    data: response[2],
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(errors.server.code).json({
                ok: false,
                message: errors.server.message,
            });
        }
    },

    startTravel: async (req, res) => {
        try {

            const { id } = req.params;
            let response = 0;
            const id_user = req.id_user;

            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }
                response = await readAllRecord(`SELECT * FROM ${tables.tables.Drivers} WHERE id_user = ${id_user}`, connection, true)
                if (response[0]) {
                    const driver = response[2][0]

                    response = await readAllRecord(`SELECT * FROM ${tables.tables.Travels} WHERE id = ${id} AND id_status = '3'`, connection, true)
                    if (response[0]) {
                        response = await updateRecord({ id_status: 4 }, tables.tables.Travels, id, connection)
                        if (response[0]) {
                            response = await createRecord({ id_driver: driver.id, id_travel: id }, tables.tables.Travels_Drivers, connection)
                            if (response[0]) {
                                const clients = await readAllRecord(`SELECT  ${tables.tables.Clients}.id_device as token FROM ${tables.tables.Travels} INNER JOIN ${tables.tables.Clients} ON ${tables.tables.Clients}.id = ${tables.tables.Travels}.id_client  WHERE ${tables.tables.Travels}.id = ${id}`, connection, true)
                                const tokens = clients[2].map(row => row.token);
                                response = await sendNotification(tokens, 'Tu viaje ha comenzado', `Tu viaje esta comenzando por favor ponte tu cinturon de seguridad`, id)
                            }
                        }
                    }
                }
                connection.release();
                myConnection.end();

                return res.status(response[1].code).json({
                    ok: response[0],
                    message: response[1].message,
                    data: response[2],
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(errors.server.code).json({
                ok: false,
                message: errors.server.message,
            });
        }
    },


    notifyArrivalToClient: async (req, res) => {
        try {

            const { id } = req.params;
            let response = 0;
            const id_user = req.id_user;

            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }
                response = await readAllRecord(`SELECT * FROM ${tables.tables.Drivers} WHERE id_user = ${id_user}`, connection, true)
                if (response[0]) {
                    response = await readAllRecord(`SELECT  ${tables.tables.Clients}.id_device as token FROM ${tables.tables.Travels} INNER JOIN ${tables.tables.Clients} ON ${tables.tables.Clients}.id = ${tables.tables.Travels}.id_client  WHERE ${tables.tables.Travels}.id = ${id}`, connection, true)
                    if (response[0]) {
                        const tokens = response[2].map(row => row.token);
                        response = await sendNotification(tokens, 'El taxi llego', 'Tu taxi llego al punto de encuentro', id)
                        console.log(response)
                    }
                }
                connection.release();
                myConnection.end();

                return res.status(response[1].code).json({
                    ok: response[0],
                    message: response[1].message,
                    data: response[2][0],
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(errors.server.code).json({
                ok: false,
                message: errors.server.message,
            });
        }
    },

    getTravelToDriver: async (req, res) => {
        try {

            const { id } = req.params;
            let response = 0;
            const id_user = req.id_user;

            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }
                response = await readAllRecord(`SELECT * FROM ${tables.tables.Drivers} WHERE id_user = ${id_user}`, connection, true)
                if (response[0]) {
                    response = await readAllRecord(`SELECT ${tables.tables.Travels}.*, ${tables.tables.Clients}.name as client FROM ${tables.tables.Travels} INNER JOIN ${tables.tables.Clients} ON ${tables.tables.Clients}.id = ${tables.tables.Travels}.id_client  WHERE ${tables.tables.Travels}.id = ${id}`, connection, true)

                }
                connection.release();
                myConnection.end();

                return res.status(response[1].code).json({
                    ok: response[0],
                    message: response[1].message,
                    data: response[2][0],
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(errors.server.code).json({
                ok: false,
                message: errors.server.message,
            });
        }
    },
};