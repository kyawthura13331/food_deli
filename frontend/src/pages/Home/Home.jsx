import React, { useContext, useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import { StoreContext } from '../../context/StoreContext';

const Home = () => {
  const [category, setCategory] = useState("All");
  const { user } = useContext(StoreContext); // ✅ FIXED

  return (
    <div>
      <Header />
      {user ? (
        <div>
          
          <ExploreMenu category={category} setCategory={setCategory} />
          <FoodDisplay category={category} />
          <AppDownload />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
