import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";

import { submitReview } from "../redux/features/productDetailsSlice";
import { useDispatch } from "react-redux";

export default function AddReviewCard({
  open,
  setOpen,
  rating,
  setRating,
  comment,
  setComment,
  productId,
  setSubmit,
}) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(submitReview({ rating, comment, productId }));
    setOpen(false);
    setSubmit(true);
  };
  return (
    <div>
      <Dialog aria-labelledby='simple-dialog-title' open={open}>
        <DialogTitle className=' text-orange-500'>Submit Review</DialogTitle>
        <DialogContent className=' flex flex-col gap-2 items-center'>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className=' outline-1 outline-orange-500 border-orange-500 p-2'
            placeholder='your comment'
            cols='30'
            rows='5'
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={() => setOpen((prev) => !prev)}>
            Cancel
          </Button>
          <Button color='primary' onClick={handleClick}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
