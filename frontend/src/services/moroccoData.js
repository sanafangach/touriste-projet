export const MOROCCO_CITIES = [
  "Agadir",
  "Atlantic Coast",
  "Atlas Mountains",
  "Casablanca",
  "Fez",
  "Marrakech",
  "Chefchaouen",
  "Essaouira",
  "Merzouga",
  "Rabat",
  "Tangier",
  "Tiznit",
];

const DATA_CITY_ALIASES = {
  Fez: "Fes",
  "Atlantic Coast": "Essaouira",
  Tiznit: "Agadir",
};

const getDataCity = (cityName = "") => DATA_CITY_ALIASES[cityName] || cityName;

export const CITY_CATEGORIES = {
  Marrakech: "imperial",
  Fes: "imperial",
  Fez: "imperial",
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
  "Atlantic Coast": "beach",
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
  Tiznit: "beach",
  "Bin El Ouidane": "nature",
};

export const getCityCategory = (cityName = "") => CITY_CATEGORIES[cityName] || CITY_CATEGORIES[getDataCity(cityName)] || "imperial";

export const CITY_IMAGE_MAP = {
  Marrakech: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1400&q=80",
  Fes: "https://images.unsplash.com/photo-1631545806603-066f6a1940c0?auto=format&fit=crop&w=1400&q=80",
  Fez: "https://images.unsplash.com/photo-1631545806603-066f6a1940c0?auto=format&fit=crop&w=1400&q=80",
  Chefchaouen: "https://images.unsplash.com/photo-1611150218086-2f9058df7297?auto=format&fit=crop&w=1400&q=80",
  Agadir: "https://images.unsplash.com/photo-1664020206760-b45f9f271594?auto=format&fit=crop&w=1400&q=80",
  "Atlantic Coast": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80",
  Tangier: "https://images.unsplash.com/photo-1687943625788-b4de67f5ef92?auto=format&fit=crop&w=1400&q=80",
  Merzouga: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=80",
  Ouarzazate: "https://images.unsplash.com/photo-1709291535925-572d879ca759?auto=format&fit=crop&w=1400&q=80",
  Casablanca: "https://images.unsplash.com/photo-1567601380901-7db4f9f23be7?auto=format&fit=crop&w=1400&q=80",
  Rabat: "https://images.unsplash.com/photo-1705155227717-ec5f8d85666a?auto=format&fit=crop&w=1400&q=80",
  Essaouira: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80",
  Tiznit: "https://images.unsplash.com/photo-1664020206760-b45f9f271594?auto=format&fit=crop&w=1400&q=80",
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
  Merzouga: [
    { name: "Kasbah Hotel Tombouctou", price: "1.100 MAD", rating: "4.4", reviews: "1,1 k", source: "Google Maps" },
    { name: "Kanz Erremal", price: "950 MAD", rating: "4.4", reviews: "1,4 k", source: "Google Maps" },
    { name: "Riad Madu", price: "1.400 MAD", rating: "4.7", reviews: "900", source: "Google Maps" },
    { name: "Sahara Stars Camp", price: "650 MAD", rating: "4.8", reviews: "600", source: "Google Maps" },
    { name: "Luxury Desert Camp Merzouga", price: "1.200 MAD", rating: "4.7", reviews: "850", source: "Google Maps" },
  ],
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
    { name: "Auberge Kasbah Chez Amaliya", price: "560 MAD", rating: "4.0", reviews: "220", source: "Tripadvisor" },
    { name: "Hotel Saint Antoine Tafraoute", price: "450 MAD", rating: "4.0", reviews: "450", source: "Google Maps" },
    { name: "Maison Tigmi Ozro", price: "520 MAD", rating: "4.6", reviews: "400", source: "Google Maps" },
  ],
  "Bin El Ouidane": [
    { name: "Widiane Resort", price: "2.000 MAD", rating: "4.4", reviews: "1,8 k", source: "Google Maps" },
    { name: "Chems du Lac Bin El Ouidane", price: "850 MAD", rating: "4.0", reviews: "1 k", source: "Google Maps" },
  ],
  Tiznit: [
    { name: "Hotel Idou Tiznit", price: "550 MAD", rating: "4.0", reviews: "950", source: "Google Maps" },
    { name: "Riad Assounfou", price: "600 MAD", rating: "4.5", reviews: "450", source: "Google Maps" },
    { name: "Maison d'Hotes Le Lieu", price: "480 MAD", rating: "4.3", reviews: "200", source: "Google Maps" },
  ],
  "Atlantic Coast": [
    { name: "La Sultana Oualidia", price: "4.500 MAD", rating: "4.8", reviews: "800", source: "Google Maps" },
    { name: "Chateau Eden El Rouh", price: "1.200 MAD", rating: "4.2", reviews: "600", source: "Google Maps" },
    { name: "L'Hippocampe Oualidia", price: "900 MAD", rating: "4.0", reviews: "500", source: "Google Maps" },
  ],
};

