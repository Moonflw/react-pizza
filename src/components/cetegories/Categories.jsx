import { useState } from "react";
const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handeClick = (index, i) => {
    setActiveIndex(index);
  }
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  return (
    <div className="categories">
      <ul>
       {categories.map((index)=> (
        <li className={activeIndex === index ? "active" : ""} onClick={() => handeClick(index)}>{index}</li>
       ))
      }
      </ul>
    </div>
  );
};

export default Categories;
