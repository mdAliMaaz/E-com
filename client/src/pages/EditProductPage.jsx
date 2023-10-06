import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar, CustomInput, Loading } from "../components";
import { AiFillCaretRight } from "react-icons/ai";
import { updateProduct } from "../redux/features/productDetailsSlice";
import { useParams } from "react-router-dom";
import axios from "axios";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const EditProductPage = () => {
  const [images, setImages] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    stock: 1,
    category: "Laptop",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", input.name);
    formData.set("description", input.description);
    formData.set("price", input.price);
    formData.set("stock", input.stock);
    formData.set("category", input.category);
    newImages.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(updateProduct({ formData, id }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setNewImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const { id } = useParams();

  const deleteFields = [
    "ratings",
    "numOfReviews",
    "user",
    "reviews",
    "createdAt",
    "updatedAt",
    "_id",
    "images",
    "__v",
  ];

  useEffect(() => {
    const getDetais = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`,
        { withCredentials: true }
      );
      setImages(data.singleProduct.images);
      let product = { ...data.singleProduct };

      deleteFields.forEach((item) => {
        delete product[item];
      });

      setInput(product);
    };

    getDetais();
  }, []);

  return (
    <div className='flex'>
      <Sidebar />
      <div className=' w-full'>
        <h1 className=' text-center text-2xl mt-2 uppercase'>Update Product</h1>

        <form
          encType='multipart/form-data'
          autoComplete='off'
          onSubmit={handleSubmit}
          className=' flex items-center flex-col justify-between mt-5 '
        >
          <CustomInput
            value={input.name}
            type={"text"}
            name={"name"}
            onChange={handleChange}
          />
          <CustomInput
            value={input.price}
            type={"number"}
            name={"price"}
            onChange={handleChange}
          />
          <CustomInput
            value={input.description}
            type={"text"}
            name={"description"}
            onChange={handleChange}
          />

          <div className=' flex items-center justify-between gap-5  lg:w-1/3 p-1 border-b-2'>
            <label className=' text-lg font-semibold text-orange-500 w-fit'>
              <AiFillCaretRight className=' text-2xl' />
            </label>
            <select
              name='category'
              className='  outline-orange-500 p-2 w-full'
              onChange={handleChange}
              value={input.category}
            >
              {categories.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <CustomInput
            value={input.stock}
            name={"stock"}
            type={"number"}
            onChange={handleChange}
          />
          <div className=' flex items-center justify-center gap-5  lg:w-1/3 p-1 mt-4'>
            <label
              htmlFor='images'
              className=' text-lg font-semibold text-orange-500 w-fit'
            >
              <span className=' px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-emerald-500 transition-colors'>
                Choose Files
              </span>
            </label>
            <input
              type='file'
              name='images'
              multiple
              accept='image/*'
              className='hidden'
              id='images'
              onChange={handleImages}
            />
          </div>

          <input
            type='submit'
            className=' my-3 bg-yellow-500 text-xl uppercase px-4 py-1 text-white hover:bg-blue-500 transition-colors shadow-md'
            value={"Update"}
          />
        </form>
        <div className=' w-full flex justify-center items-center gap-5 my-3 m-auto'>
          {!imagesPreview.length
            ? images.map((image) => (
                <img
                  className=' w-1/12 border-2 p-2'
                  key={image.public_id}
                  src={image.url}
                  alt='Product Preview'
                />
              ))
            : imagesPreview.map((image) => (
                <img
                  className=' w-1/12 border-2 p-2'
                  key={image}
                  src={image}
                  alt='Product Preview'
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
