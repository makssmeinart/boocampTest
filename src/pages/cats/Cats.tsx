import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import {
  fetchCatsData,
  updateCategory,
  updateQueryParams,
} from "store/slices/catsSlice";
import { useEffect, useState } from "react";
import { CatsParams, QueryParams } from "common/commonTypes";
import { useCustomDispatch } from "store/store";
import { selectCatsData, selectSidebarData } from "store/selectors";
import { Cat, Layout, Loading, Sidebar } from "components";
import { useParams } from "react-router-dom";
import { getCategoryName } from "utils";

const Cats = () => {
  const { cats, queryParams, loading } = useSelector(selectCatsData);
  const { categories } = useSelector(selectSidebarData);
  const { categoryId } = useParams<CatsParams>();
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useCustomDispatch();

  useEffect(() => {
    if (isInitialized) {
      dispatch(fetchCatsData());
    }
    setIsInitialized(true);
  }, [
    queryParams.page,
    queryParams.limit,
    queryParams.categoryId,
    isInitialized,
  ]);

  const handleLoadImages = () => {
    const { page } = queryParams;

    const payload: QueryParams = {
      ...queryParams,
      page: page && page + 1,
    };

    dispatch(updateQueryParams(payload));
  };

  // On URL change
  useEffect(() => {
    dispatch(updateCategory({ categoryId: categoryId }));
  }, [categoryId]);

  const handleScroll = () => {
    const shouldScroll =
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight;

    // wait until cats are loaded first time so that shouldScroll not fire off before we have data
    if (shouldScroll && cats.length > 0) {
      handleLoadImages();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [cats.length]);

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

  // Maybe I could combine this with handleUpdateLimit but this seems a little more readable I think. I'm probably wrong tho
  const handleResetFilter = () => {
    const payload: QueryParams = {
      ...queryParams,
      limit: 10,
    };

    dispatch(updateQueryParams(payload));
  };

  const category = getCategoryName({
    currentCategoryId: Number(categoryId),
    categories,
  });

  const isButtonDisabled = loading === "loading";

  const loadButton = isButtonDisabled ? (
    <LoadButton disabled>Loading...</LoadButton>
  ) : (
    <LoadButton onClick={handleLoadImages}>Load More...</LoadButton>
  );

  if (cats.length < 1) {
    return <Loading />;
  }

  return (
    <Container>
      {cats.length === 0 ? (
        <Title>No cat images were found...</Title>
      ) : (
        <>
          <Sidebar />
          <Layout>
            <Title>
              Category: <span>{category}</span>
            </Title>
            <ButtonOptions>
              <ButtonOption
                onClick={handleResetFilter}
                disabled={isButtonDisabled}
              >
                Reset Limit
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
          </Layout>
        </>
      )}
    </Container>
  );
};

export default Cats;

const Container = styled("section")`
  height: 100%;
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
