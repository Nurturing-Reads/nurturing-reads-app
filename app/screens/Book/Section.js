import React, { useContext, useEffect } from "react";
import Reading from "./Reading/Reading.js";
import Question from "./Question/Question.js";
import { AddressContext } from "../../AddressContext.js";

export default function Section({
  sections,
  currSection,
  currQuestion,
  choiceStatus,
  updateChoiceStatus,
  book_id,
  controls,
}) {
  const backendAddress = "http://127.0.0.1:8000/";
  // useContext(AddressContext);
  const img_url = backendAddress + "books/book_background/" + book_id + "/0/";
  //~ const img_url = backendAddress+"books/book_background/"+book_id+"/"+currSection+"/";
  return (
    <>
      {currQuestion === -1 ? (
        <Reading
          img_url={img_url}
          content={sections[currSection].content}
          controls={controls}
        />
      ) : (
        <Question
          img_url={img_url}
          question={sections[currSection].questions[currQuestion]}
          choiceStatus={
            choiceStatus["sections"][currSection]["questions"][currQuestion][
              "options"
            ]
          }
          updateChoiceStatus={updateChoiceStatus}
          controls={controls}
        />
      )}
    </>
  );
}
