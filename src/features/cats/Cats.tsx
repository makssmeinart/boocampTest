import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatsData, selectCatsData } from "features/cats/catsSlice";
import Cat from "features/cats/components/Cat";
import { AppDispatch } from "app/store";
import { useEffect, useState } from "react";
import { selectSidebarData } from "features/sidebar/sidebarSlice";
import { selectAppData } from "features/app/appSlice";
import Loading from "common/components/loading/Loading";
import { ErrorSnackbar } from "common/components/errorSnackbar/ErrorSnackbar";

const Cats = () => {
  const { cats, queryParams } = useSelector(selectCatsData);
  const { currentCategory } = useSelector(selectSidebarData);
  const { loading, error } = useSelector(selectAppData);
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isInitialized) {
      dispatch(fetchCatsData());
    }
    setIsInitialized(true);
  }, [queryParams, isInitialized]);

  const category =
    currentCategory.name.length > 1 ? currentCategory.name : "all";

  if (loading === "loading") {
    return <Loading />;
  }

  return (
    <Wrapper>
      {cats.length > 0 ? (
        <>
          <h1>Category: {category}</h1>
          <ContentWrapper>
            {cats.map((cat) => {
              return <Cat key={cat.id} cat={cat} />;
            })}
          </ContentWrapper>
          <LoadButton>Load More...</LoadButton>
          {error && <ErrorSnackbar />}
        </>
      ) : (
        <h1>No cat images were found...</h1>
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

const LoadButton = styled("button")``;
