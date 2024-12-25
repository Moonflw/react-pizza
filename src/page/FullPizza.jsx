import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navaigate = useNavigate();


  React.useEffect(() => {
    async function fetchFullPizza() {
      try {
        const { data } = await axios.get(
          `https://673f48dba9bc276ec4b7fa6a.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        alert("Пицца не найдена");
        navaigate("/");
      }
    }
    fetchFullPizza();
  }, [id]);
  if (!pizza) {
    return <h1 style={{textAlign: "center"}}>Загрузка...</h1>;
  }
  return (
    <div style={{textAlign: "center"}}>
      <img style={{width: "400px"}} src={pizza.imageUrl} alt="" />
      <h1>{pizza.title}</h1>
      <p>Цена пиццы</p>
      <p>{pizza.price}</p>
      <p>Какое-нибудь описание к пицце, возможно вкусно...</p>
    </div>
  );
};

export default FullPizza;
