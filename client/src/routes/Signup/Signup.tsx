import { useEffect, useRef, useState } from "react";
import InputBox, { InputPolicy, InputType } from "../../components/InputBox/InputBox";
import './Signup.css'
import IconButton from "../../components/IconButton/IconButton";
import { Icons } from "../../lib/icons";
import { Color } from "../../lib/colors";
import ComboBox, { ComboBoxOption } from "../../components/ComboBox/ComboBox";


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
    const body = {
      firstname: firstnameRef.current!.value(),
      lastname: lastnameRef.current!.value(),
      phone: phoneRef.current!.value(),
      email: emailRef.current!.value(),
      password: passwordRef.current!.value(),
      gender: gender,
    }
    const req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3001/member/add');
    req.onload = function () {
      switch (req.status) {
        case 200:
          dobRef.current!.showText("Redirecting...", Color.Green);
          break;
        case 400:
          dobRef.current!.showText("Username or password incorrect. Try again.", Color.Red);
          dobRef.current!.emphasizeText();
          break;
      }
    };
    req.send(JSON.stringify(body));
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
      <InputBox id="phone-number" inputType={InputType.INPUT} placeholder="Phone Number" inputPolicy={InputPolicy.WORDS} ref={phoneRef} />
      <InputBox id="password" inputType={InputType.INPUT} placeholder="Password" inputPolicy={InputPolicy.WORDS} ref={passwordRef} />
      <InputBox id="date-of-birth" inputType={InputType.DATE} placeholder="Date of Birth" ref={dobRef} />
      <ComboBox id="gender" name="Gender" options={options} onChange={genderComboBoxHandler} />
      <IconButton icon={Icons.TOAST_ORANGE} className="signup-container-item" id="signup" onClick={signupHandler}>Sign up</IconButton>
      <a href="/login">Log in</a>
    </div>
  )
}

export default Signup;