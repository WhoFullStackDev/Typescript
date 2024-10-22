// Optional Properties
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate is", xPos);
  console.log("y coordinate is", yPos);
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

// readonly Properties
interface someType {
  readonly props: string;
}

function doSomething(obj: someType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.props}'.`);

  // But we can't re-assign it.
  obj.props = "hello";
}

interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}

function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  home.resident = {
    name: "Victor the Evictor",
    age: 42,
  };
}

interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};

// works
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'

// Index Signatures
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];

interface NumberDictionary {
  [index: string]: number;
  length: number; // ok
  name: string;
}

interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray2: ReadonlyStringArray = getReadOnlyStringArray();
myArray2[2] = "Mallory";

//Excess Property Checks
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}

// let mySquare = createSquare({ colour: "red", width: 100 });
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: unknown;
}

let squareOptions = { colour: "red", width: 100 };
mySquare = createSquare(squareOptions);

// Extending Type
// interface BasicAddress {
//   name?: string;
//   street: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// interface AddressWithUnit {
//   name?: string;
//   unit: string;
//   street: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}

interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};

//Intersection Types
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });

// oops
draw({ color: "red", raidus: 42 });
