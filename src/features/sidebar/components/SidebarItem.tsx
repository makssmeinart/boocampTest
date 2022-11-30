import { Category } from "common/commonTypes";
import styled from "styled-components/macro";

type Props = {
  item: Category;
  active: boolean;
};

const SidebarItem = ({ item, active }: Props) => {
  const { id, name } = item;

  // TODO - hook this up when you will create cats slice.
  const updateCategory = () => {
    console.log(`Current categoryId: ${id}`);
  };

  return (
    <NavItem active={active} onClick={updateCategory}>
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
