import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, ScrollView} from "react-native";
import { Audio } from "expo-av";
import Header from "../../components/Header";
import axios from "axios";
import { AddressContext } from "../../AddressContext";
import BookSelection from "../BookSelection/BookSelectionGrid";
import { getDevBackend } from "../../misc/getBackend";
import { fetchCurrentUser } from "../../hooks/fetchCurrentUser";
import { useFetchBook } from "../../hooks/useFetchBook";
// import { useBookList } from "../../hooks/useFetchBookList";
import Book from "../Book/Book";

const TabletBookScreen = ({ signedIn = false }) => {
    // const [userID, setUserID] = useState(null);
    const userID = fetchCurrentUser();
    const [book, setBook] = useState(null);
    // const book = useFetchBook();
    const [booklist, setBooklist] = useState([]);
    const [currBook, setCurrBook] = useState(null);
    // question -1: display text
    // question n : display nth question
    // choice -1: not playing response from any choice
    // choice n: play response for nth choice, reset to -1 at next update
    // section 0~N-1: display current section
    // section N: display end of book page

    const [currStatus, setCurrStatus] = useState({
        section: 0,
        question: -1,
        choice: -1,
    });

    const cannot_move_next = "no_right_answer";
    const backendAddress = getDevBackend();
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`${`backendAddress`}books/book/${id}`);
                const data = await response.json();
                console.log(data)
                setBook(data);
                console.log(response);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };
        fetchBook();
    }, []);

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

    return (
        <AddressContext.Provider value={backendAddress}>

            {<Text>{book.title}</Text>}
            <ScrollView>
                {currBook === null ? (
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
                )}
            </ScrollView>

        </AddressContext.Provider>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundSize: "contain",
        height: "100vh",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
    },
    text: {
        color: "black",
        backgroundColor: "rgba(200, 200, 200, 0.80)",
        fontSize: 24,
        textAlign: "center",
    },
    button: {
        position: "absolute",
        height: "60%",
        width: 80,
        justifyContent: "center",
        alignItems: "center",
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

export default TabletBookScreen;
