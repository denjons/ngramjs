class GenerateWordsSubject {
  constructor() {
    this.observers = new Map();
  }

  attach(observer) {
    this.observers.set(observer, observer);
  }

  detach(observer) {
    this.observers.delete(observer);
  }

  notify(text) {
    this.observers.forEach((observer, key, map) => observer(text));
  }
}

const generateWordsSubject = new GenerateWordsSubject();

export default generateWordsSubject;
