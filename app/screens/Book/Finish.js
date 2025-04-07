import React, { useContext } from 'react';
import { AddressContext } from '../../AddressContext.js';
import finish_book_img from '../../images/finish_book.png'

export default function Finish( {book_id, controls} ) {
  const backendAddress = useContext(AddressContext);
  const img_url = backendAddress+"books/book_cover/"+book_id;
  const finish_img_url = backendAddress+"media/images/f1.png"
  
  const containerStyle = {
    color: 'black',
    padding: '20px',
    margin: '0px 0',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0'
  };
  
  return (

    <div className="container-fluid main_container d-flex">
      <div className="row flex-fill">
        <div className="bg-image position-relative col-md h-100">
          <img
            src={img_url}
            className="h-100  w-100 img-responsive"
            sytle={{objectFit: "cover"}}
            alt="background"
          />
          {controls.prev}
       </div>
	    <div className="col-md" style={containerStyle}>
	      <h2>Well done! You have finished reading this story!</h2>
	      <img
            src={finish_img_url}
            className="h-100  w-100 img-responsive"
            sytle={{objectFit: "cover"}}
            alt="finish book"
          />
	      {controls.next}
	    </div>
	  </div>
    </div>
  );
}
