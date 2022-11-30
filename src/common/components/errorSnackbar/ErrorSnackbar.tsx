import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "common/components/snackbar/Snackbar";
import { selectAppData, updateErrorStatus } from "features/app/appSlice";

export const ErrorSnackbar = () => {
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
