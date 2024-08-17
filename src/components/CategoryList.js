import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
import './CategoryList.css';

function CategoryList() {
  // The state will store the list of categories, search query, and loading status
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // fetching categories
  useEffect(() => {
    axios.get('https://meals-rrih.onrender.com/categories')
      .then(response => {
        setCategories(response.data);
        setFilteredCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  // Filtering of categories searched
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const results = categories.filter(category =>
      category.name.toLowerCase().includes(query)
    );

    setFilteredCategories(results);
  };

  if (loading) return <p>Loading...</p>;

  // what will be rendered after
  return (
    <div className="category-list-container">
      <div className="category-list">
        <h1>Categories</h1>
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for categories..."
          />
        </div>
        <ul>
          {filteredCategories.map(category => (
            <li key={category.id} className="category-item">
              <div>
                <img src={category.image} alt={category.name} />
                <h2>{category.name}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default CategoryList;
