export const MOROCCO_CITIES = [
  "Marrakech",
  "Fes",
  "Chefchaouen",
  "Tangier",
  "Casablanca",
  "Rabat",
  "Essaouira",
  "Agadir",
  "Merzouga",
  "Ouarzazate",
  "Ifrane",
  "Dakhla",
  "Tetouan",
  "Al Hoceima",
  "Zagora",
  "Meknes",
  "Asilah",
  "Akchour",
  "Atlas Mountains",
  "Paradise Valley",
  "Legzira",
  "Ouzoud Falls",
  "Volubilis",
  "Ait Ben Haddou",
  "Saidia",
  "El Jadida",
  "Tarfaya",
  "Tafraoute",
  "Bin El Ouidane",
];

export const CITY_CATEGORIES = {
  Marrakech: "imperial",
  Fes: "imperial",
  Meknes: "imperial",
  Rabat: "imperial",
  Casablanca: "imperial",
  Tetouan: "imperial",
  Volubilis: "imperial",
  Chefchaouen: "imperial",
  Merzouga: "desert",
  Zagora: "desert",
  Ouarzazate: "desert",
  "Ait Ben Haddou": "desert",
  Tarfaya: "desert",
  Legzira: "beach",
  Dakhla: "beach",
  Agadir: "beach",
  Saidia: "beach",
  "Al Hoceima": "beach",
  Essaouira: "beach",
  Asilah: "beach",
  "El Jadida": "beach",
  Tangier: "beach",
  "Atlas Mountains": "nature",
  "Paradise Valley": "nature",
  "Ouzoud Falls": "nature",
  Akchour: "nature",
  Ifrane: "nature",
  Tafraoute: "nature",
  "Bin El Ouidane": "nature",
};

export const getCityCategory = (cityName = "") => CITY_CATEGORIES[cityName] || "imperial";

export const CITY_IMAGE_MAP = {
  Marrakech: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1400&q=80",
  Fes: "https://images.unsplash.com/photo-1631545806603-066f6a1940c0?auto=format&fit=crop&w=1400&q=80",
  Chefchaouen: "https://images.unsplash.com/photo-1611150218086-2f9058df7297?auto=format&fit=crop&w=1400&q=80",
  Agadir: "https://images.unsplash.com/photo-1664020206760-b45f9f271594?auto=format&fit=crop&w=1400&q=80",
  Tangier: "https://images.unsplash.com/photo-1687943625788-b4de67f5ef92?auto=format&fit=crop&w=1400&q=80",
  Merzouga: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=80",
  Ouarzazate: "https://images.unsplash.com/photo-1709291535925-572d879ca759?auto=format&fit=crop&w=1400&q=80",
  Casablanca: "https://images.unsplash.com/photo-1567601380901-7db4f9f23be7?auto=format&fit=crop&w=1400&q=80",
  Rabat: "https://images.unsplash.com/photo-1705155227717-ec5f8d85666a?auto=format&fit=crop&w=1400&q=80",
  Essaouira: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80",
  Ifrane: "https://images.unsplash.com/photo-1649872493865-8e925ebca9e5?auto=format&fit=crop&w=1400&q=80",
  Dakhla: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1400&q=80",
  Tetouan: "https://images.unsplash.com/photo-1548018560-c7c6412d1aa1?auto=format&fit=crop&w=1400&q=80",
  "Al Hoceima": "https://images.unsplash.com/photo-1490077476659-095159692ab5?auto=format&fit=crop&w=1400&q=80",
};

export const CONTEXT_IMAGE_MAP = {
  restaurant: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80",
  dining: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  lunch: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
  dinner: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
  cafe: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
  riad: "https://images.unsplash.com/photo-1598935888738-cd2622bcd437?auto=format&fit=crop&w=1400&q=80",
  hotel: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
  hammam: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=80",
  souk: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=80",
  desert: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=80",
  hiking: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1400&q=80",
  beach: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1400&q=80",
  museum: "https://images.unsplash.com/photo-1573648952759-0d5d7e7b9eb0?auto=format&fit=crop&w=1400&q=80",
  palace: "https://images.unsplash.com/photo-1624439762564-2b71d3af5793?auto=format&fit=crop&w=1400&q=80",
  waterfall: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1400&q=80",
  surfing: "https://images.unsplash.com/photo-1502680390548-bdbac40ca449?auto=format&fit=crop&w=1400&q=80",
  mountain: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80",
  lake: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1400&q=80",
};

const GOOGLE_HOTEL_IMAGE_MAP = {
  Marrakech: [
    "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=700&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=700&q=80",
  ],
};

const PLACE_IMAGE_POOLS = {
  hotels: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=700&q=80",
  ],
  restaurants: [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=700&q=80",
  ],
  hostels: [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=700&q=80",
  ],
  camping: [
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=700&q=80",
  ],
};

