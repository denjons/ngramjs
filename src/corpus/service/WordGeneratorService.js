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
    this.config[config.property] = config.value;
  };

  onGenerateWords = (text) => {
    console.info("onGenerateWords");
    let words = Corpus.generateLetterCorpus(
      text,
      this.config.markovOrder
    ).generateWords(this.config.wordCount + 100, this.config.wordLength);
    let topWords = TextUtils.takeLargestWords(words, this.config.wordCount);
    generateResultSubject.notify(topWords);
  };
}

export default WordGeneratorService;
