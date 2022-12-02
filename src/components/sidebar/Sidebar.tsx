import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { fetchCategoriesData } from "store/slices/sidebarSlice";
import { useCustomDispatch } from "store/store";
import SidebarItem from "components/sidebar/components/SidebarItem";
import useLegacyUseEffect from "hooks/legacyUseEffect";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ThemeType } from "common/commonTypes";
import { selectAppData, selectSidebarData } from "store/selectors";
import { updateTheme } from "store/slices/appSlice";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { categories, currentCategory } = useSelector(selectSidebarData);
  const { theme } = useSelector(selectAppData);
  const dispatch = useCustomDispatch();

  // useEffect is being mounted twice now in React v18. I need it just once here.
  useLegacyUseEffect(() => {
    dispatch(fetchCategoriesData());
  }, []);

  const toggleTheme = () => {
    let newTheme: ThemeType = theme === "light" ? "dark" : "light";
    dispatch(updateTheme(newTheme));
  };

  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <NavbarContainer>
          <MenuBars>
            <FaIcons.FaBars onClick={toggleSidebar} />
          </MenuBars>
          <ThemeButton onClick={toggleTheme}>
            {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </ThemeButton>
        </NavbarContainer>
        <NavMenu sidebar={sidebar}>
          <NavMenuItems>
            <NavbarToggle onClick={toggleSidebar}>
              <MenuBars>
                <AiIcons.AiOutlineClose />
              </MenuBars>
            </NavbarToggle>
            {categories.map((item) => {
              return (
                <SidebarItem
                  active={item.id === currentCategory.id}
                  key={item.name}
                  item={item}
                  toggleSidebar={toggleSidebar}
                />
              );
            })}
          </NavMenuItems>
        </NavMenu>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

const NavbarContainer = styled("nav")`
  background-color: ${({ theme }) => theme.colors.header};
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  transition: 1s ease background-color;
`;

const MenuBars = styled("div")`
  display: flex;
  margin: 0 2rem;
  font-size: 2rem;
  background: none;
  cursor: pointer;
`;

const NavMenu = styled("div")<{ sidebar: boolean }>`
  background-color: ${({ theme }) => theme.colors.header};
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  transform: translateY(${({ sidebar }) => (sidebar ? 0 : -100)}%);
  transition: ${({ sidebar }) => (sidebar ? 500 : 350)}ms;
`;

const NavMenuItems = styled("ul")`
  width: 100%;
  list-style: none;
  padding: 0;
`;

const NavbarToggle = styled("li")`
  background-color: inherit;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: end;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const ThemeButton = styled("button")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  background-color: transparent;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: none;

  svg {
    width: 100%;
    height: 100%;
  }
`;
