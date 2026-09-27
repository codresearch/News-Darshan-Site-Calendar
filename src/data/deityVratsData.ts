export interface SacredObservanceItem {
  id: string;
  name: string;
  nameHi: string;
  nameRegional?: Record<string, string>;
  category: string;
  deity: string;
  frequency: string;
  significance: string;
  fastingType: string;
  rituals: string[];
  pujaVidhi: string;
  mantra: string;
  kathaSummary?: string;
  dates2027: {
    date: string;
    day: string;
    tithiOrOccasion: string;
    timingOrMoonrise?: string;
  }[];
}

// 1. Sankashti Chaturthi (Lord Vinayaka / Ganesha)
export const SANKASHTI_CHATURTHI: SacredObservanceItem = {
  id: 'sankashti-chaturthi',
  name: 'Sankashti Chaturthi (Lord Vinayaka)',
  nameHi: 'संकष्टी चतुर्थी (भगवान श्री गणेश)',
  nameRegional: { mr: 'संकष्टी चतुर्थी', te: 'సంకష్టహర చతుర్థి', ta: 'சங்கடஹர சதுர்த்தி' },
  category: 'chaturthi',
  deity: 'Lord Vinayaka (Ganesha)',
  frequency: 'Monthly (Krishna Paksha Chaturthi)',
  significance: 'Dispels all obstacles (Sankat Haran), fulfills deep aspirations, and brings divine wisdom and peace. When it falls on a Tuesday, it is known as Angarki Chaturthi, carrying 1,000 times greater merit.',
  fastingType: 'Phalahar or Nirjala until Moonrise',
  rituals: [
    'Observe fast throughout the day from sunrise',
    'Perform Ganesha puja with Modak, Durva grass, and red hibiscus flowers',
    'Recite the Sankata Nashanam Ganesha Stotram and Atharvashirsha',
    'Offer Arghya to the rising Moon (Chandra Arghya) with milk, water, and chandan before breaking fast'
  ],
  pujaVidhi: 'Bathe during Brahma Muhurat, set up idol of Lord Ganesha on red cloth, offer 21 blades of Durva grass, light a cow-ghee diya, offer laddoos/modaks, and break fast strictly after viewing the Moon and offering Arghya.',
  mantra: 'ॐ गं गणपतये नमः | ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि तन्नो दन्तिः प्रचोदयात्॥',
  dates2027: [
    { date: '2027-01-26', day: 'Tuesday (Angarki)', tithiOrOccasion: 'Magha Krishna Chaturthi', timingOrMoonrise: 'Moonrise: 09:28 PM' },
    { date: '2027-02-24', day: 'Wednesday', tithiOrOccasion: 'Phalguna Krishna Chaturthi', timingOrMoonrise: 'Moonrise: 09:35 PM' },
    { date: '2027-03-26', day: 'Friday', tithiOrOccasion: 'Chaitra Krishna Chaturthi', timingOrMoonrise: 'Moonrise: 10:12 PM' },
    { date: '2027-04-24', day: 'Saturday', tithiOrOccasion: 'Vaishakha Krishna Chaturthi', timingOrMoonrise: 'Moonrise: 10:48 PM' },
    { date: '2027-05-24', day: 'Monday', tithiOrOccasion: 'Jyeshtha Krishna Chaturthi', timingOrMoonrise: 'Moonrise: 11:22 PM' },
    { date: '2027-06-22', day: 'Tuesday (Angarki)', tithiOrOccasion: 'Ashadha Krishna Chaturthi', timingOrMoonrise: 'Moonrise: 10:55 PM' },
    { date: '2027-07-22', day: 'Thursday', tithiOrOccasion: 'Shravana Krishna Chaturthi', timingOrMoonrise: 'Moonrise: 09:40 PM' },
    { date: '2027-08-20', day: 'Friday', tithiOrOccasion: 'Bhadrapada Krishna Chaturthi', timingOrMoonrise: 'Moonrise: 08:52 PM' },
    { date: '2027-09-19', day: 'Sunday', tithiOrOccasion: 'Ashvina Krishna Chaturthi', timingOrMoonrise: 'Moonrise: 08:14 PM' },
    { date: '2027-10-19', day: 'Tuesday (Karwa Chauth Angarki)', tithiOrOccasion: 'Kartika Krishna Chaturthi', timingOrMoonrise: 'Moonrise: 08:15 PM' },
    { date: '2027-11-17', day: 'Wednesday', tithiOrOccasion: 'Margashirsha Krishna Chaturthi', timingOrMoonrise: 'Moonrise: 08:48 PM' },
    { date: '2027-12-17', day: 'Friday', tithiOrOccasion: 'Pausha Krishna Chaturthi', timingOrMoonrise: 'Moonrise: 09:20 PM' }
  ]
};

// 2. Vinayaka Chaturthi (Shukla Paksha Midday Ganesha Puja)
export const VINAYAKA_CHATURTHI: SacredObservanceItem = {
  id: 'vinayaka-chaturthi',
  name: 'Vinayaka Chaturthi (Lord Vinayaka)',
  nameHi: 'विनायक चतुर्थी (शुक्ल पक्ष)',
  nameRegional: { te: 'వినాయక చవితి', ta: 'விநாயகர் சதுர்த்தி', mr: 'विनायक चतुर्थी' },
  category: 'chaturthi',
  deity: 'Lord Vinayaka (Ganesha)',
  frequency: 'Monthly (Shukla Paksha Chaturthi)',
  significance: 'Worship of Lord Ganesha during Madhyahna (midday). Bestows intellect, memory, family auspiciousness, and removes impediments from all undertakings.',
  fastingType: 'Ekabhukta / Phalahar until Midday Puja',
  rituals: [
    'Madhyahna Ganesha worship at midday',
    'Offering 21 Modaks and red flowers',
    'Avoid sighting the moon on Bhadrapada Vinayaka Chaturthi (Mithya Kalank prevention)',
    'Recitation of Ganesha Suktam'
  ],
  pujaVidhi: 'Perform shodashopachara puja at midday (11:00 AM to 01:30 PM), offer Durva and Modak, chant Ganesha Gayatri.',
  mantra: 'ॐ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
  dates2027: [
    { date: '2027-01-11', day: 'Monday', tithiOrOccasion: 'Pausha Shukla Chaturthi', timingOrMoonrise: 'Madhyahna: 11:30 AM - 01:35 PM' },
    { date: '2027-02-10', day: 'Wednesday (Ganesh Jayanti)', tithiOrOccasion: 'Magha Shukla Chaturthi', timingOrMoonrise: 'Madhyahna: 11:28 AM - 01:38 PM' },
    { date: '2027-03-12', day: 'Friday', tithiOrOccasion: 'Phalguna Shukla Chaturthi', timingOrMoonrise: 'Madhyahna: 11:20 AM - 01:32 PM' },
    { date: '2027-04-10', day: 'Saturday', tithiOrOccasion: 'Chaitra Shukla Chaturthi', timingOrMoonrise: 'Madhyahna: 11:10 AM - 01:25 PM' },
    { date: '2027-05-09', day: 'Sunday', tithiOrOccasion: 'Vaishakha Shukla Chaturthi', timingOrMoonrise: 'Madhyahna: 11:02 AM - 01:20 PM' },
    { date: '2027-06-08', day: 'Tuesday', tithiOrOccasion: 'Jyeshtha Shukla Chaturthi', timingOrMoonrise: 'Madhyahna: 11:01 AM - 01:22 PM' },
    { date: '2027-07-07', day: 'Wednesday', tithiOrOccasion: 'Ashadha Shukla Chaturthi', timingOrMoonrise: 'Madhyahna: 11:05 AM - 01:26 PM' },
    { date: '2027-08-06', day: 'Friday', tithiOrOccasion: 'Shravana Shukla Chaturthi', timingOrMoonrise: 'Madhyahna: 11:08 AM - 01:28 PM' },
    { date: '2027-09-05', day: 'Sunday (Maha Ganesh Chaturthi)', tithiOrOccasion: 'Bhadrapada Shukla Chaturthi', timingOrMoonrise: 'Madhyahna: 11:04 AM - 01:30 PM' },
    { date: '2027-10-04', day: 'Monday', tithiOrOccasion: 'Ashvina Shukla Chaturthi', timingOrMoonrise: 'Madhyahna: 11:00 AM - 01:22 PM' },
    { date: '2027-11-03', day: 'Wednesday', tithiOrOccasion: 'Kartika Shukla Chaturthi', timingOrMoonrise: 'Madhyahna: 10:58 AM - 01:18 PM' },
    { date: '2027-12-02', day: 'Thursday', tithiOrOccasion: 'Margashirsha Shukla Chaturthi', timingOrMoonrise: 'Madhyahna: 11:05 AM - 01:20 PM' }
  ]
};

// 3. Pradosham Dates (Lord Shiva)
export const PRADOSHAM_DATES: SacredObservanceItem = {
  id: 'pradosham-dates',
  name: 'Pradosham Dates (Lord Shiva)',
  nameHi: 'प्रदोष व्रत (भगवान शिव)',
  nameRegional: { ta: 'பிரதோஷம்', te: 'ప్రదోషం', mr: 'प्रदोष व्रत' },
  category: 'pradosh',
  deity: 'Lord Shiva & Devi Parvati',
  frequency: 'Twice Monthly (Trayodashi Tithi during Twilight)',
  significance: 'Observed during the 1.5-hour sunset twilight window (Pradosha Kaal). Lord Shiva is said to perform the Ananda Tandava on Mount Kailash. Shani Pradosham (on Saturday) mitigates chronic Saturn afflictions; Soma Pradosham (Monday) brings mental bliss.',
  fastingType: 'Phalahar or Fast until Evening Pradosha Puja',
  rituals: [
    'Evening bath before sunset',
    'Abhishekam with milk, curd, honey, sugarcane juice, tender coconut water, and sandalwood',
    'Offering Bilva Patra (Bel leaves), Dhatura flowers, and Bhasma',
    'Pradakshina (circumambulation) of Nandi and Shiva Lingam'
  ],
  pujaVidhi: 'During the 90 minutes around sunset, perform Shivalinga Abhishek, light cow-ghee lamp, chant Maha Mrityunjaya mantra, and offer Prasadam to Nandi first.',
  mantra: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्य pushyāmṛtāt॥ ॐ नमः शिवाय॥',
  dates2027: [
    { date: '2027-01-05', day: 'Tuesday (Bhauma Pradosh)', tithiOrOccasion: 'Pausha Krishna Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 05:42 PM - 08:22 PM' },
    { date: '2027-01-20', day: 'Wednesday', tithiOrOccasion: 'Pausha Shukla Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 05:51 PM - 08:30 PM' },
    { date: '2027-02-03', day: 'Wednesday', tithiOrOccasion: 'Magha Krishna Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 06:02 PM - 08:38 PM' },
    { date: '2027-02-18', day: 'Thursday', tithiOrOccasion: 'Magha Shukla Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 06:12 PM - 08:45 PM' },
    { date: '2027-03-05', day: 'Friday', tithiOrOccasion: 'Phalguna Krishna Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 06:22 PM - 08:52 PM' },
    { date: '2027-03-20', day: 'Saturday (Shani Pradosh)', tithiOrOccasion: 'Phalguna Shukla Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 06:31 PM - 08:58 PM' },
    { date: '2027-04-04', day: 'Sunday', tithiOrOccasion: 'Chaitra Krishna Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 06:40 PM - 09:05 PM' },
    { date: '2027-04-18', day: 'Sunday', tithiOrOccasion: 'Chaitra Shukla Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 06:48 PM - 09:12 PM' },
    { date: '2027-05-03', day: 'Monday (Soma Pradosh)', tithiOrOccasion: 'Vaishakha Krishna Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 06:56 PM - 09:18 PM' },
    { date: '2027-05-18', day: 'Tuesday (Bhauma Pradosh)', tithiOrOccasion: 'Vaishakha Shukla Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 07:05 PM - 09:25 PM' },
    { date: '2027-06-02', day: 'Wednesday', tithiOrOccasion: 'Jyeshtha Krishna Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 07:12 PM - 09:30 PM' },
    { date: '2027-06-16', day: 'Wednesday', tithiOrOccasion: 'Jyeshtha Shukla Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 07:18 PM - 09:34 PM' },
    { date: '2027-07-01', day: 'Thursday', tithiOrOccasion: 'Ashadha Krishna Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 07:22 PM - 09:36 PM' },
    { date: '2027-07-16', day: 'Friday', tithiOrOccasion: 'Ashadha Shukla Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 07:20 PM - 09:32 PM' },
    { date: '2027-07-31', day: 'Saturday (Shani Pradosh in Sawan)', tithiOrOccasion: 'Shravana Krishna Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 07:12 PM - 09:25 PM' },
    { date: '2027-08-14', day: 'Saturday (Shani Pradosh in Sawan)', tithiOrOccasion: 'Shravana Shukla Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 07:01 PM - 09:15 PM' },
    { date: '2027-08-29', day: 'Sunday', tithiOrOccasion: 'Bhadrapada Krishna Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 06:48 PM - 09:04 PM' },
    { date: '2027-09-13', day: 'Monday (Soma Pradosh)', tithiOrOccasion: 'Bhadrapada Shukla Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 06:32 PM - 08:50 PM' },
    { date: '2027-09-28', day: 'Tuesday (Bhauma Pradosh)', tithiOrOccasion: 'Ashvina Krishna Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 06:15 PM - 08:38 PM' },
    { date: '2027-10-13', day: 'Wednesday', tithiOrOccasion: 'Ashvina Shukla Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 05:58 PM - 08:24 PM' },
    { date: '2027-10-27', day: 'Wednesday', tithiOrOccasion: 'Kartika Krishna Trayodashi (Dhanteras Pradosh)', timingOrMoonrise: 'Pradosha Kaal: 05:44 PM - 08:12 PM' },
    { date: '2027-11-11', day: 'Thursday', tithiOrOccasion: 'Kartika Shukla Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 05:34 PM - 08:05 PM' },
    { date: '2027-11-26', day: 'Friday', tithiOrOccasion: 'Margashirsha Krishna Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 05:30 PM - 08:02 PM' },
    { date: '2027-12-11', day: 'Saturday (Shani Pradosh)', tithiOrOccasion: 'Margashirsha Shukla Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 05:32 PM - 08:04 PM' },
    { date: '2027-12-25', day: 'Saturday (Shani Pradosh)', tithiOrOccasion: 'Pausha Krishna Trayodashi', timingOrMoonrise: 'Pradosha Kaal: 05:38 PM - 08:10 PM' }
  ]
};

