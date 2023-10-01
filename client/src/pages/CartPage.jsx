import { useSelector } from "react-redux";

import { CartCard, Container, GrandTotal, EmptyCart } from "../components";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const products = Object.values(cartItems);

  return (
    <Container>
      <>
        <div className=' w-full bg-orange-500 text-white flex items-center justify-between p-1 lg:px-4 lg:py-2'>
          <div>Product</div>
          <div>Quantity</div>
          <div>Subtital</div>
        </div>

        <>
          {products.length > 0 ? (
            products.map((item, i) => (
              <CartCard item={item} i={i} key={item.id} />
            ))
          ) : (
            <EmptyCart />
          )}
        </>
        {products.length > 0 && <GrandTotal />}
      </>
    </Container>
  );
};

export default CartPage;