const REAL_RESTAURANTS_BY_CITY = {
  Marrakech: [
    { name: "Nomad Marrakech", price: "150-250 MAD", cuisine: "Moroccan", rating: "4.1", address: "1 Derb Aarjane, Marrakech", description: "Modern Moroccan dining near the medina with a rooftop terrace." },
    { name: "Le Jardin Marrakech", price: "160-280 MAD", cuisine: "Moroccan", rating: "4.2", address: "32 Souk Jeld Sidi Abdelaziz, Marrakech", description: "Garden restaurant serving Moroccan dishes in a calm riad setting." },
    { name: "Cafe Clock Marrakech", price: "90-180 MAD", cuisine: "Moroccan Cafe", rating: "4.4", address: "224 Derb Chtouka, Marrakech", description: "Casual cultural cafe known for Moroccan plates and live events." },
    { name: "Al Fassia Aguedal", price: "250-400 MAD", cuisine: "Moroccan", rating: "4.5", address: "9bis Route de l'Ourika, Marrakech", description: "Well-known Moroccan restaurant with classic service and traditional cuisine." },
    { name: "La Mamounia Restaurant", price: "400-800 MAD", cuisine: "Moroccan Fine Dining", rating: "4.7", address: "Avenue Bab Jdid, Marrakech", description: "Legendary palace hotel restaurant with exquisite Moroccan and French cuisine." },
    { name: "Restaurant Dar Moha", price: "350-600 MAD", cuisine: "Moroccan Fusion", rating: "4.5", address: "81 Rue Dar el Bacha, Marrakech", description: "Upscale poolside dining in a historic riad with creative Moroccan dishes." },
  ],
  Casablanca: [
    { name: "La Sqala", price: "120-240 MAD", cuisine: "Moroccan", rating: "4.2", address: "Boulevard des Almohades, Casablanca", description: "Moroccan restaurant set in a historic fortified garden." },
    { name: "Rick's Cafe", price: "300-500 MAD", cuisine: "International", rating: "4.3", address: "248 Boulevard Sour Jdid, Casablanca", description: "Iconic Casablanca restaurant with refined dining and piano-bar atmosphere." },
    { name: "Le Cabestan", price: "400-700 MAD", cuisine: "Seafood", rating: "4.3", address: "90 Boulevard de la Corniche, Casablanca", description: "Oceanfront restaurant with seafood and Atlantic views." },
    { name: "Restaurant Al Mounia", price: "200-350 MAD", cuisine: "Moroccan", rating: "4.4", address: "95 Rue du Prince Moulay Abdallah, Casablanca", description: "Classic Moroccan restaurant with traditional decor and refined tagines." },
    { name: "La Bavaroise", price: "150-280 MAD", cuisine: "French Moroccan", rating: "4.1", address: "133 Rue Allal Ben Abdellah, Casablanca", description: "Historic brasserie serving French and Moroccan cuisine since the 1930s." },
  ],
  Agadir: [
    { name: "Pure Passion Restaurant", price: "250-450 MAD", cuisine: "Seafood", rating: "4.4", address: "Marina d'Agadir, Agadir", description: "Popular marina restaurant focused on fresh seafood." },
    { name: "Le Jardin d'Eau", price: "160-300 MAD", cuisine: "Moroccan Seafood", rating: "4.1", address: "Boulevard du 20 Aout, Agadir", description: "Relaxed restaurant with Moroccan and seafood dishes." },
    { name: "Restaurant Daffy", price: "80-170 MAD", cuisine: "Moroccan", rating: "4.3", address: "Rue des Orangers, Agadir", description: "Local favorite for affordable Moroccan meals." },
    { name: "Restaurant Le Tapis Rouge", price: "200-380 MAD", cuisine: "Moroccan International", rating: "4.2", address: "Avenue Hassan II, Agadir", description: "Elegant restaurant with varied menu and live entertainment." },
    { name: "Chez Mimi La Brochette", price: "100-200 MAD", cuisine: "Grills", rating: "4.3", address: "Promenade de la Plage, Agadir", description: "Beachfront grill restaurant known for fresh brochettes and seafood." },
  ],
  Fes: [
    { name: "Cafe Clock Fes", price: "90-180 MAD", cuisine: "Moroccan Cafe", rating: "4.4", address: "7 Derb el Magana, Fes", description: "Well-known medina cafe with Moroccan plates and cultural events." },
    { name: "The Ruined Garden", price: "180-320 MAD", cuisine: "Moroccan", rating: "4.4", address: "15 Derb Idrissy Sidi Ahmed Chaoui, Fes", description: "Garden restaurant in the medina with traditional Moroccan cooking." },
    { name: "Restaurant Dar Hatim", price: "220-350 MAD", cuisine: "Moroccan", rating: "4.7", address: "19 Derb Ezaouia Fandak Lihoudi, Fes", description: "Family-run restaurant famous for home-style Moroccan cuisine." },
    { name: "Palais de Fes Restaurant", price: "300-500 MAD", cuisine: "Moroccan Fine Dining", rating: "4.5", address: "15 Makhfia, Fes", description: "Palatial restaurant with panoramic views and refined Fassi cuisine." },
    { name: "Restaurant Dar Roumana", price: "250-450 MAD", cuisine: "Moroccan Fusion", rating: "4.6", address: "30 Derb el Amer Zkak Roumane, Fes", description: "Intimate riad dining with creative Moroccan-Mediterranean fusion." },
  ],
  Tangier: [
    { name: "El Morocco Club", price: "250-450 MAD", cuisine: "Moroccan International", rating: "4.3", address: "Place du Tabor, Tangier", description: "Elegant restaurant and piano bar in the kasbah." },
    { name: "Saveur de Poisson", price: "250-350 MAD", cuisine: "Seafood", rating: "4.4", address: "2 Escalier Waller, Tangier", description: "Famous fixed-menu seafood restaurant in Tangier." },
    { name: "Cafe Hafa", price: "40-100 MAD", cuisine: "Cafe", rating: "4.2", address: "Rue Hafa, Tangier", description: "Historic cliffside cafe known for mint tea and sea views." },
    { name: "Le Nabab", price: "150-280 MAD", cuisine: "Moroccan", rating: "4.1", address: "4 Rue Al Kadiria, Tangier", description: "Medina restaurant with traditional Moroccan cuisine and warm atmosphere." },
    { name: "Restaurant Populaire Saveur de Poisson", price: "100-180 MAD", cuisine: "Seafood", rating: "4.3", address: "Rue de la Kasbah, Tangier", description: "No-menu seafood restaurant with fresh daily catches." },
  ],
  Rabat: [
    { name: "Dar Naji", price: "100-220 MAD", cuisine: "Moroccan", rating: "4.2", address: "Avenue Jazirat Al Arabe, Rabat", description: "Popular Moroccan restaurant for tagines, couscous, and tea." },
    { name: "Le Dhow", price: "250-450 MAD", cuisine: "International", rating: "4.1", address: "Quai de Bouregreg, Rabat", description: "Restaurant boat with river views and varied cuisine." },
    { name: "Ty Potes", price: "160-280 MAD", cuisine: "French Moroccan", rating: "4.4", address: "11 Rue Ghafsa, Rabat", description: "Cozy restaurant with fresh plates and garden seating." },
    { name: "Dar Zaki", price: "120-240 MAD", cuisine: "Moroccan", rating: "4.3", address: "Rue Patrice Lumumba, Rabat", description: "Well-known Moroccan restaurant with courtyard dining and generous portions." },
    { name: "Restaurant Cosmopolitan", price: "200-380 MAD", cuisine: "International", rating: "4.2", address: "Avenue Mohammed V, Rabat", description: "Modern restaurant with international and Moroccan fusion cuisine." },
  ],
  Essaouira: [
    { name: "La Table by Madada", price: "250-450 MAD", cuisine: "Seafood", rating: "4.5", address: "7 Rue Youssef El Fassi, Essaouira", description: "Refined seafood restaurant close to the port and medina." },
    { name: "Taros", price: "180-350 MAD", cuisine: "Moroccan International", rating: "4.1", address: "Place Moulay Hassan, Essaouira", description: "Rooftop restaurant with sea views and live music." },
    { name: "Restaurant Adwak", price: "90-190 MAD", cuisine: "Moroccan", rating: "4.4", address: "2 Rue Moulay Hassan, Essaouira", description: "Small medina restaurant serving Moroccan classics." },
    { name: "Les Alizés Mogador", price: "120-240 MAD", cuisine: "Moroccan Seafood", rating: "4.2", address: "26 Rue de la Skala, Essaouira", description: "Terrace restaurant overlooking the ramparts with fresh seafood." },
    { name: "Triskala Cafe", price: "70-150 MAD", cuisine: "Cafe", rating: "4.3", address: "Rue Touahen, Essaouira", description: "Bohemian cafe with light meals, pastries, and artistic atmosphere." },
  ],
  Chefchaouen: [
    { name: "Cafe Clock Chefchaouen", price: "80-170 MAD", cuisine: "Moroccan Cafe", rating: "4.5", address: "3 Derb Tijani, Chefchaouen", description: "Cultural cafe with Moroccan food and rooftop views." },
    { name: "Restaurant Beldi Bab Ssour", price: "70-150 MAD", cuisine: "Moroccan", rating: "4.5", address: "5 Rue El Kharrazin, Chefchaouen", description: "Affordable Moroccan restaurant in the blue medina." },
    { name: "Casa Aladdin", price: "90-180 MAD", cuisine: "Moroccan", rating: "4.0", address: "Rue Targui, Chefchaouen", description: "Medina restaurant with terrace views and traditional dishes." },
    { name: "Restaurant Aladdin Food", price: "60-130 MAD", cuisine: "Moroccan", rating: "4.2", address: "Place Outa el Hammam, Chefchaouen", description: "Budget restaurant on the main square with hearty portions." },
    { name: "Sofia Restaurant", price: "100-200 MAD", cuisine: "Moroccan International", rating: "4.1", address: "Rue Moulay Ali Ben Rachid, Chefchaouen", description: "Cozy restaurant with mountain views and mixed cuisine." },
  ],
  Merzouga: [
    { name: "Restaurant Nora", price: "80-160 MAD", cuisine: "Moroccan", rating: "4.3", address: "Centre Merzouga", description: "Small family restaurant with generous tagines and desert hospitality." },
    { name: "Cafe Restaurant Chez Ali", price: "70-140 MAD", cuisine: "Moroccan", rating: "4.2", address: "Route d'Erfoud, Merzouga", description: "Local spot with simple Moroccan dishes and terrace views of the dunes." },
    { name: "Restaurant Erg Chebbi", price: "90-180 MAD", cuisine: "Moroccan Berber", rating: "4.4", address: "Hassilabied, Merzouga", description: "Berber cuisine served in a traditional setting near the Erg Chebbi dunes." },
    { name: "Cafe des Dunes", price: "60-120 MAD", cuisine: "Cafe", rating: "4.1", address: "Centre Merzouga", description: "Casual cafe with juices, pastries, and light desert meals." },
  ],
  Ouarzazate: [
    { name: "Restaurant Douyria", price: "120-220 MAD", cuisine: "Moroccan", rating: "4.3", address: "Avenue Mohammed V, Ouarzazate", description: "Popular restaurant with Moroccan tagines and courtyard dining." },
    { name: "Chez Dimitri", price: "150-280 MAD", cuisine: "Moroccan International", rating: "4.2", address: "22 Avenue Mohammed V, Ouarzazate", description: "Historic restaurant since 1928 with Moroccan and international dishes." },
    { name: "Restaurant La Kasbah", price: "100-200 MAD", cuisine: "Moroccan", rating: "4.1", address: "Avenue Moulay Rachid, Ouarzazate", description: "Casual dining with views towards the kasbah and Atlas Mountains." },
    { name: "Habous Restaurant", price: "80-160 MAD", cuisine: "Moroccan", rating: "4.0", address: "Centre Ville, Ouarzazate", description: "Budget-friendly local restaurant with generous portions." },
  ],
  Ifrane: [
    { name: "Restaurant La Paix", price: "120-240 MAD", cuisine: "Moroccan French", rating: "4.3", address: "Avenue de la Marche Verte, Ifrane", description: "Cozy restaurant with Moroccan and French dishes in a mountain setting." },
    { name: "Cafe Restaurant du Centre", price: "80-160 MAD", cuisine: "Moroccan", rating: "4.1", address: "Centre Ville, Ifrane", description: "Central restaurant with traditional tagines and warm atmosphere." },
    { name: "Restaurant Michlifen", price: "250-450 MAD", cuisine: "Moroccan Fine Dining", rating: "4.5", address: "Michlifen Resort, Ifrane", description: "Upscale dining in a mountain resort with refined Moroccan cuisine." },
  ],
  Dakhla: [
    { name: "Restaurant La Brise", price: "120-250 MAD", cuisine: "Seafood", rating: "4.4", address: "Boulevard Mohammed V, Dakhla", description: "Fresh seafood restaurant with lagoon views and grilled fish." },
    { name: "Cafe Ocean", price: "80-180 MAD", cuisine: "Moroccan Seafood", rating: "4.2", address: "Port de Dakhla", description: "Casual seafood spot near the port with fresh catches daily." },
    { name: "Restaurant PK25", price: "150-300 MAD", cuisine: "Seafood", rating: "4.5", address: "Lagune de Dakhla", description: "Iconic lagoon restaurant accessible by boat with premium seafood." },
    { name: "Villa Dakhla Restaurant", price: "200-400 MAD", cuisine: "International", rating: "4.3", address: "Zone Touristique, Dakhla", description: "Elegant restaurant with varied cuisine and desert-ocean atmosphere." },
  ],
  Tetouan: [
    { name: "Restaurant Restinga", price: "120-250 MAD", cuisine: "Moroccan Seafood", rating: "4.3", address: "Place Hassan II, Tetouan", description: "Popular restaurant in the old medina with seafood and Moroccan dishes." },
    { name: "Blanco Riad Restaurant", price: "180-320 MAD", cuisine: "Moroccan", rating: "4.4", address: "25 Rue Zawiya Kadiriya, Tetouan", description: "Riad restaurant with refined Moroccan cuisine in a white-washed setting." },
    { name: "Restaurant Saigon", price: "90-180 MAD", cuisine: "Moroccan International", rating: "4.1", address: "Avenue Mohammed V, Tetouan", description: "Local favorite with mixed cuisine and terrace seating." },
  ],
  "Al Hoceima": [
    { name: "Restaurant Club Nautique", price: "150-300 MAD", cuisine: "Seafood", rating: "4.3", address: "Plage Quemado, Al Hoceima", description: "Beachfront restaurant with fresh Mediterranean seafood." },
    { name: "Restaurant La Belle Vue", price: "100-220 MAD", cuisine: "Moroccan", rating: "4.1", address: "Boulevard Mohammed V, Al Hoceima", description: "Terrace restaurant with bay views and Moroccan classics." },
    { name: "Cafe Restaurant Rif", price: "70-150 MAD", cuisine: "Moroccan Cafe", rating: "4.0", address: "Centre Ville, Al Hoceima", description: "Casual cafe with affordable meals and mountain views." },
  ],
  Zagora: [
    { name: "Restaurant Timbuktu", price: "80-160 MAD", cuisine: "Moroccan Berber", rating: "4.2", address: "Avenue Mohammed V, Zagora", description: "Desert-themed restaurant with tagines and Berber specialties." },
    { name: "Cafe Restaurant La Palmeraie", price: "70-140 MAD", cuisine: "Moroccan", rating: "4.1", address: "Route de M'hamid, Zagora", description: "Simple restaurant near the palm grove with traditional dishes." },
    { name: "Restaurant Chez Didi", price: "90-180 MAD", cuisine: "Moroccan", rating: "4.3", address: "Centre Zagora", description: "Welcoming family restaurant known for generous couscous and tajines." },
  ],
  Meknes: [
    { name: "Restaurant Riad Bahia", price: "150-280 MAD", cuisine: "Moroccan", rating: "4.4", address: "Tiberbarine, Meknes", description: "Elegant riad restaurant with traditional Meknassi cuisine." },
    { name: "Restaurant Zitouna", price: "100-200 MAD", cuisine: "Moroccan", rating: "4.2", address: "44 Rue Jamaa Zitouna, Meknes", description: "Medina restaurant serving classic Moroccan dishes and fresh salads." },
    { name: "Palais Terrab", price: "200-350 MAD", cuisine: "Moroccan Fine Dining", rating: "4.5", address: "Derb Sidi Amar, Meknes", description: "Palatial dining experience in a restored Moroccan palace." },
    { name: "Cafe Colombo", price: "60-130 MAD", cuisine: "Cafe", rating: "4.0", address: "Place El Hedim, Meknes", description: "Historic cafe on the main square with coffee, pastries, and views." },
  ],
  Asilah: [
    { name: "Restaurant Casa Garcia", price: "180-350 MAD", cuisine: "Seafood", rating: "4.4", address: "4 Rue Moulay Hassan Ben El Mehdi, Asilah", description: "Well-known seafood restaurant in the old medina." },
    { name: "Restaurant Al Alba", price: "120-240 MAD", cuisine: "Moroccan", rating: "4.2", address: "Rue Ibn Rochd, Asilah", description: "Colorful restaurant with medina views and Moroccan plates." },
    { name: "Cafe Essaada", price: "60-120 MAD", cuisine: "Cafe", rating: "4.1", address: "Place Zellaqa, Asilah", description: "Casual square cafe popular with locals for coffee and light meals." },
  ],
  "Ait Ben Haddou": [
    { name: "Restaurant La Kasbah Ait Ben Haddou", price: "90-180 MAD", cuisine: "Moroccan Berber", rating: "4.2", address: "Face Kasbah, Ait Ben Haddou", description: "Restaurant with views of the famous ksar and traditional Berber dishes." },
    { name: "Chez Brahim", price: "80-160 MAD", cuisine: "Moroccan", rating: "4.3", address: "Route d'Ait Ben Haddou", description: "Popular lunch stop for tourists with rooftop terrace overlooking the kasbah." },
    { name: "Restaurant Baraka", price: "70-140 MAD", cuisine: "Moroccan", rating: "4.1", address: "Douar Ait Ben Haddou", description: "Simple village restaurant with homestyle tagines and fresh bread." },
  ],
  Saidia: [
    { name: "Restaurant Marina Saidia", price: "150-300 MAD", cuisine: "Seafood", rating: "4.2", address: "Marina de Saidia", description: "Marina restaurant with Mediterranean seafood and sunset views." },
    { name: "Restaurant La Plage", price: "100-220 MAD", cuisine: "Moroccan Seafood", rating: "4.1", address: "Boulevard de la Plage, Saidia", description: "Beachfront dining with grilled fish and Moroccan salads." },
    { name: "Cafe Restaurant L'Etoile", price: "70-150 MAD", cuisine: "Moroccan", rating: "4.0", address: "Centre Ville, Saidia", description: "Local restaurant with affordable tagines and friendly service." },
  ],
  "El Jadida": [
    { name: "Restaurant La Portugaise", price: "180-350 MAD", cuisine: "Seafood", rating: "4.4", address: "Cite Portugaise, El Jadida", description: "Historic restaurant in the Portuguese cistern area with fresh seafood." },
    { name: "Restaurant Le Palais Andalou", price: "120-240 MAD", cuisine: "Moroccan", rating: "4.2", address: "Avenue Al Jaish Al Malaki, El Jadida", description: "Moroccan restaurant with Andalusian decor and traditional dishes." },
    { name: "Restaurant Tchikito", price: "100-200 MAD", cuisine: "Seafood", rating: "4.3", address: "Place Hansali, El Jadida", description: "Popular local restaurant known for grilled seafood platters." },
  ],
  Tarfaya: [
    { name: "Restaurant Cafe Antoine", price: "60-130 MAD", cuisine: "Moroccan", rating: "3.9", address: "Centre Ville, Tarfaya", description: "Simple restaurant with Moroccan meals and ocean views." },
    { name: "Restaurant El Borj", price: "70-150 MAD", cuisine: "Moroccan Seafood", rating: "3.8", address: "Port de Tarfaya", description: "Port restaurant with fresh fish and budget-friendly prices." },
  ],
  Tafraoute: [
    { name: "Restaurant L'Etoile d'Agadir", price: "70-150 MAD", cuisine: "Moroccan", rating: "4.2", address: "Centre Tafraoute", description: "Popular local restaurant with generous tagines and valley atmosphere." },
    { name: "Restaurant Chez Abdel", price: "60-130 MAD", cuisine: "Moroccan Berber", rating: "4.1", address: "Place Centrale, Tafraoute", description: "Budget restaurant with Berber specialties and mountain views." },
    { name: "Cafe Restaurant Le Rocher", price: "80-170 MAD", cuisine: "Moroccan", rating: "4.0", address: "Route de Tiznit, Tafraoute", description: "Restaurant set among granite boulders with scenic terrace dining." },
  ],
  "Bin El Ouidane": [
    { name: "Restaurant du Lac", price: "100-200 MAD", cuisine: "Moroccan", rating: "4.1", address: "Bin El Ouidane", description: "Lakeside restaurant with fresh fish from the dam and mountain views." },
    { name: "Restaurant Widiane", price: "250-450 MAD", cuisine: "Moroccan Fine Dining", rating: "4.4", address: "Widiane Resort, Bin El Ouidane", description: "Upscale resort restaurant with panoramic lake views and refined cuisine." },
  ],
  "Ouzoud Falls": [
    { name: "Restaurant Les Cascades", price: "70-150 MAD", cuisine: "Moroccan", rating: "4.1", address: "Cascades d'Ouzoud", description: "Simple restaurant near the waterfalls with traditional tagines and fresh juices." },
    { name: "Cafe Panorama Ouzoud", price: "50-120 MAD", cuisine: "Cafe", rating: "4.0", address: "Cascades d'Ouzoud", description: "Terrace cafe overlooking the falls with mint tea and light meals." },
  ],
  Akchour: [
    { name: "Restaurant Cascade Akchour", price: "60-130 MAD", cuisine: "Moroccan", rating: "4.1", address: "Route d'Akchour", description: "Simple mountain restaurant near the waterfalls with homestyle cooking." },
    { name: "Cafe Porte de l'Enfer", price: "40-90 MAD", cuisine: "Cafe", rating: "4.0", address: "Pont de Dieu, Akchour", description: "Trail-side cafe serving tea, snacks, and light meals for hikers." },
  ],
  "Atlas Mountains": [
    { name: "Kasbah du Toubkal Restaurant", price: "200-380 MAD", cuisine: "Moroccan Berber", rating: "4.6", address: "Imlil, Atlas Mountains", description: "Mountain lodge restaurant with panoramic views and refined Berber cuisine." },
    { name: "Restaurant Chez Jilali", price: "80-160 MAD", cuisine: "Moroccan", rating: "4.3", address: "Imlil, Atlas Mountains", description: "Village restaurant with hearty mountain meals and warm hospitality." },
    { name: "Cafe Atlas Toubkal", price: "50-120 MAD", cuisine: "Cafe", rating: "4.1", address: "Armed, Atlas Mountains", description: "Trekker-friendly cafe with fresh juices, sandwiches, and valley views." },
  ],
  "Paradise Valley": [
    { name: "Restaurant Paradise Valley", price: "70-150 MAD", cuisine: "Moroccan", rating: "4.1", address: "Paradise Valley, Imouzzer Ida Outanane", description: "Valley restaurant with fresh tagines and natural pool views." },
    { name: "Cafe des Cascades", price: "50-110 MAD", cuisine: "Cafe", rating: "4.0", address: "Paradise Valley", description: "Simple cafe near the natural pools with refreshments and snacks." },
  ],
  Legzira: [
    { name: "Restaurant Legzira Beach", price: "80-170 MAD", cuisine: "Moroccan Seafood", rating: "4.2", address: "Plage de Legzira", description: "Beach restaurant with grilled fish and views of the famous arches." },
    { name: "Cafe Auberge Legzira", price: "60-130 MAD", cuisine: "Moroccan", rating: "4.0", address: "Legzira", description: "Casual beachside spot with Moroccan classics and ocean breeze." },
  ],
  Volubilis: [
    { name: "Restaurant Volubilis", price: "90-180 MAD", cuisine: "Moroccan", rating: "4.1", address: "Moulay Idriss Zerhoun", description: "Restaurant near the Roman ruins with traditional Moroccan dishes." },
    { name: "Cafe Volubilis View", price: "50-110 MAD", cuisine: "Cafe", rating: "4.0", address: "Moulay Idriss Zerhoun", description: "Terrace cafe with views over the archaeological site and olive groves." },
  ],
  Tiznit: [
    { name: "Restaurant Riad Tiznit", price: "100-200 MAD", cuisine: "Moroccan", rating: "4.2", address: "Medina de Tiznit", description: "Riad restaurant with traditional silver-city cuisine and courtyard dining." },
    { name: "Restaurant L'Oasis", price: "70-150 MAD", cuisine: "Moroccan", rating: "4.0", address: "Avenue du 20 Aout, Tiznit", description: "Local restaurant known for its fresh tagines and warm ambiance." },
    { name: "Cafe Restaurant La Perle du Sud", price: "60-130 MAD", cuisine: "Moroccan Cafe", rating: "4.1", address: "Place du Mechouar, Tiznit", description: "Central cafe with light meals, pastries, and mint tea." },
  ],
  "Atlantic Coast": [
    { name: "La Table by Madada", price: "250-450 MAD", cuisine: "Seafood", rating: "4.5", address: "7 Rue Youssef El Fassi, Essaouira", description: "Refined seafood restaurant close to the port and medina." },
    { name: "Taros", price: "180-350 MAD", cuisine: "Moroccan International", rating: "4.1", address: "Place Moulay Hassan, Essaouira", description: "Rooftop restaurant with sea views and live music." },
    { name: "Restaurant Adwak", price: "90-190 MAD", cuisine: "Moroccan", rating: "4.4", address: "2 Rue Moulay Hassan, Essaouira", description: "Small medina restaurant serving Moroccan classics." },
  ],
};

