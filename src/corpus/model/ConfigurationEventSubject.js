class GenerateClickEventSubject {
  constructor() {
    this.observers = new Map();
  }

  attach(observer) {
    this.observers.set(observer, observer);
  }

  detach(observer) {
    this.observers.delete(observer);
  }

  notify(config) {
    this.observers.forEach((observer, key, map) => observer(config));
  }
}

const generateClickEventSubject = new GenerateClickEventSubject();

export default generateClickEventSubject;
