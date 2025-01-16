import { createContext } from "react";

const PendingContext = createContext([false, () => {}] as [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
]);

export default PendingContext;