const GOOGLE_MAPS_HOTELS_BY_CITY = {
  Marrakech: [
    { name: "Le Meridien N'Fis", price: "2.225 MAD", rating: "4.0", reviews: "1,9 k", source: "Google Maps" },
    { name: "ibis Marrakech Palmeraie", price: "545 MAD", rating: "4.2", reviews: "3,4 k", source: "Booking.com" },
    { name: "Hotel Racine Marrakech", price: "650 MAD", rating: "4.1", reviews: "3,2 k", source: "Google Maps" },
    { name: "Hotel Almas Marrakech", price: "760 MAD", rating: "4.0", reviews: "1,7 k", source: "Google Maps" },
    { name: "Opera Plaza Hotel Marrakech", price: "1.028 MAD", rating: "4.2", reviews: "2,8 k", source: "Google Maps" },
    { name: "Park Hyatt Marrakech", price: "6.599 MAD", rating: "4.7", reviews: "325", source: "Park Hyatt" },
    { name: "Imperial Holiday Hotel & Spa", price: "580 MAD", rating: "2.3", reviews: "752", source: "Booking.com" },
    { name: "Sofitel Marrakech Lounge and Spa", price: "7.162 MAD", rating: "4.7", reviews: "9,8 k", source: "Skyscanner" },
    { name: "Movenpick Hotel Mansour Eddahbi Marrakech", price: "3.262 MAD", rating: "4.7", reviews: "12 k", source: "Skyscanner" },
    { name: "Radisson Blu Hotel Marrakech Carre Eden", price: "2.357 MAD", rating: "4.4", reviews: "2,8 k", source: "Radisson Hotels" },
    { name: "Savoy Le Grand Hotel Marrakech", price: "3.126 MAD", rating: "4.1", reviews: "3,8 k", source: "Google Maps" },
  ],
  Casablanca: [
    { name: "Four Seasons Hotel Casablanca", price: "4.000 MAD", rating: "4.5", reviews: "4 k", source: "Google Maps" },
    { name: "Hyatt Regency Casablanca", price: "2.200 MAD", rating: "4.2", reviews: "3,8 k", source: "Google Maps" },
    { name: "Kenzi Tower Hotel", price: "1.300 MAD", rating: "4.2", reviews: "3,3 k", source: "Google Maps" },
    { name: "Barcelo Anfa Casablanca", price: "1.500 MAD", rating: "4.3", reviews: "1,8 k", source: "Google Maps" },
  ],
  Agadir: [
    { name: "Sofitel Agadir Royal Bay Resort", price: "2.100 MAD", rating: "4.5", reviews: "3,7 k", source: "Google Maps" },
    { name: "Hotel Riu Palace Tikida Agadir", price: "2.300 MAD", rating: "4.5", reviews: "5,9 k", source: "Google Maps" },
    { name: "Iberostar Waves Founty Beach", price: "1.700 MAD", rating: "4.4", reviews: "5,4 k", source: "Google Maps" },
    { name: "Hotel Timoulay and Spa Agadir", price: "950 MAD", rating: "4.4", reviews: "1,2 k", source: "Google Maps" },
  ],
  Fes: [
    { name: "Hotel Sahrai", price: "2.200 MAD", rating: "4.5", reviews: "1,4 k", source: "Google Maps" },
    { name: "Fes Marriott Hotel Jnan Palace", price: "1.500 MAD", rating: "4.3", reviews: "2,5 k", source: "Google Maps" },
    { name: "Palais Faraj Suites & Spa", price: "2.400 MAD", rating: "4.6", reviews: "1 k", source: "Google Maps" },
    { name: "Riad Fes - Relais & Chateaux", price: "3.000 MAD", rating: "4.6", reviews: "800", source: "Google Maps" },
  ],
  Tangier: [
    { name: "Hilton Tangier Al Houara Resort & Spa", price: "1.900 MAD", rating: "4.3", reviews: "2,9 k", source: "Google Maps" },
    { name: "Fairmont Tazi Palace Tangier", price: "3.200 MAD", rating: "4.6", reviews: "850", source: "Google Maps" },
    { name: "Hilton Tanger City Center", price: "1.600 MAD", rating: "4.4", reviews: "2,6 k", source: "Google Maps" },
    { name: "Marina Bay City Center Tangier", price: "1.000 MAD", rating: "4.2", reviews: "1,8 k", source: "Google Maps" },
  ],
  Rabat: [
    { name: "The View Rabat", price: "2.000 MAD", rating: "4.4", reviews: "1,9 k", source: "Google Maps" },
    { name: "Sofitel Rabat Jardin des Roses", price: "2.300 MAD", rating: "4.5", reviews: "4,4 k", source: "Google Maps" },
    { name: "Rabat Marriott Hotel", price: "2.100 MAD", rating: "4.5", reviews: "900", source: "Google Maps" },
    { name: "Hotel La Tour Hassan Palace", price: "2.600 MAD", rating: "4.4", reviews: "1,7 k", source: "Google Maps" },
  ],
  Essaouira: [
    { name: "Heure Bleue Palais", price: "2.000 MAD", rating: "4.6", reviews: "650", source: "Google Maps" },
    { name: "Atlas Essaouira & Spa", price: "1.100 MAD", rating: "4.1", reviews: "2,7 k", source: "Google Maps" },
    { name: "Sofitel Essaouira Mogador Golf & Spa", price: "1.700 MAD", rating: "4.4", reviews: "2,4 k", source: "Google Maps" },
    { name: "Riad Mimouna", price: "900 MAD", rating: "4.5", reviews: "900", source: "Google Maps" },
  ],
  Chefchaouen: [
    { name: "Lina Ryad & Spa", price: "1.600 MAD", rating: "4.5", reviews: "520", source: "Google Maps" },
    { name: "Dar Jasmine", price: "1.500 MAD", rating: "4.7", reviews: "680", source: "Google Maps" },
    { name: "Hotel Parador", price: "800 MAD", rating: "3.9", reviews: "1,4 k", source: "Google Maps" },
    { name: "Casa Perleta", price: "700 MAD", rating: "4.5", reviews: "620", source: "Google Maps" },
  ],
};

