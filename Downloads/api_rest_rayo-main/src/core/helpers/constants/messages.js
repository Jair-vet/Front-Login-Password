const { notify } = require("../../../modules/app_clients");

module.exports = {
  errors: {
    password: { message: 'Password Incorrecta', code: 400 },
    email: { message: 'Email no encontrado', code: 400 },
    dataBase: { message: 'Error al registrar en la base de datos', code: 400 },
    create: { message: 'Error al dar de alta registro', code: 400 },
    read: { message: 'Error al leer registro', code: 400 },
    update: { message: 'Error al actualizar registro', code: 400 },
    delete: { message: 'Error al eliminar registro', code: 400 },
    file: { message: 'El archivo no se pudo subir', code: 400 },
    server: { message: 'Error en servidor', code: 500 },
    emailAlredy: { message: 'El email ya existe', code: 400 },
    notFound: { message: 'Error al buscar registro', code: 404 },
    permissions: { message: 'Error no tienes permiso de administrador para esta acción', code: 404 },
    errorUploadFile: { message: 'Ocurrio un error al subir foto', code: 404 },
    errorNotifyDrivers: { message: 'Ocurrio un error al notificar choferes', code: 400 }

  },

  success: {
    password: { message: 'Accesos correctos', code: 200 },
    email: { message: 'Email encontrado', code: 200 },
    create: { message: 'Registro exitoso', code: 200 },
    read: { message: '', code: 200 },
    update: { message: 'Actualización exitosa', code: 200 },
    delete: { message: 'Eliminación exitosa', code: 200 },
    file: { message: 'Archivo subido correctamente', code: 200 },
    permissions: { message: 'Permiso correcto', code: 200 },
    notify: { message: 'Notificación enviada', code: 200 }

  },
};
