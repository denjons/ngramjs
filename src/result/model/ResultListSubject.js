class ResultListSubject {
  constructor() {
    this.observers = new Map();
  }

  attach(observer) {
    this.observers.set(observer, observer);
  }

  detach(observer) {
    this.observers.delete(observer);
  }

  notify(word) {
    this.observers.forEach((observer, key, map) => observer(word));
  }
}

const resultListSubject = new ResultListSubject();

export default resultListSubject;
