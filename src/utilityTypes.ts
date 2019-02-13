import { AnyKeys, ExcludeObject, ExcludeObjectExceptArray, Extends, ExtractObject, ExtractObjectExceptArray } from "@teronis/ts-definitions";
import { And, If, Not, Or } from "typescript-logic";

export type IfNot2<A, B, NotWhen = never> = If<
    Not<Extends<A, NotWhen>>,
    A,
    B
>;

export type IfNot3<N, A, B, NotWhen = never> = If<
    Not<Extends<N, NotWhen>>,
    A,
    B
>;

/** Intersect only those types that are related to the same property key of object A and B. This function is only applicable on object types. */
export type IntersectProps<
    A,
    B,
    _MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>
    > = { [K in _MutualKeys extends AnyKeys<A> & AnyKeys<B> ? _MutualKeys : never]: A[K] | B[K] };

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
    _MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
    _LeftKeys extends IfNot3<_MutualKeys, Exclude<AnyKeys<A>, _MutualKeys>, AnyKeys<A>> = IfNot3<_MutualKeys, Exclude<AnyKeys<A>, _MutualKeys>, AnyKeys<A>>,
    > = IntersectProps<A, B, _MutualKeys> & Pick<A, _LeftKeys>;

/** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A and B. */
export type UnionProps<
    A,
    B,
    _MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
    _LeftKeys extends IfNot3<_MutualKeys, Exclude<AnyKeys<A>, _MutualKeys>, AnyKeys<A>> = IfNot3<_MutualKeys, Exclude<AnyKeys<A>, _MutualKeys>, AnyKeys<A>>,
    _RightKeys extends IfNot3<_MutualKeys, Exclude<AnyKeys<B>, _MutualKeys>, AnyKeys<B>> = IfNot3<_MutualKeys, Exclude<AnyKeys<B>, _MutualKeys>, AnyKeys<B>>
    > = UnionPropsExcept<A, B, _MutualKeys, _LeftKeys> & Pick<B, _RightKeys>;

/** Intersect only the primitive types of Object A and Object B. */
export type IntersectPrimitiveTypes<A, B> = Exclude<A | B, Exclude<A, B> | Exclude<B, A> | object>;

export type IntersectPrimitiveTypesAndArrays<
    A, B,
    _A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
    _B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>,
    > = ExcludeObjectExceptArray<Exclude<_A2 | _B2, Exclude<_A2, _B2> | Exclude<_B2, _A2>>>;

export type UnionPrimitiveTypesExcept<A, B> = Exclude<A | B, Exclude<B, A> | object>;

export type UnionPrimitiveTypesAndArraysExcept<
    A, B,
    _A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
    _B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>
    > = Exclude<_A2 | _B2, Exclude<_B2, _A2>>;

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
