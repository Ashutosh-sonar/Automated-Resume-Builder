import { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface ContextProp {
  user: { username: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ username: string } | null>>;
  ready: boolean;
  handleLogout: () => void;
}

const ResumeContext = createContext({} as ContextProp);

const ResumeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {
          const { data } = await axios.get('/api/profile');
          setUser(data);
        } catch (error) {
          console.error('Failed to fetch user', error);
        }
        setReady(true);
      }
    };
    fetchUser();
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Failed to logout', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <ResumeContext.Provider value={{ user, setUser, ready, handleLogout }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => useContext(ResumeContext);
export default ResumeContextProvider;
