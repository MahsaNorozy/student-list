// Entfernt __typename und id aus GraphQL-Objekten (rekursiv für verschachtelte Objekte/Arrays)
// Nützlich beim Senden von Apollo-Daten ans Backend (Mutations)
export function removeTypenameDeep<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(removeTypenameDeep) as unknown as T;
  }
  if (value && typeof value === "object") {
    const { __typename, id, ...rest } = value as Record<string, unknown>;
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(rest)) {
      cleaned[key] = removeTypenameDeep(value);
    }
    return cleaned as T;
  }
  return value;
}
