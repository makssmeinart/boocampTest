import { useEffect } from "react";
import styled from "styled-components";

const Snackbar = ({
  open,
  autoHideDuration,
  onClose,
  error,
}: SnackbarPropsType) => {
  useEffect(() => {
    open &&
      setTimeout(() => {
        onCloseCallback();
      }, autoHideDuration);
  }, [open]);

  const onCloseCallback = () => {
    return onClose();
  };

  return (
    <>
      {open && (
        <SnackbarContainer opened={open}>
          <p>{error}</p>
          <CloseButton onClick={onCloseCallback}>+</CloseButton>
        </SnackbarContainer>
      )}
    </>
  );
};

export default Snackbar;

// Types

type SnackbarPropsType = {
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  error: string;
  type?: string;
};

const SnackbarContainer = styled("div")<{ opened: boolean }>`
  display: flex;
  gap: 1rem;
  overflow: ${({ opened }) => (opened ? "visible" : "none")};
  visibility: visible;
  align-items: center;
  justify-content: space-between;
  min-width: 250px;
  margin-left: -125px;
  background-color: #ce2828;
  color: #fff;
  font-weight: 500;
  text-align: center;
  border-radius: 5px;
  padding: 3px 20px;
  position: fixed;
  z-index: 1;
  left: 150px;
  bottom: 30px;
  box-shadow: rgba(0, 0, 0, 0.09) 0 2px 1px, rgba(0, 0, 0, 0.09) 0 4px 2px,
    rgba(0, 0, 0, 0.09) 0 8px 4px, rgba(0, 0, 0, 0.09) 0 16px 8px,
    rgba(0, 0, 0, 0.09) 0 32px 16px;
  -webkit-animation: fadein 1s, fadeout 1s 2s;
  animation: fadein 1s, fadeout 1s 2s;

  @-webkit-keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }

  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeout {
    from {
      bottom: 30px;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
  }

  @keyframes fadeout {
    from {
      bottom: 30px;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
  }
`;

const CloseButton = styled("button")`
  border-radius: 50%;
  border: none;
  height: 35px;
  width: 35px;
  cursor: pointer;
  background: transparent;
  color: white;
  font-weight: 400;
  font-size: 30px;
  transform: rotate(45deg);
  margin-top: 3px;

  :hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
`;
