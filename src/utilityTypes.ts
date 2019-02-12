import { AnyKeys, ExtractObject, Extends, ExtractObjectExceptArray, ExcludeObjectExceptArray, ExcludeObject } from "@teronis/ts-definitions";
import { Not, If, And, Or } from "typescript-logic";

export type IfNotNever2<A, B> = If<
    Not<Extends<A, never>>,
    A,
    B
>;

export type IfNotNever3<N, A, B> = If<
    Not<Extends<N, never>>,
    A,
    B
>;

/** Intersect only those types that are related to the same property key of object A and B. This function is only applicable on object types. */
export type IntersectProps<
    A,
    B,
    MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>
    > = { [K in MutualKeys extends AnyKeys<A> & AnyKeys<B> ? MutualKeys : never]: A[K] | B[K] };

/** Does A have any object in his union? Returns export type of true or false. */
export type HasExtractableObject<A> = Not<Extends<ExtractObject<A>, never>>;

export type HasExtractableObjectWithoutArray<A> = Not<Extends<ExtractObjectExceptArray<A>, never>>;

/** Creates an union of any extractable objects. */
export type UnionExtractableObjects<A, B> = If<
    // If A or B has object ..
    Or<HasExtractableObject<A>, HasExtractableObject<B>>,
    // .. then return the one or the other object
    ExtractObject<A> | ExtractObject<B>,
    // .. else
    {}
>;

/** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A. */
export type UnionPropsExcept<
    A,
    B,
    MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
    LeftKeys extends IfNotNever3<MutualKeys, Exclude<AnyKeys<A>, MutualKeys>, AnyKeys<A>> = IfNotNever3<MutualKeys, Exclude<AnyKeys<A>, MutualKeys>, AnyKeys<A>>,
    // > = TakeoverProps<IntersectProps<A, B, MutualKeys>, A, LeftKeys>
    > = IntersectProps<A, B, MutualKeys> & Pick<A, LeftKeys>;

/** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A and B. */
export type UnionProps<
    A,
    B,
    MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
    LeftKeys extends IfNotNever3<MutualKeys, Exclude<AnyKeys<A>, MutualKeys>, AnyKeys<A>> = IfNotNever3<MutualKeys, Exclude<AnyKeys<A>, MutualKeys>, AnyKeys<A>>,
    RightKeys extends IfNotNever3<MutualKeys, Exclude<AnyKeys<B>, MutualKeys>, AnyKeys<B>> = IfNotNever3<MutualKeys, Exclude<AnyKeys<B>, MutualKeys>, AnyKeys<B>>
    // > = TakeoverProps<UnionPropsExcept<A, B, MutualKeys, LeftKeys>, B, RightKeys>;
    > = UnionPropsExcept<A, B, MutualKeys, LeftKeys> & Pick<B, RightKeys>;

/** Intersect only the primitive types of Object A and Object B. */
export type IntersectPrimitiveTypes<A, B> = Exclude<A | B, Exclude<A, B> | Exclude<B, A> | object>;

export type IntersectPrimitiveTypesAndArrays<
    A, B,
    A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
    B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>,
    > = ExcludeObjectExceptArray<Exclude<A2 | B2, Exclude<A2, B2> | Exclude<B2, A2>>>;

export type UnionPrimitiveTypesExcept<A, B> = Exclude<A | B, Exclude<B, A> | object>;

export type UnionPrimitiveTypesAndArraysExcept<
    A, B,
    A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
    B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>
    > = Exclude<A2 | B2, Exclude<B2, A2>>;

/** Create an union of the primitive types of Object A and Object B. */
export type UnionPrimitiveTypes<A, B> = ExcludeObject<A | B>;

export type UnionPrimitiveTypesAndArrays<A, B> = ExcludeObjectExceptArray<A | B>;

export type PreferPrimitivesOverProps<Props, Primitives> = If<
    And<Not<Extends<Primitives, never>>, And<Extends<Props, {}>, Extends<{}, Props>>>,
    Primitives,
    Props | Primitives
>;

export type IntersectPropsAndTypes<
    A, B,
    > = PreferPrimitivesOverProps<IntersectProps<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, IntersectPrimitiveTypesAndArrays<A, B>>;

export type UnionPropsAndTypesExcept<
    A, B,
    > = PreferPrimitivesOverProps<UnionPropsExcept<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, UnionPrimitiveTypesAndArraysExcept<A, B>>;

export type UnionPropsAndTypes<
    A, B,
    > = PreferPrimitivesOverProps<UnionProps<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, UnionPrimitiveTypesAndArrays<A, B>>;

export type PropsAndTypesExcept<A, B> = PreferPrimitivesOverProps<If<
    And<HasExtractableObjectWithoutArray<A>, HasExtractableObjectWithoutArray<B>>,
    Pick<ExtractObjectExceptArray<A>, Exclude<AnyKeys<ExtractObjectExceptArray<A>>, AnyKeys<ExtractObjectExceptArray<B>>>>,
    ExtractObjectExceptArray<A>
>, Exclude<ExcludeObjectExceptArray<A>, ExcludeObjectExceptArray<B>>>;