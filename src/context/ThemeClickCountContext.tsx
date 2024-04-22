import { createContext } from "react";
import { ThemeClickCountContextType } from "../types/types";

const ThemeClickCountContext = createContext<ThemeClickCountContextType>([
  0,
  () => {},
]);

export default ThemeClickCountContext;
