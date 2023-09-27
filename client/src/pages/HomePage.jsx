import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getProducts } from "../redux/features/productSlice";
import { Container, Loading, ScrollToTop } from "../components";
import { ProductCard } from "../components";

const HomePage = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ keyword: "", page: 1 }));
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Container>
            <div className='h-full' id='home'>
              <h1 className='text-center text-xl lg:text-4xl uppercase font-bold'>
                There is something here , for everyone
              </h1>
              <div className=' mt-3 w-full '>
                <img
                  src='https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/ca2843e62171405e.jpg?q=20'
                  alt='demo'
                  className='h-[22vh] lg:h-full object-cover'
                />
              </div>
              <div className=' my-5 '>
                <h1 className=' text-center uppercase text-gray-600 text-2xl border-b-2 border-slate-900 '>
                  Featured Products
                </h1>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 gap-3'>
                {isLoading && "Loading..."}
                {data.products &&
                  data.products.map((item) => (
                    <ProductCard
                      href={`/products/${item._id}`}
                      item={item}
                      key={item._id}
                    />
                  ))}
              </div>
            </div>
          </Container>
          <ScrollToTop />
        </div>
      )}
    </>
  );
};

export default HomePage;
