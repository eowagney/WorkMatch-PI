import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/login", {
        cpf: cpf,
        senha: password,
      });

      console.log("Usuário logado:", response.data);
      alert(`Bem-vindo, ${response.data.nome}!`);
      navigate("/home");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("CPF ou senha inválidos!");
    }
  };

   const handleRegister = () => {
    navigate("/cadastro"); 
  };

  return (
     <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <button onClick={handleRegister}>Cadastrar</button>
    </div>
  );
}

export default LoginPage;
