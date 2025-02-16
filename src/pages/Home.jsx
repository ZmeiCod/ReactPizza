import React from "react";
import { Context } from "../App";
import PizzaBlock from "../components/PizzaBlock";
import Sorting from "../components/Sorting";
import sliders from "../assets/sliders.json";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import Skeleton from "../components/PizzaBlock/Skeleton";

export default function Home() {
  const {searchValue} = React.useContext(Context)
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortingId, setSortingId] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://67992179be2191d708b21876.mockapi.io/api/main/items?${category}&sortBy=${sortingId.sortingName}&order=desc${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        // Проверяем, что строка, которую получили, является массивом
        if (Array.isArray(arr)) {
          setItems(arr);
        } else {
          setItems([]); // Если не массив, устанавливаем пустой массив
        }
      })
      .catch(() => {
        setItems([]); // Обработка ошибок запроса
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId, sortingId, searchValue]);

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const product = items.length ? (
    items.map((value) => <PizzaBlock key={value.id} {...value} />)
  ) : (
    <h2 style={{ textAlign: "center" }}>Ничего не найдено</h2>
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
                onClickCategory={(index) => setCategoryId(index)}
              />
              <Sorting
                value={sortingId}
                onClickSorting={(index) => setSortingId(index)}
              />
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
