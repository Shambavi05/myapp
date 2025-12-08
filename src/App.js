import { useState } from "react";
import { motion } from "framer-motion";
import { Emoji } from "emoji-mart";
import "./App.css";   // ✅ Import your CSS file

export default function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async () => {
    if (!query) return;
    setLoading(true);

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    const res = await fetch(url);
    const data = await res.json();

    setRecipes(data.meals || []);
    setLoading(false);
  };

  return (
    <div className="container">

      <motion.div
        className="marquee-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="marquee-text">
          🍽️ Let's Findout Your Favourite Recipe Through Recipe Finder 🍽️
        </div>
      </motion.div>

      <motion.div
        className="searchBox"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          className="inputField"
          placeholder="Search recipe (ex: chicken, pasta)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={searchRecipes} className="button">
          Search 🔍
        </button>
      </motion.div>

      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontSize: "20px" }}
        >
          Loading recipes...
        </motion.p>
      )}

      <div className="grid">
        {recipes.map((meal) => (
          <motion.div
            key={meal.idMeal}
            className="card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="cardImage"
            />

            <h3>{meal.strMeal}</h3>
            <p>
              <strong>Category:</strong> {meal.strCategory}
            </p>

            <a
              href={meal.strSource || "#"}
              target="_blank"
              rel="noreferrer"
            >
              <button className="linkButton">View Full Recipe</button>
            </a>
          </motion.div>
        ))}
      </div>

      {!loading && recipes.length === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          No recipes found. Try another search.
        </motion.p>
      )}
    </div>
  );
}
