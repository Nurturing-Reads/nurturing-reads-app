import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, SafeAreaView, Image, Platform } from "react-native";
// import { Audio } from "expo-av";
import BookSelection from "./BookSelection/BookSelectionGrid.js";
import Header from "../components/Header.js";
import Book from "./Book/Book.js";
import { AddressContext } from "../AddressContext.js";
import { useInit } from "../hooks/useInit.js";
import { useBookList } from "../hooks/useBooklist.js";

const BookScreen = ({ signedIn = false }) => {
  // const [userID, setUserID] = useState(null);
  const userID = useInit();
  // const [booklist, setBooklist] = useState([]);
  const booklist = useBookList();
  const [currBook, setCurrBook] = useState(null);
  const [audioUrl, setAudioUrl] = useState({ url: "", shouldReplay: false });
  const [soundEffectUrl, setSoundEffectUrl] = useState({ url: "" });
  const soundEffectRef = useRef(new Audio());
  const soundEffectPlayerID = "soundEffectPlayer";
s
  // setting currBook to null will direct user to book selection page
  function clearBook() {
    setCurrBook(null);
    setAudioUrl({ url: "", shouldReplay: false });
  }

  function updateAudio(newUrlStruct) {
    setAudioUrl(newUrlStruct);
  }

  //http://localhost:3000/#home -> http://localhost:8000/
  function getDevBackend() {
    const address = "http://127.0.0.1:8000/";
    return address;
  }

  const backendAddress = getDevBackend();

  // init
  // useEffect(() => {
  //   if (Platform.OS === 'web'){
  //     document.title = "Nurturing Reads";
  //   }
  //   // temp function to get dummy user, need to change
  //   const fetchCurrentUser = async () => {
  //     setUserID("1");
  //   };

  //   fetchCurrentUser();
  // }, []);

  // fetch booklist
  // useEffect(() => {
  //   const fetchBooklist = async () => {
  //     try {
  //       // TODO change backend to get user booklist
  //       //~ const response = await fetch(backendAddress+'users/user'+userID+'/booklist');
  //       const response = await fetch(backendAddress + "books/book_list/");
  //       const data = await response.json();
  //       console.log(response)
  //       setBooklist(data);
  //     } catch (error) {
  //       console.error("Error fetching booklist:", error);
  //     }
  //   };
  //   if (userID == null) {
  //     return;
  //   }

  //   fetchBooklist();
  // }, [userID]);

  useEffect(() => {
    let sound;

    const playSoundEffect = async () => {
      if (!soundEffectUrl.url) return;
      try {
        sound = new Audio.Sound();
        await sound.loadAsync({ uri: soundEffectUrl.url });
        await sound.playAsync();
      } catch (error) {
        console.error("Failed to play sound effect:", error);
      }
    };

    playSoundEffect();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [soundEffectUrl.url]);

  return (
    <View>
      
        <Header to_booklist={clearBook} audioUrl={audioUrl} />
        <View>
          <BookShelf />
          {/* {currBook === null ? (
            <BookSelection
              book_list={booklist.list}
              setCurrBook={setCurrBook}
            />
          ) : (
            <Book
              id={currBook}
              user_id={userID}
              updateAudio={updateAudio}
              setSoundEffect={setSoundEffectUrl}
              to_booklist={clearBook}
            />
          )} */}
        </View>
    
    </View>
  );
};

export default BookScreen;