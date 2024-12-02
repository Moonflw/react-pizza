import { SearchContext } from "../App";
import { useSelector, useDispatch} from "react-redux";
import Categories from "../components/cetegories/Categories";
import Pagination from "../components/Pagination";
import Pizza from "../components/pizza/Pizza";
import Skeleton from "../components/pizza/skeleton";
import Sort from "../components/sort/Sort";
import { setCategoryId } from "../redux/slices/filterSlice";

import { useEffect, useState, useContext } from "react";

const Home = () => {

  const {categoryId, sort} = useSelector(state => state.filterSlice);


  const dispatch = useDispatch();
  


  const {searctValue} =  useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));    
  }

  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId !== 0 ? `category=${categoryId}` : "";
    const search = searctValue ? `&search=${searctValue}` : '';
    fetch(
      `https://673f48dba9bc276ec4b7fa6a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, searctValue, currentPage]);

  const pizzas = Array.isArray(items) ? items.map((item) => <Pizza key={item.id} {...item} />): [] ;
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i) => onClickCategory(i)}
        />
        <Sort  />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
