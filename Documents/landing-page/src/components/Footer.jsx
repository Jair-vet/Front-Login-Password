import React from 'react'

export const Footer = () => {
  return (
    <>
        <footer className="p-5 bg-[#B9B5BF]">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <p className='text-center text-white'>Centro Cristiano Amigos, Ecónomos 5823, Arcos de Guadalupe, 45037 Zapopan, Jal.</p>
                <p className='text-center text-white'>contacto@ccamigos.com.mx</p>
              </div>
              <div className='flex justify-center'>
                <a href=' https://binteconsulting.com'
                  target="_blank" 
                  className='text-center text-white'
                >
                  Create By
                  <img className='w-32 rounded-md' src='https://ccamigos.com.mx/congreso-musicos/assets/img/bcg.png'></img>
                </a>
              </div>
            </div>
        </footer>

        {/* <footer class="p-5 bg-[#B9B5BF]">
            <p className='text-center text-white'>Centro Cristiano Amigos, Ecónomos 5823, Arcos de Guadalupe, 45037 Zapopan, Jal.</p>
            <p className='text-center text-white'>contacto@ccamigos.com.mx</p>
            <div className='flex justify-center'>
              <a href='https://binteconsulting.com' 
                className='text-center text-white'
              >
                Create By
                <img className='w-32 rounded-md' src='../img/Binte-Logo.png'></img>
              </a>
            </div>
        </footer>  */}
    </>
  )
}
