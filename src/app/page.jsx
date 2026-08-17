"use client";
import LandingPage from '../views/LandingPage';
import { PRODUCTS } from '../data/mockData';

export default function Home() {
  // Pass mock data just like App.jsx did. We will adapt this when moving to Supabase.
  const handleSelect = (product) => {
    // Legacy modal function
  };

  return <LandingPage products={PRODUCTS} handleSelect={handleSelect} />;
}