// 4. Dwadashi Dates & Mahadwadashi (Lord Vishnu on Garuda)
export const DWADASHI_MAHADWADASHI: SacredObservanceItem = {
  id: 'dwadashi-mahadwadashi',
  name: 'Dwadashi Dates & Mahadwadashi (Lord Vishnu on Garuda)',
  nameHi: 'द्वादशी तिथियां एवं महाद्वादशी (गरुड़ारूढ़ श्री विष्णु)',
  nameRegional: { te: 'ద్వాదశి & మహాద్వాదశి', ta: 'துவாதசி', mr: 'द्वादशी व महाद्वादशी' },
  category: 'dwadashi',
  deity: 'Lord Vishnu on Garuda (Vaikunthanatha)',
  frequency: 'Post-Ekadashi Parana Day & Special Astronomical Alignments',
  significance: 'Dwadashi is the culmination of Ekadashi penance where fast breaking (Parana) takes place within Harivasara rules. The Shastras describe 8 types of Mahadwadashi (Unmilani, Vyanjuli, Trisprisha, Pakshavardhini, Jaya, Vijaya, Jayanti, Papanashini) that yield equivalent merit to 1,000 Ekadashis.',
  fastingType: 'Ekabhukta / Satvik Parana Meal',
  rituals: [
    'Worship of Lord Vishnu seated on Garuda with yellow flowers and Tulsi leaves',
    'Observing Parana strictly before Dwadashi tithi terminates and after Harivasara quarter passes',
    'Charity of food, gold, cows, or water pots to Brahmins and the poor',
    'Consuming sacred Charanamrit and Tulsi leaf to conclude fast'
  ],
  pujaVidhi: 'Meditate on Lord Vishnu riding Garuda holding Shankha, Chakra, Gada, Padma. Light ghee lamp, chant Vishnu Sahasranama, and offer food charity prior to self-consumption.',
  mantra: 'ॐ गरुडध्वजाय विद्महे पक्षिराजाय धीमहि तन्नो गरुडः प्रचोदयात्॥ ॐ नमो नारायणाय॥',
  dates2027: [
    { date: '2027-01-19', day: 'Tuesday', tithiOrOccasion: 'Pausha Shukla Dwadashi (Putrada Parana)', timingOrMoonrise: 'Parana: 07:15 AM - 09:22 AM' },
    { date: '2027-02-03', day: 'Wednesday', tithiOrOccasion: 'Magha Krishna Dwadashi (Shattila Parana / Trisprisha Mahadwadashi)', timingOrMoonrise: 'Parana: 07:08 AM - 09:18 AM' },
    { date: '2027-02-18', day: 'Thursday', tithiOrOccasion: 'Magha Shukla Dwadashi (Bhaimi Dwadashi / Jaya Parana)', timingOrMoonrise: 'Parana: 07:01 AM - 09:12 AM' },
    { date: '2027-03-05', day: 'Friday', tithiOrOccasion: 'Phalguna Krishna Dwadashi (Vijaya Parana / Vijaya Mahadwadashi)', timingOrMoonrise: 'Parana: 06:48 AM - 09:04 AM' },
    { date: '2027-03-20', day: 'Saturday', tithiOrOccasion: 'Phalguna Shukla Dwadashi (Govinda Dwadashi / Amalaki Parana)', timingOrMoonrise: 'Parana: 06:31 AM - 08:52 AM' },
    { date: '2027-04-04', day: 'Sunday', tithiOrOccasion: 'Chaitra Krishna Dwadashi (Papmochani Parana)', timingOrMoonrise: 'Parana: 06:14 AM - 08:38 AM' },
    { date: '2027-04-19', day: 'Monday', tithiOrOccasion: 'Chaitra Shukla Dwadashi (Kamada Parana / Pakshavardhini Mahadwadashi)', timingOrMoonrise: 'Parana: 06:03 AM - 08:26 AM' },
    { date: '2027-05-18', day: 'Tuesday', tithiOrOccasion: 'Vaishakha Shukla Dwadashi (Mohini Parana)', timingOrMoonrise: 'Parana: 05:35 AM - 08:15 AM' },
    { date: '2027-06-16', day: 'Wednesday', tithiOrOccasion: 'Jyeshtha Shukla Dwadashi (Nirjala Parana / Champaka Dwadashi)', timingOrMoonrise: 'Parana: 05:23 AM - 08:11 AM' },
    { date: '2027-07-16', day: 'Friday', tithiOrOccasion: 'Ashadha Shukla Dwadashi (Devshayani Parana / Vamana Jayanti Dwadashi)', timingOrMoonrise: 'Parana: 05:35 AM - 08:20 AM' },
    { date: '2027-11-11', day: 'Thursday', tithiOrOccasion: 'Kartika Shukla Dwadashi (Tulsi Vivah / Prabodhini Parana)', timingOrMoonrise: 'Parana: 06:42 AM - 08:51 AM' },
    { date: '2027-12-10', day: 'Friday', tithiOrOccasion: 'Margashirsha Shukla Dwadashi (Mokshada Parana / Akhanda Dwadashi)', timingOrMoonrise: 'Parana: 07:04 AM - 09:12 AM' }
  ]
};

// 5. Masik Shivaratri, Shiva Puja & Sawan Somwar Days
export const SHIVA_VRAT_CALENDAR: SacredObservanceItem = {
  id: 'masik-shivaratri-sawan-somwar',
  name: 'Shivaratri, Masik Shivaratri & Sawan Somwar Days (Lord Shiva)',
  nameHi: 'मासिक शिवरात्रि, शिव पूजा एवं सावन सोमवार (भगवान शिव)',
  nameRegional: { mr: 'मासिक शिवरात्र व श्रावण सोमवार', te: 'మాస శివరాత్రి & శ్రావణ సోమవారం', ta: 'மாத சிவராத்திரி & கார்த்திகை சோமவாரம்' },
  category: 'shivaratri',
  deity: 'Lord Shiva & Devi Parvati',
  frequency: 'Monthly Krishna Chaturdashi & Shravana Month Mondays',
  significance: 'Masik Shivaratri occurs on the 14th day of the dark fortnight. Shiva Puja performed at Nishita Kaal (midnight) cleanses karmas and awakens kundalini. Sawan Somwars are the most cherished days for Shivalinga Jalabhishekam.',
  fastingType: 'Nirjala / Phalahar with Milk and Bel Patra',
  rituals: [
    'Rudrabhishekam with Ganga water, milk, honey, sugarcane juice, and Bhasma',
    'Offering Bel Patra (Bel leaves smooth side down) with Chandan',
    'Night vigil (Jagaran) and Nishita Kaal Aradhana',
    'Recitation of Shiva Tandava Stotram and Rudrashtakam'
  ],
  pujaVidhi: 'Bathe in morning, take Sankalpa, fast all day, conduct Char Pahar or Nishita Kaal Shiva Lingam puja, light ghee lamp, chant "Om Namah Shivaya" 1008 times.',
  mantra: 'ॐ नमः शिवाय। कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम्। सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥',
  dates2027: [
    { date: '2027-01-06', day: 'Wednesday', tithiOrOccasion: 'Pausha Masik Shivaratri', timingOrMoonrise: 'Nishita Kaal: 12:02 AM - 12:54 AM' },
    { date: '2027-02-04', day: 'Thursday', tithiOrOccasion: 'Magha Masik Shivaratri', timingOrMoonrise: 'Nishita Kaal: 12:05 AM - 12:57 AM' },
    { date: '2027-02-25', day: 'Thursday', tithiOrOccasion: 'MAHA SHIVRATRI 2027 (Supreme Night of Shiva)', timingOrMoonrise: 'Nishita Kaal: 12:08 AM - 01:00 AM' },
    { date: '2027-03-06', day: 'Saturday', tithiOrOccasion: 'Phalguna Masik Shivaratri', timingOrMoonrise: 'Nishita Kaal: 12:04 AM - 12:55 AM' },
    { date: '2027-04-05', day: 'Monday (Somwar Shivaratri)', tithiOrOccasion: 'Chaitra Masik Shivaratri', timingOrMoonrise: 'Nishita Kaal: 11:58 PM - 12:47 AM' },
    { date: '2027-05-04', day: 'Tuesday', tithiOrOccasion: 'Vaishakha Masik Shivaratri', timingOrMoonrise: 'Nishita Kaal: 11:54 PM - 12:42 AM' },
    { date: '2027-06-03', day: 'Thursday', tithiOrOccasion: 'Jyeshtha Masik Shivaratri', timingOrMoonrise: 'Nishita Kaal: 11:54 PM - 12:40 AM' },
    { date: '2027-07-02', day: 'Friday', tithiOrOccasion: 'Ashadha Masik Shivaratri', timingOrMoonrise: 'Nishita Kaal: 11:58 PM - 12:44 AM' },
    { date: '2027-07-26', day: 'Monday', tithiOrOccasion: 'FIRST SAWAN SOMWAR 2027 (पहला सावन सोमवार)', timingOrMoonrise: 'Shravana Krishna Somwar - Rudrabhishek' },
    { date: '2027-08-01', day: 'Sunday', tithiOrOccasion: 'Shravana Masik Shivaratri (Sawan Shivaratri)', timingOrMoonrise: 'Nishita Kaal: 12:03 AM - 12:48 AM' },
    { date: '2027-08-02', day: 'Monday', tithiOrOccasion: 'SECOND SAWAN SOMWAR 2027 (दूसरा सावन सोमवार)', timingOrMoonrise: 'Shravana Somvati Amavasya - Mahamrityunjaya' },
    { date: '2027-08-09', day: 'Monday', tithiOrOccasion: 'THIRD SAWAN SOMWAR 2027 (तीसरा सावन सोमवार)', timingOrMoonrise: 'Shravana Shukla Somwar - Bilvarchana' },
    { date: '2027-08-16', day: 'Monday', tithiOrOccasion: 'FOURTH SAWAN SOMWAR 2027 (चौथा सावन सोमवार)', timingOrMoonrise: 'Shravana Shukla Somwar - Pradosh Abhishek' },
    { date: '2027-08-30', day: 'Monday', tithiOrOccasion: 'Bhadrapada Masik Shivaratri (Somwar Shivaratri)', timingOrMoonrise: 'Nishita Kaal: 12:00 AM - 12:46 AM' },
    { date: '2027-09-29', day: 'Wednesday', tithiOrOccasion: 'Ashvina Masik Shivaratri', timingOrMoonrise: 'Nishita Kaal: 11:52 PM - 12:40 AM' },
    { date: '2027-10-28', day: 'Thursday', tithiOrOccasion: 'Kartika Masik Shivaratri', timingOrMoonrise: 'Nishita Kaal: 11:46 PM - 12:35 AM' },
    { date: '2027-11-27', day: 'Saturday', tithiOrOccasion: 'Margashirsha Masik Shivaratri', timingOrMoonrise: 'Nishita Kaal: 11:47 PM - 12:38 AM' },
    { date: '2027-12-26', day: 'Sunday', tithiOrOccasion: 'Pausha Masik Shivaratri', timingOrMoonrise: 'Nishita Kaal: 11:55 PM - 12:48 AM' }
  ]
};

