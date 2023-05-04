export type Optional<T> = T | null | undefined;
export type PromiseOptional<T> = Promise<T | null | undefined>;
export type PromiseNull<T> = Promise<T | null>;
export type Nulleble<T> = T | null;
export type BoolChanger = (value: boolean) => void;
