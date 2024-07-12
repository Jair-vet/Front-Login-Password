import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import swalTemporizadoBad from '../helpers/mensajeError.js'
import swalTemporizado from '../helpers/mensajeAlert.js'
import { Alerta } from './Alerta.jsx';


export const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [edad, setEdad] = useState('')
    const [iglesia, setIglesia] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [instrumento, setInstrumento] = useState('') 
    const [alerta, setAlerta] = useState('')
    

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 4000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!nombre || !edad || !iglesia || !email || !telefono || !instrumento) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            console.log('Todos los campos son obligatorios');
            return;
        }
        
        const datos = { nombre, edad, iglesia, email, telefono, instrumento };

        if(datos.includes('')){
            console.log('Datos Vacios');
        }
        
        try {
            // API Rest
            // http://localhost:4002/api/register/client
            const response = await fetch('http://localhost:4002/api/register/client', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
                body: JSON.stringify(datos)
            });

            if(!response.ok) {
                swalTemporizadoBad('Error en la solicitud de registro.');
            }

            const responseData = await response.json();
            
            if(responseData === 'EL REGISTRO YA EXISTE') {
                swalTemporizadoBad('El Correo ya Existe');
            }

            if(responseData.ok){
                console.log(responseData.message);
                setNombre('');
                setEdad('');
                setIglesia('');
                setEmail('');
                setTelefono('');
                setInstrumento('');
                swalTemporizado('Registro Exitoso! Gracias.');
            }
          
    
          // Puedes redirigir o realizar otras acciones después del registro exitoso
        } catch (error) {
          console.error('Error al enviar datos a la API:', error);
          swalTemporizadoBad('Ocurrió un error al registrarte. Intenta con otro Correo.')
        }
    }

    const { msg } = alerta

  return (
    <div>
        <form 
            onSubmit={handleSubmit}
            className="mx-auto container m-5 md:pr-[10%] md:pl-[10%] pr-[5%] pl-[5%] space-y-2"
        >
            <h2 className="text-3xl text-center font-extralight text-white">Registrate</h2>
            <div className="grid md:grid-cols-3 gap-3 grid-cols-1">
                {/* <!-- Nombre --> */}
                <div className="form-control md:col-span-2">
                    <label htmlFor="nombre" className="text-white font-thin">Nombre Completo:</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        className="label-control" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        // required
                    />
                </div>
                {/* <!-- Edad --> */}
                <div className="form-control">
                    <label htmlFor="edad" className="text-white font-thin">Edad:</label>
                    <input 
                        type="number" 
                        id="edad" 
                        className="label-control"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        // required
                    />
                </div>
            </div>
            {/* <!-- Iglesia --> */}
            <div className="form-control">
                <label htmlFor="iglesia" className="text-white font-thin">Iglesia:</label>
                <input 
                    type="text" 
                    id="iglesia" 
                    className="label-control" 
                    value={iglesia}
                    onChange={(e) => setIglesia(e.target.value)}
                    // required
                />
            </div>
            <div className="grid md:grid-cols-3 gap-3 grid-cols-1">
                {/* <!-- Email --> */}
                <div className="form-control md:col-span-2">
                    <label htmlFor="email" className="text-white font-thin">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="label-control" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // required
                    />
                </div>
                {/* <!-- Télefono / WhatsApp --> */}
                <div className="form-control">
                    <label htmlFor="telefono" className="text-white font-thin">Télefono <span className='md:visible invisible'>/ WhatsApp:</span></label>
                    <input
                        type="number" 
                        id="telefono" 
                        className="rounded-md p-2 md:relative"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        // required
                    />
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3 grid-cols-1">
                {/* <!-- Instrumento --> */}
                <div className="form-control md:col-span-2">
                    <label htmlFor="Instrumento" className="text-white font-thin">Instrumento:</label>
                    <select 
                        name="instrumento" 
                        id="instrumento" 
                        className="label-control" 
                        value={instrumento}
                        onChange={(e) => setInstrumento(e.target.value)}
                        // required
                    >
                        <option value="">Seleccione...</option>
                        <option value="audio">Audio</option>
                        <option value="bajo">Bajo</option>
                        <option value="guitarra">Guitarra</option>
                        <option value="voz">Voz</option>
                    </select>
                </div>
                {/* <!-- Comprobante de Pago --> */}
                <div className="form-control w-full">
                    <label htmlFor="pago" className="text-white font-thin">Comprobante de Pago:</label>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-10 border-2 border-white border-dashed rounded-lg cursor-pointer bg-transparent ">
                            <div className="flex flex-col items-center justify-center pt-7 pb-6">
                                <p className="mb-2 text-sm text-white dark:text-gray-400">Seleccionar Imagen</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div> 
                </div>
            </div>

            {msg && <Alerta alerta={alerta} />}
            
            {/* Boton */}
            <div className="flex items-center justify-center">
                <button
                    className="flex items-center justify-center bg-[#B9B5BF] p-3 rounded-lg w-1/2 text-center"
                    type="submit"
                >Registrarse</button>
            </div>
        </form>
    </div>
  )
}