const EXTENDED_HOTELS_BY_CITY = {
  Ouarzazate: [
    { name: "Berbere Palace", price: "1.700 MAD", rating: "4.4", reviews: "1,8 k", source: "Google Maps" },
    { name: "Oscar Hotel by Atlas Studios", price: "850 MAD", rating: "4.1", reviews: "1,5 k", source: "Google Maps" },
    { name: "Dar Chamaa", price: "700 MAD", rating: "4.4", reviews: "600", source: "Google Maps" },
  ],
  Ifrane: [
    { name: "Michlifen Resort & Golf", price: "2.900 MAD", rating: "4.6", reviews: "2,7 k", source: "Google Maps" },
    { name: "Hotel Farah Inn Ifrane", price: "850 MAD", rating: "3.4", reviews: "2,5 k", source: "Google Maps" },
    { name: "Zephyr Ifrane", price: "950 MAD", rating: "4.0", reviews: "1,4 k", source: "Google Maps" },
  ],
  Dakhla: [
    { name: "Dakhla Attitude", price: "1.400 MAD", rating: "4.4", reviews: "1,7 k", source: "Google Maps" },
    { name: "Westpoint Dakhla", price: "1.250 MAD", rating: "4.3", reviews: "850", source: "Google Maps" },
    { name: "La Crique Nature & Spa Dakhla", price: "2.200 MAD", rating: "4.6", reviews: "700", source: "Google Maps" },
  ],
  Tetouan: [
    { name: "Hotel Chams Tetouan", price: "850 MAD", rating: "4.0", reviews: "1,8 k", source: "Google Maps" },
    { name: "Blanco Riad", price: "900 MAD", rating: "4.3", reviews: "500", source: "Google Maps" },
    { name: "Prestige Hotel Tetouan", price: "700 MAD", rating: "4.3", reviews: "1,1 k", source: "Google Maps" },
  ],
  "Al Hoceima": [
    { name: "Mercure Quemado Resort Al Hoceima", price: "1.150 MAD", rating: "4.0", reviews: "2,2 k", source: "Google Maps" },
    { name: "Radisson Blu Resort Al Hoceima", price: "1.500 MAD", rating: "4.2", reviews: "1,4 k", source: "Google Maps" },
    { name: "Suites Hotel Mohammed V", price: "800 MAD", rating: "3.8", reviews: "850", source: "Google Maps" },
  ],
  Zagora: [
    { name: "Riad Lamane", price: "780 MAD", rating: "4.2", reviews: "900", source: "Google Maps" },
    { name: "La Perle du Draa", price: "620 MAD", rating: "4.1", reviews: "780", source: "Google Maps" },
    { name: "Riad Dar Sofian", price: "900 MAD", rating: "4.6", reviews: "650", source: "Google Maps" },
  ],
  Meknes: [
    { name: "Hotel Transatlantique Meknes", price: "820 MAD", rating: "3.9", reviews: "1,4 k", source: "Google Maps" },
    { name: "Riad Yacout Meknes", price: "850 MAD", rating: "4.3", reviews: "900", source: "Google Maps" },
    { name: "Ibis Meknes", price: "520 MAD", rating: "3.7", reviews: "1,8 k", source: "Google Maps" },
  ],
  Asilah: [
    { name: "Hotel Al Alba", price: "800 MAD", rating: "4.3", reviews: "750", source: "Google Maps" },
    { name: "Al Khaima Hotel Asilah", price: "680 MAD", rating: "3.8", reviews: "1,1 k", source: "Google Maps" },
    { name: "Hotel Zelis Asilah", price: "500 MAD", rating: "3.8", reviews: "800", source: "Google Maps" },
  ],
  Akchour: [
    { name: "Auberge Dardara", price: "650 MAD", rating: "4.2", reviews: "950", source: "Google Maps" },
    { name: "Ermitage d'Akchour", price: "1.300 MAD", rating: "4.4", reviews: "1,1 k", source: "Google Maps" },
  ],
  "Atlas Mountains": [
    { name: "Kasbah Tamadot", price: "8.000 MAD", rating: "4.8", reviews: "650", source: "Google Maps" },
    { name: "Kasbah du Toubkal", price: "1.800 MAD", rating: "4.5", reviews: "900", source: "Google Maps" },
    { name: "Riad Atlas Prestige", price: "550 MAD", rating: "4.6", reviews: "500", source: "Google Maps" },
  ],
  "Paradise Valley": [
    { name: "Auberge Bab Imouzer", price: "550 MAD", rating: "4.2", reviews: "500", source: "Google Maps" },
    { name: "Hotel des Cascades Ecolodge", price: "900 MAD", rating: "4.1", reviews: "650", source: "Google Maps" },
  ],
  Legzira: [
    { name: "Hotel Beach Club Legzira", price: "650 MAD", rating: "4.1", reviews: "900", source: "Google Maps" },
    { name: "Auberge Legzira", price: "450 MAD", rating: "4.0", reviews: "650", source: "Google Maps" },
  ],
  "Ouzoud Falls": [
    { name: "Riad Cascades d'Ouzoud", price: "750 MAD", rating: "4.4", reviews: "750", source: "Google Maps" },
    { name: "Hotel Chellal Ouzoud", price: "420 MAD", rating: "4.0", reviews: "850", source: "Google Maps" },
    { name: "Widiane Resort", price: "2.000 MAD", rating: "4.4", reviews: "1,8 k", source: "Google Maps" },
  ],
  Volubilis: [
    { name: "Volubilis Inn", price: "700 MAD", rating: "3.9", reviews: "800", source: "Google Maps" },
    { name: "Diyar Timnay", price: "650 MAD", rating: "4.1", reviews: "900", source: "Google Maps" },
  ],
  "Ait Ben Haddou": [
    { name: "Kasbah Tebi", price: "900 MAD", rating: "4.5", reviews: "700", source: "Google Maps" },
    { name: "Ksar Ighnda", price: "1.350 MAD", rating: "4.5", reviews: "1 k", source: "Google Maps" },
    { name: "Riad Caravane", price: "1.000 MAD", rating: "4.7", reviews: "750", source: "Google Maps" },
  ],
  Saidia: [
    { name: "Iberostar Saidia", price: "1.800 MAD", rating: "4.2", reviews: "4,4 k", source: "Google Maps" },
    { name: "Radisson Blu Resort Saidia Beach", price: "1.600 MAD", rating: "4.0", reviews: "2,5 k", source: "Google Maps" },
    { name: "Be Live Collection Saidia", price: "1.450 MAD", rating: "3.8", reviews: "3,2 k", source: "Google Maps" },
  ],
  "El Jadida": [
    { name: "Mazagan Beach & Golf Resort", price: "2.400 MAD", rating: "4.5", reviews: "9 k", source: "Google Maps" },
    { name: "Pullman Mazagan Royal Golf & Spa", price: "1.300 MAD", rating: "4.2", reviews: "2,5 k", source: "Google Maps" },
    { name: "Ibis El Jadida", price: "620 MAD", rating: "3.7", reviews: "1,8 k", source: "Google Maps" },
  ],
  Tarfaya: [
    { name: "Hotel Casamar Tarfaya", price: "450 MAD", rating: "3.8", reviews: "500", source: "Google Maps" },
    { name: "Hotel El Ghazi Tarfaya", price: "380 MAD", rating: "3.7", reviews: "350", source: "Google Maps" },
  ],
  Tafraoute: [
    { name: "Hotel Les Amandiers Tafraoute", price: "650 MAD", rating: "4.0", reviews: "900", source: "Google Maps" },
    { name: "Hotel Salama Tafraoute", price: "420 MAD", rating: "4.2", reviews: "500", source: "Google Maps" },
  ],
  "Bin El Ouidane": [
    { name: "Widiane Resort", price: "2.000 MAD", rating: "4.4", reviews: "1,8 k", source: "Google Maps" },
    { name: "Chems du Lac Bin El Ouidane", price: "850 MAD", rating: "4.0", reviews: "1 k", source: "Google Maps" },
  ],
};

