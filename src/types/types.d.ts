export type ThemeClickCountContextType = [
  number,
  React.Dispatch<React.SetStateAction<number>>
];

export type MobileViewContextType = [
  boolean,
  Dispatch<SetStateAction<boolean>>
];

export type DeviceContextType = [string, Dispatch<SetStateAction<string>>];

export type StackCategory =
  | "web"
  | "mobile-ios"
  | "mobile-android"
  | "tools"
  | "ux";

export type StackItemDraft = Partial<StackItem>;
