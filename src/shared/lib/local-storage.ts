export const setItemSafely = (key: string, payload: unknown): void => {
  localStorage.setItem(key, JSON.stringify(payload));
};

export const getParsedItem = (key: string): string | null | unknown => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '');
  } catch {
    return localStorage.getItem(key);
  }
};
