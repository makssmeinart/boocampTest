import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCatsData,
  selectCatsData,
  updateQueryParams,
} from "features/cats/catsSlice";
import Cat from "features/cats/components/Cat";
import { AppDispatch } from "app/store";
import { useEffect, useState } from "react";
import { selectSidebarData } from "features/sidebar/sidebarSlice";
import { selectAppData } from "features/app/appSlice";
import { ErrorSnackbar } from "common/components/errorSnackbar/ErrorSnackbar";
import { QueryParams } from "common/commonTypes";
import Loading from "common/components/loading/Loading";

const Cats = () => {
  const { cats, queryParams, loading } = useSelector(selectCatsData);
  const { currentCategory } = useSelector(selectSidebarData);
  const { error } = useSelector(selectAppData);
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isInitialized) {
      dispatch(fetchCatsData());
    }
    setIsInitialized(true);
  }, [queryParams, isInitialized]);

  const handleLoadImages = () => {
    const payload: QueryParams = {
      ...queryParams,
      page: queryParams.page && queryParams.page + 1,
    };
    dispatch(updateQueryParams(payload));
  };

  const category =
    currentCategory.name.length > 1 ? currentCategory.name : "all";

  if (cats.length < 1) {
    return <Loading />;
  }

  return (
    <Wrapper>
      {cats.length === 0 ? (
        <h1>No cat images were found...</h1>
      ) : (
        <>
          <h1>Category: {category}</h1>
          <ContentWrapper>
            {cats.map((cat, index) => {
              return <Cat key={`${cat}:${index}`} cat={cat} />;
            })}
          </ContentWrapper>
          {loading === "loading" ? (
            <LoadButton disabled onClick={handleLoadImages}>
              Loading...
            </LoadButton>
          ) : (
            <LoadButton onClick={handleLoadImages}>Load More...</LoadButton>
          )}
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

const LoadButton = styled("button")`
  background-color: transparent;
  padding: 0.6em 1.4em;
  cursor: pointer;
  transition: 0.2s ease all;
  border: 3px solid #111;
  font-weight: 600;
  color: #111;

  :hover {
    scale: 1.04;
    color: white;
    background-color: #111;
  }
`;
