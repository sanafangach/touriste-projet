// Destination Context Layer
// Connects learning content to the user's travel destination
// Designed for the AMUDUX Travel Learning Platform

export const DESTINATIONS = [
  {
    id: 'marrakech',
    nameKey: 'destMarrakech',
    emoji: '🕌',
    atmosphere: 'warm',
    atmosphereKey: 'destAtmosWarm',
    accentColor: 'rgba(255, 122, 0, 0.14)',
    suggestedPhrases: ['v7', 'v8', 'v9', 'v10', 'v11', 'v12', 'v13', 'v14'],
    suggestedScenarios: ['cafe_marrakech', 'souk_marrakech'],
    culturalHighlights: [
      { titleKey: 'destTipSouk', descKey: 'destTipSoukDesc', icon: '🏪' },
      { titleKey: 'destTipRiad', descKey: 'destTipRiadDesc', icon: '🏠' },
      { titleKey: 'destTipJemaa', descKey: 'destTipJemaaDesc', icon: '🌙' }
    ],
    tifinaghSpots: [
      { titleKey: 'tifSpotIrcam', descKey: 'tifSpotIrcamDesc' },
      { titleKey: 'tifSpotSigns', descKey: 'tifSpotSignsDesc' }
    ],
    quickPhrases: [
      { darija: 'Fin kayn Jemaa el-Fna?', key: 'qpJemaa' },
      { darija: 'Bghit nchouf zrabi', key: 'qpCarpets' },
      { darija: 'Bch7al had taman?', key: 'qpPrice' }
    ]
  },
  {
    id: 'fes',
    nameKey: 'destFes',
    emoji: '🎨',
    atmosphere: 'mystical',
    atmosphereKey: 'destAtmosMystical',
    accentColor: 'rgba(45, 107, 79, 0.14)',
    suggestedPhrases: ['v1', 'v2', 'v3', 'v4', 'v7', 'v11', 'v13'],
    suggestedScenarios: ['cafe_marrakech', 'petit_taxi'],
    culturalHighlights: [
      { titleKey: 'destTipMedina', descKey: 'destTipMedinaDesc', icon: '🧭' },
      { titleKey: 'destTipTanneries', descKey: 'destTipTanneriesDesc', icon: '🎨' },
      { titleKey: 'destTipCeramics', descKey: 'destTipCeramicsDesc', icon: '🏺' }
    ],
    tifinaghSpots: [
      { titleKey: 'tifSpotUniv', descKey: 'tifSpotUnivDesc' },
      { titleKey: 'tifSpotSigns', descKey: 'tifSpotSignsDesc' }
    ],
    quickPhrases: [
      { darija: 'Fin kayn fondouq?', key: 'qpFondouq' },
      { darija: 'Wach kayn chi guide?', key: 'qpGuide' },
      { darija: 'Dini l medina 3afak', key: 'qpMedina' }
    ]
  },
  {
    id: 'chefchaouen',
    nameKey: 'destChefchaouen',
    emoji: '💙',
    atmosphere: 'serene',
    atmosphereKey: 'destAtmosSerene',
    accentColor: 'rgba(74, 144, 226, 0.14)',
    suggestedPhrases: ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v15'],
    suggestedScenarios: ['cafe_marrakech'],
    culturalHighlights: [
      { titleKey: 'destTipBlue', descKey: 'destTipBlueDesc', icon: '💙' },
      { titleKey: 'destTipRif', descKey: 'destTipRifDesc', icon: '⛰️' },
      { titleKey: 'destTipHashish', descKey: 'destTipHashishDesc', icon: '🌿' }
    ],
    tifinaghSpots: [
      { titleKey: 'tifSpotRif', descKey: 'tifSpotRifDesc' }
    ],
    quickPhrases: [
      { darija: 'Zwin bezzaf hna', key: 'qpBeautiful' },
      { darija: 'Fin nqder nakhod tswira?', key: 'qpPhoto' },
      { darija: 'Wach kayn chi café?', key: 'qpCafe' }
    ]
  },
  {
    id: 'essaouira',
    nameKey: 'destEssaouira',
    emoji: '🌊',
    atmosphere: 'breezy',
    atmosphereKey: 'destAtmosBreezy',
    accentColor: 'rgba(41, 128, 185, 0.14)',
    suggestedPhrases: ['v1', 'v2', 'v3', 'v4', 'v7', 'v11', 'v15'],
    suggestedScenarios: ['cafe_marrakech'],
    culturalHighlights: [
      { titleKey: 'destTipWind', descKey: 'destTipWindDesc', icon: '🌬️' },
      { titleKey: 'destTipGnawa', descKey: 'destTipGnawaDesc', icon: '🎵' },
      { titleKey: 'destTipArgan', descKey: 'destTipArganDesc', icon: '🫒' }
    ],
    tifinaghSpots: [
      { titleKey: 'tifSpotSigns', descKey: 'tifSpotSignsDesc' }
    ],
    quickPhrases: [
      { darija: 'Bghit 7out meshwi', key: 'qpFish' },
      { darija: 'Fin kayn lb7ar?', key: 'qpBeach' },
      { darija: 'Wach kayn rih lyoum?', key: 'qpWind' }
    ]
  },
  {
    id: 'agadir',
    nameKey: 'destAgadir',
    emoji: '☀️',
    atmosphere: 'warm',
    atmosphereKey: 'destAtmosWarm',
    accentColor: 'rgba(241, 196, 15, 0.14)',
    suggestedPhrases: ['v1', 'v2', 'v3', 'v4', 'v7', 'v8', 'v11'],
    suggestedScenarios: ['cafe_marrakech', 'petit_taxi'],
    culturalHighlights: [
      { titleKey: 'destTipSouss', descKey: 'destTipSoussDesc', icon: '🏖️' },
      { titleKey: 'destTipAmazigh', descKey: 'destTipAmazighDesc', icon: 'ⵣ' },
      { titleKey: 'destTipSurf', descKey: 'destTipSurfDesc', icon: '🏄' }
    ],
    tifinaghSpots: [
      { titleKey: 'tifSpotSouss', descKey: 'tifSpotSoussDesc' },
      { titleKey: 'tifSpotSigns', descKey: 'tifSpotSignsDesc' }
    ],
    quickPhrases: [
      { darija: 'Fin kayn la plage?', key: 'qpPlage' },
      { darija: 'Bghit souk l7ad', key: 'qpSoukHad' },
      { darija: 'Wach kayn shems lyoum?', key: 'qpSun' }
    ]
  },
  {
    id: 'casablanca',
    nameKey: 'destCasablanca',
    emoji: '🏙️',
    atmosphere: 'urban',
    atmosphereKey: 'destAtmosUrban',
    accentColor: 'rgba(255, 255, 255, 0.08)',
    suggestedPhrases: ['v1', 'v2', 'v3', 'v5', 'v6', 'v11', 'v17'],
    suggestedScenarios: ['petit_taxi'],
    culturalHighlights: [
      { titleKey: 'destTipHassan2', descKey: 'destTipHassan2Desc', icon: '🕌' },
      { titleKey: 'destTipModern', descKey: 'destTipModernDesc', icon: '🏙️' },
      { titleKey: 'destTipCorniche', descKey: 'destTipCornicheDesc', icon: '🌅' }
    ],
    tifinaghSpots: [
      { titleKey: 'tifSpotSigns', descKey: 'tifSpotSignsDesc' },
      { titleKey: 'tifSpotInstitutions', descKey: 'tifSpotInstitutionsDesc' }
    ],
    quickPhrases: [
      { darija: 'Fin kayn tramway?', key: 'qpTramway' },
      { darija: 'Dini l Hassan II', key: 'qpHassan' },
      { darija: 'Bghit taxi l aéroport', key: 'qpAirport' }
    ]
  }
];

// Storage key for selected destination
const DESTINATION_KEY = 'amudux_selected_destination';

/**
 * Get the currently selected destination from localStorage
 * Future: replace with API call to user's travel plan
 */
export const getSelectedDestination = () => {
  try {
    const stored = localStorage.getItem(DESTINATION_KEY);
    if (stored) {
      return DESTINATIONS.find(d => d.id === stored) || null;
    }
    return null;
  } catch (e) {
    return null;
  }
};

/**
 * Set the selected destination
 * Future: replace with API call
 */
export const setSelectedDestination = (destinationId) => {
  try {
    if (destinationId) {
      localStorage.setItem(DESTINATION_KEY, destinationId);
    } else {
      localStorage.removeItem(DESTINATION_KEY);
    }
  } catch (e) {
    console.error('Error saving destination', e);
  }
};

/**
 * Get destination context by ID
 */
export const getDestinationContext = (destinationId) => {
  return DESTINATIONS.find(d => d.id === destinationId) || null;
};

/**
 * Get recommended phrase IDs for a destination
 */
export const getRecommendedPhrases = (destinationId) => {
  const dest = getDestinationContext(destinationId);
  return dest ? dest.suggestedPhrases : [];
};
