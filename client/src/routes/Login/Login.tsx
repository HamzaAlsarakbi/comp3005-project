import { useEffect, useRef } from "react";
import InputBox, { InputPolicy, InputType } from "../../components/InputBox/InputBox";
import './Login.css'
import IconButton from "../../components/IconButton/IconButton";
import { Icons } from "../../lib/icons";
import { Color } from "../../lib/colors";
import api from "../../lib/api";
import axios from "axios";


interface LoginProps {
}

const Login: React.FC<LoginProps> = () => {
  const emailRef = useRef<InputBox>(null);
  const passwordRef = useRef<InputBox>(null);
  useEffect(() => {
    document.title = 'Login';
  }, []);

  const loginHandler = () => {
    if (!verifyForm()) return;
    const data = {
      email: emailRef.current!.value(),
      password: passwordRef.current!.value(),
    }
    axios.post(api.path('/logins/login'), data, { withCredentials: true}).then ((res) => {
      passwordRef.current!.showText("Redirecting...", Color.Green);
      document.location.replace('/')
    }).catch((err) => {
      switch (err.request.status) {
        case 400:
          passwordRef.current!.showText("Username or password incorrect. Try again.", Color.Red);
          break;
        default:
          passwordRef.current!.showText("Internal server error.", Color.Red);
          break;
      }
        passwordRef.current!.emphasizeText();
    });
  };

  const verifyForm = (): boolean => {
    let valid = true;
    const refs = [
      emailRef,
      passwordRef
    ];
    for (let ref of refs) {
      if (ref.current!.hasError()) {
        ref.current!.emphasizeText();
        valid = false;
      }
    }

    return valid;
  }
  return (
    <div className="login-root">
      <div className="login-container">
        <h3 className="login-container-item" id="welcome">Welcome Back to</h3>
        <h1 className="login-container-item" id="app-name">La Boucchi Health and Fitness Club</h1>
        <h2 className="login-container-item" id="login">Login</h2>
        <InputBox id="email" inputType={InputType.INPUT} placeholder="Email" inputPolicy={InputPolicy.EMAIL} ref={emailRef} />
        <InputBox id="password" inputType={InputType.INPUT} placeholder="Password" hidden inputPolicy={InputPolicy.WORDS} ref={passwordRef} />
        <IconButton icon={Icons.TOAST_ORANGE} className="login-container-item" id="login" onClick={loginHandler}>Log in</IconButton>
        <a href="/signup">Sign up</a>
      </div>
      <div className="login-design">
        <img src={Icons.LOGO} alt="background" className="login-design-item" id="login-design-img" />
      </div>
    </div>
  )
}

export default Login;