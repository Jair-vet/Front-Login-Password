
const pool = require("../../../../core/database/config");
const constants = require("../../../../core/helpers/constants/constants");
const { errors } = require("../../../../core/helpers/constants/messages");
const tables = require("../../../../core/helpers/constants/tables");
const { generateJWT, validatePassword, readAllRecord, formatToRetrieveDate } = require("../../../../core/helpers/functions");


module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            let response = 0;
            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }

                response = await readAllRecord(
                    `SELECT  ${tables.tables.Clients}.*, ${tables.tables.Users}.email as email, ${tables.tables.Users}.password as password, ${tables.tables.Users}.id_company as id_company FROM ${tables.tables.Clients} INNER JOIN ${tables.tables.Users} ON ${tables.tables.Users}.id = ${tables.tables.Clients}.id_user WHERE  ${tables.tables.Users}.email = '${email}' AND  ${tables.tables.Users}.status = '1'`,
                    connection
                );
                if (response[2].length > 0) {
                    response = await validatePassword(response[2][0], password);
                    if (response[0]) {
                        response[2].token = await generateJWT(response[2].id_user, response[2].id_company);
                        response[2].password = ''
                    }
                } else {
                    response[1] = errors.email;
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
    renewToken: async (req, res) => {
        try {
            const id_user = req.id_user;
            const id_company = req.id_company

            let response = 0;

            let token = "";
            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }
                response = await readAllRecord(
                    `SELECT  ${tables.tables.Clients}.*, ${tables.tables.Users}.email as email, ${tables.tables.Users}.id_company as id_company, ${tables.tables.Users}.status as status, ${tables.tables.Users}.path_photo as path_photo FROM ${tables.tables.Clients} INNER JOIN ${tables.tables.Users} ON ${tables.tables.Users}.id = ${tables.tables.Clients}.id_user WHERE  ${tables.tables.Clients}.id_user = '${id_user}' AND  ${tables.tables.Users}.status = '1'`,
                    connection
                );
                if (response[2].length > 0) {
                    response[2][0].path_photo = `https://sgp-web.nyc3.cdn.digitaloceanspaces.com/${constants.SERVER_FILES}/${response[2][0].id_company}/Photos/${response[2][0].path_photo}`
                    response[2][0].birthdate = formatToRetrieveDate(response[2][0].birthdate)
                    const travels = await readAllRecord(`SELECT ${tables.tables.Travels}.*, ${tables.tables.StatusTravels}.name as status FROM ${tables.tables.Travels} INNER JOIN ${tables.tables.StatusTravels} ON ${tables.tables.StatusTravels}.id = ${tables.tables.Travels}.id_status WHERE ${tables.tables.Travels}.id_company = '${id_company}' AND ${tables.tables.Travels}.id_client = '${response[2][0].id}' ORDER BY ${tables.tables.Travels}.date DESC `, connection)
                    const currentTravel = await readAllRecord(`SELECT ${tables.tables.Travels}.*, ${tables.tables.StatusTravels}.name as status FROM ${tables.tables.Travels} INNER JOIN ${tables.tables.StatusTravels} ON ${tables.tables.StatusTravels}.id = ${tables.tables.Travels}.id_status WHERE ${tables.tables.Travels}.id_company = '${id_company}' AND ${tables.tables.Travels}.id_client = '${response[2][0].id}' AND ${tables.tables.Travels}.id_status IN (1, 3, 4) ORDER BY ${tables.tables.Travels}.id_status DESC, ${tables.tables.Travels}.date DESC`, connection)
                    console.log(currentTravel)
                    response[2][0].travels = travels[2]
                    response[2][0].current_travel = currentTravel[2][0]
                    token = await generateJWT(id_user, id_company);
                } else {
                    response[1] = errors.email;
                }
                connection.release();
                myConnection.end();

                return res.status(response[1].code).json({

                    message: response[1].message,
                    data: response[2][0],
                    token,
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(errors.errorServer.code).json({

                message: errors.errorServer.message,
            });
        }
    },



};
