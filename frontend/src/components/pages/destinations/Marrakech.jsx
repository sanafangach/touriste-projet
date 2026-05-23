// src/components/pages/destinations/Marrakech.jsx
import React from "react";
import CityTemplate from "./CityTemplate";

const marrakechData = {
  name: "Marrakech",
  slug: "marrakech",
  heroTitle: "Explore Marrakech: The Red City of Magic",
  heroSubtitle: "Where ancient traditions meet modern luxury",
  coverImage: "https://images.unsplash.com/photo-1597211684490-8c8900f8f3b2?ixlib=rb-4.0.3",
  
  activities: [
    {
      id: 1,
      name: "Hot Air Balloon",
      price: "$120",
      duration: "4 hours",
      rating: 4.9,
      stars: 5,
      description: "Sunrise balloon ride over Atlas Mountains with breakfast included.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
    },
    {
      id: 2,
      name: "Cooking Class",
      price: "$50",
      duration: "3 hours",
      rating: 4.8,
      stars: 5,
      description: "Learn traditional Moroccan cuisine in a local riad.",
      image: "https://images.unsplash.com/photo-1556910104-522b3a6c8d3b"
    },
    {
      id: 3,
      name: "Quad Biking",
      price: "$65",
      duration: "2 hours",
      rating: 4.7,
      stars: 4,
      description: "Desert quad adventure in the palm groves.",
      image: "https://images.unsplash.com/photo-1552318826-fda4d2545a1b"
    }
  ],

  restaurants: [
    {
      id: 1,
      name: "Nomad",
      rating: 4.8,
      stars: 5,
      priceRange: "$30-50",
      cuisine: "Modern Moroccan",
      signatureDishes: "Beef tagine, Lamb shoulder",
      location: "Medina",
      openingHours: "12:00 - 23:00",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    },
    {
      id: 2,
      name: "Le Jardin",
      rating: 4.7,
      stars: 4,
      priceRange: "$25-40",
      cuisine: "Moroccan",
      signatureDishes: "Pastilla, Couscous",
      location: "Medina",
      openingHours: "11:00 - 23:00",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    }
  ],

  hiddenCorners: [
    {
      id: 1,
      name: "Secret Rooftop Cafes",
      rating: 4.8,
      stars: 5,
      description: "Hidden cafes with stunning views of Jemaa el-Fnaa.",
      location: "Medina Rooftops",
      bestTime: "Sunset",
      entryFee: "Free with purchase",
      image: "https://images.unsplash.com/photo-1597211684490-8c8900f8f3b2"
    }
  ],

  popularSpots: [
    {
      id: 1,
      name: "Jemaa el-Fnaa",
      category: "Square",
      rating: 4.9,
      description: "Famous square with entertainers and food stalls.",
      image: "https://images.unsplash.com/photo-1597211684490-8c8900f8f3b2"
    },
    {
      id: 2,
      name: "Majorelle Garden",
      category: "Garden",
      rating: 4.8,
      description: "Beautiful botanical garden.",
      image: "https://images.unsplash.com/photo-1597211684490-8c8900f8f3b2"
    }
  ]
};

function Marrakech() {
  return <CityTemplate cityData={marrakechData} />;
}

export default Marrakech;