// 6. Satyanarayana Vrat, Dvatrinshi Purnima Vrat Katha & Purnima Vrat Dates
export const SATYANARAYANA_PURNIMA_VRAT: SacredObservanceItem = {
  id: 'satyanarayan-dvatrinshi-purnima',
  name: 'Satyanarayana Vrat & Dvatrinshi Purnima Vrat Katha (Shree Satyanarayan)',
  nameHi: 'सत्यनारायण व्रत एवं द्वात्रिंशी पूर्णिमा व्रत कथा (श्री सत्यनारायण)',
  nameRegional: { te: 'శ్రీ సత్యనారాయణ వ్రతం', mr: 'श्री सत्यनारायण पूजा व पौर्णिमा व्रत' },
  category: 'purnima',
  deity: 'Lord Shree Satyanarayan (Form of Lord Vishnu)',
  frequency: 'Monthly Purnima (Full Moon)',
  significance: 'Reveres Bhagwan Satyanarayan—the Lord of Truth. The Skanda Purana details the 32 sacred Purnima Vrat Kathas (Dvatrinshi Purnima) bringing health, marital harmony, business prosperity, and release from debt.',
  fastingType: 'Fasting until Evening Satyanarayan Puja & Moonrise Arghya',
  rituals: [
    'Decorating Mandap with banana plant stems, mango leaves, and flowers',
    'Preparing Panchamrit and Panjiri (roasted wheat flour with sugar, banana slices, and tulsi)',
    'Reciting the 5 divine chapters of Satyanarayan Katha with family and friends',
    'Singing Satyanarayan Aarti and offering Chandra Arghya'
  ],
  pujaVidhi: 'Place Shaligram or photo of Lord Satyanarayan on chowki, invite Navagrahas and Lord Ganesha, recite Katha, distribute prasadam, and break fast after viewing Purnima Moon.',
  mantra: 'ॐ नमो भगवते सत्यदेवाय सर्वसौख्यप्रदायिने। नमः सत्यस्वरूपाय श्रीसत्यनारायणाय ते॥',
  dates2027: [
    { date: '2027-01-22', day: 'Friday', tithiOrOccasion: 'Pausha Purnima (Shakambhari Purnima Vrat)', timingOrMoonrise: 'Moonrise: 05:32 PM' },
    { date: '2027-02-21', day: 'Sunday', tithiOrOccasion: 'Magha Purnima (Maha Maghi Satyanarayan Vrat)', timingOrMoonrise: 'Moonrise: 06:12 PM' },
    { date: '2027-03-22', day: 'Monday', tithiOrOccasion: 'Phalguna Purnima (Holika Dahan & Lakshmi Jayanti)', timingOrMoonrise: 'Moonrise: 06:34 PM' },
    { date: '2027-04-21', day: 'Wednesday', tithiOrOccasion: 'Chaitra Purnima (Hanuman Jayanti Satyanarayan Vrat)', timingOrMoonrise: 'Moonrise: 06:55 PM' },
    { date: '2027-05-20', day: 'Thursday', tithiOrOccasion: 'Vaishakha Purnima (Buddha Purnima & Kurma Jayanti)', timingOrMoonrise: 'Moonrise: 07:22 PM' },
    { date: '2027-06-19', day: 'Saturday', tithiOrOccasion: 'Jyeshtha Purnima (Vat Purnima Satyanarayan Vrat)', timingOrMoonrise: 'Moonrise: 07:48 PM' },
    { date: '2027-07-18', day: 'Sunday', tithiOrOccasion: 'Ashadha Purnima (Guru Purnima / Vyasa Purnima)', timingOrMoonrise: 'Moonrise: 07:54 PM' },
    { date: '2027-08-17', day: 'Tuesday', tithiOrOccasion: 'Shravana Purnima (Raksha Bandhan & Narali Purnima)', timingOrMoonrise: 'Moonrise: 07:38 PM' },
    { date: '2027-09-15', day: 'Wednesday', tithiOrOccasion: 'Bhadrapada Purnima (Prosthapada Purnima / Pitru Paksha Starts)', timingOrMoonrise: 'Moonrise: 07:05 PM' },
    { date: '2027-10-15', day: 'Friday', tithiOrOccasion: 'Ashvina Purnima (Sharad Purnima & Kojagari Lakshmi Vrat)', timingOrMoonrise: 'Moonrise: 06:22 PM' },
    { date: '2027-11-13', day: 'Saturday', tithiOrOccasion: 'Kartika Purnima (Dev Diwali & Tripurari Purnima)', timingOrMoonrise: 'Moonrise: 05:40 PM' },
    { date: '2027-12-13', day: 'Monday', tithiOrOccasion: 'Margashirsha Purnima (Dattatreya Jayanti Vrat)', timingOrMoonrise: 'Moonrise: 05:30 PM' }
  ]
};

// 7. Navagraha Names & Navagraha Weekdays Fasting
export const NAVAGRAHA_WEEKDAYS_FASTING = {
  id: 'navagraha-weekdays-fasting',
  title: 'Navagraha Names & Navagraha Weekdays Fasting (नवग्रह उपवास)',
  titleHi: 'नवग्रह नाम एवं नवग्रह वार व्रत',
  grahas: [
    {
      name: 'Surya (Sun / सूर्य)',
      weekday: 'Sunday (रविवार)',
      deity: 'Lord Surya Bhagwan',
      gemstone: 'Ruby (माणिक्य)',
      mantra: 'ॐ ह्रीं ह्रीं सूर्याय नमः',
      fastingVidhi: 'Consume food without table salt once a day before sunset. Eat wheat, milk, or jaggery porridge. Cleanses eyesight, boosts bone health and soul vitality.',
      benefits: 'Fatherly harmony, government success, career authority, and solar brilliance.'
    },
    {
      name: 'Chandra (Moon / चन्द्र)',
      weekday: 'Monday (सोमवार)',
      deity: 'Lord Shiva & Chandra Dev',
      gemstone: 'Pearl (मोती)',
      mantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः',
      fastingVidhi: 'Fast consuming milk, kheer, curd, or rice without salt. Worship Lord Shiva with white flowers and sandalwood paste.',
      benefits: 'Mental peace, emotional stability, mother’s wellness, and relief from anxiety.'
    },
    {
      name: 'Mangal (Mars / मङ्गल)',
      weekday: 'Tuesday (मंगलवार)',
      deity: 'Lord Hanuman & Kartikeya',
      gemstone: 'Red Coral (मूँगा)',
      mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
      fastingVidhi: 'Consume one meal made of wheat and jaggery (Halwa/Laddoo) without salt. Recite Hanuman Chalisa or Sundarkand.',
      benefits: 'Dispels Manglik Dosha, overcomes debts, fear, blood disorders, and enemies.'
    },
    {
      name: 'Budha (Mercury / बुध)',
      weekday: 'Wednesday (बुधवार)',
      deity: 'Lord Ganesha & Budha Dev',
      gemstone: 'Emerald (पन्ना)',
      mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
      fastingVidhi: 'Wear green clothing, feed green fodder/spinach to cows, consume green moong dal after midday Ganesha puja.',
      benefits: 'Sharpened intellect, business diplomacy, communication mastery, and nervous system harmony.'
    },
    {
      name: 'Guru / Brihaspati (Jupiter / गुरु)',
      weekday: 'Thursday (गुरुवार)',
      deity: 'Lord Vishnu & Brihaspati Dev',
      gemstone: 'Yellow Sapphire (पुखराज)',
      mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
      fastingVidhi: 'Wear yellow, worship Banana tree and Lord Vishnu with Chana dal and jaggery. Do not wash hair or use soap on this day.',
      benefits: 'Marital bliss, auspicious offspring, higher wisdom, wealth expansion, and Guru Kripa.'
    },
    {
      name: 'Shukra (Venus / शुक्र)',
      weekday: 'Friday (शुक्रवार)',
      deity: 'Goddess Lakshmi & Santoshi Mata',
      gemstone: 'Diamond (हीरा / ओपल)',
      mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
      fastingVidhi: 'Consume white food (milk, kheer, sabudana). Strictly avoid sour foods (Khatta) on Santoshi Mata vrat.',
      benefits: 'Luxuries, vehicles, marital romance, artistic talents, and financial abundance.'
    },
    {
      name: 'Shani (Saturn / शनि)',
      weekday: 'Saturday (शनिवार)',
      deity: 'Lord Shani Dev & Hanuman Ji',
      gemstone: 'Blue Sapphire (नीलम)',
      mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
      fastingVidhi: 'Fast consuming khichdi with black sesame and mustard oil after dusk. Light mustard oil lamp under Peepal tree and donate black umbrella/iron.',
      benefits: 'Mitigates Sade Sati, Dhaiya, chronic paralysis, delays, and court disputes.'
    },
    {
      name: 'Rahu (North Node / राहु)',
      weekday: 'Saturday Evening or Tuesday Night',
      deity: 'Maa Durga & Lord Bhairava',
      gemstone: 'Hessonite Garnet (गोमेद)',
      mantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',
      fastingVidhi: 'Fast on Saturdays with barley flour meal; feed stray black dogs and donate coconut wrapped in blue cloth into flowing water.',
      benefits: 'Removes phobias, sudden accidents, black magic illusions, and Kal Sarp Dosha.'
    },
    {
      name: 'Ketu (South Node / केतु)',
      weekday: 'Tuesday / Thursday Dawn',
      deity: 'Lord Ganesha & Matsya Avatar',
      gemstone: 'Cat’s Eye (लहसुनिया)',
      mantra: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः',
      fastingVidhi: 'Offer sweet rotis to dogs, offer Durva to Ganesha, eat satvik roots and sesame.',
      benefits: 'Spiritual liberation (Moksha), psychic intuition, healing skin ailments, and yogic progress.'
    }
  ]
};

