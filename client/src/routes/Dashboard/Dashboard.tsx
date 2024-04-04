import { useEffect } from "react";
import { useSession } from "../../components/SessionProvider/SessionProvider";

import './Dashboard.css';
import Spacer from "../../components/Spacer/Spacer";

interface DashboardProps {

}


const Dashboard: React.FC<DashboardProps> = ({ }) => {
  const session = useSession();
  useEffect(() => {
    document.title = `${session?.first_name}'s Dashboard`
  }, [session])
  return (
    <div className="dashboard">
      <Spacer></Spacer>
      <h1>My Schedule</h1>
           
    </div>

  )
};

export default Dashboard;