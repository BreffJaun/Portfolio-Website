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

export interface ProjectCardProps {
  image: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export interface PostCardProps {
  avatar?: string;
  authorAction?: string;
  date?: string;
  mood?: string;
  articleTitle?: string;
  articleContent?: string;
  articleImageSrc?: string;
  articleLink?: string;
}

export interface BackToTopBtnProps {
  watchElementSelector: string;
}

export interface Profile {
  username: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  userName: string;
}

export interface Content {
  introduction: string;
  name: string;
  connectingWords: string;
  jobTitle: string;
  description: string;
}

export interface EditBtnProps {
  onClick: () => void;
}

export interface EditLPModalProps {
  content: {
    introduction: string;
    name: string;
    connectingWords: string;
    jobTitle: string;
    description: string;
  };
  onClose: () => void;
  onSubmit: (updatedContent: {
    introduction: string;
    name: string;
    connectingWords: string;
    jobTitle: string;
    description: string;
  }) => void;
  isModalOpen: boolean;
}

export interface CloseBtnProps {
  onClick: () => void;
}
