import { useState } from "react";
import { CustomInput, Sidebar } from "../components";
import { AiFillCaretRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addProduct } from ".././redux/features/productSlice";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const AddProductPage = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    Stock: null,
    category: "Laptop",
  });
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("name", input.name);
    formData.set("price", input.price);
    formData.set("description", input.description);
    formData.set("category", input.category);
    formData.set("Stock", input.Stock);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(addProduct(formData));
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className=' w-full'>
        <h1 className=' text-center text-2xl mt-2 uppercase'>
          Add new Product
        </h1>

        <form
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
            value={input.Stock}
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
            value={"Create"}
          />
        </form>
        <div className=' w-full flex justify-center items-center gap-5 my-3 m-auto'>
          {imagesPreview.map((image, index) => (
            <img
              className=' w-1/12 border-2 p-2'
              key={index}
              src={image}
              alt='Product Preview'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
