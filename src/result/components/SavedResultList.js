import React, { useEffect, useState } from "react";
import resultListSubject from "../model/ResultListSubject";
import Row from "react-bootstrap/Row";
import "./ResultList.css";

function SavedResultList() {
  const [currentWords, setCurrentWords] = useState([]);

  useEffect(() => {
    resultListSubject.attach(update);
    console.log(resultListSubject);
    return () => {
      resultListSubject.detach(update);
    };
  });

  const update = (word) => {
    setCurrentWords([...currentWords, word]);
  };

  return (
    <Row>
      {currentWords.map((word) => (
        <div className="listItem span-4" key={word}>
          {word}
        </div>
      ))}
    </Row>
  );
}

export default SavedResultList;
