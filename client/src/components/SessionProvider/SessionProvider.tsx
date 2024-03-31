import axios from "axios";
import React, { createContext, useContext, useEffect } from "react";
import api from "../../lib/api";


interface UserSession {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}
export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  TRAINER = 'TRAINER'
}

export interface SessionProviderProps {
  children: any;
  sessionCallback(valid: boolean, session: any): void;
}

export const useSession = (): UserSession | null => {
  const context = useContext(SessionContext);
  return context;
};

export const SessionContext = createContext<UserSession | null>(null);

const SessionProvider: React.FC<SessionProviderProps> = ({ children, sessionCallback }) => {
  const [session, setSession] = React.useState<UserSession | null>(null);
  useEffect(() => {
    console.log('QUERY!!!');
    axios.get(api.path('/sessions/check'), { withCredentials: true }).then((res) => {
      sessionCallback(true, res.data as UserSession);
      // console.log(res.data);
      // const data = res.data;
      // const newSession = {
      //   id: data.id,
      //   first_name: data.first_name,
      //   last_name: data.last_name,
      //   email: data.email,
      //   role: data.role === 'ADMIN' ? UserRole.ADMIN :
      //     data.role === 'TRAINER' ? UserRole.TRAINER :
      //       UserRole.MEMBER,
      // }
      setSession(res.data);
    }).catch((err) => {
      setSession(null);
      sessionCallback(false, null);
    });
  }, [sessionCallback]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;