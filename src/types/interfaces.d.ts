export interface MainNavProps {
  onAboutClick: () => void;
  hideSubNavigation: () => void;
  hideMobileNav: () => void;
  showMobileNavigation: boolean;
  handleAboutLinkClick: () => void;
  aboutLinkClicked?: boolean;
}

export interface SubNavProps {
  hideMobileNav?: () => void;
}
