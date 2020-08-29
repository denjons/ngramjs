class GenerateResultSubject {
  constructor() {
    this.observers = new Map();
  }

  attach(observer) {
    this.observers.set(observer, observer);
  }

  detach(observer) {
    this.observers.delete(observer);
  }

  notify(words) {
    this.observers.forEach((observer, key, map) => observer(words));
  }
}

const generateResultSubject = new GenerateResultSubject();

export default generateResultSubject;
