import React from "react";
import PizzaBlock from "../components/PizzaBlock";
import Sorting from "../components/Sorting";
import sliders from "../assets/sliders.json";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import Skeleton from "../components/PizzaBlock/Skeleton";


export default function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://67992179be2191d708b21876.mockapi.io/api/main/items")
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Carousel sliders={sliders} />
      <div className="wrapper">
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sorting />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isLoading
                ? [...new Array(8)].map(() => <Skeleton />)
                : items.map((value) => (
                    <PizzaBlock key={value.id} {...value} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
