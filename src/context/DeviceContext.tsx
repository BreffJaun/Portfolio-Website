import { createContext, Dispatch, SetStateAction } from "react";
import { DeviceContextType } from "../types/types";

const DeviceContext = createContext<DeviceContextType>(["", {}]);

export default DeviceContext;
