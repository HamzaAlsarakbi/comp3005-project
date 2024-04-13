import { useEffect, useState } from "react";
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
import PersonalInfo from "../../../components/PersonalInfo/PersonalInfo";
import HealthGoals from "../../../components/HealthGoals/HealthGoals";
import Payments from "../../../components/Payments/Payments";
import Routines from "../../../components/Routines/Routines";
import FitnessAchievements from "../../../components/FitnessAchievements/FitnessAchievements";
import { formatDate } from "../../../lib/utils";



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
            <Tab title="About">
              {member && <div className="content-item" id="details-body">
                <h2 className="details-body-title" id="personal-details">About</h2>
                <h3 className="details-body-subtitle" id="personal-details">Personal Details</h3>
                <div className="details-body-item" id="member-name">
                  <h4 className="details-body-item-header" id="member-name">Name</h4>
                  <p className="details-body-item-body" id="member-name">{member?.first_name} {member?.last_name}</p>
                </div>
                <div className="details-body-item" id="member-email">
                  <h4 className="details-body-item-header" id="member-email">Email</h4>
                  <p className="details-body-item-body" id="member-email"><a href={`mailto:${member?.member_email}`}>{member?.member_email}</a></p>
                </div>
                <div className="details-body-item" id="member-phone">
                  <h4 className="details-body-item-header" id="member-phone">Phone</h4>
                  <p className="details-body-item-body" id="member-phone">
                    <a href={`tel:${member?.phone}`}>{member?.phone}</a>
                  </p>
                </div>
                <div className="details-body-item" id="member-gender">
                  <h4 className="details-body-item-header" id="member-gender">Gender</h4>
                  <p className="details-body-item-body" id="member-gender">{member?.gender}</p>
                </div>
                {isProfileOwner ?
                  <>
                    <h3 className="details-body-subtitle" id="health-metrics">Health Metrics</h3>
                    <div className="details-body-item" id="member-birthday">
                      <h4 className="details-body-item-header" id="member-birthday">Birthday</h4>
                      <p className="details-body-item-body" id="member-birthday">{formatDate(member!.birthday)}</p>
                    </div>
                    <div className="details-body-item" id="member-weight">
                      <h4 className="details-body-item-header" id="member-weight">Weight</h4>
                      <p className="details-body-item-body" id="member-weight">{member?.current_weight} lb</p>
                    </div>
                    <div className="details-body-item" id="member-height">
                      <h4 className="details-body-item-header" id="member-height">Height</h4>
                      <p className="details-body-item-body" id="member-height">{member?.current_height} cm</p>
                    </div>
                  </>
                  :
                  <></>
                }
              </div>}
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
              <Tab title="Fitness Achievements">
                <FitnessAchievements />
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