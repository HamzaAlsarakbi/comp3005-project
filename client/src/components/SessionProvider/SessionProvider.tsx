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
      setSession(res.data);
    }).catch((err) => {
      setSession(null);
      sessionCallback(false, null);
      if(document.location.pathname !== '/login')
        document.location.replace('/login');
    });
  }, [sessionCallback]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;