import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

import Section from './Section.js';
import Finish from './Finish.js';
import { AddressContext } from '../../AddressContext.js';
import left_arrow_img from '../../images/left_arrow.png';
import right_arrow_img from '../../images/right_arrow.png';
import button_click_sound from '../../audios/click1.mp3';

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}


// TODO should chnage the way audioURL is updated/located
export default function Book( {id, user_id, updateAudio, setSoundEffect, to_booklist} ) {
  const [book, setBook] = useState(null);
  // question -1: display text
  // question n : display nth question
  // choice -1: not playing response from any choice
  // choice n: play response for nth choice, reset to -1 at next update
  // section 0~N-1: display current section
  // section N: display end of book page
  const [currStatus, setCurrStatus] = useState({section:0, question:-1, choice:-1});

  // tracks which choice has been selected
  const [choiceStatus, setChoiceStatus] = useState(null);
  const backendAddress = useContext(AddressContext); 
  
  // string indicates that user has not select right answer but tries to go to next page
  const cannot_move_next = "no_right_answer";

  // check if right answer for current question is selected - not in use
  function checkCurrAnswer() {
	for (let idx = 0; idx < choiceStatus['sections'][currStatus.section]['questions'][currStatus.question]['options'].length; idx++) {
	  if (book.sections[currStatus.section].questions[currStatus.question].options[idx].flag) {
		if (choiceStatus['sections'][currStatus.section]['questions'][currStatus.question]['options'][idx]) {
		  return true;
		} else {
		  return false;
		}
	  }
	}
	console.log("error: no right choice found");
    return false;
  }
  
  // check if current question is attempted
  function checkCurrAttempted() {
	for (let idx = 0; idx < choiceStatus['sections'][currStatus.section]['questions'][currStatus.question]['options'].length; idx++) {
	  if (choiceStatus['sections'][currStatus.section]['questions'][currStatus.question]['options'][idx]) {
	    return true;
	  }
	}
	return false;
  }

  // handles trying to move to previous page
  function handlePrevClick() {
    if (currStatus.section === 0 && currStatus.question === -1) {
      return;
    }
    var newSection = currStatus.section;
    var newQuestion = currStatus.question;
    if (currStatus.question === -1) {
      newSection = currStatus.section-1;
      newQuestion = book.sections[newSection].questions.length-1;
    } else {
      newQuestion = currStatus.question-1;
    }
    setCurrStatus({section:newSection, question:newQuestion, choice:-1});
    fetchNewAudio({section:newSection, question:newQuestion, choice:-1});
  }
  
  // handles trying to move to next page
  function handleNextClick() {
    // end of book page has no question, if user press next, save the book progress
    // and exit from the book
    if (currStatus.section === book.sections.length) {
      to_booklist();
      return;
    }
    var newSection = currStatus.section;
    var newQuestion = currStatus.question;
    
    if (currStatus.question === book.sections[currStatus.section].questions.length-1) {
	  if (currStatus.question!==-1) { //there is no question for the section
	    if (!checkCurrAttempted()) {
		  fetchNewAudio(cannot_move_next);
	      return;
        }
      }
      newSection = currStatus.section+1;
      newQuestion = -1;
    } else {
      newQuestion = currStatus.question+1;
    }
    
    if (newSection===book.sections.length) {
	  saveBookProgress();
	}
    setCurrStatus({section:newSection, question:newQuestion, choice:-1});
    fetchNewAudio({section:newSection, question:newQuestion, choice:-1});
  }

  const leftButton = (
    <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={handlePrevClick}>
      <Image source={require('../../images/left_arrow.png')} style={styles.arrow} />
    </TouchableOpacity>
  );

  const rightButton = (
    <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={handleNextClick}>
      <Image source={require('../../images/right_arrow.png')} style={styles.arrow} />
    </TouchableOpacity>
  );
  
  const controls = {prev:leftButton,
					next:rightButton}
	
  //~ function pad(num, size) {
    //~ num = num.toString();
    //~ while (num.length < size) num = "0" + num;
    //~ return num;
  //~ }
  
  // this changes the choice status within frontend view and fetch response audio from backend
  const updateChoiceStatus = async(index) => {
	if (currStatus.question === -1) {
	  console.log("invalid question index");
	  return;
	}
	// play response audio
    fetchNewAudio({section:currStatus.section, 
		           question:currStatus.question, 
		           choice:index});
	choiceStatus['sections'][currStatus.section]['questions'][currStatus.question]['options'][index] = true;
    setChoiceStatus(JSON.parse(JSON.stringify(choiceStatus)));
  }
  
  // saves book progress to backend. This is triggered when the end of book is reached
  const saveBookProgress = async() => {
	try {
      const response = await fetch(`${backendAddress}books/book_progress/${id}/${user_id}/set/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ json_data: choiceStatus })
      });
      if (response.ok) {
        console.log('book progress updated successfully');
      } else {
        console.error('Failed to update book progress');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
	
  // fetch audio
  const fetchNewAudio = async (newStatus) => {
	if (String(newStatus)=== cannot_move_next) {
	    try {
        // Fetch the new audio
        const response = await axios.get(`${backendAddress}reading_app/audio/answer_before_next`, {
          responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        updateAudio({url:url, shouldReplay:false});
      } catch (error) {
        console.error('Error fetching new audio:', error);
      }
	  return;
	}
	// play button sound effect
	if (newStatus.choice!==-1) {
	  setSoundEffect({url:button_click_sound});
	  sleep(2000);
	}
	// end of book page has no audio to play
	if (book && (newStatus.section === book.sections.length)) {
	  updateAudio({url:'', shouldReplay:false});
	  return;
	}
    try {
      // Fetch the new audio
      const response = await axios.get(`${backendAddress}books/audio/${id}/section_${newStatus.section+1}/question_${newStatus.question+1}/choice_${newStatus.choice+1}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);

      // Set the new audio URL
      const flag = (newStatus.choice===-1);
      updateAudio({url:url, shouldReplay:flag});
      //~ console.log(newStatus);
    } catch (error) {
      console.error('Error fetching new audio:', error);
    }
		
  }
	
  // fetch book and book progress
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${backendAddress}books/book/${id}`);
				
        const data = await response.json();			
        setBook(data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }	
    };
	// original design: display book progress when opening a book
	// new design: do not display previous progress when opening a book
    //~ const fetchBookProgress = async () => {
      //~ try {
        //~ const response = await fetch(`${backendAddress}books/book_progress/${id}/${user_id}`);
				
        //~ const data = await response.json();			
        //~ setChoiceStatus(data);
      //~ } catch (error) {
        //~ console.error('Error fetching book:', error);
      //~ }
    //~ };

	const fetchBookProgressTemplate = async () => {
      try {
        const response = await fetch(`${backendAddress}books/book_progress_template/${id}/`);
				
        const data = await response.json();			
        setChoiceStatus(data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
    //~ fetchBookProgress();
    fetchBookProgressTemplate();
  }, [id, user_id]);
	
  // fetch initial audio when the component mounts
  useEffect(() => {
    fetchNewAudio(currStatus);
  }, []);
	
  // book loading page
  if (book === null ) {
    return <div>Loading book...</div>;
  }

  return (
    <>
      <h1>{book.title}</h1>
      {(currStatus.section === book.sections.length) ? (
        <Finish book_id={id} controls={controls}/> 
	  ) : (
        <Section sections={book.sections} currSection={currStatus.section}
			 currQuestion={currStatus.question} choiceStatus={choiceStatus} 
			 updateChoiceStatus={updateChoiceStatus} book_id={id} controls={controls}/>
      )}
      
    </>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    backgroundSize: 'contain',
    height: '100vh',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  text: {
    color: 'black',
    backgroundColor: 'rgba(200, 200, 200, 0.80)',
    fontSize: 24,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    height: '60%',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    left: 0,
  },
  rightButton: {
    right: 0,
  },
  arrow: {
    width: 80,
    height: 120,
  },
});
