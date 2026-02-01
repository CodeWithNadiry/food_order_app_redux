import { useDispatch } from "react-redux";
import Button from "./Button";
import {cartActions} from '../store/cart-slice'
const MealItem = ({ data }) => {
  const dispatch = useDispatch();
  const { id, name, price, description, image } = data;

  return (
    <li key={id} className="bg-[#1d1a16] rounded-2xl overflow-hidden text-center shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
      <article className="h-full flex flex-col justify-between">
        <img src={image} alt={name} className="w-full h-80 object-cover" />
        
        <div className="p-4">
          <h3 className="text-[1.5rem] font-bold my-3">{name}</h3>
          <p className="inline-block bg-[#312c1d] text-[#ffc404] text-[0.9rem] font-bold py-2 px-8 rounded">{price}</p>
          <p className="m-4">{description}</p>
        </div>

        <p className="mb-6">
          <Button onClick={() => dispatch(cartActions.addItem(data))}>Add To Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;