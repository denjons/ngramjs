
class TextUtils {
    static sortWords(words, count){
        words.sort((a,b) => a.length - b.length);
        return words.slice(count);
    }
}

export default TextUtils;