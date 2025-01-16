import { createContext } from "react";

const LoggedInContext = createContext([false, () => {}] as [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
]);

export default LoggedInContext;
