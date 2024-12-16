import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";

const TakePic = ({ targetClass, fileName = "merrychristmas.png" }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const navOpenChecker = () => {
      const navBarCollapse = document.getElementById("navbarNav");
      const isMobile = window.innerWidth < 992;
      const isMenuOpen = navBarCollapse?.classList.contains("show");
      setIsHidden(isMobile && isMenuOpen);
    };

    // render
    navOpenChecker();

    // monitor
    const navBarCollapse = document.getElementById("navbarNav");
    const observer = new MutationObserver(() => {
        navOpenChecker();
    });

    if (navBarCollapse) {
      observer.observe(navBarCollapse, { attributes: true, attributeFilter: ["class"] });
    }

    // check window size
    window.addEventListener("resize", navOpenChecker);

    return () => {
      // cleanup
      observer.disconnect();
      window.removeEventListener("resize", navOpenChecker);
    };
  }, []);

  const handleScreenshot = () => {
    const targetElement = document.querySelector(targetClass);
    if (!targetElement) {
      console.error(`Element with class '${targetClass}' not found.`);
      return;
    }

    html2canvas(targetElement, {
        backgroundColor: "#ffe4e4" // set background color of image
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = fileName;
        link.href = canvas.toDataURL();
        link.click();
      });
    };

  if (isHidden) return null;

  return (
    <button className="camera" onClick={handleScreenshot} style={{ zIndex: 1000 }}>
      <i className="fa-solid fa-camera fa-xl" style={{ color: "#d83f3f" }}></i>
    </button>
  );
};

export default TakePic;
