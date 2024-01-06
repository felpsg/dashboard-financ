import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import InputText from '../../components/Input/InputText';
import ErrorText from '../../components/Typography/ErrorText';
import LandingIntro from './LandingIntro';

function Login() {

    const INITIAL_LOGIN_OBJ = {
        password: "",
        emailId: localStorage.getItem('email') || ""
    };

    const VALID_EMAIL = "felipetec.sso@gmail.com";
    const VALID_PASSWORD = "123456";

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

    const submitForm = (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (loginObj.emailId.trim() === "") {
            return setErrorMessage("O Email é obrigatório!");
        }
        if (loginObj.password.trim() === "") {
            return setErrorMessage("A senha é obrigatória!");
        }
        if (loginObj.emailId !== VALID_EMAIL || loginObj.password !== VALID_PASSWORD) {
            return setErrorMessage("Email ou senha inválidos!");
        }

        setLoading(true);
        // Chamar API para verificar credenciais do usuário e salvar token no localstorage
        localStorage.setItem("token", "DummyTokenHere");
        localStorage.setItem('email', loginObj.emailId);
        setLoading(false);
        window.location.href = '/app/welcome';
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Entrar</h2>
                        <form onSubmit={(e) => submitForm(e)}>
                            <div className="mb-4">
                                <InputText type="emailId" defaultValue={loginObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue}/>
                                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Senha" updateFormValue={updateFormValue}/>
                            </div>
                            <div className='text-right text-primary'>
                                <Link to="/forgot-password">
                                    <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Esqueceu a senha?</span>
                                </Link>
                            </div>
                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Entrar</button>
                            <div className='text-center mt-4'>Ainda não tem uma conta? 
                                <Link to="/register">
                                    <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Registrar</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;