// 8. Deities Weekdays Vrat Katha & Fasting
export const DEITIES_WEEKDAYS_FASTING = {
  id: 'deities-weekdays-vrat-katha',
  title: 'Deities Weekdays Vrat Katha & Fasting (वार व्रत कथा एवं विधि)',
  titleHi: 'देवी-देवता वार व्रत कथा एवं पूजन',
  days: [
    {
      day: 'Monday (सोमवार व्रत)',
      deity: 'Lord Shiva & Devi Parvati',
      katha: 'The holy merchant Katha who was blessed with a son through 16 Somwar fasts, curing the young boy from impending early demise through Shiva Parvati grace.',
      vidhi: 'Wake during Brahma Muhurat, offer Bel Patra, water and raw milk on Shivalinga. Eat sweet wheat flour churma once a day without salt.'
    },
    {
      day: 'Tuesday (मंगलवार व्रत)',
      deity: 'Lord Hanuman & Goddess Mangala Gauri',
      katha: 'The story of an elderly Brahmin woman whose devoted son was rescued from subterranean danger by Lord Hanuman’s valor.',
      vidhi: 'Wear red clothes, offer vermilion (Sindoor) and Jasmine oil to Hanuman Ji, distribute Boondi or Gur-Chana prasad. Take one sweet meal.'
    },
    {
      day: 'Wednesday (बुधवार व्रत)',
      deity: 'Lord Ganesha & Budha Dev',
      katha: 'The dialogue of Samhukta who traveled with his wife on Wednesday and met celestial blessings by pacifying Budha Dev through green moong charity.',
      vidhi: 'Worship Lord Ganesha with 21 Durva blades and Modaks. Consume green moong dal preparations. Avoid harsh speech.'
    },
    {
      day: 'Thursday (गुरुवार / बृहस्पति व्रत)',
      deity: 'Lord Vishnu & Brihaspati Dev',
      katha: 'The merchant and queen who lost their immense prosperity due to disrespecting a holy mendicant, restored upon faithfully keeping Thursday Brihaspati vrat.',
      vidhi: 'Wear yellow, worship Banana plant with gram dal, jaggery, turmeric. Eat yellow food (chana dal kheer, besan ladoo) without salt. Do not use soap.'
    },
    {
      day: 'Friday (शुक्रवार संतोषी माता / वैभव लक्ष्मी व्रत)',
      deity: 'Santoshi Mata & Maa Vaibhav Lakshmi',
      katha: 'The devoted daughter-in-law who endured harsh ill-treatment from in-laws, freed and elevated to queenly status through Santoshi Mata’s 16 Friday fasts.',
      vidhi: 'Offer roasted gram and jaggery (Gur-Chana). STRICTLY PROHIBIT SOUR FOODS (Khatta) for everyone in the household. Recite Vaibhav Lakshmi Sri Yantra stotra.'
    },
    {
      day: 'Saturday (शनिवार व्रत)',
      deity: 'Lord Shani Dev & Hanuman Ji',
      katha: 'King Vikramaditya who tested the supremacy of the nine planets, underwent 7.5 years of trials under Shani Dev, and was ultimately restored with double honors.',
      vidhi: 'Light mustard oil diya under Peepal tree, offer black sesame, chant Shani Chalisa, feed black cows, birds, and dogs. Eat Urad dal khichdi after dusk.'
    },
    {
      day: 'Sunday (रविवार सूर्य व्रत)',
      deity: 'Lord Surya Bhagwan',
      katha: 'The elderly woman who washed her courtyard with cow dung and fed on sun-blessed food, granted miraculous celestial cow that brought wealth and healed leprosy.',
      vidhi: 'Offer Arghya with copper pot at sunrise, chant Aditya Hridaya Stotra, eat one salt-free meal of wheat daliya/roti with jaggery before sunset.'
    }
  ]
};

