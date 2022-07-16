export type ClassNames = {
  [key: string]: unknown
}

export function classNames(classNames: ClassNames, rules: {}) {
    return Object.entries(rules)
      .filter(([_, value]) => value)
      .map(([key, _]) => classNames[key])
      .join(' ');
  }