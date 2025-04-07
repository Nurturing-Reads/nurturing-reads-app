import { useState, useContext } from 'react';

import { AddressContext } from '../../AddressContext.js';

export default function BookTile({ book, handleBookTileClick }) {
  const [showDetail, setShowDetail] = useState(false);
  const backendAddress = useContext(AddressContext);
  
  return (
    <div
	  //~ onPointerEnter={e => setShowDetail(true)}
	  //~ onPointerLeave={e => setShowDetail(false)}
      onClick={e => handleBookTileClick(book.id)}
    >
    <div>
      {true && <img style={{ maxWidth: '200px', height: 'auto' }} src={backendAddress+"books/book_cover/"+book.id} alt={book.title} />}
    </div>
    <h1> {book.title} </h1>
      { showDetail &&
        <h3> {book.summary} </h3>
      }
    </div>
  );
}