const REAL_RESTAURANTS_BY_CITY = {
  Marrakech: [
    { name: "Nomad Marrakech", price: "150-250 MAD", cuisine: "Moroccan", rating: "4.1", address: "1 Derb Aarjane, Marrakech", description: "Modern Moroccan dining near the medina with a rooftop terrace." },
    { name: "Le Jardin Marrakech", price: "160-280 MAD", cuisine: "Moroccan", rating: "4.2", address: "32 Souk Jeld Sidi Abdelaziz, Marrakech", description: "Garden restaurant serving Moroccan dishes in a calm riad setting." },
    { name: "Cafe Clock Marrakech", price: "90-180 MAD", cuisine: "Moroccan Cafe", rating: "4.4", address: "224 Derb Chtouka, Marrakech", description: "Casual cultural cafe known for Moroccan plates and live events." },
    { name: "Al Fassia Aguedal", price: "250-400 MAD", cuisine: "Moroccan", rating: "4.5", address: "9bis Route de l'Ourika, Marrakech", description: "Well-known Moroccan restaurant with classic service and traditional cuisine." },
  ],
  Casablanca: [
    { name: "La Sqala", price: "120-240 MAD", cuisine: "Moroccan", rating: "4.2", address: "Boulevard des Almohades, Casablanca", description: "Moroccan restaurant set in a historic fortified garden." },
    { name: "Rick's Cafe", price: "300-500 MAD", cuisine: "International", rating: "4.3", address: "248 Boulevard Sour Jdid, Casablanca", description: "Iconic Casablanca restaurant with refined dining and piano-bar atmosphere." },
    { name: "Le Cabestan", price: "400-700 MAD", cuisine: "Seafood", rating: "4.3", address: "90 Boulevard de la Corniche, Casablanca", description: "Oceanfront restaurant with seafood and Atlantic views." },
  ],
  Agadir: [
    { name: "Pure Passion Restaurant", price: "250-450 MAD", cuisine: "Seafood", rating: "4.4", address: "Marina d'Agadir, Agadir", description: "Popular marina restaurant focused on fresh seafood." },
    { name: "Le Jardin d'Eau", price: "160-300 MAD", cuisine: "Moroccan Seafood", rating: "4.1", address: "Boulevard du 20 Aout, Agadir", description: "Relaxed restaurant with Moroccan and seafood dishes." },
    { name: "Restaurant Daffy", price: "80-170 MAD", cuisine: "Moroccan", rating: "4.3", address: "Rue des Orangers, Agadir", description: "Local favorite for affordable Moroccan meals." },
  ],
  Fes: [
    { name: "Cafe Clock Fes", price: "90-180 MAD", cuisine: "Moroccan Cafe", rating: "4.4", address: "7 Derb el Magana, Fes", description: "Well-known medina cafe with Moroccan plates and cultural events." },
    { name: "The Ruined Garden", price: "180-320 MAD", cuisine: "Moroccan", rating: "4.4", address: "15 Derb Idrissy Sidi Ahmed Chaoui, Fes", description: "Garden restaurant in the medina with traditional Moroccan cooking." },
    { name: "Restaurant Dar Hatim", price: "220-350 MAD", cuisine: "Moroccan", rating: "4.7", address: "19 Derb Ezaouia Fandak Lihoudi, Fes", description: "Family-run restaurant famous for home-style Moroccan cuisine." },
  ],
  Tangier: [
    { name: "El Morocco Club", price: "250-450 MAD", cuisine: "Moroccan International", rating: "4.3", address: "Place du Tabor, Tangier", description: "Elegant restaurant and piano bar in the kasbah." },
    { name: "Saveur de Poisson", price: "250-350 MAD", cuisine: "Seafood", rating: "4.4", address: "2 Escalier Waller, Tangier", description: "Famous fixed-menu seafood restaurant in Tangier." },
    { name: "Cafe Hafa", price: "40-100 MAD", cuisine: "Cafe", rating: "4.2", address: "Rue Hafa, Tangier", description: "Historic cliffside cafe known for mint tea and sea views." },
  ],
  Rabat: [
    { name: "Dar Naji", price: "100-220 MAD", cuisine: "Moroccan", rating: "4.2", address: "Avenue Jazirat Al Arabe, Rabat", description: "Popular Moroccan restaurant for tagines, couscous, and tea." },
    { name: "Le Dhow", price: "250-450 MAD", cuisine: "International", rating: "4.1", address: "Quai de Bouregreg, Rabat", description: "Restaurant boat with river views and varied cuisine." },
    { name: "Ty Potes", price: "160-280 MAD", cuisine: "French Moroccan", rating: "4.4", address: "11 Rue Ghafsa, Rabat", description: "Cozy restaurant with fresh plates and garden seating." },
  ],
  Essaouira: [
    { name: "La Table by Madada", price: "250-450 MAD", cuisine: "Seafood", rating: "4.5", address: "7 Rue Youssef El Fassi, Essaouira", description: "Refined seafood restaurant close to the port and medina." },
    { name: "Taros", price: "180-350 MAD", cuisine: "Moroccan International", rating: "4.1", address: "Place Moulay Hassan, Essaouira", description: "Rooftop restaurant with sea views and live music." },
    { name: "Restaurant Adwak", price: "90-190 MAD", cuisine: "Moroccan", rating: "4.4", address: "2 Rue Moulay Hassan, Essaouira", description: "Small medina restaurant serving Moroccan classics." },
  ],
  Chefchaouen: [
    { name: "Cafe Clock Chefchaouen", price: "80-170 MAD", cuisine: "Moroccan Cafe", rating: "4.5", address: "3 Derb Tijani, Chefchaouen", description: "Cultural cafe with Moroccan food and rooftop views." },
    { name: "Restaurant Beldi Bab Ssour", price: "70-150 MAD", cuisine: "Moroccan", rating: "4.5", address: "5 Rue El Kharrazin, Chefchaouen", description: "Affordable Moroccan restaurant in the blue medina." },
    { name: "Casa Aladdin", price: "90-180 MAD", cuisine: "Moroccan", rating: "4.0", address: "Rue Targui, Chefchaouen", description: "Medina restaurant with terrace views and traditional dishes." },
  ],
};

