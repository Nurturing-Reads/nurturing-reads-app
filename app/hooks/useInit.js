import { useEffect } from "react";

export const useInit = () => {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    // temp function to get dummy user, need to change
    const fetchCurrentUser = async () => {
      setUserID("1");
    };

    fetchCurrentUser();
  }, []);
  return userID;
};
