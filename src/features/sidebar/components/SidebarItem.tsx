import { Category } from "common/commonTypes";
import styled from "styled-components/macro";
import { AppDispatch } from "app/store";
import { useDispatch } from "react-redux";
import { updateCurrentCategory } from "features/sidebar/sidebarSlice";

type Props = {
  item: Category;
  active: boolean;
};

const SidebarItem = ({ item, active }: Props) => {
  const { id, name } = item;
  const dispatch: AppDispatch = useDispatch();

  const handleUpdateCategory = () => {
    const payload: Category = {
      id,
      name,
    };

    dispatch(updateCurrentCategory(payload));
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
  background-color: ${({ active }) => (active ? "#282c34" : "")};

  :hover {
    background-color: #282c34;
  }
`;

const NavText = styled("p")`
  display: flex;
  justify-content: start;
  align-items: center;
  list-style: none;
  font-size: 1rem;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
`;
