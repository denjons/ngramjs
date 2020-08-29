import Corpus from "../model/Corpus";
import TextUtils from "../../utils/TextUtils";
import generateResultSubject from "../model/GenerateResultSubject";
import generateWordsSubject from "../model/GenerateWordsSubject";
import configurationEventSubject from "../model/ConfigurationEventSubject";

class WordGeneratorService {
  constructor(config) {
    this.config = config;

    console.log("attaching to subjects");
    generateWordsSubject.attach(this.onGenerateWords);
    configurationEventSubject.attach(this.onReconfigure);
  }

  onReconfigure = (config) => {
    this.config = config;
  };

  onGenerateWords = (text) => {
    console.info("onGenerateWords");
    let corpus = new Corpus(text, this.config.markovOrder);
    corpus.generateLetterCorpus();
    let marovChain = corpus.getMarkovChain();
    console.log(marovChain);
    let words = marovChain.generateWords(
      this.config.wordCount + 100,
      this.config.wordLength
    );
    let topWords = TextUtils.takeLargestWords(words, this.config.wordCount);
    console.info(words);
    generateResultSubject.notify(topWords);
  };
}

export default WordGeneratorService;
