// function identity(arg: number): number {
//   return arg;
// }

// function identity(arg: any): any {
//   return arg;
// }

function identity<Type>(arg: Type): Type {
  return arg;
}

// let output = identity<string>("myString");

let output = identity("myString");

// *******************Working with Generic Type Variables*******************
// function loggingIdentity<Type>(arg: Type[]): Type[] {
//   console.log(arg.length);
//   return arg;
// }

// function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
//   console.log(arg.length); // Array has a .length, so no more error
//   return arg;
// }

// *******************Generic Types*******************
// let myIdentity: <Type>(arg: Type) => Type = identity;
// let myIdentity: <Input>(arg: Input) => Input = identity;
// let myIdentity: { <Type>(arg: Type): Type } = identity;

// interface GenericIdentityFn {
//   <Type>(arg: Type): Type;
// }

// let myIdentity: GenericIdentityFn = identity;

interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

let myIdentity: GenericIdentityFn<number> = identity;

// ************************Generic Classes*****************
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

//************************Generic Constraints************************

interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

loggingIdentity({ length: 10, value: 3 });

// ************************Using Type Parameters in Generic Constraints************************

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m");

// ************************Using Class Types in Generics************************
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  numLegs = 6;
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

// ************************Generic Parameter Defaults************************

declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(
  element: T,
  children: U[]
): Container<T, U[]>;

const div = create();

const p = create(new HTMLParagraphElement());

// ************************Variance Annotations************************

// Contravariant annotation
interface Consumer<in T> {
  consume: (arg: T) => void;
}
// Covariant annotation
interface Producer<out T> {
  make(): T;
}
// Invariant annotation
interface ProducerConsumer<in out T> {
  consume: (arg: T) => void;
  make(): T;
}
