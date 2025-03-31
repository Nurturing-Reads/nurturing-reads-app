import React , { useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";

import BookSelection from './BookSelection/BookSelectionGrid.js';
import Header from '../components/Header.js'
import Book from "./Book/Book.js";
import { AddressContext } from '../AddressContext.js';

const BookScreen = ({ signedIn = false }) => {
	
  const [userID, setUserID] = useState(null);
  const [booklist, setBooklist] = useState([]);
  const [currBook, setCurrBook] = useState(null);
  const [audioUrl, setAudioUrl] = useState({url:'', shouldReplay:false});
  const [soundEffectUrl, setSoundEffectUrl] = useState({url:''});
  const soundEffectRef = useRef(new Audio());
  const soundEffectPlayerID = 'soundEffectPlayer';
  
  // setting currBook to null will direct user to book selection page
  function clearBook() {
    setCurrBook(null);
    setAudioUrl({url:'', shouldReplay:false});
  };
  
  function updateAudio(newUrlStruct) {
	setAudioUrl(newUrlStruct);
  }
  
  //http://localhost:3000/#home -> http://localhost:8000/
  function getDevBackend() {
    var address = window.location.href;
    const tokens = address.split(":");
    // if last char of tokens[1] is "/", remove it:
    if (tokens[1].charAt(tokens[1].length-1) === "/") {
      tokens[1] = tokens[1].slice(0, -1);
    }
    address = tokens[0]+":"+tokens[1]+":8000/";
    return address;
  }
  
  const backendAddress =  getDevBackend();

  // init	
  useEffect(() => {
    document.title = 'Nurturing Reads';
    // temp function to get dummy user, need to change
    const fetchCurrentUser = async () => {
      setUserID("1");
    };
		
    fetchCurrentUser();
  }, []);
  
  // fetch booklist
  useEffect(() => {
    const fetchBooklist = async () => {
      try {
		// TODO change backend to get user booklist
        //~ const response = await fetch(backendAddress+'users/user'+userID+'/booklist');
        const response = await fetch(backendAddress+'books/book_list/');
        const data = await response.json();			
        setBooklist(data);
      } catch (error) {
        console.error('Error fetching booklist:', error);
      }
    };
    if (userID == null) {
      return;
    }

    fetchBooklist();
  }, [userID]);
	//~ console.log(backendAddress);
  //~ if (booklist.length === 0) {
    //~ return <div>Loading booklist...</div>;
  //~ }
  //~ console.log(userID);
  
  return (
    <View >
      <AddressContext.Provider value={backendAddress}>
        <Header to_booklist={clearBook} audioUrl={audioUrl}/>
        <div>
          {(currBook === null ) ? (
            <BookSelection book_list={booklist.list} setCurrBook={setCurrBook}/> 
	      ) : (
            <Book id={currBook} user_id={userID} updateAudio={updateAudio} setSoundEffect={setSoundEffectUrl} to_booklist={clearBook}/> 
          )}
          </div>
      </AddressContext.Provider>
      <audio ref={soundEffectRef} id={soundEffectPlayerID} autoPlay style={{display:'none'}} >
		<source src={soundEffectUrl.url} type="audio/mp3" />
		Your browser does not support the audio element.
	  </audio>

    </View>
  );
};
export default BookScreen;
