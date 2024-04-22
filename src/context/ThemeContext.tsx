import { createContext } from "react";

const ThemeContext = createContext([true, () => {}] as [
  boolean,
  (theme: boolean) => void
]);

export default ThemeContext;
