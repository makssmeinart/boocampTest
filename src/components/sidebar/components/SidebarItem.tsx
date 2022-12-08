import { Category, QueryParams } from "common/commonTypes";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { useTypedSearchParams } from "hooks/useTypedSearchParams";

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
  const [params] = useTypedSearchParams<QueryParams>();

  const isActive = Number(params.category_ids) === id;

  return (
    <CustomLink
      to={`/cats?limit=10&page=1&category_ids=${id}`}
      showSidebar={showSidebar}
      itemIndex={itemIndex}
      onClick={toggleSidebar}
      className={isActive ? "active" : ""}
    >
      {name}
    </CustomLink>
  );
};

export default SidebarItem;

const CustomLink = styled(
  ({ showSidebar: boolean, itemIndex: number, ...props }) => <Link {...props} />
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
