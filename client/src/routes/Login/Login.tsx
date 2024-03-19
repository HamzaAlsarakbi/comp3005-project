import { useEffect } from "react";
import InputBox, { InputType } from "../../components/InputBox/InputBox";
import './Login.css'
import IconButton from "../../components/IconButton/IconButton";
import { Icons } from "../../lib/icons";


interface LoginProps {
}

const Login: React.FC<LoginProps> = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);
  return (
    <div className="login-root">
      <div className="login-container">
        <h1 className="login-container-item" id="app-name">Fitness App</h1>
        <h2 className="login-container-item" id="login">Login</h2>
        <InputBox id="username" inputType={InputType.INPUT} placeholder="Username"></InputBox>
        <InputBox id="password" inputType={InputType.INPUT} placeholder="Password" hidden></InputBox>
        <IconButton icon={Icons.TOAST_ORANGE} className="login-container-item" id="login">Log in</IconButton>
      </div>
      <div className="login-design">
        <img src="/img/temp.jpg" alt="background" className="login-design-item" id="login-design-img" />
      </div>
    </div>
  )
}

export default Login;