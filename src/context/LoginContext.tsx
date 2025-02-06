import { createContext } from "react";

const LoggedInContext = createContext([true, () => {}] as [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
]);

// const LoggedInContext = createContext([false, () => {}] as [
//   boolean,
//   React.Dispatch<React.SetStateAction<boolean>>
// ]);

export default LoggedInContext;
