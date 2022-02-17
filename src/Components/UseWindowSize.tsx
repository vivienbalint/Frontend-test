import { useState, useLayoutEffect } from "react";

const useWindowSize = () => {
  const [isSmall, setWidth] = useState(false);
  useLayoutEffect(() => {
    function updateSize() {
      window.innerWidth <= 1500 ? setWidth(true) : setWidth(false);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  });
  return isSmall;
};

export default useWindowSize;
