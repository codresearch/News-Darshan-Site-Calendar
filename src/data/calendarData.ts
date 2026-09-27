import {
  FestivalEvent,
  EkadashiEvent,
  PurnimaEvent,
  AmavasyaEvent,
  MuhuratCategory,
  HolidayItem,
  BankHolidayItem,
  RashifalData,
  BabyName,
  Article
} from '../types';

export const FESTIVALS_2027: FestivalEvent[] = [
  {
    id: 'makar-sankranti-2027',
    slug: 'makar-sankranti-2027',
    name: 'Makar Sankranti',
    nameHi: 'मकर संक्रांति',
    nameRegional: {
      mr: 'मकर संक्रांत',
      gu: 'ઉત્તરાયણ',
      te: 'మకర సంక్రాంతి',
      ta: 'தை பொங்கல்',
      kn: 'ಮಕರ ಸಂಕ್ರಾಂತಿ',
      bn: 'পৌষ সংক্রান্তি'
    },
    date2027: '2027-01-14',
    dayOfWeek2027: 'Thursday',
    category: 'Sankranti',
    deity: 'Surya Dev',
    tithiText: 'Magha Krishna Saptami',
    hinduMonth: 'Pausha / Magha',
    summary: 'Makar Sankranti marks the auspicious transition of the Sun into the zodiac sign of Makara (Capricorn) and the beginning of Uttarayana, the six-month auspicious journey of the Sun northward.',
    significance: 'Celebrated across India under regional names such as Pongal in Tamil Nadu, Uttarayan in Gujarat, Maghi in Punjab, and Poush Sankranti in Bengal. It is considered an exceptionally holy time for sacred river baths (Snana), charity (Daana), flying kites, and preparing sesame and jaggery delicacies.',
    rituals: [
      'Holy bath in the Ganga, Yamuna, Godavari, or Kaveri at sunrise',
      'Arghya offering of water, red flowers, and unbroken rice (Akshat) to Surya Dev',
      'Donation of warm clothing, sesame seeds (Til), jaggery (Gud), and khichdi to the needy',
      'Preparation of Tilgul (Til-Gud ladoos) exchanging the greeting: "Tilgul ghya, god god bola"'
    ],
    pujaVidhi: 'Take a bath during the Sankranti Punya Kaal. Face east towards the rising sun and chant the Surya Gayatri mantra or Aditya Hridaya Stotram while pouring water from a copper vessel.',
    shubhMuhurat: 'Punya Kaal: 07:15 AM to 12:45 PM | Maha Punya Kaal: 07:15 AM to 09:05 AM',
    regions: ['Pan-India', 'Maharashtra', 'Gujarat', 'Tamil Nadu', 'Andhra Pradesh', 'Bengal', 'Punjab']
  },
  {
    id: 'vasant-panchami-2027',
    slug: 'vasant-panchami-2027',
    name: 'Vasant Panchami (Saraswati Puja)',
    nameHi: 'बसंत पंचमी',
    nameRegional: {
      mr: 'वसंत पंचमी',
      bn: 'সরস্বতী পূজা',
      te: 'వసంత పంచమి'
    },
    date2027: '2027-02-11',
    dayOfWeek2027: 'Thursday',
    category: 'Deity',
    deity: 'Maa Saraswati',
    tithiText: 'Magha Shukla Panchami',
    hinduMonth: 'Magha',
    summary: 'Vasant Panchami heralds the arrival of spring (Vasant Ritu) and is devoted to Maa Saraswati, the goddess of wisdom, learning, music, arts, and speech.',
    significance: 'Regarded as an Abujha Muhurat (an inherently auspicious day requiring no astrological calculation for starting education, weddings, or Griha Pravesh). Young children are initiated into formal learning via the sacred Vidhyarambham / Akshar Abhyasam ceremony.',
    rituals: [
      'Wearing yellow clothing symbolizing energy and spring mustard blooms',
      'Placing notebooks, musical instruments, and pens at the feet of Goddess Saraswati',
      'Offering yellow flowers (Marigold, Palash) and yellow saffron sweet rice (Kesar Chawal)',
      'Vidhyarambham ritual for toddlers'
    ],
    pujaVidhi: 'Invoke Maa Saraswati with white and yellow flowers, chandan, and akshat. Recite the Saraswati Vandana: "Ya Kundendu Tushara Hara Dhavala".',
    shubhMuhurat: 'Puja Muhurat: 07:05 AM to 12:35 PM',
    regions: ['Pan-India', 'West Bengal', 'Bihar', 'Uttar Pradesh', 'Maharashtra', 'Odisha']
  },
  {
    id: 'maha-shivratri-2027',
    slug: 'maha-shivratri-2027',
    name: 'Maha Shivratri',
    nameHi: 'महाशिवरात्रि',
    nameRegional: {
      mr: 'महाशिवरात्र',
      gu: 'મહા શિવરાત્રી',
      te: 'మహా శివరాత్రి',
      ta: 'மகா சிவராத்திரி',
      kn: 'ಮಹಾ ಶಿವರಾತ್ರಿ'
    },
    date2027: '2027-02-25',
    dayOfWeek2027: 'Thursday',
    category: 'Major',
    deity: 'Bhagwan Shiva',
    tithiText: 'Phalguna Krishna Chaturdashi',
    hinduMonth: 'Phalguna (Magha in Amavasyant)',
    summary: 'The great night of Bhagwan Shiva celebrating the cosmic dance of creation, preservation, and destruction (Tandava) and the divine wedding of Shiva and Devi Parvati.',
    significance: 'Devotees observe a strict day-and-night vigil (Jagaran) and fast. Spiritual seekers recognize this night as the alignment of planetary forces that facilitate an effortless natural surge of spiritual energy along the human spine.',
    rituals: [
      'Continuous Maha Shivratri Vrat (Nirjala or Phalahar)',
      'Char Pahar Abhishek: Rudrabhishekam performed during four quarters of the night with Milk, Curd, Ghee, Honey, and Gangajal',
      'Offering sacred Bilva patra (Bel leaves), Dhatura, Bhasma, and white flowers',
      'Night-long chanting of "Om Namah Shivaya" and the Maha Mrityunjaya Mantra'
    ],
    pujaVidhi: 'Perform continuous Abhishek on the Shiva Lingam. Bel leaves must be offered smooth side down with three leaflets intact.',
    shubhMuhurat: 'Nishita Kaal Puja: 12:08 AM to 12:58 AM (Midnight of Feb 25-26)',
    regions: ['Pan-India', 'Kashmir', 'Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat']
  },
  {
    id: 'holi-2027',
    slug: 'holi-2027',
    name: 'Holi (Rangwali Holi)',
    nameHi: 'होली',
    nameRegional: {
      mr: 'धूलिवंदन / होळी',
      gu: 'હોળી ધુળેટી',
      bn: 'দোল যাত্রা',
      te: 'హోళీ'
    },
    date2027: '2027-03-22',
    dayOfWeek2027: 'Monday',
    category: 'Major',
    deity: 'Bhagwan Krishna & Vishnu',
    tithiText: 'Chaitra Krishna Pratipada (Holika Dahan on Phalguna Purnima)',
    hinduMonth: 'Phalguna / Chaitra',
    summary: 'The radiant festival of colors celebrating the victory of divine devotion over demonic tyranny (Bhakt Prahlad and Holika) and the divine love of Radha and Krishna.',
    significance: 'Holika Dahan is lit on the eve of Phalguna Purnima to purge negative energies and impurities. The following day, Rangwali Holi (Dhulandi/Dhuleti), unites communities in joyous celebration with herbal colors (Gulal), traditional music, and sweets like Gujiya.',
    rituals: [
      'Holika Dahan fire ritual with coconut, cow dung cakes, wheat stalks, and sugarcane',
      'Exchanging organic gulal and greeting neighbors and elders',
      'Preparation of traditional sweets: Gujiya, Mathri, Thandai, and Malpua',
      'Dol Jatra celebration with Radha Krishna deities in Bengal and Odisha'
    ],
    pujaVidhi: 'Worship Holika with Akshat, flowers, turmeric, and sweets before lighting the bonfire in the evening during the auspicious Muhurat after Bhadra.',
    shubhMuhurat: 'Holika Dahan Muhurat (March 21): 06:35 PM to 08:55 PM',
    regions: ['Pan-India', 'North India', 'Maharashtra', 'Bengal', 'Braj (Mathura-Vrindavan)']
  },
  {
    id: 'gudi-padwa-2027',
    slug: 'gudi-padwa-ugadi-2027',
    name: 'Gudi Padwa / Ugadi (Chaitra Navratri Day 1)',
    nameHi: 'गुड़ी पड़वा / उगादी',
    nameRegional: {
      mr: 'गुढी पाडवा',
      te: 'ఉగాది',
      kn: 'ಯುಗಾದಿ',
      gu: 'ચૈત્રી નવરાત્રી'
    },
    date2027: '2027-04-07',
    dayOfWeek2027: 'Wednesday',
    category: 'Major',
    deity: 'Bhagwan Brahma, Rama, Maa Durga',
    tithiText: 'Chaitra Shukla Pratipada',
    hinduMonth: 'Chaitra',
    summary: 'Traditional Hindu New Year marking the dawn of Vikram Samvat 2084 and Shalivahana Shaka 1949. Also marks the commencement of the sacred 9-day Chaitra Navratri festival.',
    significance: 'According to the Brahma Purana, Lord Brahma created the universe on this sacred day. In Maharashtra, homes hoist the triumphant Gudi (copper pot wrapped in bright silk, neem leaves, and sugar crystals) to commemorate victory and prosperity. In Andhra Pradesh, Telangana, and Karnataka, people prepare the six-taste Ugadi Pachadi reflecting life experiences.',
    rituals: [
      'Early oil bath and wearing auspicious traditional garments',
      'Erection of the Gudi at the entrance or balcony on the right side',
      'Consuming Neem leaves with jaggery to cultivate balance of health and emotions',
      'Ghatasthapana (Kalash Sthapana) for Chaitra Navratri',
      'Panchanga Sravanam: Listening to the predictions of the new Vedic year'
    ],
    pujaVidhi: 'Perform Ghatasthapana facing East or North. Sow barley (Jowar/Jau) seeds in clean soil, invoke Maa Shailaputri, and light the Akhand Jyot.',
    shubhMuhurat: 'Ghatasthapana Muhurat: 06:12 AM to 10:18 AM',
    regions: ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Goa', 'North India']
  },
  {
    id: 'ram-navami-2027',
    slug: 'ram-navami-2027',
    name: 'Ram Navami',
    nameHi: 'राम नवमी',
    nameRegional: {
      mr: 'राम नवमी',
      te: 'శ్రీరామ నవమి',
      ta: 'ஸ்ரீ ராம நவமி'
    },
    date2027: '2027-04-16',
    dayOfWeek2027: 'Friday',
    category: 'Deity',
    deity: 'Maryada Purushottam Bhagwan Rama',
    tithiText: 'Chaitra Shukla Navami',
    hinduMonth: 'Chaitra',
    summary: 'The auspicious appearance day of Maryada Purushottam Lord Rama, the seventh avatar of Bhagwan Vishnu, born at midday in Ayodhya to King Dasharatha and Queen Kausalya.',
    significance: 'Concludes the nine-day Chaitra Navratri fast. Midday (Madhyahna Kaal) sees grand celebrations in Ayodhya, Bhadrachalam, and worldwide temples with Ram Janma Kirtan, panchamrit distribution, and reading of the Ramcharitmanas.',
    rituals: [
      'Fast throughout the day until Madhyahna (noon)',
      'Shri Ram Janma celebration at 12:00 noon with conch blowing and flower showers',
      'Reading and continuous recitation of the Valmiki Ramayana or Sundarkand',
      'Kanya Pujan (Nine young girls worshipped as forms of Maa Durga) concluding Navratri'
    ],
    pujaVidhi: 'Bathe the deity of infant Rama with Panchamrit, dress in pitambar (yellow silk), offer tulsi leaves and peda, and rock the baby cradle chanting "Bhaye Pragat Kripala".',
    shubhMuhurat: 'Madhyahna Ram Janma Muhurat: 11:04 AM to 01:34 PM (Peak: 12:19 PM)',
    regions: ['Pan-India', 'Ayodhya', 'North India', 'Andhra Pradesh', 'Maharashtra']
  },
  {
    id: 'akshaya-tritiya-2027',
    slug: 'akshaya-tritiya-2027',
    name: 'Akshaya Tritiya (Akha Teej)',
    nameHi: 'अक्षय तृतीया',
    nameRegional: {
      mr: 'अक्षय्य तृतीया',
      gu: 'અખા ત્રીજ',
      bn: 'অক্ষয় তৃতীয়া',
      te: 'అక్షయ తృతీయ'
    },
    date2027: '2027-05-09',
    dayOfWeek2027: 'Sunday',
    category: 'Major',
    deity: 'Bhagwan Vishnu, Maa Lakshmi, Parashurama',
    tithiText: 'Vaishakha Shukla Tritiya',
    hinduMonth: 'Vaishakha',
    summary: 'Akshaya means "never diminishing" or eternal. Any auspicious deed, charity, gold purchase, or spiritual japa begun on this sacred day yields infinite, imperishable blessings.',
    significance: 'Marks the Treta Yuga commencement and the Jayanti of Bhagwan Parashurama. On this day, Ved Vyasa and Ganesha began writing the Mahabharata, and the portals of the revered Badrinath Temple are opened.',
    rituals: [
      'Purchasing gold, silver, property, or investment assets as tokens of unending prosperity',
      'Daana (charity) of earthenware water pots (Ghat/Kalash), barley, food grains, umbrellas, and hand fans',
      'Lakshmi-Narayana Puja with fresh yellow lotus and sandalwood',
      'Beginning new ventures, shops, or contracts without needing individual kundli checking'
    ],
    pujaVidhi: 'Install photos of Lakshmi Narayana. Offer yellow clothes, water pot with mango leaves, and chant Sri Suktam or Vishnu Sahasranama.',
    shubhMuhurat: 'Puja Muhurat: 05:42 AM to 12:15 PM | Gold Purchase: Entire day',
    regions: ['Pan-India', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Karnataka', 'Bengal']
  },
  {
    id: 'raksha-bandhan-2027',
    slug: 'raksha-bandhan-2027',
    name: 'Raksha Bandhan',
    nameHi: 'रक्षाबंधन',
    nameRegional: {
      mr: 'राखी पौर्णिमा / नारळी पौर्णिमा',
      gu: 'રક્ષાબંધન',
      te: 'రాఖీ పౌర్ణమి'
    },
    date2027: '2027-08-17',
    dayOfWeek2027: 'Tuesday',
    category: 'Major',
    deity: 'Surya, Varuna, Vishnu',
    tithiText: 'Shravana Shukla Purnima',
    hinduMonth: 'Shravana',
    summary: 'Celebration of the sacred bond of love, care, and protection between brothers and sisters. Also celebrated in coastal Maharashtra as Narali Purnima by offering coconuts to Lord Varuna.',
    significance: 'Sisters tie the protective sacred thread (Rakhi) on the right wrists of their brothers, praying for their long life and happiness, while brothers take a vow to protect their sisters through all adversity. Brahmins also perform Upakarma (changing the sacred thread / Yagnopavita).',
    rituals: [
      'Tying of Rakhi on the auspicious Aparahna or Pradosh Kaal avoiding Bhadra',
      'Applying Tilak of roli and akshat on brother\'s forehead and performing Aarti',
      'Narali Purnima coconut offering by fishing communities in Maharashtra',
      'Rigveda and Yajurveda Upakarma rituals by sacred thread wearers'
    ],
    pujaVidhi: 'Tie Rakhi chanting: "Yena baddho Bali raja danavendro mahabalah, Tena twam anubadhnami rakshe ma chala ma chala".',
    shubhMuhurat: 'Rakhi Tying Muhurat: 01:45 PM to 08:32 PM (Free from Bhadra shadow)',
    regions: ['Pan-India', 'Maharashtra', 'North India', 'Gujarat', 'Madhya Pradesh']
  },
  {
    id: 'krishna-janmashtami-2027',
    slug: 'krishna-janmashtami-2027',
    name: 'Krishna Janmashtami',
    nameHi: 'कृष्ण जन्माष्टमी',
    nameRegional: {
      mr: 'गोकुळाष्टमी / दहीहंडी',
      gu: 'જન્માષ્ટમી',
      te: 'శ్రీ కృష్ణ జన్మాష్టమి',
      ta: 'கோகுலாஷ்டமி'
    },
    date2027: '2027-08-25',
    dayOfWeek2027: 'Wednesday',
    category: 'Major',
    deity: 'Bhagwan Shri Krishna',
    tithiText: 'Bhadrapada Krishna Ashtami (Rohini Nakshatra)',
    hinduMonth: 'Bhadrapada (Shravana in Amavasyant)',
    summary: 'The birth celebration of Bhagwan Krishna, the supreme avatar who revealed the timeless wisdom of the Bhagavad Gita on the battlefield of Kurukshetra.',
    significance: 'Celebrated at midnight with immense devotion. Devotees keep a fast, decorate infant Krishna in swings (Jhula), prepare 56 Bhog offerings, and celebrate Dahi Handi human pyramids next morning in Maharashtra to reenact Krishna\'s playful childhood in Gokul.',
    rituals: [
      'Nishita Kaal midnight celebration with Panchamrit Abhishek',
      'Dressing Laddu Gopal with peacock feather (Mor Pankh) and fresh floral clothes',
      'Preparing Makhan-Mishri, Panjiri, and Chappan Bhog',
      'Singing Hare Krishna Maha-Mantra and reading the 10th Canto of Srimad Bhagavatam',
      'Dahi Handi celebrations on the following day (Gopal Kala)'
    ],
    pujaVidhi: 'At 12:00 AM midnight, bathe the deity in milk, yogurt, honey, ghee, and Gangajal. Chant Krishna Ashtakam and offer tulsi leaves with fresh white butter.',
    shubhMuhurat: 'Nishita Puja Kaal: 11:58 PM to 12:44 AM (Midnight of Aug 25-26)',
    regions: ['Pan-India', 'Mathura-Vrindavan', 'Maharashtra', 'Gujarat (Dwarka)', 'Kerala', 'Bengal']
  },
  {
    id: 'ganesh-chaturthi-2027',
    slug: 'ganesh-chaturthi-2027',
    name: 'Ganesh Chaturthi (Vinayaka Chavithi)',
    nameHi: 'गणेश चतुर्थी',
    nameRegional: {
      mr: 'गणेशोत्सव',
      te: 'వినాయక చవితి',
      ta: 'விநாயகர் சதுர்த்தி',
      kn: 'ಗಣೇಶ ಚತುರ್ಥಿ'
    },
    date2027: '2027-09-05',
    dayOfWeek2027: 'Sunday',
    category: 'Major',
    deity: 'Vighnaharta Bhagwan Ganesha',
    tithiText: 'Bhadrapada Shukla Chaturthi',
    hinduMonth: 'Bhadrapada',
    summary: 'The grand 10-day festival welcoming Bhagwan Ganesha, the remover of all obstacles and harbinger of wisdom and auspiciousness, concluding on Anant Chaturdashi.',
    significance: 'Publicly popularized by Lokmanya Tilak in 1893 to unite the nation. Clay murtis of Lord Ganesha are welcomed into homes and elaborate community Pandals with Dhol-Tasha, Aarti, and sweet Modaks, concluding with grand immersion (Visarjan).',
    rituals: [
      'Prana Pratishtha: Invoking the life force into the clay idol of Ganpati Bappa',
      'Shodashopachara Puja with 21 Durva grass blades, red Hibiscus flowers, and chandan',
      'Offering 21 Ukadiche Modak (steamed coconut and jaggery dumplings)',
      'Avoiding looking at the Moon on Ganesh Chaturthi night to prevent Mithya Dosha'
    ],
    pujaVidhi: 'Perform Ganesha invocation during Madhyahna Kaal. Offer modaks and chant the Atharvashirsha: "Om Namaste Ganapataye...".',
    shubhMuhurat: 'Madhyahna Ganesha Sthapana Muhurat: 11:08 AM to 01:38 PM',
    regions: ['Maharashtra', 'Goa', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Gujarat']
  },
  {
    id: 'sharad-navratri-2027',
    slug: 'sharad-navratri-2027',
    name: 'Sharad Navratri (Day 1 - Ghatasthapana)',
    nameHi: 'शारदीय नवरात्रि',
    nameRegional: {
      mr: 'नवरात्रोत्सव',
      gu: 'ગરબા / નવરાત્રી',
      bn: 'শারদীয়া দুর্গোৎসব',
      te: 'దేవి నవరాత్రులు'
    },
    date2027: '2027-10-01',
    dayOfWeek2027: 'Friday',
    category: 'Major',
    deity: 'Navadurga (Maa Durga)',
    tithiText: 'Ashvina Shukla Pratipada',
    hinduMonth: 'Ashvina',
    summary: 'The supreme nine-night celebration of the Divine Feminine (Shakti), honoring the nine cosmic forms of Maa Durga fighting and vanquishing the buffalo-demon Mahishasura.',
    significance: 'Celebrated through nine days with strict fasting, devotional Durga Saptashati recitations, vibrant Garba and Dandiya folk dances in Gujarat and Maharashtra, and grand artistic Durga Puja celebrations across Bengal, Assam, and Odisha.',
    rituals: [
      'Ghatasthapana and lighting of the sacred Akhand Jyoti',
      'Daily worship of each Navadurga avatar (Shailaputri to Siddhidatri)',
      'Sowing of Jau (barley sprouts) symbolizing agricultural abundance and divine blessing',
      'Evening community Garba-Dandiya dances invoking Amba Mata',
      'Kanya Pujan on Ashtami and Navami'
    ],
    pujaVidhi: 'Install sacred Kalash filled with holy water, betel nuts, and coins, topped with five mango leaves and a coconut wrapped in red chunri.',
    shubhMuhurat: 'Ghatasthapana Muhurat: 06:18 AM to 10:24 AM',
    regions: ['Pan-India', 'Gujarat', 'West Bengal', 'Maharashtra', 'North India', 'Karnataka']
  },
  {
    id: 'dussehra-2027',
    slug: 'dussehra-vijayadashami-2027',
    name: 'Dussehra (Vijayadashami)',
    nameHi: 'दशहरा / विजयादशमी',
    nameRegional: {
      mr: 'दसरा',
      bn: 'বিজয়া দশমী',
      kn: 'ಮೈಸೂರು ದಸರಾ',
      te: 'విజయదశమి'
    },
    date2027: '2027-10-10',
    dayOfWeek2027: 'Sunday',
    category: 'Major',
    deity: 'Bhagwan Rama & Maa Durga',
    tithiText: 'Ashvina Shukla Dashami',
    hinduMonth: 'Ashvina',
    summary: 'The day of ultimate triumph of virtue over vice. Celebrates Lord Rama vanquishing Ravana in Lanka and Maa Durga slaying Mahishasura after ten days of combat.',
    significance: 'Recognized as an auspicious moment for Shastra Puja (worship of weapons, tools, books, and vehicles), Simholanghan (crossing boundaries for conquest), Mysore Dasara royal procession, and exchanging Apta tree leaves (representing gold) in Maharashtra.',
    rituals: [
      'Burning towering effigies of Ravana, Kumbhakarna, and Meghnada at dusk',
      'Shastra Puja and Vahan (vehicle) Puja with vermilion and marigold garlands',
      'Exchanging Apta tree leaves (Son-Patta) wishing prosperity and health',
      'Sindoor Khela in Bengal following Durga Pratima Visarjan'
    ],
    pujaVidhi: 'Worship the sacred Shami tree chanting: "Shamī shamayate pāpaṁ shamī shatruvināshinī". Perform Aarti for household tools, books, and transport.',
    shubhMuhurat: 'Vijay Muhurat: 02:05 PM to 02:52 PM | Aparahna Puja: 01:18 PM to 03:39 PM',
    regions: ['Pan-India', 'Karnataka (Mysuru)', 'Maharashtra', 'Bengal', 'Himachal (Kullu)', 'Delhi']
  },
  {
    id: 'karwa-chauth-2027',
    slug: 'karwa-chauth-2027',
    name: 'Karwa Chauth',
    nameHi: 'करवा चौथ',
    nameRegional: {
      mr: 'करवा चौथ',
      pa: 'ਕਰਵਾ ਚੌਥ'
    },
    date2027: '2027-10-19',
    dayOfWeek2027: 'Tuesday',
    category: 'Vrat',
    deity: 'Maa Karwa, Shiva-Parvati, Ganesha, Chandra Dev',
    tithiText: 'Kartika Krishna Chaturthi',
    hinduMonth: 'Kartika (Ashvina in Amavasyant)',
    summary: 'The sacred fast observed by married women from sunrise until moonrise for the longevity, health, and prosperity of their husbands.',
    significance: 'Women observe Nirjala fast (without drinking even water), apply intricate henna mehendi, dress in bridal red, listen to the Karwa Chauth Vrat Katha, and break the fast only after offering Arghya to the rising Moon through a sieve (Chhalni).',
    rituals: [
      'Pre-dawn meal of Sargi given by the mother-in-law before sunrise',
      'Observing strict Nirjala fasting through the day',
      'Evening Vrat Katha narrated in a gathering of women passing the Karwa clay pots',
      'Viewing the Moon through a sieve, offering water to Chandra Dev, and taking water from the husband\'s hand'
    ],
    pujaVidhi: 'Draw or install Karwa Chauth image, prepare sweet wheat flour or mawa sweets, offer 13 grains of wheat to Maa Gauri while listening to the story.',
    shubhMuhurat: 'Puja Muhurat: 05:48 PM to 07:04 PM | Moonrise: 08:15 PM',
    regions: ['North India', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Delhi']
  },
  {
    id: 'diwali-2027',
    slug: 'diwali-deepavali-2027',
    name: 'Diwali (Deepavali & Lakshmi Puja)',
    nameHi: 'दिवाली / दीपावली',
    nameRegional: {
      mr: 'दिवाळी / लक्ष्मीपूजन',
      gu: 'દિવાળી',
      te: 'దీపావళి',
      ta: 'தீபாவளி',
      bn: 'দীপাবলি / কালী পূজা'
    },
    date2027: '2027-11-08',
    dayOfWeek2027: 'Monday',
    category: 'Major',
    deity: 'Maa Lakshmi & Bhagwan Ganesha',
    tithiText: 'Kartika Krishna Amavasya',
    hinduMonth: 'Kartika',
    summary: 'The pinnacle of Hindu festivals—the Festival of Lights—celebrating the return of Lord Rama to Ayodhya after 14 years in exile and the emergence of Goddess Lakshmi during the Samudra Manthan.',
    significance: 'Illuminates darkness with rows of clay diyas, signifies inner spiritual awakening, clean homes, business account book blessings (Chopda Pujan), gift exchanges, and invocations of prosperity and auspiciousness.',
    rituals: [
      'Early morning Abhyanga Snan (fragrant oil bath) in Maharashtra and South India',
      'Drawing radiant Rangoli and lighting clay oil lamps (Diyas) at dusk',
      'Pradosh Kaal Lakshmi-Ganesha Puja with gold/silver coins, lotus flowers, and batasha',
      'Kali Puja observed at midnight in West Bengal, Assam, and Odisha',
      'Chopda Pujan and opening of new account ledgers for the New Year'
    ],
    pujaVidhi: 'Clean the puja altar, lay a red silk cloth, place idols of Lakshmi and Ganesha. Offer Kheer, lotus flowers, coriander seeds (Dhana), and jaggery while reciting Sri Suktam.',
    shubhMuhurat: 'Lakshmi Puja Muhurat (Pradosh Kaal): 05:38 PM to 07:34 PM | Vrishabha Lagna: 05:42 PM to 07:38 PM',
    regions: ['Pan-India', 'Global Indian Diaspora']
  },
  {
    id: 'chhath-puja-2027',
    slug: 'chhath-puja-2027',
    name: 'Chhath Puja (Surya Shashthi)',
    nameHi: 'छठ पूजा',
    nameRegional: {
      hi: 'छठ मइया पूजा'
    },
    date2027: '2027-11-14',
    dayOfWeek2027: 'Sunday',
    category: 'Major',
    deity: 'Surya Dev & Chhathi Maiya',
    tithiText: 'Kartika Shukla Shashthi',
    hinduMonth: 'Kartika',
    summary: 'The supreme Vedic solar festival observed over four rigorous days with unmatched purity, offering Arghya to the setting and rising Sun at holy riverbanks.',
    significance: 'Celebrates the Sun as the visible source of life on Earth and honors Chhathi Maiya (Usha and Pratyusha). Famous for its austere 36-hour waterless fast and the iconic, wholesome Thekua prasad prepared in pure desi ghee.',
    rituals: [
      'Day 1 (Nahay Khay): Holy bath and pure sattvic meal of pumpkin and bottle gourd',
      'Day 2 (Kharna): Fasting followed by evening kheer and roti prasad made on earthen stove',
      'Day 3 (Sandhya Arghya): Standing in knee-deep river water offering bamboo winnow (Soop) Arghya to the setting Sun',
      'Day 4 (Usha Arghya): Offering morning Arghya to the rising Sun and breaking the fast'
    ],
    pujaVidhi: 'Offer water and milk to the Sun with sugarcane, seasonal fruits, coconut, and freshly prepared Thekua while singing devotional Chhath geet.',
    shubhMuhurat: 'Sunset Arghya (Nov 13): 05:28 PM | Sunrise Arghya (Nov 14): 06:44 AM',
    regions: ['Bihar', 'Jharkhand', 'Eastern Uttar Pradesh', 'Nepal', 'Delhi', 'Mumbai']
  }
];

export const EKADASHI_2027: EkadashiEvent[] = [
  {
    id: 'pausha-putrada-ekadashi-2027',
    slug: 'pausha-putrada-ekadashi-2027',
    name: 'Pausha Putrada Ekadashi',
    date2027: '2027-01-18',
    dayOfWeek2027: 'Monday',
    paksha: 'Shukla',
    hinduMonth: 'Pausha',
    paranaTime: '07:15 AM to 09:22 AM (Jan 19)',
    significance: 'Bestows the blessing of virtuous offspring, inner peace, and relief from karmic ancestral burdens.',
    storySummary: 'King Suketuman of Bhadravati had no heir and meditated deeply. By the grace of Vishvedevas on this Ekadashi, he was blessed with an exemplary, noble son.'
  },
  {
    id: 'shattila-ekadashi-2027',
    slug: 'shattila-ekadashi-2027',
    name: 'Shattila Ekadashi',
    date2027: '2027-02-02',
    dayOfWeek2027: 'Tuesday',
    paksha: 'Krishna',
    hinduMonth: 'Magha',
    paranaTime: '07:09 AM to 09:18 AM (Feb 03)',
    significance: 'Involves six specific uses of sesame (Til) seeds: bath, paste, libation, food, charity, and havan to cleanse accumulated transgressions.',
    storySummary: 'Bhagwan Vishnu demonstrated that while penance is sacred, donating food and sesame creates enduring eternal abundance in the spiritual realm.'
  },
  {
    id: 'jaya-ekadashi-2027',
    slug: 'jaya-ekadashi-2027',
    name: 'Jaya Ekadashi',
    date2027: '2027-02-17',
    dayOfWeek2027: 'Wednesday',
    paksha: 'Shukla',
    hinduMonth: 'Magha',
    paranaTime: '07:01 AM to 09:12 AM (Feb 18)',
    significance: 'Liberates the soul from lower ghostly species and bestows victory (Jaya) over inner doubts and attachments.',
    storySummary: 'A Gandharva named Malyavan was cursed to become a Pisacha. By observing this holy fast unknowingly in penance, he was restored to divine beauty and heavenly status.'
  },
  {
    id: 'vijaya-ekadashi-2027',
    slug: 'vijaya-ekadashi-2027',
    name: 'Vijaya Ekadashi',
    date2027: '2027-03-04',
    dayOfWeek2027: 'Thursday',
    paksha: 'Krishna',
    hinduMonth: 'Phalguna',
    paranaTime: '06:48 AM to 09:04 AM (Mar 05)',
    significance: 'Guarantees victory in righteous undertakings, competitive examinations, and difficult spiritual endeavors.',
    storySummary: 'Lord Rama observed this fast on the advice of Sage Bakadalbhya before building the bridge across the ocean to Lanka to secure triumphant victory over Ravana.'
  },
  {
    id: 'amalaki-ekadashi-2027',
    slug: 'amalaki-ekadashi-2027',
    name: 'Amalaki Ekadashi',
    date2027: '2027-03-19',
    dayOfWeek2027: 'Friday',
    paksha: 'Shukla',
    hinduMonth: 'Phalguna',
    paranaTime: '06:31 AM to 08:52 AM (Mar 20)',
    significance: 'Centers around the worship of the sacred Indian Gooseberry (Amla) tree, in which Lord Vishnu and Lakshmi reside.',
    storySummary: 'King Chaitraratha and all his subjects worshipped the Amla tree with night-long vigil, granting spiritual salvation even to a hunter sheltering beneath its branches.'
  },
  {
    id: 'papmochani-ekadashi-2027',
    slug: 'papmochani-ekadashi-2027',
    name: 'Papmochani Ekadashi',
    date2027: '2027-04-03',
    dayOfWeek2027: 'Saturday',
    paksha: 'Krishna',
    hinduMonth: 'Chaitra',
    paranaTime: '06:14 AM to 08:38 AM (Apr 04)',
    significance: 'Cleanses the devotee from the darkest karmic debts and sins, inaugurating spiritual renewal before the Hindu New Year.',
    storySummary: 'Sage Medhavi was tempted by the Apsara Manjughosha. When awakened to spiritual truth, both observed Papmochani Ekadashi and achieved divine release.'
  },
  {
    id: 'nirjala-ekadashi-2027',
    slug: 'nirjala-ekadashi-2027',
    name: 'Nirjala Ekadashi (Bhima Ekadashi)',
    date2027: '2027-06-15',
    dayOfWeek2027: 'Tuesday',
    paksha: 'Shukla',
    hinduMonth: 'Jyeshtha',
    paranaTime: '05:23 AM to 08:11 AM (Jun 16)',
    significance: 'The most austere of all 24 Ekadashis, observed without drinking a single drop of water for 24 hours. Bestows the spiritual fruit of having observed all 24 Ekadashis of the year.',
    storySummary: 'Bhima, unable to withstand hunger on other Ekadashis, asked Maharishi Ved Vyasa for one single fast capable of granting full liberation. Vyasa prescribed the waterless Nirjala Ekadashi.'
  },
  {
    id: 'devshayani-ekadashi-2027',
    slug: 'devshayani-ekadashi-2027',
    name: 'Devshayani Ekadashi (Ashadhi Ekadashi)',
    date2027: '2027-07-15',
    dayOfWeek2027: 'Thursday',
    paksha: 'Shukla',
    hinduMonth: 'Ashadha',
    paranaTime: '05:35 AM to 08:20 AM (Jul 16)',
    significance: 'Marks the onset of Chaturmas (four sacred months) during which Lord Vishnu enters cosmic yogic slumber on Shesha Naga. Culmination of the great Pandharpur Wari pilgrimage in Maharashtra.',
    storySummary: 'Millions of Varkaris walk hundreds of kilometers singing abhangas of Sant Tukaram and Dnyaneshwar to gather at the feet of Lord Vitthal in Pandharpur.'
  },
  {
    id: 'devutthana-ekadashi-2027',
    slug: 'devutthana-ekadashi-2027',
    name: 'Devutthana Ekadashi (Prabodhini Ekadashi)',
    date2027: '2027-11-10',
    dayOfWeek2027: 'Wednesday',
    paksha: 'Shukla',
    hinduMonth: 'Kartika',
    paranaTime: '06:42 AM to 08:51 AM (Nov 11)',
    significance: 'Lord Vishnu awakens from his four-month yogic slumber. Concludes Chaturmas and inaugurates the auspicious Hindu wedding season alongside the holy Tulsi Vivah.',
    storySummary: 'Goddess Tulsi (Vrinda) is ceremoniously wedded to Shaligram (Lord Vishnu) with sugarcane mandaps, lamps, and joyous wedding chants.'
  },
  {
    id: 'mokshada-ekadashi-2027',
    slug: 'mokshada-ekadashi-2027',
    name: 'Mokshada Ekadashi (Gita Jayanti)',
    date2027: '2027-12-09',
    dayOfWeek2027: 'Thursday',
    paksha: 'Shukla',
    hinduMonth: 'Margashirsha',
    paranaTime: '07:04 AM to 09:12 AM (Dec 10)',
    significance: 'Commemorates the historic day Bhagwan Krishna bestowed the Srimad Bhagavad Gita to Arjuna at Kurukshetra. Fasting frees ancestors from hellish realms directly into Vaikuntha.',
    storySummary: 'King Vaikhanasa saw his father suffering in the netherworld. Following Sage Parvata\'s advice, he observed Mokshada Ekadashi, instantly releasing his father to heavenly liberation.'
  }
];

export const PURNIMA_2027: PurnimaEvent[] = [
  { id: 'purnima-jan-2027', name: 'Pausha Purnima (Shakambhari Purnima)', date2027: '2027-01-22', dayOfWeek2027: 'Friday', hinduMonth: 'Pausha', tithiStart: 'Jan 21, 09:40 PM', tithiEnd: 'Jan 22, 07:15 PM', moonriseTime: '05:32 PM', significance: 'Marks the conclusion of Shakambhari Navratri and the beginning of the holy Magha Snana month on sacred sangams.', vratDetails: 'Satyanarayan Katha in evening and holy dip at Triveni Sangam Prayagraj.' },
  { id: 'purnima-feb-2027', name: 'Magha Purnima (Maha Maghi)', date2027: '2027-02-21', dayOfWeek2027: 'Sunday', hinduMonth: 'Magha', tithiStart: 'Feb 20, 01:15 PM', tithiEnd: 'Feb 21, 11:20 AM', moonriseTime: '06:12 PM', significance: 'Deities descend to the earth in subtle form to bathe in holy waters. Ideal for Til and blanket charity.', vratDetails: 'Bathing in sacred rivers before sunrise, giving charity of food and warm clothes.' },
  { id: 'purnima-mar-2027', name: 'Phalguna Purnima (Holika Dahan)', date2027: '2027-03-22', dayOfWeek2027: 'Monday', hinduMonth: 'Phalguna', tithiStart: 'Mar 21, 04:32 PM', tithiEnd: 'Mar 22, 02:40 PM', moonriseTime: '06:34 PM', significance: 'Auspicious bonfire of Holika Dahan destroying evil tendencies, Lakshmi Jayanti, and Chaitanya Mahaprabhu appearance day.', vratDetails: 'Fast until Holika bonfire is lit and Pradosh puja is conducted.' },
  { id: 'purnima-apr-2027', name: 'Chaitra Purnima (Hanuman Jayanti)', date2027: '2027-04-21', dayOfWeek2027: 'Wednesday', hinduMonth: 'Chaitra', tithiStart: 'Apr 20, 07:45 AM', tithiEnd: 'Apr 21, 05:58 AM', moonriseTime: '06:55 PM', significance: 'Celebrates the birth of Lord Hanuman, the epitome of selfless devotion, strength, and humility.', vratDetails: 'Reciting Hanuman Chalisa 108 times, offering vermilion and Jasmine oil.' },
  { id: 'purnima-may-2027', name: 'Vaishakha Purnima (Buddha Purnima)', date2027: '2027-05-20', dayOfWeek2027: 'Thursday', hinduMonth: 'Vaishakha', tithiStart: 'May 19, 10:12 PM', tithiEnd: 'May 20, 08:35 PM', moonriseTime: '07:22 PM', significance: 'Birth, enlightenment, and Mahaparinirvana of Gautama Buddha. Also observed as Kurma Jayanti.', vratDetails: 'Observing Ahimsa, meditating, and serving water to parched travelers.' },
  { id: 'purnima-jun-2027', name: 'Jyeshtha Purnima (Vat Purnima)', date2027: '2027-06-19', dayOfWeek2027: 'Saturday', hinduMonth: 'Jyeshtha', tithiStart: 'Jun 18, 11:40 AM', tithiEnd: 'Jun 19, 10:15 AM', moonriseTime: '07:48 PM', significance: 'Married women worship the sacred Banyan tree for their husbands\' health, mirroring Savitri reclaiming Satyavan from Yamaraj.', vratDetails: 'Wrapping white cotton thread around the Banyan tree 108 times.' },
  { id: 'purnima-jul-2027', name: 'Ashadha Purnima (Guru Purnima)', date2027: '2027-07-18', dayOfWeek2027: 'Sunday', hinduMonth: 'Ashadha', tithiStart: 'Jul 17, 11:58 PM', tithiEnd: 'Jul 18, 10:42 PM', moonriseTime: '07:54 PM', significance: 'Dedicated to paying homage to spiritual Gurus and Maharishi Ved Vyasa, compiler of the Vedas.', vratDetails: 'Pada Puja of Guru, reciting Guru Gita, and recommitting to spiritual vows.' },
  { id: 'purnima-aug-2027', name: 'Shravana Purnima (Rakhi & Narali)', date2027: '2027-08-17', dayOfWeek2027: 'Tuesday', hinduMonth: 'Shravana', tithiStart: 'Aug 16, 11:15 AM', tithiEnd: 'Aug 17, 09:55 AM', moonriseTime: '07:38 PM', significance: 'Raksha Bandhan and changing of the sacred Yagnopavita thread during Upakarma.', vratDetails: 'Gayatri Japa and offering prayers to Lord Varuna with coconuts.' },
  { id: 'purnima-sep-2027', name: 'Bhadrapada Purnima (Shraddha Begins)', date2027: '2027-09-15', dayOfWeek2027: 'Wednesday', hinduMonth: 'Bhadrapada', tithiStart: 'Sep 14, 09:30 PM', tithiEnd: 'Sep 15, 08:12 PM', moonriseTime: '07:05 PM', significance: 'Inaugurates the holy 16-day Pitru Paksha period dedicated to ancestral homage and tarpan.', vratDetails: 'Offering water and black sesame (Kala Til) libations for departed ancestors.' },
  { id: 'purnima-oct-2027', name: 'Ashvina Purnima (Sharad Purnima)', date2027: '2027-10-15', dayOfWeek2027: 'Friday', hinduMonth: 'Ashvina', tithiStart: 'Oct 14, 07:10 AM', tithiEnd: 'Oct 15, 05:45 AM', moonriseTime: '06:22 PM', significance: 'The Moon shines with all 16 divine digits (Kalas). Amrit rains from moonbeams into Kheer bowls kept overnight.', vratDetails: 'Preparing rice kheer, leaving it under full moonlight, and performing Kojagari Lakshmi Puja.' },
  { id: 'purnima-nov-2027', name: 'Kartika Purnima (Dev Diwali)', date2027: '2027-11-13', dayOfWeek2027: 'Saturday', hinduMonth: 'Kartika', tithiStart: 'Nov 12, 04:25 PM', tithiEnd: 'Nov 13, 03:00 PM', moonriseTime: '05:40 PM', significance: 'Celebrates Lord Shiva vanquishing Tripurasura. The ghats of Varanasi shine with millions of diyas.', vratDetails: 'Deep Daan at rivers, sacred dip, and Matsya Avatar Jayanti worship.' },
  { id: 'purnima-dec-2027', name: 'Margashirsha Purnima (Dattatreya Jayanti)', date2027: '2027-12-13', dayOfWeek2027: 'Monday', hinduMonth: 'Margashirsha', tithiStart: 'Dec 12, 01:20 AM', tithiEnd: 'Dec 12, 11:45 PM', moonriseTime: '05:30 PM', significance: 'Appearance day of Lord Dattatreya, embodiment of the divine Trimurti (Brahma, Vishnu, Mahesh).', vratDetails: 'Chanting "Digambara Digambara Shripada Vallabha Digambara" and reading Guru Charitra.' }
];

export const AMAVASYA_2027: AmavasyaEvent[] = [
  { id: 'amavasya-jan-2027', name: 'Pausha Amavasya', date2027: '2027-01-08', dayOfWeek2027: 'Friday', hinduMonth: 'Pausha', tithiStart: 'Jan 07, 08:12 PM', tithiEnd: 'Jan 08, 06:40 PM', significance: 'Bestows peace upon departed ancestors through Pind Daan and tarpana rituals.', tarpanRules: 'Perform tarpan facing South during Kutup and Rohina Muhurat using copper vessel, kusha grass, and sesame.' },
  { id: 'amavasya-feb-2027', name: 'Magha Amavasya (Mauni Amavasya)', date2027: '2027-02-06', dayOfWeek2027: 'Saturday', hinduMonth: 'Magha', tithiStart: 'Feb 05, 11:35 AM', tithiEnd: 'Feb 06, 09:48 AM', significance: 'The king of Amavasyas. Devotees observe complete silence (Mauna Vrata) and bathe at the Triveni Sangam in Prayagraj.', tarpanRules: 'Strict silence observed until the holy bath and ancestral tarpan is concluded.' },
  { id: 'amavasya-mar-2027', name: 'Phalguna Amavasya', date2027: '2027-03-08', dayOfWeek2027: 'Monday', hinduMonth: 'Phalguna', tithiStart: 'Mar 07, 02:40 AM', tithiEnd: 'Mar 08, 12:45 AM', significance: 'Somvati Amavasya occurring on Monday. Walking 108 rounds around the Peepal tree brings relief from Pitru Dosha.', tarpanRules: 'Watering the Peepal tree, tying raw cotton thread, and feeding crows, cows, and fish.' },
  { id: 'amavasya-apr-2027', name: 'Chaitra Amavasya', date2027: '2027-04-06', dayOfWeek2027: 'Tuesday', hinduMonth: 'Chaitra', tithiStart: 'Apr 05, 04:55 PM', tithiEnd: 'Apr 06, 03:02 PM', significance: 'Final day before the Hindu New Year. Removes negativity and resolves pending ancestral rituals.', tarpanRules: 'Charity of earthen pots, flour, and mustard oil.' },
  { id: 'amavasya-may-2027', name: 'Vaishakha Amavasya (Shani Jayanti & Vat Savitri)', date2027: '2027-05-06', dayOfWeek2027: 'Thursday', hinduMonth: 'Vaishakha', tithiStart: 'May 05, 06:10 AM', tithiEnd: 'May 06, 04:22 AM', significance: 'Appearance day of Lord Shani Dev and Vat Savitri Vrat in Gujarat and North India.', tarpanRules: 'Offer mustard oil, black sesame, and blue flowers to Shani Dev to mitigate Sade Sati.' },
  { id: 'amavasya-jun-2027', name: 'Jyeshtha Amavasya', date2027: '2027-06-04', dayOfWeek2027: 'Friday', hinduMonth: 'Jyeshtha', tithiStart: 'Jun 03, 06:15 PM', tithiEnd: 'Jun 04, 04:30 PM', significance: 'Excellent day to donate water and provide shade to travelers during scorching summer.', tarpanRules: 'Feed hungry souls and perform Jal Daan.' },
  { id: 'amavasya-jul-2027', name: 'Ashadha Amavasya (Deepa Amavasya / Gatari)', date2027: '2027-07-04', dayOfWeek2027: 'Sunday', hinduMonth: 'Ashadha', tithiStart: 'Jul 03, 05:22 AM', tithiEnd: 'Jul 04, 03:45 AM', significance: 'Worship of household lamps (Diyas) in Maharashtra; welcoming the auspicious holy month of Shravana.', tarpanRules: 'Clean and illuminate brass lamps with sesame oil.' },
  { id: 'amavasya-aug-2027', name: 'Shravana Amavasya (Hariyali Amavasya / Pithori)', date2027: '2027-08-02', dayOfWeek2027: 'Monday', hinduMonth: 'Shravana', tithiStart: 'Aug 01, 03:40 PM', tithiEnd: 'Aug 02, 02:15 PM', significance: 'Somvati Amavasya celebrating monsoon greenery. Farmers worship oxen (Pola festival) in Maharashtra.', tarpanRules: 'Planting sacred saplings (Peepal, Banyan, Neem, Amla) for generational merits.' },
  { id: 'amavasya-aug-end-2027', name: 'Bhadrapada Amavasya (Kushagrahani Amavasya)', date2027: '2027-08-31', dayOfWeek2027: 'Tuesday', hinduMonth: 'Bhadrapada', tithiStart: 'Aug 30, 01:25 AM', tithiEnd: 'Aug 30, 11:58 PM', significance: 'Harvesting wild Kusha grass used in all Vedic rituals throughout the year.', tarpanRules: 'Gather fresh kusha with right hand chanting "Hum Phat".' },
  { id: 'amavasya-sep-2027', name: 'Sarva Pitru Amavasya (Mahalaya Amavasya)', date2027: '2027-09-30', dayOfWeek2027: 'Thursday', hinduMonth: 'Ashvina (Bhadrapada in Amavasyant)', tithiStart: 'Sep 29, 11:15 AM', tithiEnd: 'Sep 30, 09:48 AM', significance: 'The ultimate climax of Pitru Paksha. Shraddha performed on this day satisfies all ancestors whose death tithi is unknown.', tarpanRules: 'Offer Pind Daan with rice balls, honey, and sesame; feed five beings: cow, dog, crow, ants, and a guest.' },
  { id: 'amavasya-nov-2027', name: 'Kartika Amavasya (Diwali & Lakshmi Puja)', date2027: '2027-10-29', dayOfWeek2027: 'Friday', hinduMonth: 'Kartika', tithiStart: 'Oct 28, 09:12 PM', tithiEnd: 'Oct 29, 07:45 PM', significance: 'Supreme illumination of lights, arrival of Maa Lakshmi and Lord Ganesha.', tarpanRules: 'Light ancestral Yama Deepam facing South to illuminate ancestors\' return path.' },
  { id: 'amavasya-nov-end-2027', name: 'Margashirsha Amavasya', date2027: '2027-11-28', dayOfWeek2027: 'Sunday', hinduMonth: 'Margashirsha', tithiStart: 'Nov 27, 07:20 AM', tithiEnd: 'Nov 28, 05:55 AM', significance: 'Beloved month of Bhagwan Krishna. Removes chronic illnesses through sun prayer.', tarpanRules: 'Offer Arghya to Surya Dev with red sandalwood paste.' },
  { id: 'amavasya-dec-2027', name: 'Pausha Amavasya', date2027: '2027-12-28', dayOfWeek2027: 'Tuesday', hinduMonth: 'Pausha', tithiStart: 'Dec 27, 05:40 PM', tithiEnd: 'Dec 28, 04:15 PM', significance: 'Winter ancestral tarpana and charity of woolen garments.', tarpanRules: 'Feed cows with green fodder and donate sesame laddoos.' }
];

export const MUHURATS_2027: MuhuratCategory[] = [
  {
    id: 'marriage',
    slug: 'marriage-muhurat-2027',
    title: 'Marriage Muhurat 2027 (Shubh Vivah Dates)',
    subtitle: 'Auspicious Vedic Wedding Dates & Timings for 2027',
    description: 'Calculated using Guru and Shukra Tara Udaya, avoiding combust periods (Tara Astha), Kharmas, and Chaturmas. The prime auspicious months in 2027 are January, February, April, May, June, November, and December.',
    dates2027: [
      { date: '2027-01-18', dayOfWeek: 'Monday', tithi: 'Shukla Dashami', nakshatra: 'Rohini', timeWindow: '07:15 AM to 02:40 PM', auspiciousScore: '98%' },
      { date: '2027-01-23', dayOfWeek: 'Saturday', tithi: 'Krishna Pratipada', nakshatra: 'Magha', timeWindow: '08:30 PM to 06:12 AM (Overnight)', auspiciousScore: '95%' },
      { date: '2027-02-08', dayOfWeek: 'Monday', tithi: 'Shukla Dwitiya', nakshatra: 'Uttara Phalguni', timeWindow: '03:15 PM to 11:20 PM', auspiciousScore: '96%' },
      { date: '2027-02-14', dayOfWeek: 'Sunday', tithi: 'Shukla Saptami', nakshatra: 'Rohini', timeWindow: '07:05 AM to 05:40 PM', auspiciousScore: '99%' },
      { date: '2027-04-18', dayOfWeek: 'Sunday', tithi: 'Shukla Ekadashi', nakshatra: 'Uttara Phalguni', timeWindow: '06:10 AM to 01:25 PM', auspiciousScore: '97%' },
      { date: '2027-04-26', dayOfWeek: 'Monday', tithi: 'Krishna Panchami', nakshatra: 'Mula', timeWindow: '07:30 PM to 05:55 AM (Overnight)', auspiciousScore: '94%' },
      { date: '2027-05-12', dayOfWeek: 'Wednesday', tithi: 'Shukla Saptami', nakshatra: 'Pushya', timeWindow: '05:38 AM to 03:15 PM', auspiciousScore: '98%' },
      { date: '2027-05-24', dayOfWeek: 'Monday', tithi: 'Krishna Chaturthi', nakshatra: 'Uttara Ashadha', timeWindow: '08:45 AM to 04:30 PM', auspiciousScore: '95%' },
      { date: '2027-06-08', dayOfWeek: 'Tuesday', tithi: 'Shukla Chaturthi', nakshatra: 'Pushya', timeWindow: '05:25 AM to 02:10 PM', auspiciousScore: '96%' },
      { date: '2027-06-22', dayOfWeek: 'Tuesday', tithi: 'Krishna Tritiya', nakshatra: 'Shravana', timeWindow: '06:15 PM to 05:22 AM (Overnight)', auspiciousScore: '93%' },
      { date: '2027-11-21', dayOfWeek: 'Sunday', tithi: 'Krishna Ashtami', nakshatra: 'Magha', timeWindow: '06:45 AM to 04:15 PM', auspiciousScore: '98%' },
      { date: '2027-11-28', dayOfWeek: 'Sunday', tithi: 'Amavasya / Pratipada', nakshatra: 'Anuradha', timeWindow: '07:10 AM to 02:30 PM', auspiciousScore: '96%' },
      { date: '2027-12-06', dayOfWeek: 'Monday', tithi: 'Shukla Ashtami', nakshatra: 'Uttara Bhadrapada', timeWindow: '07:01 AM to 06:15 PM', auspiciousScore: '99%' },
      { date: '2027-12-11', dayOfWeek: 'Saturday', tithi: 'Shukla Trayodashi', nakshatra: 'Rohini', timeWindow: '01:40 PM to 09:50 PM', auspiciousScore: '97%' }
    ],
    rules: [
      'Ensure Jupiter (Guru) and Venus (Shukra) are not combust (Astha).',
      'Avoid periods during Solar and Lunar Eclipses.',
      'Check Ashta-Koota Guna Milan for bride and groom compatibility.',
      'Refrain from wedding rituals during Bhadra and Rahu Kaal.'
    ]
  },
  {
    id: 'griha-pravesh',
    slug: 'griha-pravesh-muhurat-2027',
    title: 'Griha Pravesh Muhurat 2027 (Housewarming Dates)',
    subtitle: 'Auspicious Timings for Entering a New Home in 2027',
    description: 'Vastu Shastra recommends entering a newly built or purchased home during Uttarayana, in auspicious tithis (Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, Trayodashi) and fixed lagna.',
    dates2027: [
      { date: '2027-01-25', dayOfWeek: 'Monday', tithi: 'Krishna Tritiya', nakshatra: 'Uttara Phalguni', timeWindow: '07:14 AM to 11:30 AM', auspiciousScore: '96%' },
      { date: '2027-02-12', dayOfWeek: 'Friday', tithi: 'Shukla Shashthi', nakshatra: 'Aswini', timeWindow: '07:04 AM to 12:15 PM', auspiciousScore: '97%' },
      { date: '2027-03-01', dayOfWeek: 'Monday', tithi: 'Krishna Ashtami', nakshatra: 'Anuradha', timeWindow: '06:51 AM to 10:45 AM', auspiciousScore: '94%' },
      { date: '2027-04-12', dayOfWeek: 'Monday', tithi: 'Shukla Shashthi', nakshatra: 'Mrigashirsha', timeWindow: '06:07 AM to 11:10 AM', auspiciousScore: '98%' },
      { date: '2027-05-10', dayOfWeek: 'Monday', tithi: 'Shukla Panchami', nakshatra: 'Punarvasu', timeWindow: '05:39 AM to 10:20 AM', auspiciousScore: '99%' },
      { date: '2027-06-14', dayOfWeek: 'Monday', tithi: 'Shukla Dashami', nakshatra: 'Chitra', timeWindow: '05:23 AM to 09:40 AM', auspiciousScore: '95%' },
      { date: '2027-11-15', dayOfWeek: 'Monday', tithi: 'Krishna Dwitiya', nakshatra: 'Rohini', timeWindow: '06:44 AM to 11:50 AM', auspiciousScore: '97%' },
      { date: '2027-12-08', dayOfWeek: 'Wednesday', tithi: 'Shukla Dashami', nakshatra: 'Revati', timeWindow: '07:02 AM to 12:20 PM', auspiciousScore: '98%' }
    ],
    rules: [
      'Boil milk in a new vessel until it overflows to the right, symbolizing overflowing prosperity.',
      'Carry a copper Kalash filled with Ganga water, mango leaves, and a coconut across the threshold with the right foot first.',
      'Perform Vastu Shanti and Navagraha Havan prior to sleeping in the house.'
    ]
  },
  {
    id: 'vehicle-purchase',
    slug: 'vehicle-purchase-muhurat-2027',
    title: 'Vehicle Purchase Muhurat 2027 (Vahan Kharid)',
    subtitle: 'Auspicious Days for Buying Cars, Bikes & Commercial Vehicles',
    description: 'Purchasing a vehicle under beneficial Choghadiya (Shubh, Labh, Amrit) and auspicious nakshatras protects against mechanical issues and travel mishaps.',
    dates2027: [
      { date: '2027-01-14', dayOfWeek: 'Thursday', tithi: 'Makar Sankranti', nakshatra: 'Uttara Bhadrapada', timeWindow: '07:15 AM to 01:30 PM', auspiciousScore: '98%' },
      { date: '2027-02-11', dayOfWeek: 'Thursday', tithi: 'Vasant Panchami', nakshatra: 'Revati', timeWindow: '07:05 AM to 02:45 PM', auspiciousScore: '99%' },
      { date: '2027-03-15', dayOfWeek: 'Monday', tithi: 'Shukla Saptami', nakshatra: 'Rohini', timeWindow: '06:36 AM to 12:10 PM', auspiciousScore: '95%' },
      { date: '2027-04-07', dayOfWeek: 'Wednesday', tithi: 'Gudi Padwa / Ugadi', nakshatra: 'Ashwini', timeWindow: '06:12 AM to 04:30 PM', auspiciousScore: '100%' },
      { date: '2027-05-09', dayOfWeek: 'Sunday', tithi: 'Akshaya Tritiya', nakshatra: 'Rohini', timeWindow: '05:42 AM to 06:15 PM', auspiciousScore: '100%' },
      { date: '2027-09-05', dayOfWeek: 'Sunday', tithi: 'Ganesh Chaturthi', nakshatra: 'Chitra', timeWindow: '11:08 AM to 03:40 PM', auspiciousScore: '99%' },
      { date: '2027-10-10', dayOfWeek: 'Sunday', tithi: 'Vijayadashami / Dussehra', nakshatra: 'Shravana', timeWindow: '06:22 AM to 05:15 PM', auspiciousScore: '100%' },
      { date: '2027-11-06', dayOfWeek: 'Saturday', tithi: 'Dhanteras', nakshatra: 'Hasta', timeWindow: '06:38 AM to 08:20 PM', auspiciousScore: '100%' }
    ],
    rules: [
      'Draw a Swastika with vermilion (sindoor) and ghee on the hood of the vehicle.',
      'Break a coconut in front of the vehicle and distribute the kernel as prasad.',
      'Place lemons beneath all tires before driving the vehicle home.'
    ]
  },
  {
    id: 'property-purchase',
    slug: 'property-purchase-muhurat-2027',
    title: 'Property & Land Purchase Muhurat 2027',
    subtitle: 'Auspicious Registry & Stamp Duty Dates in 2027',
    description: 'Ideal dates for signing land deeds, plot registry, flat booking, and structural foundation laying according to Vedic astrology.',
    dates2027: [
      { date: '2027-01-21', dayOfWeek: 'Thursday', tithi: 'Shukla Chaturdashi', nakshatra: 'Punarvasu', timeWindow: '08:15 AM to 01:10 PM', auspiciousScore: '96%' },
      { date: '2027-02-26', dayOfWeek: 'Friday', tithi: 'Krishna Panchami', nakshatra: 'Swati', timeWindow: '07:00 AM to 12:40 PM', auspiciousScore: '95%' },
      { date: '2027-04-15', dayOfWeek: 'Thursday', tithi: 'Shukla Ashtami', nakshatra: 'Pushya', timeWindow: '06:10 AM to 02:00 PM', auspiciousScore: '99%' },
      { date: '2027-05-21', dayOfWeek: 'Friday', tithi: 'Krishna Pratipada', nakshatra: 'Anuradha', timeWindow: '05:37 AM to 11:30 AM', auspiciousScore: '97%' },
      { date: '2027-08-20', dayOfWeek: 'Friday', tithi: 'Krishna Chaturthi', nakshatra: 'Uttara Bhadrapada', timeWindow: '05:55 AM to 01:15 PM', auspiciousScore: '96%' },
      { date: '2027-10-14', dayOfWeek: 'Thursday', tithi: 'Shukla Chaturdashi', nakshatra: 'Uttara Bhadrapada', timeWindow: '06:25 AM to 12:50 PM', auspiciousScore: '98%' },
      { date: '2027-11-26', dayOfWeek: 'Friday', tithi: 'Krishna Trayodashi', nakshatra: 'Swati', timeWindow: '06:55 AM to 01:30 PM', auspiciousScore: '97%' }
    ],
    rules: [
      'Select fixed signs (Taurus, Leo, Scorpio, Aquarius) for enduring asset stability.',
      'Avoid registering on Saturdays during Rahu Kaal or Vishti (Bhadra) Karana.'
    ]
  },
  {
    id: 'namkaran',
    slug: 'namkaran-muhurat-2027',
    title: 'Namkaran Muhurat 2027 (Naming Ceremony)',
    subtitle: 'Auspicious Days for Naming Newborns in 2027',
    description: 'Namkaran Sanskar is performed on the 11th, 12th, or 16th day after birth, or on an auspicious nakshatra day.',
    dates2027: [
      { date: '2027-01-19', dayOfWeek: 'Tuesday', tithi: 'Shukla Ekadashi', nakshatra: 'Mrigashirsha', timeWindow: '07:15 AM to 12:20 PM', auspiciousScore: '98%' },
      { date: '2027-02-15', dayOfWeek: 'Monday', tithi: 'Shukla Ashtami', nakshatra: 'Rohini', timeWindow: '07:03 AM to 11:45 AM', auspiciousScore: '97%' },
      { date: '2027-04-19', dayOfWeek: 'Monday', tithi: 'Shukla Trayodashi', nakshatra: 'Hasta', timeWindow: '06:08 AM to 01:15 PM', auspiciousScore: '99%' },
      { date: '2027-07-21', dayOfWeek: 'Wednesday', tithi: 'Krishna Tritiya', nakshatra: 'Dhanishta', timeWindow: '05:37 AM to 11:10 AM', auspiciousScore: '96%' },
      { date: '2027-10-18', dayOfWeek: 'Monday', tithi: 'Krishna Tritiya', nakshatra: 'Rohini', timeWindow: '06:27 AM to 12:35 PM', auspiciousScore: '98%' }
    ],
    rules: [
      'Determine the child\'s Janma Rashi and Janma Nakshatra syllable (Charan).',
      'Father or elder whispers the sacred name into the baby\'s right ear first.'
    ]
  },
  {
    id: 'business-opening',
    slug: 'business-opening-muhurat-2027',
    title: 'Business & Shop Opening Muhurat 2027',
    subtitle: 'Auspicious Timings for New Ventures, Startups & Stores',
    description: 'Starting a commercial venture during Labh, Shubh, or Amrit Choghadiya fosters financial expansion and enduring customer trust.',
    dates2027: [
      { date: '2027-01-14', dayOfWeek: 'Thursday', tithi: 'Makar Sankranti', nakshatra: 'Uttara Bhadrapada', timeWindow: '07:15 AM to 12:45 PM', auspiciousScore: '99%' },
      { date: '2027-04-07', dayOfWeek: 'Wednesday', tithi: 'Gudi Padwa / Ugadi', nakshatra: 'Ashwini', timeWindow: '06:12 AM to 11:30 AM', auspiciousScore: '100%' },
      { date: '2027-05-09', dayOfWeek: 'Sunday', tithi: 'Akshaya Tritiya', nakshatra: 'Rohini', timeWindow: '05:42 AM to 02:15 PM', auspiciousScore: '100%' },
      { date: '2027-10-10', dayOfWeek: 'Sunday', tithi: 'Dussehra', nakshatra: 'Shravana', timeWindow: '06:22 AM to 03:00 PM', auspiciousScore: '100%' },
      { date: '2027-11-06', dayOfWeek: 'Saturday', tithi: 'Dhanteras', nakshatra: 'Hasta', timeWindow: '06:38 AM to 04:20 PM', auspiciousScore: '100%' }
    ],
    rules: [
      'Place idols of Maa Lakshmi and Ganesha facing North or East.',
      'Perform Ganesha puja, break coconut at the doorway, and make the first sale to an elder or honored guest.'
    ]
  }
];

export const HOLIDAYS_2027: HolidayItem[] = [
  { id: 'h1', date: '2027-01-26', dayOfWeek: 'Tuesday', name: 'Republic Day', type: 'Central', applicableStates: ['ALL'], description: 'National holiday honoring the Constitution of India coming into effect in 1950.' },
  { id: 'h2', date: '2027-02-25', dayOfWeek: 'Thursday', name: 'Maha Shivratri', type: 'Central', applicableStates: ['ALL'], description: 'Gazetted holiday for Bhagwan Shiva celebration.' },
  { id: 'h3', date: '2027-03-22', dayOfWeek: 'Monday', name: 'Holi (Dhulandi)', type: 'Central', applicableStates: ['ALL'], description: 'Festival of colors across India.' },
  { id: 'h4', date: '2027-03-26', dayOfWeek: 'Friday', name: 'Good Friday', type: 'Central', applicableStates: ['ALL'], description: 'Christian observance commemorating the crucifixion of Jesus Christ.' },
  { id: 'h5', date: '2027-04-07', dayOfWeek: 'Wednesday', name: 'Gudi Padwa / Ugadi / Chaitra Sukladi', type: 'State', applicableStates: ['MH', 'KA', 'TS', 'AP', 'GA'], description: 'Regional New Year in Maharashtra, Karnataka, Telangana, Andhra Pradesh.' },
  { id: 'h6', date: '2027-04-14', dayOfWeek: 'Wednesday', name: 'Dr. B.R. Ambedkar Jayanti / Tamil New Year / Vishu', type: 'Central', applicableStates: ['ALL'], description: 'Birthday of Babasaheb Ambedkar, Puthandu in Tamil Nadu, Vishu in Kerala.' },
  { id: 'h7', date: '2027-04-16', dayOfWeek: 'Friday', name: 'Ram Navami', type: 'Central', applicableStates: ['ALL'], description: 'Birth anniversary of Maryada Purushottam Lord Rama.' },
  { id: 'h8', date: '2027-04-20', dayOfWeek: 'Tuesday', name: 'Mahavir Jayanti', type: 'Central', applicableStates: ['ALL'], description: 'Birth anniversary of Bhagwan Mahavira, the 24th Tirthankara of Jainism.' },
  { id: 'h9', date: '2027-05-01', dayOfWeek: 'Saturday', name: 'Maharashtra Day / May Day', type: 'State', applicableStates: ['MH', 'KL', 'WB', 'TN'], description: 'Formation of Maharashtra state and International Workers\' Day.' },
  { id: 'h10', date: '2027-05-20', dayOfWeek: 'Thursday', name: 'Buddha Purnima', type: 'Central', applicableStates: ['ALL'], description: 'Birth, enlightenment, and nirvana of Gautama Buddha.' },
  { id: 'h11', date: '2027-06-16', dayOfWeek: 'Wednesday', name: 'Eid al-Adha (Bakrid)', type: 'Central', applicableStates: ['ALL'], description: 'Islamic feast of sacrifice (subject to moon sighting).' },
  { id: 'h12', date: '2027-07-16', dayOfWeek: 'Friday', name: 'Muharram', type: 'Central', applicableStates: ['ALL'], description: 'First month of Islamic calendar; Day of Ashura.' },
  { id: 'h13', date: '2027-08-15', dayOfWeek: 'Sunday', name: 'Independence Day', type: 'Central', applicableStates: ['ALL'], description: 'Commemorates India\'s freedom from British colonial rule in 1947.' },
  { id: 'h14', date: '2027-08-25', dayOfWeek: 'Wednesday', name: 'Janmashtami (Vaishnava)', type: 'Central', applicableStates: ['ALL'], description: 'Celebration of Lord Krishna\'s divine appearance.' },
  { id: 'h15', date: '2027-09-05', dayOfWeek: 'Sunday', name: 'Ganesh Chaturthi', type: 'State', applicableStates: ['MH', 'GA', 'KA', 'TS', 'AP', 'GJ'], description: 'Grand celebration of Lord Ganesha in Maharashtra and southern states.' },
  { id: 'h16', date: '2027-10-02', dayOfWeek: 'Saturday', name: 'Mahatma Gandhi Jayanti', type: 'Central', applicableStates: ['ALL'], description: 'National holiday marking the birth of Mahatma Gandhi.' },
  { id: 'h17', date: '2027-10-08', dayOfWeek: 'Friday', name: 'Maha Saptami / Durga Puja', type: 'State', applicableStates: ['WB', 'AS', 'OD', 'TR'], description: 'Durga Puja Saptami holiday in Bengal, Assam, Odisha.' },
  { id: 'h18', date: '2027-10-10', dayOfWeek: 'Sunday', name: 'Dussehra (Vijayadashami)', type: 'Central', applicableStates: ['ALL'], description: 'Victory of Rama over Ravana and Durga over Mahishasura.' },
  { id: 'h19', date: '2027-11-08', dayOfWeek: 'Monday', name: 'Diwali (Deepavali)', type: 'Central', applicableStates: ['ALL'], description: 'Festival of lights and Lakshmi Puja across the nation.' },
  { id: 'h20', date: '2027-11-14', dayOfWeek: 'Sunday', name: 'Chhath Puja', type: 'State', applicableStates: ['BR', 'JH', 'UP', 'DL'], description: 'Surya Shashthi holiday in Bihar, Jharkhand, and UP.' },
  { id: 'h21', date: '2027-11-23', dayOfWeek: 'Tuesday', name: 'Guru Nanak Jayanti (Gurpurab)', type: 'Central', applicableStates: ['ALL'], description: 'Birth anniversary of Guru Nanak Dev Ji, founder of Sikhism.' },
  { id: 'h22', date: '2027-12-25', dayOfWeek: 'Saturday', name: 'Christmas Day', type: 'Central', applicableStates: ['ALL'], description: 'Christian celebration of the birth of Jesus Christ.' }
];

export const BANK_HOLIDAYS_2027: BankHolidayItem[] = [
  { id: 'bh1', date: '2027-01-01', dayOfWeek: 'Friday', name: 'New Year\'s Day', states: ['MH', 'WB', 'TN', 'KA', 'DL', 'GJ'], category: 'Negotiable Instruments Act' },
  { id: 'bh2', date: '2027-01-26', dayOfWeek: 'Tuesday', name: 'Republic Day', states: ['ALL'], category: 'Negotiable Instruments Act' },
  { id: 'bh3', date: '2027-02-25', dayOfWeek: 'Thursday', name: 'Maha Shivratri', states: ['MH', 'GJ', 'UP', 'DL', 'KA', 'TS', 'AP'], category: 'Negotiable Instruments Act' },
  { id: 'bh4', date: '2027-03-22', dayOfWeek: 'Monday', name: 'Holi / Dhulandi', states: ['MH', 'GJ', 'UP', 'DL', 'WB', 'BR', 'RJ'], category: 'Negotiable Instruments Act' },
  { id: 'bh5', date: '2027-04-01', dayOfWeek: 'Thursday', name: 'Annual Closing of Bank Accounts', states: ['ALL'], category: 'Banks Closing Accounts' },
  { id: 'bh6', date: '2027-04-07', dayOfWeek: 'Wednesday', name: 'Gudi Padwa / Ugadi', states: ['MH', 'KA', 'TS', 'AP', 'GA'], category: 'Negotiable Instruments Act' },
  { id: 'bh7', date: '2027-04-14', dayOfWeek: 'Wednesday', name: 'Dr. Ambedkar Jayanti / Tamil New Year', states: ['ALL'], category: 'Negotiable Instruments Act' },
  { id: 'bh8', date: '2027-05-01', dayOfWeek: 'Saturday', name: 'Maharashtra Day / May Day', states: ['MH', 'KL', 'WB', 'TN'], category: 'Negotiable Instruments Act' },
  { id: 'bh9', date: '2027-08-15', dayOfWeek: 'Sunday', name: 'Independence Day', states: ['ALL'], category: 'Negotiable Instruments Act' },
  { id: 'bh10', date: '2027-09-05', dayOfWeek: 'Sunday', name: 'Ganesh Chaturthi', states: ['MH', 'GJ', 'GA', 'KA', 'TS', 'AP'], category: 'Negotiable Instruments Act' },
  { id: 'bh11', date: '2027-10-02', dayOfWeek: 'Saturday', name: 'Mahatma Gandhi Jayanti', states: ['ALL'], category: 'Negotiable Instruments Act' },
  { id: 'bh12', date: '2027-10-10', dayOfWeek: 'Sunday', name: 'Dussehra (Vijayadashami)', states: ['ALL'], category: 'Negotiable Instruments Act' },
  { id: 'bh13', date: '2027-11-08', dayOfWeek: 'Monday', name: 'Diwali (Laxmi Pujan)', states: ['ALL'], category: 'Negotiable Instruments Act' },
  { id: 'bh14', date: '2027-11-09', dayOfWeek: 'Tuesday', name: 'Diwali Balipratipada / Vikram Samvat New Year', states: ['MH', 'GJ', 'RJ', 'UP'], category: 'Negotiable Instruments Act' },
  { id: 'bh15', date: '2027-12-25', dayOfWeek: 'Saturday', name: 'Christmas Day', states: ['ALL'], category: 'Negotiable Instruments Act' }
];

export const RASHIFAL_DATA: RashifalData[] = [
  {
    rashiId: 'mesha',
    name: 'Mesha (Aries)',
    nameHi: 'मेष',
    sanskritName: 'मेष',
    westernSign: 'Aries',
    ruler: 'Mars (Mangal)',
    element: 'Fire (Agni)',
    symbol: 'Ram',
    syllables: ['Chu', 'Che', 'Cho', 'La', 'Li', 'Lu', 'Le', 'Lo', 'A'],
    dailyPrediction: {
      general: 'Mars infuses vibrant energy and courage today. High confidence will help you tackle pending tasks effortlessly.',
      career: 'New project responsibilities may arrive. Colleagues will appreciate your decisive problem-solving.',
      love: 'Warm understanding prevails in marital ties. Singles might experience a mutual spark with someone at a work event.',
      health: 'High stamina, but avoid overexertion during physical workouts. Drink plenty of water.',
      luckyColor: 'Coral Red & Saffron',
      luckyNumber: '9',
      luckyTime: '08:30 AM to 10:15 AM'
    },
    weeklyPrediction: 'This week highlights strategic financial decisions. Mid-week travel could open prosperous professional networking.',
    monthlyPrediction: 'Jupiter transiting favorably supports educational expansions, competitive exams, and property gains throughout the month.',
    yearly2027Prediction: '2027 brings breakthrough career elevations. Saturn\'s placement encourages discipline, while Rahu transit in the 11th house supports sudden financial gains.'
  },
  {
    rashiId: 'vrishabha',
    name: 'Vrishabha (Taurus)',
    nameHi: 'वृषभ',
    sanskritName: 'वृषभ',
    westernSign: 'Taurus',
    ruler: 'Venus (Shukra)',
    element: 'Earth (Prithvi)',
    symbol: 'Bull',
    syllables: ['I', 'U', 'E', 'O', 'Va', 'Vi', 'Vu', 'Ve', 'Vo'],
    dailyPrediction: {
      general: 'Artistic appreciation and harmonious conversations dominate your day. Financial dealings remain stable.',
      career: 'Creative pitches and client discussions will be favorably received. Excellent day for luxury retail professionals.',
      love: 'Romantic evening with spouse. A thoughtful gesture brings joyful mutual appreciation.',
      health: 'Throat or neck sensitivity might arise; prefer warm water with honey over chilled drinks.',
      luckyColor: 'Pearl White & Emerald Green',
      luckyNumber: '6',
      luckyTime: '02:00 PM to 04:00 PM'
    },
    weeklyPrediction: 'Focus on budget allocations. Family celebrations bring relatives together in cheerful spirits.',
    monthlyPrediction: 'Career advancements and lucrative partnership agreements are well-aspected in the second half of the month.',
    yearly2027Prediction: 'A landmark year for property and domestic harmony. Shukra provides creative fulfillment and social respect in 2027.'
  },
  {
    rashiId: 'mithuna',
    name: 'Mithuna (Gemini)',
    nameHi: 'मिथुन',
    sanskritName: 'मिथुन',
    westernSign: 'Gemini',
    ruler: 'Mercury (Budh)',
    element: 'Air (Vayu)',
    symbol: 'Twins',
    syllables: ['Ka', 'Ki', 'Ku', 'Gha', 'Ng', 'Chha', 'Ke', 'Ko', 'Ha'],
    dailyPrediction: {
      general: 'Intellectual dexterity is at its peak. Fast-paced communications and written correspondence yield quick dividends.',
      career: 'Technical presentations and negotiation meetings succeed smoothly. Great day for software, media, and marketing.',
      love: 'Engage in open, lighthearted conversations with your partner. Misunderstandings dissolve naturally.',
      health: 'Keep mental anxiety in check with 15 minutes of Pranayama and mindful breathing.',
      luckyColor: 'Parrot Green & Canary Yellow',
      luckyNumber: '5',
      luckyTime: '11:15 AM to 01:00 PM'
    },
    weeklyPrediction: 'Short business trips yield positive leads. Review legal contracts thoroughly before executing.',
    monthlyPrediction: 'Substantial intellectual breakthroughs and recognition in publishing, teaching, and IT fields.',
    yearly2027Prediction: '2027 is a transformative year for communication, international connections, and digital business ventures.'
  },
  {
    rashiId: 'karka',
    name: 'Karka (Cancer)',
    nameHi: 'कर्क',
    sanskritName: 'कर्क',
    westernSign: 'Cancer',
    ruler: 'Moon (Chandra)',
    element: 'Water (Jal)',
    symbol: 'Crab',
    syllables: ['Hi', 'Hu', 'He', 'Ho', 'Da', 'Di', 'Du', 'De', 'Do'],
    dailyPrediction: {
      general: 'Intuition is exceptionally sharp. Focus on domestic serenity and inner spiritual reflection.',
      career: 'Colleagues seek your counsel on collaborative dilemmas. Real estate and culinary professions thrive.',
      love: 'Emotional depth enriches relationships. Spending quiet evening time with family will be therapeutic.',
      health: 'Digestive tract requires mindful eating; opt for fresh homemade sattvic food.',
      luckyColor: 'Silver & Ocean Blue',
      luckyNumber: '2',
      luckyTime: '06:00 PM to 07:30 PM'
    },
    weeklyPrediction: 'Auspicious news regarding family properties or children\'s accomplishments lifts your spirits.',
    monthlyPrediction: 'Deepening emotional stability and savings growth. Charitable deeds multiply positive karma.',
    yearly2027Prediction: 'A deeply fulfilling year of spiritual growth, home acquisitions, and family blessings in 2027.'
  },
  {
    rashiId: 'simha',
    name: 'Simha (Leo)',
    nameHi: 'सिंह',
    sanskritName: 'सिंह',
    westernSign: 'Leo',
    ruler: 'Sun (Surya)',
    element: 'Fire (Agni)',
    symbol: 'Lion',
    syllables: ['Ma', 'Mi', 'Mu', 'Me', 'Mo', 'Ta', 'Ti', 'Tu', 'Te'],
    dailyPrediction: {
      general: 'Surya Dev shines brightly on your charisma. Leadership opportunities manifest effortlessly.',
      career: 'Senior executives endorse your proposals. Ideal timing for launching managerial initiatives.',
      love: 'Generosity and warmth win your loved one\'s heart. Express appreciation without hesitation.',
      health: 'Vitality remains high; incorporate cardiovascular exercise and morning sun exposure.',
      luckyColor: 'Royal Gold & Ruby',
      luckyNumber: '1',
      luckyTime: '07:30 AM to 09:30 AM'
    },
    weeklyPrediction: 'Professional authority expands significantly. Government-related sanctions or permissions arrive positively.',
    monthlyPrediction: 'High recognition and prestigious accolades mark this month for Leos in governance, medicine, and entrepreneurship.',
    yearly2027Prediction: '2027 promises regal expansion, executive elevations, and victorious resolution of lingering disputes.'
  },
  {
    rashiId: 'kanya',
    name: 'Kanya (Virgo)',
    nameHi: 'कन्या',
    sanskritName: 'कन्या',
    westernSign: 'Virgo',
    ruler: 'Mercury (Budh)',
    element: 'Earth (Prithvi)',
    symbol: 'Maiden',
    syllables: ['To', 'Pa', 'Pi', 'Pu', 'Sha', 'Na', 'Tha', 'Pe', 'Po'],
    dailyPrediction: {
      general: 'Meticulous analytical attention ensures flawlessness in complex calculations and accounting.',
      career: 'Audit reports, technical code, and research papers receive high commendation from peers.',
      love: 'Practical gestures of care and service deepen your partner\'s gratitude and affection.',
      health: 'Avoid skipping meals due to heavy work schedules; consume fresh seasonal fruits.',
      luckyColor: 'Olive Green & Cream',
      luckyNumber: '5',
      luckyTime: '03:30 PM to 05:00 PM'
    },
    weeklyPrediction: 'Systematic organization clears clutter at work. A profitable consulting opportunity may emerge.',
    monthlyPrediction: 'Sound health recovery and clearing of debts mark this productive month.',
    yearly2027Prediction: '2027 is a masterclass in professional precision, skill enhancement, and commercial stabilization.'
  },
  {
    rashiId: 'tula',
    name: 'Tula (Libra)',
    nameHi: 'तुला',
    sanskritName: 'तुला',
    westernSign: 'Libra',
    ruler: 'Venus (Shukra)',
    element: 'Air (Vayu)',
    symbol: 'Scales',
    syllables: ['Ra', 'Ri', 'Ru', 'Re', 'Ro', 'Ta', 'Ti', 'Tu', 'Te'],
    dailyPrediction: {
      general: 'Equilibrium and diplomacy resolve complicated social negotiations. Aesthetics and music uplift your mood.',
      career: 'Legal agreements, design ventures, and client negotiations proceed with remarkable mutual satisfaction.',
      love: 'Romance blossoms. Unmarried Libras might receive promising matrimony proposals.',
      health: 'Maintain posture awareness during long desk hours. Gentle yoga stretches will revitalize you.',
      luckyColor: 'Sky Blue & Rose Pink',
      luckyNumber: '6',
      luckyTime: '10:00 AM to 12:00 PM'
    },
    weeklyPrediction: 'Strategic partnerships flourish. Investments in art or interior enhancement prove satisfying.',
    monthlyPrediction: 'Social prestige rises significantly. Invitations to high-profile gatherings and cultural events.',
    yearly2027Prediction: '2027 brings fruitful matrimonial alliances, legal triumphs, and lucrative commercial collaborations.'
  },
  {
    rashiId: 'vrishchika',
    name: 'Vrishchika (Scorpio)',
    nameHi: 'वृश्चिक',
    sanskritName: 'वृश्चिक',
    westernSign: 'Scorpio',
    ruler: 'Mars & Ketu',
    element: 'Water (Jal)',
    symbol: 'Scorpion',
    syllables: ['To', 'Na', 'Ni', 'Nu', 'Ne', 'No', 'Ya', 'Yi', 'Yu'],
    dailyPrediction: {
      general: 'Deep focus and psychological insight allow you to see through hidden motives and uncover vital solutions.',
      career: 'Research, intelligence, forensic analysis, and surgical disciplines excel. Discreet work yields massive results.',
      love: 'Passionate and loyal bonds. Honest sharing of vulnerabilities brings heartfelt closeness.',
      health: 'Focus on detoxification; herbal infusions and green tea will soothe your internal system.',
      luckyColor: 'Maroon & Deep Rust',
      luckyNumber: '9',
      luckyTime: '01:00 PM to 02:45 PM'
    },
    weeklyPrediction: 'Sudden financial gains or inheritance resolutions are indicated. Guard confidential documents carefully.',
    monthlyPrediction: 'Occult, research, and high-stakes financial operations prosper. Inner spiritual courage peaks.',
    yearly2027Prediction: '2027 represents profound personal metamorphosis, shedding old baggage and ascending to lasting empowerment.'
  },
  {
    rashiId: 'dhanu',
    name: 'Dhanu (Sagittarius)',
    nameHi: 'धनु',
    sanskritName: 'धनु',
    westernSign: 'Sagittarius',
    ruler: 'Jupiter (Brihaspati)',
    element: 'Fire (Agni)',
    symbol: 'Archer / Centaur',
    syllables: ['Ye', 'Yo', 'Bha', 'Bhi', 'Bhu', 'Dha', 'Pha', 'Dha', 'Bhe'],
    dailyPrediction: {
      general: 'Philosophical optimism and good fortune prevail. A mentor or respected guru provides illuminating guidance.',
      career: 'Higher education, law, consulting, and publishing efforts gain substantial traction.',
      love: 'Spiritual journeys or meaningful cultural discussions together reinforce marital joy.',
      health: 'Liver and hip vitality is strong; maintain brisk morning walking routines.',
      luckyColor: 'Bright Yellow & Saffron',
      luckyNumber: '3',
      luckyTime: '09:00 AM to 11:00 AM'
    },
    weeklyPrediction: 'Foreign collaborations or pilgrimage plans materialize smoothly. Generous charitable impulses bring deep peace.',
    monthlyPrediction: 'Jupiter\'s protective grace shields you from rivalries and ensures scholarly or career distinctions.',
    yearly2027Prediction: '2027 offers long-distance travel, spiritual awakening, and outstanding academic or institutional triumphs.'
  },
  {
    rashiId: 'makara',
    name: 'Makara (Capricorn)',
    nameHi: 'मकर',
    sanskritName: 'मकर',
    westernSign: 'Capricorn',
    ruler: 'Saturn (Shani)',
    element: 'Earth (Prithvi)',
    symbol: 'Sea-Goat',
    syllables: ['Bho', 'Ja', 'Ji', 'Khi', 'Khu', 'Khe', 'Kho', 'Ga', 'Gi'],
    dailyPrediction: {
      general: 'Unwavering perseverance and structural foresight guarantee steady progress on ambitious projects.',
      career: 'Complex infrastructure, industrial engineering, and corporate planning goals are achieved on schedule.',
      love: 'Devoted, steadfast commitment. Long-term family stability is prioritized.',
      health: 'Joint and bone care is essential; ensure adequate calcium and morning Vitamin D.',
      luckyColor: 'Charcoal Grey & Royal Navy',
      luckyNumber: '8',
      luckyTime: '04:00 PM to 05:45 PM'
    },
    weeklyPrediction: 'Prudent investment portfolios yield consistent returns. Elders offer treasured blessings and support.',
    monthlyPrediction: 'Professional endurance pays off with a major promotion or long-awaited leadership role.',
    yearly2027Prediction: '2027 is a monumental milestone year where past dedication crystallizes into lasting professional legacy.'
  },
  {
    rashiId: 'kumbha',
    name: 'Kumbha (Aquarius)',
    nameHi: 'कुंभ',
    sanskritName: 'कुम्भ',
    westernSign: 'Aquarius',
    ruler: 'Saturn & Rahu',
    element: 'Air (Vayu)',
    symbol: 'Water-Bearer',
    syllables: ['Gu', 'Ge', 'Go', 'Sa', 'Si', 'Su', 'Se', 'So', 'Da'],
    dailyPrediction: {
      general: 'Visionary thinking and humanitarian ideas inspire everyone around you. Community initiatives flourish.',
      career: 'Breakthrough innovations in scientific, technological, and non-profit endeavors receive applause.',
      love: 'Friendship forms the solid bedrock of your romance. Mutual intellectual respect shines.',
      health: 'Circulation and calf wellness benefit from staying physically active and well-hydrated.',
      luckyColor: 'Electric Cyan & Deep Indigo',
      luckyNumber: '7',
      luckyTime: '12:30 PM to 02:15 PM'
    },
    weeklyPrediction: 'Networking with influential organizations opens doors. Collaborative team dynamics are energized.',
    monthlyPrediction: 'Innovative inventions and social influence expand. Unexpected positive windfalls.',
    yearly2027Prediction: '2027 empowers your unconventional visions, bringing mass influence and progressive breakthroughs.'
  },
  {
    rashiId: 'meena',
    name: 'Meena (Pisces)',
    nameHi: 'मीन',
    sanskritName: 'मीन',
    westernSign: 'Pisces',
    ruler: 'Jupiter (Brihaspati)',
    element: 'Water (Jal)',
    symbol: 'Two Fish',
    syllables: ['Di', 'Du', 'Th', 'Jha', 'Jn', 'De', 'Do', 'Ch', 'Chi'],
    dailyPrediction: {
      general: 'Compassion, artistic imagination, and intuitive mysticism are profoundly heightened today.',
      career: 'Artistic composition, philanthropic ventures, and counseling professions experience divine flow.',
      love: 'Unconditional empathy and romantic tenderness soothe your partner\'s heart.',
      health: 'Restful sleep and meditative music in the evening recharge your subtle energy body.',
      luckyColor: 'Sea Green & Golden Saffron',
      luckyNumber: '3',
      luckyTime: '08:00 AM to 10:00 AM'
    },
    weeklyPrediction: 'Spiritual retreats and creative pursuits bring deep emotional peace. Financial stability remains assured.',
    monthlyPrediction: 'Inner enlightenment and international or overseas opportunities align beautifully.',
    yearly2027Prediction: '2027 is a year of deep spiritual transcendence, charitable fulfillment, and creative masterpiece creation.'
  }
];

export const BABY_NAMES_DATA: BabyName[] = [
  { id: 'b1', name: 'Aarav', gender: 'Boy', meaning: 'Peaceful, melodious sound, wise reflection', rashi: 'Mesha', nakshatra: 'Ashwini', startingLetter: 'A', origin: 'Sanskrit', numerology: 1 },
  { id: 'b2', name: 'Ananya', gender: 'Girl', meaning: 'Matchless, unique, Goddess Parvati', rashi: 'Mesha', nakshatra: 'Krittika', startingLetter: 'A', origin: 'Sanskrit', numerology: 6 },
  { id: 'b3', name: 'Advait', gender: 'Boy', meaning: 'Non-dual, unique, Brahma, peerless unity', rashi: 'Mesha', nakshatra: 'Krittika', startingLetter: 'A', origin: 'Vedic', numerology: 9 },
  { id: 'b4', name: 'Bhavya', gender: 'Girl', meaning: 'Grand, splendid, auspicious, Maa Parvati', rashi: 'Dhanu', nakshatra: 'Mula', startingLetter: 'Bha', origin: 'Sanskrit', numerology: 3 },
  { id: 'b5', name: 'Chirag', gender: 'Boy', meaning: 'Radiant lamp, beacon of light and guidance', rashi: 'Mithuna', nakshatra: 'Ardra', startingLetter: 'Ch', origin: 'Sanskrit', numerology: 4 },
  { id: 'b6', name: 'Devansh', gender: 'Boy', meaning: 'Divine part of God, sacred spiritual essence', rashi: 'Karka', nakshatra: 'Pushya', startingLetter: 'De', origin: 'Sanskrit', numerology: 7 },
  { id: 'b7', name: 'Divya', gender: 'Girl', meaning: 'Divine light, heavenly celestial brilliance', rashi: 'Karka', nakshatra: 'Pushya', startingLetter: 'Di', origin: 'Sanskrit', numerology: 1 },
  { id: 'b8', name: 'Eshaan', gender: 'Boy', meaning: 'Lord Shiva, ruling sun, guardian of North-East', rashi: 'Vrishabha', nakshatra: 'Krittika', startingLetter: 'E', origin: 'Sanskrit', numerology: 5 },
  { id: 'b9', name: 'Gauri', gender: 'Girl', meaning: 'Pure white radiance, Goddess Parvati', rashi: 'Kumbha', nakshatra: 'Dhanishta', startingLetter: 'Ga', origin: 'Sanskrit', numerology: 8 },
  { id: 'b10', name: 'Hriday', gender: 'Boy', meaning: 'Heart, compassion, the sacred spiritual core', rashi: 'Mithuna', nakshatra: 'Punarvasu', startingLetter: 'Ha', origin: 'Sanskrit', numerology: 2 },
  { id: 'b11', name: 'Ishita', gender: 'Girl', meaning: 'Mastery, divine supremacy, wealthy and respected', rashi: 'Vrishabha', nakshatra: 'Rohini', startingLetter: 'I', origin: 'Sanskrit', numerology: 9 },
  { id: 'b12', name: 'Kabir', gender: 'Boy', meaning: 'Great, famous mystic saint, boundless spirit', rashi: 'Mithuna', nakshatra: 'Mrigashirsha', startingLetter: 'Ka', origin: 'Indian', numerology: 3 },
  { id: 'b13', name: 'Kavya', gender: 'Girl', meaning: 'Poetry in motion, lyrical wisdom, artistic grace', rashi: 'Mithuna', nakshatra: 'Mrigashirsha', startingLetter: 'Ka', origin: 'Sanskrit', numerology: 5 },
  { id: 'b14', name: 'Lakshya', gender: 'Boy', meaning: 'Focused aim, divine goal, purpose of life', rashi: 'Mesha', nakshatra: 'Ashwini', startingLetter: 'La', origin: 'Sanskrit', numerology: 1 },
  { id: 'b15', name: 'Mira', gender: 'Girl', meaning: 'Ocean, boundless devotee of Lord Krishna', rashi: 'Simha', nakshatra: 'Magha', startingLetter: 'Mi', origin: 'Sanskrit', numerology: 7 },
  { id: 'b16', name: 'Neev', gender: 'Boy', meaning: 'Firm foundation, inception of righteousness', rashi: 'Vrishchika', nakshatra: 'Anuradha', startingLetter: 'Ne', origin: 'Sanskrit', numerology: 4 },
  { id: 'b17', name: 'Navya', gender: 'Girl', meaning: 'Ever fresh, youthful praise, modern elegance', rashi: 'Vrishchika', nakshatra: 'Anuradha', startingLetter: 'Na', origin: 'Sanskrit', numerology: 6 },
  { id: 'b18', name: 'Omkar', gender: 'Boy', meaning: 'The sacred primordial sound OM, pure consciousness', rashi: 'Vrishabha', nakshatra: 'Rohini', startingLetter: 'O', origin: 'Vedic', numerology: 9 },
  { id: 'b19', name: 'Prisha', gender: 'Girl', meaning: 'Beloved gift of God, graceful and loving', rashi: 'Kanya', nakshatra: 'Hasta', startingLetter: 'Pa', origin: 'Sanskrit', numerology: 2 },
  { id: 'b20', name: 'Reyansh', gender: 'Boy', meaning: 'First ray of sunlight, avatar of Lord Vishnu', rashi: 'Tula', nakshatra: 'Chitra', startingLetter: 'Re', origin: 'Sanskrit', numerology: 1 },
  { id: 'b21', name: 'Riya', gender: 'Girl', meaning: 'Graceful singer, flowing prosperity, Lakshmi', rashi: 'Tula', nakshatra: 'Chitra', startingLetter: 'Ri', origin: 'Sanskrit', numerology: 8 },
  { id: 'b22', name: 'Samar', gender: 'Boy', meaning: 'Heroic leader, evening conversation, courageous', rashi: 'Kumbha', nakshatra: 'Shatabhisha', startingLetter: 'Sa', origin: 'Sanskrit', numerology: 5 },
  { id: 'b23', name: 'Saanvi', gender: 'Girl', meaning: 'Goddess Lakshmi, one who is followed and revered', rashi: 'Kumbha', nakshatra: 'Shatabhisha', startingLetter: 'Sa', origin: 'Sanskrit', numerology: 3 },
  { id: 'b24', name: 'Tanmay', gender: 'Boy', meaning: 'Engrossed in divine meditation, absorbed in joy', rashi: 'Tula', nakshatra: 'Swati', startingLetter: 'Ta', origin: 'Sanskrit', numerology: 6 },
  { id: 'b25', name: 'Tara', gender: 'Girl', meaning: 'Radiant star, Goddess of compassion and guidance', rashi: 'Tula', nakshatra: 'Swati', startingLetter: 'Ta', origin: 'Sanskrit', numerology: 9 },
  { id: 'b26', name: 'Utkarsh', gender: 'Boy', meaning: 'High excellence, prosperity, ascent to greatness', rashi: 'Vrishabha', nakshatra: 'Krittika', startingLetter: 'U', origin: 'Sanskrit', numerology: 1 },
  { id: 'b27', name: 'Vedant', gender: 'Boy', meaning: 'Ultimate Vedic philosophy, supreme wisdom', rashi: 'Vrishabha', nakshatra: 'Rohini', startingLetter: 'Ve', origin: 'Vedic', numerology: 7 },
  { id: 'b28', name: 'Vanya', gender: 'Girl', meaning: 'Gracious gift of nature, wild beauty, peaceful', rashi: 'Vrishabha', nakshatra: 'Rohini', startingLetter: 'Va', origin: 'Sanskrit', numerology: 4 },
  { id: 'b29', name: 'Yash', gender: 'Boy', meaning: 'Glory, triumph, honor, divine victory', rashi: 'Vrishchika', nakshatra: 'Jyeshtha', startingLetter: 'Ya', origin: 'Sanskrit', numerology: 2 },
  { id: 'b30', name: 'Zara', gender: 'Girl', meaning: 'Radiance of dawn, blooming fragrant blossom', rashi: 'Meena', nakshatra: 'Purva Bhadrapada', startingLetter: 'Jha', origin: 'Indian', numerology: 5 }
];

export const ARTICLES_DATA: Article[] = [
  {
    slug: 'hindu-calendar-2027-guide',
    title: 'Hindu Calendar 2027 Complete Guide: Samvat, Months, Tithis & Astronomical Science',
    category: 'Vedic Astronomy',
    readTime: '6 min read',
    publishedDate: '2026-09-26',
    excerpt: 'An authoritative examination of the 2027 lunisolar calendar architecture, explaining Vikram Samvat 2083-2084, Shalivahana Shaka 1948-1949, and the exact planetary alignments governing this auspicious year.',
    content: [
      'The Hindu calendar is an exquisite lunisolar timekeeping system codified thousands of years ago in texts like the Surya Siddhanta, Vedanga Jyotisha, and Aryabhatiya. Unlike purely solar calendars (such as the Gregorian calendar) or purely lunar calendars (which wander across seasons), the Hindu calendar maintains exact harmony with both the solar year (defining seasons or Ritus) and lunar phases (defining tithis and religious observances).',
      'The year 2027 encompasses Vikram Samvat 2083 leading into Vikram Samvat 2084 on Chaitra Shukla Pratipada (April 7, 2027). Simultaneously, it observes Shalivahana Shaka 1948 transitioning to Shaka 1949, predominantly celebrated across Maharashtra, Karnataka, Andhra Pradesh, and Goa.',
      'A lunar month lasts approximately 29.53 days, consisting of two fortnights: the waxing Shukla Paksha (culminating in the full moon, Purnima) and the waning Krishna Paksha (culminating in the new moon, Amavasya). Because 12 lunar months equal approximately 354 days (around 11 days shorter than the solar year of 365.25 days), the calendar inserts an extra intercalary month (Adhika Masa or Purushottama Masa) roughly every 32.5 months to ensure that religious festivals always fall in their natural agricultural and seasonal cycles.',
      'Our NewsDarshan calculation algorithms honor the classical Surya Siddhanta principles combined with modern topocentric ephemeris coordinates, ensuring that the tithi, nakshatra, and sunset times displayed for your specific city are mathematically accurate to within seconds.'
    ],
    relatedFestivals: ['gudi-padwa-ugadi-2027', 'makar-sankranti-2027', 'diwali-deepavali-2027'],
    faq: [
      { question: 'What is the Vikram Samvat year in 2027?', answer: 'In 2027, Vikram Samvat 2083 runs until April 6, 2027, after which Vikram Samvat 2084 commences on Chaitra Shukla Pratipada (April 7, 2027).' },
      { question: 'Is 2027 an Adhika Masa (leap month) year?', answer: 'The intercalary Adhika Masa cycle is calculated strictly by the absence of a solar transit (Sankranti) within a lunar month, ensuring seamless synchronization with natural solar seasons.' },
      { question: 'Why do festival dates differ across North and South India?', answer: 'North India predominantly follows the Purnimant calendar system (where the month ends on Purnima), whereas South India, Maharashtra, and Gujarat follow the Amavasyant system (where the month ends on Amavasya). While month names vary by two weeks, the exact tithi of all major festivals remains identical throughout India.' }
    ]
  },
  {
    slug: 'purnimant-vs-amavasyant-calendars',
    title: 'Purnimant vs Amavasyant Calendars: Understanding Regional Indian Calendar Systems',
    category: 'Regional Traditions',
    readTime: '5 min read',
    publishedDate: '2026-09-26',
    excerpt: 'Why does Shravan month begin two weeks earlier in Varanasi than in Mumbai? Discover the historical divergence between the northern Purnimant system and the western/southern Amavasyant system.',
    content: [
      'One of the most common questions seekers ask is why calendars in Uttar Pradesh, Bihar, Rajasthan, and Madhya Pradesh designate a month nearly 15 days ahead of calendars in Maharashtra, Gujarat, Karnataka, Andhra Pradesh, and Telangana.',
      'The foundational reason lies in the method of lunar month demarcation. In the Purnimant system (followed in North India), the lunar month begins on the day after Purnima (Krishna Pratipada) and concludes on the next Purnima. The dark fortnight (Krishna Paksha) comes first, followed by the bright fortnight (Shukla Paksha).',
      'In contrast, the Amavasyant system (also called Mukhyamana, followed in Maharashtra, Gujarat, Karnataka, Andhra, and Tamil Nadu) begins the month on Shukla Pratipada (the day after the New Moon) and concludes on Amavasya. Here, the bright fortnight comes first, followed by the dark fortnight.',
      'Remarkably, both systems celebrate festivals on the exact same cosmic day! For example, Krishna Janmashtami is celebrated on Bhadrapada Krishna Ashtami in North India, while in Maharashtra and Gujarat it is called Shravana Krishna Ashtami. In reality, it is the exact same moon phase and identical calendar day.'
    ],
    relatedFestivals: ['krishna-janmashtami-2027', 'maha-shivratri-2027'],
    faq: [
      { question: 'Which states follow the Amavasyant calendar?', answer: 'Maharashtra, Gujarat, Karnataka, Andhra Pradesh, Telangana, and Goa follow the Amavasyant calendar system.' },
      { question: 'Which states follow the Purnimant calendar?', answer: 'Uttar Pradesh, Bihar, Rajasthan, Madhya Pradesh, Haryana, Punjab, Himachal Pradesh, and Uttarakhand follow the Purnimant system.' }
    ]
  },
  {
    slug: 'science-of-choghadiya-muhurat',
    title: 'The Science of Choghadiya: Auspicious and Inauspicious Planetary Hours Explained',
    category: 'Astrology & Muhurat',
    readTime: '5 min read',
    publishedDate: '2026-09-26',
    excerpt: 'How to utilize the 7 classical Choghadiyas (Amrit, Shubh, Labh, Chal, Rog, Kaal, Udveg) for daily decision making, travel, business deals, and vehicle purchases.',
    content: [
      'The word Choghadiya originates from "Chau-Ghati" meaning four Ghatis (approximately 96 minutes or 1.6 hours). In classical Indian astrology, each day from sunrise to sunset, and each night from sunset to the next sunrise, is divided into eight equal time partitions, seven of which cycle under the rulership of planetary energies.',
      'The seven Choghadiyas are categorized into three auspicious periods: Amrit (ruled by Moon, highly auspicious for all divine tasks), Shubh (ruled by Jupiter, ideal for religious ceremonies and weddings), and Labh (ruled by Mercury, optimum for commercial ventures and education).',
      'Chal is considered neutral (ruled by Venus, recommended for swift travel and movement). Conversely, Rog (Mars, brings obstacles), Kaal (Saturn, delays and friction), and Udveg (Sun, anxiety and restlessness) are treated as inauspicious periods where starting new ventures should be avoided.',
      'NewsDarshan calculates real-time day and night Choghadiya partitions dynamically adjusted for your city\'s exact sunrise and sunset down to the precise minute.'
    ],
    relatedFestivals: ['akshaya-tritiya-2027', 'diwali-deepavali-2027'],
    faq: [
      { question: 'Which is the best Choghadiya for starting a journey?', answer: 'Amrit, Shubh, and Chal Choghadiyas are traditionally considered ideal for beginning travels.' },
      { question: 'Does Choghadiya timing vary by city?', answer: 'Yes, because Choghadiya intervals are calculated by dividing the exact local day length (sunset minus sunrise) by eight, timings vary by location.' }
    ]
  }
];
