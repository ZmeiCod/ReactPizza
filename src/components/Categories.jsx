import React from "react";

function Categories() {
  const [active, setActive] = React.useState(0);

  const categories = [
    "Все",
    "Итальянские",
    "Русские",
    "Американские",
    "Японские",
  ];

  const onClickCategory = (index) => {
    setActive(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
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
