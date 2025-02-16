import React from "react";

function Categories({value, onClickCategory}) {
  const categories = [
    "Все",
    "Острые",
    "Мясные",
    "Сырные",
    "Домашние",
    "Натуральные",
    "Вегетарианские",
  ];

    return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={categoryName}
            onClick={() => onClickCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
