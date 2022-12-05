import { Category } from "common/commonTypes";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

type Props = {
  item: Category;
  toggleSidebar: () => void;
  showSidebar: boolean;
  itemIndex: number;
};

const SidebarItem = ({
  item,
  toggleSidebar,
  showSidebar,
  itemIndex,
}: Props) => {
  const { id, name } = item;

  return (
    <NavItem
      to={`/category/${id}`}
      showSidebar={showSidebar}
      itemIndex={itemIndex}
      onClick={toggleSidebar}
    >
      {name}
    </NavItem>
  );
};

export default SidebarItem;

const NavItem = styled(
  ({ showSidebar: boolean, itemIndex: number, ...props }) => (
    <NavLink {...props} />
  )
)`
  width: 100%;
  padding: 16px 32px;
  cursor: pointer;
  list-style: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  text-decoration: none;
  transition: 0.2s ease background-color;
  text-transform: uppercase;
  animation: ${({ showSidebar, itemIndex }) =>
    showSidebar && `__slideInLeft ${itemIndex < 1 ? 0.2 : itemIndex / 4}`}s;

  &.active {
    background-color: ${({ theme }) => theme.colors.accent};
  }

  @keyframes __slideInLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;
