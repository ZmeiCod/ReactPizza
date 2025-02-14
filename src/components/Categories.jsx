import React from "react";

function Categories() {
  const [active, setActive] = React.useState(0);

  const categories = [
    "Все",
    "Острые",
    "Мясные",
    "Сырные",
    "Домашние",
    "Натуральные",
    "Вегетарианские",
  ];

  const onClickCategory = (index) => {
    setActive(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={value}
            onClick={() => onClickCategory(index)}
            className={active === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
