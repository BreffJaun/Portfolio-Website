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
  _id?: string;
  name: string;
  img?: string;
  // style: string;
  dimensions?: { width: number; height: number };
  naturalWidth?: number;
  naturalHeight?: number;
  scaledWidth?: number;
  scaledHeight?: number;
}

export interface Project_Item {
  _id?: string;
  img?: string;
  order?: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
  scaledWidth?: number;
  scaledHeight?: number;
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

export interface LP_Content {
  introduction: string;
  name: string;
  connectingWords: string;
  jobTitle: string;
  description: string;
}

export interface MySelf_Content {
  headline: string;
  motto: string;
  connectingWords: string;
  description: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
}

export interface Stack_Content {
  headline: string;
  description: string;
  stack: StackItem[];
}

export interface Projects_Content {
  headline: string;
  description: string;
  projects: ProjectCardProps[];
}

export interface EditBtnProps {
  onClick: () => void;
}

// export interface EditImageBtnProps {
//   onClick: () => void;
// }

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

export interface EditMySelfModalProps {
  content: {
    headline: string;
    motto: string;
    connectingWords: string;
    description: {
      paragraph1: string;
      paragraph2: string;
      paragraph3: string;
    };
  };
  onClose: () => void;
  onSubmit: (updatedContent: {
    headline: string;
    motto: string;
    connectingWords: string;
    description: {
      paragraph1: string;
      paragraph2: string;
      paragraph3: string;
    };
  }) => void;
  isModalOpen: boolean;
}

export interface EditStackModalProps {
  content: Stack_Content;
  onClose: () => void;
  onSubmit: () => void;
  isModalOpen: boolean;
}

export interface EditProjectsModalProps {
  content: Projects_Content;
  onClose: () => void;
  onSubmit: () => void;
  isModalOpen: boolean;
}

export interface CloseBtnProps {
  onClick: () => void;
}
