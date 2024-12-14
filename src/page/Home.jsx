import { SearchContext } from "../App";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/cetegories/Categories";
import Pagination from "../components/Pagination";
import Pizza from "../components/pizza/Pizza";
import Skeleton from "../components/pizza/skeleton";
import Sort, { sortlist } from "../components/sort/Sort";
// import  {list} from "../components/sort/list";
import {
  setCategoryId,
  setCurrentPageCount,
  setFilters,
} from "../redux/slices/filterSlice";
import { useEffect, useState, useContext, useRef } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searctValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPageCount(page));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searctValue ? `search=${searctValue}` : "";

    axios
      .get(
        `https://673f48dba9bc276ec4b7fa6a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

/// если бы первый рендер, и изменили пареметры то сохраняем параметры в URL

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searctValue, currentPage]);

/// Если был первый рендер, то проверяем URL-параметры и сохраняем в redux

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortlist.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

/// Если был первый рендер, то получаем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;

  }, [categoryId, sort, searctValue, currentPage]);

  const pizzas = items.map((item) => <Pizza key={item.id} {...item} />);
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
        <Sort />        
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
