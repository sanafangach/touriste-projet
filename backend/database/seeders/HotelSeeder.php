<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Hotel;
use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    /**
     * Hotels data extracted from moroccoData.js
     * Covers GOOGLE_MAPS_HOTELS_BY_CITY + EXTENDED_HOTELS_BY_CITY
     */
    private array $hotelData = [
        'Marrakech' => [
            ['name' => 'La Mamounia', 'price' => '4500 MAD', 'rating' => 4.8, 'reviews' => '9,5 k', 'budget_level' => 'luxury'],
            ['name' => 'Four Seasons Resort Marrakech', 'price' => '5000 MAD', 'rating' => 4.7, 'reviews' => '3,2 k', 'budget_level' => 'luxury'],
            ['name' => 'Sofitel Marrakech Lounge and Spa', 'price' => '7162 MAD', 'rating' => 4.7, 'reviews' => '9,8 k', 'budget_level' => 'luxury'],
            ['name' => 'Movenpick Hotel Mansour Eddahbi Marrakech', 'price' => '3262 MAD', 'rating' => 4.7, 'reviews' => '12 k', 'budget_level' => 'luxury'],
            ['name' => 'Radisson Blu Hotel Marrakech Carre Eden', 'price' => '2357 MAD', 'rating' => 4.4, 'reviews' => '2,8 k', 'budget_level' => 'luxury'],
            ['name' => 'Park Hyatt Marrakech', 'price' => '6599 MAD', 'rating' => 4.7, 'reviews' => '325', 'budget_level' => 'luxury'],
            ['name' => 'Savoy Le Grand Hotel Marrakech', 'price' => '3126 MAD', 'rating' => 4.1, 'reviews' => '3,8 k', 'budget_level' => 'luxury'],
            ['name' => 'Le Méridien N\'fis Marrakech', 'price' => '1800 MAD', 'rating' => 4.3, 'reviews' => '4,1 k', 'budget_level' => 'moderate'],
            ['name' => 'Hotel Racine Marrakech', 'price' => '650 MAD', 'rating' => 4.1, 'reviews' => '3,2 k', 'budget_level' => 'moderate'],
            ['name' => 'Hotel Almas Marrakech', 'price' => '760 MAD', 'rating' => 4.0, 'reviews' => '1,7 k', 'budget_level' => 'moderate'],
            ['name' => 'Opera Plaza Hotel Marrakech', 'price' => '1028 MAD', 'rating' => 4.2, 'reviews' => '2,8 k', 'budget_level' => 'moderate'],
            ['name' => 'Imperial Holiday Hotel & Spa', 'price' => '580 MAD', 'rating' => 2.3, 'reviews' => '752', 'budget_level' => 'cheap'],
        ],
        'Casablanca' => [
            ['name' => 'Four Seasons Hotel Casablanca', 'price' => '4000 MAD', 'rating' => 4.5, 'reviews' => '4 k', 'budget_level' => 'luxury'],
            ['name' => 'Hyatt Regency Casablanca', 'price' => '2200 MAD', 'rating' => 4.2, 'reviews' => '3,8 k', 'budget_level' => 'luxury'],
            ['name' => 'Kenzi Tower Hotel', 'price' => '1300 MAD', 'rating' => 4.2, 'reviews' => '3,3 k', 'budget_level' => 'moderate'],
            ['name' => 'Barcelo Anfa Casablanca', 'price' => '1500 MAD', 'rating' => 4.3, 'reviews' => '1,8 k', 'budget_level' => 'moderate'],
        ],
        'Agadir' => [
            ['name' => 'Sofitel Agadir Royal Bay Resort', 'price' => '2100 MAD', 'rating' => 4.5, 'reviews' => '3,7 k', 'budget_level' => 'luxury'],
            ['name' => 'Hotel Riu Palace Tikida Agadir', 'price' => '2300 MAD', 'rating' => 4.5, 'reviews' => '5,9 k', 'budget_level' => 'luxury'],
            ['name' => 'Iberostar Waves Founty Beach', 'price' => '1700 MAD', 'rating' => 4.4, 'reviews' => '5,4 k', 'budget_level' => 'moderate'],
            ['name' => 'Hotel Timoulay and Spa Agadir', 'price' => '950 MAD', 'rating' => 4.4, 'reviews' => '1,2 k', 'budget_level' => 'moderate'],
        ],
        'Fes' => [
            ['name' => 'Hotel Sahrai', 'price' => '2200 MAD', 'rating' => 4.5, 'reviews' => '1,4 k', 'budget_level' => 'luxury'],
            ['name' => 'Fes Marriott Hotel Jnan Palace', 'price' => '1500 MAD', 'rating' => 4.3, 'reviews' => '2,5 k', 'budget_level' => 'moderate'],
            ['name' => 'Palais Faraj Suites & Spa', 'price' => '2400 MAD', 'rating' => 4.6, 'reviews' => '1 k', 'budget_level' => 'luxury'],
            ['name' => 'Riad Fes - Relais & Chateaux', 'price' => '3000 MAD', 'rating' => 4.6, 'reviews' => '800', 'budget_level' => 'luxury'],
        ],
        'Tangier' => [
            ['name' => 'Hilton Tangier Al Houara Resort & Spa', 'price' => '1900 MAD', 'rating' => 4.3, 'reviews' => '2,9 k', 'budget_level' => 'moderate'],
            ['name' => 'Fairmont Tazi Palace Tangier', 'price' => '3200 MAD', 'rating' => 4.6, 'reviews' => '850', 'budget_level' => 'luxury'],
            ['name' => 'Hilton Tanger City Center', 'price' => '1600 MAD', 'rating' => 4.4, 'reviews' => '2,6 k', 'budget_level' => 'moderate'],
            ['name' => 'Marina Bay City Center Tangier', 'price' => '1000 MAD', 'rating' => 4.2, 'reviews' => '1,8 k', 'budget_level' => 'moderate'],
        ],
        'Rabat' => [
            ['name' => 'The View Rabat', 'price' => '2000 MAD', 'rating' => 4.4, 'reviews' => '1,9 k', 'budget_level' => 'luxury'],
            ['name' => 'Sofitel Rabat Jardin des Roses', 'price' => '2300 MAD', 'rating' => 4.5, 'reviews' => '4,4 k', 'budget_level' => 'luxury'],
            ['name' => 'Rabat Marriott Hotel', 'price' => '2100 MAD', 'rating' => 4.5, 'reviews' => '900', 'budget_level' => 'luxury'],
            ['name' => 'Hotel La Tour Hassan Palace', 'price' => '2600 MAD', 'rating' => 4.4, 'reviews' => '1,7 k', 'budget_level' => 'luxury'],
        ],
        'Essaouira' => [
            ['name' => 'Heure Bleue Palais', 'price' => '2000 MAD', 'rating' => 4.6, 'reviews' => '650', 'budget_level' => 'luxury'],
            ['name' => 'Atlas Essaouira & Spa', 'price' => '1100 MAD', 'rating' => 4.1, 'reviews' => '2,7 k', 'budget_level' => 'moderate'],
            ['name' => 'Sofitel Essaouira Mogador Golf & Spa', 'price' => '1700 MAD', 'rating' => 4.4, 'reviews' => '2,4 k', 'budget_level' => 'luxury'],
            ['name' => 'Riad Mimouna', 'price' => '900 MAD', 'rating' => 4.5, 'reviews' => '900', 'budget_level' => 'moderate'],
        ],
        'Chefchaouen' => [
            ['name' => 'Lina Ryad & Spa', 'price' => '1600 MAD', 'rating' => 4.5, 'reviews' => '520', 'budget_level' => 'moderate'],
            ['name' => 'Dar Jasmine', 'price' => '1500 MAD', 'rating' => 4.7, 'reviews' => '680', 'budget_level' => 'moderate'],
            ['name' => 'Hotel Parador', 'price' => '800 MAD', 'rating' => 3.9, 'reviews' => '1,4 k', 'budget_level' => 'cheap'],
            ['name' => 'Casa Perleta', 'price' => '700 MAD', 'rating' => 4.5, 'reviews' => '620', 'budget_level' => 'cheap'],
        ],
        'Merzouga' => [
            ['name' => 'Kasbah Hotel Tombouctou', 'price' => '1100 MAD', 'rating' => 4.4, 'reviews' => '1,1 k', 'budget_level' => 'moderate'],
            ['name' => 'Kanz Erremal', 'price' => '950 MAD', 'rating' => 4.4, 'reviews' => '1,4 k', 'budget_level' => 'moderate'],
            ['name' => 'Riad Madu', 'price' => '1400 MAD', 'rating' => 4.7, 'reviews' => '900', 'budget_level' => 'moderate'],
            ['name' => 'Sahara Stars Camp', 'price' => '650 MAD', 'rating' => 4.8, 'reviews' => '600', 'budget_level' => 'cheap'],
            ['name' => 'Luxury Desert Camp Merzouga', 'price' => '1200 MAD', 'rating' => 4.7, 'reviews' => '850', 'budget_level' => 'moderate'],
        ],
        'Ouarzazate' => [
            ['name' => 'Berbere Palace', 'price' => '1700 MAD', 'rating' => 4.4, 'reviews' => '1,8 k', 'budget_level' => 'moderate'],
            ['name' => 'Oscar Hotel by Atlas Studios', 'price' => '850 MAD', 'rating' => 4.1, 'reviews' => '1,5 k', 'budget_level' => 'cheap'],
            ['name' => 'Dar Chamaa', 'price' => '700 MAD', 'rating' => 4.4, 'reviews' => '600', 'budget_level' => 'cheap'],
        ],
        'Ifrane' => [
            ['name' => 'Michlifen Resort & Golf', 'price' => '2900 MAD', 'rating' => 4.6, 'reviews' => '2,7 k', 'budget_level' => 'luxury'],
            ['name' => 'Hotel Farah Inn Ifrane', 'price' => '850 MAD', 'rating' => 3.4, 'reviews' => '2,5 k', 'budget_level' => 'cheap'],
            ['name' => 'Zephyr Ifrane', 'price' => '950 MAD', 'rating' => 4.0, 'reviews' => '1,4 k', 'budget_level' => 'cheap'],
        ],
        'Dakhla' => [
            ['name' => 'Dakhla Attitude', 'price' => '1400 MAD', 'rating' => 4.4, 'reviews' => '1,7 k', 'budget_level' => 'moderate'],
            ['name' => 'Westpoint Dakhla', 'price' => '1250 MAD', 'rating' => 4.3, 'reviews' => '850', 'budget_level' => 'moderate'],
            ['name' => 'La Crique Nature & Spa Dakhla', 'price' => '2200 MAD', 'rating' => 4.6, 'reviews' => '700', 'budget_level' => 'luxury'],
        ],
        'Tetouan' => [
            ['name' => 'Hotel Chams Tetouan', 'price' => '850 MAD', 'rating' => 4.0, 'reviews' => '1,8 k', 'budget_level' => 'cheap'],
            ['name' => 'Blanco Riad', 'price' => '900 MAD', 'rating' => 4.3, 'reviews' => '500', 'budget_level' => 'cheap'],
            ['name' => 'Prestige Hotel Tetouan', 'price' => '700 MAD', 'rating' => 4.3, 'reviews' => '1,1 k', 'budget_level' => 'cheap'],
        ],
        'Al Hoceima' => [
            ['name' => 'Mercure Quemado Resort Al Hoceima', 'price' => '1150 MAD', 'rating' => 4.0, 'reviews' => '2,2 k', 'budget_level' => 'moderate'],
            ['name' => 'Radisson Blu Resort Al Hoceima', 'price' => '1500 MAD', 'rating' => 4.2, 'reviews' => '1,4 k', 'budget_level' => 'moderate'],
            ['name' => 'Suites Hotel Mohammed V', 'price' => '800 MAD', 'rating' => 3.8, 'reviews' => '850', 'budget_level' => 'cheap'],
        ],
        'Zagora' => [
            ['name' => 'Riad Lamane', 'price' => '780 MAD', 'rating' => 4.2, 'reviews' => '900', 'budget_level' => 'cheap'],
            ['name' => 'La Perle du Draa', 'price' => '620 MAD', 'rating' => 4.1, 'reviews' => '780', 'budget_level' => 'cheap'],
            ['name' => 'Riad Dar Sofian', 'price' => '900 MAD', 'rating' => 4.6, 'reviews' => '650', 'budget_level' => 'cheap'],
        ],
        'Meknes' => [
            ['name' => 'Hotel Transatlantique Meknes', 'price' => '820 MAD', 'rating' => 3.9, 'reviews' => '1,4 k', 'budget_level' => 'cheap'],
            ['name' => 'Riad Yacout Meknes', 'price' => '850 MAD', 'rating' => 4.3, 'reviews' => '900', 'budget_level' => 'cheap'],
            ['name' => 'Ibis Meknes', 'price' => '520 MAD', 'rating' => 3.7, 'reviews' => '1,8 k', 'budget_level' => 'cheap'],
        ],
        'Asilah' => [
            ['name' => 'Hotel Al Alba', 'price' => '800 MAD', 'rating' => 4.3, 'reviews' => '750', 'budget_level' => 'cheap'],
            ['name' => 'Al Khaima Hotel Asilah', 'price' => '680 MAD', 'rating' => 3.8, 'reviews' => '1,1 k', 'budget_level' => 'cheap'],
            ['name' => 'Hotel Zelis Asilah', 'price' => '500 MAD', 'rating' => 3.8, 'reviews' => '800', 'budget_level' => 'cheap'],
        ],
        'Akchour' => [
            ['name' => 'Auberge Dardara', 'price' => '650 MAD', 'rating' => 4.2, 'reviews' => '950', 'budget_level' => 'cheap'],
            ['name' => "Ermitage d'Akchour", 'price' => '1300 MAD', 'rating' => 4.4, 'reviews' => '1,1 k', 'budget_level' => 'moderate'],
        ],
        'Atlas Mountains' => [
            ['name' => 'Kasbah Tamadot', 'price' => '8000 MAD', 'rating' => 4.8, 'reviews' => '650', 'budget_level' => 'luxury'],
            ['name' => 'Kasbah du Toubkal', 'price' => '1800 MAD', 'rating' => 4.5, 'reviews' => '900', 'budget_level' => 'moderate'],
            ['name' => 'Riad Atlas Prestige', 'price' => '550 MAD', 'rating' => 4.6, 'reviews' => '500', 'budget_level' => 'cheap'],
        ],
        'Saidia' => [
            ['name' => 'Iberostar Saidia', 'price' => '1800 MAD', 'rating' => 4.2, 'reviews' => '4,4 k', 'budget_level' => 'moderate'],
            ['name' => 'Radisson Blu Resort Saidia Beach', 'price' => '1600 MAD', 'rating' => 4.0, 'reviews' => '2,5 k', 'budget_level' => 'moderate'],
            ['name' => 'Be Live Collection Saidia', 'price' => '1450 MAD', 'rating' => 3.8, 'reviews' => '3,2 k', 'budget_level' => 'moderate'],
        ],
        'El Jadida' => [
            ['name' => 'Mazagan Beach & Golf Resort', 'price' => '2400 MAD', 'rating' => 4.5, 'reviews' => '9 k', 'budget_level' => 'luxury'],
            ['name' => 'Pullman Mazagan Royal Golf & Spa', 'price' => '1300 MAD', 'rating' => 4.2, 'reviews' => '2,5 k', 'budget_level' => 'moderate'],
            ['name' => 'Ibis El Jadida', 'price' => '620 MAD', 'rating' => 3.7, 'reviews' => '1,8 k', 'budget_level' => 'cheap'],
        ],
        'Atlantic Coast' => [
            ['name' => 'La Sultana Oualidia', 'price' => '4500 MAD', 'rating' => 4.8, 'reviews' => '800', 'budget_level' => 'luxury'],
            ['name' => 'Chateau Eden El Rouh', 'price' => '1200 MAD', 'rating' => 4.2, 'reviews' => '600', 'budget_level' => 'moderate'],
            ['name' => "L'Hippocampe Oualidia", 'price' => '900 MAD', 'rating' => 4.0, 'reviews' => '500', 'budget_level' => 'cheap'],
        ],
        'Tiznit' => [
            ['name' => 'Hotel Idou Tiznit', 'price' => '550 MAD', 'rating' => 4.0, 'reviews' => '950', 'budget_level' => 'cheap'],
            ['name' => 'Riad Assounfou', 'price' => '600 MAD', 'rating' => 4.5, 'reviews' => '450', 'budget_level' => 'cheap'],
            ['name' => "Maison d'Hotes Le Lieu", 'price' => '480 MAD', 'rating' => 4.3, 'reviews' => '200', 'budget_level' => 'cheap'],
        ],
        'Ait Ben Haddou' => [
            ['name' => 'Kasbah Tebi', 'price' => '900 MAD', 'rating' => 4.5, 'reviews' => '700', 'budget_level' => 'cheap'],
            ['name' => 'Ksar Ighnda', 'price' => '1350 MAD', 'rating' => 4.5, 'reviews' => '1 k', 'budget_level' => 'moderate'],
            ['name' => 'Riad Caravane', 'price' => '1000 MAD', 'rating' => 4.7, 'reviews' => '750', 'budget_level' => 'moderate'],
        ],
        'Tafraoute' => [
            ['name' => 'Hotel Les Amandiers Tafraoute', 'price' => '650 MAD', 'rating' => 4.0, 'reviews' => '900', 'budget_level' => 'cheap'],
            ['name' => 'Hotel Salama Tafraoute', 'price' => '420 MAD', 'rating' => 4.2, 'reviews' => '500', 'budget_level' => 'cheap'],
            ['name' => 'Maison Tigmi Ozro', 'price' => '520 MAD', 'rating' => 4.6, 'reviews' => '400', 'budget_level' => 'cheap'],
        ],
    ];

    public function run(): void
    {
        $imagePool = [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=700&q=80',
        ];

        $imageIndex = 0;

        foreach ($this->hotelData as $cityName => $hotels) {
            // Try to find the city by exact name or common alias
            $city = City::where('name', $cityName)
                ->orWhere('name', 'LIKE', "%{$cityName}%")
                ->first();

            if (!$city) {
                $this->command->warn("City not found in DB: {$cityName} — skipping.");
                continue;
            }

            foreach ($hotels as $hotel) {
                // Skip duplicates
                $exists = Hotel::where('city_id', $city->id)
                    ->where('name', $hotel['name'])
                    ->exists();

                if ($exists) {
                    continue;
                }

                Hotel::create([
                    'city_id'      => $city->id,
                    'name'         => $hotel['name'],
                    'price'        => $hotel['price'],
                    'rating'       => $hotel['rating'],
                    'reviews'      => $hotel['reviews'] ?? null,
                    'budget_level' => $hotel['budget_level'] ?? 'moderate',
                    'description'  => "Hôtel réel situé à {$city->name}, Maroc. Disponible sur Google Maps.",
                    'source'       => 'Google Maps',
                    'maps_query'   => $hotel['name'] . ', ' . $city->name . ', Morocco',
                    'image'        => $imagePool[$imageIndex % count($imagePool)],
                ]);

                $imageIndex++;
            }

            $this->command->info("✓ Seeded hotels for {$cityName}");
        }
    }
}
