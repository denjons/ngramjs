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

  notify(event) {
    this.observers.forEach((observer, key, map) => observer(event));
  }
}

const generateClickEventSubject = new GenerateClickEventSubject();

export default generateClickEventSubject;
