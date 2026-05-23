import { buildMockTripData, normalizeTripData } from "./moroccoData";

const TIMEOUT_MS = 45000;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const generateTripData = async ({
  location,
  noOfDays,
  traveler,
  budget,
  lang = "FR"
}) => {
  const safeLocation = (location || "Marrakech").trim();
  const safeDays = Number(noOfDays) > 0 ? String(Number(noOfDays)) : "3";
  const safeTraveler = traveler || "Solo";
  const safeBudget = budget || "Moderate";

  const fallbackArgs = {
    location: safeLocation,
    noOfDays: safeDays,
    traveler: safeTraveler,
    budget: safeBudget,
    lang: lang
  };

  // Get API key from .env
  const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;

  if (!apiKey) {
    console.info("[AI Service] No OpenRouter API key found. Using premium fallback simulation.");
    return buildMockTripData(safeLocation, safeDays, safeTraveler, safeBudget, lang);
  }

  // Language instructions for localized output
  const languageInstructions = {
    FR: "Toutes les descriptions, noms de lieux, détails d'activités et titres doivent être rédigés en Français.",
    EN: "All descriptions, place names, activity details, and titles must be written in English.",
    AR: "يجب أن تكون جميع الأوصاف وأسماء الأماكن وتفاصيل الأنشطة والعناوين مكتوبة باللغة العربية."
  };

  const selectedLangInstruct = languageInstructions[lang] || languageInstructions["FR"];

  // Budget guidance for AI to select appropriate price ranges
  const budgetGuide = {
    Cheap: "Budget/backpacker level — cheapest options available (hostels, budget riads, street food restaurants, free camping spots). Prices under 400 MAD/night for accommodation.",
    Moderate: "Mid-range comfort — good quality 3-4 star hotels, well-rated restaurants, comfortable hostels. Prices 400-1200 MAD/night for accommodation.",
    Luxury: "High-end luxury — 5-star hotels, luxury riads, fine dining restaurants, glamping. Prices above 1200 MAD/night for accommodation."
  };

  const budgetInstruction = budgetGuide[safeBudget] || budgetGuide["Moderate"];

  const PROMPT = `
You are a Morocco travel expert. Generate a REAL travel plan for ${safeLocation}, Morocco.

CRITICAL RULES:
1. ALL hotels, riads, restaurants, hostels, and camping sites MUST be REAL places that actually exist in ${safeLocation}, Morocco.
2. Use their REAL names as they appear on Google Maps.
3. Use their REAL addresses as they appear on Google Maps.
4. Use REAL approximate prices in MAD (Moroccan Dirham).
5. Use REAL ratings (approximate Google Maps ratings).
6. Do NOT invent or fabricate any place names. Every single place must be a real, operating business that can be found on Google Maps.
7. For itinerary activities, use REAL monuments, souks, museums, beaches, parks, and attractions that exist in ${safeLocation}.

Trip Configuration:
- Destination: ${safeLocation}, Morocco
- Duration: ${safeDays} days
- Travel Group: ${safeTraveler}
- Budget Level: ${safeBudget} — ${budgetInstruction}

Language:
${selectedLangInstruct}

Return a JSON object with this EXACT schema:
{
  "hotel_options": [
    {
      "name": "REAL hotel or resort name as on Google Maps",
      "address": "REAL full address, ${safeLocation}, Morocco",
      "price": "Real price range per night in MAD",
      "rating": "Real rating (e.g. 4.5)",
      "description": "Brief appealing description of this real hotel"
    }
  ],
  "riad_options": [
    {
      "name": "REAL traditional Riad/Ryad name as on Google Maps",
      "address": "REAL full address, ${safeLocation}, Morocco",
      "price": "Real price range per night in MAD",
      "rating": "Real rating (e.g. 4.7)",
      "description": "Brief appealing description of this real traditional Moroccan Riad"
    }
  ],
  "restaurant_options": [
    {
      "name": "REAL restaurant name as on Google Maps",
      "address": "REAL full address, ${safeLocation}, Morocco",
      "price": "Average meal price range in MAD",
      "cuisine": "Type of cuisine (e.g. Moroccan Traditional, Seafood, French-Moroccan)",
      "rating": "Real rating (e.g. 4.3)",
      "description": "Brief appealing description of this real restaurant"
    }
  ],
  "hostel_options": [
    {
      "name": "REAL hostel/auberge name as on Google Maps",
      "address": "REAL full address, ${safeLocation}, Morocco",
      "price": "Real price per night in MAD",
      "rating": "Real rating (e.g. 4.2)",
      "description": "Brief description of this real hostel"
    }
  ],
  "camping_options": [
    {
      "name": "REAL camping/glamping site name as on Google Maps",
      "address": "REAL full address or location description",
      "price": "Real price per night in MAD",
      "rating": "Real rating (e.g. 4.0)",
      "description": "Brief description of this real camping spot"
    }
  ],
  "itinerary": [
    {
      "day": "Day label (e.g. Day 1 / Jour 1 / اليوم 1)",
      "plan": [
        {
          "time": "Time of day (Morning/Matin/صباحاً, Lunch/Midi/غداء, Afternoon/Après-midi/بعد الزوال, Evening/Soir/مساءً)",
          "place": "REAL place/monument/restaurant name as on Google Maps",
          "details": "Engaging description of what to do at this REAL place",
          "ticket_pricing": "Real ticket/entry fee in MAD (e.g. Free / 70 MAD)",
          "rating": "Real rating (e.g. 4.6)"
        }
      ]
    }
  ]
}

Provide:
- At least 3 hotel/resort options matching the budget
- At least 2 traditional Riad options matching the budget
- At least 3 restaurant options matching the budget
- At least 2 hostel options
- At least 1 camping/glamping option (if available near ${safeLocation}, otherwise provide the closest option)
- ${safeDays} days of itinerary with 4 activities per day (morning, lunch, afternoon, evening)

IMPORTANT: Output ONLY raw JSON. No markdown, no code fences, no explanations. Just the JSON object.
  `;

  try {
    // Run with timeout race
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("OpenRouter API request timed out")), TIMEOUT_MS)
    );

    const apiCallPromise = (async () => {
      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Morocco AI Travel Planner"
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          messages: [
            {
              role: "system",
              content: "You are a professional Morocco travel expert AI. You have deep knowledge of REAL hotels, riads, restaurants, hostels, camping sites, and tourist attractions across all Moroccan cities. You ONLY recommend places that actually exist and can be verified on Google Maps. You return only valid JSON with no extra text or formatting."
            },
            {
              role: "user",
              content: PROMPT
            }
          ],
          temperature: 0.4,
          max_tokens: 8000
        })
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`OpenRouter API error ${response.status}: ${errBody}`);
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content || "{}";

      // Clean potential markdown code fences from the response
      const cleaned = content
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/g, "")
        .trim();

      return JSON.parse(cleaned);
    })();

    const parsedData = await Promise.race([apiCallPromise, timeoutPromise]);

    if (parsedData && typeof parsedData === "object") {
      return normalizeTripData(parsedData, fallbackArgs);
    }
  } catch (error) {
    console.warn("[AI Service] Failed to generate with OpenRouter. Using fallback mock.", error.message);
  }

  // Fallback
  return buildMockTripData(safeLocation, safeDays, safeTraveler, safeBudget, lang);
};
