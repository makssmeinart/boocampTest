import { Category } from "common/commonTypes";
import styled from "styled-components/macro";
import { useCustomDispatch } from "store/store";
import { updateCurrentCategory } from "store/slices/sidebarSlice";

type Props = {
  item: Category;
  active: boolean;
  toggleSidebar: () => void;
};

const SidebarItem = ({ item, active, toggleSidebar }: Props) => {
  const { id, name } = item;
  const dispatch = useCustomDispatch();

  const handleUpdateCategory = () => {
    const payload: Category = {
      id,
      name,
    };

    dispatch(updateCurrentCategory(payload));
    toggleSidebar();
  };

  return (
    <NavItem active={active} onClick={handleUpdateCategory}>
      <NavText>{name}</NavText>
    </NavItem>
  );
};

export default SidebarItem;

const NavItem = styled("li")<{ active: boolean }>`
  padding: 8px 0 8px 16px;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? props.theme.colors.accent : ""};

  :hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const NavText = styled("p")`
  display: flex;
  justify-content: start;
  align-items: center;
  list-style: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  text-transform: uppercase;
`;
