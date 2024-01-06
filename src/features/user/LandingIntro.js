import TemplatePointers from "./components/TemplatePointers"

function LandingIntro(){

    return(
        <div className="hero min-h-full rounded-l-xl bg-base-200">
            <div className="hero-content py-12">
              <div className="max-w-md">

              <h1 className='text-3xl text-center font-bold '><img src="/logo192.png" className="w-12 inline-block mr-2 mask mask-circle" alt="logo-prospera-facil" />Prospera Fácil</h1>

                <div className="text-center mt-12"><img src="./intro.png" alt="Template Admin Prospera Fácil" className="w-40 inline-block"></img></div>
              
              {/* Importando o componente pointers */}
              <TemplatePointers />
              
              </div>

            </div>
          </div>
    )
      
  }
  
  export default LandingIntro