import React, { useEffect, useState } from "react";
import resultListSubject from "../model/ResultListSubject";
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
    <div className="list-container col-12">
      <ul className="list">
        {currentWords.map((word) => (
          <li className="listItem" key={word}>
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedResultList;
