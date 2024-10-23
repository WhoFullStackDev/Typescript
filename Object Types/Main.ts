// ********************Optional Properties********************
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

// ********************readonly Properties********************
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

// ********************Index Signatures********************
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

//********************Excess Property Checks********************
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

// ********************Extending Type********************
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

//********************Intersection Types********************
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

// ********************Generic Object Types********************
interface Box<Type> {
  contents: Type;
}

interface StringBox {
  contents: string;
}

let boxA: Box<string> = { contents: "hello" };
boxA.contents;

let boxB: StringBox = { contents: "world" };
boxB.contents;

interface Apple {
  // ....
}

// Same as '{ contents: Apple }'.
type AppleBox = Box<Apple>;

function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}

type Boxes<Type> = {
  contents: Type;
};

type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

// ********************The Array Type********************
function doSomethings(value: Array<string>) {
  // ...
}

let myArrays: string[] = ["hello", "world"];

// either of these work!
doSomethings(myArrays);
doSomethings(new Array("hello", "world"));

interface Array<Type> {
  /**
   * Gets or sets the length of the array.
   */
  length: number;

  /**
   * Removes the last element from an array and returns it.
   */
  pop(): Type | undefined;

  /**
   * Appends new elements to an array, and returns the new length of the array.
   */
  push(...items: Type[]): number;

  // ...
}

// The ReadonlyArray Type
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ...but we can't mutate 'values'.
  values.push("hello!");
}

new ReadonlyArray("red", "green", "blue");

const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

function doStuffs(values: readonly string[]) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ...but we can't mutate 'values'.
  values.push("hello!");
}

let x: readonly string[] = [];
let y: string[] = [];

x = y;
y = x;

// *********************Tuple Types*******************
type StringNumberPair = [string, number];

function doSomethinges(pair: [string, number]) {
  const a = pair[0];

  const b = pair[1];
  // ...
  const c = pair[2];
}

doSomethinges(["hello", 42]);

function doSomething2(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;

  console.log(inputString);

  console.log(hash);
}

interface StringNumberPair1 {
  // specialized properties
  length: 2;
  0: string;
  1: number;

  // Other 'Array<string | number>' members...
  slice(start?: number, end?: number): Array<string | number>;
}

type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;

  console.log(`Provided coordinates had ${coord.length} dimensions`);
}

type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];

function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}

function readButtonInput(name: string, version: number, ...input: boolean[]) {
  // ...
}

function doSomething3(pair: readonly [string, number]) {
  pair[0] = "hello!";
}

let point = [3, 4] as const;

function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

distanceFromOrigin(point);
