import { currentTheme, toggleTheme } from "./theme";

console.log("Current Theme:", currentTheme);
toggleTheme();
console.log("New Theme:", currentTheme); // Doesn't actually reflect change unless re-evaluated
