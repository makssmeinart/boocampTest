import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowAltCircleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Don't forget to clean up
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <ScrollButton onClick={scrollToTop} visible={isVisible}>
      <FaArrowAltCircleUp />
    </ScrollButton>
  );
};

export default ScrollToTop;

const ScrollButton = styled("button")<{ visible: boolean }>`
  position: fixed;
  // you can do with visibility but in this case display is better
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  cursor: pointer;
  border: none;
  border-radius: 50%;

  svg {
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 920px) {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;
