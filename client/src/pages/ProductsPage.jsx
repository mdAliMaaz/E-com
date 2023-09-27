import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Loading,
  Pagination,
  ProductCard,
  Searchbar,
} from "../components";
import { useEffect, useState } from "react";
import { getProducts } from "../redux/features/productSlice";

const ProductsPage = () => {
  const categories = [
    "Footwear",
    "Camera",
    "Laptop",
    "Bottom",
    "Tops",
    "Attire",
    "SmartPhones",
  ];

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useSelector((state) => state.products);

  const [page, setPage] = useState(1);

  const [category, setCategory] = useState("");

  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProducts({ keyword, page }));
  };

  const goNext = () => {
    setPage((prev) => (prev += 1));
  };

  const goPrev = () => {
    if (page > 1) {
      setPage((prev) => (prev -= 1));
    }
  };

  useEffect(() => {
    dispatch(getProducts({ keyword, page, category }));
  }, [dispatch, page, category]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className=' w-full flex flex-col lg:flex-row items-center justify-between lg:justify-around gap-1 mt-5'>
            <Searchbar
              keyword={keyword}
              setKeyword={setKeyword}
              handleSubmit={handleSubmit}
            />
            <div>
              <label className=' text-lg font-semibold font-mono mx-2'>
                Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {categories.map((item) => (
                  <option defaultValue={categories[0]} value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Container>
            <div className=' flex items-center justify-center w-full'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 gap-3'>
                {data.products &&
                  data.products.map((item) => (
                    <ProductCard
                      href={`${item._id}`}
                      item={item}
                      key={item._id}
                    />
                  ))}
              </div>
            </div>
            <div>
              <Pagination page={page} goPrev={goPrev} goNext={goNext} />
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
