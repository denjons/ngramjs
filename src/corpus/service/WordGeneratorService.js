import Corpus from "../model/Corpus";
import TextUtils from "../../utils/TextUtils";
import generateResultSubject from "../model/GenerateResultSubject";
import generateCorpusSubject from "../model/GenerateCorpusSubject";
import configurationEventSubject from "../model/ConfigurationEventSubject";

class WordGeneratorService {
  constructor(config) {
    this.config = config;

    console.log("attaching to subjects");
    generateCorpusSubject.attach(this.onGenerateWords);
    configurationEventSubject.attach(this.onReconfigure);
  }

  onReconfigure = (config) => {
    this.config[config.property] = config.value;
  };

  onGenerateCorpus(text) {
    if (this.config.generate === "words") {
      this.onGenerateWords(text);
    } else if (this.config.generate === "sentences") {
      this.onGenerateSentences(text);
    } else {
      console.error("config.generate is not set: " + this.config.generate);
    }
  }

  onGenerateWords = (text) => {
    console.info("onGenerateWords");
    let words = Corpus.generateLetterCorpus(
      text,
      this.config.markovOrder
    ).generateWords(this.config.wordCount + 100, this.config.wordLength);
    let topWords = TextUtils.takeLargestWords(words, this.config.wordCount);
    generateResultSubject.notify(topWords);
  };

  onGenerateSentences = (text) => {
    console.info("onGenerateSentences");
    let sentences = Corpus.generateWordCorpus(
      text,
      this.config.markovOrder
    ).generateSentences(this.config.wordCount + 100, this.config.wordLength);
    let topSentences = TextUtils.takeLargesSentences(
      sentences,
      this.config.wordCount
    );
    generateResultSubject.notify(topSentences);
  };
}

export default WordGeneratorService;
