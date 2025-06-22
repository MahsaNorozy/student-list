let currentTheme = "light";

export { currentTheme }; // ❌ Mutable export

export function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
}
