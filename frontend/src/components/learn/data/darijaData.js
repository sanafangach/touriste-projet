// Darija Language & Cultural Data
// Designed for the AMUDUX Immersive Learning Platform

export const darijaVocab = [
  // --- BEGINNER: GREETINGS & BASICS ---
  { id: 'v1', darija: "Salam", french: "Bonjour", english: "Hello", category: "Basiques", categoryKey: "catBasics", difficulty: 1, tags: ['greeting', 'essential'], destinationRelevance: ['all'] },
  { id: 'v2', darija: "Labas?", french: "Comment ça va ?", english: "How are you?", category: "Basiques", categoryKey: "catBasics", difficulty: 1, tags: ['greeting', 'essential'], destinationRelevance: ['all'] },
  { id: 'v3', darija: "Bslama", french: "Au revoir", english: "Goodbye", category: "Basiques", categoryKey: "catBasics", difficulty: 1, tags: ['greeting', 'essential'], destinationRelevance: ['all'] },
  { id: 'v4', darija: "Chokran", french: "Merci", english: "Thank you", category: "Basiques", categoryKey: "catBasics", difficulty: 1, tags: ['greeting', 'essential'], destinationRelevance: ['all'] },
  { id: 'v5', darija: "Wakaha", french: "D'accord / OK", english: "OK / Alright", category: "Basiques", categoryKey: "catBasics", difficulty: 1, tags: ['essential'], destinationRelevance: ['all'] },
  { id: 'v6', darija: "Afak", french: "S'il te plaît", english: "Please", category: "Basiques", categoryKey: "catBasics", difficulty: 1, tags: ['essential'], destinationRelevance: ['all'] },
  
  // --- INTERMEDIATE: CAFE & RESTAURANT ---
  { id: 'v7', darija: "Bghit", french: "Je voudrais", english: "I would like", category: "Restaurant", categoryKey: "catRestaurant", difficulty: 2, tags: ['cafe', 'restaurant', 'essential'], destinationRelevance: ['all'] },
  { id: 'v8', darija: "Atini", french: "Donne-moi", english: "Give me", category: "Restaurant", categoryKey: "catRestaurant", difficulty: 2, tags: ['cafe', 'restaurant'], destinationRelevance: ['all'] },
  { id: 'v9', darija: "Qahwa k7la", french: "Café noir", english: "Black coffee", category: "Restaurant", categoryKey: "catRestaurant", difficulty: 2, tags: ['cafe'], destinationRelevance: ['all'] },
  { id: 'v10', darija: "Atay b n3na3", french: "Thé à la menthe", english: "Mint tea", category: "Restaurant", categoryKey: "catRestaurant", difficulty: 2, tags: ['cafe', 'essential'], destinationRelevance: ['all'] },
  { id: 'v11', darija: "Bch7al?", french: "C'est combien ?", english: "How much?", category: "Restaurant", categoryKey: "catRestaurant", difficulty: 2, tags: ['souk', 'essential', 'bargaining'], destinationRelevance: ['all'] },
  { id: 'v12', darija: "L7sab 3afak", french: "L'addition s'il vous plaît", english: "The bill please", category: "Restaurant", categoryKey: "catRestaurant", difficulty: 2, tags: ['restaurant', 'cafe'], destinationRelevance: ['all'] },

  // --- STREET SLANG & SURVIVAL ---
  { id: 'v13', darija: "Safi", french: "C'est bon / Ça suffit", english: "That's enough / OK", category: "Street", categoryKey: "catStreet", difficulty: 3, tags: ['souk', 'street'], destinationRelevance: ['all'] },
  { id: 'v14', darija: "Bezzaf", french: "Beaucoup", english: "A lot / Too much", category: "Street", categoryKey: "catStreet", difficulty: 3, tags: ['souk', 'bargaining'], destinationRelevance: ['all'] },
  { id: 'v15', darija: "Zwin", french: "Beau / Bien", english: "Beautiful / Nice", category: "Street", categoryKey: "catStreet", difficulty: 3, tags: ['street'], destinationRelevance: ['all'] },
  { id: 'v16', darija: "Walo", french: "Rien", english: "Nothing", category: "Street", categoryKey: "catStreet", difficulty: 3, tags: ['street'], destinationRelevance: ['all'] },
  { id: 'v17', darija: "Daba", french: "Maintenant", english: "Now", category: "Street", categoryKey: "catStreet", difficulty: 3, tags: ['taxi', 'street', 'essential'], destinationRelevance: ['all'] },
  { id: 'v18', darija: "Machi mouchkil", french: "Pas de problème", english: "No problem", category: "Street", categoryKey: "catStreet", difficulty: 3, tags: ['essential', 'street'], destinationRelevance: ['all'] },

  // --- TRAVEL & LOGISTICS ---
  { id: 'v19', darija: "Fin kayn taxi?", french: "Où est le taxi ?", english: "Where is the taxi?", category: "Aéroport", categoryKey: "catAirport", difficulty: 1, tags: ['airport', 'taxi', 'essential'], destinationRelevance: ['all'] },
  { id: 'v20', darija: "Bghit nmchi l...", french: "Je veux aller à...", english: "I want to go to...", category: "Aéroport", categoryKey: "catAirport", difficulty: 1, tags: ['taxi', 'essential'], destinationRelevance: ['all'] },
  { id: 'v21', darija: "Khdem lcompteur", french: "Mets le compteur", english: "Turn on the meter", category: "Taxi", categoryKey: "catTaxi", difficulty: 2, tags: ['taxi', 'essential'], destinationRelevance: ['marrakech', 'fes', 'casablanca'] },
  { id: 'v22', darija: "Wqef hna 3afak", french: "Arrête-toi ici svp", english: "Stop here please", category: "Taxi", categoryKey: "catTaxi", difficulty: 2, tags: ['taxi'], destinationRelevance: ['all'] },

  // --- HOTEL & ACCOMMODATION ---
  { id: 'v23', darija: "3andi réservation", french: "J'ai une réservation", english: "I have a reservation", category: "Hôtel", categoryKey: "catHotel", difficulty: 2, tags: ['hotel', 'essential'], destinationRelevance: ['all'] },
  { id: 'v24', darija: "Fin kayn hammam?", french: "Où est le hammam ?", english: "Where is the hammam?", category: "Hôtel", categoryKey: "catHotel", difficulty: 2, tags: ['hotel'], destinationRelevance: ['marrakech', 'fes'] },
  { id: 'v25', darija: "Bghit lmeftah", french: "Je veux la clé", english: "I want the key", category: "Hôtel", categoryKey: "catHotel", difficulty: 2, tags: ['hotel'], destinationRelevance: ['all'] },

  // --- EMERGENCIES ---
  { id: 'v26', darija: "3awnoni!", french: "Aidez-moi !", english: "Help me!", category: "Urgences", categoryKey: "catEmergencies", difficulty: 1, tags: ['emergency', 'essential'], destinationRelevance: ['all'] },
  { id: 'v27', darija: "Fin kayn sbittar?", french: "Où est l'hôpital ?", english: "Where is the hospital?", category: "Urgences", categoryKey: "catEmergencies", difficulty: 1, tags: ['emergency', 'essential'], destinationRelevance: ['all'] },
  { id: 'v28', darija: "Mrid / Mrida", french: "Je suis malade (m/f)", english: "I'm sick (m/f)", category: "Urgences", categoryKey: "catEmergencies", difficulty: 1, tags: ['emergency'], destinationRelevance: ['all'] },

  // --- HUMOR & LOCAL FLAVOR ---
  { id: 'v29', darija: "Lla, ghali bezzaf a khouya!", french: "Non, trop cher mon frère !", english: "No, too expensive my friend!", category: "Humour", categoryKey: "catHumor", difficulty: 3, tags: ['souk', 'bargaining', 'humor'], destinationRelevance: ['marrakech', 'fes'] },
  { id: 'v30', darija: "Ana machi touriste, ana Mghribi!", french: "Je suis pas touriste, je suis Marocain !", english: "I'm not a tourist, I'm Moroccan!", category: "Humour", categoryKey: "catHumor", difficulty: 3, tags: ['humor', 'street'], destinationRelevance: ['all'] }
];

