import Categories from "../components/cetegories/Categories";
import Pizza from "../components/pizza/Pizza";
import Skeleton from "../components/pizza/skeleton";
import Sort from "../components/sort/Sort";

import { useEffect, useState } from "react";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sort: "rating",
  });
  useEffect(() => {
    setIsLoading(true);
    const category = categoryId !== 0 ? `category=${categoryId} ` : "";
    const sortBy = sortType.sort.replace("-", "");
    const order = sortType.sort.includes("-") ? "asc" : "desc";
    fetch(
      `https://673f48dba9bc276ec4b7fa6a.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        <Sort sortValue={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <Pizza key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default Home;
