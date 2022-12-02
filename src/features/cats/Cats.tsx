import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import {
  fetchCatsData,
  selectCatsData,
  updateQueryParams,
} from "features/cats/catsSlice";
import Cat from "features/cats/components/Cat";
import { useEffect, useState } from "react";
import {
  selectSidebarData,
  updateCurrentCategory,
} from "features/sidebar/sidebarSlice";
import { selectAppData } from "features/app/appSlice";
import { ErrorSnackbar } from "common/components/errorSnackbar/ErrorSnackbar";
import { Category, QueryParams } from "common/commonTypes";
import Loading from "common/components/loading/Loading";
import { useCustomDispatch } from "app/store";

const Cats = () => {
  const { cats, queryParams, loading } = useSelector(selectCatsData);
  const { currentCategory } = useSelector(selectSidebarData);
  const { error } = useSelector(selectAppData);
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useCustomDispatch();

  useEffect(() => {
    if (isInitialized) {
      dispatch(fetchCatsData());
    }
    setIsInitialized(true);
  }, [queryParams, isInitialized]);

  const handleLoadImages = () => {
    const newPage = queryParams.page && queryParams.page + 1;

    const payload: QueryParams = {
      ...queryParams,
      page: newPage,
    };
    dispatch(updateQueryParams(payload));
  };

  const handleResetFilter = () => {
    const payload: Category = {
      id: 0,
      name: "all",
    };
    dispatch(updateCurrentCategory(payload));
  };

  const handleUpdateLimit = (increaseLimit: boolean) => {
    const newLimit = increaseLimit
      ? queryParams.limit + 10
      : queryParams.limit - 10;

    const payload: QueryParams = {
      ...queryParams,
      limit: newLimit,
    };

    dispatch(updateQueryParams(payload));
  };

  const category =
    currentCategory.name.length > 1 ? currentCategory.name : "all";

  const isButtonDisabled = loading === "loading";

  const loadButton = isButtonDisabled ? (
    <LoadButton disabled onClick={handleLoadImages}>
      Loading...
    </LoadButton>
  ) : (
    <LoadButton onClick={handleLoadImages}>Load More...</LoadButton>
  );

  if (cats.length < 1) {
    return <Loading />;
  }

  return (
    <Wrapper>
      {cats.length === 0 ? (
        <Title>No cat images were found...</Title>
      ) : (
        <>
          <Title>
            Category: <span>{category}</span>
          </Title>
          <ButtonOptions>
            <ButtonOption
              disabled={isButtonDisabled}
              onClick={handleResetFilter}
            >
              Reset filters
            </ButtonOption>
            <ButtonOption
              disabled={isButtonDisabled}
              onClick={() => handleUpdateLimit(true)}
            >
              Max-Images: +10
            </ButtonOption>
            <ButtonOption
              disabled={isButtonDisabled}
              onClick={() => handleUpdateLimit(false)}
            >
              Max-Images: -10
            </ButtonOption>
          </ButtonOptions>
          <ContentWrapper>
            {cats.map((cat, index) => {
              return <Cat key={`${cat}:${index}`} cat={cat} />;
            })}
          </ContentWrapper>
          {loadButton}
          {error && <ErrorSnackbar />}
        </>
      )}
    </Wrapper>
  );
};

export default Cats;

const Wrapper = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 2rem;
`;

const ContentWrapper = styled("ul")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1rem;
  grid-auto-rows: 200px;
  height: 100%;
  width: 100%;
  padding: 0;
  list-style: none;
  overflow: hidden;
`;

const ButtonOptions = styled("div")`
  display: flex;
  gap: 1rem;
`;

const ButtonOption = styled("button")`
  padding: 0.5em 0.9em;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.header};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  cursor: pointer;
  transition: 0.2s ease background-color;

  :hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }

  :disabled {
    opacity: 0.8;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
  }
`;

const LoadButton = styled("button")`
  background-color: transparent;
  padding: 0.6em 1.4em;
  cursor: pointer;
  transition: 0.2s ease all;
  border: 3px solid ${({ theme }) => theme.colors.header};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.header};

  :hover {
    scale: 1.04;
    color: ${({ theme }) => theme.colors.background};
    background-color: ${({ theme }) => theme.colors.header};
  }
`;

const Title = styled("h1")`
  color: ${({ theme }) => theme.colors.header};
  transition: 0.7s linear color;

  span {
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.accent};
  }
`;
