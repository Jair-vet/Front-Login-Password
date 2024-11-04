const constants = require("../../../../core/helpers/constants/constants");
const pool = require("../../../../core/database/config");
const { errors } = require("../../../../core/helpers/constants/messages");
const tables = require("../../../../core/helpers/constants/tables");
const { updateRecords } = require("../../../../core/helpers/functions");




module.exports = {

    editIdDevice: async (req, res) => {
        try {

            const { id_device } = req.body;
            let response = 0;

            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }

                const driver = { id_device };
                const condition = `id_user = ${req.id_user}`;

                response = await updateRecords(driver, tables.tables.Drivers, condition, connection);

                // Liberar la conexión y cerrar la base de datos
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
