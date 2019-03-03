
class TextUtils {
    /**
     * keeps the 'count' largest words in place.
     * @param {*} words words array
     * @param {*} count count to keep
     */
    static takeLargestWords(words, count){
        // distinct
        var newWords = Array.from(new Set(words.map((item) => item)));
        newWords.sort((a,b) => a.length - b.length);
        newWords.reverse();
        // empty words array
        while(words.length > 0){
            words.pop();
        }
        while(newWords.length > count){
            newWords.pop();
        }
        newWords.forEach(elm => words.push(elm));
        return words;
    }


}

export default TextUtils;