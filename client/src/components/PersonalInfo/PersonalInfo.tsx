import axios from "axios";
import InputBox, { InputPolicy, InputType } from "../InputBox/InputBox"
import api from "../../lib/api";
import IconButton from "../IconButton/IconButton";
import { Icons } from "../../lib/icons";
import { useRef } from "react";
import { useSession } from "../SessionProvider/SessionProvider";

interface PersonalInfoProps {
  onUpdate?(): void;
}
/**
 * Personal Info component
 * @param onUpdate callback for when the form is updated
 * @returns PersonalInfo component
 */
const PersonalInfo: React.FC<PersonalInfoProps> = ({ onUpdate }) => {
  const session = useSession();
  const firstnameRef = useRef<InputBox>(null);
  const lastnameRef = useRef<InputBox>(null);
  const weightRef = useRef<InputBox>(null);
  const heightRef = useRef<InputBox>(null);
  const phoneRef = useRef<InputBox>(null);
  const passwordRef = useRef<InputBox>(null);
  const refs = [
    firstnameRef,
    lastnameRef,
    phoneRef,
    passwordRef,
    weightRef,
    heightRef,
  ];
  /**
* Verifies the "update personal info" form
* @returns true if the form is valid, otherwise false
*/
  const verifyUpdateForm = (): boolean => {
    let valid = true;
    for (let ref of refs) {
      if (ref.current!.hasError()) {
        ref.current!.emphasizeText();
        valid = false;
      }
    }
    return valid;
  }

  const updateHandler = () => {
    if (!verifyUpdateForm()) return;
    const data = {
      member: {
        member_email: session?.email,
        first_name: firstnameRef.current!.value(),
        last_name: lastnameRef.current!.value(),
        phone: phoneRef.current!.value(),
        password: passwordRef.current!.value(),
        current_weight: weightRef.current!.value(),
        current_height: heightRef.current!.value(),
      }
    };
    console.log(data);
    axios.put(api.path('/members/update'), data, { withCredentials: true }).then((res) => {
      console.log(res);
      if(onUpdate) onUpdate();
    });
  }
  return (
    <>
      <InputBox ref={firstnameRef} id="first-name" inputType={InputType.INPUT} inputPolicy={InputPolicy.WORDS} optional placeholder="First name" />
      <InputBox ref={lastnameRef} id="last-name" inputType={InputType.INPUT} inputPolicy={InputPolicy.WORDS} optional placeholder="Last name" />
      <InputBox ref={passwordRef} id="password" inputType={InputType.INPUT} inputPolicy={InputPolicy.PASSWORD} optional placeholder="Password" />
      <InputBox ref={phoneRef} id="phone" inputType={InputType.INPUT} inputPolicy={InputPolicy.PHONE_NUMBER} optional placeholder="Phone" />
      <p>Health Metrics</p>
      <InputBox ref={weightRef} id="weight" inputType={InputType.INPUT} inputPolicy={InputPolicy.NUMBERS} optional placeholder="Weight" />
      <InputBox ref={heightRef} id="height" inputType={InputType.INPUT} inputPolicy={InputPolicy.NUMBERS} optional placeholder="Height" />
      <IconButton icon={Icons.TOAST_ORANGE} id="update" onClick={updateHandler}>Update</IconButton>
    </>
  )
}

export default PersonalInfo;