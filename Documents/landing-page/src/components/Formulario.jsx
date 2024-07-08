
export const Formulario = () => {
  return (
    <div>
        <form id="form" className="mx-auto container m-5 md:pr-[20%] md:pl-[20%] pr-[5%] pl-[5%] space-y-2">
            <h2 className="text-3xl text-center font-extralight text-white">Registrate</h2>
            <div className="grid grid-cols-3 gap-3">
                {/* <!-- Nombre --> */}
                <div className="form-control col-span-2">
                    <label for="nombre" className="text-white font-thin">Nombre Completo:</label>
                    <input type="text" id="nombre" className="label-control"></input>
                </div>
                {/* <!-- Edad --> */}
                <div className="form-control">
                    <label for="edad" className="text-white font-thin">Edad:</label>
                    <input type="number" id="edad" className="label-control"></input>
                </div>
            </div>
            {/* <!-- Iglesia --> */}
            <div className="form-control">
                <label for="iglesia" className="text-white font-thin">Iglesia:</label>
                <input type="text" id="iglesia" className="label-control"></input>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {/* <!-- Email --> */}
                <div className="form-control col-span-2">
                    <label for="email" className="text-white font-thin">Email:</label>
                    <input type="email" id="email" className="label-control"></input>
                </div>
                {/* <!-- Télefono / WhatsApp --> */}
                <div className="form-control">
                    <label for="telefono" className="text-white font-thin">Télefono / WhatsApp:</label>
                    <input type="number" id="telefono" className="label-control"></input>
                </div>
            </div>
            <div className="flex justify-center items-center gap-3">
                {/* <!-- Instrumento --> */}
                <div className="form-control w-full">
                    <label for="Instrumento" className="text-white font-thin">Instrumento:</label>
                    <select name="instrumento" id="instrumento" className="label-control">
                        <option value="guitarra">Guitarra</option>
                        <option value="piano">Piano</option>
                        <option value="acordeón">Acordeón</option>
                    </select>
                </div>
                {/* <!-- Comprobante de Pago --> */}
                <div className="form-control w-full">
                    <label for="pago" className="text-white font-thin">Comprobante de Pago:</label>
                    <div class="flex items-center justify-center w-full">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-10 border-2 border-white border-dashed rounded-lg cursor-pointer bg-transparent ">
                            <div class="flex flex-col items-center justify-center pt-7 pb-6">
                                <p class="mb-2 text-sm text-white dark:text-gray-400">Seleccionar Imagen</p>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" />
                        </label>
                    </div> 
                </div>
            </div>
            
            {/* Boton */}
            <div className="flex items-center justify-center">
                <button
                    className="flex items-center justify-center bg-gray-200 p-3 rounded-lg w-1/2 text-center"
                    type="submit"
                >Registrarse</button>
            </div>
        </form>
    </div>
  )
}
