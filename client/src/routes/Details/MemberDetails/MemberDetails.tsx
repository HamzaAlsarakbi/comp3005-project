import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import './../Details.css';
import axios from "axios";
import api from "../../../lib/api";
import { Member } from "../../../lib/models/Member";
import Spacer from "../../../components/Spacer/Spacer";
import { Icons } from "../../../lib/icons";
import { UserRole, useSession } from "../../../components/SessionProvider/SessionProvider";
import Tabs from "../../../components/Tabs/Tabs";
import Tab from "../../../components/Tabs/Tab";
import InputBox, { InputPolicy, InputType } from "../../../components/InputBox/InputBox";
import IconButton from "../../../components/IconButton/IconButton";
import PersonalInfo from "../../../components/PersonalInfo/PersonalInfo";
import HealthGoals from "../../../components/HealthGoals/HealthGoals";
import Payments from "../../../components/Payments/Payments";
import Routines from "../../../components/Routines/Routines";


const MemberDetails = () => {
  const { email } = useParams<{ email: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [isProfileOwner, setProfileOwner] = useState(false);
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

  const personalInfoHandler = () => setMember(null);

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
                <PersonalInfo onUpdate={personalInfoHandler} />
              </Tab>
              : <></>}
            {isProfileOwner ?
              <Tab title="Health Goals">
                <HealthGoals />
              </Tab>
              : <></>}
            {isProfileOwner ?
              <Tab title="Routines">
                <Routines />
              </Tab>
              : <></>}
            {(isProfileOwner || session?.role === UserRole.ADMIN) && member ?
              <Tab title="Payments">
                <Payments member_email={member!.member_email} />
              </Tab>
              : <></>}
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default MemberDetails;