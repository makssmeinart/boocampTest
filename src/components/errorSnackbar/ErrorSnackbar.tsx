import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "components";
import { selectAppData } from "store/selectors";
import { updateErrorStatus } from "store/slices/appSlice";

const ErrorSnackbar = () => {
  const { error } = useSelector(selectAppData);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(updateErrorStatus(""));
  };

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={3000}
      onClose={handleClose}
      error={error ? error : ""}
    />
  );
};

export default ErrorSnackbar;
