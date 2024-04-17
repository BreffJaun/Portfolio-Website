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
