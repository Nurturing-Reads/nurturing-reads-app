import React, {useEffect} from "react";
import { useInit } from "./useInit";
import { getDevBackend } from "../misc/getBackend";

export const useBookList = () => {
    const backendAddress = getDevBackend();
  const [booklist, setBooklist] = useState([]);
  const userID = useInit();
  useEffect(() => {
    const fetchBooklist = async () => {
        try {
            // TODO change backend to get user booklist
            //~ const response = await fetch(backendAddress+'users/user'+userID+'/booklist');
            const response = await fetch(backendAddress + "books/book_list/");
            const data = await response.json();
            setBooklist(data);
        } catch (error) {
            console.error("Error fetching booklist:", error);
        }
    };
    if (userID == null) {
        return;
    }

    fetchBooklist();
}, [userID]);
  return booklist;
} 