const REAL_HOSTELS_BY_CITY = {
  Marrakech: [
    { name: "Rodamon Riad Marrakech Hostel", price: "180-450 MAD / night", rating: "4.5", address: "Amssafah 32, Marrakech", description: "Design hostel in a riad with dorms, private rooms, and a pool." },
    { name: "Equity Point Marrakech", price: "160-380 MAD / night", rating: "4.2", address: "80 Derb El Hammam Mouassine, Marrakech", description: "Medina hostel with rooftop spaces and budget rooms." },
    { name: "The Central House Marrakech Medina", price: "220-520 MAD / night", rating: "4.5", address: "Amssafah 84, Marrakech", description: "Modern hostel-riad with social areas and private-room options." },
  ],
  Fes: [
    { name: "Funky Fes Hostel", price: "120-320 MAD / night", rating: "4.2", address: "60 Arset Lamdelssi, Fes", description: "Budget hostel in Fes medina with dorms and terrace." },
    { name: "Medina Social Club", price: "180-420 MAD / night", rating: "4.3", address: "11 Derb El Menia, Fes", description: "Social hostel and riad with events and shared rooms." },
  ],
  Essaouira: [
    { name: "The Chill Art Hostel", price: "120-350 MAD / night", rating: "4.3", address: "22 Rue Abderrahamane Eddakhil, Essaouira", description: "Creative medina hostel with terrace and dorm rooms." },
    { name: "Essaouira Beach Hostel", price: "110-300 MAD / night", rating: "4.1", address: "Rue Lalla Hasna, Essaouira", description: "Budget hostel close to the beach and surf spots." },
  ],
  Chefchaouen: [
    { name: "Hostel Aline", price: "90-220 MAD / night", rating: "4.3", address: "Rue Sidi Ahmed El Ouafi, Chefchaouen", description: "Simple budget hostel in Chefchaouen medina." },
    { name: "Dar Dadicilef", price: "120-300 MAD / night", rating: "4.4", address: "Derb Hadri, Chefchaouen", description: "Traditional guesthouse with hostel-style budget rooms." },
  ],
  Tangier: [
    { name: "The Riad Hostel Tangier", price: "130-350 MAD / night", rating: "4.3", address: "23 Rue Mohamed Bergach, Tangier", description: "Medina hostel with terrace views and shared rooms." },
    { name: "Tangier Kasbah Hostel", price: "120-320 MAD / night", rating: "4.1", address: "Rue Sidi Jalil, Tangier", description: "Budget hostel near the kasbah and medina." },
  ],
};

const REAL_CAMPING_BY_CITY = {
  Marrakech: [
    { name: "Terre des Etoiles", price: "900-1800 MAD / night", rating: "4.4", address: "Agafay Desert, Marrakech", description: "Real desert camp in Agafay with tents, pool, and desert views." },
    { name: "Scarabeo Camp", price: "1800-3200 MAD / night", rating: "4.5", address: "Agafay Desert, Marrakech", description: "Luxury canvas camp near Marrakech with desert dining." },
    { name: "Inara Camp", price: "1600-3000 MAD / night", rating: "4.6", address: "Agafay Desert, Marrakech", description: "Glamping camp in Agafay with private tents and activities." },
  ],
  Merzouga: [
    { name: "Sahara Stars Camp", price: "650-1600 MAD / night", rating: "4.8", address: "Erg Chebbi, Merzouga", description: "Desert camp in the dunes near Merzouga." },
    { name: "Luxury Desert Camp Merzouga", price: "1200-2800 MAD / night", rating: "4.7", address: "Erg Chebbi, Merzouga", description: "Luxury camp with private tents and dune views." },
    { name: "Ali & Sara's Desert Palace", price: "900-2000 MAD / night", rating: "4.8", address: "Erg Chebbi, Merzouga", description: "Well-rated desert camp with camel activities and dinner." },
  ],
  Agadir: [
    { name: "Atlantica Parc", price: "300-900 MAD / night", rating: "4.1", address: "Imi Ouaddar, Agadir", description: "Large seaside camping and holiday park north of Agadir." },
    { name: "Camping Aourir", price: "120-350 MAD / night", rating: "4.0", address: "Aourir, Agadir", description: "Budget camping area near Taghazout and surf beaches." },
  ],
  Essaouira: [
    { name: "Camping Sidi Magdoul", price: "100-300 MAD / night", rating: "3.8", address: "Essaouira", description: "Known camping site near Essaouira beach and town." },
    { name: "Camping Le Calme", price: "180-450 MAD / night", rating: "4.3", address: "Ida Ougourd, Essaouira", description: "Quiet campsite outside Essaouira with simple facilities." },
  ],
  Chefchaouen: [
    { name: "Camping Azilan", price: "80-250 MAD / night", rating: "4.0", address: "Ras El Ma, Chefchaouen", description: "Camping spot above Chefchaouen with mountain views." },
  ],
};

export const buildGoogleMapsSearchUrl = (query = "") =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const getHotelPriceValue = (price = "") => {
  const match = String(price).replace(/\s/g, "").match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return null;
  return Number(match[1].replace(".", "").replace(",", "."));
};

