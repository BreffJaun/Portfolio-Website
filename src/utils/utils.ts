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

export const detectDevice = () => {
  const userAgent = navigator.userAgent;

  // Überprüfen auf Tablets
  if (
    /iPad|Tablet|PlayBook|Silk/.test(userAgent) &&
    !/Mobile/.test(userAgent)
  ) {
    console.log("userAgent: ", userAgent);
    return "tablet";
  }

  // Überprüfen auf mobile Geräte
  if (
    /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/.test(userAgent)
  ) {
    return "mobiledevice";
  }

  // Überprüfen auf Desktops (macOS, Windows, Linux)
  if (
    /Macintosh|Windows|Linux/.test(userAgent) &&
    !/Mobi|Android/.test(userAgent)
  ) {
    console.log("userAgent: ", userAgent);
    return "desktop";
  }

  // Wenn weder Tablet noch Mobilgerät, dann Desktop
  return "desktop";
};
