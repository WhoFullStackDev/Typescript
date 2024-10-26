interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;

type Example2 = RegExp extends Animal ? number : string;

// SomeType extends OtherType ? TrueType : FalseType;

interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

// function createLabel(id: number): IdLabel;
// function createLabel(name: string): NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel {
//   throw "unimplemented";
// }

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

let a = createLabel("typescript");

let b = createLabel(2.8);

let c = createLabel(Math.random() ? "hello" : 42);

// type MessageOf<T> = T["message"];

// type MessageOf<T extends { message: unknown }> = T["message"];

// interface Email {
//   message: string;
// }

// type EmailMessageContents = MessageOf<Email>;

type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>;

type DogMessageContents = MessageOf<Dog>;

type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type.
// type Str = Flatten<string[]>;

// Leaves the type alone.
// type Num = Flatten<number>;

declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type Num = GetReturnType<() => number>;

type Str = GetReturnType<(x: string) => string>;

type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;

type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>;

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// 'ArrOfStrOrNum' is no longer a union.
type ArrOfStrOrNum = ToArrayNonDist<string | number>;