const doesHotelMatchBudget = (hotel, budget) => {
  const price = getHotelPriceValue(hotel.price);
  if (!price) return true;
  if (budget === "Cheap") return price < 700;
  if (budget === "Luxury") return price > 1800;
  return price >= 700 && price <= 1800;
};

const doesPlaceMatchBudget = (place, budget, type) => {
  const price = getHotelPriceValue(place.price);
  if (!price) return true;

  if (type === "restaurants") {
    if (budget === "Cheap") return price < 120;
    if (budget === "Luxury") return price > 240;
    return price >= 120 && price <= 240;
  }

  if (budget === "Cheap") return price < 350;
  if (budget === "Luxury") return price > 900;
  return price >= 300 && price <= 1200;
};

const buildBudgetHotelSearches = (city, lang, budget) => {
  const budgetLabel =
    budget === "Cheap"
      ? (lang === "EN" ? "cheap" : lang === "AR" ? "اقتصادية" : "economiques")
      : budget === "Luxury"
        ? (lang === "EN" ? "luxury" : lang === "AR" ? "فاخرة" : "luxe")
        : (lang === "EN" ? "moderate" : lang === "AR" ? "متوسطة" : "moderes");
  return [
    { name: `${budgetLabel} hotels ${city}`, price: lang === "EN" ? "See prices" : "Voir les prix", rating: "4+", reviews: "", source: "Google Maps" },
    { name: `${budgetLabel} riads ${city}`, price: lang === "EN" ? "See prices" : "Voir les prix", rating: "4+", reviews: "", source: "Google Maps" },
    { name: `${budgetLabel} resorts ${city}`, price: lang === "EN" ? "See prices" : "Voir les prix", rating: "4+", reviews: "", source: "Google Maps" },
    { name: `best rated hotels ${city}`, price: lang === "EN" ? "See prices" : "Voir les prix", rating: "4+", reviews: "", source: "Google Maps" },
    { name: `available hotels near ${city}`, price: lang === "EN" ? "See prices" : "Voir les prix", rating: "4+", reviews: "", source: "Google Maps" },
    { name: `hotel deals ${city}`, price: lang === "EN" ? "See prices" : "Voir les prix", rating: "4+", reviews: "", source: "Google Maps" },
  ];
};

export const getGoogleMapsHotelOptions = (location = "Marrakech", lang = "FR", budget = "Moderate") => {
  const city =
    MOROCCO_CITIES.find((item) => item.toLowerCase() === String(location).trim().toLowerCase()) ||
    location ||
    "Marrakech";
  const exactHotels = [
    ...(GOOGLE_MAPS_HOTELS_BY_CITY[city] || []),
    ...(EXTENDED_HOTELS_BY_CITY[city] || []),
  ];
  const baseHotels = exactHotels.length > 0 ? exactHotels : [
    { name: `Hotels in ${city}`, price: lang === "EN" ? "See prices" : "Voir les prix", rating: "4+", reviews: "", source: "Google Maps" },
    { name: `Riads in ${city}`, price: lang === "EN" ? "See prices" : "Voir les prix", rating: "4+", reviews: "", source: "Google Maps" },
    { name: `Resorts in ${city}`, price: lang === "EN" ? "See prices" : "Voir les prix", rating: "4+", reviews: "", source: "Google Maps" },
  ];
  const hotelsForBudget = baseHotels.filter((hotel) => doesHotelMatchBudget(hotel, budget));
  const budgetSearches = buildBudgetHotelSearches(city, lang, budget);
  const selectedHotels = (hotelsForBudget.length > 0 ? hotelsForBudget : []).concat(budgetSearches).slice(0, 8);
  const imagePool = GOOGLE_HOTEL_IMAGE_MAP[city] || GOOGLE_HOTEL_IMAGE_MAP.default;

  return selectedHotels.map((hotel, index) => ({
    ...hotel,
    address: `${city}, Morocco`,
    description:
      lang === "EN"
        ? `Open this hotel search directly in Google Maps for ${city}.`
        : lang === "AR"
          ? `افتح هذا الفندق مباشرة في خرائط Google في ${city}.`
          : `Ouvrez cet hotel directement dans Google Maps a ${city}.`,
    image_url: hotel.image_url || imagePool[index % imagePool.length] || PLACE_IMAGE_POOLS.hotels[index % PLACE_IMAGE_POOLS.hotels.length],
    maps_query: `${hotel.name}, ${city}, Morocco`,
    maps_url: buildGoogleMapsSearchUrl(`${hotel.name}, ${city}, Morocco`),
  }));
};

const REAL_PLACE_DATASETS = {
  restaurants: REAL_RESTAURANTS_BY_CITY,
  hostels: REAL_HOSTELS_BY_CITY,
  camping: REAL_CAMPING_BY_CITY,
};

const getFallbackPlaceSearches = (city, type, lang, budget) => {
  const typeLabel = {
    restaurants: lang === "EN" ? "restaurants" : lang === "AR" ? "مطاعم" : "restaurants",
    hostels: lang === "EN" ? "hostels" : lang === "AR" ? "نزل" : "auberges",
    camping: lang === "EN" ? "camping" : lang === "AR" ? "تخييم" : "camping",
  }[type] || type;
  const budgetLabel =
    budget === "Cheap"
      ? (lang === "EN" ? "cheap" : lang === "AR" ? "اقتصادية" : "economiques")
      : budget === "Luxury"
        ? (lang === "EN" ? "luxury" : lang === "AR" ? "فاخرة" : "luxe")
        : (lang === "EN" ? "moderate" : lang === "AR" ? "متوسطة" : "moderes");

  const labelsByType = {
    restaurants: [
      `${budgetLabel} ${typeLabel} ${city}`,
      `best restaurants ${city}`,
      `Moroccan restaurants ${city}`,
      `restaurants near me ${city}`,
      `rooftop restaurants ${city}`,
      `local food ${city}`,
    ],
    hostels: [
      `${budgetLabel} ${typeLabel} ${city}`,
      `best hostels ${city}`,
      `auberges ${city}`,
      `budget accommodation ${city}`,
      `guesthouses ${city}`,
      `backpacker hostel ${city}`,
    ],
    camping: [
      `${budgetLabel} ${typeLabel} ${city}`,
      `camping near ${city}`,
      `glamping ${city}`,
      `bivouac ${city}`,
      `nature camp ${city}`,
      `campground ${city}`,
    ],
  };

  return (labelsByType[type] || [`${budgetLabel} ${typeLabel} ${city}`]).map((name) => ({
    name,
    price: lang === "EN" ? "See prices" : "Voir les prix",
    rating: "4+",
    address: `${city}, Morocco`,
    cuisine: type === "restaurants" ? "Google Maps" : undefined,
    description: lang === "EN" ? `Open real ${typeLabel} results in Google Maps.` : `Ouvrir les vrais resultats ${typeLabel} dans Google Maps.`,
    source: "Google Maps",
  }));
};

