import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'

function Registrar(){

    const OBJETO_REGISTRO_INICIAL = {
        nome : "",
        senha : "",
        email : ""
    }

    const [carregando, setCarregando] = useState(false)
    const [mensagemErro, setMensagemErro] = useState("")
    const [objRegistro, setObjRegistro] = useState(OBJETO_REGISTRO_INICIAL)

    const enviarFormulario = (e) =>{
        e.preventDefault()
        setMensagemErro("")

        if(objRegistro.nome.trim() === "")return setMensagemErro("Nome é obrigatório! (use qualquer valor)")
        if(objRegistro.email.trim() === "")return setMensagemErro("Email é obrigatório! (use qualquer valor)")
        if(objRegistro.senha.trim() === "")return setMensagemErro("Senha é obrigatória! (use qualquer valor)")
        else{
            setCarregando(true)
            // Chamar API para verificar credenciais do usuário e salvar token no localstorage
            localStorage.setItem("token", "TokenFalsoAqui")
            setCarregando(false)
            window.location.href = '/app/welcome'
        }
    }

    const atualizarValorFormulario = ({updateType, value}) => {
        setMensagemErro("")
        setObjRegistro({...objRegistro, [updateType] : value})
    }

    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Registrar</h2>
                    <form onSubmit={(e) => enviarFormulario(e)}>

                        <div className="mb-4">

                            <InputText defaultValue={objRegistro.nome} updateType="nome" containerStyle="mt-4" labelTitle="Nome" updateFormValue={atualizarValorFormulario}/>

                            <InputText defaultValue={objRegistro.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={atualizarValorFormulario}/>

                            <InputText defaultValue={objRegistro.senha} type="password" updateType="senha" containerStyle="mt-4" labelTitle="Senha" updateFormValue={atualizarValorFormulario}/>

                        </div>

                        <ErrorText styleClass="mt-8">{mensagemErro}</ErrorText>
                        <button type="submit" className={"btn mt-2 w-full btn-primary" + (carregando ? " loading" : "")}>Registrar</button>

                        <div className='text-center mt-4'>Já tem uma conta? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Entrar</span></Link></div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Registrar