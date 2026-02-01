import { useCartTotalQuantity } from "../util/totalQuantity";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { modalActions } from "../store/modal-slice";
const Header = () => {
  const dispatch = useDispatch();
  const totalCartItems = useCartTotalQuantity();
  return (
    <header className="flex justify-between items-center py-12 px-[10%]">
      <div className="flex gap-1 items-center">
        <img
          src="logo.jpg"
          alt="A restaurant"
          className="w-12 h-12 object-contain rounded-full border-2 border-[#ffc404]"
        />
        <h1 className="font-sans font-semibold text-2xl m-0 text-[#ffc404] tracking-widest uppercase">
          ReactFood
        </h1>
      </div>
      <nav>
        <Button onClick={() => dispatch(modalActions.openModal('cart'))}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
