class Point {
  x: number;
  y: number;
}

const pt = new Point();
pt.x = 0;
pt.y = 0;

class GoodGreeter {
  name: string;

  constructor() {
    this.name = "hello";
  }
}

class OKGreeter {
  // Not initialized, but no error
  name!: string;
}

// *******************ReadOnly****************
class Greeter {
  readonly name: string = "world";

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }

  err() {
    // this.name = "not ok";
    // Cannot assign to 'name' because it is a read-only property.
  }
}
// const g = new Greeter();
// g.name = "also not ok";

// ******************Constructors**************************
class Points {
  //   x: number;
  //   y: number;

  //   // Normal signature with defaults
  //   constructor(x = 0, y = 0) {
  //     this.x = x;
  //     this.y = y;
  //   }

  x: number = 0;
  y: number = 0;

  // Constructor overloads
  constructor(x: number, y: number);
  constructor(xy: string);
  constructor(x: string | number, y: number = 0) {
    // Code logic here
  }
}

// class Base {
//   k = 4;
// }

// class Derived extends Base {
//   constructor() {
//     // Prints a wrong value in ES5; throws exception in ES6
//     // console.log(this.k);
//     // 'super' must be called before accessing 'this' in the constructor of a derived class.
//     super();
//   }
// }

// *******************Methods**********************
class Pointe {
  x = 10;
  y = 10;

  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}

let x: number = 0;

// class C {
//   x: string = "hello";

//   m() {
//     // This is trying to modify 'x' from line 1, not the class property
//     x = "world";
//     // Type 'string' is not assignable to type 'number'.
//   }
// }

// *************Getters / Setters************

class C {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}

class Thing {
  _size = 0;

  get size(): number {
    return this._size;
  }

  set size(value: string | number | boolean) {
    let num = Number(value);

    // Don't allow NaN, Infinity, etc

    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }

    this._size = num;
  }
}

// **************Index Signatures***************
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string) {
    return this[s] as boolean;
  }
}

// ***************Class Heritage***************
// ++++++++++++++++++++implements Clauses++++++++++++++++++++
interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}

// class Ball implements Pingable {
// // Class 'Ball' incorrectly implements interface 'Pingable'.
// //   Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
//   pong() {
//     console.log("pong!");
//   }
// }

interface Checkable {
  check(name: string): boolean;
}

class NameChecker implements Checkable {
  check(s) {
    // Parameter 's' implicitly has an 'any' type.
    // Notice no error here
    return s.toLowerCase() === "ok";

    // any
  }
}

// ++++++++++++++++++extends Clauses+++++++++++++++++++++++
class Animal {
  move() {
    console.log("Moving along!");
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}

const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);

class Base {
  greet() {
    console.log("Hello, world!");
  }
}

class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

const g = new Derived();
g.greet();
g.greet("reader");

const b: Base = g;
// No problem
b.greet();

interface Animal {
  dateOfBirth: any;
}

interface Dog extends Animal {
  breed: any;
}

class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}

class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code,
  // only ensures the types are correct
  declare resident: Dog;
  constructor(dog: Dog) {
    super(dog);
  }
}

class MsgError extends Error {
  constructor(m: string) {
    super(m);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MsgError.prototype);
  }
  sayHello() {
    return "hello " + this.message;
  }
}

// ***********************Member Visibility***********************
class Greeters {
  public greet() {
    console.log("hi!");
  }
}
const h = new Greeters();
h.greet();

class Greeteres {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}

class SpecialGreeter extends Greeteres {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}
const gj = new SpecialGreeter();
gj.greet(); // OK
gj.getName();

class Bases {
  private x = 0;
}
class Derivedes extends Bases {
  x = 1;
}

// **************Static Members************
class MyClasses {
  static x = 0;
  static printX() {
    console.log(MyClasses.x);
  }
}
console.log(MyClasses.x);
MyClasses.printX();

// ******************static Blocks in Classes*******************

class Foo {
  static #count = 0;

  get count() {
    return Foo.#count;
  }

  static {
    try {
      const lastInstances = loadLastInstances();
      Foo.#count += lastInstances.length;
    } catch {}
  }
}

// *************Generic Classes****************
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}

const w = new Box("hello!");

// this at Runtime in Classes
class MyClass1 {
  name = "MyClass";
  getName() {
    return this.name;
  }
}
const c = new MyClass1();
const obj = {
  name: "obj",
  getName: c.getName,
};

// Prints "obj", not "MyClass"
console.log(obj.getName());

// ******************Arrow function*************
class MyClass2 {
  name = "MyClass";
  getName = () => {
    return this.name;
  };
}
const m = new MyClass();
const n = m.getName;
// Prints "MyClass" instead of crashing
console.log(n());

// this parameters
function fn(this: SomeType, x: number) {
  /* ... */
}

// ************************This type***************************
class Boxes {
  contents: string = "";
  set(value: string) {
    this.contents = value;
    return this;
  }
}

class ClearableBox extends Boxes {
  clear() {
    this.contents = "";
  }
}

const a = new ClearableBox();
const k = a.set("hello");

// ************************Parameter Properties*************************
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const v = new Params(1, 2, 3);
console.log(v.x);
console.log(v.z);

const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};

const j = new someClass("Hello, world");

class Point1 {
  createdAt: number;
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.createdAt = Date.now();
    this.x = x;
    this.y = y;
  }
}
type PointInstance = InstanceType<typeof Point>;

function moveRight(point: PointInstance) {
  point.x += 5;
}

const point = new Point1(3, 4);
moveRight(point);
point.x; // => 8

abstract class Base1 {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}

const b1 = new Base1();

class Derived2 extends Base1 {
  getName() {
    return "world";
  }
}

const d1 = new Derived();
d1.printName();

class Person {
  name: string;
  age: number;
}

class Employee {
  name: string;
  age: number;
  salary: number;
}

// OK
const p: Person = new Employee();
