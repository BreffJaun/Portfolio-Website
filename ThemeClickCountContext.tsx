import { createContext } from "react";
import { ThemeClickCountContextType } from "./src/types/types";

const ThemeClickCountContext = createContext<ThemeClickCountContextType>([
  0,
  () => {},
]);

export default ThemeClickCountContext;
