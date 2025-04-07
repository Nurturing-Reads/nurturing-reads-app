import React, { useState } from "react";
import BookTile from './BookTile.js';
import "./Slider.css";
// https://codesandbox.io/p/sandbox/react-carousel-3d-9x3wt?file=%2Fsrc%2FSlider.js%3A15%2C1

export default (props) => {
  const [activeSlide, setactiveSlide] = useState(props.props.activeSlide);

  //~ const next = () =>
    //~ activeSlide < props.props.data.length - 1 && setactiveSlide(activeSlide + 1);

  //~ const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);
  
  const findClickedSlide = (book_id) => {
	for (let i = 0; i <  props.props.data.length; i++) {
      if (props.props.data[i].id === book_id) {
		return i;  
	  }
    }
    return -1;
  };
	
  const handleBookTileClick = (book_id) => {
	  const clicked_idx = findClickedSlide(book_id);
	  if (clicked_idx === -1 ) {
        console.log("cannot find book_id: " + book_id);
	  }
	if (clicked_idx === activeSlide) {
	  props.props.setCurrBook(book_id);
	} else {
	  setactiveSlide(clicked_idx);
	}
  };

  const getStyles = (index) => {
    if (activeSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10
      };
    else if (activeSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9
      };
    else if (activeSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9
      };
    else if (activeSlide - 2 === index)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8
      };
    else if (activeSlide + 2 === index)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8
      };
    else if (index < activeSlide - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7
      };
    else if (index > activeSlide + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7
      };
  };

  return (
    <>
      {/* carousel */}
      <div className="slideC">
        {props.props.data.map((item, i) => (
          <React.Fragment key={item.id}>
            <div
              className="slide"
              style={{
                background: "white",
                boxShadow: `0 5px 20px ${item.bgColor}30`,
                ...getStyles(i)
              }}
            >
              <SliderContent props={item} handleBookTileClick={handleBookTileClick} />
            </div>
            <div
              className="reflection"
              style={{
                background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
                ...getStyles(i)
              }}
            />
          </React.Fragment>
        ))}
      </div>
      {/* carousel */}
{/*
      <div className="btns">
		<button onClick={prev}>
					PREV
		</button>
		<button onClick={next}>
					NEXT
		</button>
        
      </div>
      */}
    </>
  );
};

const SliderContent = (props, handleBookTileClick) => {

  return (
    <div className="sliderContent">
		<BookTile book={props.props} handleBookTileClick={props.handleBookTileClick} />

    </div>
  );
};
