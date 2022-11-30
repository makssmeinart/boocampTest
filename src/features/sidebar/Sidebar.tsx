import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import { fetchSidebarData, selectSidebarData } from "./sidebarSlice";
import { AppDispatch } from "app/store";
import SidebarItem from "./components/SidebarItem";
import useLegacyUseEffect from "common/hooks/legacyUseEffect";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { categories, currentCategory } = useSelector(selectSidebarData);
  const dispatch: AppDispatch = useDispatch();

  // useEffect is being mounted twice now in React v18. I need it just once here.
  useLegacyUseEffect(() => {
    dispatch(fetchSidebarData());
  }, []);

  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <NavbarContainer>
          <MenuBars>
            <FaIcons.FaBars onClick={toggleSidebar} />
          </MenuBars>
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
  background-color: #060b26;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const MenuBars = styled("div")`
  margin: 0 2rem;
  font-size: 2rem;
  background: none;
  cursor: pointer;
`;

const NavMenu = styled("div")<{ sidebar: boolean }>`
  background-color: #060b26;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? 0 : -100)}%;
  transition: ${({ sidebar }) => (sidebar ? 350 : 850)}ms;
`;

const NavMenuItems = styled("ul")`
  width: 100%;
  list-style: none;
  padding: 0;
`;

const NavbarToggle = styled("li")`
  background-color: #060b26;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: end;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;