const REAL_HOSTELS_BY_CITY = {
  Marrakech: [
    { name: "Rodamon Riad Marrakech Hostel", price: "180-450 MAD / night", rating: "4.5", address: "Amssafah 32, Marrakech", description: "Design hostel in a riad with dorms, private rooms, and a pool." },
    { name: "Equity Point Marrakech", price: "160-380 MAD / night", rating: "4.2", address: "80 Derb El Hammam Mouassine, Marrakech", description: "Medina hostel with rooftop spaces and budget rooms." },
    { name: "The Central House Marrakech Medina", price: "220-520 MAD / night", rating: "4.5", address: "Amssafah 84, Marrakech", description: "Modern hostel-riad with social areas and private-room options." },
    { name: "Waka Waka Hostel Marrakech", price: "140-350 MAD / night", rating: "4.3", address: "42 Derb El Ferrane, Marrakech", description: "Social hostel with pool, communal kitchen, and organized tours." },
  ],
  Casablanca: [
    { name: "HI Casablanca Hostel", price: "150-380 MAD / night", rating: "4.1", address: "6 Place Ahmed El Bidaoui, Casablanca", description: "Central hostel near the medina with clean dorms and shared spaces." },
    { name: "Youth Hostel Casablanca", price: "120-300 MAD / night", rating: "3.9", address: "6 Place Amiral Philibert, Casablanca", description: "Budget accommodation in the city center with basic facilities." },
    { name: "Hostel Dar El Kebira", price: "180-400 MAD / night", rating: "4.2", address: "44 Rue Farhat Hachad, Casablanca", description: "Modern hostel with private rooms and social common areas." },
  ],
  Agadir: [
    { name: "Agadir Surf Hostel", price: "130-320 MAD / night", rating: "4.3", address: "Taghazout, Agadir", description: "Surf-oriented hostel near Taghazout with terrace and board storage." },
    { name: "Backpackers Agadir", price: "100-280 MAD / night", rating: "4.0", address: "Rue des Orangers, Agadir", description: "Budget hostel in the center with dorms and rooftop terrace." },
    { name: "Hostel La Pergola Agadir", price: "150-350 MAD / night", rating: "4.1", address: "Boulevard du 20 Aout, Agadir", description: "Well-located hostel near the beach with garden and shared kitchen." },
  ],
  Rabat: [
    { name: "Hostel Rabat Youth", price: "120-300 MAD / night", rating: "4.1", address: "43 Rue Jbala, Rabat", description: "Central hostel in the medina with rooftop views and shared rooms." },
    { name: "Backpackers Rabat", price: "100-280 MAD / night", rating: "4.0", address: "Rue Souika, Rabat", description: "Budget hostel near the kasbah with communal kitchen and terrace." },
    { name: "Medina Hostel Rabat", price: "140-350 MAD / night", rating: "4.2", address: "28 Derb El Jama, Rabat", description: "Traditional riad-style hostel with courtyard and affordable rooms." },
  ],
  Fes: [
    { name: "Funky Fes Hostel", price: "120-320 MAD / night", rating: "4.2", address: "60 Arset Lamdelssi, Fes", description: "Budget hostel in Fes medina with dorms and terrace." },
    { name: "Medina Social Club", price: "180-420 MAD / night", rating: "4.3", address: "11 Derb El Menia, Fes", description: "Social hostel and riad with events and shared rooms." },
    { name: "Hostel Dar Bouemlanine", price: "130-300 MAD / night", rating: "4.1", address: "Derb Bouemlanine, Fes", description: "Traditional medina hostel with rooftop views and budget dorms." },
  ],
  Essaouira: [
    { name: "The Chill Art Hostel", price: "120-350 MAD / night", rating: "4.3", address: "22 Rue Abderrahamane Eddakhil, Essaouira", description: "Creative medina hostel with terrace and dorm rooms." },
    { name: "Essaouira Beach Hostel", price: "110-300 MAD / night", rating: "4.1", address: "Rue Lalla Hasna, Essaouira", description: "Budget hostel close to the beach and surf spots." },
    { name: "Hostel Mogador", price: "100-280 MAD / night", rating: "4.0", address: "Rue Sidi Magdoul, Essaouira", description: "Simple hostel in the medina with shared facilities and warm hospitality." },
  ],
  Chefchaouen: [
    { name: "Hostel Aline", price: "90-220 MAD / night", rating: "4.3", address: "Rue Sidi Ahmed El Ouafi, Chefchaouen", description: "Simple budget hostel in Chefchaouen medina." },
    { name: "Dar Dadicilef", price: "120-300 MAD / night", rating: "4.4", address: "Derb Hadri, Chefchaouen", description: "Traditional guesthouse with hostel-style budget rooms." },
    { name: "Hostel Olé Chefchaouen", price: "100-250 MAD / night", rating: "4.2", address: "Rue Hassan I, Chefchaouen", description: "Colorful hostel in the blue city with terrace and communal areas." },
  ],
  Tangier: [
    { name: "The Riad Hostel Tangier", price: "130-350 MAD / night", rating: "4.3", address: "23 Rue Mohamed Bergach, Tangier", description: "Medina hostel with terrace views and shared rooms." },
    { name: "Tangier Kasbah Hostel", price: "120-320 MAD / night", rating: "4.1", address: "Rue Sidi Jalil, Tangier", description: "Budget hostel near the kasbah and medina." },
    { name: "Hostel Dar Baibou Tangier", price: "140-350 MAD / night", rating: "4.2", address: "Rue Dar Baroud, Tangier", description: "Traditional hostel with rooftop sea views and communal kitchen." },
  ],
  Merzouga: [
    { name: "Auberge du Sud Merzouga", price: "100-280 MAD / night", rating: "4.2", address: "Centre Merzouga", description: "Budget auberge near the dunes with shared rooms and terrace." },
    { name: "Hostel Sahara Merzouga", price: "80-220 MAD / night", rating: "4.1", address: "Hassilabied, Merzouga", description: "Simple desert hostel with rooftop dune views and camel excursions." },
  ],
  Ouarzazate: [
    { name: "Auberge Atlas Ouarzazate", price: "120-300 MAD / night", rating: "4.0", address: "Avenue Mohammed V, Ouarzazate", description: "Budget auberge in the center with clean rooms and terrace." },
    { name: "Hostel Chez Pascal", price: "100-250 MAD / night", rating: "4.1", address: "Quartier Tassoumaate, Ouarzazate", description: "Friendly hostel with garden, pool, and mountain views." },
  ],
  Meknes: [
    { name: "Hostel Meknes Youth", price: "100-280 MAD / night", rating: "4.0", address: "Rue Rouamzine, Meknes", description: "Central hostel near Place El Hedim with shared rooms and rooftop." },
    { name: "Auberge de Jeunesse Meknes", price: "80-220 MAD / night", rating: "3.9", address: "Avenue Okba Ibn Nafiaa, Meknes", description: "Budget youth hostel with basic facilities and garden." },
  ],
  Dakhla: [
    { name: "Dakhla Spirit Hostel", price: "130-320 MAD / night", rating: "4.3", address: "Boulevard Mohammed V, Dakhla", description: "Wind and kitesurf-oriented hostel with lagoon access." },
    { name: "Auberge Sahara Dakhla", price: "100-250 MAD / night", rating: "4.0", address: "Centre Ville, Dakhla", description: "Simple auberge with desert atmosphere and shared spaces." },
  ],
  Tetouan: [
    { name: "Hostel Blanco Tetouan", price: "110-280 MAD / night", rating: "4.2", address: "Rue Zawiya Kadiriya, Tetouan", description: "White-washed medina hostel with terrace and budget rooms." },
    { name: "Auberge de Jeunesse Tetouan", price: "80-200 MAD / night", rating: "3.8", address: "Avenue de Fes, Tetouan", description: "Basic youth hostel with clean rooms and central location." },
  ],
  "Al Hoceima": [
    { name: "Hostel Al Hoceima Beach", price: "100-280 MAD / night", rating: "4.0", address: "Boulevard Mohammed V, Al Hoceima", description: "Budget hostel near the beach with Mediterranean views." },
    { name: "Auberge Rif Al Hoceima", price: "90-220 MAD / night", rating: "3.9", address: "Centre Ville, Al Hoceima", description: "Simple auberge with clean rooms and terrace." },
  ],
  Zagora: [
    { name: "Auberge Desert Zagora", price: "80-200 MAD / night", rating: "4.1", address: "Route de M'hamid, Zagora", description: "Desert auberge with palm garden and shared rooms." },
    { name: "Hostel Draa Zagora", price: "70-180 MAD / night", rating: "4.0", address: "Centre Zagora", description: "Budget hostel near the valley with terrace and local activities." },
  ],
  Asilah: [
    { name: "Hostel Asilah Medina", price: "100-260 MAD / night", rating: "4.2", address: "Rue Zellaqa, Asilah", description: "Charming medina hostel with artist murals and rooftop." },
    { name: "Auberge de la Plage Asilah", price: "110-280 MAD / night", rating: "4.0", address: "Route de la Plage, Asilah", description: "Beach-side auberge with simple rooms and friendly atmosphere." },
  ],
  Ifrane: [
    { name: "Auberge de Jeunesse Ifrane", price: "80-200 MAD / night", rating: "3.9", address: "Avenue des Tilleuls, Ifrane", description: "Mountain youth hostel with chalet-style rooms and garden." },
    { name: "Hostel Cedar Forest Ifrane", price: "100-280 MAD / night", rating: "4.1", address: "Route du Cedre, Ifrane", description: "Nature hostel near the cedar forest with hiking access." },
  ],
  "Atlas Mountains": [
    { name: "Imlil Hostel", price: "80-220 MAD / night", rating: "4.3", address: "Imlil Village, Atlas Mountains", description: "Trekker hostel at the base of Toubkal with mountain views." },
    { name: "Auberge Atlas Toubkal", price: "100-280 MAD / night", rating: "4.2", address: "Armed, Atlas Mountains", description: "Mountain auberge with terrace and guided trek bookings." },
  ],
  "Ait Ben Haddou": [
    { name: "Auberge Ait Ben Haddou", price: "90-250 MAD / night", rating: "4.1", address: "Douar Ait Ben Haddou", description: "Traditional auberge with kasbah views and basic rooms." },
  ],
  Saidia: [
    { name: "Hostel Marina Saidia", price: "110-300 MAD / night", rating: "4.0", address: "Marina de Saidia", description: "Beach hostel near the marina with shared rooms and terrace." },
  ],
  "El Jadida": [
    { name: "Hostel El Jadida Cite", price: "100-280 MAD / night", rating: "4.0", address: "Cite Portugaise, El Jadida", description: "Budget hostel near the historic Portuguese quarter." },
  ],
  Tiznit: [
    { name: "Auberge de Tiznit", price: "80-220 MAD / night", rating: "4.0", address: "Medina de Tiznit", description: "Simple medina auberge with courtyard and budget rooms." },
    { name: "Hostel Bab el Maader", price: "100-260 MAD / night", rating: "4.1", address: "Bab el Maader, Tiznit", description: "Near the ramparts with terrace views and shared facilities." },
  ],
  "Atlantic Coast": [
    { name: "The Chill Art Hostel", price: "120-350 MAD / night", rating: "4.3", address: "22 Rue Abderrahamane Eddakhil, Essaouira", description: "Creative medina hostel with terrace and dorm rooms." },
    { name: "Essaouira Beach Hostel", price: "110-300 MAD / night", rating: "4.1", address: "Rue Lalla Hasna, Essaouira", description: "Budget hostel close to the beach and surf spots." },
  ],
};

