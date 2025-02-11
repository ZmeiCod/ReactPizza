import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sorting from "./components/Sorting";
import pizzas from './assets/pizzas.json'
import sliders from './assets/sliders.json'

import "./scss/app.scss";
import Carousel from "./components/Carousel";

function App() {
  return (
    <>
      <Header />
      {/* {sliders.map((value) => (
        <Carousel id={value.id} name={value.name} image={value.image}/>
      ))} */}
      <Carousel  sliders={sliders}/>
      <div className="wrapper">
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sorting />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {
                [pizzas.map((value) => (
                  <PizzaBlock imageUrl={value.imageUrl} title={value.title} price={value.price}/>
                ))]
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
