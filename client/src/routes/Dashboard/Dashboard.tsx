import { useEffect } from "react";
import { useSession } from "../../components/SessionProvider/SessionProvider";

interface DashboardProps {

}


const Dashboard: React.FC<DashboardProps> = ({ }) => {
  const session = useSession();
  useEffect(() => {
    document.title = `${session?.first_name}'s Dashboard`
  }, [session])
  return (
    <span>dashboard</span>
  )
};

export default Dashboard;