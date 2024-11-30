// import { useState } from "react";
const Categories = ({ value, onClickCategory }) => {
  // const [activeIndex, setActiveIndex] = useState(0);
  // const handeClick = (index, i) => {
  //   setActiveIndex(index);
  // };
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            className={value === i ? "active" : ""}
            onClick={() => onClickCategory(i)}
            key={i}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