export const getRealGoogleMapsOptions = (location = "Marrakech", lang = "FR", budget = "Moderate", type = "restaurants") => {
  const city =
    MOROCCO_CITIES.find((item) => item.toLowerCase() === String(location).trim().toLowerCase()) ||
    location ||
    "Marrakech";
  const dataset = REAL_PLACE_DATASETS[type] || {};
  const baseItems = dataset[city] || [];
  const itemsForBudget = baseItems.filter((item) => doesPlaceMatchBudget(item, budget, type));
  const selectedItems = (itemsForBudget.length > 0 ? itemsForBudget : [])
    .concat(getFallbackPlaceSearches(city, type, lang, budget))
    .slice(0, 8);
  const imagePool = PLACE_IMAGE_POOLS[type] || PLACE_IMAGE_POOLS.hotels;

  return selectedItems.map((item, index) => ({
    ...item,
    address: item.address || `${city}, Morocco`,
    image_url: item.image_url || imagePool[index % imagePool.length] || getMoroccoImageByText(city, type === "restaurants" ? "restaurant" : type === "camping" ? "camping hiking" : "hostel hotel"),
    maps_query: `${item.name}, ${city}, Morocco`,
    maps_url: buildGoogleMapsSearchUrl(`${item.name}, ${city}, Morocco`),
  }));
};

export const guessCategoryFromText = (text = "") => {
  const value = text.toLowerCase();
  if (/hammam|bain|bath|spa/.test(value)) return "hammam";
  if (/riad|ryad/.test(value)) return "riad";
  if (/hotel|hostel|auberge|lodge/.test(value)) return "hotel";
  if (/restaurant|food|cuisine/.test(value)) return "restaurant";
  if (/desert|dune|sahara|camp/.test(value)) return "desert";
  if (/beach|plage|surf|ocean/.test(value)) return "beach";
  if (/hiking|trek|mountain|atlas|valley/.test(value)) return "hiking";
  if (/souk|market|bazaar|medina/.test(value)) return "souk";
  if (/museum|exposition/.test(value)) return "museum";
  if (/palace|palais|kasbah/.test(value)) return "palace";
  if (/dinner|diner/.test(value)) return "dinner";
  if (/lunch|dejeuner|midi/.test(value)) return "lunch";
  if (/cafe|coffee|tea/.test(value)) return "cafe";
  if (/waterfall|cascade|falls/.test(value)) return "waterfall";
  if (/lake|lac|barrage/.test(value)) return "lake";
  return null;
};

export const getMoroccoImageByText = (text = "", contextText = "") => {
  const category = guessCategoryFromText(`${text} ${contextText}`);
  if (category && CONTEXT_IMAGE_MAP[category]) return CONTEXT_IMAGE_MAP[category];

  const lowerText = text.toLowerCase();
  const city = MOROCCO_CITIES.find((item) => lowerText.includes(item.toLowerCase()));

  return city && CITY_IMAGE_MAP[city]
    ? CITY_IMAGE_MAP[city]
    : CITY_IMAGE_MAP.Marrakech;
};

const ACTIVITY_TEMPLATES = {
  imperial: [
    ["Morning", "Medina & Historic Souks", "Explore artisan alleys, spice stalls, and traditional architecture.", "Free", "4.7"],
    ["Lunch", "Rooftop Moroccan Lunch", "Enjoy tagines, salads, mint tea, and a panoramic old-city view.", "80-150 MAD", "4.5"],
    ["Afternoon", "Palace & Gardens", "Visit ornate courtyards, zellige tilework, and calm Andalusian gardens.", "70 MAD", "4.8"],
    ["Evening", "Traditional Dinner", "End the day with couscous, grilled brochettes, pastries, and local music.", "200-350 MAD", "4.7"],
  ],
  desert: [
    ["Morning", "Sunrise Camel Trek", "Cross golden dunes as the first light reaches the Sahara.", "250-400 MAD", "4.9"],
    ["Lunch", "Berber Camp Lunch", "Share fresh bread, lentils, olives, and mint tea in a desert camp.", "100-180 MAD", "4.7"],
    ["Afternoon", "Kasbah Visit", "Discover earthen architecture and desert trade-route history.", "50 MAD", "4.6"],
    ["Evening", "Stargazing Bivouac", "Watch the desert sky from a quiet camp after dinner.", "300-600 MAD", "4.9"],
  ],
  beach: [
    ["Morning", "Beach Walk", "Start with ocean air, coastal views, and relaxed seaside cafes.", "Free", "4.7"],
    ["Lunch", "Seafood Lunch", "Taste grilled fish, calamari, Moroccan salads, and fresh juice.", "120-220 MAD", "4.6"],
    ["Afternoon", "Surf or Boat Activity", "Choose a surf lesson, paddle session, or coastal excursion.", "200-400 MAD", "4.7"],
    ["Evening", "Sunset Promenade", "Walk the corniche and settle into a terrace for sunset.", "Free", "4.8"],
  ],
  nature: [
    ["Morning", "Mountain Trail", "Hike through valleys, cedar forests, or scenic canyon paths.", "Free", "4.8"],
    ["Lunch", "Berber Village Meal", "Share a home-style lunch with bread, olives, tagine, and tea.", "80-150 MAD", "4.9"],
    ["Afternoon", "Waterfalls & Viewpoints", "Cool off near natural pools and photograph the landscape.", "20 MAD", "4.7"],
    ["Evening", "Eco-Lodge Dinner", "Relax by the fire with regional dishes and mountain views.", "150-280 MAD", "4.6"],
  ],
};

