// I M P O R T:   F I L E S
import "../styles/spotlight.scss";

// I M P O R T:   P A C K A G E S
import { useState, useEffect } from "react";

// I M P O R T:   F U N C T I O N S

// C O D E
const Spotlight: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="spotlight">
      <div
        className="spotlight__shadow"
        style={{
          top: mousePosition.y + "px",
          left: mousePosition.x + "px",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default Spotlight;
