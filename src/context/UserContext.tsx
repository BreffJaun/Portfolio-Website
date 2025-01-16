import { User } from "../types/interfaces";
import { createContext } from "react";

const UserContext = createContext<
  [User | undefined, React.Dispatch<React.SetStateAction<User | undefined>>]
>([undefined, () => {}]);

export default UserContext;
