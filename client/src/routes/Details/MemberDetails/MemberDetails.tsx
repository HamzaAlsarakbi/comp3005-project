import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import './../Details.css';
import axios from "axios";
import api from "../../../lib/api";
import { Member } from "../../../lib/models/Member";
import Spacer from "../../../components/Spacer/Spacer";
import { Icons } from "../../../lib/icons";
import { useSession } from "../../../components/SessionProvider/SessionProvider";
import Tabs from "../../../components/Tabs/Tabs";
import Tab from "../../../components/Tabs/Tab";
import InputBox, { InputPolicy, InputType } from "../../../components/InputBox/InputBox";
import IconButton from "../../../components/IconButton/IconButton";


const MemberDetails = () => {
  const { email } = useParams<{ email: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [isProfileOwner, setProfileOwner] = useState(false);
  const firstnameRef = useRef<InputBox>(null);
  const lastnameRef = useRef<InputBox>(null);
  const weightRef = useRef<InputBox>(null);
  const heightRef = useRef<InputBox>(null);
  const phoneRef = useRef<InputBox>(null);
  const passwordRef = useRef<InputBox>(null);
  const session = useSession();
  useEffect(() => {
    document.title = 'Member Profile';
    axios.get(api.path(`/members/${email}`)).then((res) => {
      setMember(res.data.member);
      setProfileOwner(res.data.member.member_email === session?.email);
      document.title = `${member?.first_name ?? 'Member'}'s  Profile`;
    }).catch((err) => {
      console.error(err);
    });
  }, [email, member?.first_name, session?.email]);

  /**
 * Verifies the "update personal info" form
 * @returns true if the form is valid, otherwise false
 */
  const verifyUpdateForm = (): boolean => {
    const refs = [
      firstnameRef,
      lastnameRef,
      phoneRef,
      passwordRef,
      weightRef,
      heightRef,
    ];
    let valid = true;
    for (let ref of refs) {
      ref.current!.handleInput();
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
      setMember(null);
    })
  }

  return (
    <>
      <Spacer />
      <div className="details-container" >
        <div className="details-overview">
          <img className="overview-item" id="details-icon" src={Icons.MEMBER} alt={member?.first_name ?? "Member Picture"} />
          <div className="overview-item" id="details-title">{member?.first_name ?? 'Unkown Member'} {member?.last_name}</div>
        </div>
        <div className="details-content">
          <div className="content-item" id="details-title">Details</div>
          <Tabs id="member-details">
            <Tab title="Summary">
              <div className="content-item" id="details-body">
                <div className="details-body-item" id="member-name">Name: {member?.first_name} {member?.last_name}</div>
                <div className="details-body-item" id="member-email">Email: {member?.member_email}</div>
                <div className="details-body-item" id="member-phone">Phone: {member?.phone}</div>
                <div className="details-body-item" id="member-gender">Gender: {member?.gender}</div>
                {isProfileOwner ?
                  <>
                    <div className="details-body-item" id="member-height">Birthday: {member?.birthday.toString()}</div>
                    <p>Health Metrics</p>
                    <div className="details-body-item" id="member-weight">Weight: {member?.current_weight} lb</div>
                    <div className="details-body-item" id="member-height">Height: {member?.current_height} cm</div>
                  </>
                  :
                  <></>
                }
              </div>
            </Tab>
            {isProfileOwner ?
              <Tab title="Update Personal Info">
                <InputBox ref={firstnameRef} id="first-name" inputType={InputType.INPUT} inputPolicy={InputPolicy.WORDS} optional placeholder="First name" />
                <InputBox ref={lastnameRef} id="last-name" inputType={InputType.INPUT} inputPolicy={InputPolicy.WORDS} optional placeholder="Last name" />
                <InputBox ref={passwordRef} id="password" inputType={InputType.INPUT} inputPolicy={InputPolicy.PASSWORD} optional placeholder="Password" />
                <InputBox ref={phoneRef} id="phone" inputType={InputType.INPUT} inputPolicy={InputPolicy.PHONE_NUMBER} optional placeholder="Phone" />
                <p>Health Metrics</p>
                <InputBox ref={weightRef} id="weight" inputType={InputType.INPUT} inputPolicy={InputPolicy.NUMBERS} optional placeholder="Weight" />
                <InputBox ref={heightRef} id="height" inputType={InputType.INPUT} inputPolicy={InputPolicy.NUMBERS} optional placeholder="Height" />
                <IconButton icon={Icons.TOAST_ORANGE} id="update" onClick={updateHandler}>Update</IconButton>
              </Tab>
              : <></>}
            {isProfileOwner ?
              <Tab title="Health Goals">
                <>TODO Health Goals</>
              </Tab>
              : <></>}
            {isProfileOwner ?
              <Tab title="Payments">
                <>TODO Payments</>
              </Tab>
              : <></>}
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default MemberDetails;