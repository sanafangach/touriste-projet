// src/components/pages/destinations/Casablanca.jsx
import React from "react";
import CityTemplate from "./CityTemplate";

const casablancaData = {
  name: "Casablanca",
  slug: "casablanca",
  heroTitle: "Explore Casablanca: Modern Marvels & Ancient Soul",
  heroSubtitle: "Where the Atlantic meets Moroccan elegance",
  coverImage: "https://images.unsplash.com/photo-1586438516928-5556297eedfa?ixlib=rb-4.0.3",
  
  activities: [
    {
      id: 1,
      name: "Hassan II Mosque Tour",
      price: "$15",
      duration: "2 hours",
      rating: 4.9,
      stars: 5,
      description: "Guided tour of the magnificent mosque, one of the largest in the world.",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523"
    },
    {
      id: 2,
      name: "City Sightseeing Bus",
      price: "$25",
      duration: "3 hours",
      rating: 4.7,
      stars: 4,
      description: "Hop-on hop-off bus tour covering all major attractions.",
      image: "https://images.unsplash.com/photo-1586438516928-5556297eedfa"
    },
    {
      id: 3,
      name: "Moroccan Cooking Class",
      price: "$50",
      duration: "3 hours",
      rating: 4.8,
      stars: 5,
      description: "Learn to prepare traditional Moroccan dishes.",
      image: "https://images.unsplash.com/photo-1556910104-522b3a6c8d3b"
    }
  ],

  restaurants: [
    {
      id: 1,
      name: "Rick's Café",
      rating: 4.8,
      stars: 5,
      priceRange: "$40-70",
      cuisine: "International",
      signatureDishes: "Casablanca cocktail, Sea bass, Moroccan pastilla",
      location: "Old Medina",
      openingHours: "12:00 - 00:00",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    },
    {
      id: 2,
      name: "Le Cabestan",
      rating: 4.9,
      stars: 5,
      priceRange: "$50-80",
      cuisine: "French-Moroccan",
      signatureDishes: "Lobster, Foie gras, Lamb",
      location: "Corniche",
      openingHours: "19:00 - 01:00",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
    }
  ],

  hiddenCorners: [
    {
      id: 1,
      name: "Habous Quarter",
      rating: 4.6,
      stars: 4,
      description: "Traditional neighborhood with unique Hispano-Moorish architecture.",
      location: "Near Royal Palace",
      bestTime: "Morning",
      entryFee: "Free",
      image: "https://images.unsplash.com/photo-1586438516928-5556297eedfa"
    }
  ],

  popularSpots: [
    {
      id: 1,
      name: "Hassan II Mosque",
      category: "Religious",
      rating: 4.9,
      description: "Iconic mosque with the world's tallest minaret.",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523"
    },
    {
      id: 2,
      name: "Corniche",
      category: "Beach",
      rating: 4.6,
      description: "Beautiful coastal promenade.",
      image: "https://images.unsplash.com/photo-1586438516928-5556297eedfa"
    }
  ]
};

function Casablanca() {
  return <CityTemplate cityData={casablancaData} />;
}

export default Casablanca;