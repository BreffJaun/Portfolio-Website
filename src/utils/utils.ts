// I M P O R T:   F I L E S

// I M P O R T:   P A C K A G E S
import UAParser from "ua-parser-js";

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

// export const detectDevice = () => {
//   const userAgent = navigator.userAgent;

//   // Überprüfen auf Tablets
//   if (
//     ((/iPad/.test(userAgent) || /Surface/.test(userAgent)) &&
//       !/Mobile/.test(userAgent)) ||
//     (/Macintosh/.test(userAgent) && "ontouchend" in document) ||
//     (/Windows NT/.test(userAgent) && /Touch/.test(userAgent)) ||
//     (/Android/.test(userAgent) && !/Mobile/.test(userAgent)) ||
//     (/Linux/.test(userAgent) &&
//       !/Mobile/.test(userAgent) &&
//       /CrKey/.test(userAgent))
//   ) {
//     console.log("TABLET => userAgent: ", userAgent);
//     return "tablet";
//   }

//   // Überprüfen auf mobile Geräte
//   if (
//     /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/.test(userAgent)
//   ) {
//     console.log("MOBILE => userAgent: ", userAgent);
//     return "mobiledevice";
//   }

//   // Überprüfen auf Desktops (macOS, Windows, Linux)
//   if (
//     /Macintosh|Windows|Linux/.test(userAgent) &&
//     !/Mobi|Android/.test(userAgent)
//   ) {
//     console.log("DESKTOP => userAgent: ", userAgent);
//     return "desktop";
//   }

//   // Wenn weder Tablet noch Mobilgerät, dann Desktop
//   return "desktop";
// };

// export const detectDevice = () => {
//   // detect device type
//   const parser = new UAParser();
//   const result = parser.setUA(navigator.userAgent).getResult();
//   let detectedDeviceType = result.device.type;
//   const userAgent = navigator.userAgent;

//   // Überprüfen, ob detectedDeviceType definiert ist, sonst einen Standardwert verwenden
//   if (typeof detectedDeviceType === "undefined") {
//     detectedDeviceType = "unknown";
//   }
//   console.log("userAgent: ", userAgent);
//   return detectedDeviceType;
// };

// export const detectDevice = (): string => {
//   const parser = new UAParser();
//   const result = parser.setUA(navigator.userAgent).getResult();

//   // Überprüfe, ob result.os.name existiert, bevor du darauf zugreifst
//   const osName = result.os ? result.os.name : undefined;

//   // Prüfe, ob das Gerät als Desktop eingestuft wird
//   const isDesktop = ["windows", "mac", "linux"].includes(
//     osName?.toLowerCase() ?? ""
//   );

//   // Wenn das Gerät als Desktop eingestuft wird, geben wir "desktop" zurück, sonst "mobile"
//   return isDesktop ? "desktop" : "mobile";
// };

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
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsPending(true);
  fetch(`${BE_HOST}/users/checklogin`, {
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 401) {
        console.log("USER IS NOT LOGGED IN (TOKEN EXPIRED)!");
        setIsLoggedIn(false); // Setze isLoggedIn auf false
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsLoggedIn(false);
    })
    .finally(() => {
      setIsPending(false);
    });
};
