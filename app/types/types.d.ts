declare type Nullable<T> = T | null
declare type Additional<T> = T extends infer U ? U : T
