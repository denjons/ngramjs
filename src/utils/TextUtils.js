class TextUtils {
  /**
   * keeps the 'count' largest words in place.
   * @param {*} words words array
   * @param {*} count count to keep
   */
  static takeLargestWords(words, count) {
    // distinct
    var newWords = Array.from(new Set(words.map((item) => item)));
    newWords.sort((a, b) => a.length - b.length);
    newWords.reverse();
    // empty words array
    while (words.length > 0) {
      words.pop();
    }
    while (newWords.length > count) {
      newWords.pop();
    }
    newWords.forEach((elm) => words.push(elm));
    return words;
  }

  static takeLargesSentences(sentences, count) {
    // distinct
    var newSentences = Array.from(new Set(sentences.map((item) => item)));
    newSentences.sort((a, b) => a.split(" ").length - b.split(" ").length);
    newSentences.reverse();
    // empty words array
    while (sentences.length > 0) {
      sentences.pop();
    }
    while (newSentences.length > count) {
      newSentences.pop();
    }
    newSentences.forEach((elm) => sentences.push(elm));
    return sentences;
  }
}

export default TextUtils;
