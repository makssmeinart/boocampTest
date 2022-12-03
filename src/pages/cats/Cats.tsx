import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { fetchCatsData, updateQueryParams } from "store/slices/catsSlice";
import { useEffect, useState } from "react";
import { CatsParams, QueryParams } from "common/commonTypes";
import { useCustomDispatch } from "store/store";
import { selectCatsData } from "store/selectors";
import Loading from "components/loading/Loading";
import Cat from "components/cat/Cat";
import Layout from "components/layout/Layout";
import Sidebar from "components/sidebar/Sidebar";
import { useParams } from "react-router-dom";

const Cats = () => {
  const { cats, queryParams, loading } = useSelector(selectCatsData);
  const { id } = useParams<CatsParams>();
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useCustomDispatch();

  const loadImagesPayload = {
    ...queryParams,
    categoryId: Number(id),
    page: queryParams.page && queryParams.page + 1,
  };

  useEffect(() => {
    if (isInitialized) {
      dispatch(fetchCatsData());
    }
    setIsInitialized(true);
  }, [queryParams, isInitialized]);

  const handleLoadImages = (payload: QueryParams) => {
    dispatch(updateQueryParams(payload));
  };

  useEffect(() => {
    const payload: QueryParams = {
      categoryId: Number(id),
      limit: 10,
      page: 1,
    };

    handleLoadImages(payload);
  }, [id]);

  const handleScroll = () => {
    const shouldScroll =
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight;

    if (shouldScroll) {
      handleLoadImages(loadImagesPayload);
    }
  };
  // I think we don't need to removeAddListener now in React v18 since it remounts it itself.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleUpdateLimit = (increaseLimit: boolean) => {
    const newLimit = increaseLimit
      ? queryParams.limit + 10
      : queryParams.limit - 10;

    const payload: QueryParams = {
      ...queryParams,
      categoryId: Number(id),
      limit: newLimit,
    };

    dispatch(updateQueryParams(payload));
  };

  const category = "all";

  const isButtonDisabled = loading === "loading";

  const loadButton = isButtonDisabled ? (
    <LoadButton disabled>Loading...</LoadButton>
  ) : (
    <LoadButton onClick={() => handleLoadImages(loadImagesPayload)}>
      Load More...
    </LoadButton>
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
                disabled={isButtonDisabled}
                // onClick={handleResetFilter}
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
