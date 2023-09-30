import { useDispatch, useSelector } from "react-redux";

import { getProductDetails } from "../redux/features/productDetailsSlice";

import ReactStars from "react-rating-stars-component";

import { useLayoutEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Container, ReviewCard, Loading } from "../components";

import { addItemToCart } from "../redux/features/cartSlice";

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { isLoading, isError, data } = useSelector(
    (state) => state.productDetails
  );

  let { id } = useParams();

  let info = data.singleProduct;

  info = { ...info };

  useLayoutEffect(() => {
    dispatch(getProductDetails(id.toString()));
  }, [dispatch, id]);

  const ratingsOptions = {
    size: 30,
    value: info.ratings,
    edit: false,
  };

  const incrementquantity = () => {
    if (data.singleProduct.stock > quantity) {
      setQuantity((prev) => prev + 1);
    } else {
      return;
    }
  };

  const decrementquantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      return;
    }
  };

  const updateCartVale = () => {
    dispatch(
      addItemToCart({
        id: info._id,
        name: info.name,
        price: info.price,
        quantity: quantity,
        image: info.images[0],
      })
    );
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <div className=' flex flex-col items-center lg:flex-row lg:justify-between'>
            <div className='w-[300px] lg:flex-1 p-10'>
              {/* left */}
              <Carousel className=' w-full'>
                <div>
                  <img
                    className=' object-contain'
                    src='https://rukminim2.flixcart.com/image/416/416/xif0q/book/c/7/b/it-starts-with-us-original-imagk4cycj4yv9yu.jpeg?q=70'
                  />
                  <p className='legend'>{info.name}</p>
                </div>
                <div>
                  <img src='https://rukminim2.flixcart.com/image/416/416/xif0q/book/c/7/b/it-starts-with-us-original-imagk4cycj4yv9yu.jpeg?q=70' />
                  <p className='legend'>{info.name}</p>
                </div>
                <div>
                  <img src='https://rukminim2.flixcart.com/image/416/416/xif0q/book/c/7/b/it-starts-with-us-original-imagk4cycj4yv9yu.jpeg?q=70' />
                  <p className='legend'>{info.name}</p>
                </div>
              </Carousel>
            </div>

            <div className='flex-grow p-10 flex flex-col gap-10'>
              {/* right */}
              <h1 className=' text-2xl lg:text-4xl font-semibold uppercase'>
                {info.name}
              </h1>
              <div className=' border-b-2'>
                <h1 className='text-3xl mb-2 lg:text-5xl'>Subscribe</h1>
                <p>Product # {info._id}</p>
              </div>
              <div className=' border-b-2'>
                <p className=' text-orange-500'>
                  (Reviews {info.numOfReviews})
                </p>
                <ReactStars {...ratingsOptions} />,
              </div>
              <div className=' border-b-2 '>
                <h1 className=' text-2xl lg:text-3xl text-red-500 font-semibold'>
                  ₹ {info.price}
                </h1>
                <div className=' mt-3 flex gap-3 items-center m-3'>
                  <div className=' flex items-center  space-x-4 w-fit bg-gray-500 '>
                    <button
                      onClick={decrementquantity}
                      className=' p-2 text-white text-xl bg-black'
                    >
                      -
                    </button>
                    <span className=' p-1 text-white text-xl'>{quantity}</span>
                    <button
                      onClick={incrementquantity}
                      className=' p-2 text-white text-xl bg-black'
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={updateCartVale}
                      className=' text-sm lg:px-6 lg:py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-400 w-full'
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className=' border-b-2'>
                <h1 className=' flex text-2xl font-semibold'>
                  Status:
                  {info.stock > 0 ? (
                    <p className=' text-green-500 font-mono font-normal'>
                      In Stock
                    </p>
                  ) : (
                    <p className=' text-red-600 font-mono font-normal'>
                      Out of Stock
                    </p>
                  )}
                </h1>
              </div>
              <div className=' border-b-2'>
                <h1 className='text-3xl mb-2 lg:text-5xl'>Description</h1>
                <p className=' text-xl'>{info.description}</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className=' text-center text-4xl underline'>Reviews</h1>

            <div className='w-full flex  gap-2 justify-center mt-5 overflow-x-auto '>
              {info.reviews && info.reviews ? (
                info.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))
              ) : (
                <p className=' text-xl text-gray-600'>No Reviews Yet</p>
              )}
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default ProductDetailsPage;
