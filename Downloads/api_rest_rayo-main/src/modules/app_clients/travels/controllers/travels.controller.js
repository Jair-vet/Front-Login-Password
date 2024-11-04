const constants = require("../../../../core/helpers/constants/constants");
const pool = require("../../../../core/database/config");
const { errors } = require("../../../../core/helpers/constants/messages");
const tables = require("../../../../core/helpers/constants/tables");
const { createRecord, readAllRecord, updateRecords, updateRecord, readRecord } = require("../../../../core/helpers/functions");
const { notifyNewTravel } = require("../../common/functions");



module.exports = {
    addTravel: async (req, res) => {
        try {
            const { start_longitude, start_latitude, end_longitude, end_latitude, kilometers, duration } = req.body;
            const id_user = req.id_user;
            let response = 0;

            // Conexión a la base de datos
            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }

                response = await readAllRecord(`SELECT id FROM ${tables.tables.Clients} WHERE id_user = ${id_user}`, connection, true);

                if (response[0]) {
                    const travel = {
                        id_client: response[2][0].id,
                        start_longitude,
                        start_latitude,
                        end_longitude,
                        end_latitude,
                        kilometers,
                        duration
                    };

                    response = await createRecord(travel, tables.tables.Travels, connection);
                    if (response[0]) {
                        await notifyNewTravel(response[2], connection)
                    }

                }


                connection.release();
                myConnection.end();

                return res.status(response[1].code).json({
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

    getTravelToClient: async (req, res) => {
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
                response = await readAllRecord(`SELECT * FROM ${tables.tables.Clients} WHERE id_user = ${id_user}`, connection, true)
                console.log(response)
                if (response[0]) {
                    response = await readAllRecord(`SELECT ${tables.tables.Travels}.*, ${tables.tables.Clients}.name as client FROM ${tables.tables.Travels} INNER JOIN ${tables.tables.Clients} ON ${tables.tables.Clients}.id = ${tables.tables.Travels}.id_client  WHERE ${tables.tables.Travels}.id = ${id}`, connection, true)
                    const drivers = await readAllRecord(`SELECT ${tables.tables.Drivers}.* FROM ${tables.tables.Travels_Drivers} INNER JOIN ${tables.tables.Drivers} ON ${tables.tables.Drivers}.id = ${tables.tables.Travels_Drivers}.id_driver WHERE ${tables.tables.Travels_Drivers}.id_travel = ${id}`, connection)

                    response[2][0].drivers = drivers[2]
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

    cancelTravel: async (req, res) => {
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
                response = await readAllRecord(`SELECT * FROM ${tables.tables.Clients} WHERE id_user = ${id_user}`, connection, true)
                if (response[0]) {
                    response = await readAllRecord(`SELECT * FROM ${tables.tables.Travels} WHERE id_client = ${response[2][0].id} AND id = ${id}`, connection, true)
                    if (response[0]) {
                        response = await updateRecord({ id_status: 2 }, tables.tables.Travels, response[2][0].id, connection)
                        if (response[0]) {
                            response = await readRecord(tables.tables.Travels, id, connection)
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
};