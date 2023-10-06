import { Link } from "react-router-dom";

const ProductCard = ({ item, href }) => {
  const {
    name,
    description,
    price,
    ratings,
    category,
    reviews,
    images,
    numOfReviews,
    _id,
  } = item;

  return (
    <Link to={href} className=' hover:-translate-y-3 transition-all'>
      <div className=' w-fit border border-black/50 p-2 shadow-lg rounded-sm'>
        <div>
          <img src={images[0].url} alt={name} />
        </div>
        <div>
          <h1 className=' font-bold'>{name}</h1>
          <p className=' text-gray-700'>{description}</p>
        </div>
        <div className=' flex justify-between items-center'>
          <span className=' text-orange-600 font-bold'>₹{price}</span>
          <span className=' text-red-500'>Ratings {Math.round(ratings)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
