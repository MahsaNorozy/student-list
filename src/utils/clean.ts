// alles außer __typename (und optional id) durchreichen – auch tief verschachtelt
export function stripTypenameDeep<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(stripTypenameDeep) as unknown as T;
  }
  if (value && typeof value === "object") {
    const { __typename, id, ...rest } = value as Record<string, unknown>;
    const cleaned: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(rest)) {
      cleaned[k] = stripTypenameDeep(v);
    }
    return cleaned as T;
  }
  return value;
}
