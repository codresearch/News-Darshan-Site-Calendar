import { RegionalCalendarKey, LanguageCode } from '../types';

export interface RegionalWeekdayInfo {
  en: string;
  native: string;
  short: string;
}

export interface RegionalMonthDetail {
  gregorianIndex: number; // 0 = Jan, 11 = Dec
  gregorianName: string;
  regionalMasaEn: string;
  regionalMasaNative: string;
  festivalsHighlight: string;
}

export function normalizeRegionKey(rawKey: string): RegionalCalendarKey {
  const clean = (rawKey || '').toLowerCase().trim();
  if (clean === 'gujarat' || clean === 'gujarati') return 'gujarati';
  if (clean === 'bangla' || clean === 'bengali') return 'bengali';
  if (clean === 'oriya' || clean === 'odia') return 'odia';
  if (clean === 'kannad' || clean === 'kannada') return 'kannada';
  if (clean === 'kerala' || clean === 'malayalam') return 'malayalam';
  if (clean === 'tamil' || clean === 'tamilnadu') return 'tamil';
  if (clean === 'telugu' || clean === 'andhra') return 'telugu';
  if (clean === 'punjab' || clean === 'punjabi') return 'punjabi';
  if (clean === 'hindi' || clean === 'north-india') return 'hindi';
  if (clean === 'assam' || clean === 'assamese') return 'assamese';
  return 'marathi';
}

export const REGIONAL_WEEKDAYS: Record<RegionalCalendarKey, RegionalWeekdayInfo[]> = {
  marathi: [
    { en: 'Sun', native: 'रविवार', short: 'रवि' },
    { en: 'Mon', native: 'सोमवार', short: 'सोम' },
    { en: 'Tue', native: 'मंगळवार', short: 'मंगळ' },
    { en: 'Wed', native: 'बुधवार', short: 'बुध' },
    { en: 'Thu', native: 'गुरुवार', short: 'गुरू' },
    { en: 'Fri', native: 'शुक्रवार', short: 'शुक्र' },
    { en: 'Sat', native: 'शनिवार', short: 'शनि' }
  ],
  gujarati: [
    { en: 'Sun', native: 'રવિવાર', short: 'રવિ' },
    { en: 'Mon', native: 'સોમવાર', short: 'સોમ' },
    { en: 'Tue', native: 'મંગળવાર', short: 'મંગળ' },
    { en: 'Wed', native: 'બુધવાર', short: 'બુધ' },
    { en: 'Thu', native: 'ગુરુવાર', short: 'ગુરુ' },
    { en: 'Fri', native: 'શુક્રવાર', short: 'શુક્ર' },
    { en: 'Sat', native: 'શનિવાર', short: 'શનિ' }
  ],
  telugu: [
    { en: 'Sun', native: 'ఆదివారం', short: 'ఆది' },
    { en: 'Mon', native: 'సోమవారం', short: 'సోమ' },
    { en: 'Tue', native: 'మంగళవారం', short: 'మంగళ' },
    { en: 'Wed', native: 'బుధవారం', short: 'బుధ' },
    { en: 'Thu', native: 'గురువారం', short: 'గురు' },
    { en: 'Fri', native: 'శుక్రవారం', short: 'శుక్ర' },
    { en: 'Sat', native: 'శనివారం', short: 'శని' }
  ],
  tamil: [
    { en: 'Sun', native: 'ஞாயிறு', short: 'ஞாயி' },
    { en: 'Mon', native: 'திங்கள்', short: 'திங்' },
    { en: 'Tue', native: 'செவ்வாய்', short: 'செவ்' },
    { en: 'Wed', native: 'புதன்', short: 'புதன்' },
    { en: 'Thu', native: 'வியாழன்', short: 'வியா' },
    { en: 'Fri', native: 'வெள்ளி', short: 'வெள்' },
    { en: 'Sat', native: 'சனி', short: 'சனி' }
  ],
  kannada: [
    { en: 'Sun', native: 'ಭಾನುವಾರ', short: 'ಭಾನು' },
    { en: 'Mon', native: 'ಸೋಮವಾರ', short: 'ಸೋಮ' },
    { en: 'Tue', native: 'ಮಂಗಳವಾರ', short: 'ಮಂಗಳ' },
    { en: 'Wed', native: 'ಬುಧವಾರ', short: 'ಬುಧ' },
    { en: 'Thu', native: 'ಗುರುವಾರ', short: 'ಗುರು' },
    { en: 'Fri', native: 'ಶುಕ್ರವಾರ', short: 'ಶುಕ್ರ' },
    { en: 'Sat', native: 'ಶನಿವಾರ', short: 'ಶನಿ' }
  ],
  malayalam: [
    { en: 'Sun', native: 'ഞായറാഴ്ച', short: 'ഞായർ' },
    { en: 'Mon', native: 'തിങ്കളാഴ്ച', short: 'തിങ്കൾ' },
    { en: 'Tue', native: 'ചൊവ്വാഴ്ച', short: 'ചൊവ്വ' },
    { en: 'Wed', native: 'ബുധനാഴ്ച', short: 'ബുധൻ' },
    { en: 'Thu', native: 'വ്യാഴാഴ്ച', short: 'വ്യാഴം' },
    { en: 'Fri', native: 'വെള്ളിയാഴ്ച', short: 'വെള്ളി' },
    { en: 'Sat', native: 'ശനിയാഴ്ച', short: 'ശനി' }
  ],
  bengali: [
    { en: 'Sun', native: 'রবিবার', short: 'রবি' },
    { en: 'Mon', native: 'সোমবার', short: 'সোম' },
    { en: 'Tue', native: 'মঙ্গলবার', short: 'মঙ্গল' },
    { en: 'Wed', native: 'বুধবার', short: 'বুধ' },
    { en: 'Thu', native: 'বৃহস্পতিবার', short: 'বৃহঃ' },
    { en: 'Fri', native: 'শুক্রবার', short: 'শুক্র' },
    { en: 'Sat', native: 'শনিবার', short: 'শনি' }
  ],
  odia: [
    { en: 'Sun', native: 'ରବିବାର', short: 'ରବି' },
    { en: 'Mon', native: 'ସୋମବାର', short: 'ସୋମ' },
    { en: 'Tue', native: 'ମଙ୍ଗଳବାର', short: 'ମଙ୍ଗଳ' },
    { en: 'Wed', native: 'ବୁଧବାର', short: 'ବୁଧ' },
    { en: 'Thu', native: 'ଗୁରୁବାର', short: 'ଗୁରୁ' },
    { en: 'Fri', native: 'ଶୁକ୍ରବାର', short: 'ଶୁକ୍ର' },
    { en: 'Sat', native: 'ଶନିବାର', short: 'ଶନି' }
  ],
  hindi: [
    { en: 'Sun', native: 'रविवार', short: 'रवि' },
    { en: 'Mon', native: 'सोमवार', short: 'सोम' },
    { en: 'Tue', native: 'मंगलवार', short: 'मंगल' },
    { en: 'Wed', native: 'बुधवार', short: 'बुध' },
    { en: 'Thu', native: 'गुरुवार', short: 'गुरु' },
    { en: 'Fri', native: 'शुक्रवार', short: 'शुक्र' },
    { en: 'Sat', native: 'शनिवार', short: 'शनि' }
  ],
  punjabi: [
    { en: 'Sun', native: 'ਐਤਵਾਰ', short: 'ਐਤ' },
    { en: 'Mon', native: 'ਸੋਮਵਾਰ', short: 'ਸੋਮ' },
    { en: 'Tue', native: 'ਮੰਗਲਵਾਰ', short: 'ਮੰਗਲ' },
    { en: 'Wed', native: 'ਬੁੱਧਵਾਰ', short: 'ਬੁੱਧ' },
    { en: 'Thu', native: 'ਵੀਰਵਾਰ', short: 'ਵੀਰ' },
    { en: 'Fri', native: 'ਸ਼ੁੱਕਰਵਾਰ', short: 'ਸ਼ੁੱਕਰ' },
    { en: 'Sat', native: 'ਸ਼ਨੀਵਾਰ', short: 'ਸ਼ਨੀ' }
  ],
  assamese: [
    { en: 'Sun', native: 'দেওবাৰ', short: 'দেও' },
    { en: 'Mon', native: 'সোমবাৰ', short: 'সোম' },
    { en: 'Tue', native: 'মঙলবাৰ', short: 'মঙল' },
    { en: 'Wed', native: 'বুধবাৰ', short: 'বুধ' },
    { en: 'Thu', native: 'বৃহস্পতিবাৰ', short: 'বৃহঃ' },
    { en: 'Fri', native: 'শুক্ৰবাৰ', short: 'শুক্ৰ' },
    { en: 'Sat', native: 'শনিবাৰ', short: 'শনি' }
  ]
};