// 9. Additional Key Observances (Skanda Sashti, Karthigai, Shradh, Durgashtami, Kalashtami, Rohini, Sankranti, Chandra Darshan, Mangala Gauri, Ishti, ISKCON, Krishna, Dashavatara, Purushottam Maas, Chaturmasa, Ashoka Ashtami, Asha Dashami, Durva Ashtami, Jivitputrika, Shitala Saptami)
export const SPECIAL_DEITY_VRATS: SacredObservanceItem[] = [
  {
    id: 'skanda-sashti-karthigai',
    name: 'Skanda Sashti & Karthigai Days (Lord Murugan)',
    nameHi: 'स्कन्द षष्ठी एवं कार्तिगै दीपम् (भगवान मुरुगन / कार्तिकेय)',
    nameRegional: { ta: 'கந்த சஷ்டி & கார்த்திகை தீபம்', te: 'స్కంద షష్ఠి', kn: 'ಸ್ಕಂದ ಷಷ್ಠಿ' },
    category: 'special',
    deity: 'Lord Murugan (Kartikeya / Subrahmanya)',
    frequency: 'Monthly Shukla Sashti & Krittika Nakshatra Days',
    significance: 'Celebrates Lord Murugan vanquishing demon Soorapadman using the divine Vel (lance). The 6-day Skanda Sashti fast and monthly Karthigai Deepam kindle divine light, destroy negative mental patterns, and bestow victory over insurmountable challenges.',
    fastingType: 'Phalahar / Liquid Fast during 6-day Soorasamharam',
    rituals: [
      'Chanting Kanda Sashti Kavasam and Subrahmanya Bhujangam',
      'Abhishekam with milk, Panchamrit, and Vibhuti',
      'Lighting rows of earthen lamps on Karthigai Nakshatra evening',
      'Observing silence (Mouna) during Sashti'
    ],
    pujaVidhi: 'Offer red flowers, Panchamrit, and spear (Vel) worship. Fast throughout day, chanting Om Saravanabhavaya Namah.',
    mantra: 'ॐ शरवणभवाय नमः। ॐ तत्पुरुषाय विद्महे महासेनाय धीमहि तन्नः षण्मुखः प्रचोदयात्॥',
    dates2027: [
      { date: '2027-01-13', day: 'Wednesday', tithiOrOccasion: 'Skanda Sashti (Pausha)', timingOrMoonrise: 'Krittika Nakshatra Sashti' },
      { date: '2027-02-12', day: 'Friday', tithiOrOccasion: 'Skanda Sashti (Magha)', timingOrMoonrise: 'Sashti Vrat' },
      { date: '2027-03-14', day: 'Sunday', tithiOrOccasion: 'Skanda Sashti (Phalguna)', timingOrMoonrise: 'Karthigai Deepam' },
      { date: '2027-07-09', day: 'Friday', tithiOrOccasion: 'Kumara Sashti (Ashadha)', timingOrMoonrise: 'Murugan Puja' },
      { date: '2027-11-05', day: 'Friday', tithiOrOccasion: 'SOORASAMHARAM (Grand Skanda Sashti Climax)', timingOrMoonrise: 'Kartika Shukla Sashti - Triumph of Murugan' },
      { date: '2027-11-13', day: 'Saturday', tithiOrOccasion: 'TIRUVANNAMALAI KARTHIGAI DEEPAM 2027', timingOrMoonrise: 'Maha Deepam lit on holy Arunachala hill' }
    ]
  },
  {
    id: 'shradh-shraddha-dates',
    name: 'Shradh Ritual & Shraddha Dates (Pitru Paksha)',
    nameHi: 'श्राद्ध कर्म एवं पितृ पक्ष तिथियां',
    nameRegional: { mr: 'पितृपक्ष श्राद्ध', te: 'పితృ పక్ష శ్రాద్ధం', ta: 'மஹாளய பட்சம்' },
    category: 'special',
    deity: 'Pitru Devatas (Departed Ancestors) & Bhagwan Vishnu',
    frequency: 'Annual 16-day Holy Fortnight (Bhadrapada Purnima to Sarva Pitru Amavasya)',
    significance: 'Sacred window during which departed souls visit their families. Performing Shradh, Pind Daan, and Tarpan with black sesame and Kusha grass elevates ancestors to Pitru Loka and delivers descendants from Pitru Dosha.',
    fastingType: 'Ekabhukta after feeding Brahmins, cows, crows, dogs, and ants',
    rituals: [
      'Tarpan facing South using copper vessel, water, milk, and black sesame (Kala Til)',
      'Pind Daan prepared with cooked rice, honey, ghee, and black sesame balls',
      'Pancha Bali: Offering food to Cow (Gau), Crow (Kaga), Dog (Shwan), Ants (Kitadi), and Mendicant',
      'Performing ritual during Kutup Muhurat (11:36 AM - 12:24 PM) and Rohina Muhurat'
    ],
    pujaVidhi: 'Wear Kusha ring on right ring finger, face south, chant Pitru Gayatri, offer water three times for each paternal and maternal ancestor, feed Brahmins with kheer-puri.',
    mantra: 'ॐ देवताभ्यः पितृभ्यश्च महायोगिभ्य एव च। नमः स्वाहायै स्वधायै नित्यमेव नमो नमः॥',
    dates2027: [
      { date: '2027-09-15', day: 'Wednesday', tithiOrOccasion: 'Purnima Shraddha (Pitru Paksha Begins)', timingOrMoonrise: 'Kutup Muhurat: 11:36 AM - 12:24 PM' },
      { date: '2027-09-16', day: 'Thursday', tithiOrOccasion: 'Pratipada Shraddha', timingOrMoonrise: 'Kutup: 11:36 AM - 12:24 PM' },
      { date: '2027-09-20', day: 'Monday', tithiOrOccasion: 'Panchami Shraddha / Kuwara Shraddha', timingOrMoonrise: 'Kutup: 11:35 AM - 12:23 PM' },
      { date: '2027-09-24', day: 'Friday', tithiOrOccasion: 'Navami Shraddha (Matri Navami - Mother’s Shradh)', timingOrMoonrise: 'For departed mothers and grandmothers' },
      { date: '2027-09-28', day: 'Tuesday', tithiOrOccasion: 'Trayodashi Shraddha (Magha Shraddha / Kakbali)', timingOrMoonrise: 'Special for deceased children' },
      { date: '2027-09-29', day: 'Wednesday', tithiOrOccasion: 'Chaturdashi Shraddha (Ghata Chaturdashi)', timingOrMoonrise: 'For souls departed through sudden accidents/arms' },
      { date: '2027-09-30', day: 'Thursday', tithiOrOccasion: 'SARVA PITRU AMAVASYA (Mahalaya Amavasya)', timingOrMoonrise: 'Grand Shradh for all unknown ancestors' }
    ]
  },
  {
    id: 'durgashtami-days',
    name: 'Durgashtami Days (Goddess Durga)',
    nameHi: 'मासिक दुर्गाष्टमी व्रत (माँ दुर्गा)',
    nameRegional: { bn: 'মহাষ্টমী', mr: 'दुर्गाष्टमी', te: 'దుర్గాష్టమి' },
    category: 'special',
    deity: 'Goddess Durga / Mahishasuramardini',
    frequency: 'Monthly (Shukla Paksha Ashtami)',
    significance: 'Celebrates the primordial Shakti who vanquishes negative demonic energies. Bestows fearless courage, protection of children, household prosperity, and inner peace.',
    fastingType: 'Phalahar / Fast until Evening Sandhya Aarti',
    rituals: [
      'Worship of Maa Durga with red chunri, red hibiscus flowers, and vermilion',
      'Recitation of Durga Saptashati or Argala Stotram and Devi Kavacham',
      'Lighting a continuous oil lamp (Akhand Diya)',
      'Feeding young virgin girls (Kanya Pujan) with halwa, puri, and chana'
    ],
    pujaVidhi: 'Install Durga idol on red cloth, offer 16 adornments (Solah Shringar), chant Durga Ashtakam, and offer camphor Aarti.',
    mantra: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
    dates2027: [
      { date: '2027-01-15', day: 'Friday', tithiOrOccasion: 'Pausha Shukla Ashtami', timingOrMoonrise: 'Puja: Evening Sandhya' },
      { date: '2027-02-14', day: 'Sunday', tithiOrOccasion: 'Magha Shukla Ashtami (Bhishma Ashtami)', timingOrMoonrise: 'Puja: Morning & Dusk' },
      { date: '2027-03-16', day: 'Tuesday', tithiOrOccasion: 'Phalguna Shukla Ashtami', timingOrMoonrise: 'Puja: Evening Sandhya' },
      { date: '2027-04-14', day: 'Wednesday', tithiOrOccasion: 'CHAITRA MAHA DURGASHTAMI (Chaitra Navratri 8th Day)', timingOrMoonrise: 'Kanya Pujan & Sandhi Puja' },
      { date: '2027-05-13', day: 'Thursday', tithiOrOccasion: 'Vaishakha Shukla Ashtami', timingOrMoonrise: 'Puja: Evening' },
      { date: '2027-06-12', day: 'Saturday', tithiOrOccasion: 'Jyeshtha Shukla Ashtami', timingOrMoonrise: 'Puja: Evening' },
      { date: '2027-07-11', day: 'Sunday', tithiOrOccasion: 'Ashadha Shukla Ashtami', timingOrMoonrise: 'Puja: Evening' },
      { date: '2027-08-10', day: 'Tuesday', tithiOrOccasion: 'Shravana Shukla Ashtami', timingOrMoonrise: 'Puja: Evening' },
      { date: '2027-09-08', day: 'Wednesday', tithiOrOccasion: 'Bhadrapada Shukla Ashtami (Radha Ashtami)', timingOrMoonrise: 'Puja: Midday & Dusk' },
      { date: '2027-10-08', day: 'Friday', tithiOrOccasion: 'SHARAD MAHA DURGASHTAMI 2027 (महाष्टमी)', timingOrMoonrise: 'Auspicious Sandhi Puja: 06:15 PM - 07:03 PM' },
      { date: '2027-11-06', day: 'Saturday', tithiOrOccasion: 'Kartika Shukla Ashtami (Gopashtami)', timingOrMoonrise: 'Puja: Morning Cow Worship' },
      { date: '2027-12-06', day: 'Monday', tithiOrOccasion: 'Margashirsha Shukla Ashtami', timingOrMoonrise: 'Puja: Evening' }
    ]
  },
  {
    id: 'kalashtami-days',
    name: 'Kalashtami Days (Lord Kalabhairava)',
    nameHi: 'कालाष्टमी व्रत (भगवान कालभैरव)',
    nameRegional: { ta: 'கால பைரவாஷ்டமி', te: 'కాలాష్టమి', mr: 'कालाष्टमी' },
    category: 'special',
    deity: 'Lord Kalabhairava (Fierce Manifestation of Lord Shiva)',
    frequency: 'Monthly (Krishna Paksha Ashtami)',
    significance: 'Lord Kalabhairava controls Time (Kala) and fear. Fasting on Kalashtami eradicates deep fears, nightmares, evil eyes, planetary malefic effects, and untimely death.',
    fastingType: 'Phalahar / Night vigil fasting',
    rituals: [
      'Worship of Kalabhairava with mustard oil lamps, black sesame, and blue flowers',
      'Feeding black dogs with milk, sweet rotis, and mustard oil buns',
      'Chanting Kalabhairava Ashtakam composed by Adi Shankaracharya',
      'Midnight vigil and lighting 8 mustard oil lamps facing 8 directions'
    ],
    pujaVidhi: 'Bathe at dusk, place idol of Bhairava with Trishula and dog mount, light mustard oil lamp, chant "Hreem Batukaya Apaduddharanaya Kuru Kuru Batukaya Hreem", feed dogs.',
    mantra: 'देवराजसेव्यमानपावनाङ्घ्रिपङ्कजं व्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम्। नारदादियोगिवृन्दवन्दितं दिगम्बरं काशिकापुराधिनाथकालभैरवं भजे॥',
    dates2027: [
      { date: '2027-01-30', day: 'Saturday', tithiOrOccasion: 'Pausha Krishna Ashtami', timingOrMoonrise: 'Midnight Bhairav Puja' },
      { date: '2027-03-01', day: 'Monday', tithiOrOccasion: 'Magha Krishna Ashtami (Sita Ashtami)', timingOrMoonrise: 'Evening Puja' },
      { date: '2027-03-30', day: 'Tuesday', tithiOrOccasion: 'Phalguna Krishna Ashtami', timingOrMoonrise: 'Evening Puja' },
      { date: '2027-04-29', day: 'Thursday', tithiOrOccasion: 'Chaitra Krishna Ashtami', timingOrMoonrise: 'Evening Puja' },
      { date: '2027-05-28', day: 'Friday', tithiOrOccasion: 'Vaishakha Krishna Ashtami', timingOrMoonrise: 'Evening Puja' },
      { date: '2027-06-27', day: 'Sunday', tithiOrOccasion: 'Jyeshtha Krishna Ashtami', timingOrMoonrise: 'Evening Puja' },
      { date: '2027-07-26', day: 'Monday', tithiOrOccasion: 'Ashadha Krishna Ashtami', timingOrMoonrise: 'Evening Puja' },
      { date: '2027-08-25', day: 'Wednesday', tithiOrOccasion: 'Bhadrapada Krishna Ashtami (Janmashtami Kalashtami)', timingOrMoonrise: 'Midnight Puja' },
      { date: '2027-09-23', day: 'Thursday', tithiOrOccasion: 'Ashvina Krishna Ashtami (Jivitputrika Kalashtami)', timingOrMoonrise: 'Evening Puja' },
      { date: '2027-10-23', day: 'Saturday', tithiOrOccasion: 'Kartika Krishna Ashtami', timingOrMoonrise: 'Evening Puja' },
      { date: '2027-11-21', day: 'Sunday', tithiOrOccasion: 'KALABHAIRAV JAYANTI 2027 (महाकाल भैरव जयंती)', timingOrMoonrise: 'Auspicious Appearance Day of Lord Kalabhairava' },
      { date: '2027-12-21', day: 'Tuesday', tithiOrOccasion: 'Margashirsha Krishna Ashtami', timingOrMoonrise: 'Evening Puja' }
    ]
  },
  {
    id: 'rohini-vrat-days',
    name: 'Rohini Vrat Days (Jain & Vedic Fasting)',
    nameHi: 'रोहिणी व्रत तिथियां',
    nameRegional: { gu: 'રોહિણી વ્રત', mr: 'रोहिणी व्रत' },
    category: 'special',
    deity: 'Bhagwan Vasupujya (Jainism) & Lord Krishna / Chandra',
    frequency: 'Monthly when Rohini Nakshatra prevails at Sunrise',
    significance: 'Observed primarily by Jain women for marital harmony, long life of spouse, peace from afflictions, and spiritual detachment. Also observed in Vedic traditions to honor Chandra and Rohini.',
    fastingType: 'Ekabhukta / Complete Fast until Rohini Nakshatra concludes',
    rituals: [
      'Early morning prayer before the idol of Bhagwan Vasupujya',
      'Abstaining from all root vegetables, green leafy vegetables, and food after sunset',
      'Charity of clothes and grains to seekers'
    ],
    pujaVidhi: 'Offer white flowers and rice grains (Akshat) at the altar, meditate peacefully, practice forgiveness (Kshamavani).',
    mantra: 'ॐ ह्रीं श्रीं अर्हं वासुपूज्य पूज्यपादाय नमः॥',
    dates2027: [
      { date: '2027-01-18', day: 'Monday', tithiOrOccasion: 'Rohini Nakshatra Day', timingOrMoonrise: 'Full Day' },
      { date: '2027-02-14', day: 'Sunday', tithiOrOccasion: 'Rohini Nakshatra Day', timingOrMoonrise: 'Full Day' },
      { date: '2027-03-14', day: 'Sunday', tithiOrOccasion: 'Rohini Nakshatra Day', timingOrMoonrise: 'Full Day' },
      { date: '2027-04-10', day: 'Saturday', tithiOrOccasion: 'Rohini Nakshatra Day', timingOrMoonrise: 'Full Day' },
      { date: '2027-05-07', day: 'Friday', tithiOrOccasion: 'Rohini Nakshatra Day', timingOrMoonrise: 'Full Day' },
      { date: '2027-06-04', day: 'Friday', tithiOrOccasion: 'Rohini Nakshatra Day', timingOrMoonrise: 'Full Day' },
      { date: '2027-07-01', day: 'Thursday', tithiOrOccasion: 'Rohini Nakshatra Day', timingOrMoonrise: 'Full Day' },
      { date: '2027-07-28', day: 'Wednesday', tithiOrOccasion: 'Rohini Nakshatra Day', timingOrMoonrise: 'Full Day' },
      { date: '2027-08-25', day: 'Wednesday', tithiOrOccasion: 'Rohini Nakshatra (Janmashtami Day)', timingOrMoonrise: 'Midnight' },
      { date: '2027-09-21', day: 'Tuesday', tithiOrOccasion: 'Rohini Nakshatra Day', timingOrMoonrise: 'Full Day' },
      { date: '2027-10-18', day: 'Monday', tithiOrOccasion: 'Rohini Nakshatra Day', timingOrMoonrise: 'Full Day' },
      { date: '2027-11-15', day: 'Monday', tithiOrOccasion: 'Rohini Nakshatra Day', timingOrMoonrise: 'Full Day' },
      { date: '2027-12-12', day: 'Sunday', tithiOrOccasion: 'Rohini Nakshatra Day', timingOrMoonrise: 'Full Day' }
    ]
  },
  {
    id: 'sankranti-calendar',
    name: 'Sankranti Calendar (Lord Surya)',
    nameHi: 'संक्रांति पंचांग (भगवान सूर्य)',
    nameRegional: { te: 'సంక్రాంతి క్యాలెండర్', ta: 'மாத சங்கராந்தி', mr: 'संक्रांती दिनदर्शिका' },
    category: 'special',
    deity: 'Lord Surya Bhagwan (Sun God)',
    frequency: 'Monthly (Sun Entering New Zodiac Rashi)',
    significance: 'Each Sankranti marks the solar transition into one of the 12 rashis. Snana and Daana during the Punya Kaal wash away sins and grant prosperity. The most auspicious are Makar Sankranti (Capricorn), Mesha (Aries), Karka (Cancer), and Tula (Libra).',
    fastingType: 'Phalahar during Punya Kaal / Water charity',
    rituals: [
      'Snana in holy rivers at sunrise',
      'Arghya offering of copper kalash with red chandan, akshat, and flowers',
      'Daana of sesame, jaggery, clothing, and seasonal fruits'
    ],
    pujaVidhi: 'Face east, chant Surya Gayatri stotra, perform Surya Namaskar, donate food and warm blankets to the needy.',
    mantra: 'ॐ आदित्याय विद्महे मार्तण्डाय धीमहि तन्नः सूर्यः प्रचोदयात्॥ ॐ घृणिः सूर्याय नमः॥',
    dates2027: [
      { date: '2027-01-14', day: 'Thursday', tithiOrOccasion: 'MAKAR SANKRANTI (Uttarayana Begins)', timingOrMoonrise: 'Maha Punya Kaal: 07:15 AM - 09:05 AM' },
      { date: '2027-02-13', day: 'Saturday', tithiOrOccasion: 'Kumbha Sankranti', timingOrMoonrise: 'Punya Kaal: 07:02 AM - 12:40 PM' },
      { date: '2027-03-15', day: 'Monday', tithiOrOccasion: 'Meena Sankranti (Kharmas Begins)', timingOrMoonrise: 'Punya Kaal: 06:35 AM - 12:35 PM' },
      { date: '2027-04-14', day: 'Wednesday', tithiOrOccasion: 'MESHA SANKRANTI (Solar New Year / Vaisakhi)', timingOrMoonrise: 'Punya Kaal: 06:05 AM - 12:28 PM' },
      { date: '2027-05-15', day: 'Saturday', tithiOrOccasion: 'Vrishabha Sankranti', timingOrMoonrise: 'Punya Kaal: 05:35 AM - 11:58 AM' },
      { date: '2027-06-15', day: 'Tuesday', tithiOrOccasion: 'Mithuna Sankranti (Raja Parba)', timingOrMoonrise: 'Punya Kaal: 05:23 AM - 11:45 AM' },
      { date: '2027-07-16', day: 'Friday', tithiOrOccasion: 'KARKATAKA SANKRANTI (Dakshinayana Begins)', timingOrMoonrise: 'Punya Kaal: 05:35 AM - 12:12 PM' },
      { date: '2027-08-17', day: 'Tuesday', tithiOrOccasion: 'Simha Sankranti', timingOrMoonrise: 'Punya Kaal: 05:52 AM - 12:20 PM' },
      { date: '2027-09-17', day: 'Friday', tithiOrOccasion: 'Kanya Sankranti (Vishwakarma Jayanti)', timingOrMoonrise: 'Punya Kaal: 06:08 AM - 12:15 PM' },
      { date: '2027-10-17', day: 'Sunday', tithiOrOccasion: 'Tula Sankranti', timingOrMoonrise: 'Punya Kaal: 06:24 AM - 12:08 PM' },
      { date: '2027-11-16', day: 'Tuesday', tithiOrOccasion: 'Vrischika Sankranti', timingOrMoonrise: 'Punya Kaal: 06:45 AM - 12:10 PM' },
      { date: '2027-12-16', day: 'Thursday', tithiOrOccasion: 'Dhanu Sankranti (Kharmas Begins)', timingOrMoonrise: 'Punya Kaal: 07:07 AM - 12:25 PM' }
    ]
  },
  {
    id: 'chandra-darshan-days',
    name: 'Chandra Darshan Days (Lord Chandra)',
    nameHi: 'चन्द्र दर्शन तिथियां (भगवान चन्द्र)',
    nameRegional: { te: 'చంద్ర దర్శనం', mr: 'चंद्र दर्शन', ta: 'சந்திர தரிசனம்' },
    category: 'special',
    deity: 'Lord Chandra (Soma / Moon God)',
    frequency: 'Monthly post-Amavasya Crescent Moon Sighting',
    significance: 'Sighting the razor-thin crescent moon on Shukla Pratipada / Dwitiya right after New Moon brings mental tranquility, auspiciousness, cures eye diseases, and invokes Chandra Bhagwan’s blessings.',
    fastingType: 'Fasting until Moon Sighting at Dusk',
    rituals: [
      'Waiting at dusk facing western horizon to sight the crescent moon',
      'Offering Arghya of milk, water, white flowers, and unbroken rice (Akshat)',
      'Touching silver coin or pearl to eyes for cooling vision'
    ],
    pujaVidhi: 'Offer white Chandan to Chandra Dev, recite Chandra Gayatri, take elders’ blessings.',
    mantra: 'ॐ क्षीरपुत्राय विद्महे अमृततत्त्वाय धीमहि तन्नश्चन्द्रः प्रचोदयात्॥ ॐ सों सोमाय नमः॥',
    dates2027: [
      { date: '2027-01-09', day: 'Saturday', tithiOrOccasion: 'Pausha Chandra Darshan', timingOrMoonrise: 'Dusk: 06:05 PM - 07:15 PM' },
      { date: '2027-02-07', day: 'Sunday', tithiOrOccasion: 'Magha Chandra Darshan', timingOrMoonrise: 'Dusk: 06:22 PM - 07:30 PM' },
      { date: '2027-03-09', day: 'Tuesday', tithiOrOccasion: 'Phalguna Chandra Darshan', timingOrMoonrise: 'Dusk: 06:38 PM - 07:48 PM' },
      { date: '2027-04-07', day: 'Wednesday', tithiOrOccasion: 'Chaitra Chandra Darshan (Nav Varsh Chandra)', timingOrMoonrise: 'Dusk: 06:55 PM - 08:10 PM' },
      { date: '2027-05-07', day: 'Friday', tithiOrOccasion: 'Vaishakha Chandra Darshan', timingOrMoonrise: 'Dusk: 07:12 PM - 08:25 PM' },
      { date: '2027-06-05', day: 'Saturday', tithiOrOccasion: 'Jyeshtha Chandra Darshan', timingOrMoonrise: 'Dusk: 07:25 PM - 08:40 PM' },
      { date: '2027-07-05', day: 'Monday', tithiOrOccasion: 'Ashadha Chandra Darshan', timingOrMoonrise: 'Dusk: 07:28 PM - 08:35 PM' },
      { date: '2027-08-03', day: 'Tuesday', tithiOrOccasion: 'Shravana Chandra Darshan', timingOrMoonrise: 'Dusk: 07:18 PM - 08:20 PM' },
      { date: '2027-09-02', day: 'Thursday', tithiOrOccasion: 'Bhadrapada Chandra Darshan', timingOrMoonrise: 'Dusk: 06:55 PM - 07:55 PM' },
      { date: '2027-10-01', day: 'Friday', tithiOrOccasion: 'Ashvina Chandra Darshan (Navratri Moon)', timingOrMoonrise: 'Dusk: 06:35 PM - 07:35 PM' },
      { date: '2027-10-31', day: 'Sunday', tithiOrOccasion: 'Kartika Chandra Darshan', timingOrMoonrise: 'Dusk: 06:12 PM - 07:15 PM' },
      { date: '2027-11-29', day: 'Monday', tithiOrOccasion: 'Margashirsha Chandra Darshan', timingOrMoonrise: 'Dusk: 06:05 PM - 07:10 PM' },
      { date: '2027-12-29', day: 'Wednesday', tithiOrOccasion: 'Pausha Chandra Darshan', timingOrMoonrise: 'Dusk: 06:15 PM - 07:22 PM' }
    ]
  },
  {
    id: 'mangala-gauri-days',
    name: 'Mangala Gauri Days (Goddess Mangala Gauri)',
    nameHi: 'मंगला गौरी व्रत (माँ मंगला गौरी)',
    nameRegional: { mr: 'मंगळागौर व्रत', te: 'మంగళ గౌరీ వ్రతం', hi: 'मंगला गौरी' },
    category: 'special',
    deity: 'Goddess Mangala Gauri (Devi Parvati)',
    frequency: 'Tuesdays in the holy month of Shravana (Sawan)',
    significance: 'Observed by newly married Hindu brides for 5 consecutive years and unmarried women to pray for enduring Saubhagya (marital bliss), healthy progeny, and good fortune.',
    fastingType: 'Single salt-free meal at sunset',
    rituals: [
      'Creating Shringar altar with 16 types of flowers, 16 leaves, and 16 glass bangles',
      'Lighting a 16-wick cow ghee lamp',
      'Reciting Mangala Gauri Vrat Katha with female relatives',
      'Traditional Mangalagaur games (Zimma, Fugadi) played by women in Maharashtra'
    ],
    pujaVidhi: 'Offer 16 laddoos, 16 betel leaves, 16 varieties of grains to Maa Gauri, and give 16 items of Saubhagya daan to mother-in-law or married women.',
    mantra: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥ ॐ गौर्ये नमः॥',
    dates2027: [
      { date: '2027-07-27', day: 'Tuesday', tithiOrOccasion: 'First Shravana Mangala Gauri Vrat 2027', timingOrMoonrise: 'Morning Puja & 16-wick Aarti' },
      { date: '2027-08-03', day: 'Tuesday', tithiOrOccasion: 'Second Shravana Mangala Gauri Vrat 2027', timingOrMoonrise: 'Shodashopachara Gauri Puja' },
      { date: '2027-08-10', day: 'Tuesday', tithiOrOccasion: 'Third Shravana Mangala Gauri Vrat 2027', timingOrMoonrise: 'Mangalagaur Jagaran & Stotra' },
      { date: '2027-08-17', day: 'Tuesday', tithiOrOccasion: 'Fourth Shravana Mangala Gauri Vrat 2027 (Udyapan)', timingOrMoonrise: 'Culmination & Saubhagya Daan' }
    ]
  },
  {
    id: 'ishti-and-anvadhan',
    name: 'Ishti and Anvadhan (Vedic Yajna Observances)',
    nameHi: 'इष्टि एवं अन्वाधान (वैदिक यज्ञ वेला)',
    nameRegional: { te: 'ఇష్టి మరియు అన్వాధానం', mr: 'इष्टी व अन्वाधान' },
    category: 'special',
    deity: 'Lord Agni & Bhagwan Vishnu',
    frequency: 'Fortnightly prior to and on Pratipada (New/Full Moon sacrificial rites)',
    significance: 'Vedic rituals prescribed for Grihasthas and Sages. Anvadhan is the day of preparing the sacred firewood and taking vows; Ishti is the day of offering the primary Homa and oblations to the fire deity Agni.',
    fastingType: 'Havishya (pure boiled grain without spices)',
    rituals: [
      'Lighting the Tretagni or domestic sacred fire (Aupasana)',
      'Offering oblations of ghee and Charu into the fire',
      'Observing Brahmacharya and truthfulness'
    ],
    pujaVidhi: 'Conducted under Vedic guidance during Shukla Pratipada and Krishna Pratipada at sunrise.',
    mantra: 'ॐ अग्नये स्वाहा। इदम् अग्नये न मम। ॐ प्रजापतये स्वाहा। इदं प्रजापतये न मम॥',
    dates2027: [
      { date: '2027-01-08', day: 'Friday', tithiOrOccasion: 'Pausha Amavasya Anvadhan', timingOrMoonrise: 'Sunrise Vow' },
      { date: '2027-01-09', day: 'Saturday', tithiOrOccasion: 'Pausha Shukla Ishti', timingOrMoonrise: 'Homa Ritual' },
      { date: '2027-01-22', day: 'Friday', tithiOrOccasion: 'Pausha Purnima Anvadhan', timingOrMoonrise: 'Preparation' },
      { date: '2027-01-23', day: 'Saturday', tithiOrOccasion: 'Magha Krishna Ishti', timingOrMoonrise: 'Full Moon Homa' },
      { date: '2027-02-06', day: 'Saturday', tithiOrOccasion: 'Mauni Amavasya Anvadhan', timingOrMoonrise: 'Sacred Vows' },
      { date: '2027-02-07', day: 'Sunday', tithiOrOccasion: 'Magha Shukla Ishti', timingOrMoonrise: 'Morning Yajna' },
      { date: '2027-08-02', day: 'Monday', tithiOrOccasion: 'Shravana Amavasya Anvadhan', timingOrMoonrise: 'Somvati Anvadhan' },
      { date: '2027-08-03', day: 'Tuesday', tithiOrOccasion: 'Shravana Shukla Ishti', timingOrMoonrise: 'Shravana Yajna' }
    ]
  },
  {
    id: 'iskcon-ekadashi',
    name: 'ISKCON Ekadashi (Goddess Ekadashi)',
    nameHi: 'इस्कॉन एकादशी (गौड़ीय वैष्णव नियम)',
    nameRegional: { te: 'ఇస్కాన్ ఏకాదశి', bn: 'ইস্কন একাদশী' },
    category: 'ekadashi',
    deity: 'Lord Sri Krishna & Sri Chaitanya Mahaprabhu',
    frequency: 'Twice Monthly (Shuddha Ekadashi calculation)',
    significance: 'ISKCON (Gaudiya Vaishnava) observes Ekadashi strictly calculated via Arunodaya Vedha. If Dashami tithi touches the pre-dawn Arunodaya period (96 mins before sunrise), the fast is observed on the next day (Mahadvadashi / Shuddha Ekadashi) to protect spiritual purity.',
    fastingType: 'Nirjala or Anukalpa (strictly no grains, beans, mustard, or asafoetida)',
    rituals: [
      'Chanting 25 or more rounds of Hare Krishna Mahamantra',
      'Reading Srimad Bhagavatam and Bhagavad Gita',
      'No consumption of rice, wheat, dal, beans, corn, sesame, or mustard oil',
      'Breaking fast with Charanamrit and fruits during exact Parana window'
    ],
    pujaVidhi: 'Offer Tulsi leaves to Radha-Krishna deities, avoid sleeping during the day, perform Mangala Aarti at 04:30 AM.',
    mantra: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे। हरे राम हरे राम राम राम हरे हरे॥',
    dates2027: [
      { date: '2027-01-18', day: 'Monday', tithiOrOccasion: 'Putrada Ekadashi (ISKCON Fast)', timingOrMoonrise: 'Parana: Jan 19, 07:15 AM - 09:22 AM' },
      { date: '2027-02-02', day: 'Tuesday', tithiOrOccasion: 'Shattila Ekadashi (ISKCON Fast)', timingOrMoonrise: 'Parana: Feb 03, 07:09 AM - 09:18 AM' },
      { date: '2027-02-17', day: 'Wednesday', tithiOrOccasion: 'Bhaimi Ekadashi (Jaya / Varaha Dwadashi)', timingOrMoonrise: 'Parana: Feb 18, 07:01 AM - 09:12 AM' },
      { date: '2027-03-04', day: 'Thursday', tithiOrOccasion: 'Vijaya Ekadashi (ISKCON Fast)', timingOrMoonrise: 'Parana: Mar 05, 06:48 AM - 09:04 AM' },
      { date: '2027-06-15', day: 'Tuesday', tithiOrOccasion: 'Pandava Nirjala Ekadashi (Total Fast)', timingOrMoonrise: 'Parana: Jun 16, 05:23 AM - 08:11 AM' },
      { date: '2027-08-13', day: 'Friday', tithiOrOccasion: 'Pavitropana Ekadashi (Jhulan Yatra)', timingOrMoonrise: 'Parana: Aug 14, 05:50 AM - 08:45 AM' },
      { date: '2027-11-10', day: 'Wednesday', tithiOrOccasion: 'Prabodhini Ekadashi (Bhishma Panchaka Begins)', timingOrMoonrise: 'Parana: Nov 11, 06:42 AM - 08:51 AM' },
      { date: '2027-12-09', day: 'Thursday', tithiOrOccasion: 'Mokshada Ekadashi (Gita Jayanti)', timingOrMoonrise: 'Parana: Dec 10, 07:04 AM - 09:12 AM' }
    ]
  },
  {
    id: 'masik-krishna-janmashtami',
    name: 'Masik Krishna Janmashtami (Lord Krishna)',
    nameHi: 'मासिक कृष्ण जन्माष्टमी (भगवान श्री कृष्ण)',
    nameRegional: { te: 'మాస కృష్ణాష్టమి', mr: 'मासिक श्रीकृष्ण जयंती' },
    category: 'special',
    deity: 'Bhagwan Shri Krishna',
    frequency: 'Monthly Krishna Ashtami (8th Day of Dark Fortnight)',
    significance: 'Commemorates the divine midnight appearance of Lord Krishna in Mathura. Brings pure devotion, destroys depression, blesses issueless couples with noble children (Santan Gopal), and dissolves all material anxieties.',
    fastingType: 'Phalahar until Midnight (Nishita Kaal) Abhishek',
    rituals: [
      'Midnight Panchamrit Abhishek of Laddu Gopal idol in conch shell',
      'Swinging Bal Gopal in a decorated cradle (Jhula)',
      'Offering Makhan (fresh white butter) mixed with Mishri and Tulsi',
      'Reciting Santan Gopal Stotram and Madhurashtakam'
    ],
    pujaVidhi: 'Decorate home temple with peacock feathers, apply chandan to Gopal idol, perform midnight Aarti, and break fast with Makhan-Mishri prasad.',
    mantra: 'ॐ नमो भगवते वासुदेवाय। कृष्णाय वासुदेवाय हरये परमात्मने। प्रणतक्लेशनाशाय गोविन्दाय नमो नमः॥',
    dates2027: [
      { date: '2027-01-30', day: 'Saturday', tithiOrOccasion: 'Pausha Masik Krishna Janmashtami', timingOrMoonrise: 'Midnight: 12:02 AM' },
      { date: '2027-02-28', day: 'Sunday', tithiOrOccasion: 'Magha Masik Krishna Janmashtami', timingOrMoonrise: 'Midnight: 12:06 AM' },
      { date: '2027-03-30', day: 'Tuesday', tithiOrOccasion: 'Phalguna Masik Krishna Janmashtami', timingOrMoonrise: 'Midnight: 12:03 AM' },
      { date: '2027-04-29', day: 'Thursday', tithiOrOccasion: 'Chaitra Masik Krishna Janmashtami', timingOrMoonrise: 'Midnight: 11:58 PM' },
      { date: '2027-05-28', day: 'Friday', tithiOrOccasion: 'Vaishakha Masik Krishna Janmashtami', timingOrMoonrise: 'Midnight: 11:54 PM' },
      { date: '2027-06-27', day: 'Sunday', tithiOrOccasion: 'Jyeshtha Masik Krishna Janmashtami', timingOrMoonrise: 'Midnight: 11:55 PM' },
      { date: '2027-07-26', day: 'Monday', tithiOrOccasion: 'Ashadha Masik Krishna Janmashtami', timingOrMoonrise: 'Midnight: 11:58 PM' },
      { date: '2027-08-25', day: 'Wednesday', tithiOrOccasion: 'SHRI KRISHNA JANMASHTAMI 2027 (Supreme Appearance Day)', timingOrMoonrise: 'Nishita Kaal: 11:58 PM - 12:45 AM (Rohini Nakshatra)' },
      { date: '2027-09-23', day: 'Thursday', tithiOrOccasion: 'Bhadrapada Masik Krishna Janmashtami', timingOrMoonrise: 'Midnight: 11:52 PM' },
      { date: '2027-10-23', day: 'Saturday', tithiOrOccasion: 'Ashvina Masik Krishna Janmashtami', timingOrMoonrise: 'Midnight: 11:46 PM' },
      { date: '2027-11-21', day: 'Sunday', tithiOrOccasion: 'Kartika Masik Krishna Janmashtami', timingOrMoonrise: 'Midnight: 11:47 PM' },
      { date: '2027-12-21', day: 'Tuesday', tithiOrOccasion: 'Margashirsha Masik Krishna Janmashtami', timingOrMoonrise: 'Midnight: 11:53 PM' }
    ]
  },
  {
    id: 'dashavatara-vrat',
    name: 'Dashavatara Vrat (Lord Vishnu 10 Incarnations)',
    nameHi: 'दशावतार व्रत (भगवान श्री विष्णु के १० पावन अवतार)',
    nameRegional: { te: 'దశావతార వ్రతం', mr: 'दशावतार जयंती' },
    category: 'special',
    deity: 'Bhagwan Maha Vishnu (10 Avatars)',
    frequency: 'Celebrated on specific tithis across the year',
    significance: 'Honors the 10 cosmic descents of Lord Vishnu for cosmic balance: Matsya (Fish), Kurma (Tortoise), Varaha (Boar), Narasimha (Man-Lion), Vamana (Dwarf), Parashurama (Warrior Sage), Rama (Ideal King), Krishna/Balarama, Buddha, and Kalki (Future Destroyer of Ignorance).',
    fastingType: 'Phalahar on respective Jayanti days',
    rituals: [
      'Worship of specific Avatara with yellow flowers and Tulsi Dal',
      'Reading from Srimad Bhagavata Purana relevant cantos',
      'Reciting Jayadeva Goswami’s Gita Govinda Dashavatara Stotra: "Pralaya Payodhi Jale Dhritavanasi Vedam..."'
    ],
    pujaVidhi: 'Perform panchamrit abhishek, chant Dashavatara stotram, and distribute sattvic prasadam.',
    mantra: 'मत्स्यः कूर्मो वराहश्च नारसिंहश्च वामनः। रामो रामश्च कृष्णश्च बुद्धः कल्किश्च ते दश॥',
    dates2027: [
      { date: '2027-02-18', day: 'Thursday', tithiOrOccasion: 'Varaha Jayanti (Magha Shukla Dwadashi)', timingOrMoonrise: 'Morning Puja' },
      { date: '2027-04-16', day: 'Friday', tithiOrOccasion: 'RAMA NAVAMI (Lord Rama Appearance Day)', timingOrMoonrise: 'Madhyahna: 11:15 AM - 01:30 PM' },
      { date: '2027-05-09', day: 'Sunday', tithiOrOccasion: 'Parashurama Jayanti (Akshaya Tritiya)', timingOrMoonrise: 'Pradosh Kaal' },
      { date: '2027-05-19', day: 'Wednesday', tithiOrOccasion: 'Narasimha Jayanti (Vaishakha Shukla Chaturdashi)', timingOrMoonrise: 'Sunset Sayan Sandhya' },
      { date: '2027-05-20', day: 'Thursday', tithiOrOccasion: 'Kurma Jayanti (Vaishakha Purnima)', timingOrMoonrise: 'Full Moon' },
      { date: '2027-08-25', day: 'Wednesday', tithiOrOccasion: 'KRISHNA JANMASHTAMI & Balarama Jayanti', timingOrMoonrise: 'Midnight & Midday' },
      { date: '2027-09-12', day: 'Sunday', tithiOrOccasion: 'Vamana Jayanti (Bhadrapada Shukla Dwadashi)', timingOrMoonrise: 'Madhyahna Puja' },
      { date: '2027-11-13', day: 'Saturday', tithiOrOccasion: 'Matsya Jayanti (Kartika Purnima)', timingOrMoonrise: 'Morning Snana' }
    ]
  },
  {
    id: 'purushottam-maas',
    name: 'Purushottam Maas / Adhik Maas (Lord Vishnu on Garuda)',
    nameHi: 'पुरुषोत्तम मास / अधिक मास (भगवान विष्णु)',
    nameRegional: { gu: 'પુરુષોત્તમ માસ', mr: 'अधिक मास / धोंड्याचा महिना', te: 'అధిక మాసం' },
    category: 'special',
    deity: 'Lord Vishnu on Garuda (Bhagwan Purushottama)',
    frequency: 'Intercalary Lunar Month occurring roughly every 32.5 months',
    significance: 'Adhik Maas was blessed by Lord Vishnu to bear His own supreme name, Purushottama. Every charitable act, Japa, and fast in this month yields infinite (Akshaya) merit. Ideal for reading the Purushottama Mahatmya and gifting 33 Malpua / sweets.',
    fastingType: 'Ekabhukta / Ayachita / Complete satvik eating',
    rituals: [
      'Daily morning bath and offering Arghya to Lord Vishnu',
      'Continuous chanting of the Vishnu Sahasranama Stotram',
      'Donating bronze plates filled with 33 Malpuas / sweet breads to worthy Brahmins',
      'Abstaining from all Sakama karmas (weddings, house entry) to focus entirely on devotion'
    ],
    pujaVidhi: 'Install Shaligram or idol of Lord Vishnu with Lakshmi, light cow-ghee lamp, read daily chapter of Purushottama Mahatmya.',
    mantra: 'गोवर्धनधरं वन्दे गोपालं गोपरूपिणम्। गोकुलोत्सवमीशानं गोविन्दं गोपिकाप्रियम्॥ ॐ नमो भगवते वासुदेवाय॥',
    dates2027: [
      { date: '2027-01-01', day: 'Friday', tithiOrOccasion: 'Shastric Adhik Maas Principle & Calculations', timingOrMoonrise: 'Next Adhik Maas cycle follows in cosmic order' }
    ]
  },
  {
    id: 'chaturmasa',
    name: 'Chaturmasa (Lord Vishnu 4 Months Yogic Sleep)',
    nameHi: 'चातुर्मास व्रत (भगवान श्री विष्णु की योगनिद्रा)',
    nameRegional: { mr: 'चातुर्मास व्रत', te: 'చాతుర్మాస్యం', gu: 'ચાતુર્માસ' },
    category: 'special',
    deity: 'Lord Vishnu & Mata Lakshmi',
    frequency: 'Annual 4 Holy Months (Ashadha Shukla Ekadashi to Kartika Shukla Ekadashi)',
    significance: 'Lord Vishnu enters yoga-nidra on Shesha Naga in Ksheera Sagara. Devotees take vows of physical penance, Satvik lifestyle, and scriptural study. Prescribes four specific dietary abstinences to align with digestive fire (Jatharagni) during monsoon.',
    fastingType: 'Dietary Abstinence per Month:',
    rituals: [
      '1st Month (Shravana): Abstain from leafy vegetables (Shaaka Tyaga)',
      '2nd Month (Bhadrapada): Abstain from curd / yogurt (Dadhi Tyaga)',
      '3rd Month (Ashvina): Abstain from milk (Dugdha Tyaga)',
      '4th Month (Kartika): Abstain from split pulses / lentils and mustard (Dwidala Tyaga)'
    ],
    pujaVidhi: 'Begin on Devshayani Ekadashi by taking Sankalpa before Lord Vishnu with water and flowers; complete on Devutthana Ekadashi with Tulsi Vivah.',
    mantra: 'सुप्ते त्वयि जगन्नाथ जगत् सुप्तं भवेदिदम्। विबुद्धे त्वयि बुद्धं च प्रसन्नो मे भवाच्युत॥',
    dates2027: [
      { date: '2027-07-15', day: 'Thursday', tithiOrOccasion: 'CHATURMASA BEGINS (Devshayani / Ashadhi Ekadashi)', timingOrMoonrise: 'Taking 4-month spiritual vows' },
      { date: '2027-08-17', day: 'Tuesday', tithiOrOccasion: 'Second Month of Chaturmas Begins (Bhadrapada)', timingOrMoonrise: 'Dadhi (Curd) Abstinence Begins' },
      { date: '2027-09-15', day: 'Wednesday', tithiOrOccasion: 'Third Month of Chaturmas Begins (Ashvina)', timingOrMoonrise: 'Dugdha (Milk) Abstinence Begins' },
      { date: '2027-10-15', day: 'Friday', tithiOrOccasion: 'Fourth Month of Chaturmas Begins (Kartika)', timingOrMoonrise: 'Dwidala (Lentil) Abstinence Begins' },
      { date: '2027-11-10', day: 'Wednesday', tithiOrOccasion: 'CHATURMASA CONCLUDES (Devutthana Ekadashi / Tulsi Vivah)', timingOrMoonrise: 'Lord Vishnu awakens from Yogic Sleep' }
    ]
  },
  {
    id: 'ashoka-ashtami',
    name: 'Ashoka Ashtami (Hanuman Ji Giving Mudrika to Sita Mata)',
    nameHi: 'अशोक अष्टमी (हनुमान जी द्वारा सीता माता को मुद्रिका समर्पण)',
    nameRegional: { or: 'ଅଶୋକାଷ୍ଟମୀ (ରୁକୁଣା ରଥଯାତ୍ରା)', bn: 'অশোক অষ্টমী' },
    category: 'special',
    deity: 'Lord Hanuman, Sita Mata & Lord Shiva',
    frequency: 'Annual (Chaitra Shukla Ashtami)',
    significance: 'Commemorates the poignant moment in the Ramayana when Lord Hanuman reached Lanka, climbed the Ashoka tree, dropped Lord Rama’s signet ring (Mudrika) into Sita Mata’s lap, and destroyed her immense sorrow (Ashoka = without sorrow). Consuming eight buds of the Ashoka tree with water dispels all grief. Celebrated as the grand Rukuna Ratha Yatra in Odisha.',
    fastingType: 'Fasting and consuming 8 Ashoka flower buds',
    rituals: [
      'Consuming 8 unopened buds of Ashoka tree (Saraca asoca) chanting the sacred mantra',
      'Worship of Lord Hanuman with Sindoor and Jasmine oil',
      'Offering prayers to Sita Mata under an Ashoka tree',
      'Pulling Lord Lingaraj’s chariot in Bhubaneswar, Odisha'
    ],
    pujaVidhi: 'Offer flowers to Lord Rama and Hanuman Ji, recite Sundarkand, and consume 8 Ashoka buds with water for grief-free living.',
    mantra: 'त्वामशोक हराभीष्टं मधुमाससमुद्भवम्। पिबामि शोकसंतप्तो मामशोकं सदा कुरु॥',
    dates2027: [
      { date: '2027-04-14', day: 'Wednesday', tithiOrOccasion: 'Ashoka Ashtami (Chaitra Shukla Ashtami)', timingOrMoonrise: 'Morning Snana & Ashoka Bud Ritual' }
    ]
  },
  {
    id: 'asha-dashami-vrat',
    name: 'Asha Dashami Vrat (Asha Dashami)',
    nameHi: 'आशा दशमी व्रत (दिशाओं की अधिष्ठात्री देवियां)',
    nameRegional: { hi: 'आशा दशमी', mr: 'आशा दशमी' },
    category: 'special',
    deity: 'Ten Guardian Goddesses of Directions (Dashadisha Devatas)',
    frequency: 'Annual (Ashadha Shukla Dashami)',
    significance: 'Dedicated to fulfilling all righteous desires and aspirations (Asha). Devotees worship the deities of all 10 cardinal and intercardinal directions, ensuring that no enterprise meets with blockage or misfortune.',
    fastingType: 'Ekabhukta / Phalahar',
    rituals: [
      'Drawing symbols of the 10 directions with turmeric and rice paste',
      'Offering ten lamps, ten varieties of seasonal fruits, and fragrance',
      'Praying for fulfillment of personal ambitions and removal of directional hurdles'
    ],
    pujaVidhi: 'Light lamps facing North, South, East, West, NE, SE, SW, NW, Zenith, and Nadir. Chant Dashadisha Stuti.',
    mantra: 'आशासु मे यशो देहि दिशासु विजयं तथा। सर्वाः कामाः समेधन्तां प्रसीदन्तु दिशः सदा॥',
    dates2027: [
      { date: '2027-07-14', day: 'Wednesday', tithiOrOccasion: 'Asha Dashami (Ashadha Shukla Dashami)', timingOrMoonrise: 'Morning to Midday' }
    ]
  },
  {
    id: 'durva-ashtami-vrat',
    name: 'Durva Ashtami Vrat (Durva Ashtami)',
    nameHi: 'दूर्वा अष्टमी व्रत (भगवान शिव व गणेश)',
    nameRegional: { bn: 'দুর্বা অষ্টমী', mr: 'दुर्वाष्टमी' },
    category: 'special',
    deity: 'Lord Shiva, Ganesha & Sacred Durva Grass',
    frequency: 'Annual (Bhadrapada Shukla Ashtami)',
    significance: 'Worship of the immortal sacred Durva grass (Cynodon dactylon) which originated from the nectar drops of Samudra Manthan. Ensures enduring progeny, multi-generational prosperity, and peace of mind.',
    fastingType: 'Phalahar without cutting any green grass',
    rituals: [
      'Plucking fresh Durva grass with right hand without nails',
      'Offering knots of 21 Durva blades to Lord Shiva and Lord Ganesha with raw milk and flowers',
      'Refraining from cutting grass, ploughing soil, or weeding plants on this day'
    ],
    pujaVidhi: 'Bathe during sunrise, offer 21 pairs of Durva blades to Lord Shiva and Ganesha chanting the Durva prayer.',
    mantra: 'त्वं दूर्वेऽमृतजन्मासि वन्दितासि सुरासुरैः। सौभाग्यं सन्ततिं देहि सर्वकार्यकरी भव॥',
    dates2027: [
      { date: '2027-09-08', day: 'Wednesday', tithiOrOccasion: 'Durva Ashtami (Bhadrapada Shukla Ashtami)', timingOrMoonrise: 'Morning Sunrise Puja' }
    ]
  },
  {
    id: 'jivitputrika-vrat',
    name: 'Jivitputrika Vrat / Jitiya Vrat',
    nameHi: 'जीवित्पुत्रिका व्रत (जिउतिया व्रत)',
    nameRegional: { hi: 'जिउतिया व्रत', bho: 'जीवतिया' },
    category: 'special',
    deity: 'Bhagwan Jimutavahana & Chil-Siyarin',
    frequency: 'Annual (Ashvina Krishna Ashtami)',
    significance: 'An uncompromising 24-hour Nirjala (waterless) fast observed by mothers in Bihar, Jharkhand, Eastern UP, and Nepal for the absolute safety, long life, and prosperity of their children.',
    fastingType: 'Strict Nirjala (No food or water for 24+ hours)',
    rituals: [
      'Day 1 (Nahay Khay): Eating satvik gourd curry and Jhor-Bhat; Othgan pre-dawn meal',
      'Day 2 (Khar Jitiya): 24-hour waterless fast with clay idols of Chil (Eagle) and Siyar (Jackal)',
      'Listening to Jimutavahana Katha and wearing the red-yellow sacred Jitiya thread',
      'Day 3 (Parana): Breaking fast next morning after offering Arghya with Noni saag and Madua roti'
    ],
    pujaVidhi: 'Erect small pond replica near courtyard, place Jimutavahana image with mustard paste and vermilion, recite Katha.',
    mantra: 'जीमूतवाहन पादौ प्रणम्य शिरसा मुदा। पुत्रायुष्यमवाप्नोति सर्वकल्याणकारकम्॥',
    dates2027: [
      { date: '2027-09-22', day: 'Wednesday', tithiOrOccasion: 'Nahay Khay (Purification Feast)', timingOrMoonrise: 'Day 1 of Jitiya' },
      { date: '2027-09-23', day: 'Thursday', tithiOrOccasion: 'JIVITPUTRIKA VRAT (Main 24-Hour Nirjala Fast)', timingOrMoonrise: 'Full Day & Night Waterless Vigil' },
      { date: '2027-09-24', day: 'Friday', tithiOrOccasion: 'Jitiya Parana (Breaking Fast)', timingOrMoonrise: 'Morning post sunrise' }
    ]
  },
  {
    id: 'shitala-saptami',
    name: 'Shitala Saptami / Basoda (Goddess Shitala)',
    nameHi: 'शीतला सप्तमी / बसोड़ा (माँ शीतला)',
    nameRegional: { gu: 'શીતળા સાતમ', rj: 'बास्योड़ा', mr: 'शीतला सप्तमी' },
    category: 'special',
    deity: 'Goddess Shitala (Rider on Donkey with Broom and Pot)',
    frequency: 'Annual (Chaitra Krishna Saptami & Ashtami)',
    significance: 'Devoted to Mata Shitala, the deity of cool health and immunity against pox, fevers, and heat-borne illnesses. No fire is lit in the kitchen on this day; the family consumes only cold, stale food (Basoda) prepared the prior evening.',
    fastingType: 'Eating cold food cooked one day prior (No cooking fire allowed)',
    rituals: [
      'Cooking food (Kadhi, Meethi Bajra Roti, Puri, Pua, Gulgule) on Shashthi night',
      'Extinguishing the kitchen stove; no matchstick or gas stove is ignited all day',
      'Worshipping Goddess Shitala with cold water, curd, and stale cooked food',
      'Touching the holy water of Shitala temple to eyes and limbs for healing heat disorders'
    ],
    pujaVidhi: 'Offer water, curd, and stale bajra bread to Mata Shitala idol, apply haldi and kumkum, read Shitala Vrat Katha.',
    mantra: 'वन्देऽहं शीतलां देवीं रासभस्थां दिगम्बराम्। मार्जनीकलशोपेतां शूर्पालङ्कृतमस्तकाम्॥',
    dates2027: [
      { date: '2027-03-29', day: 'Monday', tithiOrOccasion: 'Shitala Saptami (Chaitra Krishna Saptami)', timingOrMoonrise: 'Basoda Cold Food Offering' },
      { date: '2027-03-30', day: 'Tuesday', tithiOrOccasion: 'Shitala Ashtami (Basoda Grand Puja)', timingOrMoonrise: 'Morning Cooling Puja' }
    ]
  }
];

