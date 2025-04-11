import { useState, useContext } from 'react';
import {View, Text} from 'react-native';

import { AddressContext } from '../../AddressContext.js';

export default function BookTile({ book, handleBookTileClick }) {
  const [showDetail, setShowDetail] = useState(false);
  const backendAddress = useContext(AddressContext);
  
  return (
    <View
	  //~ onPointerEnter={e => setShowDetail(true)}
	  //~ onPointerLeave={e => setShowDetail(false)}
      onClick={e => handleBookTileClick(book.id)}
    >
    <View>
      {true && <img style={{ maxWidth: '200px', height: 'auto' }} src={backendAddress+"books/book_cover/"+book.id} alt={book.title} />}
    </View>
    <Text> {book.title} </Text>
      { showDetail &&
        <Text> {book.summary} </Text>
      }
    </View>
  );
}
