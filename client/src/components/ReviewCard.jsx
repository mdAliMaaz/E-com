import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const options = {
    size: 30,
    value: review.rating,
    edit: false,
  };

  return (
    <>
      <div className='w-fll  lg:w-1/2 border-2 border-gray-400 flex flex-nowrap items-center justify-between flex-col p-3'>
        <div className=' w-16 h-[70px]'>
          <img src='/Profile.png' alt='review/profile' />
        </div>
        <span>{review.name}</span>
        <div className=' '>
          <ReactStars {...options} />
        </div>

        <p>{review.comment}</p>
      </div>
    </>
  );
};

export default ReviewCard;