export const ALL_SPECIAL_VRATS_MAP: Record<string, SacredObservanceItem> = {
  'sankashti-chaturthi': SANKASHTI_CHATURTHI,
  'vinayaka-chaturthi': VINAYAKA_CHATURTHI,
  'pradosham-dates': PRADOSHAM_DATES,
  'dwadashi-mahadwadashi': DWADASHI_MAHADWADASHI,
  'masik-shivaratri-sawan-somwar': SHIVA_VRAT_CALENDAR,
  'satyanarayan-dvatrinshi-purnima': SATYANARAYANA_PURNIMA_VRAT,
  'skanda-sashti-karthigai': SPECIAL_DEITY_VRATS[0],
  'shradh-shraddha-dates': SPECIAL_DEITY_VRATS[1],
  'durgashtami-days': SPECIAL_DEITY_VRATS[2],
  'kalashtami-days': SPECIAL_DEITY_VRATS[3],
  'rohini-vrat-days': SPECIAL_DEITY_VRATS[4],
  'sankranti-calendar': SPECIAL_DEITY_VRATS[5],
  'chandra-darshan-days': SPECIAL_DEITY_VRATS[6],
  'mangala-gauri-days': SPECIAL_DEITY_VRATS[7],
  'ishti-and-anvadhan': SPECIAL_DEITY_VRATS[8],
  'iskcon-ekadashi': SPECIAL_DEITY_VRATS[9],
  'masik-krishna-janmashtami': SPECIAL_DEITY_VRATS[10],
  'dashavatara-vrat': SPECIAL_DEITY_VRATS[11],
  'purushottam-maas': SPECIAL_DEITY_VRATS[12],
  'chaturmasa': SPECIAL_DEITY_VRATS[13],
  'ashoka-ashtami': SPECIAL_DEITY_VRATS[14],
  'asha-dashami-vrat': SPECIAL_DEITY_VRATS[15],
  'durva-ashtami-vrat': SPECIAL_DEITY_VRATS[16],
  'jivitputrika-vrat': SPECIAL_DEITY_VRATS[17],
  'shitala-saptami': SPECIAL_DEITY_VRATS[18]
};
