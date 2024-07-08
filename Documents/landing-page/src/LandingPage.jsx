import { Banner } from "./components/Banner"
import { Footer } from "./components/Footer"
import { Formulario } from "./components/Formulario"
import { InfoLanding } from "./components/InfoLanding"


export const LandingPage = () => {
  return (
    <div>
        <div className="p-4">
            <Banner />
        </div>
        
        <div className="mt-24">
            <InfoLanding />
        </div>

        <div className="mt-20">
            <Formulario />
        </div>

        <div className="mt-20">
          <Footer />
        </div>

    </div>
  )
}
