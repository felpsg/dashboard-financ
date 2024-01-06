import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import CheckCircleIcon  from '@heroicons/react/24/solid/CheckCircleIcon'

function EsqueceuSenha(){

    const OBJETO_USUARIO_INICIAL = {
        emailId : ""
    }

    const [carregando, setCarregando] = useState(false)
    const [mensagemErro, setMensagemErro] = useState("")
    const [linkEnviado, setLinkEnviado] = useState(false)
    const [objUsuario, setObjUsuario] = useState(OBJETO_USUARIO_INICIAL)

    const enviarFormulario = (e) =>{
        e.preventDefault()
        setMensagemErro("")

        if(objUsuario.emailId.trim() === "")return setMensagemErro("O campo Email é obrigatório! (use qualquer valor)")
        else{
            setCarregando(true)
            // Chamar API para enviar link de redefinição de senha
            setCarregando(false)
            setLinkEnviado(true)
        }
    }

    const atualizarValorFormulario = ({updateType, value}) => {
        setMensagemErro("")
        setObjUsuario({...objUsuario, [updateType] : value})
    }

    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Esqueceu a Senha</h2>

                    {
                        linkEnviado && 
                        <>
                            <div className='text-center mt-8'><CheckCircleIcon className='inline-block w-32 text-success'/></div>
                            <p className='my-4 text-xl font-bold text-center'>Link Enviado</p>
                            <p className='mt-4 mb-8 font-semibold text-center'>Verifique seu email para redefinir a senha</p>
                            <div className='text-center mt-4'><Link to="/login"><button className="btn btn-block btn-primary ">Entrar</button></Link></div>

                        </>
                    }

                    {
                        !linkEnviado && 
                        <>
                            <p className='my-8 font-semibold text-center'>Enviaremos um link para redefinir a senha no seu email</p>
                            <form onSubmit={(e) => enviarFormulario(e)}>

                                <div className="mb-4">

                                    <InputText type="emailId" defaultValue={objUsuario.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email" updateFormValue={atualizarValorFormulario}/>


                                </div>

                                <ErrorText styleClass="mt-12">{mensagemErro}</ErrorText>
                                <button type="submit" className={"btn mt-2 w-full btn-primary" + (carregando ? " loading" : "")}>Enviar Link de Redefinição</button>

                                <div className='text-center mt-4'>Ainda não tem uma conta? <Link to="/register"><button className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Registrar</button></Link></div>
                            </form>
                        </>
                    }
                    
                </div>
            </div>
            </div>
        </div>
    )
}

export default EsqueceuSenha