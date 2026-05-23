// src/components/pages/destinations/Essaouira.jsx
import React from "react";
import CityTemplate from "./CityTemplate";

const essaouiraData = {
  name: "Essaouira",
  slug: "essaouira",
  heroTitle: "Explore Essaouira: The Windy City",
  heroSubtitle: "Where the Atlantic breeze meets ancient ramparts",
  coverImage: "https://images.unsplash.com/photo-1603708908939-60033b75bc48?ixlib=rb-4.0.3",
  
  activities: [
    {
      id: 1,
      name: "Windsurfing",
      price: "$60",
      duration: "2 hours",
      rating: 4.8,
      stars: 5,
      description: "Enjoy world-class windsurfing conditions in the bay.",
      image: "https://images.unsplash.com/photo-1528642474498-1af0c17fd6c3?ixlib=rb-4.0.3"
    },
    {
      id: 2,
      name: "Boat Trip to Mogador Island",
      price: "$45",
      duration: "3 hours",
      rating: 4.7,
      stars: 4,
      description: "Discover the protected island and its wildlife.",
      image: "https://images.unsplash.com/photo-1603708908939-60033b75bc48?ixlib=rb-4.0.3"
    },
    {
      id: 3,
      name: "Medina Walking Tour",
      price: "$25",
      duration: "2 hours",
      rating: 4.9,
      stars: 5,
      description: "Explore the UNESCO-listed medina with a local guide.",
      image: "https://images.unsplash.com/photo-1603708908939-60033b75bc48?ixlib=rb-4.0.3"
    }
  ],

  restaurants: [
    {
      id: 1,
      name: "La Table by Madada",
      rating: 4.8,
      stars: 5,
      priceRange: "$30-50",
      cuisine: "Moroccan-Seafood",
      signatureDishes: "Fresh grilled fish, Seafood tagine",
      location: "Near the port",
      openingHours: "12:00 - 23:00",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    }
  ],

  hiddenCorners: [
    {
      id: 1,
      name: "Skala de la Ville",
      rating: 4.8,
      stars: 5,
      description: "Historic ramparts with stunning ocean views.",
      location: "Old Medina",
      bestTime: "Sunset",
      entryFee: "€2",
      image: "https://images.unsplash.com/photo-1603708908939-60033b75bc48"
    }
  ],

  popularSpots: [
    {
      id: 1,
      name: "Essaouira Beach",
      category: "Beach",
      rating: 4.7,
      description: "Popular beach for water sports.",
      image: "https://images.unsplash.com/photo-1603708908939-60033b75bc48"
    },
    {
      id: 2,
      name: "Port of Essaouira",
      category: "Port",
      rating: 4.6,
      description: "Traditional fishing port with blue boats.",
      image: "https://images.unsplash.com/photo-1603708908939-60033b75bc48"
    }
  ]
};

function Essaouira() {
  return <CityTemplate cityData={essaouiraData} />;
}

export default Essaouira;