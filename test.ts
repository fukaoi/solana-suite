class A {
  bb = 10
  constructor() {
    this.bb;
  }
}

class B<A> extends A {
  constructor() {
    super();
  }

  toStr() {
    console.log(this);
  }
}

const data = new A();
const data2 = new B<A>();
console.log(data, data2);

data2.toStr()
