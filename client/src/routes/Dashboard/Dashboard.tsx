import { useEffect, useState } from "react";
import { UserRole, useSession } from "../../components/SessionProvider/SessionProvider";

import './Dashboard.css';
import Spacer from "../../components/Spacer/Spacer";
import DashboardComponent, { DashboardComponentItem } from "../../components/DashboardComponent/DashboardComponent";
import axios from "axios";
import api from "../../lib/api";
import { HealthGoal } from "../../lib/models/HealthGoal";
import { Routine } from "../../lib/models/Routine";
import { FitnessAchievement } from "../../lib/models/FitnessAchievement";
import { formatDate, formatDateTime } from "../../lib/utils";
import { Schedule } from "../../lib/models/Booking";

interface DashboardProps {

}


const Dashboard: React.FC<DashboardProps> = ({ }) => {
  const session = useSession();
  const [goals, setGoals] = useState<DashboardComponentItem[]>([]);
  const [routines, setRoutines] = useState<DashboardComponentItem[]>([]);
  const [achievements, setAchievements] = useState<DashboardComponentItem[]>([]);
  const [schedule, setSchedule] = useState<DashboardComponentItem[]>([]);
  useEffect(() => {
    document.title = `${session?.first_name}'s Dashboard`;
    if (session?.role !== UserRole.ADMIN) {
      updateSchedule();
    }
    if (session?.role === UserRole.MEMBER) {
      updateGoals();
      updateRoutines();
      updateAchievements();
      updateSchedule();
    }
  }, [session]);

  const updateGoals = () => {
    axios.get(api.path('/health-goals/all'), { withCredentials: true }).then((res) => {
      const hg: HealthGoal[] = res.data;
      console.log(hg);
      hg.sort((a, b) => a.health_goal_id - b.health_goal_id);
      const newGoals: DashboardComponentItem[] = [];
      for (let i = 0; i < hg.length; i++) {
        newGoals.push({
          title: `Health Goal ${i + 1}`,
          body: [hg[i].description]
        });
      }
      setGoals(newGoals);
    });
  }
  const updateRoutines = () => {
    axios.get(api.path('/routines/all'), { withCredentials: true }).then((res) => {
      const routines: Routine[] = res.data;
      const newRoutines: DashboardComponentItem[] = [];
      for (let i = 0; i < routines.length; i++) {
        newRoutines.push({
          title: `Routine ${i + 1}`,
          body: [routines[i].description]
        });
      }
      setRoutines(newRoutines);
    });
  }
  const updateAchievements = () => {
    axios.get(api.path('/fitness-achievements/all'), { withCredentials: true }).then((res) => {
      const fitnessAchievements: FitnessAchievement[] = res.data;
      const newFa: DashboardComponentItem[] = [];
      for (let i = 0; i < fitnessAchievements.length; i++) {
        newFa.push({
          title: `Fitness Achievement ${i + 1}`,
          body: [fitnessAchievements[i].description]
        });
      }
      setAchievements(newFa);
    });
  }
  const updateSchedule = () => {
    const role = session?.role === UserRole.MEMBER ? 'members' : 'trainers';
    axios.get(api.path(`/${role}/schedule/${session?.email}`), { withCredentials: true }).then((res) => {
      const schedule: Schedule[] = res.data.schedule;
      const newSchedule: DashboardComponentItem[] = [];
      for (let i = 0; i < schedule.length; i++) {
        let s = schedule[i];
        newSchedule.push({
          title: `Schedule ${i + 1}`,
          body: [
            `From ${formatDateTime(s.start_time)}`,
            `To ${formatDateTime(s.end_time)}`,
          ]
        });
      }
      setSchedule(newSchedule);
    });
  }



  return (
    <>
      <Spacer></Spacer>
      <div className="dashboard">
        {session?.role !== UserRole.ADMIN &&
          <DashboardComponent title="My Schedule" id="schedule" items={schedule} />}
        {session?.role === UserRole.MEMBER &&
          <DashboardComponent title="My Goals" id="goals" items={goals} />}
        {session?.role === UserRole.MEMBER &&
          <DashboardComponent title="My Routines" id="routines" items={routines} />}
        {session?.role === UserRole.MEMBER &&
          <DashboardComponent title="My Achievements" id="fitness-achievements" items={achievements} />}
      </div>
    </>
  )
};

export default Dashboard;