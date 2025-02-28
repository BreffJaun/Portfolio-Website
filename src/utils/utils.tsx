// I M P O R T:   F I L E S

// I M P O R T:  T Y P E S
import { StackItem } from "../types/interfaces";

// I M P O R T:   P A C K A G E S
import UAParser from "ua-parser-js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";

// I M P O R T:   F U N C T I O N S
import { BE_HOST } from "../api/host";

// C O D E

export const scrollToSection = (sectionId: string) => {
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  }
};

export const isSectionInView = (sectionId: string): boolean => {
  const section = document.getElementById(sectionId);
  if (!section) return false;
  const rect = section.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
};

export const checkMobileView = () => {
  return window.innerWidth < 768;
};

// Stack.tsx
export const scaleImageToFitCircle = (
  naturalWidth: number,
  naturalHeight: number
) => {
  const circleDiameter = 150;
  const widthScale = circleDiameter / naturalWidth;
  const heightScale = circleDiameter / naturalHeight;

  const scale = Math.min(widthScale, heightScale);

  // Scale 40% smaller
  const additionalScale = 0.6;
  const finalScale = scale * additionalScale;
  const scaledWidth = naturalWidth * finalScale;
  const scaledHeight = naturalHeight * finalScale;
  return { scaledWidth, scaledHeight };
};

export const loadImageDimensions = async (
  stackArray: StackItem[]
): Promise<StackItem[]> => {
  const promises = stackArray.map((image) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const { scaledWidth, scaledHeight } = scaleImageToFitCircle(
          img.naturalWidth,
          img.naturalHeight
        );
        resolve({
          ...image,
          scaledWidth,
          scaledHeight,
        });
      };
      img.src = image.img || "";
    });
  });

  return (await Promise.all(promises)) as StackItem[];
};

export const renderStackItem = (el: StackItem) => (
  <Tilt
    key={el.name}
    className="parallax-effect-glare-scale"
    perspective={500}
    glareEnable={true}
    glarePosition="all"
    glareMaxOpacity={0.45}
    glareColor="var(--teal)"
    scale={1.02}
    gyroscope={true}
    glareBorderRadius="20px"
  >
    <div className="inner__element">
      <h2>{el.name}</h2>
      <div className="white__circle">
        <img
          src={el.img}
          alt={el.name}
          height={`${el.scaledHeight}px`}
          width={`${el.scaledWidth}px`}
          className="stack__logo"
        />
      </div>
    </div>
  </Tilt>
);

// ===========================================

export const formatCurrentDate = (): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return `${day} ${month} ${year}`;
};

export const detectDevice = (): string => {
  const parser = new UAParser();
  const result = parser.setUA(navigator.userAgent).getResult();
  const userAgent = navigator.userAgent;
  // console.log("userAgent: ", userAgent);

  const osName = result.os ? result.os.name : undefined;
  // console.log("OS Name: ", osName);
  const isDesktop = ["windows", "mac", "mac os", "macintosh", "linux"].includes(
    osName?.toLowerCase() ?? ""
  );
  // console.log("isDesktop: ", isDesktop);

  // Zusätzliche Überprüfung für Surface-Geräte unter Windows NT
  const isSurfaceOrSimilar = userAgent.includes("Windows NT") && isDesktop;

  // Wenn das Gerät als Desktop eingestuft wird und nicht ein Surface/Geräte, geben wir "desktop" zurück, sonst "mobile"
  return isDesktop && !isSurfaceOrSimilar ? "desktop" : "mobile";
};

export const checkLogin = (
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<any>>
) => {
  setIsPending(true);
  fetch(`${BE_HOST}/users/checklogin`, {
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error(
            "Not logged in => USER IS NOT LOGGED IN (TOKEN EXPIRED)!"
          );
        }
      }
      return res.json();
    })
    .then((data) => {
      setIsLoggedIn(true);
      setUser(data.user);
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsLoggedIn(false);
      setUser(undefined);
    })
    .finally(() => {
      setIsPending(false);
    });
};

export const openModal = (
  openIt: React.Dispatch<React.SetStateAction<boolean>>
) => {
  openIt(true);
};

export const closeModal = (
  closeIt: React.Dispatch<React.SetStateAction<boolean>>
) => {
  closeIt(false);
};

// modalUtils.ts
export const openSpecificModal = (
  setModal: React.Dispatch<
    React.SetStateAction<"editInfo" | "editPost" | "newPost" | null>
  >,
  modal: "editInfo" | "editPost" | "newPost"
) => {
  setModal(modal);
};

export const closeSpecificModal = (
  setModal: React.Dispatch<
    React.SetStateAction<"editInfo" | "editPost" | "newPost" | null>
  >
) => {
  setModal(null);
};

export const initialContentLoad = (
  url: string,
  contentFunc: (data: any) => void,
  navigate: Function
) => {
  fetch(`${BE_HOST}/${url}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      contentFunc(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      setTimeout(() => navigate("/*"), 100);
    });
};

export const getImageDimensions = (file: File) => {
  return new Promise<{ width: string; height: string }>((resolve, reject) => {
    const img = new Image();
    const imageUrl = URL.createObjectURL(file);
    img.onload = () => {
      const scaledDimensions = scaleImageToFitCircle(img.width, img.height);
      resolve({
        width: scaledDimensions.scaledWidth.toString(),
        height: scaledDimensions.scaledHeight.toString(),
      });
    };
    img.onerror = () => reject("Image load error");
    img.src = imageUrl;
  });
};

export const isValidLink = (value: string): boolean => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // Optional http oder https
      "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" + // Domain-Name
      "localhost|" + // Lokaler Host
      "\\d{1,3}(\\.\\d{1,3}){3})" + // IP-Adresse
      "(\\:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*" + // Port und Pfade
      "(\\?[;&a-zA-Z0-9%_.~+=-]*)?" + // Query-Parameter
      "(\\#[-a-zA-Z0-9_]*)?$", // Fragment-Identifikator
    "i"
  );
  return urlPattern.test(value);
};
