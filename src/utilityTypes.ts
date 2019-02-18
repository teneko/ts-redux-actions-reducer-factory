import { AnyKeys, ExcludeObject, ExcludeObjectExceptArray, Extends, ExtractObject, ExtractObjectExceptArray } from "@teronis/ts-definitions";
import { ActionFunctions } from "redux-actions";
import { And, If, Not, Or } from "typescript-logic";

export type ActionTypeOrActionCreator<Payload> = ActionFunctions<Payload> | string;

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
    __MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
    __LeftKeys extends IfNot3<__MutualKeys, Exclude<AnyKeys<A>, __MutualKeys>, AnyKeys<A>> = IfNot3<__MutualKeys, Exclude<AnyKeys<A>, __MutualKeys>, AnyKeys<A>>,
    > = IntersectProps<A, B, __MutualKeys> & Pick<A, __LeftKeys>;

/** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A and B. */
export type UnionProps<
    A,
    B,
    __MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
    __LeftKeys extends IfNot3<__MutualKeys, Exclude<AnyKeys<A>, __MutualKeys>, AnyKeys<A>> = IfNot3<__MutualKeys, Exclude<AnyKeys<A>, __MutualKeys>, AnyKeys<A>>,
    __RightKeys extends IfNot3<__MutualKeys, Exclude<AnyKeys<B>, __MutualKeys>, AnyKeys<B>> = IfNot3<__MutualKeys, Exclude<AnyKeys<B>, __MutualKeys>, AnyKeys<B>>
    > = UnionPropsExcept<A, B, __MutualKeys, __LeftKeys> & Pick<B, __RightKeys>;

/** Intersect only the primitive types of Object A and Object B. */
export type IntersectPrimitiveTypes<A, B> = Exclude<A | B, Exclude<A, B> | Exclude<B, A> | object>;

export type IntersectPrimitiveTypesAndArrays<
    A, B,
    __A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
    __B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>,
    > = ExcludeObjectExceptArray<Exclude<__A2 | __B2, Exclude<__A2, __B2> | Exclude<__B2, __A2>>>;

export type UnionPrimitiveTypesExcept<A, B> = Exclude<A | B, Exclude<B, A> | object>;

export type UnionPrimitiveTypesAndArraysExcept<
    A, B,
    __A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
    __B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>
    > = Exclude<__A2 | __B2, Exclude<__B2, __A2>>;

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
