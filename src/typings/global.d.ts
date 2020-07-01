interface Element {
  computedStyleMap(): StylePropertyMapReadOnly;
}

declare const StylePropertyMapReadOnly: {
  prototype: StylePropertyMapReadOnly;
  new (): StylePropertyMapReadOnly;
};

interface StylePropertyMapReadOnly {
  get(property: keyof CSSStyleDeclaration): CSSStyleValue | undefined;
  getAll(property: keyof CSSStyleDeclaration): CSSStyleValue[];
  has(property: keyof CSSStyleDeclaration): boolean;
  readonly size: number;
}

declare const CSSStyleValue: {
  prototype: CSSStyleValue;
  new (): CSSStyleValue;
};

interface CSSStyleValue {}

declare const CSSNumericValue: {
  prototype: CSSNumericValue;
  new (): CSSNumericValue;
};

interface CSSNumericValue extends CSSStyleValue {}

declare const CSSUnitValue: {
  prototype: CSSUnitValue;
  new (): CSSUnitValue;
};

interface CSSUnitValue extends CSSNumericValue {
  value: number;
  readonly unit: string;
}

declare const CSSKeywordValue: {
  prototype: CSSKeywordValue;
  new (): CSSKeywordValue;
};

interface CSSKeywordValue extends CSSStyleValue {
  value: string;
}