export const darijaConversations = [
  {
    id: "cafe_marrakech",
    title: "Un Café à Marrakech",
    description: "Commandez un thé traditionnel à la Médina.",
    difficulty: "Facile",
    xpReward: 50,
    tags: ['cafe', 'essential'],
    destinationRelevance: ['marrakech', 'fes', 'essaouira'],
    steps: [
      {
        npcText: "Salam khouya, achnou bghiti tachrob?",
        npcAudioLabel: "salam_cafe",
        translation: "Bonjour mon frère, que veux-tu boire ?",
        options: [
          { text: "Bghit atay b n3na3, 3afak.", isCorrect: true, feedback: "Excellent ! Le classique marocain." },
          { text: "Fin kayn tran?", isCorrect: false, feedback: "Non, ça veut dire 'Où est le train ?'" },
          { text: "Bchhal hada?", isCorrect: false, feedback: "Tu ne demandes pas encore le prix." }
        ]
      },
      {
        npcText: "Wakha, b soukkar wla bla soukkar?",
        translation: "D'accord, avec ou sans sucre ?",
        options: [
          { text: "Bla soukkar 3afak.", isCorrect: true, feedback: "Parfait ! 'Bla' veut dire 'sans'." },
          { text: "Zwin bezzaf.", isCorrect: false, feedback: "Tu viens de dire 'C'est très beau'." },
          { text: "Safi, bslama.", isCorrect: false, feedback: "Tu pars déjà ?" }
        ]
      },
      {
        npcText: "Hanta a sidi. L7sab houwa 15 dirham.",
        translation: "Voici monsieur. L'addition est de 15 dirhams.",
        options: [
          { text: "Chokran, tfadal.", isCorrect: true, feedback: "Tfadal = Tiens/Je t'en prie. Très poli !" },
          { text: "Walo.", isCorrect: false, feedback: "'Walo' veut dire 'rien'. Mauvaise réponse." },
          { text: "Machi mouchkil.", isCorrect: false, feedback: "Pas vraiment adapté ici." }
        ]
      }
    ]
  },
  {
    id: "petit_taxi",
    title: "Le Petit Taxi",
    description: "Négociez et dirigez votre taxi.",
    difficulty: "Moyen",
    xpReward: 80,
    tags: ['taxi', 'transport'],
    destinationRelevance: ['marrakech', 'fes', 'casablanca'],
    steps: [
      {
        npcText: "Salam, fin ghadi?",
        translation: "Bonjour, où vas-tu ?",
        options: [
          { text: "Gare routière 3afak, khdem lcompteur.", isCorrect: true, feedback: "Très intelligent de demander le compteur ('khdem lcompteur') !" },
          { text: "Bghit qahwa.", isCorrect: false, feedback: "Le taxi ne sert pas de café." },
          { text: "Atini l7sab.", isCorrect: false, feedback: "Tu n'es pas encore arrivé." }
        ]
      },
      {
        npcText: "Wakha sidi. Z7am daba f triq.",
        translation: "D'accord monsieur. Il y a des embouteillages maintenant.",
        options: [
          { text: "Machi mouchkil, andi lwaqt.", isCorrect: true, feedback: "'Pas de problème, j'ai le temps'." },
          { text: "Bchhal?", isCorrect: false, feedback: "Il a mis le compteur, pas besoin de négocier." },
          { text: "Bslama.", isCorrect: false, feedback: "Tu sautes du taxi en marche ?" }
        ]
      }
    ]
  },
  {
    id: "souk_marrakech",
    title: "Le Tapis de Marrakech",
    description: "Négociez le prix d'un tapis Zellige avec un vendeur coriace.",
    difficulty: "Avancé",
    xpReward: 150,
    tags: ['souk', 'bargaining'],
    destinationRelevance: ['marrakech', 'fes'],
    steps: [
      {
        npcText: "Marhaba! Zid a khouya, chouf had zrabi, sena3a dyal yedd!",
        translation: "Bienvenue ! Approche mon frère, regarde ces tapis, faits à la main !",
        mood: "Accueillant",
        options: [
          { text: "Salam, bchhal had zarbiya?", isCorrect: true, feedback: "Direct au but, très bien.", moodImpact: "Intéressé" },
          { text: "Zwin bezzaf, bghito fabor.", isCorrect: false, feedback: "Tu demandes que ce soit gratuit ('fabor'). Il ne va pas aimer.", moodImpact: "Vexé" },
          { text: "Bslama.", isCorrect: false, feedback: "Tu ne veux même pas regarder ?", moodImpact: "Confus" }
        ]
      },
      {
        npcText: "Hadi? Hadi a sidi b 1500 dirham. Taman mzyan lik.",
        translation: "Celle-ci ? C'est 1500 dirhams monsieur. Un bon prix pour toi.",
        mood: "Vendeur",
        options: [
          { text: "Ghali bezzaf! N3tik 500 dirham.", isCorrect: false, feedback: "Trop bas ! C'est insultant dans la négociation marocaine de diviser par 3 d'un coup.", moodImpact: "En colère" },
          { text: "Taman ghali chwiya a khoya. Bchhal men lekher?", isCorrect: true, feedback: "'Combien en dernier prix ?' - La phrase magique du souk !", moodImpact: "Respectueux" },
          { text: "Wakha, hahiya 1500.", isCorrect: false, feedback: "Règle numéro 1 au Maroc : ne jamais accepter le premier prix !", moodImpact: "Riche Touriste" }
        ]
      },
      {
        npcText: "Nqs lik chwiya. Khalliha b 1000 dirham, wllah ma rb7t fiha.",
        translation: "Je te baisse un peu. Laisse-la à 1000 dirhams, je te jure que je n'y gagne rien.",
        mood: "Négociateur",
        options: [
          { text: "Nqsamha flnass, 800 dirham w nakhoudha daba.", isCorrect: true, feedback: "'On coupe la poire en deux, 800 et je la prends de suite'. Magistral !", moodImpact: "Impressionné" },
          { text: "La, 200 dirham w safi.", isCorrect: false, feedback: "Tu forces trop, il va refuser de te la vendre.", moodImpact: "Fermé" }
        ]
      }
    ]
  },
  {
    id: "hotel_checkin",
    title: "Arrivée au Riad",
    description: "Faites votre check-in et découvrez les coutumes d'accueil.",
    difficulty: "Facile",
    xpReward: 60,
    tags: ['hotel', 'essential'],
    destinationRelevance: ['all'],
    steps: [
      {
        npcText: "Marhaba! Ahlan w sahlan. 3andek réservation?",
        translation: "Bienvenue ! Avez-vous une réservation ?",
        options: [
          { text: "Iyyeh, 3andi réservation b smiti.", isCorrect: true, feedback: "'Oui, j'ai une réservation à mon nom'. Parfait !" },
          { text: "Bchhal lbit?", isCorrect: false, feedback: "Tu n'as pas encore confirmé ta réservation." },
          { text: "Bslama.", isCorrect: false, feedback: "Tu viens d'arriver, ne repars pas !" }
        ]
      },
      {
        npcText: "Ah naam, marhaba bik! Tay7ou l babouche w dkhol, hana l bit dyalek. Bghiti atay?",
        translation: "Ah oui, bienvenue ! Enlevez vos chaussures et entrez. Voici votre chambre. Voulez-vous du thé ?",
        options: [
          { text: "Iyyeh, chokran bezzaf. Zwin bezzaf hna!", isCorrect: true, feedback: "'Oui merci beaucoup. C'est très beau ici!' — Accepter le thé est un geste d'amitié !" },
          { text: "La, mabghitch.", isCorrect: false, feedback: "Refuser le thé d'accueil n'est pas très poli au Maroc." }
        ]
      }
    ]
  }
];