const getLabel = (lang, en, fr, ar) => {
  if (lang === "AR") return ar;
  if (lang === "FR") return fr;
  return en;
};

const getPriceRange = (budget, lang) => {
  if (budget === "Luxury") return getLabel(lang, "1500-2500 MAD / night", "1500-2500 MAD / nuit", "1500-2500 MAD / nuit");
  if (budget === "Cheap") return getLabel(lang, "250-450 MAD / night", "250-450 MAD / nuit", "250-450 MAD / nuit");
  return getLabel(lang, "600-1000 MAD / night", "600-1000 MAD / nuit", "600-1000 MAD / nuit");
};

const withImage = (item, city, context) => ({
  ...item,
  image_url: item.image_url || getMoroccoImageByText(city, `${context} ${item.name}`),
});

export const buildMockTripData = (location, noOfDays, traveler, budget, lang = "FR") => {
  const city =
    MOROCCO_CITIES.find((item) => item.toLowerCase() === (location || "").trim().toLowerCase()) ||
    "Marrakech";
  const days = Number(noOfDays) > 0 ? Number(noOfDays) : 3;
  const safeLang = ["FR", "EN", "AR"].includes(lang) ? lang : "FR";
  const category = getCityCategory(city);
  const activityPool = ACTIVITY_TEMPLATES[category] || ACTIVITY_TEMPLATES.imperial;

  const hotelPrice = getPriceRange(budget, safeLang);
  const address = getLabel(safeLang, `${city}, Morocco`, `${city}, Maroc`, `${city}, Maroc`);

  const hotel_options = [
    { name: `Riad ${city} Palace`, address, price: hotelPrice, rating: "4.8", description: `Traditional stay with courtyard charm in ${city}.` },
    { name: `${city} Grand Hotel`, address, price: hotelPrice, rating: "4.6", description: `Comfortable hotel close to the main sights of ${city}.` },
    { name: `${city} Boutique Retreat`, address, price: hotelPrice, rating: "4.7", description: `Stylish rooms, local design, and easy access to the city center.` },
  ].map((item) => withImage(item, city, "hotel"));

  const restaurant_options = [
    { name: `Dar ${city} Restaurant`, address, price: "100-220 MAD", cuisine: "Moroccan", rating: "4.6", description: "Classic Moroccan dishes in a warm local setting." },
    { name: `${city} Rooftop Kitchen`, address, price: "120-260 MAD", cuisine: "Moroccan Fusion", rating: "4.5", description: "Terrace dining with fresh salads, tagines, and city views." },
    { name: `Cafe Central ${city}`, address, price: "60-140 MAD", cuisine: "Cafe", rating: "4.4", description: "Casual stop for mint tea, pastries, and light meals." },
  ].map((item) => withImage(item, city, "restaurant"));

  const hostel_options = [
    { name: `${city} Medina Hostel`, address, price: "120-250 MAD / night", rating: "4.3", description: "Friendly shared accommodation for budget travelers." },
    { name: `${city} Backpackers Auberge`, address, price: "100-220 MAD / night", rating: "4.2", description: "Simple rooms, social spaces, and helpful local staff." },
  ].map((item) => withImage(item, city, "hostel"));

  const camping_options = [
    { name: `${city} Nature Camp`, address, price: "250-600 MAD / night", rating: "4.4", description: "Outdoor stay option near scenic landscapes around the destination." },
  ].map((item) => withImage(item, city, "camping hiking"));

  const itinerary = Array.from({ length: days }, (_, dayIndex) => ({
    day: getLabel(safeLang, `Day ${dayIndex + 1}`, `Jour ${dayIndex + 1}`, `Jour ${dayIndex + 1}`),
    plan: activityPool.map(([time, place, details, ticket_pricing, rating]) => ({
      time,
      place: `${place}, ${city}`,
      details,
      ticket_pricing,
      rating,
      image_url: getMoroccoImageByText(city, place),
    })),
  }));

  return {
    hotel_options,
    restaurant_options,
    hostel_options,
    camping_options,
    itinerary,
    metadata: {
      source: "mock",
      traveler,
      budget,
      lang: safeLang,
    },
  };
};

const safeArray = (value) => (Array.isArray(value) ? value.filter(Boolean) : []);

export const normalizeTripData = (rawData, fallbackArgs = {}) => {
  const fallback = buildMockTripData(
    fallbackArgs.location,
    fallbackArgs.noOfDays,
    fallbackArgs.traveler,
    fallbackArgs.budget,
    fallbackArgs.lang || "FR"
  );

  if (!rawData || typeof rawData !== "object") return fallback;

  const itinerary = safeArray(rawData.itinerary)
    .map((dayItem, dayIndex) => ({
      day:
        dayItem?.day ||
        (fallbackArgs.lang === "EN" ? `Day ${dayIndex + 1}` : `Jour ${dayIndex + 1}`),
      plan: safeArray(dayItem?.plan).filter((place) => place && typeof place === "object"),
    }))
    .filter((dayItem) => dayItem.plan.length > 0);

  if (safeArray(rawData.hotel_options).length === 0 || itinerary.length === 0) return fallback;

  return {
    ...fallback,
    ...rawData,
    hotel_options: safeArray(rawData.hotel_options).map((item) =>
      withImage(item, fallbackArgs.location || "Marrakech", "hotel")
    ),
    restaurant_options: safeArray(rawData.restaurant_options).map((item) =>
      withImage(item, fallbackArgs.location || "Marrakech", "restaurant")
    ),
    hostel_options: safeArray(rawData.hostel_options).map((item) =>
      withImage(item, fallbackArgs.location || "Marrakech", "hostel")
    ),
    camping_options: safeArray(rawData.camping_options).map((item) =>
      withImage(item, fallbackArgs.location || "Marrakech", "camping hiking")
    ),
    itinerary,
    metadata: {
      ...(rawData.metadata || {}),
      source: rawData?.metadata?.source || "ai",
    },
  };
};