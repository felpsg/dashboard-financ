import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

function Registrar() {
  const OBJETO_REGISTRO_INICIAL = {
    nome: "",
    senha: "",
    email: "",
  };

  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [objRegistro, setObjRegistro] = useState(OBJETO_REGISTRO_INICIAL);

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setMensagemErro("");
    setCarregando(true);

    if (objRegistro.nome.trim() === "") {
      setCarregando(false);
      return setMensagemErro("Nome é obrigatório!");
    }
    if (objRegistro.email.trim() === "") {
      setCarregando(false);
      return setMensagemErro("Email é obrigatório!");
    }
    if (objRegistro.senha.trim() === "") {
      setCarregando(false);
      return setMensagemErro("Senha é obrigatória!");
    }

    // Preparando o objeto para a chamada da API
    const userData = {
      email: objRegistro.email,
      password: objRegistro.senha,
    };

    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Registro bem-sucedido
        localStorage.setItem("token", data.token); // Salvar o token recebido
        window.location.href = "/app/welcome";
      } else {
        // Tratar erros de registro (ex: usuário já existe, etc.)
        setMensagemErro(data.error || "Erro ao registrar");
      }
    } catch (error) {
      // Tratar erro na chamada da API
      setMensagemErro("Erro de rede ao tentar registrar");
    } finally {
      setCarregando(false);
    }
  };

  const atualizarValorFormulario = ({ updateType, value }) => {
    setMensagemErro("");
    setObjRegistro({ ...objRegistro, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Registrar
            </h2>
            <form onSubmit={(e) => enviarFormulario(e)}>
              <div className="mb-4">
                <InputText
                  value={objRegistro.nome}
                  updateType="nome"
                  containerStyle="mt-4"
                  labelTitle="Nome"
                  updateFormValue={atualizarValorFormulario}
                />

                <InputText
                  value={objRegistro.email}
                  updateType="email"
                  containerStyle="mt-4"
                  labelTitle="Email"
                  updateFormValue={atualizarValorFormulario}
                />

                <InputText
                  value={objRegistro.senha}
                  type="password"
                  updateType="senha"
                  containerStyle="mt-4"
                  labelTitle="Senha"
                  updateFormValue={atualizarValorFormulario}
                />
              </div>

              <ErrorText styleClass="mt-8">{mensagemErro}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (carregando ? " loading" : "")
                }
              >
                Registrar
              </button>

              <div className="text-center mt-4">
                Já tem uma conta?{" "}
                <Link to="/login">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Entrar
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrar;
