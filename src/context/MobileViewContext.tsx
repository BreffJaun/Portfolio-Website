import { createContext, Dispatch, SetStateAction } from "react";
import { MobileViewContextType } from "../types/types";

const MobileViewContext = createContext<MobileViewContextType>([
  false,
  () => {},
]);

export default MobileViewContext;
