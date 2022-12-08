import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { fetchCatsData, resetCatsData } from "store/slices/catsSlice";
import { useEffect, useState } from "react";
import { useCustomDispatch } from "store/store";
import { selectCatsData, selectSidebarData } from "store/selectors";
import { Cat, Layout, Loading } from "components";
import { getCategoryName, getUpdatedLimit } from "utils";
import { useTypedSearchParams } from "hooks/useTypedSearchParams";
import { QueryParams } from "common/commonTypes";

const Cats = () => {
  const { cats, loading } = useSelector(selectCatsData);
  const [params, setSearchParams] = useTypedSearchParams<QueryParams>();
  const { categories } = useSelector(selectSidebarData);
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useCustomDispatch();

  useEffect(() => {
    if (isInitialized) {
      dispatch(fetchCatsData(params));
    }
    setIsInitialized(true);
  }, [isInitialized, params.page, params.limit, params.category_ids]);

  // Reset the state if we change the category or limit
  useEffect(() => {
    if (isInitialized) {
      dispatch(resetCatsData());
    }
  }, [params.category_ids, params.limit]);

  const handleLoadImages = () => {
    const payload: QueryParams = {
      ...params,
      page: params.page && String(Number(params.page) + 1),
    };

    setSearchParams(payload);
  };

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
    return () => {
      const payload = getUpdatedLimit({ increaseLimit, params });

      setSearchParams(payload);
    };
  };

  const handleResetFilter = () => {
    const payload: QueryParams = {
      limit: "10",
      page: "1",
    };

    setSearchParams(payload);
  };

  const category = getCategoryName({
    currentCategoryId: Number(params.category_ids),
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
          <Layout>
            <Title>
              Category: <span>{category}</span>
            </Title>
            <ButtonOptions>
              <ButtonOption
                onClick={handleResetFilter}
                disabled={isButtonDisabled}
              >
                Reset Filters
              </ButtonOption>
              <ButtonOption
                disabled={isButtonDisabled}
                onClick={handleUpdateLimit(true)}
              >
                Max-Images: +10
              </ButtonOption>
              <ButtonOption
                disabled={isButtonDisabled}
                onClick={handleUpdateLimit(false)}
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
