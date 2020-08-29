import React, { useEffect, useState } from "react";
import generateResultSubject from "../../corpus/model/GenerateResultSubject";
import resultListSubject from "../model/ResultListSubject";
import "./ResultList.css";

function ResultList() {
  const [currentWords, setCurrentWords] = useState([]);

  useEffect(() => {
    generateResultSubject.attach(onWordsGenerated);
    console.log(generateResultSubject);
    return () => {
      generateResultSubject.detach(onWordsGenerated);
    };
  });

  const onWordsGenerated = (words) => {
    console.info("onWordsGenerated");
    setCurrentWords(words);
  };

  const clicked = (word) => {
    console.log(word);
    resultListSubject.notify(word);
    setCurrentWords(currentWords.filter((w) => w !== word));
  };

  return (
    <div className="list-container col-12">
      <ul className="list">
        {currentWords.map((word) => (
          <li
            onClick={(e) => clicked(e.target.innerText)}
            className="listItem"
            key={word}
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultList;
