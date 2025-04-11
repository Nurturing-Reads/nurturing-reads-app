import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { bookData } from "./BookSelection/BookData";
import { Header } from "./Reader/Header";
import { BookCard } from "./BookSelection/BookCard";
import { useNavigation } from "@react-navigation/native";

export const BookShelfScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Header />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ margin: 50, flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center'}}>
          {bookData.map((book, index) => (
            <BookCard key={index} book={book} handler={() => {
              navigation.navigate('Reader Screen')}
            } />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