const REAL_CAMPING_BY_CITY = {
  Marrakech: [
    { name: "Terre des Etoiles", price: "900-1800 MAD / night", rating: "4.4", address: "Agafay Desert, Marrakech", description: "Real desert camp in Agafay with tents, pool, and desert views." },
    { name: "Scarabeo Camp", price: "1800-3200 MAD / night", rating: "4.5", address: "Agafay Desert, Marrakech", description: "Luxury canvas camp near Marrakech with desert dining." },
    { name: "Inara Camp", price: "1600-3000 MAD / night", rating: "4.6", address: "Agafay Desert, Marrakech", description: "Glamping camp in Agafay with private tents and activities." },
    { name: "La Pause Marrakech", price: "1200-2400 MAD / night", rating: "4.5", address: "Agafay Desert, Marrakech", description: "Eco-luxury desert lodge with traditional berber tents and pool." },
  ],
  Merzouga: [
    { name: "Sahara Stars Camp", price: "650-1600 MAD / night", rating: "4.8", address: "Erg Chebbi, Merzouga", description: "Desert camp in the dunes near Merzouga." },
    { name: "Luxury Desert Camp Merzouga", price: "1200-2800 MAD / night", rating: "4.7", address: "Erg Chebbi, Merzouga", description: "Luxury camp with private tents and dune views." },
    { name: "Ali & Sara's Desert Palace", price: "900-2000 MAD / night", rating: "4.8", address: "Erg Chebbi, Merzouga", description: "Well-rated desert camp with camel activities and dinner." },
    { name: "Morocco Sahara Luxury Camp", price: "1400-3000 MAD / night", rating: "4.7", address: "Erg Chebbi, Merzouga", description: "Premium glamping with heated tents, en-suite bathrooms, and dune access." },
  ],
  Agadir: [
    { name: "Atlantica Parc", price: "300-900 MAD / night", rating: "4.1", address: "Imi Ouaddar, Agadir", description: "Large seaside camping and holiday park north of Agadir." },
    { name: "Camping Aourir", price: "120-350 MAD / night", rating: "4.0", address: "Aourir, Agadir", description: "Budget camping area near Taghazout and surf beaches." },
    { name: "Camping International Agadir", price: "100-280 MAD / night", rating: "3.9", address: "Boulevard Mohammed V, Agadir", description: "Central camping with basic facilities and beach access." },
  ],
  Essaouira: [
    { name: "Camping Sidi Magdoul", price: "100-300 MAD / night", rating: "3.8", address: "Essaouira", description: "Known camping site near Essaouira beach and town." },
    { name: "Camping Le Calme", price: "180-450 MAD / night", rating: "4.3", address: "Ida Ougourd, Essaouira", description: "Quiet campsite outside Essaouira with simple facilities." },
    { name: "Sidi Kaouki Camp", price: "200-500 MAD / night", rating: "4.2", address: "Sidi Kaouki, Essaouira", description: "Beach camp near surf spot with eco-friendly tents and activities." },
  ],
  Chefchaouen: [
    { name: "Camping Azilan", price: "80-250 MAD / night", rating: "4.0", address: "Ras El Ma, Chefchaouen", description: "Camping spot above Chefchaouen with mountain views." },
    { name: "Camping Municipal Chefchaouen", price: "60-180 MAD / night", rating: "3.8", address: "Route de Ras El Ma, Chefchaouen", description: "Simple municipal campsite with basic facilities and river access." },
  ],
  Tangier: [
    { name: "Camping Tingis Tangier", price: "100-280 MAD / night", rating: "4.0", address: "Route de Cap Spartel, Tangier", description: "Scenic camping near Cap Spartel with forest and ocean views." },
    { name: "Camping Achakar", price: "80-220 MAD / night", rating: "3.9", address: "Grottes d'Hercule, Tangier", description: "Budget camping near the Hercules caves with beach access." },
  ],
  Fes: [
    { name: "Camping Diamant Vert Fes", price: "100-280 MAD / night", rating: "4.0", address: "Route de Sefrou, Fes", description: "Green camping outside Fes with pool and garden setting." },
    { name: "Camping International Fes", price: "80-220 MAD / night", rating: "3.8", address: "Route de Meknes, Fes", description: "Basic campsite with simple facilities and easy city access." },
  ],
  Ouarzazate: [
    { name: "Camping Municipal Ouarzazate", price: "80-220 MAD / night", rating: "3.9", address: "Avenue Mohammed V, Ouarzazate", description: "Central camping with mountain views and basic amenities." },
    { name: "Bivouac Ouarzazate", price: "200-500 MAD / night", rating: "4.2", address: "Route de Tinghir, Ouarzazate", description: "Desert bivouac with traditional tents and stargazing." },
  ],
  Zagora: [
    { name: "Bivouac Sahara Zagora", price: "300-700 MAD / night", rating: "4.3", address: "Route de M'hamid, Zagora", description: "Desert bivouac with camel excursions and traditional dinner." },
    { name: "Camping Prends Ton Temps Zagora", price: "100-280 MAD / night", rating: "4.1", address: "Amezrou, Zagora", description: "Relaxed campsite in the palm grove with shared facilities." },
  ],
  "Atlas Mountains": [
    { name: "Camping Imlil", price: "80-220 MAD / night", rating: "4.1", address: "Imlil, Atlas Mountains", description: "Mountain camping at the base of Toubkal with trekking access." },
    { name: "Bivouac Toubkal Base", price: "200-450 MAD / night", rating: "4.3", address: "Toubkal National Park", description: "High-altitude bivouac camp for serious trekkers and climbers." },
    { name: "Camping Ouirgane", price: "120-300 MAD / night", rating: "4.2", address: "Ouirgane, Atlas Mountains", description: "Valley campsite with river access and mountain panoramas." },
  ],
  Dakhla: [
    { name: "Dakhla Camp Kitesurf", price: "400-900 MAD / night", rating: "4.4", address: "Lagune de Dakhla", description: "Kite-oriented camp on the lagoon with equipment and lessons." },
    { name: "Bivouac White Dune Dakhla", price: "300-700 MAD / night", rating: "4.2", address: "Pointe de la Lagune, Dakhla", description: "Desert-ocean bivouac with unique landscape and wind sports." },
  ],
  "Ait Ben Haddou": [
    { name: "Bivouac Kasbah", price: "200-500 MAD / night", rating: "4.1", address: "Route d'Ait Ben Haddou", description: "Desert bivouac near the historic ksar with traditional tents." },
  ],
  Ifrane: [
    { name: "Camping Cedre Ifrane", price: "100-280 MAD / night", rating: "4.1", address: "Foret du Cedre, Ifrane", description: "Forest camping in the cedar woods with hiking trails nearby." },
  ],
  "Bin El Ouidane": [
    { name: "Camping Lac Bin El Ouidane", price: "80-220 MAD / night", rating: "4.0", address: "Bin El Ouidane", description: "Lakeside camping with fishing, swimming, and mountain views." },
  ],
  "Ouzoud Falls": [
    { name: "Camping Ouzoud", price: "80-220 MAD / night", rating: "4.0", address: "Cascades d'Ouzoud", description: "Simple campsite near the waterfalls with natural swimming pools." },
  ],
  Akchour: [
    { name: "Camping Akchour Nature", price: "60-180 MAD / night", rating: "4.1", address: "Vallee d'Akchour", description: "Mountain camping near the waterfalls with hiking access." },
  ],
  Saidia: [
    { name: "Camping Saidia Beach", price: "100-280 MAD / night", rating: "3.9", address: "Boulevard de la Plage, Saidia", description: "Beach camping with Mediterranean views and basic facilities." },
  ],
  Tiznit: [
    { name: "Camping Tiznit Plage", price: "80-220 MAD / night", rating: "3.9", address: "Route d'Aglou, Tiznit", description: "Coastal camping near Aglou beach with simple setup." },
  ],
  "Atlantic Coast": [
    { name: "Camping Sidi Magdoul", price: "100-300 MAD / night", rating: "3.8", address: "Essaouira", description: "Known camping site near Essaouira beach and town." },
    { name: "Sidi Kaouki Camp", price: "200-500 MAD / night", rating: "4.2", address: "Sidi Kaouki, Essaouira", description: "Beach camp near surf spot with eco-friendly tents." },
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

export const getGoogleMapsHotelOptions = (location = "Marrakech", lang = "FR", budget = "Moderate") => {
  const city =
    MOROCCO_CITIES.find((item) => item.toLowerCase() === String(location).trim().toLowerCase()) ||
    location ||
    "Marrakech";
  const dataCity = getDataCity(city);
  const exactHotels = [
    ...(GOOGLE_MAPS_HOTELS_BY_CITY[dataCity] || GOOGLE_MAPS_HOTELS_BY_CITY[city] || []),
    ...(EXTENDED_HOTELS_BY_CITY[dataCity] || EXTENDED_HOTELS_BY_CITY[city] || []),
  ];
  const baseHotels = exactHotels;
  const hotelsForBudget = baseHotels.filter((hotel) => doesHotelMatchBudget(hotel, budget));
  const selectedHotels = (hotelsForBudget.length > 0 ? hotelsForBudget : baseHotels).slice(0, 8);
  const imagePool = GOOGLE_HOTEL_IMAGE_MAP[dataCity] || GOOGLE_HOTEL_IMAGE_MAP[city] || GOOGLE_HOTEL_IMAGE_MAP.default;

  return selectedHotels.map((hotel, index) => ({
    ...hotel,
    address: `${city}, Morocco`,
    description:
      lang === "EN"
        ? `Open this real hotel directly in Google Maps for ${city}.`
        : lang === "AR"
          ? `افتح هذا الفندق مباشرة في خرائط Google في ${city}.`
          : `Ouvrez cet hotel reel directement dans Google Maps a ${city}.`,
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

const getMapsCategoryFallbacks = (city, type, lang, budget) => {
  const budgetLabel =
    budget === "Cheap"
      ? (lang === "EN" ? "budget" : "economiques")
      : budget === "Luxury"
        ? (lang === "EN" ? "luxury" : "luxe")
        : (lang === "EN" ? "moderate" : "moderes");
  const mapsPriceLabel = lang === "EN" ? "Open Maps" : "Voir sur Maps";
  const mapsDescription =
    lang === "EN"
      ? "Open Google Maps results for this city and category."
      : "Ouvrez les resultats Google Maps pour cette ville et cette categorie.";
  const searchesByType = {
    restaurants: [
      `Restaurants ${budgetLabel} a ${city}`,
      `Restaurants marocains a ${city}`,
      `Restaurants bien notes a ${city}`,
    ],
    hostels: [
      `Hostels ${budgetLabel} a ${city}`,
      `Auberges a ${city}`,
      `Maisons d'hotes a ${city}`,
    ],
    camping: [
      `Camping a ${city}`,
      `Bivouacs a ${city}`,
      `Glamping a ${city}`,
    ],
  };

  return (searchesByType[type] || [`${type} ${city}`]).map((name) => ({
    name,
    price: mapsPriceLabel,
    rating: "Maps",
    address: `${city}, Morocco`,
    description: mapsDescription,
    source: "Google Maps",
  }));
};

export const getRealGoogleMapsOptions = (location = "Marrakech", lang = "FR", budget = "Moderate", type = "restaurants") => {
  const city =
    MOROCCO_CITIES.find((item) => item.toLowerCase() === String(location).trim().toLowerCase()) ||
    location ||
    "Marrakech";
  const dataCity = getDataCity(city);
  const dataset = REAL_PLACE_DATASETS[type] || {};
  const baseItems = dataset[dataCity] || dataset[city] || [];
  const itemsForBudget = baseItems.filter((item) => doesPlaceMatchBudget(item, budget, type));
  const selectedItems = (
    baseItems.length > 0
      ? (itemsForBudget.length > 0 ? itemsForBudget : baseItems)
      : getMapsCategoryFallbacks(city, type, lang, budget)
  ).slice(0, 8);
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
  const dataCity = getDataCity(city);

  return city && (CITY_IMAGE_MAP[city] || CITY_IMAGE_MAP[dataCity])
    ? (CITY_IMAGE_MAP[city] || CITY_IMAGE_MAP[dataCity])
    : CITY_IMAGE_MAP.Marrakech;
};

const ACTIVITY_DAY_VARIANTS = {
  imperial: [
    {
      theme: "Historic medina route",
      route_summary: "A focused first day through the old medina, artisan souks, palace architecture, and evening square atmosphere.",
      plan: [
        ["Morning", "Medina Gate & Main Souks", "Start at a main medina gate, then follow the artisan lanes for leather, spices, metalwork, and neighborhood architecture.", "Free", "4.7"],
        ["Lunch", "Rooftop Lunch near the Medina", "Pause on a terrace close to the souks so the route stays walkable before the afternoon monuments.", "90-160 MAD", "4.5"],
        ["Afternoon", "Palace Courtyards & Historic Quarter", "Visit a palace or historic quarter with zellige, carved cedar, and calm courtyards that contrast with the busy souks.", "30-100 MAD", "4.8"],
        ["Evening", "Main Square Food Stalls", "End with storytellers, street food, musicians, and a slow walk around the city's main evening square.", "80-180 MAD", "4.6"],
      ],
    },
    {
      theme: "Gardens, museums, and calm streets",
      route_summary: "A slower cultural day built around gardens, museum visits, and quieter neighborhoods away from the busiest souks.",
      plan: [
        ["Morning", "Historic Garden Visit", "Begin with shaded paths, fountains, and botanical views before the temperature rises.", "40-160 MAD", "4.7"],
        ["Lunch", "Museum District Cafe", "Choose a nearby cafe for a lighter lunch so you can continue the cultural route without backtracking.", "70-140 MAD", "4.4"],
        ["Afternoon", "Museum of Local Heritage", "Focus on local crafts, photography, architecture, or regional history in a real museum setting.", "30-80 MAD", "4.6"],
        ["Evening", "New City Promenade", "Move to the modern district for a different atmosphere, shops, cafes, and a relaxed dinner.", "120-260 MAD", "4.5"],
      ],
    },
    {
      theme: "Artisans and neighborhood food",
      route_summary: "A hands-on day centered on craft workshops, neighborhood markets, and local food stops that are different from the main tourist route.",
      plan: [
        ["Morning", "Artisan Cooperative", "Visit a cooperative or workshop area to see pottery, weaving, woodwork, or leather techniques up close.", "Free-50 MAD", "4.5"],
        ["Lunch", "Local Market Grill", "Eat near a neighborhood market where the menu is simpler, fresher, and less formal than rooftop dining.", "60-130 MAD", "4.4"],
        ["Afternoon", "Kasbah or Ramparts Walk", "Follow the old defensive walls or kasbah streets for quieter photo stops and city history.", "Free-70 MAD", "4.6"],
        ["Evening", "Traditional Hammam or Tea Terrace", "Finish with a hammam session or mint tea terrace after a day focused on local daily life.", "80-250 MAD", "4.5"],
      ],
    },
  ],
  beach: [
    {
      theme: "Coast and old port",
      route_summary: "A coastal day linking the beach, port area, seafood lunch, and sunset promenade.",
      plan: [
        ["Morning", "Main Beach Walk", "Start with the safest central beach area for ocean views, photos, and a relaxed walk by the water.", "Free", "4.7"],
        ["Lunch", "Port Seafood Restaurant", "Eat grilled fish or seafood close to the port so the meal matches the coastal route.", "120-240 MAD", "4.6"],
        ["Afternoon", "Old Port or Marina", "Visit the marina or old port for boats, sea walls, and a different view of the city.", "Free-30 MAD", "4.5"],
        ["Evening", "Corniche Sunset", "End on the corniche for sunset, cafes, and an easy evening walk.", "Free", "4.8"],
      ],
    },
    {
      theme: "Surf and ocean activity",
      route_summary: "A more active day built around surf, paddle, or boat activities, then a relaxed beachside evening.",
      plan: [
        ["Morning", "Surf School or Paddle Spot", "Book a beginner lesson or guided session at a recognized surf or paddle area.", "200-450 MAD", "4.7"],
        ["Lunch", "Beach Cafe Lunch", "Recover with salads, sandwiches, tajine, or fresh juice at a cafe close to the activity zone.", "80-160 MAD", "4.5"],
        ["Afternoon", "Coastal Viewpoint", "Move to a viewpoint or headland for photos and a calmer look at the coastline.", "Free", "4.6"],
        ["Evening", "Seafront Dinner", "Choose a restaurant facing the ocean for a different dinner mood from the port lunch.", "150-300 MAD", "4.6"],
      ],
    },
    {
      theme: "Medina and seaside culture",
      route_summary: "A cultural day combining the old town, local crafts, and a final return to the sea.",
      plan: [
        ["Morning", "Old Medina Streets", "Explore the old town streets, craft shops, and local architecture before the beach crowds arrive.", "Free", "4.6"],
        ["Lunch", "Medina Moroccan Lunch", "Have a traditional lunch inside or near the medina to keep this day cultural rather than beach-focused.", "80-180 MAD", "4.5"],
        ["Afternoon", "Museum or Cultural Center", "Visit a local museum, gallery, or cultural center for regional history and crafts.", "20-80 MAD", "4.4"],
        ["Evening", "Beach Tea Stop", "Return to the beach only for tea or dessert, creating a lighter evening ending.", "30-90 MAD", "4.5"],
      ],
    },
  ],
  desert: [
    {
      theme: "Dunes and camp experience",
      route_summary: "A desert-focused day with dunes, camp lunch, camel trek, and stargazing.",
      plan: [
        ["Morning", "Sunrise Dune Viewpoint", "Begin early on the nearest dune ridge for soft light and clear desert photos.", "Free", "4.9"],
        ["Lunch", "Berber Camp Lunch", "Eat at a camp so the route stays inside the desert landscape.", "100-180 MAD", "4.7"],
        ["Afternoon", "Camel Trek Route", "Take a guided camel route between dunes with planned photo stops and water breaks.", "250-450 MAD", "4.8"],
        ["Evening", "Stargazing Bivouac", "Finish with dinner and stargazing away from city lights.", "300-650 MAD", "4.9"],
      ],
    },
    {
      theme: "Kasbahs and oasis villages",
      route_summary: "A heritage day around fortified architecture, palm groves, and oasis villages.",
      plan: [
        ["Morning", "Historic Kasbah", "Visit a real kasbah or fortified village to understand desert trade-route architecture.", "20-70 MAD", "4.6"],
        ["Lunch", "Oasis Village Lunch", "Stop in an oasis village for bread, olives, tajine, and mint tea.", "80-160 MAD", "4.6"],
        ["Afternoon", "Palm Grove Walk", "Walk through palm groves or irrigation channels for a greener contrast to the dunes.", "Free-30 MAD", "4.5"],
        ["Evening", "Desert Music Dinner", "Choose a camp or guesthouse dinner with local music instead of another camel activity.", "180-350 MAD", "4.7"],
      ],
    },
    {
      theme: "Fossils, markets, and viewpoints",
      route_summary: "A discovery day focused on desert towns, market life, geology, and panoramic viewpoints.",
      plan: [
        ["Morning", "Local Desert Market", "Start at a market or town center to see dates, spices, textiles, and everyday desert commerce.", "Free", "4.4"],
        ["Lunch", "Roadside Tagine Stop", "Eat at a simple stop on the route so the afternoon can continue toward viewpoints.", "70-140 MAD", "4.4"],
        ["Afternoon", "Fossil or Geology Workshop", "Visit a fossil, mineral, or geology workshop common in desert regions.", "Free-60 MAD", "4.5"],
        ["Evening", "Panoramic Sunset Point", "End at a viewpoint rather than a camp, making this evening different from the dune day.", "Free", "4.8"],
      ],
    },
  ],
  nature: [
    {
      theme: "Valley hike and viewpoints",
      route_summary: "A nature day focused on a walkable valley route, viewpoints, and a mountain dinner.",
      plan: [
        ["Morning", "Valley Trail", "Start with a guided or marked valley trail while the weather is cooler.", "Free-50 MAD", "4.8"],
        ["Lunch", "Berber Village Meal", "Eat in a village or terrace restaurant close to the trail instead of returning to town.", "80-150 MAD", "4.8"],
        ["Afternoon", "Mountain Viewpoint", "Continue to a viewpoint for photos and a wider look at the landscape.", "Free", "4.7"],
        ["Evening", "Eco-Lodge Dinner", "Finish with a quiet lodge dinner and regional dishes after the hiking route.", "150-280 MAD", "4.6"],
      ],
    },
    {
      theme: "Waterfalls and natural pools",
      route_summary: "A cooler day around waterfalls, pools, and shaded paths rather than mountain viewpoints.",
      plan: [
        ["Morning", "Waterfall Path", "Begin on the waterfall path before midday crowds and heat.", "20-80 MAD", "4.7"],
        ["Lunch", "Riverside Lunch", "Choose a riverside restaurant or picnic stop close to the water.", "80-170 MAD", "4.5"],
        ["Afternoon", "Natural Pool Stop", "Spend the afternoon near natural pools, bridges, or shaded river sections.", "Free-30 MAD", "4.6"],
        ["Evening", "Village Tea Terrace", "End with tea in a village terrace instead of another long hike.", "30-80 MAD", "4.5"],
      ],
    },
    {
      theme: "Forest, lake, and local market",
      route_summary: "A varied day combining forest roads, lake scenery, and local market atmosphere.",
      plan: [
        ["Morning", "Cedar or Forest Walk", "Walk through a forested area or shaded nature path for a different landscape from valleys.", "Free", "4.6"],
        ["Lunch", "Local Market Lunch", "Eat close to a local market or town center to connect nature travel with daily life.", "60-140 MAD", "4.4"],
        ["Afternoon", "Lake or Dam View", "Visit a lake, dam, or wide viewpoint for calm photos and a shorter walk.", "Free", "4.5"],
        ["Evening", "Mountain Guesthouse Dinner", "Close with a guesthouse dinner using regional produce.", "120-240 MAD", "4.5"],
      ],
    },
  ],
};

const ADDITIONAL_DAY_VARIANTS = {
  imperial: [
    { theme: "Museum and heritage circuit", route_summary: "A museum-led route focused on local history, craft collections, and a quieter cultural dinner.", plan: [["Morning", "City Heritage Museum", "Start with a museum visit to understand the city's history before returning outside.", "20-80 MAD", "4.5"], ["Lunch", "Heritage Quarter Lunch", "Eat near the museum district to keep the route compact and avoid repeating the main medina lunch.", "80-170 MAD", "4.4"], ["Afternoon", "Old School or Madrasa Visit", "Continue with a historic learning site or religious-school architecture where available.", "20-70 MAD", "4.7"], ["Evening", "Cultural Cafe Evening", "End at a cultural cafe or music-friendly venue for a calmer evening than the main square.", "60-160 MAD", "4.5"]] },
    { theme: "Royal and administrative quarter", route_summary: "A day around royal gates, official avenues, public gardens, and a polished dinner route.", plan: [["Morning", "Royal Palace Gate", "Begin at the palace gate area for architecture and photos from public viewpoints.", "Free", "4.6"], ["Lunch", "Modern District Lunch", "Move to a modern district restaurant so this day feels different from old-city routes.", "100-220 MAD", "4.4"], ["Afternoon", "Public Garden and Avenue Walk", "Walk through a public garden or formal avenue close to the administrative quarter.", "Free-30 MAD", "4.5"], ["Evening", "Contemporary Moroccan Dinner", "Choose a contemporary Moroccan restaurant rather than a traditional medina dinner.", "180-350 MAD", "4.5"]] },
    { theme: "Ramparts and panoramic views", route_summary: "A viewpoint-focused route using city walls, towers, terraces, and sunset panoramas.", plan: [["Morning", "Historic Ramparts Walk", "Follow a section of the old ramparts or fortified streets for a wider view of the city layout.", "Free", "4.5"], ["Lunch", "Terrace Lunch with View", "Pick a terrace lunch near the route to keep the day visual and panoramic.", "90-190 MAD", "4.4"], ["Afternoon", "City Viewpoint", "Visit a hill, tower, or elevated district for photos and orientation.", "Free-50 MAD", "4.6"], ["Evening", "Sunset Tea Terrace", "Finish with mint tea at sunset instead of another full restaurant route.", "30-90 MAD", "4.6"]] },
    { theme: "Food market and cooking day", route_summary: "A food-focused day built around markets, ingredients, a cooking activity, and a different dinner stop.", plan: [["Morning", "Fresh Food Market", "Visit a food market to see olives, spices, bread ovens, and produce used in local kitchens.", "Free", "4.5"], ["Lunch", "Cooking Class or Tasting Lunch", "Use lunch for a cooking class, tasting menu, or guided food stop.", "250-500 MAD", "4.7"], ["Afternoon", "Spice and Bakery Route", "Continue through spice shops, bakeries, or patisserie stops without repeating the main souk route.", "30-120 MAD", "4.4"], ["Evening", "Neighborhood Grill Dinner", "End with a simple grill or local restaurant in a different neighborhood.", "80-180 MAD", "4.4"]] },
    { theme: "Nearby Roman or historic excursion", route_summary: "A day trip to a nearby archaeological or historic site when available, returning for dinner.", plan: [["Morning", "Nearby Archaeological Site", "Leave the city for a real nearby archaeological or historic site to expand a long trip.", "20-100 MAD", "4.6"], ["Lunch", "Excursion Town Lunch", "Eat in the nearby town rather than returning immediately to the city.", "70-160 MAD", "4.4"], ["Afternoon", "Pilgrimage Town or Old Fort", "Add a second nearby heritage stop to make the excursion day complete.", "Free-50 MAD", "4.5"], ["Evening", "Return City Dinner", "Return for a relaxed dinner close to the accommodation after the day trip.", "120-260 MAD", "4.4"]] },
    { theme: "Art gallery and design shops", route_summary: "A creative route through galleries, concept stores, artisan boutiques, and a stylish cafe.", plan: [["Morning", "Art Gallery District", "Start with galleries or design stores to focus on contemporary culture.", "Free-50 MAD", "4.4"], ["Lunch", "Design Cafe Lunch", "Choose a cafe in the creative district for a lighter, modern lunch.", "80-170 MAD", "4.4"], ["Afternoon", "Artisan Boutique Route", "Visit workshops or curated boutiques that differ from traditional market stalls.", "Free", "4.4"], ["Evening", "Gallery District Dinner", "Stay in the same district for dinner to avoid another old-medina evening.", "140-300 MAD", "4.5"]] },
    { theme: "Religious architecture from outside", route_summary: "A respectful route around mosques, shrines, fountains, and public religious architecture.", plan: [["Morning", "Historic Mosque Exterior", "Visit public exterior viewpoints of a major mosque or religious landmark.", "Free", "4.6"], ["Lunch", "Old Quarter Lunch", "Eat near the religious quarter without repeating previous restaurant stops.", "70-160 MAD", "4.4"], ["Afternoon", "Fountains and Shrine Streets", "Walk through fountain streets, shrine-adjacent lanes, or historic neighborhood gates.", "Free", "4.5"], ["Evening", "Quiet Riad Dinner", "End with a calm riad dinner to match the slower heritage day.", "180-350 MAD", "4.6"]] },
    { theme: "Family friendly city day", route_summary: "A softer route with gardens, easy food stops, safe walking areas, and early evening entertainment.", plan: [["Morning", "Large Public Garden", "Start in a public garden or park with shaded paths and easy walking.", "Free-50 MAD", "4.5"], ["Lunch", "Family Restaurant Lunch", "Choose a casual restaurant with simple Moroccan and international options.", "80-180 MAD", "4.3"], ["Afternoon", "Aquarium, Zoo, or Easy Museum", "Visit an easy family attraction, aquarium, zoo, or accessible museum if available.", "30-120 MAD", "4.3"], ["Evening", "Early Dessert and Tea Stop", "Keep the evening light with pastries, tea, and a short walk.", "30-100 MAD", "4.4"]] },
    { theme: "Hidden neighborhoods route", route_summary: "A local-neighborhood day away from the most famous monuments, useful for longer stays.", plan: [["Morning", "Residential Medina Lanes", "Explore a quieter residential part of the old city with guide-friendly lanes and small shops.", "Free", "4.3"], ["Lunch", "Local Workers' Lunch Spot", "Eat at a simple local restaurant for a different budget and atmosphere.", "50-120 MAD", "4.3"], ["Afternoon", "Community Craft Street", "Visit a craft street or small production area rather than the central tourist souk.", "Free", "4.4"], ["Evening", "Neighborhood Cafe", "End at a neighborhood cafe to see daily life after sunset.", "30-90 MAD", "4.3"]] },
    { theme: "Wellness and hammam day", route_summary: "A recovery day with garden time, hammam or spa, and a gentle dinner.", plan: [["Morning", "Calm Garden Walk", "Begin with a garden or shaded promenade for a slower start.", "Free-80 MAD", "4.5"], ["Lunch", "Healthy Terrace Lunch", "Choose a light lunch with salads, juices, and Moroccan small plates.", "90-180 MAD", "4.4"], ["Afternoon", "Traditional Hammam", "Book a hammam or spa session to break up a long itinerary.", "150-450 MAD", "4.6"], ["Evening", "Quiet Courtyard Dinner", "End with a courtyard dinner instead of a busy night market.", "160-320 MAD", "4.5"]] },
    { theme: "Final shopping and favorite views", route_summary: "A final-day route for buying crafts, revisiting the best view, and ending with a memorable dinner.", plan: [["Morning", "Craft Souk Shopping Route", "Use the morning for planned purchases with specific craft streets rather than random browsing.", "Free", "4.4"], ["Lunch", "Farewell Lunch Spot", "Pick a reliable lunch spot close to the shops to avoid long transfers.", "90-180 MAD", "4.4"], ["Afternoon", "Best View Revisit", "Return to the best viewpoint or terrace for final photos without repeating a full previous route.", "Free-50 MAD", "4.5"], ["Evening", "Farewell Moroccan Dinner", "Close with a special Moroccan dinner suited to the traveler's budget.", "180-450 MAD", "4.6"]] },
  ],
  beach: [
    { theme: "Lagoon and birdlife", route_summary: "A softer coastal route focused on lagoons, birds, calm water, and a seafood evening.", plan: [["Morning", "Lagoon Viewpoint", "Start at a lagoon or calm-water viewpoint for photos and birdwatching.", "Free", "4.6"], ["Lunch", "Lagoon Seafood Lunch", "Eat seafood near the water without repeating the port restaurant.", "120-240 MAD", "4.5"], ["Afternoon", "Kayak or Paddle Session", "Use the calm-water setting for kayaking, paddleboarding, or a guided boat ride.", "180-400 MAD", "4.6"], ["Evening", "Waterside Tea Stop", "End with tea or dessert by the lagoon instead of a heavy dinner.", "30-90 MAD", "4.4"]] },
    { theme: "Old town and ramparts", route_summary: "A heritage day through walls, gates, medina lanes, and a different rooftop dinner.", plan: [["Morning", "Old Town Ramparts", "Walk the ramparts or fortified edge of the old town for sea and city views.", "Free-30 MAD", "4.6"], ["Lunch", "Medina Lunch", "Eat inside the medina so the day stays historic rather than beach-focused.", "80-170 MAD", "4.4"], ["Afternoon", "Craft Market Streets", "Visit craft streets, galleries, or local shops connected to coastal culture.", "Free", "4.4"], ["Evening", "Rooftop Medina Dinner", "End with a rooftop dinner looking back toward the sea or old town.", "140-280 MAD", "4.5"]] },
    { theme: "Fishing village route", route_summary: "A nearby fishing-village day with harbor scenes, simple seafood, and coastal viewpoints.", plan: [["Morning", "Nearby Fishing Village", "Visit a real nearby fishing village or harbor area for boats and local life.", "Free", "4.5"], ["Lunch", "Grilled Fish Stall", "Choose a simple grilled-fish lunch close to the harbor.", "80-180 MAD", "4.4"], ["Afternoon", "Cliff or Cape Viewpoint", "Continue to a cape, cliff, or headland for a different coastal landscape.", "Free", "4.6"], ["Evening", "Return Beach Walk", "Return to the main beach for a short evening walk.", "Free", "4.5"]] },
    { theme: "Beach sports day", route_summary: "An active day with beach sport, casual food, and an early relaxed finish.", plan: [["Morning", "Beach Sport Zone", "Start with surf, kite, quad, or beach fitness depending on the destination.", "200-500 MAD", "4.6"], ["Lunch", "Casual Surf Cafe", "Recover with a casual lunch close to the activity area.", "70-160 MAD", "4.4"], ["Afternoon", "Second Beach Cove", "Move to another beach or cove to avoid repeating the main sand stretch.", "Free", "4.5"], ["Evening", "Sunset Juice Bar", "Finish with juice or tea at sunset rather than another seafood dinner.", "30-90 MAD", "4.4"]] },
    { theme: "Nature reserve or dunes", route_summary: "A nature-focused coastal day using dunes, reserves, wetlands, or protected beaches.", plan: [["Morning", "Coastal Nature Reserve", "Visit a reserve, dune area, or protected beach with a guide if needed.", "Free-80 MAD", "4.6"], ["Lunch", "Reserve Area Lunch", "Eat near the nature route to keep transfers practical.", "80-180 MAD", "4.4"], ["Afternoon", "Dune or Wetland Walk", "Continue with a second nature stop that differs from the main beach.", "Free", "4.5"], ["Evening", "Quiet Seafront Dinner", "Choose a calm seafront restaurant away from the busiest promenade.", "150-300 MAD", "4.5"]] },
    { theme: "Market and local kitchen", route_summary: "A food day around fish markets, spices, produce, and a different evening cafe.", plan: [["Morning", "Fish or Produce Market", "Start at a real fish or produce market to understand local ingredients.", "Free", "4.4"], ["Lunch", "Market-to-Table Lunch", "Eat grilled fish, tajine, or market produce nearby.", "80-180 MAD", "4.5"], ["Afternoon", "Spice and Bakery Stops", "Visit spice, bakery, or pastry stops instead of another beach activity.", "30-100 MAD", "4.3"], ["Evening", "Local Cafe Evening", "End in a local cafe or square for tea and people-watching.", "30-90 MAD", "4.3"]] },
    { theme: "Island or boat excursion", route_summary: "A boat-based day for destinations with islands, bays, or fishing excursions nearby.", plan: [["Morning", "Boat Excursion Departure", "Take a boat, island, or bay excursion when conditions allow.", "250-600 MAD", "4.6"], ["Lunch", "Boat or Harbor Lunch", "Keep lunch connected to the excursion with a harbor or onboard meal.", "100-220 MAD", "4.4"], ["Afternoon", "Second Bay View", "Return through a second bay or viewpoint for more variety.", "Free-60 MAD", "4.5"], ["Evening", "Marina Dinner", "End around the marina or harbor with a different atmosphere from beach cafes.", "160-320 MAD", "4.5"]] },
    { theme: "Photography route", route_summary: "A visual day planned around morning light, architecture, color, and sunset views.", plan: [["Morning", "Colorful Old Streets", "Start in the most photogenic old streets before crowds arrive.", "Free", "4.5"], ["Lunch", "Photo-Friendly Terrace", "Choose a terrace lunch with open views or architectural details.", "90-190 MAD", "4.4"], ["Afternoon", "Harbor and Wall Details", "Photograph boats, doors, ramparts, or harbor scenes in the afternoon light.", "Free", "4.5"], ["Evening", "Sunset Photo Point", "Finish at a reliable sunset point instead of repeating the promenade.", "Free", "4.7"]] },
    { theme: "Wellness by the sea", route_summary: "A recovery day with slow beach time, spa or hammam, and gentle evening food.", plan: [["Morning", "Quiet Beach Stretch", "Spend the morning on a quieter beach section for rest and swimming if safe.", "Free", "4.5"], ["Lunch", "Light Seaside Lunch", "Choose a lighter lunch with salads, seafood, or fresh juice.", "80-170 MAD", "4.4"], ["Afternoon", "Hammam or Spa", "Book a hammam, massage, or spa session to balance active beach days.", "180-500 MAD", "4.5"], ["Evening", "Calm Terrace Dinner", "End with a calm terrace dinner away from loud nightlife.", "140-280 MAD", "4.4"]] },
    { theme: "Nearby town day trip", route_summary: "A day trip to a nearby coastal town, village, or viewpoint to expand long stays.", plan: [["Morning", "Nearby Coastal Town", "Travel to a nearby town or village for a different coastline and street layout.", "Free", "4.5"], ["Lunch", "Day Trip Lunch", "Eat locally in the excursion town to avoid duplicating main-city restaurants.", "80-180 MAD", "4.4"], ["Afternoon", "Local Viewpoint or Beach", "Visit that town's main viewpoint, beach, or old streets.", "Free-50 MAD", "4.5"], ["Evening", "Return Dinner", "Return to the base city for an easy dinner near the accommodation.", "120-260 MAD", "4.4"]] },
    { theme: "Final coastal highlights", route_summary: "A final-day route for souvenirs, favorite sea views, and a farewell dinner.", plan: [["Morning", "Souvenir and Craft Market", "Buy final crafts or beach-related souvenirs in a planned market route.", "Free", "4.3"], ["Lunch", "Favorite Lunch Revisit", "Return to the best reliable lunch area without repeating the same dish.", "90-190 MAD", "4.4"], ["Afternoon", "Final Beach Viewpoint", "Spend the afternoon at the best viewpoint or beach for final photos.", "Free", "4.6"], ["Evening", "Farewell Seafood Dinner", "Close with a seafood or Moroccan dinner that fits the budget.", "180-400 MAD", "4.6"]] },
  ],
};

ADDITIONAL_DAY_VARIANTS.desert = [
  { theme: "Oasis agriculture route", route_summary: "A long-stay desert route around palm irrigation, oasis farms, and ksar streets.", plan: [["Morning", "Oasis Irrigation Walk", "Follow irrigation channels and palm plots with a local guide to understand oasis agriculture.", "Free-50 MAD", "4.5"], ["Lunch", "Oasis Terrace Lunch", "Eat in a palm-grove terrace or village restaurant close to the morning route.", "80-160 MAD", "4.4"], ["Afternoon", "Ksar Backstreets", "Walk through fortified ksar lanes and compare earth architecture with previous kasbah stops.", "Free-30 MAD", "4.6"], ["Evening", "Palm Grove Sunset", "End at a palm-grove viewpoint for softer sunset photos away from the dunes.", "Free", "4.6"]] },
  { theme: "Desert town market", route_summary: "A local-life day around market stalls, dates, textiles, and a simple dinner.", plan: [["Morning", "Weekly Souk or Market", "Visit the town market for dates, spices, textiles, livestock areas, and daily desert commerce.", "Free", "4.4"], ["Lunch", "Market Grill Lunch", "Choose a simple grill or tajine stop near the market rather than a camp lunch.", "60-130 MAD", "4.3"], ["Afternoon", "Date Cooperative", "Visit a date cooperative or local shop to learn varieties and buying tips.", "Free-40 MAD", "4.4"], ["Evening", "Town Square Cafe", "Finish with tea in the town square to see the evening rhythm.", "20-70 MAD", "4.3"]] },
  { theme: "Rock formations and viewpoints", route_summary: "A geology day using rocky plateaus, cliffs, and panoramic routes.", plan: [["Morning", "Rocky Plateau Viewpoint", "Start at a rocky plateau or cliff viewpoint before the strongest heat.", "Free", "4.6"], ["Lunch", "Roadside Kasbah Lunch", "Eat on the route at a kasbah guesthouse or roadside restaurant.", "80-170 MAD", "4.4"], ["Afternoon", "Geology Stop", "Visit a fossil, mineral, or rock-formation stop common in desert regions.", "Free-60 MAD", "4.5"], ["Evening", "High Desert Sunset", "End at a high desert viewpoint instead of returning to the dunes.", "Free", "4.7"]] },
  { theme: "Nomad culture day", route_summary: "A guided cultural day focused on nomad families, tents, music, and hospitality.", plan: [["Morning", "Nomad Family Visit", "Arrange a respectful guided visit to learn about mobility, water, animals, and tent life.", "150-300 MAD", "4.6"], ["Lunch", "Nomad Tea and Bread Lunch", "Share tea, bread, olives, and simple dishes as part of the guided experience.", "100-220 MAD", "4.6"], ["Afternoon", "Desert Music Stop", "Visit a music or Gnawa-style cultural stop when available near the desert town.", "50-120 MAD", "4.5"], ["Evening", "Campfire Dinner", "Close with a campfire dinner focused on music rather than another camel trek.", "180-350 MAD", "4.7"]] },
  { theme: "Palm grove and ksar walk", route_summary: "A walking day linking palm groves, earthen lanes, and village viewpoints.", plan: [["Morning", "Palm Grove Trail", "Walk a shaded palm route and note irrigation, garden plots, and mud-brick walls.", "Free", "4.5"], ["Lunch", "Village Couscous or Tajine", "Eat in a village guesthouse or family-style restaurant.", "80-170 MAD", "4.5"], ["Afternoon", "Old Ksar Gate", "Visit an old ksar gate or fortified lane system for architecture photos.", "Free-40 MAD", "4.5"], ["Evening", "Guesthouse Dinner", "Return to a guesthouse dinner after the walking route.", "120-260 MAD", "4.4"]] },
  { theme: "Fossil and geology circuit", route_summary: "A specialist route around fossils, stones, workshops, and desert landscape interpretation.", plan: [["Morning", "Fossil Workshop", "Visit a fossil or stone workshop to learn what is local and what to avoid buying.", "Free-50 MAD", "4.4"], ["Lunch", "Workshop Area Lunch", "Stay near the workshop area for a practical lunch stop.", "70-150 MAD", "4.3"], ["Afternoon", "Mineral Market or Quarry View", "Continue to a mineral market, quarry viewpoint, or geology display if available.", "Free-60 MAD", "4.4"], ["Evening", "Desert View Dinner", "Finish with dinner at a terrace or camp with open desert views.", "160-320 MAD", "4.5"]] },
  { theme: "Remote sunset route", route_summary: "A day planned around a remote evening viewpoint with a light morning.", plan: [["Morning", "Slow Desert Breakfast Walk", "Keep the morning light with a short walk close to the accommodation.", "Free", "4.3"], ["Lunch", "Packed or Camp Lunch", "Use a packed lunch or camp lunch so the afternoon can go farther out.", "80-180 MAD", "4.4"], ["Afternoon", "Remote Viewpoint Transfer", "Travel to a less crowded viewpoint with a guide or driver.", "200-500 MAD", "4.6"], ["Evening", "Remote Sunset and Return", "Watch sunset from the remote point before returning safely.", "Free", "4.8"]] },
  { theme: "Desert wellness slow day", route_summary: "A recovery day for long trips with hammam, pool time, and gentle local food.", plan: [["Morning", "Pool or Garden Rest", "Start with a slow morning at a riad, camp, or palm-garden pool.", "Free", "4.3"], ["Lunch", "Light Guesthouse Lunch", "Choose a light lunch with salads, soup, or tajine.", "80-160 MAD", "4.4"], ["Afternoon", "Hammam or Massage", "Book a hammam, massage, or quiet rest session to balance active desert days.", "150-450 MAD", "4.5"], ["Evening", "Quiet Terrace Dinner", "End on a terrace rather than in a busy camp setting.", "140-280 MAD", "4.4"]] },
  { theme: "Nearby valley excursion", route_summary: "A day trip to a nearby valley, gorge, or green corridor to add variety.", plan: [["Morning", "Nearby Valley Road", "Drive to a nearby valley or gorge for cooler air and different scenery.", "Free-100 MAD", "4.6"], ["Lunch", "Valley Restaurant Lunch", "Eat near the gorge or valley before returning.", "80-180 MAD", "4.4"], ["Afternoon", "Short Gorge Walk", "Take a short walk through the gorge, riverbed, or viewpoint area.", "Free-50 MAD", "4.6"], ["Evening", "Return Desert Dinner", "Return to the desert base for dinner after the excursion.", "140-280 MAD", "4.4"]] },
  { theme: "Kasbah architecture study", route_summary: "A deeper architecture day around earthen building techniques and historic trade routes.", plan: [["Morning", "Kasbah Exterior Details", "Study towers, rammed-earth walls, and decorative forms at a kasbah or fortified village.", "20-70 MAD", "4.6"], ["Lunch", "Kasbah Guesthouse Lunch", "Eat in or near a kasbah guesthouse to stay on theme.", "90-180 MAD", "4.5"], ["Afternoon", "Old Caravan Route Stop", "Visit a former caravan-route stop, gate, or old storage area if available.", "Free-50 MAD", "4.4"], ["Evening", "Architecture View Terrace", "End with a terrace view over the earthen village or valley.", "50-140 MAD", "4.5"]] },
  { theme: "Final dunes and market day", route_summary: "A final desert day for souvenirs, one last dune view, and a farewell dinner.", plan: [["Morning", "Final Desert Market Stop", "Buy dates, scarves, crafts, or spices with a planned market visit.", "Free", "4.3"], ["Lunch", "Farewell Tajine Lunch", "Choose a reliable tajine lunch near the market or accommodation.", "80-170 MAD", "4.4"], ["Afternoon", "Last Dune View", "Return to a favorite dune or viewpoint for final photos without repeating a full camel trek.", "Free", "4.7"], ["Evening", "Farewell Camp Dinner", "Close with a special camp or guesthouse dinner.", "180-400 MAD", "4.6"]] },
];

ADDITIONAL_DAY_VARIANTS.nature = [
  { theme: "High trail and pass", route_summary: "A higher-altitude walking day using passes, ridges, and panoramic stops.", plan: [["Morning", "High Pass Trail", "Start early on a pass or ridge trail with broad mountain views.", "Free-80 MAD", "4.7"], ["Lunch", "Trail Village Lunch", "Eat in a trail village or mountain terrace close to the route.", "80-160 MAD", "4.6"], ["Afternoon", "Panoramic Ridge Stop", "Continue to a ridge viewpoint for a different angle from valley walks.", "Free", "4.7"], ["Evening", "Mountain Guesthouse Dinner", "End with a guesthouse dinner after the high route.", "120-260 MAD", "4.5"]] },
  { theme: "Forest and lake day", route_summary: "A calmer nature day around forest shade, lake views, and local food.", plan: [["Morning", "Forest Walking Path", "Walk a shaded forest path or cedar area before midday.", "Free", "4.6"], ["Lunch", "Forest Edge Lunch", "Eat at a simple restaurant near the forest or lake route.", "70-150 MAD", "4.4"], ["Afternoon", "Lake Viewpoint", "Visit a lake, dam, or water viewpoint for a quieter afternoon.", "Free", "4.5"], ["Evening", "Town Cafe Evening", "Return to town for tea and a simple dinner.", "50-140 MAD", "4.3"]] },
  { theme: "Village craft route", route_summary: "A cultural mountain day around villages, crafts, bread ovens, and local terraces.", plan: [["Morning", "Mountain Village Walk", "Walk through a village with a guide to understand houses, fields, and terraces.", "Free-80 MAD", "4.6"], ["Lunch", "Family-Style Village Lunch", "Share a home-style lunch or village-terrace meal.", "90-180 MAD", "4.7"], ["Afternoon", "Craft or Cooperative Stop", "Visit a cooperative, weaving stop, argan producer, or craft workshop when available.", "Free-60 MAD", "4.5"], ["Evening", "Valley Tea Terrace", "End with tea overlooking fields or mountain slopes.", "30-80 MAD", "4.4"]] },
  { theme: "Canyon and rock pools", route_summary: "A cooler route using gorges, rock pools, river paths, and shaded lunch stops.", plan: [["Morning", "Canyon Path", "Begin through a canyon, gorge, or rocky river path while light is best.", "Free-80 MAD", "4.7"], ["Lunch", "Riverside Lunch", "Eat beside the river or canyon entrance.", "80-170 MAD", "4.5"], ["Afternoon", "Natural Pool Stop", "Spend the afternoon near a natural pool, bridge, or shaded water area.", "Free-40 MAD", "4.6"], ["Evening", "Village Dinner", "Finish with a village dinner rather than another viewpoint.", "100-220 MAD", "4.4"]] },
  { theme: "Panoramic road circuit", route_summary: "A scenic driving day for long stays, joining viewpoints and villages.", plan: [["Morning", "Scenic Road Viewpoint", "Start with the first safe viewpoint on a scenic mountain road.", "Free", "4.6"], ["Lunch", "Road Circuit Lunch", "Eat midway through the circuit to avoid returning to base too early.", "80-170 MAD", "4.4"], ["Afternoon", "Second Valley View", "Stop at a second valley or pass viewpoint to make the route varied.", "Free", "4.6"], ["Evening", "Return Base Dinner", "Return to the base town for a relaxed dinner.", "120-240 MAD", "4.4"]] },
  { theme: "Local souk and farms", route_summary: "A market and agriculture day that adds real daily-life context to nature trips.", plan: [["Morning", "Local Souk Visit", "Visit a weekly souk or produce market when available.", "Free", "4.4"], ["Lunch", "Farm or Market Lunch", "Eat near farms, market stalls, or a village restaurant.", "60-140 MAD", "4.4"], ["Afternoon", "Terraced Fields Walk", "Walk through terraced fields, orchards, or irrigation paths.", "Free", "4.5"], ["Evening", "Farm Guesthouse Dinner", "End with a guesthouse dinner using local produce.", "120-250 MAD", "4.5"]] },
  { theme: "Horse or mule route", route_summary: "A guided animal-supported route for travelers who want a different mountain pace.", plan: [["Morning", "Mule or Horse Departure", "Take a guided mule, horse, or donkey-supported route where appropriate and ethical.", "200-450 MAD", "4.5"], ["Lunch", "Trail Picnic Lunch", "Use a picnic or village lunch on the route.", "80-160 MAD", "4.4"], ["Afternoon", "Return Trail Viewpoint", "Return through a different trail section or viewpoint.", "Free", "4.5"], ["Evening", "Quiet Lodge Dinner", "Finish with dinner and rest after the guided route.", "120-260 MAD", "4.4"]] },
  { theme: "Birdwatching and quiet paths", route_summary: "A low-impact nature day around wetlands, lakes, forests, or quiet valleys.", plan: [["Morning", "Birdwatching Spot", "Start early at a lake, forest edge, or quiet valley for birdwatching.", "Free", "4.5"], ["Lunch", "Nature Cafe Lunch", "Eat near the quiet route without entering a crowded town center.", "70-150 MAD", "4.3"], ["Afternoon", "Slow Nature Path", "Follow an easy path for photography, plants, and shade.", "Free", "4.5"], ["Evening", "Sunset View Stop", "End with a simple sunset viewpoint close to base.", "Free", "4.6"]] },
  { theme: "Nearby valley day trip", route_summary: "A longer excursion to a second valley or village area for 10-14 day trips.", plan: [["Morning", "Second Valley Transfer", "Travel to a nearby valley or village that has not been used in previous days.", "Free-120 MAD", "4.5"], ["Lunch", "Second Valley Lunch", "Eat locally in the excursion valley.", "80-170 MAD", "4.4"], ["Afternoon", "Village View Walk", "Take a short walk to a viewpoint, river, or village edge.", "Free", "4.5"], ["Evening", "Return and Tea", "Return to the base and keep the evening light with tea or soup.", "30-100 MAD", "4.3"]] },
  { theme: "Mountain wellness day", route_summary: "A slower recovery day with hammam, short walks, and mountain views.", plan: [["Morning", "Gentle View Walk", "Start with a short easy walk rather than a demanding hike.", "Free", "4.4"], ["Lunch", "Light Mountain Lunch", "Choose soup, salads, omelet, or simple tajine at a terrace.", "70-150 MAD", "4.4"], ["Afternoon", "Hammam or Rest Session", "Book a hammam, massage, or rest period if available locally.", "120-350 MAD", "4.4"], ["Evening", "Fireplace or Terrace Dinner", "End with a warm guesthouse dinner.", "120-240 MAD", "4.5"]] },
  { theme: "Final viewpoints route", route_summary: "A final day for favorite views, craft purchases, and a farewell meal.", plan: [["Morning", "Favorite Viewpoint Return", "Return to the best viewpoint for final photos in different light.", "Free", "4.6"], ["Lunch", "Farewell Village Lunch", "Eat at a favorite village terrace or local restaurant.", "80-170 MAD", "4.5"], ["Afternoon", "Craft and Souvenir Stop", "Buy local crafts, honey, argan, pottery, or textiles before departure.", "Free", "4.3"], ["Evening", "Farewell Mountain Dinner", "Close with a final mountain dinner suited to the budget.", "140-300 MAD", "4.5"]] },
];

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
  const dataCity = getDataCity(city);
  const category = getCityCategory(city);
  const activityVariants = [
    ...(ACTIVITY_DAY_VARIANTS[category] || ACTIVITY_DAY_VARIANTS.imperial),
    ...(ADDITIONAL_DAY_VARIANTS[category] || ADDITIONAL_DAY_VARIANTS.imperial || []),
  ];

  const hotelPrice = getPriceRange(budget, safeLang);
  const address = getLabel(safeLang, `${city}, Morocco`, `${city}, Maroc`, `${city}, Maroc`);

  const hotel_options = [
    { name: `Riad ${city} Palace`, address, price: hotelPrice, rating: "4.8", description: `Traditional stay with courtyard charm in ${city}.` },
    { name: `${city} Grand Hotel`, address, price: hotelPrice, rating: "4.6", description: `Comfortable hotel close to the main sights of ${city}.` },
    { name: `${city} Boutique Retreat`, address, price: hotelPrice, rating: "4.7", description: `Stylish rooms, local design, and easy access to the city center.` },
  ].map((item) => withImage(item, dataCity, "hotel"));

  const restaurant_options = [
    { name: `Dar ${city} Restaurant`, address, price: "100-220 MAD", cuisine: "Moroccan", rating: "4.6", description: "Classic Moroccan dishes in a warm local setting." },
    { name: `${city} Rooftop Kitchen`, address, price: "120-260 MAD", cuisine: "Moroccan Fusion", rating: "4.5", description: "Terrace dining with fresh salads, tagines, and city views." },
    { name: `Cafe Central ${city}`, address, price: "60-140 MAD", cuisine: "Cafe", rating: "4.4", description: "Casual stop for mint tea, pastries, and light meals." },
  ].map((item) => withImage(item, dataCity, "restaurant"));

  const hostel_options = [
    { name: `${city} Medina Hostel`, address, price: "120-250 MAD / night", rating: "4.3", description: "Friendly shared accommodation for budget travelers." },
    { name: `${city} Backpackers Auberge`, address, price: "100-220 MAD / night", rating: "4.2", description: "Simple rooms, social spaces, and helpful local staff." },
  ].map((item) => withImage(item, dataCity, "hostel"));

  const camping_options = [
    { name: `${city} Nature Camp`, address, price: "250-600 MAD / night", rating: "4.4", description: "Outdoor stay option near scenic landscapes around the destination." },
  ].map((item) => withImage(item, dataCity, "camping hiking"));

  const itinerary = Array.from({ length: days }, (_, dayIndex) => {
    const variant = activityVariants[dayIndex % activityVariants.length];
    const routeNumber = Math.floor(dayIndex / activityVariants.length) + 1;
    const suffix = routeNumber > 1 ? ` ${routeNumber}` : "";

    return {
      day: getLabel(safeLang, `Day ${dayIndex + 1}`, `Jour ${dayIndex + 1}`, `Jour ${dayIndex + 1}`),
      theme: `${variant.theme}${suffix}`,
      route_summary: variant.route_summary,
      plan: variant.plan.map(([time, place, details, ticket_pricing, rating]) => ({
        time,
        place: `${place}${suffix}, ${city}`,
        details,
        ticket_pricing,
        rating,
        image_url: getMoroccoImageByText(dataCity, place),
      })),
    };
  });

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
      theme: dayItem?.theme || "",
      route_summary: dayItem?.route_summary || "",
      plan: safeArray(dayItem?.plan).filter((place) => place && typeof place === "object"),
    }))
    .filter((dayItem) => dayItem.plan.length > 0);

  if (safeArray(rawData.hotel_options).length === 0 || itinerary.length === 0) return fallback;

  const expectedDays = Number(fallbackArgs.noOfDays) > 0 ? Number(fallbackArgs.noOfDays) : fallback.itinerary.length;
  const completeItinerary = itinerary.slice(0, expectedDays);
  while (completeItinerary.length < expectedDays && completeItinerary.length < fallback.itinerary.length) {
    completeItinerary.push(fallback.itinerary[completeItinerary.length]);
  }

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
    itinerary: completeItinerary,
    metadata: {
      ...(rawData.metadata || {}),
      source: rawData?.metadata?.source || "ai",
    },
  };
};
