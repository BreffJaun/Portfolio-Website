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
