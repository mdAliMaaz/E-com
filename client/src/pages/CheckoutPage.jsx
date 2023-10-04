import { Container } from "../components";
import { Country, State, City } from "country-state-city";
import { AiFillHome } from "react-icons/ai";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { MdOutlineTransferWithinAStation } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkout } from "../redux/features/cartSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    address: "",
    city: "",
    pinCode: "",
    phoneNo: "",
    country: "",
    state: "",
  });
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.phoneNo.length === 10) {
      dispatch(checkout(input));
      window.location.replace("/order/conform");
    }
  };

  return (
    <Container>
      <div className=' w-full h-full'>
        <h1 className=' text-center uppercase font-semibold bg-orange-500 text-white lg:text-2xl'>
          Shipping Details
        </h1>

        <div className=' flex items-center justify-center '>
          <form
            onSubmit={handleSubmit}
            className=' flex items-center justify-center flex-col gap-3 p-2'
          >
            <div className=' flex items-center gap-3 justify-between p-2 border-2 border-gray-500'>
              <label>
                <AiFillHome className=' text-gray-500 text-xl' />
              </label>
              <input
                type='text'
                name='address'
                placeholder='Address'
                className=' outline-none text-gray-500 text-xs w-[200px]'
                onChange={handleChange}
              />
            </div>

            <div className=' flex items-center gap-3 justify-between p-2 border-2 border-gray-500'>
              <label>
                <FaLocationDot className=' text-gray-500 text-xl' />
              </label>
              <input
                type='number'
                name='pinCode'
                placeholder='Pin Code'
                className=' outline-none text-gray-500 text-xs w-[200px]'
                onChange={handleChange}
              />
            </div>

            <div className=' flex items-center gap-3 justify-between p-2 border-2 border-gray-500'>
              <label>
                <BsFillTelephoneFill className=' text-gray-500 text-xl' />
              </label>
              <input
                type='number'
                name='phoneNo'
                placeholder='Phone Number'
                className=' outline-none text-gray-500 text-xs w-[200px]'
                onChange={handleChange}
              />
            </div>

            <div className='  flex items-center gap-4   py-2 border-2 border-gray-500 w-full'>
              <label>
                <BiWorld className=' text-gray-500 text-xl' />
              </label>
              <select
                name='country'
                onChange={handleChange}
                className=' outline-none w-[200px]  text-[10px] text-gray-500'
              >
                <option value={""}>Country</option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {input.country && (
              <div className='  flex items-center gap-4  py-2 border-2 border-gray-500 w-full'>
                <label>
                  <TbBuildingSkyscraper className=' text-gray-500 text-xl' />
                </label>
                <select
                  name='state'
                  onChange={handleChange}
                  className=' outline-none w-[200px]  text-[10px] text-gray-500'
                >
                  <option value={""}>State</option>
                  {State.getStatesOfCountry(input.country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {input.state && (
              <div className='  flex items-center gap-4  py-2 border-2 border-gray-500 w-full'>
                <label>
                  <MdOutlineTransferWithinAStation className=' text-gray-500 text-xl' />
                </label>
                <select
                  name='city'
                  onChange={handleChange}
                  className=' outline-none w-[200px]  text-[10px] text-gray-500'
                >
                  <option value={""}>City</option>
                  {City.getCitiesOfState(input.country, input.state).map(
                    (item, i) => (
                      <option key={i} value={item.name}>
                        {item.name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
            <input
              type='submit'
              value={"Continue"}
              className=' bg-orange-500 text-xl uppercase px-4 py-1 text-white hover:bg-blue-500 transition-colors shadow-md'
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
