import React, { useEffect, useState } from "react";
import generateResultSubject from "../../corpus/model/GenerateResultSubject";
import resultListSubject from "../model/ResultListSubject";
import "./ResultList.css";
import Row from "react-bootstrap/Row";

function ResultList() {
  const [currentWords, setCurrentWords] = useState([]);

  useEffect(() => {
    generateResultSubject.attach(onWordsGenerated);
    return () => {
      generateResultSubject.detach(onWordsGenerated);
    };
  });

  const onWordsGenerated = (words) => {
    setCurrentWords(words);
  };

  const clicked = (word) => {
    resultListSubject.notify(word);
    setCurrentWords(currentWords.filter((w) => w !== word));
  };

  return (
    <Row>
      {currentWords.map((word) => (
        <div
          className="listItem span-4"
          onClick={(e) => clicked(e.target.innerText)}
          key={word}
        >
          {word}
        </div>
      ))}
    </Row>
  );
}

export default ResultList;
