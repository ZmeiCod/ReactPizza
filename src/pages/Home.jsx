import React from "react";
import qs from "qs";
import { Context } from "../App";
import sliders from "../assets/sliders.json";
import { list } from "../components/Sorting";
import { useNavigate } from "react-router-dom";
import Sorting from "../components/Sorting";
import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { setCategoryId, setFilters } from "../redux/filter/slice";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../redux/product/slice";

import axios from "axios";
export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sorting = useSelector((state) => state.filter.sorting.name);
  const products = useSelector((state) => state.product);
  const { searchValue } = React.useContext(Context);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getProduct = async () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    try {
      await axios
    .get(
      `https://67992179be2191d708b21876.mockapi.io/api/main/items?${category}&sortBy=${sorting}&order=desc${search}`
    )
    .then((response) => {
      const arr = response.data;
      setItems(Array.isArray(arr) ? arr : []);
    })
    .catch(() => {
      setItems([]);
    })
    } catch (error) {
      alert("Произошла ошибка при получении товаров");
      console.log(error);
    }
    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sorting,
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sorting]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.name === params.sorting);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    getProduct();
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getProduct();
    }
    isSearch.current = false;
  }, [categoryId, sorting, searchValue]);

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const product = items.length ? (
    items.map((value) => <PizzaBlock key={value.id} {...value} />)
  ) : (
    <div className="content__error-info">
      <h2>Блюда не найдены 😕</h2>
      <p>Попробуйте повторить попытку позже или сделайте корректный поиск.</p>
    </div>
  );

  return (
    <>
      <Carousel sliders={sliders} />
      <div className="wrapper">
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories
                value={categoryId}
                onClickCategory={onClickCategory}
              />
              <Sorting value={sorting} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isLoading ? skeletons : product}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
