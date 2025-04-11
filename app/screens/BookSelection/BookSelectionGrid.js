import React, { useContext } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import { bookData } from "./BookData.js";
import { BookCard } from "./BookCard.js";

export default function BookSelection({ book_list, setCurrBook }) {

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Render Book Data */}
        {bookData.map((item, index) => (
          <BookCard
            key={index}
            book={item}
            handler={() => setCurrBook(book_list[0].id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
