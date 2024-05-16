import { Dispatch, SetStateAction } from "react";

export interface MainNavProps {
  onAboutClick: () => void;
  hideSubNavigation: () => void;
  hideMobileNav: () => void;
  showMobileNavigation: boolean;
  handleAboutLinkClick: () => void;
  aboutLinkClicked?: boolean;
  mobileView?: boolean;
  setMobileView?: useState<boolean>;
}

export interface SubNavProps {
  hideMobileNav?: () => void;
}

export interface ThemeButtonProps {
  mobileView?: boolean;
}

export interface ThemeClickCountContextType {
  clickCount: number;
  setClickCount: (count: number) => void;
}

export interface StackItem {
  name: string;
  logo: string;
  style: string;
  dimensions?: { width: number; height: number };
  naturalWidth?: number;
  naturalHeight?: number;
  scaledWidth?: number;
  scaledHeight?: number;
}
