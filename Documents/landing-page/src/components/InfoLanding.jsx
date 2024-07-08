import { InfoEvento } from "./InfoEvento"

export const InfoLanding = () => {
  return (
    <div className="container mx-auto">
        <h2 className="text-3xl text-white text-center">Congreso de Musicos</h2>

        <div className="mr-12 ml-12 mt-5">
            <p className="text-white mb-4">
                Un llamado a todos los directores de alabanza, músicos, cantantes y creativos
                que quieran crecer en habilidades y conocimiento mientras sirven a su iglesia
                local.
            </p>
            <p className="text-white">
                Dos días de talleres, enseñanza y noche de adoración con nuestro invitado
                especial Omar Rodríguez, talleres:
            </p>
        </div>

        <div className="mr-12 ml-12 mt-5">
       

            <ol className="space-y-4 text-gray-500 list-decimal list-inside dark:text-white">
                <li>
                    Canto, audio en vivo y broadcast.

                </li>
                <li>Teoría musical.</li>
                <li>Excelencia en la adoración.</li>
                <li>Sanidad interior.</li>
                <li>Dirigiendo la adoración.</li>
                <li>Viviendo en lo profético.</li>
                <li>Bajo.</li>
                <li>Guitarra.</li>
                <li>Secuencias y Abletó.</li>
                <li>Panel creativo, entre otros…</li>
            </ol>
        </div>

        <InfoEvento />
    </div>
  )
}
