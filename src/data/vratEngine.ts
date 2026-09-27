import { LanguageCode } from '../types';

export interface VratDetail {
  id: string;
  name: string;
  nameHi: string;
  nameRegional?: Record<string, string>;
  category: 'ekadashi' | 'pradosh' | 'chaturthi' | 'purnima' | 'amavasya' | 'special';
  monthIndex: number; // 0 = Jan, 11 = Dec
  gregorianDate: string; // YYYY-MM-DD
  dayOfWeek: string;
  tithiText: string;
  paksha: 'Shukla' | 'Krishna';
  deity: string;
  fastingType: 'Nirjala (Waterless)' | 'Phalahar (Fruits & Milk)' | 'Ekabhukta (Single Meal)' | 'Jalahar (Water only)';
  paranaTime?: string;
  moonriseTime?: string;
  scripturalReference: string;
  significance: string;
  sankalpaMantra: {
    sanskrit: string;
    transliteration: string;
    meaning: string;
  };
  rituals: string[];
  pujaVidhi: string;
  dietaryRules: {
    allowed: string[];
    prohibited: string[];
  };
}

export const MONTHLY_VRATS_2027: VratDetail[] = [
  // --- JANUARY 2027 ---
  {
    id: 'pausha-putrada-ekadashi-2027',
    name: 'Pausha Putrada Ekadashi',
    nameHi: 'पौष पुत्रदा एकादशी',
    nameRegional: { mr: 'पौष पुत्रदा एकादशी', gu: 'પોષ પુત્રદા એકાદશી', te: 'పుత్రదా ఏకాదశి' },
    category: 'ekadashi',
    monthIndex: 0,
    gregorianDate: '2027-01-18',
    dayOfWeek: 'Monday',
    tithiText: 'Pausha Shukla Ekadashi',
    paksha: 'Shukla',
    deity: 'Bhagwan Vishnu / Narayana',
    fastingType: 'Phalahar (Fruits & Milk)',
    paranaTime: '07:15 AM to 09:22 AM (Jan 19)',
    scripturalReference: 'Bhavishya Purana (Dialogue between Lord Krishna and King Yudhishthira)',
    significance: 'Grants offspring, family lineage longevity, and washes away accumulated ancestral sins. Devotees seeking auspicious children observe this sacred vrat with steadfast devotion.',
    sankalpaMantra: {
      sanskrit: 'मम सर्वपापक्षयपूर्वकं पुत्रपौत्राद्यभिवृद्धये श्रीविष्णुप्रीत्यर्थं पुत्रदा एकादशी व्रतं करिष्ये।',
      transliteration: 'Mama sarvapāpakṣayapūrvakaṁ putrapautrādyabhivṛddhaye śrīviṣṇuprītyarthaṁ putradā ekādaśī vrataṁ kariṣye.',
      meaning: 'I resolve to observe the Putrada Ekadashi fast to remove all sins, ensure the righteous growth of my progeny, and attain the divine grace of Lord Vishnu.'
    },
    rituals: [
      'Early morning bath during Brahma Muhurat (before sunrise) with sacred water or Gangajal',
      'Placing a brass or silver idol of Lord Narayana on a clean yellow cloth',
      'Offering Panchamrit, yellow flowers, Tulsi leaves, and seasonal fresh fruits',
      'Chanting Vishnu Sahasranama or Om Namo Bhagavate Vasudevaya 108 times',
      'Observing complete fast or single fruit meal without grains',
      'Breaking the fast (Parana) on Dwadashi morning within the prescribed Muhurat window'
    ],
    pujaVidhi: 'Bathe the Shaligram or Vishnu idol with milk, curd, honey, sugar, and ghee. Apply sandalwood paste, light an oil lamp with cow ghee, and recite the Putrada Ekadashi Vrat Katha.',
    dietaryRules: {
      allowed: ['Fresh fruits', 'Cow milk & curd', 'Makhana (Fox nuts)', 'Sabudana', 'Singhara (Water chestnut) flour', 'Sendha Namak (Rock salt)'],
      prohibited: ['Grains (Rice, Wheat, Barley)', 'Lentils & Pulses', 'Onion & Garlic', 'Table Salt', 'Non-vegetarian food', 'Alcohol & Intoxicants']
    }
  },
  {
    id: 'pausha-purnima-2027',
    name: 'Pausha Purnima (Shakambhari Purnima)',
    nameHi: 'पौष पूर्णिमा (शाकंभरी पूर्णिमा)',
    nameRegional: { mr: 'पौष पौर्णिमा', gu: 'પોષી પૂનમ', te: 'పుష్య పౌర్ణమి' },
    category: 'purnima',
    monthIndex: 0,
    gregorianDate: '2027-01-22',
    dayOfWeek: 'Friday',
    tithiText: 'Pausha Shukla Purnima',
    paksha: 'Shukla',
    deity: 'Maa Shakambhari & Lord Satyanarayan',
    fastingType: 'Phalahar (Fruits & Milk)',
    moonriseTime: '05:32 PM',
    scripturalReference: 'Skanda Purana & Matsya Purana',
    significance: 'Marks the culmination of Shakambhari Navratri and commencement of the holy month-long Magha Snana. Purifies bodily elements through evening Chandra Arghya.',
    sankalpaMantra: {
      sanskrit: 'ॐ नमो भगवते सत्यनारायणाय। पौष पूर्णिमायां सत्यनारायण पूजनं चंद्रार्घ्यं च करिष्ये।',
      transliteration: 'Om namo bhagavate satyanārāyaṇāya. Pauṣa pūrṇimāyāṁ satyanārāyaṇa pūjanaṁ candrārghyaṁ ca kariṣye.',
      meaning: 'Salutations to Bhagwan Satyanarayan. On this Pausha Purnima, I resolve to worship the Lord of Truth and offer ceremonial oblation to the Full Moon.'
    },
    rituals: [
      'Holy dip in holy rivers or adding Gangajal to bath water at sunrise',
      'Evening Shri Satyanarayan Puja with banana stem mandap, Sheera/Panjiri prasad, and Panchamrit',
      'Offering Arghya to the rising Full Moon using water, milk, and white flowers in a conch or silver pot',
      'Charity of sesame, warm blankets, and grains to needy individuals'
    ],
    pujaVidhi: 'Recite all 5 chapters of Satyanarayan Katha with family. Light camphor and sing Aarti. Distribute prasad before breaking the fast.',
    dietaryRules: {
      allowed: ['Fruits', 'Milk preparations', 'Panjiri prasad after puja', 'Dry fruits'],
      prohibited: ['Cooked grains before moonrise', 'Non-vegetarian food', 'Garlic & Onion']
    }
  },
  {
    id: 'shattila-ekadashi-2027',
    name: 'Shattila Ekadashi (6 Sesame Rites)',
    nameHi: 'षट्तिला एकादशी',
    nameRegional: { mr: 'षट्तिला एकादशी', gu: 'ષટતિલા એકાદશી', te: 'షట్తిలా ఏకాదశి' },
    category: 'ekadashi',
    monthIndex: 0,
    gregorianDate: '2027-02-02',
    dayOfWeek: 'Tuesday',
    tithiText: 'Magha Krishna Ekadashi',
    paksha: 'Krishna',
    deity: 'Bhagwan Vishnu',
    fastingType: 'Phalahar (Fruits & Milk)',
    paranaTime: '07:08 AM to 09:18 AM (Feb 03)',
    scripturalReference: 'Padma Purana & Bhavishya Purana',
    significance: 'Prescribes six sacred uses of Til (sesame): sesame bath, sesame oil massage, sesame havan, sesame tarpan, sesame food, and sesame charity. Removes spiritual poverty.',
    sankalpaMantra: {
      sanskrit: 'षट्तिलादानपुण्येन सर्वपापप्रणाशनम्। विष्णुप्रीतिकरं पुण्यं लभतां मे मनोरथम्॥',
      transliteration: 'Ṣaṭtilādānapuṇyena sarvapāpapraṇāśanam. Viṣṇuprītikaraṁ puṇyaṁ labhatāṁ me manoratham.',
      meaning: 'Through the sixfold charity and worship of sesame seeds, may all sins dissolve and Lord Vishnu grant peace, auspiciousness, and spiritual liberation.'
    },
    rituals: [
      'Til Snana: Bathe with sesame water to purify subtle nadis',
      'Til Ubtan: Apply paste made of sesame seeds to the body',
      'Til Havan: Offer black sesame seeds with ghee into the sacred fire',
      'Til Tarpan: Offer water mixed with black sesame to ancestors',
      'Til Daan: Gift sesame laddoos and seeds to Vedic scholars and the poor',
      'Til Aahar: Consume sesame-based prasadam post-puja'
    ],
    pujaVidhi: 'Worship Lord Krishna with yellow flowers and incense. Offer jaggery-sesame sweets. Stay awake chanting the Vishnu Sahasranama.',
    dietaryRules: {
      allowed: ['Sesame preparations (Til Ladoo with jaggery)', 'Milk & Fruits', 'Sendha salt'],
      prohibited: ['Wheat, Rice, and Dal', 'Tamasic food', 'Mustard oil cooking']
    }
  },

  // --- FEBRUARY 2027 ---
  {
    id: 'jaya-ekadashi-2027',
    name: 'Jaya Ekadashi',
    nameHi: 'जया एकादशी',
    nameRegional: { mr: 'जया एकादशी', gu: 'જયા એકાદશી', te: 'జయా ఏకాదశి' },
    category: 'ekadashi',
    monthIndex: 1,
    gregorianDate: '2027-02-16',
    dayOfWeek: 'Tuesday',
    tithiText: 'Magha Shukla Ekadashi',
    paksha: 'Shukla',
    deity: 'Bhagwan Vishnu / Madhava',
    fastingType: 'Phalahar (Fruits & Milk)',
    paranaTime: '06:59 AM to 09:12 AM (Feb 17)',
    scripturalReference: 'Padma Purana (Story of Gandharva Malyavan and Pushyavati)',
    significance: 'Liberates souls from ghostly rebirths (Preta Yoni) and demonic realms. Bestows victory over spiritual impediments and internal negative tendencies.',
    sankalpaMantra: {
      sanskrit: 'ॐ नमो भगवते वासुदेवाय। जया एकादशी व्रतं कृत्वा मोक्षं प्राप्नोमि शाश्वतम्॥',
      transliteration: 'Om namo bhagavate vāsudevāya. Jayā ekādaśī vrataṁ kṛtvā mokṣaṁ prāpnomi śāśvatam.',
      meaning: 'Salutations to the Supreme Lord Vasudeva. Observing Jaya Ekadashi, I pray for victory over karma and the attainment of eternal spiritual release.'
    },
    rituals: [
      'Morning purification bath chanting river invocations',
      'Offering incense, butter lamp, white sandalwood, and basil (Tulsi) leaves',
      'Listening to the sacred narrative of Malyavan and Pushyavati liberated from Pisacha life',
      'Night-long kirtan (Jagran) praising Bhagwan Narayana',
      'Dwadashi Parana within Shubh Muhurat window'
    ],
    pujaVidhi: 'Offer yellow cloth, betel leaves, cloves, and cardamom. Recite Narayana Kavacham for psychic protection and spiritual illumination.',
    dietaryRules: {
      allowed: ['Fruits', 'Nuts', 'Buckwheat (Kuttu)', 'Milk and dairy'],
      prohibited: ['All grains and cereals', 'Legumes', 'Sea salt']
    }
  },
  {
    id: 'maha-shivratri-vrat-2027',
    name: 'Maha Shivratri Vrat (Great Night of Shiva)',
    nameHi: 'महाशिवरात्रि व्रत',
    nameRegional: { mr: 'महाशिवरात्री व्रत', gu: 'મહાશિવરાત્રિ', te: 'మహా శివరాత్రి' },
    category: 'special',
    monthIndex: 1,
    gregorianDate: '2027-02-06',
    dayOfWeek: 'Saturday',
    tithiText: 'Magha Krishna Chaturdashi',
    paksha: 'Krishna',
    deity: 'Devadhidev Mahadev Shiva & Maa Parvati',
    fastingType: 'Nirjala (Waterless)',
    paranaTime: '07:05 AM to 03:20 PM (Feb 07)',
    scripturalReference: 'Shiva Purana, Linga Purana & Skanda Purana',
    significance: 'The cosmic night when Lord Shiva performed the celestial Tandava Nritya and manifested as the infinite Jyotirlinga. Fasting and staying awake on this night destroys lifetimes of karmic bondage.',
    sankalpaMantra: {
      sanskrit: 'शिवरात्रिव्रतं ह्येतत् करिष्येऽहं महाफलम्। निर्विघ्नमस्तु मे देव त्वत्प्रसादाज्जगत्पते॥',
      transliteration: 'Śivarātrivrataṁ hyetat kariṣye\'haṁ mahāphalam. Nirvighnamastu me deva tvatprasādājjagatpate.',
      meaning: 'O Lord of the Universe, I undertake this great Shivratri fast for supreme spiritual fruit. By Your grace, may this vow be fulfilled without any obstacles.'
    },
    rituals: [
      'Strict waterless (Nirjala) or water-only (Jalahar) fasting throughout 24 hours',
      'Char Pahar Abhishek: Four separate continuous worship ceremonies across the four watches of the night',
      'First Pahar: Abhishek with Milk; Second Pahar: Curd; Third Pahar: Ghee; Fourth Pahar: Honey',
      'Offering unbroken Bilva Patra with chants of "Om Namah Shivaya"',
      'Chanting Mahamrityunjaya Mantra and Rudrashtakam with continuous Dhyana',
      'Breaking fast after sunrise on the following morning following final Shivling puja'
    ],
    pujaVidhi: 'Clean Shivling with Gangajal. Offer Bhasma, Sandalwood paste, Dhatura, Bhang, and unbroken Bel leaves. Light camphor and circumambulate three-quarters (Ardhapradakshina).',
    dietaryRules: {
      allowed: ['Water (if not Nirjala)', 'Fruit milk or herbal tea after night pujas', 'Singhara flour on next morning Parana'],
      prohibited: ['Grains, lentils, beans', 'All cooked foods', 'Salt of any kind', 'Sleeping during the night']
    }
  },

  // --- MARCH 2027 ---
  {
    id: 'vijaya-ekadashi-2027',
    name: 'Vijaya Ekadashi',
    nameHi: 'विजया एकादशी',
    nameRegional: { mr: 'विजया एकादशी', gu: 'વિજયા એકાદશી', te: 'విజయ ఏకాదశి' },
    category: 'ekadashi',
    monthIndex: 2,
    gregorianDate: '2027-03-04',
    dayOfWeek: 'Thursday',
    tithiText: 'Phalguna Krishna Ekadashi',
    paksha: 'Krishna',
    deity: 'Bhagwan Rama / Vishnu',
    fastingType: 'Phalahar (Fruits & Milk)',
    paranaTime: '06:44 AM to 09:02 AM (Mar 05)',
    scripturalReference: 'Skanda Purana (Observed by Lord Rama before crossing to Lanka)',
    significance: 'Bestows insurmountable victory (Vijaya) over complex adversaries, court battles, and worldly troubles. Lord Rama observed this fast on Sage Bakdalbhya\'s instruction to conquer Ravana.',
    sankalpaMantra: {
      sanskrit: 'विजयाय ममाभीष्टसिद्ध्यर्थं विष्णुपूजने। एकादश्यामुपोष्याहं करिष्ये नियमं दृढम्॥',
      transliteration: 'Vijayāya mamābhīṣṭasiddhyarthaṁ viṣṇupūjane. Ekādaśyāmupoṣyāhaṁ kariṣye niyamaṁ dṛḍham.',
      meaning: 'For achieving decisive victory in righteous endeavors and fulfillment of sacred aspirations, I solemnly pledge this Vijaya Ekadashi fast.'
    },
    rituals: [
      'Establishing a Kalash decorated with seven grains (Saptadhanya) and mango leaves',
      'Placing a golden or brass idol of Lord Narayana atop the Kalash',
      'Lighting an Akhand Jyot and offering fragrant red and yellow flowers',
      'Chanting the Rama Raksha Stotra and Sundarkand',
      'Donating the Kalash with food grains to a virtuous teacher on Dwadashi'
    ],
    pujaVidhi: 'Perform invocation on clean altar. Offer Tulsi Manjari and yellow sweets. Recite the Phalguna Krishna Ekadashi Mahatmya.',
    dietaryRules: {
      allowed: ['Fruits', 'Milk', 'Fox nuts (Makhana)', 'Almonds and dates'],
      prohibited: ['All cereals', 'Salted processed food', 'Non-vegetarian food']
    }
  },
  {
    id: 'amalaki-ekadashi-2027',
    name: 'Amalaki Ekadashi',
    nameHi: 'आमलकी एकादशी',
    nameRegional: { mr: 'आमलकी एकादशी', gu: 'આમલકી એકાદશી', te: 'ఆమలకీ ఏకాదశి' },
    category: 'ekadashi',
    monthIndex: 2,
    gregorianDate: '2027-03-19',
    dayOfWeek: 'Friday',
    tithiText: 'Phalguna Shukla Ekadashi',
    paksha: 'Shukla',
    deity: 'Lord Vishnu & Amla (Gooseberry) Tree',
    fastingType: 'Phalahar (Fruits & Milk)',
    paranaTime: '06:31 AM to 08:52 AM (Mar 20)',
    scripturalReference: 'Brahmanda Purana & Vishnu Dharmottara Purana',
    significance: 'Worship of the divine Amla tree, born from the tears of joy shed by Lord Brahma. Imbued with medicinal energy, it grants sound health, longevity, and liberation.',
    sankalpaMantra: {
      sanskrit: 'धात्रीवृक्षसमक्षं तु विष्णुपूजां करोम्यहम्। आमलक्याः प्रसादेन पापानि शमयाम्यहम्॥',
      transliteration: 'Dhātrīvṛkṣasamakṣaṁ tu viṣṇupūjāṁ karomyaham. Āmalakyāḥ prasādena pāpāni śamayāmyaham.',
      meaning: 'Before the sacred Amla tree, I worship Bhagwan Vishnu. By the merciful grace of the Mother Amla tree, may all my sins be eradicated.'
    },
    rituals: [
      'Visiting an Amla (Indian Gooseberry) tree in the morning with water and milk libation',
      'Wrapping red or yellow holy thread (Kalawa) around the trunk seven times',
      'Offering incense, sandalwood, and lighting a ghee lamp at the tree base',
      'Circumambulating the tree (Pradakshina) 108 times',
      'Distributing Amla fruits as sacred prasad and donating to Brahmins'
    ],
    pujaVidhi: 'Install Lord Vishnu idol near an Amla sapling or tree. Offer unbroken rice, kumkum, and fresh Amlas. Read the Amalaki Vrat Katha of King Chitraratha.',
    dietaryRules: {
      allowed: ['Fresh Amla juice or boiled amla with sendha namak', 'Seasonal fruits', 'Milk', 'Sabudana khichdi'],
      prohibited: ['Grains (Rice, Wheat)', 'Garlic, Onion', 'Heavy oily foods']
    }
  },

  // --- APRIL 2027 ---
  {
    id: 'chaitra-navratri-vrat-2027',
    name: 'Chaitra Navratri Vrat (9 Sacred Days)',
    nameHi: 'चैत्र नवरात्रि व्रत',
    nameRegional: { mr: 'चैत्र नवरात्र व्रत', gu: 'ચૈત્ર નવરાત્રિ', te: 'చైత్ర నవరాత్రులు' },
    category: 'special',
    monthIndex: 3,
    gregorianDate: '2027-04-08',
    dayOfWeek: 'Thursday',
    tithiText: 'Chaitra Shukla Pratipada to Navami',
    paksha: 'Shukla',
    deity: 'Navadurga (9 Forms of Maa Durga)',
    fastingType: 'Phalahar (Fruits & Milk)',
    paranaTime: 'Navami Madhyahna (Apr 16)',
    scripturalReference: 'Devi Bhagavata Purana & Markandeya Purana (Durga Saptashati)',
    significance: 'Celebrates the victory of the Divine Feminine and cosmic balance. Nine days of spiritual purification through meditation, prayer, and austere diet.',
    sankalpaMantra: {
      sanskrit: 'दुर्गे दुर्गे रक्षिणि मां त्राहि संसारसागरात्। नवरात्रिप्रसादेन देहि मे सर्वसम्पदम्॥',
      transliteration: 'Durge durge rakṣiṇi māṁ trāhi saṁsārasāgarāt. Navarātriprasādena dehi me sarvasampadam.',
      meaning: 'O Mother Durga, protector of all, rescue me from the ocean of worldly misery. By the grace of Navratri, bestow wisdom, health, and spiritual prosperity.'
    },
    rituals: [
      'Ghatasthapana: Installing the sanctified water Kalash and sowing holy barley (Jau) seeds',
      'Lighting the Akhand Jyot (uninterrupted brass lamp) for 9 continuous days',
      'Daily recitation of Durga Saptashati (13 Chapters of Chandi Path)',
      'Worshipping the designated daily form: Shailaputri, Brahmacharini, Chandraghanta, Kushmanda, Skandamata, Katyayani, Kalaratri, Mahagauri, and Siddhidatri',
      'Kanya Pujan: Honoring nine young girls with halwa, puri, chana, and gifts on Ashtami/Navami'
    ],
    pujaVidhi: 'Decorate altar with red cloth. Offer red hibiscus flowers, coconut, shringar items, and incense. Chant Argala Stotram and Devi Suktam.',
    dietaryRules: {
      allowed: ['Singhara & Kuttu flour', 'Samak rice (Vrat ke chawal)', 'Sabudana', 'Potatoes, sweet potatoes, raw banana', 'Sendha Namak (Rock salt)', 'Milk and dairy'],
      prohibited: ['Common salt', 'Wheat, rice, lentils', 'Garlic, onion', 'Alcohol & processed meats']
    }
  },
  {
    id: 'ram-navami-vrat-2027',
    name: 'Shri Ram Navami Vrat',
    nameHi: 'श्री राम नवमी व्रत',
    nameRegional: { mr: 'श्रीराम नवमी व्रत', gu: 'રામ નવમી', te: 'శ్రీరామ నవమి' },
    category: 'special',
    monthIndex: 3,
    gregorianDate: '2027-04-16',
    dayOfWeek: 'Friday',
    tithiText: 'Chaitra Shukla Navami',
    paksha: 'Shukla',
    deity: 'Maryada Purushottam Bhagwan Rama',
    fastingType: 'Ekabhukta (Single Meal)',
    paranaTime: 'After 12:19 PM (Madhyahna Janmotsav)',
    scripturalReference: 'Valmiki Ramayana & Ramcharitmanas of Goswami Tulsidas',
    significance: 'Appearance day of Lord Rama at mid-day in Ayodhya. Observing this fast grants steadfast righteousness, noble character, and dispels life crises.',
    sankalpaMantra: {
      sanskrit: 'श्रीरामनवमीव्रतं करिष्येऽहं रघूत्तम। प्रीत्यर्थं तव देवेश भुक्तिमुक्तिप्रदायक॥',
      transliteration: 'Śrīrāmanavamīvrataṁ kariṣye\'haṁ raghūttama. Prītyarthaṁ tava deveśa bhuktimuktipradāyaka.',
      meaning: 'O jewel of the Raghu dynasty, I observe this Ram Navami fast for Your divine pleasure. Bestow upon me devotion, noble conduct, and liberation.'
    },
    rituals: [
      'Fast until noon (12:00 PM), the exact planetary hour of Shri Rama\'s divine incarnation',
      'Grand Aarti with blowing of conch shells and showering of rose petals at noon',
      'Reciting "Bhaye Pragat Kripala Deendayala Kausalya Hitkari"',
      'Swinging the baby Rama idol in a decorated golden cradle',
      'Distributing Panakam (jaggery-cardamom beverage), Neer Mor, and Kosambari'
    ],
    pujaVidhi: 'Bathe the Rama idol in Panchamrit, dress in silk yellow Pitambar, apply sandalwood, offer Tulsi leaves, and chant the Taraka Mantra "Shri Rama Jaya Rama Jaya Jaya Rama".',
    dietaryRules: {
      allowed: ['Phalahari fruits', 'Panakam (jaggery water)', 'Dairy and sweets', 'Single meal after midday pujan'],
      prohibited: ['Grains before midday', 'Salty cooked food prior to puja']
    }
  },

  // --- MAY 2027 ---
  {
    id: 'mohini-ekadashi-2027',
    name: 'Mohini Ekadashi',
    nameHi: 'मोहिनी एकादशी',
    nameRegional: { mr: 'मोहिनी एकादशी', gu: 'મોહિની એકાદશી', te: 'మోహినీ ఏకాదశి' },
    category: 'ekadashi',
    monthIndex: 4,
    gregorianDate: '2027-05-17',
    dayOfWeek: 'Monday',
    tithiText: 'Vaishakha Shukla Ekadashi',
    paksha: 'Shukla',
    deity: 'Bhagwan Vishnu in Mohini Avatar',
    fastingType: 'Phalahar (Fruits & Milk)',
    paranaTime: '05:28 AM to 08:14 AM (May 18)',
    scripturalReference: 'Kurma Purana & Surya Purana (Told by Sage Vasishtha to Lord Rama)',
    significance: 'Commemorates Lord Vishnu assuming the enchanting Mohini form during the Samudra Manthan to distribute the nectar of immortality (Amrit) to the Devas. Eradicates deep-seated attachments.',
    sankalpaMantra: {
      sanskrit: 'मोहिनीरूपधारिणं विष्णवे प्रभविष्णवे। नमस्कृत्य करिष्येऽहं मोहनाशाय व्रतं शुभम्॥',
      transliteration: 'Mohinīrūpadhāriṇaṁ viṣṇave prabhaviṣṇave. Namaskṛtya kariṣye\'haṁ mohanāśāya vrataṁ śubham.',
      meaning: 'Salutations to Bhagwan Vishnu who assumed the Mohini incarnation. I undertake this sacred vow to dissolve delusion and ignite the light of truth.'
    },
    rituals: [
      'Bathing in holy water with white sandalwood fragrance',
      'Offering butter, sugar candy, and yellow blossoms to Lord Vishnu',
      'Reading the narrative of Prince Dhrishtabuddhi, who was redeemed by observing this fast under Sage Kaundinya',
      'Night meditation on the transcendental nature of the soul transcending sensory illusion',
      'Early morning charity and Parana on Dwadashi'
    ],
    pujaVidhi: 'Light ghee lamp, offer yellow cloth and Panchamrit. Recite chapter 11 of Srimad Bhagavad Gita and Vishnu Sahasranama.',
    dietaryRules: {
      allowed: ['Fruits and fruit juices', 'Almond milk', 'Makhana', 'Rock salt'],
      prohibited: ['Cereals and legumes', 'Root vegetables (Onion, Garlic)', 'Refined sugar']
    }
  },
  {
    id: 'vat-savitri-vrat-2027',
    name: 'Vat Savitri Vrat',
    nameHi: 'वट सावित्री व्रत',
    nameRegional: { mr: 'वट सावित्री व्रत / वटपौर्णिमा', gu: 'વટ સાવિત્રી વ્રત', te: 'వట సావిత్రి వ్రతం' },
    category: 'special',
    monthIndex: 4,
    gregorianDate: '2027-05-20',
    dayOfWeek: 'Thursday',
    tithiText: 'Jyeshtha Amavasya / Purnima',
    paksha: 'Shukla',
    deity: 'Savitri, Satyavan & Lord Yama',
    fastingType: 'Nirjala (Waterless)',
    paranaTime: 'Evening after Banyan tree puja',
    scripturalReference: 'Mahabharata (Vana Parva) & Skanda Purana',
    significance: 'Married Hindu women fast and pray for the health, long life, and prosperity of their husbands, honoring Savitri\'s devotion that compelled Yamaraj to restore Satyavan\'s soul.',
    sankalpaMantra: {
      sanskrit: 'अवैधव्यं च सौभाग्यं देहि मे वटवृक्ष भोः। यथा सावित्र्या सत्यवान् तथा मेऽस्तु पतिः सदा॥',
      transliteration: 'Avaidhavyaṁ ca saubhāgyaṁ dehi me vaṭavṛkṣa bhoḥ. Yathā sāvitryā satyavān tathā me\'stu patiḥ sadā.',
      meaning: 'O venerable Banyan tree, bestow unbroken marital bliss and auspiciousness. Just as Savitri protected Satyavan, may my husband enjoy longevity and well-being.'
    },
    rituals: [
      'Wearing auspicious traditional bridal attire (sari, bangles, vermilion)',
      'Visiting the sacred Banyan tree (Vat Vriksha) holding puja thali',
      'Wrapping raw white cotton thread (Suta) 108 times around the Banyan trunk',
      'Offering soaked black chickpeas (Kala Chana), seasonal fruits (mango, jackfruit), and water',
      'Listening to the inspiring Savitri-Satyavan Katha from elder women',
      'Touching husband\'s feet and seeking blessings before breaking the fast'
    ],
    pujaVidhi: 'Offer water to the roots of the Banyan tree. Apply turmeric and vermilion. Offer soaked gram and sprouted wheat. Perform Aarti with camphor.',
    dietaryRules: {
      allowed: ['Soaked gram (Chana) prasad', 'Seasonal fruits (Mango, Melon)', 'Water after evening puja'],
      prohibited: ['Cooked grains during daytime', 'Non-vegetarian items', 'Tamasic food']
    }
  },

  // --- JUNE 2027 ---
  {
    id: 'nirjala-ekadashi-2027',
    name: 'Nirjala Ekadashi (Bhima Ekadashi)',
    nameHi: 'निर्जला एकादशी (भीम एकादशी)',
    nameRegional: { mr: 'निर्जला एकादशी', gu: 'નિર્જળા એકાદશી', te: 'నిర్జల ఏకాదశి' },
    category: 'ekadashi',
    monthIndex: 5,
    gregorianDate: '2027-06-15',
    dayOfWeek: 'Tuesday',
    tithiText: 'Jyeshtha Shukla Ekadashi',
    paksha: 'Shukla',
    deity: 'Bhagwan Vishnu / Narayana',
    fastingType: 'Nirjala (Waterless)',
    paranaTime: '05:23 AM to 08:11 AM (Jun 16)',
    scripturalReference: 'Brahma Vaivarta Purana & Mahabharata',
    significance: 'The monarch of all 24 Ekadashis. Observed without drinking a single drop of water for 24 continuous hours. Bestows the spiritual merits of having performed all 24 Ekadashis of the year.',
    sankalpaMantra: {
      sanskrit: 'एकादश्यां निराहारः स्थित्वाऽहमपरेऽहनि। भोक्ष्ये पुण्डरीकाक्ष शरणं मे भवाच्युत॥',
      transliteration: 'Ekādaśyāṁ nirāhāraḥ sthitvā\'hamapare\'hani. Bhokṣye puṇḍarīkākṣa śaraṇaṁ me bhavācyuta.',
      meaning: 'O lotus-eyed Lord Achyuta, abstaining from all food and water today, I will break fast tomorrow morning. Please protect me and accept this austerity.'
    },
    rituals: [
      'Complete abstention from all grains, fruits, and water from sunrise to sunrise',
      'Achamana (ritual sip) permitted strictly for purification, limited to one droplet',
      'Worship of Lord Vishnu with cooling camphor, sandalwood paste, and fragrant tulsi',
      'Charity of water pots (Jal Kumbha), hand fans, sweet sherbet, umbrellas, and shoes to travelers',
      'Staying awake through the hot summer night in spiritual contemplation',
      'Breaking the fast on Dwadashi morning after offering water to Lord Vishnu and drinking holy Charanamrit'
    ],
    pujaVidhi: 'Bathe Vishnu idol in ice-cold rose water and chandan. Offer cooling melon, cucumbers, and fragrant flowers. Chant "Om Vishnave Namah" 1008 times.',
    dietaryRules: {
      allowed: ['No food or water throughout the 24-hour cycle (strictly Nirjala)'],
      prohibited: ['All food, water, beverages, snacks without exception']
    }
  },

  // --- JULY 2027 ---
  {
    id: 'devshayani-ekadashi-2027',
    name: 'Devshayani Ekadashi (Ashadhi Ekadashi)',
    nameHi: 'देवशयनी एकादशी (आषाढ़ी एकादशी)',
    nameRegional: { mr: 'आषाढी एकादशी (पंढरपूर वारी)', gu: 'દેવપોઢી એકાદશી', te: 'తొలి ఏకాదశి' },
    category: 'ekadashi',
    monthIndex: 6,
    gregorianDate: '2027-07-15',
    dayOfWeek: 'Thursday',
    tithiText: 'Ashadha Shukla Ekadashi',
    paksha: 'Shukla',
    deity: 'Lord Vitthal / Vishnu & Sheshanaga',
    fastingType: 'Phalahar (Fruits & Milk)',
    paranaTime: '05:35 AM to 08:20 AM (Jul 16)',
    scripturalReference: 'Bhavishya Purana & Padma Purana',
    significance: 'Inaugurates Chaturmas (4 holy monsoon months). Lord Vishnu enters cosmic yogic slumber on the cosmic serpent Sheshanaga. Millions gather in Pandharpur for the divine Wari pilgrimage.',
    sankalpaMantra: {
      sanskrit: 'सुप्ते त्वयि जगन्नाथ जगत् सुप्तं भवेदिदम्। विबुद्धे त्वयि बुद्धं च प्रसन्नो मे भवाच्युत॥',
      transliteration: 'Supte tvayi jagannātha jagat suptaṁ bhavedidam. Vibuddhe tvayi buddhaṁ ca prasanno me bhavācyuta.',
      meaning: 'O Lord of the Universe, when You enter yogic slumber, the world rests. When You awake, creation awakens. Be pleased with my devotion, O Achyuta.'
    },
    rituals: [
      'Beginning of holy Chaturmas vows (abstaining from certain foods and travel)',
      'Singing Vitthal Abhangas: "Gyanba Tukaram" and chanting the holy names of saints',
      'Offering Tulsi garland (Tulsi Mala) to Lord Vishnu / Vitthal',
      'Phalahar diet: Sabudana, Bhagar (Varai), peanuts, and curd',
      'Praying for global peace and spiritual discipline during the monsoon season'
    ],
    pujaVidhi: 'Offer yellow Pitambar, fresh tulsi leaves, and sweet panchamrit. Sing Kakad Aarti and read the story of King Mandhata.',
    dietaryRules: {
      allowed: ['Varai / Bhagar', 'Sabudana', 'Peanuts, potato, sweet potato', 'Milk and curd', 'Sendha Namak'],
      prohibited: ['Grains (Rice, Wheat)', 'Non-veg and tamasic foods', 'Starting new marriage ceremonies (until Devutthana Ekadashi)']
    }
  },
  {
    id: 'guru-purnima-2027',
    name: 'Guru Purnima (Vyasa Purnima)',
    nameHi: 'गुरु पूर्णिमा (व्यास पूर्णिमा)',
    nameRegional: { mr: 'गुरु पौर्णिमा', gu: 'ગુરુ પૂર્ણિમા', te: 'గురు పౌర్ణమి' },
    category: 'purnima',
    monthIndex: 6,
    gregorianDate: '2027-07-18',
    dayOfWeek: 'Sunday',
    tithiText: 'Ashadha Shukla Purnima',
    paksha: 'Shukla',
    deity: 'Maharishi Ved Vyasa & Spiritual Preceptors (Gurus)',
    fastingType: 'Phalahar (Fruits & Milk)',
    moonriseTime: '07:54 PM',
    scripturalReference: 'Guru Gita & Mahabharata',
    significance: 'Birth anniversary of Maharishi Ved Vyasa who classified the four Vedas and composed the Mahabharata, 18 Puranas, and Brahma Sutras. Dedicated to expressing gratitude to spiritual teachers.',
    sankalpaMantra: {
      sanskrit: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः। गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः॥',
      transliteration: 'Gururbrahmā gururviṣṇuḥ gururdevo maheśvaraḥ. Guruḥ sākṣāt paraṁ brahma tasmai śrīgurave namaḥ.',
      meaning: 'The Guru is Brahma, the Guru is Vishnu, the Guru is the Supreme Maheshwara. The Guru is verily the Supreme Absolute. Prostrations to that holy Guru.'
    },
    rituals: [
      'Offering Padapuja (foot washing ceremony) to one\'s spiritual Master or meditating on the Guru\'s sandals (Padukas)',
      'Reciting the Guru Stotram and Adi Shankara\'s hymns',
      'Offering Gurudakshina: yellow flowers, sweet fruits, and donations to spiritual institutions',
      'Committing to personal spiritual vows for the upcoming Chaturmas period'
    ],
    pujaVidhi: 'Decorate Guru\'s portrait with garlands. Light incense and lamps. Offer yellow sweets and seek blessings for spiritual wisdom.',
    dietaryRules: {
      allowed: ['Fruits and pure Satvik vegetarian food', 'Kheer and sweet rice (after puja)', 'Milk'],
      prohibited: ['Tamasic and bitter foods', 'Food prepared without cleanliness']
    }
  },

  // --- AUGUST 2027 ---
  {
    id: 'shravana-somwar-vrat-2027',
    name: 'Shravana Somwar Vrat (Sacred Monday Fast)',
    nameHi: 'श्रावण सोमवार व्रत',
    nameRegional: { mr: 'श्रावण सोमवार व्रत', gu: 'શ્રાવણ સોમવાર', te: 'శ్రావణ సోమవార వ్రతం' },
    category: 'special',
    monthIndex: 7,
    gregorianDate: '2027-08-09',
    dayOfWeek: 'Monday',
    tithiText: 'Shravana Shukla Saptami',
    paksha: 'Shukla',
    deity: 'Lord Shiva & Maa Parvati',
    fastingType: 'Ekabhukta (Single Meal)',
    paranaTime: 'Evening after Shiva Sandhya Aarti',
    scripturalReference: 'Shiva Purana (Vidyeshvara Samhita)',
    significance: 'Shravana is the supreme month of Lord Shiva. Fasting on Shravan Mondays brings marital harmony, relief from chronic afflictions, and profound mental peace.',
    sankalpaMantra: {
      sanskrit: 'मम क्षेमस्थैर्यायुरारोग्यैश्वर्याभिवृद्धये सोमवारे शिवपूजनं करिष्ये।',
      transliteration: 'Mama kṣemasthairyāyurārogyaiśvaryābhivṛddhaye somavāre śivapūjanaṁ kariṣye.',
      meaning: 'For the enhancement of protection, stability, long life, radiant health, and divine abundance, I perform this Monday Shiva worship.'
    },
    rituals: [
      'Morning Jalabhishek: Pouring pure water, raw cow milk, and Gangajal on the Shivling',
      'Offering Bel patra, Bhasma (sacred ash), Dhatura, and white flowers',
      'Chanting "Om Namah Shivaya" on a Rudraksha mala 108 times',
      'Reciting the Shiva Tandava Stotram and Bilvashtakam',
      'Consuming only a single fruit/satvik meal in the evening after Sandhya Aarti'
    ],
    pujaVidhi: 'Wash Shivling with Panchamrit. Apply three horizontal lines of sacred ash (Tripundra). Light ghee diya and camphor.',
    dietaryRules: {
      allowed: ['Fruits, milk, curd', 'Sabudana and Kuttu', 'Sendha Namak', 'Single satvik meal after sunset'],
      prohibited: ['Grains during daylight hours', 'Onion, garlic, spicy food', 'Alcohol and tobacco']
    }
  },
  {
    id: 'krishna-janmashtami-vrat-2027',
    name: 'Krishna Janmashtami Vrat',
    nameHi: 'श्रीकृष्ण जन्माष्टमी व्रत',
    nameRegional: { mr: 'गोकुळाष्टमी / श्रीकृष्ण जन्मोत्सव', gu: 'શ્રીકૃષ્ણ જન્માષ્ટમી', te: 'శ్రీకృష్ణాష్టమి' },
    category: 'special',
    monthIndex: 7,
    gregorianDate: '2027-08-25',
    dayOfWeek: 'Wednesday',
    tithiText: 'Bhadrapada Krishna Ashtami',
    paksha: 'Krishna',
    deity: 'Bhagwan Shri Krishna (Balgopal)',
    fastingType: 'Nirjala (Waterless)',
    paranaTime: 'After midnight 12:45 AM (post Nishita Kaal)',
    scripturalReference: 'Srimad Bhagavatam (Canto 10) & Harivamsa Purana',
    significance: 'Celebrates the midnight appearance of the Supreme Personality of Godhead, Lord Krishna, in Mathura prison. Fasting until midnight burns away sinful reactions and awakens divine love (Bhakti).',
    sankalpaMantra: {
      sanskrit: 'श्रीकृष्णप्रीतिकामोऽहं करिष्ये जन्माष्टमीव्रतम्। कृष्णाय वासुदेवाय हरये परमात्मने नमः॥',
      transliteration: 'Śrīkṛṣṇaprītikāmo\'haṁ kariṣye janmāṣṭamīvratam. Kṛṣṇāya vāsudevāya haraye paramātmane namaḥ.',
      meaning: 'Aspiring for the unconditional love of Lord Krishna, I observe this Janmashtami fast. Salutations to Krishna, Vasudeva, Hari, the Supreme Lord.'
    },
    rituals: [
      'Day-long fast with continuous chanting of "Hare Krishna" Mahamantra',
      'Cleaning and decorating household mandir with peacock feathers, butter pots, and flute',
      'Midnight Abhishek of Laddu Gopal with milk, honey, ghee, curd, and sugar',
      'Ringing bells, blowing conches, and singing "Nand Gher Anand Bhayo, Jai Kanhaiya Lal Ki"',
      'Offering 56 delicacies (Chhappan Bhog) and Makhan-Mishri to Balgopal',
      'Breaking the fast post-midnight after partaking of Charanamrit'
    ],
    pujaVidhi: 'Bathe the Balgopal idol in Panchamrit. Dress in colorful pitambar, peacock feather crown, and garland. Swing the cradle and chant Srimad Bhagavatam verses.',
    dietaryRules: {
      allowed: ['Dhaniya Panjiri prasad', 'Makhan Mishri', 'Fruits and milk after midnight pujan'],
      prohibited: ['Grains and cereals throughout the day and night', 'Tamasic food']
    }
  },

  // --- SEPTEMBER 2027 ---
  {
    id: 'hartalika-teej-2027',
    name: 'Hartalika Teej Vrat',
    nameHi: 'हरतालिका तीज व्रत',
    nameRegional: { mr: 'हरतालिका तृतीया व्रत', gu: 'હરતાલિકા ત્રીજ', te: 'హరితాళిక వ్రతం' },
    category: 'special',
    monthIndex: 8,
    gregorianDate: '2027-09-03',
    dayOfWeek: 'Friday',
    tithiText: 'Bhadrapada Shukla Tritiya',
    paksha: 'Shukla',
    deity: 'Lord Shiva & Maa Parvati (Gauri-Shankar)',
    fastingType: 'Nirjala (Waterless)',
    paranaTime: 'Next morning after sunrise (Sep 04)',
    scripturalReference: 'Bhavishya Purana (Story of Parvati winning Lord Shiva as husband)',
    significance: 'Women observe an austere 24-hour waterless fast to invoke marital happiness and the blessings of Maa Gauri, commemorating Parvati\'s steadfast penance in the forest.',
    sankalpaMantra: {
      sanskrit: 'मम पतिप्रियार्थं दीर्घायुरारोग्यार्थं हरितालिकाव्रतं करिष्ये।',
      transliteration: 'Mama patipriyārthaṁ dīrghāyurārogyārthaṁ haritālikāvrataṁ kariṣye.',
      meaning: 'For the welfare, longevity, and affectionate bond with my husband, I resolve to observe the sacred Hartalika fast.'
    },
    rituals: [
      'Crafting idols of Lord Shiva and Parvati using pure riverbed clay or sand (Baluka)',
      'Constructing a floral canopy (Phoolon ka Mandap) over the deities',
      'Applying Mehendi, wearing bridal adornments, and lighting continuous incense',
      'Night vigil (Ratri Jagran) singing devotional songs and reciting the Teej Katha',
      'Submerging the clay idols in clean water next morning and breaking fast'
    ],
    pujaVidhi: 'Offer 16 types of sacred leaves (Shodasha Patra), bilva leaves, suhag items, and seasonal fruits to Gauri-Shankar.',
    dietaryRules: {
      allowed: ['Strict waterless austerity for 24 hours (Nirjala)'],
      prohibited: ['Water, fruits, and food of any kind until morning visarjan']
    }
  },
  {
    id: 'anant-chaturdashi-2027',
    name: 'Anant Chaturdashi Vrat',
    nameHi: 'अनंत चतुर्दशी व्रत',
    nameRegional: { mr: 'अनंत चतुर्दशी', gu: 'અનંત ચૌદશ', te: 'అనంత చతుర్దశి' },
    category: 'special',
    monthIndex: 8,
    gregorianDate: '2027-09-14',
    dayOfWeek: 'Tuesday',
    tithiText: 'Bhadrapada Shukla Chaturdashi',
    paksha: 'Shukla',
    deity: 'Bhagwan Ananta (Lord Vishnu in Cosmic Form)',
    fastingType: 'Ekabhukta (Single Meal)',
    paranaTime: 'Afternoon post Anant Sutra pujan',
    scripturalReference: 'Mahabharata (Instructions by Lord Krishna to Yudhishthira during exile)',
    significance: 'Tying the sacred 14-knot thread (Ananta Sutra) around the right arm brings protection from all 14 planetary realms and restores lost wealth, dignity, and inner peace.',
    sankalpaMantra: {
      sanskrit: 'अनन्तसंसारमहासमुद्रे मग्नं समभ्युद्धर वासुदेव। अनन्तरूपे विनियोजयस्व ह्यनन्तसूत्राय नमो नमस्ते॥',
      transliteration: 'Anantasaṁsāramahāsamudre magnaṁ samabhyuddhara vāsudeva. Anantarūpe viniyojayasva hyanantasūtrāya namo namaste.',
      meaning: 'O Vasudeva, rescue me from drowning in the infinite ocean of worldly turmoil. Fasten me to Your infinite grace through this sacred Ananta thread.'
    },
    rituals: [
      'Preparing the 14-knot sacred silk or cotton thread dyed with turmeric and saffron',
      'Placing a seven-hooded serpent idol (Sheshanaga) made of kneaded dough or silver',
      'Worshipping the 14 nodes representing the 14 cosmic planetary systems (Bhu, Bhuva, Svah, etc.)',
      'Tying the thread: Men tie on the right arm, women on the left arm',
      'Reciting the story of Sage Kaundinya and his devoted wife Sushila'
    ],
    pujaVidhi: 'Offer 14 pooris, 14 pua sweets, yellow flowers, and vermilion. Offer oblation to the Sheshanaga idol and wear the Ananta Sutra for 14 years or 1 year.',
    dietaryRules: {
      allowed: ['Sweet pua, fruit preparations', 'Satvik food without salt before puja'],
      prohibited: ['Salty food, non-veg, alcohol', 'Leaving the thread unattended']
    }
  },

  // --- OCTOBER 2027 ---
  {
    id: 'karwa-chauth-2027',
    name: 'Karwa Chauth (Karak Chaturthi)',
    nameHi: 'करवा चौथ (करक चतुर्थी)',
    nameRegional: { mr: 'करवा चौथ', gu: 'કરવા ચોથ', te: 'కర్వా చౌత్' },
    category: 'chaturthi',
    monthIndex: 9,
    gregorianDate: '2027-10-18',
    dayOfWeek: 'Monday',
    tithiText: 'Kartika Krishna Chaturthi',
    paksha: 'Krishna',
    deity: 'Maa Karwa, Lord Shiva, Parvati, and Chandra Dev',
    fastingType: 'Nirjala (Waterless)',
    moonriseTime: '08:15 PM',
    scripturalReference: 'Vamana Purana & Skanda Purana',
    significance: 'Married women observe an unwavering waterless fast from sunrise until moonrise for the longevity, health, and prosperity of their husbands.',
    sankalpaMantra: {
      sanskrit: 'मम सुखसौभाग्यपुत्रपौत्राद्यभिवृद्धये करकचतुर्थीव्रतं करिष्ये।',
      transliteration: 'Mama sukhasaubhāgyaputrapautrādyabhivṛddhaye karakacaturthīvrataṁ kariṣye.',
      meaning: 'For the uninterrupted joy, marital auspiciousness, and family prosperity, I resolve to observe the Karak Chaturthi fast.'
    },
    rituals: [
      'Consuming Sargi (pre-dawn meal of sweets, dry fruits, and milk) before sunrise',
      'Strict waterless fasting through the entire day with mehendi and bridal jewelry',
      'Evening group Katha circle passing the earthen Karwa pot seven times',
      'Viewing the rising moon through a fine sieve (Chhalni) and offering Arghya',
      'Viewing the husband\'s face through the same sieve and taking the first sip of water from his hands'
    ],
    pujaVidhi: 'Draw Maa Karwa image on wall or altar. Decorate earthen Karwa filled with water. Light clay lamp and chant "Om Shriyai Namah".',
    dietaryRules: {
      allowed: ['Water and festive food only after seeing the moon and offering Arghya'],
      prohibited: ['Food or water throughout the daytime', 'Using sharp sewing needles or scissors on this day']
    }
  },
  {
    id: 'sharad-purnima-vrat-2027',
    name: 'Sharad Purnima (Kojagari Lakshmi Vrat)',
    nameHi: 'शरद पूर्णिमा (कोजागरी लक्ष्मी व्रत)',
    nameRegional: { mr: 'कोजागिरी पौर्णिमा', gu: 'શરદ પૂનમ', te: 'శరద్ పౌర్ణమి' },
    category: 'purnima',
    monthIndex: 9,
    gregorianDate: '2027-10-15',
    dayOfWeek: 'Friday',
    tithiText: 'Ashvina Shukla Purnima',
    paksha: 'Shukla',
    deity: 'Maa Lakshmi & Chandra Dev',
    fastingType: 'Phalahar (Fruits & Milk)',
    moonriseTime: '06:22 PM',
    scripturalReference: 'Sanatkumara Samhita & Linga Purana',
    significance: 'The Moon shines with all 16 divine digits (Kalas). It is believed that celestial nectar (Amrit) rains down through moonlight. Goddess Lakshmi wanders the earth asking "Ko Jagarti?" (Who is awake?), blessing vigilant devotees with wealth.',
    sankalpaMantra: {
      sanskrit: 'ॐ श्रीं ह्रीं क्लीं त्रिभुवनमहालक्ष्म्यै अस्माकं दारिद्र्यं नाशय प्रसीद प्रसीद स्वाहा।',
      transliteration: 'Om śrīṁ hrīṁ klīṁ tribhuvanamahālakṣmyai asmākaṁ dāridryaṁ nāśaya prasīda prasīda svāhā.',
      meaning: 'Salutations to the Supreme Mahalakshmi of the three worlds. Dispel our poverty, shower divine abundance, and bless us with eternal peace.'
    },
    rituals: [
      'Preparing rice milk pudding (Kheer) in silver or brass utensils',
      'Placing the Kheer under open moonlight throughout the night covered with muslin cloth to absorb lunar rays',
      'Singing Lakshmi Stotram and staying awake past midnight in devotional singing',
      'Offering Arghya to Chandra Dev and worshipping Indra Dev seated on Airavata',
      'Consuming the nectar-infused Kheer next morning as holy prasadam'
    ],
    pujaVidhi: 'Offer white lotus, silver coin, rice grains, and fragrant camphor to Maa Lakshmi. Recite the Sri Suktam and Kanakadhara Stotram.',
    dietaryRules: {
      allowed: ['Lunar nectar Kheer post-midnight', 'Fresh fruits', 'Milk and saffron nuts'],
      prohibited: ['Heavy cooked meals before moonrise', 'Non-satvik foods']
    }
  },

  // --- NOVEMBER 2027 ---
  {
    id: 'chhath-puja-vrat-2027',
    name: 'Chhath Puja Mahaparv (Surya Shashthi)',
    nameHi: 'छठ पूजा महापर्व (सूर्य षष्ठी व्रत)',
    nameRegional: { mr: 'छठ पूजा', gu: 'છઠ પૂજા', te: 'ఛత్ పూజ' },
    category: 'special',
    monthIndex: 10,
    gregorianDate: '2027-11-04',
    dayOfWeek: 'Thursday',
    tithiText: 'Kartika Shukla Shashthi',
    paksha: 'Shukla',
    deity: 'Bhagwan Surya & Chhathi Maiya (Usha & Pratyusha)',
    fastingType: 'Nirjala (Waterless)',
    paranaTime: 'Morning after sunrise Arghya (Nov 05)',
    scripturalReference: 'Rigveda, Markandeya Purana & Mahabharata (Draupadi & Karna\'s Sun worship)',
    significance: 'The most rigorous Vedic nature-worship festival. 36 hours of continuous waterless fasting standing chest-deep in water to offer oblations to both the setting and rising Sun for family health, vision, and cure from diseases.',
    sankalpaMantra: {
      sanskrit: 'ॐ एहि सूर्य सहस्त्रांशो तेजोराशे जगत्पते। अनुकम्पय मां भक्त्या गृहाणार्घ्यं दिवाकर॥',
      transliteration: 'Om ehi sūrya sahastrāṁśo tejorāśe jagatpate. Anukampaya māṁ bhaktyā gṛhāṇārghyaṁ divākara.',
      meaning: 'Come, O Sun of thousand rays, repository of cosmic brilliance, Lord of creation! In compassion, accept this oblation offered with deep devotion.'
    },
    rituals: [
      'Day 1: Nahay Khay (Purification bath and satvik pumpkin-rice meal cooked on brass/clay stoves)',
      'Day 2: Kharna (Evening Gur Kheer made with sugarcane juice eaten as the final meal before the 36-hr fast)',
      'Day 3: Sandhya Arghya (Standing in river waters at sunset holding bamboo Soop loaded with Thekua, sugarcane, and daak fruits)',
      'Day 4: Usha Arghya (Pre-dawn offering to the rising Sun, followed by touching elders\' feet and breaking the 36-hr Nirjala fast)'
    ],
    pujaVidhi: 'Wash bamboo baskets (Daura). Arrange Thekua, Kasar, seasonal fruits, coconut, and radish. Light ghee lamps floating in water and chant the Aditya Hridaya Stotra.',
    dietaryRules: {
      allowed: ['No food or water during the 36-hour fasting phase until Usha Arghya concludes'],
      prohibited: ['Any salt, common spices, or grains during the fast', 'Using footwear near the puja area']
    }
  },
  {
    id: 'devutthana-ekadashi-2027',
    name: 'Devutthana Ekadashi (Prabodhini Ekadashi)',
    nameHi: 'देवउठनी एकादशी (प्रबोधिनी एकादशी)',
    nameRegional: { mr: 'कार्तिकी एकादशी (तुळशी विवाह)', gu: 'દેવઉઠી એકાદશી', te: 'ప్రబోధిని ఏకాదశి' },
    category: 'ekadashi',
    monthIndex: 10,
    gregorianDate: '2027-11-10',
    dayOfWeek: 'Wednesday',
    tithiText: 'Kartika Shukla Ekadashi',
    paksha: 'Shukla',
    deity: 'Bhagwan Vishnu & Devi Tulsi',
    fastingType: 'Phalahar (Fruits & Milk)',
    paranaTime: '06:42 AM to 08:51 AM (Nov 11)',
    scripturalReference: 'Skanda Purana & Padma Purana (Uttara Khanda)',
    significance: 'Lord Vishnu awakens from his four-month yogic slumber. Concludes Chaturmas and signals the official opening of the sacred Hindu wedding season. Marks the holy Tulsi Vivah.',
    sankalpaMantra: {
      sanskrit: 'उत्तिष्ठोत्तिष्ठ गोविन्द त्यज निद्रां जगत्पते। त्वयि सुप्ते जगन्नाथ जगत् सुप्तं भवेदिदम्॥',
      transliteration: 'Uttiṣṭhottiṣṭha govinda tyaja nidrāṁ jagatpate. Tvayi supte jagannātha jagat suptaṁ bhavedidam.',
      meaning: 'Awaken, awaken O Govinda! Arise from Your cosmic slumber, O Lord of creation! When You wake, all worlds awaken to vitality and light.'
    },
    rituals: [
      'Drawing footprints of Lord Vishnu from the house entrance to the inner mandir using rice paste',
      'Erecting a sugarcane mandap around the holy Tulsi plant',
      'Ceremonial wedding of Devi Tulsi with Shaligram stone / Vishnu idol with vermilion, bridal chunri, and mangalsutra',
      'Lighting 11 diyas around the Tulsi plant and bursting auspicious crackers',
      'Parana next morning after offering jaggery and sugarcane to cows'
    ],
    pujaVidhi: 'Offer sugarcane, singhara, ber (jujube), sweet potatoes, and amla to Lord Vishnu. Sing awakening kirtans and chant "Utho Deva, Baitho Deva".',
    dietaryRules: {
      allowed: ['Sugarcane juice', 'Singhara', 'Sweet potato', 'Fruits and dairy'],
      prohibited: ['Grains, lentils, and table salt', 'Non-vegetarian food']
    }
  },

  // --- DECEMBER 2027 ---
  {
    id: 'mokshada-ekadashi-2027',
    name: 'Mokshada Ekadashi (Gita Jayanti)',
    nameHi: 'मोक्षदा एकादशी (गीता जयंती)',
    nameRegional: { mr: 'मोक्षदा एकादशी', gu: 'મોક્ષદા એકાદશી', te: 'మోక్షదా ఏకాదశి' },
    category: 'ekadashi',
    monthIndex: 11,
    gregorianDate: '2027-12-09',
    dayOfWeek: 'Thursday',
    tithiText: 'Margashirsha Shukla Ekadashi',
    paksha: 'Shukla',
    deity: 'Lord Shri Krishna & Srimad Bhagavad Gita',
    fastingType: 'Phalahar (Fruits & Milk)',
    paranaTime: '07:04 AM to 09:12 AM (Dec 10)',
    scripturalReference: 'Brahmanda Purana & Mahabharata (Bhisma Parva)',
    significance: 'Commemorates the auspicious day Bhagwan Krishna revealed the 700 verses of Srimad Bhagavad Gita to Arjuna on the battlefield of Kurukshetra. Fasting delivers departed ancestors directly to Vaikuntha.',
    sankalpaMantra: {
      sanskrit: 'मोक्षदायाः प्रसादेन सर्वपापक्षयो भवेत्। भगवद्गीतापठनेन विष्णोः पदमवाप्नुयाम्॥',
      transliteration: 'Mokṣadāyāḥ prasādena sarvapāpakṣayo bhavet. Bhagavadgītāpaṭhanena viṣṇoḥ padamavāpnuyām.',
      meaning: 'By the grace of Mokshada Ekadashi, may all sins dissolve. Through reciting the holy Bhagavad Gita, may I attain the eternal abode of Lord Vishnu.'
    },
    rituals: [
      'Complete reading or chanting of select chapters of the Srimad Bhagavad Gita',
      'Distributing copies of the Bhagavad Gita as sacred gift to students and seekers',
      'Worshipping Lord Krishna with Tulsi leaves, butter, and fragrant incense',
      'Performing Tarpan for departed ancestors praying for their elevation to higher worlds',
      'Night-long meditation on the teachings of Karma Yoga and Bhakti Yoga'
    ],
    pujaVidhi: 'Clean the altar, place the Bhagavad Gita scripture on a red cloth with flower garlands. Offer incense, lamp, and fruits, followed by Gita Aarti.',
    dietaryRules: {
      allowed: ['Fruits, milk, dry fruits', 'Sabudana and Kuttu', 'Sendha Namak'],
      prohibited: ['Grains, lentils, and pulses', 'Onion, garlic, and non-satvik foods']
    }
  },
  {
    id: 'dattatreya-jayanti-vrat-2027',
    name: 'Dattatreya Jayanti Vrat',
    nameHi: 'दत्तात्रेय जयंती व्रत',
    nameRegional: { mr: 'दत्त जयंती व्रत', gu: 'દત્તાત્રેય જયંતી', te: 'దత్తాత్రేయ జయంతి' },
    category: 'purnima',
    monthIndex: 11,
    gregorianDate: '2027-12-13',
    dayOfWeek: 'Monday',
    tithiText: 'Margashirsha Shukla Purnima',
    paksha: 'Shukla',
    deity: 'Lord Dattatreya (Trimurti Incarnation: Brahma, Vishnu, Shiva)',
    fastingType: 'Phalahar (Fruits & Milk)',
    moonriseTime: '05:30 PM',
    scripturalReference: 'Shandilya Upanishad, Markandeya Purana & Guru Charitra',
    significance: 'Appearance day of Lord Dattatreya, born to Sage Atri and Mata Anasuya. He embodies the Supreme Guru uniting creation, preservation, and dissolution. Eradicates ancestral curses (Pitru Dosha).',
    sankalpaMantra: {
      sanskrit: 'दिगम्बराय विद्महे अवधूताय धीमहि तन्नो दत्तः प्रचोदयात्॥',
      transliteration: 'Digambarāya vidmahe avadhūtāya dhīmahi tanno dattaḥ pracodayāt.',
      meaning: 'We meditate on the celestial Digambara Avadhuta Dattatreya. May that Supreme Preceptor inspire our intellect and guide us on the path of truth.'
    },
    rituals: [
      'Early morning bath and performing Abhishek with cow milk and sandalwood',
      'Continuous continuous chant of "Digambara Digambara Shripada Vallabha Digambara"',
      'Reading chapters of Shri Guru Charitra with devotion',
      'Offering Padapuja to Lord Dattatreya\'s holy Padukas',
      'Feeding stray dogs (representing the 4 Vedas) and cows before sunset'
    ],
    pujaVidhi: 'Offer yellow flowers, sweet Sheera, and Panchamrit. Light seven-wick lamp and chant Dattatreya Ashtakam.',
    dietaryRules: {
      allowed: ['Satvik phalahar, milk, and nuts', 'Sweet Sheera prasad post evening puja'],
      prohibited: ['Grains, salt before sunset', 'Tamasic food']
    }
  }
];

export function getVratsForMonth(monthIndex: number): VratDetail[] {
  return MONTHLY_VRATS_2027.filter((v) => v.monthIndex === monthIndex);
}

export function getUpcomingVratsFromDate(date: Date, count = 6): VratDetail[] {
  const dateStr = date.toISOString().split('T')[0];
  const sorted = [...MONTHLY_VRATS_2027].sort((a, b) => a.gregorianDate.localeCompare(b.gregorianDate));
  const upcoming = sorted.filter((v) => v.gregorianDate >= dateStr);
  return upcoming.slice(0, count);
}
