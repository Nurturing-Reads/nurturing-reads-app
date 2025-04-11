import { useEffect, useState} from "react";

export const fetchCurrentUser = () => {
  const [userID, setUserID] = useState(null);
  useEffect(() => {
        // document.title = "Nurturing Reads";
        // temp function to get dummy user, need to change
        const fetchCurrentUser = async () => {
            setUserID("1");
        };

        fetchCurrentUser();
    }, []);
  return userID;
}