// Regional Month mappings for 12 Gregorian months
export const REGIONAL_MONTH_MAPPINGS: Record<RegionalCalendarKey, RegionalMonthDetail[]> = {
  marathi: [
    { gregorianIndex: 0, gregorianName: 'January', regionalMasaEn: 'Pausha - Magha', regionalMasaNative: 'पौष - माघ', festivalsHighlight: 'मकर संक्रांत, षट्तिला एकादशी' },
    { gregorianIndex: 1, gregorianName: 'February', regionalMasaEn: 'Magha - Phalguna', regionalMasaNative: 'माघ - फाल्गुन', festivalsHighlight: 'महाशिवरात्री, विजया एकादशी' },
    { gregorianIndex: 2, gregorianName: 'March', regionalMasaEn: 'Phalguna - Chaitra', regionalMasaNative: 'फाल्गुन - चैत्र', festivalsHighlight: 'होळी, धुलीवंदन, गुढीपाडवा (नववर्ष)' },
    { gregorianIndex: 3, gregorianName: 'April', regionalMasaEn: 'Chaitra - Vaishakha', regionalMasaNative: 'चैत्र - वैशाख', festivalsHighlight: 'श्री रामनवमी, हनुमान जयंती, अक्षय्य तृतीया' },
    { gregorianIndex: 4, gregorianName: 'May', regionalMasaEn: 'Vaishakha - Jyeshtha', regionalMasaNative: 'वैशाख - ज्येष्ठ', festivalsHighlight: 'मोहिनी एकादशी, बुद्ध पौर्णिमा' },
    { gregorianIndex: 5, gregorianName: 'June', regionalMasaEn: 'Jyeshtha - Ashadha', regionalMasaNative: 'ज्येष्ठ - आषाढ', festivalsHighlight: 'वटपौर्णिमा, निर्जला एकादशी' },
    { gregorianIndex: 6, gregorianName: 'July', regionalMasaEn: 'Ashadha - Shravana', regionalMasaNative: 'आषाढ - श्रावण', festivalsHighlight: 'आषाढी एकादशी (पंढरपूर वारी), गुरुपौर्णिमा' },
    { gregorianIndex: 7, gregorianName: 'August', regionalMasaEn: 'Shravana - Bhadrapada', regionalMasaNative: 'श्रावण - भाद्रपद', festivalsHighlight: 'नागपंचमी, नारळी पौर्णिमा, गोकुळाष्टमी' },
    { gregorianIndex: 8, gregorianName: 'September', regionalMasaEn: 'Bhadrapada - Ashwin', regionalMasaNative: 'भाद्रपद - अश्विन', festivalsHighlight: 'गणेशोत्सव, अनंत चतुर्दशी, पितृपक्ष' },
    { gregorianIndex: 9, gregorianName: 'October', regionalMasaEn: 'Ashwin - Kartika', regionalMasaNative: 'अश्विन - कार्तिक', festivalsHighlight: 'घटस्थापना, दसरा, कोजागिरी, दिवाळी' },
    { gregorianIndex: 10, gregorianName: 'November', regionalMasaEn: 'Kartika - Margashirsha', regionalMasaNative: 'कार्तिक - मार्गशीर्ष', festivalsHighlight: 'भाऊबीज, तुळशी विवाह, कार्तिकी एकादशी' },
    { gregorianIndex: 11, gregorianName: 'December', regionalMasaEn: 'Margashirsha - Pausha', regionalMasaNative: 'मार्गशीर्ष - पौष', festivalsHighlight: 'मार्गशीर्ष गुरुवार, दत्त जयंती, मोक्षदा एकादशी' }
  ],
  gujarati: [
    { gregorianIndex: 0, gregorianName: 'January', regionalMasaEn: 'Posh - Maha', regionalMasaNative: 'પોષ - મહા', festivalsHighlight: 'ઉત્તરાયણ (પતંગોત્સવ), વાસી ઉત્તરાયણ' },
    { gregorianIndex: 1, gregorianName: 'February', regionalMasaEn: 'Maha - Fagan', regionalMasaNative: 'મહા - ફાગણ', festivalsHighlight: 'મહાશિવરાત્રી, જયા એકાદશી' },
    { gregorianIndex: 2, gregorianName: 'March', regionalMasaEn: 'Fagan - Chaitra', regionalMasaNative: 'ફાગણ - ચૈત્ર', festivalsHighlight: 'હોળી, ધુળેટી, ચેટી ચાંદ' },
    { gregorianIndex: 3, gregorianName: 'April', regionalMasaEn: 'Chaitra - Vaishakh', regionalMasaNative: 'ચૈત્ર - વૈશાખ', festivalsHighlight: 'રામ નવમી, મહાવીર જયંતી, અક્ષય તૃતીયા' },
    { gregorianIndex: 4, gregorianName: 'May', regionalMasaEn: 'Vaishakh - Jeth', regionalMasaNative: 'વૈશાખ - જેઠ', festivalsHighlight: 'નરસિંહ જયંતી, બુદ્ધ પૂર્ણિમા' },
    { gregorianIndex: 5, gregorianName: 'June', regionalMasaEn: 'Jeth - Ashadh', regionalMasaNative: 'જેઠ - અષાઢ', festivalsHighlight: 'વટ સાવિત્રી, ગંગા દશેરા' },
    { gregorianIndex: 6, gregorianName: 'July', regionalMasaEn: 'Ashadh - Shravan', regionalMasaNative: 'અષાઢ - શ્રાવણ', festivalsHighlight: 'જગન્નાથ રથયાત્રા, દેવપોઢી એકાદશી' },
    { gregorianIndex: 7, gregorianName: 'August', regionalMasaEn: 'Shravan - Bhadarvo', regionalMasaNative: 'શ્રાવણ - ભાદરવો', festivalsHighlight: 'જન્માષ્ટમી, રક્ષાબંધન, રાંધણ છઠ' },
    { gregorianIndex: 8, gregorianName: 'September', regionalMasaEn: 'Bhadarvo - Aaso', regionalMasaNative: 'ભાદરવો - આસો', festivalsHighlight: 'ગણેશ ચતુર્થી, શ્રાદ્ધ પક્ષ (પિતૃપક્ષ)' },
    { gregorianIndex: 9, gregorianName: 'October', regionalMasaEn: 'Aaso - Kartak', regionalMasaNative: 'આસો - કારતક', festivalsHighlight: 'નવરાત્રિ ગરબા, દશેરા, શરદ પૂનમ, દિવાળી' },
    { gregorianIndex: 10, gregorianName: 'November', regionalMasaEn: 'Kartak - Magshar', regionalMasaNative: 'કારતક - માગશર', festivalsHighlight: 'બેસતું વર્ષ (નવું વર્ષ), લાભ પાંચમ, દેવ દિવાળી' },
    { gregorianIndex: 11, gregorianName: 'December', regionalMasaEn: 'Magshar - Posh', regionalMasaNative: 'માગશર - પોષ', festivalsHighlight: 'ગીતા જયંતી, મોક્ષદા એકાદશી' }
  ],
  telugu: [
    { gregorianIndex: 0, gregorianName: 'January', regionalMasaEn: 'Pushyamu - Maghamu', regionalMasaNative: 'పుష్యము - మాఘము', festivalsHighlight: 'మకర సంక్రాంతి, భోగి, కనుమ' },
    { gregorianIndex: 1, gregorianName: 'February', regionalMasaEn: 'Maghamu - Phalgunamu', regionalMasaNative: 'మాఘము - ఫాల్గుణము', festivalsHighlight: 'మహా శివరాత్రి, భీష్మ ఏకాదశి' },
    { gregorianIndex: 2, gregorianName: 'March', regionalMasaEn: 'Phalgunamu - Chaitramu', regionalMasaNative: 'ఫాల్గుణము - చైత్రము', festivalsHighlight: 'ఉగాది (తెలుగు నూతన సంవత్సరం), హోలీ' },
    { gregorianIndex: 3, gregorianName: 'April', regionalMasaEn: 'Chaitramu - Vaishakhamu', regionalMasaNative: 'చైత్రము - వైశాఖము', festivalsHighlight: 'శ్రీరామ నవమి, హనుమాన్ జయంతి' },
    { gregorianIndex: 4, gregorianName: 'May', regionalMasaEn: 'Vaishakhamu - Jyeshthamu', regionalMasaNative: 'వైశాఖము - జ్యేష్ఠము', festivalsHighlight: 'నృసింహ జయంతి, అక్షయ తృతీయ' },
    { gregorianIndex: 5, gregorianName: 'June', regionalMasaEn: 'Jyeshthamu - Ashadhamu', regionalMasaNative: 'జ్యేష్ఠము - ఆషాఢము', festivalsHighlight: 'ఏరువాక పున్నమి, బోనాలు ఆరంభం' },
    { gregorianIndex: 6, gregorianName: 'July', regionalMasaEn: 'Ashadhamu - Shravanamu', regionalMasaNative: 'ఆషాఢము - శ్రావణము', festivalsHighlight: 'తొలి ఏకాదశి, గురు పౌర్ణమి, బోనాల జాతర' },
    { gregorianIndex: 7, gregorianName: 'August', regionalMasaEn: 'Shravanamu - Bhadrapadamu', regionalMasaNative: 'శ్రావణము - భాద్రపదము', festivalsHighlight: 'వరలక్ష్మీ వ్రతం, శ్రీ కృష్ణాష్టమి' },
    { gregorianIndex: 8, gregorianName: 'September', regionalMasaEn: 'Bhadrapadamu - Ashvayujamu', regionalMasaNative: 'భాద్రపదము - ఆశ్వయుజము', festivalsHighlight: 'వినాయక చవితి, బతుకమ్మ ఆరంభం' },
    { gregorianIndex: 9, gregorianName: 'October', regionalMasaEn: 'Ashvayujamu - Karthikamu', regionalMasaNative: 'ఆశ్వయుజము - కార్తీకము', festivalsHighlight: 'సద్దుల బతుకమ్మ, విజయదశమి, దీపావళి' },
    { gregorianIndex: 10, gregorianName: 'November', regionalMasaEn: 'Karthikamu - Margashiramu', regionalMasaNative: 'కార్తీకము - మార్గశిరము', festivalsHighlight: 'కార్తీక పౌర్ణమి, నాగుల చవితి, క్షీరాబ్ది ద్వాదశి' },
    { gregorianIndex: 11, gregorianName: 'December', regionalMasaEn: 'Margashiramu - Pushyamu', regionalMasaNative: 'మార్గశిరము - పుష్యము', festivalsHighlight: 'వైకుంఠ ఏకాదశి, ముక్కోటి ఏకాదశి' }
  ],
  tamil: [
    { gregorianIndex: 0, gregorianName: 'January', regionalMasaEn: 'Margazhi - Thai', regionalMasaNative: 'மார்கழி - தை', festivalsHighlight: 'தை பொங்கல், தைப்பூசம், மாட்டுப் பொங்கல்' },
    { gregorianIndex: 1, gregorianName: 'February', regionalMasaEn: 'Thai - Masi', regionalMasaNative: 'தை - மாசி', festivalsHighlight: 'மகா சிவராத்திரி, மாசி மகம்' },
    { gregorianIndex: 2, gregorianName: 'March', regionalMasaEn: 'Masi - Panguni', regionalMasaNative: 'மாசி - பங்குனி', festivalsHighlight: 'பங்குனி உத்திரம், காரடையான் நோன்பு' },
    { gregorianIndex: 3, gregorianName: 'April', regionalMasaEn: 'Panguni - Chittirai', regionalMasaNative: 'பங்குனி - சித்திரை', festivalsHighlight: 'தமிழ்ப் புத்தாண்டு (சித்திரை 1), சித்ரா பௌர்ணமி' },
    { gregorianIndex: 4, gregorianName: 'May', regionalMasaEn: 'Chittirai - Vaikasi', regionalMasaNative: 'சித்திரை - வைகாசி', festivalsHighlight: 'வைகாசி விசாகம், நரசிம்ம ஜெயந்தி' },
    { gregorianIndex: 5, gregorianName: 'June', regionalMasaEn: 'Vaikasi - Aani', regionalMasaNative: 'வைகாசி - ஆனி', festivalsHighlight: 'ஆனி உத்திரம், காரைக்கால் அம்மையார் மாங்கனி' },
    { gregorianIndex: 6, gregorianName: 'July', regionalMasaEn: 'Aani - Aadi', regionalMasaNative: 'ஆனி - ஆடி', festivalsHighlight: 'ஆடிப்பெருக்கு, ஆடி அமாவாசை, ஆடிப் பூரம்' },
    { gregorianIndex: 7, gregorianName: 'August', regionalMasaEn: 'Aadi - Aavani', regionalMasaNative: 'ஆடி - ஆவணி', festivalsHighlight: 'ஆவணி அவிட்டம், வரலட்சுமி விரதம், கோகுலாஷ்டமி' },
    { gregorianIndex: 8, gregorianName: 'September', regionalMasaEn: 'Aavani - Purattasi', regionalMasaNative: 'ஆவணி - புரட்டாசி', festivalsHighlight: 'விநாயகர் சதுர்த்தி, புரட்டாசி சனி விரதம்' },
    { gregorianIndex: 9, gregorianName: 'October', regionalMasaEn: 'Purattasi - Aippasi', regionalMasaNative: 'புரட்டாசி - ஐப்பசி', festivalsHighlight: 'நவராத்திரி, சரஸ்வதி பூஜை, விஜயதசமி, தீபாவளி' },
    { gregorianIndex: 10, gregorianName: 'November', regionalMasaEn: 'Aippasi - Karthigai', regionalMasaNative: 'ஐப்பசி - கார்த்திகை', festivalsHighlight: 'ஸ்கந்த சஷ்டி (சூரசம்ஹாரம்), கார்த்திகை தீபம்' },
    { gregorianIndex: 11, gregorianName: 'December', regionalMasaEn: 'Karthigai - Margazhi', regionalMasaNative: 'கார்த்திகை - மார்கழி', festivalsHighlight: 'வைகுண்ட ஏகாதசி, ஆருத்ரா தரிசனம்' }
  ],
  kannada: [
    { gregorianIndex: 0, gregorianName: 'January', regionalMasaEn: 'Pushya - Magha', regionalMasaNative: 'ಪುಷ್ಯ - ಮಾಘ', festivalsHighlight: 'ಮಕರ ಸಂಕ್ರಾಂತಿ (ಸುಗ್ಗಿ ಹಬ್ಬ)' },
    { gregorianIndex: 1, gregorianName: 'February', regionalMasaEn: 'Magha - Phalguna', regionalMasaNative: 'ಮಾಘ - ಫಾಲ್ಗುಣ', festivalsHighlight: 'ಮಹಾ ಶಿವರಾತ್ರಿ, ಭೀಷ್ಮ ಏಕಾದಶಿ' },
    { gregorianIndex: 2, gregorianName: 'March', regionalMasaEn: 'Phalguna - Chaitra', regionalMasaNative: 'ಫಾಲ್ಗುಣ - ಚೈತ್ರ', festivalsHighlight: 'ಯುಗಾದಿ (ಹೊಸ ವರ್ಷ), ಕಾಮನ ಹಬ್ಬ (ಹೋಳಿ)' },
    { gregorianIndex: 3, gregorianName: 'April', regionalMasaEn: 'Chaitra - Vaishakha', regionalMasaNative: 'ಚೈತ್ರ - ವೈಶಾಖ', festivalsHighlight: 'ಶ್ರೀ ರಾಮನವಮಿ, ಬೆಂಗಳೂರು ಕರಗ, ಹನುಮ ಜಯಂತಿ' },
    { gregorianIndex: 4, gregorianName: 'May', regionalMasaEn: 'Vaishakha - Jyeshtha', regionalMasaNative: 'ವೈಶಾಖ - ಜ್ಯೇಷ್ಠ', festivalsHighlight: 'ಅಕ್ಷಯ ತೃತೀಯ, ಬಸವ ಜಯಂತಿ' },
    { gregorianIndex: 5, gregorianName: 'June', regionalMasaEn: 'Jyeshtha - Ashadha', regionalMasaNative: 'ಜ್ಯೇಷ್ಠ - ಆಷಾಢ', festivalsHighlight: 'ವಟ ಸಾವಿತ್ರಿ ವ್ರತ' },
    { gregorianIndex: 6, gregorianName: 'July', regionalMasaEn: 'Ashadha - Shravana', regionalMasaNative: 'ಆಷಾಢ - ಶ್ರಾವಣ', festivalsHighlight: 'ಪ್ರಥಮ ಏಕಾದಶಿ, ಗುರು ಪೂರ್ಣಿಮಾ' },
    { gregorianIndex: 7, gregorianName: 'August', regionalMasaEn: 'Shravana - Bhadrapada', regionalMasaNative: 'ಶ್ರಾವಣ - ಭಾದ್ರಪದ', festivalsHighlight: 'ವರಮಹಾಲಕ್ಷ್ಮೀ ವ್ರತ, ಕೃಷ್ಣ ಜನ್ಮಾಷ್ಟಮಿ' },
    { gregorianIndex: 8, gregorianName: 'September', regionalMasaEn: 'Bhadrapada - Ashwayuja', regionalMasaNative: 'ಭಾದ್ರಪದ - ಆಶ್ವಯುಜ', festivalsHighlight: 'ಗೌರಿ ಹಬ್ಬ, ಗಣೇಶ ಚತುರ್ಥಿ' },
    { gregorianIndex: 9, gregorianName: 'October', regionalMasaEn: 'Ashwayuja - Karthika', regionalMasaNative: 'ಆಶ್ವಯುಜ - ಕಾರ್ತಿಕ', festivalsHighlight: 'ಮೈಸೂರು ದಸರಾ (ವಿಜಯದಶಮಿ), ದೀಪಾವಳಿ' },
    { gregorianIndex: 10, gregorianName: 'November', regionalMasaEn: 'Karthika - Margashira', regionalMasaNative: 'ಕಾರ್ತಿಕ - ಮಾರ್ಗಶಿರ', festivalsHighlight: 'ಬಲಿಪಾಡ್ಯಮಿ, ತುಳಸಿ ಪೂಜೆ, ಕಾರ್ತಿಕ ಪೂರ್ಣಿಮಾ' },
    { gregorianIndex: 11, gregorianName: 'December', regionalMasaEn: 'Margashira - Pushya', regionalMasaNative: 'ಮಾರ್ಗಶಿರ - ಪುಷ್ಯ', festivalsHighlight: 'ವೈಕುಂಠ ಏಕಾದಶಿ, ಸುಬ್ರಹ್ಮಣ್ಯ ಷಷ್ಠಿ' }
  ],
  bengali: [
    { gregorianIndex: 0, gregorianName: 'January', regionalMasaEn: 'Poush - Magh', regionalMasaNative: 'পৌষ - মাঘ', festivalsHighlight: 'পৌষ সংক্রান্তি, গঙ্গা সাগর মেলা' },
    { gregorianIndex: 1, gregorianName: 'February', regionalMasaEn: 'Magh - Falgun', regionalMasaNative: 'মাঘ - ফাল্গুন', festivalsHighlight: 'সরস্বতী পূজা (বসন্ত পঞ্চমী), মহাশিবরাত্রি' },
    { gregorianIndex: 2, gregorianName: 'March', regionalMasaEn: 'Falgun - Chaitra', regionalMasaNative: 'ফাল্গুন - চৈত্র', festivalsHighlight: 'দোলযাত্রা (বসন্তোৎসব), গৌর পূর্ণিমা' },
    { gregorianIndex: 3, gregorianName: 'April', regionalMasaEn: 'Chaitra - Boishakh', regionalMasaNative: 'চৈত্র - বৈশাখ', festivalsHighlight: 'পয়লা বৈশাখ (শুভ নববর্ষ ১৪৩৪), চড়ক পূজা' },
    { gregorianIndex: 4, gregorianName: 'May', regionalMasaEn: 'Boishakh - Joishtho', regionalMasaNative: 'বৈশাখ - জ্যৈষ্ঠ', festivalsHighlight: 'রবীন্দ্র জয়ন্তী, বুদ্ধ পূর্ণিমা' },
    { gregorianIndex: 5, gregorianName: 'June', regionalMasaEn: 'Joishtho - Ashar', regionalMasaNative: 'জ্যৈষ্ঠ - আষাঢ়', festivalsHighlight: 'জামাই ষষ্ঠী, স্নানযাত্রা' },
    { gregorianIndex: 6, gregorianName: 'July', regionalMasaEn: 'Ashar - Srabon', regionalMasaNative: 'আষাঢ় - শ্রাবণ', festivalsHighlight: 'রথযাত্রা, উল্টো রথ, গুরু পূর্ণিমা' },
    { gregorianIndex: 7, gregorianName: 'August', regionalMasaEn: 'Srabon - Bhadro', regionalMasaNative: 'শ্রাবণ - ভাদ্র', festivalsHighlight: 'ঝুলনযাত্রা, মনসা পূজা, জন্মাষ্টমী' },
    { gregorianIndex: 8, gregorianName: 'September', regionalMasaEn: 'Bhadro - Ashwin', regionalMasaNative: 'ভাদ্র - আশ্বিন', festivalsHighlight: 'বিশ্বকর্মা পূজা, মহালয়া' },
    { gregorianIndex: 9, gregorianName: 'October', regionalMasaEn: 'Ashwin - Kartik', regionalMasaNative: 'আশ্বিন - কার্তিক', festivalsHighlight: 'শ্রী শ্রী দুর্গোৎসব (মহাসপ্তমী-দশমী), কোজাগরী লক্ষ্মী পূজা, কালীপূজা' },
    { gregorianIndex: 10, gregorianName: 'November', regionalMasaEn: 'Kartik - Aghrohayon', regionalMasaNative: 'কার্তিক - অগ্রহায়ণ', festivalsHighlight: 'ভ্রাতৃদ্বিতীয়া (ভাইফোঁটা), জগদ্ধাত্রী পূজা, রাসযাত্রা' },
    { gregorianIndex: 11, gregorianName: 'December', regionalMasaEn: 'Aghrohayon - Poush', regionalMasaNative: 'অগ্রহায়ণ - পৌষ', festivalsHighlight: 'নবান্ন উৎসব, গীতা জয়ন্তী' }
  ],
  malayalam: [
    { gregorianIndex: 0, gregorianName: 'January', regionalMasaEn: 'Dhanu - Makaram', regionalMasaNative: 'ധനു - മകരം', festivalsHighlight: 'മകരവിളക്ക് (ശബരിമല), തൈപ്പൂയം' },
    { gregorianIndex: 1, gregorianName: 'February', regionalMasaEn: 'Makaram - Kumbham', regionalMasaNative: 'മകരം - കുംഭം', festivalsHighlight: 'മഹാശിവരാത്രി, ആറ്റുകാൽ പൊങ്കാല' },
    { gregorianIndex: 2, gregorianName: 'March', regionalMasaEn: 'Kumbham - Meenam', regionalMasaNative: 'കുംഭം - മീനം', festivalsHighlight: 'ആറാട്ട്, മീനഭരണി' },
    { gregorianIndex: 3, gregorianName: 'April', regionalMasaEn: 'Meenam - Medam', regionalMasaNative: 'മീനം - മേടം', festivalsHighlight: 'വിഷു (മേട സംക്രമം), തൃശൂർ പൂരം' },
    { gregorianIndex: 4, gregorianName: 'May', regionalMasaEn: 'Medam - Edavam', regionalMasaNative: 'മേടം - ഇടവം', festivalsHighlight: 'ശങ്കര ജയന്തി, ബുദ്ധപൂർണിമ' },
    { gregorianIndex: 5, gregorianName: 'June', regionalMasaEn: 'Edavam - Mithunam', regionalMasaNative: 'ഇടവം - മിഥുനം', festivalsHighlight: 'ഓച്ചിറക്കളി' },
    { gregorianIndex: 6, gregorianName: 'July', regionalMasaEn: 'Mithunam - Karkidakam', regionalMasaNative: 'മിഥുനം - കർക്കടകം', festivalsHighlight: 'കർക്കിടക വാവ് ബലി, രാമായണ മാസാചരണം' },
    { gregorianIndex: 7, gregorianName: 'August', regionalMasaEn: 'Karkidakam - Chingam', regionalMasaNative: 'കർക്കടകം - ചിങ്ങം', festivalsHighlight: 'ചിങ്ങം 1 (കൊല്ലവർഷാരംഭം), ശ്രീകൃഷ്ണ ജയന്തി' },
    { gregorianIndex: 8, gregorianName: 'September', regionalMasaEn: 'Chingam - Kanni', regionalMasaNative: 'ചിങ്ങം - കന്നി', festivalsHighlight: 'തിരുവോണം (ഓണം), വിനായക ചതുർത്ഥി' },
    { gregorianIndex: 9, gregorianName: 'October', regionalMasaEn: 'Kanni - Thulam', regionalMasaNative: 'കന്നി - തുലാം', festivalsHighlight: 'നവരാത്രി, ആയുധപൂജ, വിദ്യാരംഭം' },
    { gregorianIndex: 10, gregorianName: 'November', regionalMasaEn: 'Thulam - Vrischikam', regionalMasaNative: 'തുലാം - വൃശ്ചികം', festivalsHighlight: 'മണ്ഡലകാലാരംഭം, ദീപാവലി' },
    { gregorianIndex: 11, gregorianName: 'December', regionalMasaEn: 'Vrischikam - Dhanu', regionalMasaNative: 'വൃശ്ചികം - ധനു', festivalsHighlight: 'ഗുരുവായൂർ ഏകാദശി, തിരുവാതിര' }
  ],
  odia: [
    { gregorianIndex: 0, gregorianName: 'January', regionalMasaEn: 'Pousha - Magha', regionalMasaNative: 'ପୌଷ - ମାଘ', festivalsHighlight: 'ମକର ସଂକ୍ରାନ୍ତି, ତ୍ରିବେଣୀ ଅମାବାସ୍ୟା' },
    { gregorianIndex: 1, gregorianName: 'February', regionalMasaEn: 'Magha - Phalguna', regionalMasaNative: 'ମାଘ - ଫାଲ୍ଗୁନ', festivalsHighlight: 'ମାଘ ସପ୍ତମୀ (ଚନ୍ଦ୍ରଭାଗା), ଜାଗର (ମହାଶିବରାତ୍ରି)' },
    { gregorianIndex: 2, gregorianName: 'March', regionalMasaEn: 'Phalguna - Chaitra', regionalMasaNative: 'ଫାଲ୍ଗୁନ - ଚୈତ୍ର', festivalsHighlight: 'ଦୋଳ ପୂର୍ଣ୍ଣିମା, ହୋଲି' },
    { gregorianIndex: 3, gregorianName: 'April', regionalMasaEn: 'Chaitra - Baisakha', regionalMasaNative: 'ଚୈତ୍ର - ବୈଶାଖ', festivalsHighlight: 'ମହା ବିଷୁବ ସଂକ୍ରାନ୍ତି (ପଣା ସଂକ୍ରାନ୍ତି / ଓଡ଼ିଆ ନବବର୍ଷ), ରାମନବମୀ' },
    { gregorianIndex: 4, gregorianName: 'May', regionalMasaEn: 'Baisakha - Jyeshtha', regionalMasaNative: 'ବୈଶାଖ - ଜ୍ୟେଷ୍ଠ', festivalsHighlight: 'ଅକ୍ଷୟ ତୃତୀୟା (ରଥ ଅନୁକୂଳ), ଚନ୍ଦନ ଯାତ୍ରା' },
    { gregorianIndex: 5, gregorianName: 'June', regionalMasaEn: 'Jyeshtha - Ashadha', regionalMasaNative: 'ଜ୍ୟେଷ୍ଠ - ଆଷାଢ଼', festivalsHighlight: 'ଦେବସ୍ନାନ ପୂର୍ଣ୍ଣିମା, ରଜ ପର୍ବ' },
    { gregorianIndex: 6, gregorianName: 'July', regionalMasaEn: 'Ashadha - Shravana', regionalMasaNative: 'ଆଷାଢ଼ - ଶ୍ରାବଣ', festivalsHighlight: 'ପୁରୀ ରଥଯାତ୍ରା, ବାହୁଡ଼ା ଯାତ୍ରା, ସୁନାବେଶ' },
    { gregorianIndex: 7, gregorianName: 'August', regionalMasaEn: 'Shravana - Bhadraba', regionalMasaNative: 'ଶ୍ରାବଣ - ଭାଦ୍ରବ', festivalsHighlight: 'ଚିତାଲାଗି ଅମାବାସ୍ୟା, ଝୁଲଣ ଯାତ୍ରା, ଜନ୍ମାଷ୍ଟମୀ' },
    { gregorianIndex: 8, gregorianName: 'September', regionalMasaEn: 'Bhadraba - Aswina', regionalMasaNative: 'ଭାଦ୍ରବ - ଆଶ୍ୱିନ', festivalsHighlight: 'ଗଣେଶ ପୂଜା, ନୂଆଖାଇ (ପଶ୍ଚିମ ଓଡ଼ିଶା)' },
    { gregorianIndex: 9, gregorianName: 'October', regionalMasaEn: 'Aswina - Kartika', regionalMasaNative: 'ଆଶ୍ୱିନ - କାର୍ତ୍ତିକ', festivalsHighlight: 'ଦୁର୍ଗାପୂଜା, କୁମାର ପୂର୍ଣ୍ଣିମା, କାଳୀପୂଜା, ଦୀପାବଳି' },
    { gregorianIndex: 10, gregorianName: 'November', regionalMasaEn: 'Kartika - Margasira', regionalMasaNative: 'କାର୍ତ୍ତିକ - ମାର୍ଗଶିର', festivalsHighlight: 'ରାହାସ ପୂର୍ଣ୍ଣିମା (ବୋଇତ ବନ୍ଦାଣ), ପ୍ରଥମାଷ୍ଟମୀ' },
    { gregorianIndex: 11, gregorianName: 'December', regionalMasaEn: 'Margasira - Pousha', regionalMasaNative: 'ମାର୍ଗଶିର - ପୌଷ', festivalsHighlight: 'ମାଣବସା ଗୁରୁବାର, ଧନୁ ସଂକ୍ରାନ୍ତି' }
  ],
  hindi: [
    { gregorianIndex: 0, gregorianName: 'January', regionalMasaEn: 'Pausha - Magha', regionalMasaNative: 'पौष - माघ', festivalsHighlight: 'मकर संक्रांति, षट्तिला एकादशी' },
    { gregorianIndex: 1, gregorianName: 'February', regionalMasaEn: 'Magha - Phalguna', regionalMasaNative: 'माघ - फाल्गुन', festivalsHighlight: 'बसंत पंचमी, महाशिवरात्रि' },
    { gregorianIndex: 2, gregorianName: 'March', regionalMasaEn: 'Phalguna - Chaitra', regionalMasaNative: 'फाल्गुन - चैत्र', festivalsHighlight: 'होलिका दहन, होली, चैत्र नवरात्र आरंभ' },
    { gregorianIndex: 3, gregorianName: 'April', regionalMasaEn: 'Chaitra - Vaishakha', regionalMasaNative: 'चैत्र - वैशाख', festivalsHighlight: 'राम नवमी, हनुमान जयंती, अक्षय तृतीया' },
    { gregorianIndex: 4, gregorianName: 'May', regionalMasaEn: 'Vaishakha - Jyeshtha', regionalMasaNative: 'वैशाख - ज्येष्ठ', festivalsHighlight: 'मोहिनी एकादशी, बुद्ध पूर्णिमा' },
    { gregorianIndex: 5, gregorianName: 'June', regionalMasaEn: 'Jyeshtha - Ashadha', regionalMasaNative: 'ज्येष्ठ - आषाढ़', festivalsHighlight: 'गंगा दशहरा, निर्जला एकादशी' },
    { gregorianIndex: 6, gregorianName: 'July', regionalMasaEn: 'Ashadha - Shravana', regionalMasaNative: 'आषाढ़ - श्रावण', festivalsHighlight: 'देवशयनी एकादशी, गुरु पूर्णिमा, सावन सोमवार' },
    { gregorianIndex: 7, gregorianName: 'August', regionalMasaEn: 'Shravana - Bhadrapada', regionalMasaNative: 'श्रावण - भाद्रपद', festivalsHighlight: 'नाग पंचमी, रक्षाबंधन, कजरी तीज, श्री कृष्ण जन्माष्टमी' },
    { gregorianIndex: 8, gregorianName: 'September', regionalMasaEn: 'Bhadrapada - Ashwin', regionalMasaNative: 'भाद्रपद - अश्विन', festivalsHighlight: 'हरतालिका तीज, गणेश जन्मोत्सव, अनंत चतुर्दशी, पितृपक्ष' },
    { gregorianIndex: 9, gregorianName: 'October', regionalMasaEn: 'Ashwin - Kartika', regionalMasaNative: 'अश्विन - कार्तिक', festivalsHighlight: 'शारदीय नवरात्रि, दशहरा, करवा चौथ, अहोई अष्टमी, धनतेरस, दिवाली' },
    { gregorianIndex: 10, gregorianName: 'November', regionalMasaEn: 'Kartika - Margashirsha', regionalMasaNative: 'कार्तिक - मार्गशीर्ष', festivalsHighlight: 'गोवर्धन पूजा, भाई दूज, छठ पूजा, देवउठनी एकादशी' },
    { gregorianIndex: 11, gregorianName: 'December', regionalMasaEn: 'Margashirsha - Pausha', regionalMasaNative: 'मार्गशीर्ष - पौष', festivalsHighlight: 'गीता जयंती, मोक्षदा एकादशी' }
  ],
  punjabi: [
    { gregorianIndex: 0, gregorianName: 'January', regionalMasaEn: 'Poh - Magh', regionalMasaNative: 'ਪੋਹ - ਮਾਘ', festivalsHighlight: 'ਲੋਹੜੀ, ਮਾਘੀ' },
    { gregorianIndex: 1, gregorianName: 'February', regionalMasaEn: 'Magh - Phaggan', regionalMasaNative: 'ਮਾਘ - ਫੱਗਣ', festivalsHighlight: 'ਬਸੰਤ ਪੰਚਮੀ, ਮਹਾਸ਼ਿਵਰਾਤਰੀ' },
    { gregorianIndex: 2, gregorianName: 'March', regionalMasaEn: 'Phaggan - Chet', regionalMasaNative: 'ਫੱਗਣ - ਚੇਤ', festivalsHighlight: 'ਹੋਲਾ ਮਹੱਲਾ (ਅਨੰਦਪੁਰ ਸਾਹਿਬ), ਹੋਲੀ' },
    { gregorianIndex: 3, gregorianName: 'April', regionalMasaEn: 'Chet - Vaisakh', regionalMasaNative: 'ਚੇਤ - ਵਿਸਾਖ', festivalsHighlight: 'ਵਿਸਾਖੀ (ਖਾਲਸਾ ਸਾਜਨਾ ਦਿਵਸ), ਰਾਮ ਨੌਮੀ' },
    { gregorianIndex: 4, gregorianName: 'May', regionalMasaEn: 'Vaisakh - Jeth', regionalMasaNative: 'ਵਿਸਾਖ - ਜੇਠ', festivalsHighlight: 'ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਸ਼ਹੀਦੀ ਦਿਹਾੜਾ' },
    { gregorianIndex: 5, gregorianName: 'June', regionalMasaEn: 'Jeth - Harh', regionalMasaNative: 'ਜੇਠ - ਹਾੜ', festivalsHighlight: 'ਨਿਰਜਲਾ ਇਕਾਦਸ਼ੀ' },
    { gregorianIndex: 6, gregorianName: 'July', regionalMasaEn: 'Harh - Sawan', regionalMasaNative: 'ਹਾੜ - ਸਾਵਣ', festivalsHighlight: 'ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ' },
    { gregorianIndex: 7, gregorianName: 'August', regionalMasaEn: 'Sawan - Bhadon', regionalMasaNative: 'ਸਾਵਣ - ਭਾਦੋਂ', festivalsHighlight: 'ਰੱਖੜੀ (ਰਕਸ਼ਾਬੰਧਨ), ਤੀਆਂ' },
    { gregorianIndex: 8, gregorianName: 'September', regionalMasaEn: 'Bhadon - Assu', regionalMasaNative: 'ਭਾਦੋਂ - ਅੱਸੂ', festivalsHighlight: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ' },
    { gregorianIndex: 9, gregorianName: 'October', regionalMasaEn: 'Assu - Katak', regionalMasaNative: 'ਅੱਸੂ - ਕੱਤਕ', festivalsHighlight: 'ਦੁਸਹਿਰਾ, ਬੰਦੀ ਛੋੜ ਦਿਵਸ, ਦੀਵਾਲੀ' },
    { gregorianIndex: 10, gregorianName: 'November', regionalMasaEn: 'Katak - Magghar', regionalMasaNative: 'ਕੱਤਕ - ਮੱਘਰ', festivalsHighlight: 'ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ' },
    { gregorianIndex: 11, gregorianName: 'December', regionalMasaEn: 'Magghar - Poh', regionalMasaNative: 'ਮੱਘਰ - ਪੋਹ', festivalsHighlight: 'ਛੋਟੇ ਅਤੇ ਵੱਡੇ ਸਾਹਿਬਜ਼ਾਦਿਆਂ ਦਾ ਸ਼ਹੀਦੀ ਸਪਤਾਹ' }
  ],
  assamese: [
    { gregorianIndex: 0, gregorianName: 'January', regionalMasaEn: 'Puh - Magh', regionalMasaNative: 'পুহ - মাঘ', festivalsHighlight: 'মাঘ বিহু (ভোগালী বিহু)' },
    { gregorianIndex: 1, gregorianName: 'February', regionalMasaEn: 'Magh - Fagun', regionalMasaNative: 'মাঘ - ফাগুন', festivalsHighlight: 'সৰস্বতী পূজা, শিৱৰাত্ৰি' },
    { gregorianIndex: 2, gregorianName: 'March', regionalMasaEn: 'Fagun - Sot', regionalMasaNative: 'ফাগুন - চ’ত', festivalsHighlight: 'দৌল যাত্ৰা (হোলি)' },
    { gregorianIndex: 3, gregorianName: 'April', regionalMasaEn: 'Sot - Bohag', regionalMasaNative: 'চ’ত - ব’হাগ', festivalsHighlight: 'ব’হাগ বিহু (ৰঙালী বিহু / অসমীয়া নৱবৰ্ষ)' },
    { gregorianIndex: 4, gregorianName: 'May', regionalMasaEn: 'Bohag - Jeth', regionalMasaNative: 'ব’হাগ - জেঠ', festivalsHighlight: 'বুদ্ধ পূৰ্ণিমা' },
    { gregorianIndex: 5, gregorianName: 'June', regionalMasaEn: 'Jeth - Ahar', regionalMasaNative: 'জেঠ - আহাৰ', festivalsHighlight: 'অম্বুবাচী মেলা (কামাখ্যা ধাম)' },
    { gregorianIndex: 6, gregorianName: 'July', regionalMasaEn: 'Ahar - Saun', regionalMasaNative: 'আহাৰ - শাওণ', festivalsHighlight: 'গুৰু পূৰ্ণিমা' },
    { gregorianIndex: 7, gregorianName: 'August', regionalMasaEn: 'Saun - Bhada', regionalMasaNative: 'শাওণ - ভাদ', festivalsHighlight: 'শ্ৰীকৃষ্ণ জন্মাষ্টমী, শ্ৰীমন্ত শংকৰদেৱৰ তিথি' },
    { gregorianIndex: 8, gregorianName: 'September', regionalMasaEn: 'Bhada - Ahin', regionalMasaNative: 'ভাদ - আহিন', festivalsHighlight: 'মাধৱদেৱৰ তিৰোভাৱ তিথি' },
    { gregorianIndex: 9, gregorianName: 'October', regionalMasaEn: 'Ahin - Kati', regionalMasaNative: 'আহিন - কাতি', festivalsHighlight: 'দুৰ্গাপূজা, কাতি বিহু (কঙালী বিহু), লক্ষ্মী পূজা' },
    { gregorianIndex: 10, gregorianName: 'November', regionalMasaEn: 'Kati - Aghon', regionalMasaNative: 'কাতি - আঘোণ', festivalsHighlight: 'দীপাৱলী, ৰাস মহোৎসৱ (মাজুলী)' },
    { gregorianIndex: 11, gregorianName: 'December', regionalMasaEn: 'Aghon - Puh', regionalMasaNative: 'আঘোণ - পুহ', festivalsHighlight: 'ন-খোৱা উৎসৱ' }
  ]
};

// Map of Indic numerals for 12 languages/scripts
export const INDIC_DIGITS: Record<string, string[]> = {
  odia: ['୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯'],
  or: ['୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯'],
  bengali: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
  bn: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
  assamese: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
  as: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
  gujarati: ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'],
  gu: ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'],
  telugu: ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'],
  te: ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'],
  tamil: ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯'],
  ta: ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯'],
  kannada: ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯'],
  kn: ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯'],
  malayalam: ['൦', '൧', '൨', '൩', '൪', '൫', '൬', '൭', '൮', '൯'],
  ml: ['൦', '൧', '൨', '൩', '൪', '൫', '൬', '൭', '൮', '൯'],
  marathi: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  mr: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  hindi: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  hi: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  punjabi: ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'],
  pa: ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯']
};

export function getRegionalDigits(num: number | string, regionOrLang: string): string {
  const digits = INDIC_DIGITS[regionOrLang.toLowerCase()] || INDIC_DIGITS.hindi;
  return String(num).replace(/[0-9]/g, (digit) => digits[parseInt(digit, 10)] || digit);
}

// Regional Tithi representation generator
export function getRegionalTithiDisplay(
  tithiName: string,
  paksha: 'Shukla' | 'Krishna',
  regionKey: RegionalCalendarKey
): { short: string; full: string; badge?: string } {
  const isShukla = paksha === 'Shukla';

  // Standard numbers for Pratipada(1)..Chaturdashi(14), Purnima(15), Amavasya(30)
  const tithiMap: Record<string, number> = {
    Pratipada: 1, Dwitiya: 2, Tritiya: 3, Chaturthi: 4, Panchami: 5,
    Shashthi: 6, Saptami: 7, Ashtami: 8, Navami: 9, Dashami: 10,
    Ekadashi: 11, Dwadashi: 12, Trayodashi: 13, Chaturdashi: 14,
    Purnima: 15, Amavasya: 30
  };

  const num = tithiMap[tithiName] || 1;
  const isPurnima = tithiName === 'Purnima';
  const isAmavasya = tithiName === 'Amavasya';
  const isEkadashi = tithiName === 'Ekadashi';
  const nativeNum = getRegionalDigits(num, regionKey);

  if (regionKey === 'marathi') {
    if (isPurnima) return { short: 'पौर्णिमा', full: 'पौर्णिमा', badge: 'पौर्णिमा' };
    if (isAmavasya) return { short: 'अमावास्या', full: 'अमावास्या', badge: 'अमावास्या' };
    const prefix = isShukla ? 'शु.' : 'कृ.';
    const badge = isEkadashi ? 'एकादशी' : undefined;
    return {
      short: `${prefix} ${nativeNum}`,
      full: `${isShukla ? 'शुक्ल' : 'कृष्ण'} ${tithiName === 'Pratipada' ? 'पाडवा' : tithiName}`,
      badge
    };
  }

  if (regionKey === 'gujarati') {
    if (isPurnima) return { short: 'પૂનમ', full: 'શુદ્ધ પૂનમ', badge: 'પૂનમ' };
    if (isAmavasya) return { short: 'અમાસ', full: 'વદ અમાસ', badge: 'અમાસ' };
    const prefix = isShukla ? 'સુદ' : 'વદ';
    const badge = isEkadashi ? 'અગિયારસ' : undefined;
    const gujNames: Record<number, string> = {
      1: 'એકમ', 2: 'બીજ', 3: 'ત્રીજ', 4: 'ચોથ', 5: 'પાંચમ', 6: 'છઠ',
      7: 'સાતમ', 8: 'આઠમ', 9: 'નોમ', 10: 'દસમ', 11: 'અગિયારસ',
      12: 'બારસ', 13: 'તેરસ', 14: 'ચૌદશ'
    };
    const nameStr = gujNames[num] || nativeNum;
    return {
      short: `${prefix} ${nativeNum}`,
      full: `${prefix} ${nameStr}`,
      badge
    };
  }

  if (regionKey === 'telugu') {
    if (isPurnima) return { short: 'పౌర్ణమి', full: 'శుద్ధ పౌర్ణమి', badge: 'పౌర్ణమి' };
    if (isAmavasya) return { short: 'అమావాస్య', full: 'బహుళ అమావాస్య', badge: 'అమావాస్య' };
    const prefix = isShukla ? 'శు.' : 'బ.';
    const badge = isEkadashi ? 'ఏకాదశి' : undefined;
    const telNames: Record<number, string> = {
      1: 'పాడ్యమి', 2: 'విదియ', 3: 'తదియ', 4: 'చవితి', 5: 'పంచమి', 6: 'షష్ఠి',
      7: 'సప్తమి', 8: 'అష్టమి', 9: 'నవమి', 10: 'దశమి', 11: 'ఏకాదశి',
      12: 'ద్వాదశి', 13: 'త్రయోదశి', 14: 'చతుర్దశి'
    };
    return {
      short: `${prefix} ${nativeNum}`,
      full: `${isShukla ? 'శుక్ల' : 'కృష్ణ'} ${telNames[num] || nativeNum}`,
      badge
    };
  }

  if (regionKey === 'tamil') {
    if (isPurnima) return { short: 'பௌர்ணமி', full: 'பௌர்ணமி', badge: 'பௌர்ணமி' };
    if (isAmavasya) return { short: 'அமாவாசை', full: 'அமாவாசை', badge: 'அமாவாசை' };
    const prefix = isShukla ? 'வள.' : 'தேய்.';
    const badge = isEkadashi ? 'ஏகாதசி' : undefined;
    const tamNames: Record<number, string> = {
      1: 'பிரதமை', 2: 'துவிதியை', 3: 'திருதியை', 4: 'சதுர்த்தி', 5: 'பஞ்சமி', 6: 'சஷ்டி',
      7: 'சப்தமி', 8: 'அஷ்டமி', 9: 'நவமி', 10: 'தசமி', 11: 'ஏகாதசி',
      12: 'துவாதசி', 13: 'திரயோதசி', 14: 'சதுர்தசி'
    };
    return {
      short: `${prefix} ${nativeNum}`,
      full: `${isShukla ? 'வளர்பிறை' : 'தேய்பிறை'} ${tamNames[num] || nativeNum}`,
      badge
    };
  }

  if (regionKey === 'kannada') {
    if (isPurnima) return { short: 'ಹುಣ್ಣಿಮೆ', full: 'ಹುಣ್ಣಿಮೆ', badge: 'ಹುಣ್ಣಿಮೆ' };
    if (isAmavasya) return { short: 'ಅಮಾವಾಸ್ಯೆ', full: 'ಅಮಾವಾಸ್ಯೆ', badge: 'ಅಮಾವಾಸ್ಯೆ' };
    const prefix = isShukla ? 'ಶು.' : 'ಕೃ.';
    const badge = isEkadashi ? 'ಏಕಾದಶಿ' : undefined;
    const knNames: Record<number, string> = {
      1: 'ಪಾಡ್ಯ', 2: 'ಬಿದಿಗೆ', 3: 'ತದಿಗೆ', 4: 'ಚೌತಿ', 5: 'ಪಂಚಮಿ', 6: 'ಷಷ್ಠಿ',
      7: 'ಸಪ್ತಮಿ', 8: 'ಅಷ್ಟಮಿ', 9: 'ನವಮಿ', 10: 'ದಶಮಿ', 11: 'ಏಕಾದಶಿ',
      12: 'ದ್ವಾದಶಿ', 13: 'ತ್ರಯೋದಶಿ', 14: 'ಚತುರ್ದಶಿ'
    };
    return {
      short: `${prefix} ${nativeNum}`,
      full: `${isShukla ? 'ಶುಕ್ಲ' : 'ಕೃಷ್ಣ'} ${knNames[num] || nativeNum}`,
      badge
    };
  }

  if (regionKey === 'bengali') {
    if (isPurnima) return { short: 'পূর্ণিমা', full: 'পূর্ণিমা', badge: 'পূর্ণিমা' };
    if (isAmavasya) return { short: 'অমাবস্যা', full: 'অমাবস্যা', badge: 'অমাবস্যা' };
    const prefix = isShukla ? 'শু.' : 'কৃ.';
    const badge = isEkadashi ? 'একাদশী' : undefined;
    const bnNames: Record<number, string> = {
      1: 'প্রতিপদ', 2: 'দ্বিতীয়া', 3: 'তৃতীয়া', 4: 'চতুর্থী', 5: 'পঞ্চমী', 6: 'ষষ্ঠী',
      7: 'সপ্তমী', 8: 'অষ্টমী', 9: 'নবমী', 10: 'দশমী', 11: 'একাদশী',
      12: 'দ্বাদশী', 13: 'ত্রয়োদশী', 14: 'চতুর্দশী'
    };
    return {
      short: `${prefix} ${nativeNum}`,
      full: `${isShukla ? 'শুক্ল' : 'কৃষ্ণ'} ${bnNames[num] || nativeNum}`,
      badge
    };
  }

  if (regionKey === 'odia') {
    if (isPurnima) return { short: 'ପୂର୍ଣ୍ଣିମା', full: 'ପୂର୍ଣ୍ଣିମା', badge: 'ପୂର୍ଣ୍ଣିମା' };
    if (isAmavasya) return { short: 'ଅମାବାସ୍ୟା', full: 'ଅମାବାସ୍ୟା', badge: 'ଅମାବାସ୍ୟା' };
    const prefix = isShukla ? 'ଶୁ.' : 'କୃ.';
    const badge = isEkadashi ? 'ଏକାଦଶୀ' : undefined;
    const orNames: Record<number, string> = {
      1: 'ପ୍ରତିପଦା', 2: 'ଦ୍ୱିତୀୟା', 3: 'ତୃତୀୟା', 4: 'ଚତୁର୍ଥୀ', 5: 'ପଞ୍ଚମୀ', 6: 'ଷଷ୍ଠୀ',
      7: 'ସପ୍ତମୀ', 8: 'ଅଷ୍ଟମୀ', 9: 'ନବମୀ', 10: 'ଦଶମୀ', 11: 'ଏକାଦଶୀ',
      12: 'ଦ୍ୱାଦଶୀ', 13: 'ତ୍ରୟୋଦଶୀ', 14: 'ଚତୁର୍ଦ୍ଦଶୀ'
    };
    return {
      short: `${prefix} ${nativeNum}`,
      full: `${isShukla ? 'ଶୁକ୍ଳ' : 'କୃଷ୍ଣ'} ${orNames[num] || nativeNum}`,
      badge
    };
  }

  if (regionKey === 'malayalam') {
    if (isPurnima) return { short: 'പൗർണ്ണമി', full: 'പൗർണ്ണമി', badge: 'പൗർണ്ണമി' };
    if (isAmavasya) return { short: 'അമാവാസി', full: 'അമാവാസി (വാവ്)', badge: 'അമാവാസി' };
    const prefix = isShukla ? 'ശു.' : 'കൃ.';
    const badge = isEkadashi ? 'ഏകാദശി' : undefined;
    const mlNames: Record<number, string> = {
      1: 'പ്രഥമ', 2: 'ദ്വിതീയ', 3: 'തൃതീയ', 4: 'ചതുർത്ഥി', 5: 'പഞ്ചമി', 6: 'ഷഷ്ഠി',
      7: 'സപ്തമി', 8: 'അഷ്ടമി', 9: 'നവമി', 10: 'ദശമി', 11: 'ഏകാദശി',
      12: 'ദ്വാദശി', 13: 'ത്രയോദശി', 14: 'ചതുർദ്ദശി'
    };
    return {
      short: `${prefix} ${nativeNum}`,
      full: `${isShukla ? 'ശുക്ല' : 'കൃഷ്ണ'} ${mlNames[num] || nativeNum}`,
      badge
    };
  }

  if (regionKey === 'punjabi') {
    if (isPurnima) return { short: 'ਪੂਰਨਮਾਸ਼ੀ', full: 'ਪੂਰਨਮਾਸ਼ੀ', badge: 'ਪੂਰਨਮਾਸ਼ੀ' };
    if (isAmavasya) return { short: 'ਮੱਸਿਆ', full: 'ਮੱਸਿਆ', badge: 'ਮੱਸਿਆ' };
    const prefix = isShukla ? 'ਸ਼ੁ.' : 'ਕ੍ਰਿ.';
    const badge = isEkadashi ? 'ਇਕਾਦਸ਼ੀ' : undefined;
    return {
      short: `${prefix} ${nativeNum}`,
      full: `${isShukla ? 'ਸ਼ੁਕਲ' : 'ਕ੍ਰਿਸ਼ਨ'} ਪੱਖ ਤਿਥੀ ${nativeNum}`,
      badge
    };
  }

  if (regionKey === 'assamese') {
    if (isPurnima) return { short: 'পূৰ্ণিমা', full: 'পূৰ্ণিমা', badge: 'পূৰ্ণিমা' };
    if (isAmavasya) return { short: 'অমাৱস্যা', full: 'অমাৱস্যা', badge: 'অমাৱস্যা' };
    const prefix = isShukla ? 'শু.' : 'কৃ.';
    const badge = isEkadashi ? 'একাদশী' : undefined;
    const asNames: Record<number, string> = {
      1: 'প্ৰতিপদ', 2: 'দ্বিতীয়া', 3: 'তৃতীয়া', 4: 'চতুৰ্থী', 5: 'পঞ্চমী', 6: 'ষষ্ঠী',
      7: 'সপ্তমী', 8: 'অষ্টমী', 9: 'নৱমী', 10: 'দশমী', 11: 'একাদশী',
      12: 'দ্বাদশী', 13: 'ত্ৰয়োদশী', 14: 'চতুৰ্দ্দশী'
    };
    return {
      short: `${prefix} ${nativeNum}`,
      full: `${isShukla ? 'শুক্ল' : 'কৃষ্ণ'} ${asNames[num] || nativeNum}`,
      badge
    };
  }

  // Default Devanagari / Hindi
  if (isPurnima) return { short: 'पूर्णिमा', full: 'पूर्णिमा', badge: 'पूर्णिमा' };
  if (isAmavasya) return { short: 'अमावस्या', full: 'अमावस्या', badge: 'अमावस्या' };
  const prefix = isShukla ? 'शु.' : 'कृ.';
  return {
    short: `${prefix} ${nativeNum}`,
    full: `${isShukla ? 'शुक्ल' : 'कृष्ण'} ${tithiName}`,
    badge: isEkadashi ? 'एकादशी' : undefined
  };
}
