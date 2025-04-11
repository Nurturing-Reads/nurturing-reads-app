import React, { useEffect, useState} from "react";
import { getDevBackend } from "../misc/getBackend";

export const useFetchBook = (id) => {
  const backendAddress = getDevBackend();
  const [book, setBook] = useState(null);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log(backendAddress);
        const response = await fetch(`${backendAddress}books/book/${id}`);
        const data = await response.json();
        console.log(data)
        setBook(data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetchBook();
  }, [id, backendAddress]);

  console.log(book)
  return book;
};
