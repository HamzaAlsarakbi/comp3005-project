import { useEffect, useRef, useState } from "react";
import InputBox, { InputPolicy, InputType } from "../../components/InputBox/InputBox";
import './Signup.css'
import IconButton from "../../components/IconButton/IconButton";
import { Icons } from "../../lib/icons";
import { Color } from "../../lib/colors";
import ComboBox, { ComboBoxOption } from "../../components/ComboBox/ComboBox";
import axios from "axios";
import api from "../../lib/api";


interface SignupProps {
}

const Signup: React.FC<SignupProps> = () => {
  const firstnameRef = useRef<InputBox>(null);
  const lastnameRef = useRef<InputBox>(null);
  const dobRef = useRef<InputBox>(null);
  const phoneRef = useRef<InputBox>(null);
  const emailRef = useRef<InputBox>(null);
  const passwordRef = useRef<InputBox>(null);
  const [gender, setGender] = useState("male");
  const options: ComboBoxOption[] = [
    { value: 'male', name: 'Male' },
    { value: 'female', name: 'Female' },
  ];
  useEffect(() => {
    document.title = 'Sign Up';
  }, []);

  const genderComboBoxHandler = (value: string) => { setGender(value); }

  const signupHandler = () => {
    if (!verifyForm()) return;
    const data = {
      member: {
        member_email: emailRef.current!.value(),
        first_name: firstnameRef.current!.value(),
        last_name: lastnameRef.current!.value(),
        password: passwordRef.current!.value(),
        phone: phoneRef.current!.value(),
        birthday: new Date(dobRef.current!.value()),
        gender: gender,
      }
    }
    console.log(JSON.stringify(data));
    axios.post(api.path('/members/add'), data, { withCredentials: true }).then ((res) => {
      dobRef.current!.showText("Redirecting...", Color.Green);
      document.location.replace('/');
    }).catch((err) => {
      switch (err.request.status) {
        case 400:
          dobRef.current!.showText(err.response.data.error ?? "Unknown error.", Color.Red);
          break;
        default:
          dobRef.current!.showText("Internal server error.", Color.Red);
          break;
      }
        passwordRef.current!.emphasizeText();
    });
  };
  /**
   * Verifies the sign up form
   * @returns true if the form is valid, otherwise false
   */
  const verifyForm = (): boolean => {
    const refs = [
      firstnameRef,
      lastnameRef,
      dobRef,
      phoneRef,
      emailRef,
      passwordRef
    ];
    let valid = true;
    for (let ref of refs) {
      ref.current!.handleInput();
      if(ref.current!.hasError()) {
        ref.current!.emphasizeText();
        valid = false;
      }
    }

    return valid;
  }

  return (
    <div className="signup-root">
      <h1 className="signup-container-item" id="app-name">Fitness App</h1>
      <h2 className="signup-container-item" id="signup">Sign up</h2>
      <InputBox id="first-name" inputType={InputType.INPUT} placeholder="First name" inputPolicy={InputPolicy.WORDS} ref={firstnameRef} />
      <InputBox id="last-name" inputType={InputType.INPUT} placeholder="Last name" inputPolicy={InputPolicy.WORDS} ref={lastnameRef} />
      <InputBox id="email" inputType={InputType.INPUT} placeholder="Email" inputPolicy={InputPolicy.EMAIL} ref={emailRef} />
      <InputBox id="phone-number" inputType={InputType.INPUT} placeholder="Phone Number" inputPolicy={InputPolicy.PHONE_NUMBER} ref={phoneRef} />
      <InputBox id="password" inputType={InputType.INPUT} placeholder="Password" inputPolicy={InputPolicy.WORDS} ref={passwordRef} />
      <InputBox id="date-of-birth" inputType={InputType.DATE} placeholder="Date of Birth" ref={dobRef} />
      <ComboBox id="gender" name="Gender" options={options} onChange={genderComboBoxHandler} />
      <IconButton icon={Icons.TOAST_ORANGE} className="signup-container-item" id="signup" onClick={signupHandler}>Sign up</IconButton>
      <a href="/login">Log in</a>
    </div>
  )
}

export default Signup;