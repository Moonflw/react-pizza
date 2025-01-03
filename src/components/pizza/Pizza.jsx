import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { selectCartItemById } from "../../redux/slices/pizzaSlice";
import { Link } from "react-router-dom";
const Pizza = ({ id, title, price,  sizes, types,imageUrl }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const typeNames = ["тонкое", "традиционное"];
  const [activeState, setActiveState] = useState({ types: 0, size: 0 });

  const addedCount = cartItem ? cartItem.count : 0;
  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeState.types],
      size: sizes[activeState.size],
      count: addedCount,
    };

    dispatch(addItem(item));
  };
  const handeClick = (key, value) => {
    setActiveState((prevState) => ({
      ...activeState,
      [key]: value,
    }));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt={title}
        />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types &&
              types.map((type, i) => (
                <li
                  className={activeState.types === type ? "active" : ""}
                  onClick={() => handeClick("types", type)}
                  key={i}
                >
                  {typeNames[type]}
                </li>
              ))}
          </ul>
          <ul>
            {sizes &&
              sizes.map((size, i) => (
                <li
                  className={activeState.size === i ? "active" : ""}
                  onClick={() => handeClick("size", i)}
                  key={i}
                >
                  {size}
                </li>
              ))}
          </ul>
        </div>
              </Link>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              ></path>
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{cartItem.count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
