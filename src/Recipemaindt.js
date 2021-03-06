import React, { useState } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Recipedt } from "./Recipedt.js";
import Alert from "./Alert";
import "./Recipemaindt.css";

function Recipemain() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "a3572e71";
  const APP_KEY = "2ddfb1eab1247cf8ea4a23f406ed6508";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please fill the form");
    }
  };

  const onChange = (e) => setQuery(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      {/* <h1 className="header">Hello there</h1> */}
      <form onSubmit={onSubmit} className="search-formdt">
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          name="query"
          onChange={onChange}
          value={query}
          autoComplete="off"
          placeholder="Search Food"
        />
        <input type="submit" value="Search" />
      </form>
      <div className="recipesdt">
        {recipes !== [] &&
          recipes.map((recipe) => <Recipedt key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default Recipemain;