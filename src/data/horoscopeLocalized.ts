import { LanguageCode } from '../types';

export interface LocalizedRashiPrediction {
  general: string;
  career: string;
  love: string;
  health: string;
  weekly: string;
  luckyColor: string;
  luckyNumber: string;
  luckyTime: string;
}

export const RASHI_LOCALIZED_PREDICTIONS: Record<string, Partial<Record<LanguageCode, LocalizedRashiPrediction>>> = {
  mesha: {
    en: {
      general: 'Surya Dev shines favorably on your ascendant. Dynamic energy drives successful project completions. Avoid hasty speech during afternoon financial discussions.',
      career: 'Promotions, executive recognitions, and entrepreneurial expansions are well-aspected. A lucrative proposal from an old colleague could arrive.',
      love: 'Harmony and shared joy with spouse. Unmarried natives might receive auspicious matrimonial overtures.',
      health: 'Vigorous vitality; maintain hydration and balanced meals. Avoid late-night screen time.',
      weekly: 'Strategic investments yield substantial gains. Mid-week brings favorable travel for professional growth.',
      luckyColor: 'Crimson Red & Saffron Gold',
      luckyNumber: '9',
      luckyTime: '08:30 AM to 10:15 AM'
    },
    hi: {
      general: 'सूर्य देव की शुभ दृष्टि से आज आपका आत्मविश्वास चरम पर रहेगा। रुके हुए राजकीय कार्य गति पकड़ेंगे। दोपहर में वाणी पर संयम रखें।',
      career: 'कार्यक्षेत्र में पदोन्नति एवं अधिकारियों से प्रशंसा के प्रबल योग हैं। व्यापार में नए लाभदायक अनुबंध प्राप्त हो सकते हैं।',
      love: 'दांपत्य जीवन में मधुरता रहेगी। जीवनसाथी का पूर्ण सहयोग मिलेगा। अविवाहितों के लिए विवाह के शुभ प्रस्ताव आ सकते हैं।',
      health: 'ऊर्जा एवं स्फूर्ति बनी रहेगी। अत्यधिक तैलीय भोजन से बचें और सुबह ताजी हवा में टहलें।',
      weekly: 'सप्ताह के मध्य में आर्थिक लाभ के योग हैं। पैतृक संपत्ति से जुड़े विवाद सुलझेंगे।',
      luckyColor: 'लाल एवं केसरिया',
      luckyNumber: '९',
      luckyTime: 'प्रातः ०८:३० से १०:१५'
    },
    mr: {
      general: 'आजचा दिवस अत्यंत फलदायी राहील. आत्मविश्वासाने घेतलेले निर्णय यशस्वी ठरतील. आर्थिक व्यवहारात सावधगिरी बाळगा.',
      career: 'नोकरीत बढती व व्यवसायात चांगला नफा मिळण्याचे योग आहेत. नवीन व्यावसायिक भागीदारी फायदेशीर ठरेल.',
      love: 'कुटुंबात आनंदाचे वातावरण राहील. जोडीदारासोबत धार्मिक स्थळाला भेट देण्याचे योग आहेत.',
      health: 'आरोग्य उत्तम राहील. नियमित व्यायाम आणि प्राणायाम चालू ठेवा.',
      weekly: 'आर्थिक बाजू भक्कम होईल. आठवड्याच्या शेवटी प्रवास घडेल.',
      luckyColor: 'लाल आणि केशरी',
      luckyNumber: '९',
      luckyTime: 'सकाळी ०८:३० ते १०:१५'
    },
    gu: {
      general: 'સૂર્યદેવની કૃપાથી આત્મવિશ્વાસ વધશે. અટકેલા કામો પૂરા થશે. નાણાકીય નિર્ણયો સમજી-વિચારીને લેવા.',
      career: 'વેપારમાં સારો નફો થશે. નોકરીમાં પ્રમોશન અને ઉચ્ચ અધિકારીઓનો સાથ મળશે.',
      love: 'દાંપત્ય જીવનમાં સુખ-શાંતિ રહેશે. પરિવાર સાથે ઉત્તમ સમય વિતાવશો.',
      health: 'સ્વાસ્થ્ય સારું રહેશે. પૂરતો આરામ અને હળવો આહાર લેવો.',
      weekly: 'આર્થિક દ્રષ્ટિએ આ સપ્તાહ ખૂબ લાભદાયી રહેશે.',
      luckyColor: 'લાલ અને કેસરી',
      luckyNumber: '૯',
      luckyTime: 'સવારે ૦૮:૩૦ થી ૧૦:૧૫'
    }
  },
  vrishabha: {
    en: {
      general: 'Artistic pursuits and diplomatic negotiations proceed smoothly. Shukra Dev fosters domestic luxury and social goodwill.',
      career: 'Creative presentations receive executive commendation. High-end retail and design professions see lucrative customer influx.',
      love: 'A romantic evening strengthens marital bonding. A small affectionate gift brings delight.',
      health: 'Mindful throat care recommended. Prefer warm fluids over chilled refreshments.',
      weekly: 'Budgetary reallocation brings peace of mind. Auspicious family gathering brings relatives together.',
      luckyColor: 'Pearl White & Emerald Green',
      luckyNumber: '6',
      luckyTime: '02:00 PM to 04:00 PM'
    },
    hi: {
      general: 'शुक्र देव के प्रभाव से भौतिक सुख-साधनों में वृद्धि होगी। रचनात्मक कार्यों में सफलता मिलेगी। कला व संगीत की ओर रुझान रहेगा।',
      career: 'कार्यक्षेत्र में आपकी कार्यकुशलता की सराहना होगी। रियल एस्टेट और आभूषण व्यापार से जुड़े जातकों को विशेष लाभ होगा।',
      love: 'प्रेम संबंधों में प्रगाढ़ता आएगी। जीवनसाथी के साथ सामंजस्य बेहतरीन रहेगा। सायंकाल सुखद बीतेगा।',
      health: 'गले और मौसम से होने वाले संक्रमण से सावधान रहें। गुनगुने जल का सेवन लाभकारी रहेगा।',
      weekly: 'पारिवारिक मांगलिक कार्यों की रूपरेखा बनेगी। धन का आगमन निरंतर बना रहेगा।',
      luckyColor: 'श्वेत (सफेद) एवं हरा',
      luckyNumber: '६',
      luckyTime: 'दोपहर ०२:०० से ०४:००'
    },
    mr: {
      general: 'शुक्राच्या शुभ प्रभावाने सुख-सुविधांमध्ये वाढ होईल. कला आणि सर्जनशील कामात यश लाभेल.',
      career: 'नोकरीत सहकाऱ्यांचे सहकार्य लाभेल. व्यापारी वर्गाला आर्थिक प्राप्तीचे नवीन मार्ग मिळतील.',
      love: 'पती-पत्नीमध्ये गोडवा वाढेल. कौटुंबिक सौख्य उत्तम लाभेल.',
      health: 'घशाची काळजी घ्या, थंड पदार्थ खाणे टाळा.',
      weekly: 'घरात आनंदी वातावरण राहील. जुने मित्र भेटतील.',
      luckyColor: 'पांढरा आणि हिरवा',
      luckyNumber: '६',
      luckyTime: 'दुपारी ०२:०० ते ०४:००'
    },
    gu: {
      general: 'શુક્રદેવના પ્રભાવથી સુખ-સુવિધાઓમાં વધારો થશે. કલાત્મક ક્ષેત્રે જોડાયેલા લોકોને વિશેષ સફળતા મળશે.',
      career: 'ધંધામાં રોકાણથી સારો લાભ થશે. નવી યોજનાઓ સફળ થશે.',
      love: 'પારિવારિક જીવન ખુશહાલ રહેશે. જીવનસાથીનો પ્રેમ અને સહયોગ મળશે.',
      health: 'ગળાની કાળજી લેવી, ગરમ પાણી પીવું હિતકારી રહેશે.',
      weekly: 'ધનલાભના સારા અવસર મળશે. પારિવારિક શાંતિ જળવાઈ રહેશે.',
      luckyColor: 'સફેદ અને લીલો',
      luckyNumber: '૬',
      luckyTime: 'બપોરે ૦૨:૦૦ થી ૦૪:૦૦'
    }
  },
  mithuna: {
    en: {
      general: 'Mercury provides intellectual sharpness. Fast-paced communications, IT research, and written dealings yield lucrative outcomes.',
      career: 'Technical pitches, marketing campaigns, and contract agreements get signed without delays.',
      love: 'Lighthearted conversations dissolve past misunderstandings. Enjoy intellectual camaraderie with your partner.',
      health: 'Practice 15 minutes of Pranayama to calm restlessness and mental hyperactivity.',
      weekly: 'Lucrative consulting avenues open. Excellent period for publishing and media specialists.',
      luckyColor: 'Parrot Green & Canary Yellow',
      luckyNumber: '5',
      luckyTime: '11:15 AM to 01:00 PM'
    },
    hi: {
      general: 'बुध ग्रह की शुभता से आपकी बौद्धिक क्षमता एवं निर्णय लेने की शक्ति प्रबल रहेगी। संवाद कौशल से जटिल कार्य सिद्ध होंगे।',
      career: 'मीडिया, आईटी, वकालत और बैंकिंग से जुड़े जातकों के लिए दिन अत्यंत लाभकारी है। पदोन्नति की सूचना मिल सकती है।',
      love: 'प्रेम जीवन में गलतफहमियां दूर होंगी। एक दूसरे के विचारों का सम्मान करने से रिश्ता मजबूत होगा।',
      health: 'मानसिक तनाव से बचने के लिए ध्यान एवं प्राणायाम करें। पर्याप्त नींद लें।',
      weekly: 'सप्ताह के उत्तरार्ध में महत्वपूर्ण अनुबंध पर हस्ताक्षर होंगे। विद्यार्थी वर्ग को शुभ परिणाम मिलेंगे।',
      luckyColor: 'तोतिया हरा एवं पीला',
      luckyNumber: '५',
      luckyTime: 'पूर्वाह्न ११:१५ से दोपहर ०१:००'
    },
    mr: {
      general: 'बुद्धीचा योग्य वापर करून कठीण कामे सोपी कराल. संवाद कौशल्य फायदेशीर ठरेल.',
      career: 'माहिती तंत्रज्ञान, बँकिंग व लेखन क्षेत्रातील व्यक्तींना विशेष मान-सन्मान लाभेल.',
      love: 'नात्यातील गैरसमज दूर होतील. जोडीदाराशी मनमोकळा संवाद होईल.',
      health: 'मानसिक शांततेसाठी योग आणि ध्यानधारणा करा.',
      weekly: 'विद्यार्थ्यांना परीक्षेत चांगले यश मिळेल. धनप्राप्तीचे योग आहेत.',
      luckyColor: 'हिरवा आणि पिवळा',
      luckyNumber: '५',
      luckyTime: 'सकाळी ११:१५ ते दुपारी ०१:००'
    },
    gu: {
      general: 'બુદ્ધિ અને વાણીના બળે મુશ્કેલ કાર્યો સરળ બનશે. વિદ્યાભ્યાસમાં પ્રગતિ થશે.',
      career: 'આઈટી, માર્કેટિંગ અને લેખન ક્ષેત્રે ઉત્તમ તકો પ્રાપ્ત થશે.',
      love: 'દાંપત્યજીવનમાં નિકટતા વધશે. જૂની ગેરસમજો દૂર થશે.',
      health: 'માનસિક તણાવ ઓછો કરવા ધ્યાન કરવું હિતાવહ છે.',
      weekly: 'સપ્તાહ દરમિયાન આર્થિક સ્થિતિમાં સુધારો જોવા મળશે.',
      luckyColor: 'લીલો અને પીળો',
      luckyNumber: '૫',
      luckyTime: 'સવારે ૧૧:૧૫ થી બપોરે ૦૧:૦૦'
    }
  },
  karka: {
    en: {
      general: 'Intuitive awareness is peaked under Chandra Dev. Inner serenity and focus on domestic harmony bring contentment.',
      career: 'Collaborative projects succeed. Real estate, hospitality, and education professionals enjoy productive developments.',
      love: 'Deep emotional warmth enriches home life. Quality time spent with elders brings spiritual merit.',
      health: 'Pay attention to dietary routine. Prefer freshly cooked sattvic meals.',
      weekly: 'Auspicious news regarding property or children’s admissions lifts your spirits.',
      luckyColor: 'Silver White & Ocean Blue',
      luckyNumber: '2',
      luckyTime: '06:00 PM to 07:30 PM'
    },
    hi: {
      general: 'चन्द्र देव के आशीर्वाद से मन प्रसन्न एवं शांत रहेगा। माता के स्वास्थ्य में सुधार होगा। घर में मांगलिक चर्चा होगी।',
      career: 'शिक्षा, चिकित्सा और खाद्य व्यापार से जुड़े लोगों को अच्छा मुनाफा होगा। वरिष्ठ सहयोगियों का मार्गदर्शन मिलेगा।',
      love: 'दाम्पत्य जीवन में भावनात्मक लगाव बढ़ेगा। परिवार के साथ सुखद समय व्यतीत करने का अवसर मिलेगा।',
      health: 'पाचन तंत्र का ध्यान रखें। ताजा व सुपाच्य भोजन ग्रहण करें। जल का अधिक सेवन करें।',
      weekly: 'भूमि-भवन की खरीद-फरोख्त से लाभ संभव है। संतान पक्ष से शुभ समाचार प्राप्त होगा।',
      luckyColor: 'चांदी सा श्वेत एवं आसमानी',
      luckyNumber: '२',
      luckyTime: 'सायं ०६:०० से ०७:३०'
    },
    mr: {
      general: 'चंद्रदेवाच्या कृपेने मन शांत राहील. आईचे सहकार्य व आशीर्वाद लाभेल. घरातील वातावरण प्रसन्न राहील.',
      career: 'नोकरीत समाधानकारक प्रगती होईल. नवीन योजनांवर काम सुरू करू शकता.',
      love: 'कुटुंबात जिव्हाळा वाढेल. जोडीदारासोबतचे संबंध अधिक दृढ होतील.',
      health: 'पचनसंस्थेची काळजी घ्या. भरपूर पाणी प्या.',
      weekly: 'घर किंवा वाहन खरेदीचे योग जुळून येतील. धनलाभाची शक्यता.',
      luckyColor: 'पांढरा आणि निळा',
      luckyNumber: '२',
      luckyTime: 'संध्याकाळी ०६:०० ते ०७:३०'
    },
    gu: {
      general: 'ચંદ્રદેવની કૃપાથી મન પ્રસન્ન રહેશે. માતાના આશીર્વાદથી કાર્યોમાં સફળતા મળશે.',
      career: 'વેપારમાં સ્થિરતા અને પ્રગતિ જણાશે. નોકરીમાં માન-સન્માન વધશે.',
      love: 'પારિવારિક જીવનમાં સુખ-શાંતિ રહેશે. સ્નેહીજનો સાથે મુલાકાત થશે.',
      health: 'પાચન સંબંધિત તકેદારી રાખવી. સાત્વિક આહાર લેવો.',
      weekly: 'સંતાન તરફથી ખુશખબર મળશે. આર્થિક લાભ થશે.',
      luckyColor: 'સફેદ અને વાદળી',
      luckyNumber: '૨',
      luckyTime: 'સાંજે ૦૬:૦૦ થી ૦૭:૩૦'
    }
  },
  simha: {
    en: {
      general: 'Surya Dev endows majestic executive charisma. Leadership decisions receive prompt approval and social prestige.',
      career: 'Government-related approvals and managerial promotions manifest effortlessly. Outstanding day for enterprise leaders.',
      love: 'Warmth and generosity win your loved one\'s admiration. Express sincere appreciation without ego.',
      health: 'Vitality remains high; incorporate cardiovascular exercise and morning surya namaskar.',
      weekly: 'Prestigious public recognition and lucrative expansion of authority mark this productive week.',
      luckyColor: 'Royal Gold & Deep Orange',
      luckyNumber: '1',
      luckyTime: '07:30 AM to 09:30 AM'
    },
    hi: {
      general: 'सूर्य देव की अनुकंपा से आपका तेज व पराक्रम बढ़ेगा। समाज में प्रतिष्ठा एवं मान-सम्मान में वृद्धि होगी।',
      career: 'प्रशासनिक व उच्च पदों पर कार्यरत जातकों के लिए अत्यंत शुभ दिन है। उच्चाधिकारी आपके निर्णयों की सराहना करेंगे।',
      love: 'दाम्पत्य जीवन में अहंकार से बचें। जीवनसाथी के प्रति विनम्रता रखने से संबंध और प्रगाढ़ होंगे।',
      health: 'ऊर्जावान महसूस करेंगे। नित्य प्रातः सूर्य नमस्कार एवं सूर्य को जल अर्पित करना अत्यंत फलदायी रहेगा।',
      weekly: 'सरकारी कार्यों में विजय प्राप्त होगी। व्यापार में बड़ा आर्थिक लाभ होने की संभावना है।',
      luckyColor: 'सुनहरा एवं गहरा नारंगी',
      luckyNumber: '१',
      luckyTime: 'प्रातः ०७:३० से ०९:३०'
    },
    mr: {
      general: 'सूर्यदेवाच्या आशीर्वादाने समाजात प्रतिष्ठा वाढेल. नेतृत्व गुणांना योग्य वाव मिळेल.',
      career: 'प्रशासकीय नोकरीत यश लाभेल. वरिष्ठ अधिकाऱ्यांची मर्जी राहील.',
      love: 'जोडीदाराशी प्रेमाने वागा. अहंकार टाळल्यास वैवाहिक जीवन अधिक सुखकर होईल.',
      health: 'आरोग्य उत्तम राहील. रोज सकाळी सूर्य नमस्कार करा.',
      weekly: 'सरकारी कामातील अडचणी दूर होतील. व्यवसायात मोठा फायदा होईल.',
      luckyColor: 'सोनेरी आणि नारंगी',
      luckyNumber: '१',
      luckyTime: 'सकाळी ०७:३० ते ०९:३०'
    },
    gu: {
      general: 'સૂર્યદેવના પ્રભાવથી સમાજમાં મોભો અને પ્રતિષ્ઠા વધશે. મહત્વના નિર્ણયો સફળ થશે.',
      career: 'ઉચ્ચ અધિકારીઓ તરફથી સહયોગ મળશે. સરકારી કામોમાં સફળતા મળશે.',
      love: 'દાંપત્ય જીવનમાં મધુરતા જળવાઈ રહેશે. જીવનસાથી સાથે સારો તાલમેલ રહેશે.',
      health: 'શરીરમાં તાજગી રહેશે. સવારે સૂર્ય નમસ્કાર કરવાથી લાભ થશે.',
      weekly: 'વેપારમાં નવી ઊંચાઈઓ હાંસલ કરશો. આવકના નવા સ્ત્રોત ખુલશે.',
      luckyColor: 'સોનેરી અને કેસરી',
      luckyNumber: '૧',
      luckyTime: 'સવારે ૦૭:૩० થી ૦૯:૩૦'
    }
  },
  kanya: {
    en: {
      general: 'Analytical precision ensures flawlessness in complex accounts, audits, and scientific documentation.',
      career: 'Detailed planning clears professional logjams. Audit reports and technical code receive peer acclaim.',
      love: 'Practical gestures of daily care and dependability bring reassurance to your partner.',
      health: 'Do not skip breakfast. Include seasonal fruits and hydration throughout your working hours.',
      weekly: 'Systematic organization clears past pending issues. A lucrative consulting opportunity emerges.',
      luckyColor: 'Olive Green & Cream',
      luckyNumber: '5',
      luckyTime: '03:30 PM to 05:00 PM'
    },
    hi: {
      general: 'बुध ग्रह के प्रभाव से तर्कशक्ति एवं विश्लेषणात्मक क्षमता प्रखर रहेगी। वित्तीय हिसाब-किताब में सतर्कता से लाभ होगा।',
      career: 'लेखांकन, अनुसंधान, सॉफ्टवेयर एवं बैंकिंग क्षेत्र के जातकों को विशेष सफलता मिलेगी। नए प्रोजेक्ट्स की जिम्मेदारी मिलेगी।',
      love: 'रिश्तों में व्यावहारिक समझदारी से शांति बनी रहेगी। जीवनसाथी का हर कदम पर साथ मिलेगा।',
      health: 'नियमित खानपान का ध्यान रखें। अत्यधिक भागदौड़ से थकान संभव है, पर्याप्त विश्राम करें।',
      weekly: 'ऋण मुक्ति के मार्ग खुलेंगे। पुराना अटका हुआ धन वापस मिलने के योग हैं।',
      luckyColor: 'हल्का हरा एवं क्रीम',
      luckyNumber: '५',
      luckyTime: 'अपराह्न ०३:३० से ०५:००'
    },
    mr: {
      general: 'बुद्धिमत्ता आणि कार्यक्षमतेच्या बळावर अवघड कामे यशस्वीपणे पूर्ण कराल.',
      career: 'हिशोब, संशोधन व बँक कर्मचाऱ्यांसाठी आजचा दिवस अतिशय फायदेशीर ठरेल.',
      love: 'कुटुंबात समजूतदारपणा दाखवा. जोडीदाराशी संवाद वाढवा.',
      health: 'आहारावर नियंत्रण ठेवा. वेळेवर जेवण घेणे गरजेचे आहे.',
      weekly: 'आर्थिक नियोजनात यश येईल. रखडलेली कामे मार्गी लागतील.',
      luckyColor: 'हिरवा आणि फिकट पिवळा',
      luckyNumber: '५',
      luckyTime: 'दुपारी ०३:३० ते ०५:००'
    },
    gu: {
      general: 'તમારી કાર્યકુશળતાથી સૌ કોઈ પ્રભાવિત થશે. નાણાકીય આયોજન સફળ રહેશે.',
      career: 'સંશોધન અને એકાઉન્ટ્સ ક્ષેત્રે નવી જવાબદારીઓ મળશે.',
      love: 'જીવનસાથી સાથે સંબંધોમાં સુધારો થશે. પરસ્પર વિશ્વાસ વધશે.',
      health: 'ખાવા-પીવામાં સંયમ રાખવો. સમયસર ભોજન લેવું.',
      weekly: 'અટકેલા નાણાં પરત મળશે. નવી તકો પ્રાપ્ત થશે.',
      luckyColor: 'લીલો અને બદામી',
      luckyNumber: '૫',
      luckyTime: 'બપોરે ૦૩:૩૦ થી ૦૫:૦૦'
    }
  },
  tula: {
    en: {
      general: 'Equilibrium and diplomacy resolve complex negotiations. Shukra Dev blesses you with social grace and charm.',
      career: 'Legal agreements, design ventures, and client pitches conclude with mutual satisfaction.',
      love: 'Romance blossoms. Unmarried natives might receive auspicious matrimonial overtures.',
      health: 'Maintain posture awareness during long desk sessions. Gentle stretches will revitalize you.',
      weekly: 'Strategic partnerships flourish. Investments in aesthetic enhancements prove satisfying.',
      luckyColor: 'Sky Blue & Rose Pink',
      luckyNumber: '6',
      luckyTime: '10:00 AM to 12:00 PM'
    },
    hi: {
      general: 'शुक्र देव के अनुग्रह से व्यक्तित्व में आकर्षण बढ़ेगा। कला, संगीत और सौंदर्य के प्रति रुझान बढ़ेगा। न्यायप्रिय निर्णय लेंगे।',
      career: 'कानूनी मामलों में विजय मिलेगी। साझेदारी के व्यापार में अभूतपूर्व लाभ होगा। नए ग्राहक जुड़ेंगे।',
      love: 'दाम्पत्य जीवन में प्रेम और सामंजस्य बढ़ेगा। अविवाहितों के लिए शुभ विवाह प्रस्ताव आ सकते हैं।',
      health: 'रीढ़ की हड्डी और कमर के दर्द से बचाव हेतु सही मुद्रा में बैठें। हल्के व्यायाम करें।',
      weekly: 'साझेदारी के कार्यों में बड़ा आर्थिक मुनाफा होगा। सामाजिक दायरा बढ़ेगा।',
      luckyColor: 'आसमानी एवं गुलाबी',
      luckyNumber: '६',
      luckyTime: 'प्रातः १०:०० से दोपहर १२:००'
    },
    mr: {
      general: 'व्यक्तिमत्त्व प्रभावी राहील. वादविवाद मिटवून सामंजस्याने मार्ग काढण्यात यशस्वी व्हाल.',
      career: 'भागीदारीच्या व्यवसायात चांगला लाभ होईल. नवीन करारांवर स्वाक्षरी होईल.',
      love: 'प्रेमसंबंधांना नवी दिशा मिळेल. वैवाहिक सौख्य लाभेल.',
      health: 'पाठीचे व्यायाम करा. जास्त वेळ एकाच जागी बसणे टाळा.',
      weekly: 'सामाजिक कार्यात मान-सन्मान वाढेल. नवीन गुंतवणूक फायदेशीर ठरेल.',
      luckyColor: 'आकाशी आणि गुलाबी',
      luckyNumber: '६',
      luckyTime: 'सकाळी १०:०० ते दुपारी १२:००'
    },
    gu: {
      general: 'સંતુલિત વ્યવહારથી મુશ્કેલ પરિસ્થિતિ પર કાબૂ મેળવશો. સામાજિક સ્નેહ વધશે.',
      career: 'ભાગીદારીમાં સારો નફો મળશે. કાયદાકીય બાબતોમાં સફળતા મળશે.',
      love: 'દાંપત્ય જીવનમાં રોમાન્સ અને પ્રેમ વધશે. લગ્નોત્સુક યુવાનો માટે સારા સંબંધ આવશે.',
      health: 'નિયમિત કસરત કરવી. પીઠનો દુખાવો ન થાય તેની કાળજી રાખવી.',
      weekly: 'વેપારમાં ભાગીદારીથી મોટો લાભ થશે. શુભ પ્રસંગોનું આયોજન થશે.',
      luckyColor: 'આકાશી અને ગુલાબી',
      luckyNumber: '૬',
      luckyTime: 'સવારે ૧૦:૦૦ થી બપોરે ૧૨:૦૦'
    }
  },
  vrishchika: {
    en: {
      general: 'Mars and Ketu empower intense willpower and deep research breakthroughs. Hidden facts come to light.',
      career: 'Investigation, analytics, and engineering projects achieve decisive breakthroughs. Competing opposition is neutralized.',
      love: 'Deep emotional honesty strengthens trust. Share your inner feelings openly with your partner.',
      health: 'Avoid overly spicy foods to protect digestive equilibrium. Practice hydration.',
      weekly: 'Decisive victory in pending disputes. Strategic financial assets yield capital gains.',
      luckyColor: 'Maroon & Deep Red',
      luckyNumber: '9',
      luckyTime: '01:30 PM to 03:30 PM'
    },
    hi: {
      general: 'मंगल देव के प्रभाव से अदम्य साहस एवं ऊर्जा का संचार होगा। गूढ़ विद्याओं एवं शोध कार्यों में सफलता मिलेगी। विरोधी परास्त होंगे।',
      career: 'इंजीनियरिंग, रक्षा, पुलिस व अनुसंधान से जुड़े लोगों के लिए दिन शानदार रहेगा। पद-प्रतिष्ठा में वृद्धि होगी।',
      love: 'पारस्परिक विश्वास बढ़ेगा। जीवनसाथी के साथ गुप्त बातों को साझा करने से मन हल्का होगा।',
      health: 'पेट व पाचन का विशेष ध्यान रखें। अत्यधिक मिर्च-मसालेदार भोजन से परहेज करें।',
      weekly: 'शत्रुओं पर विजय प्राप्त होगी। पुराने कर्जों से मुक्ति मिलने के आसार हैं।',
      luckyColor: 'मैरून एवं गहरा लाल',
      luckyNumber: '९',
      luckyTime: 'दोपहर ०१:३० से ०३:३०'
    },
    mr: {
      general: 'साहस आणि आत्मविश्वास वाढेल. आव्हानांना धैर्याने सामोरे जाल. गूढ विषयांची आवड निर्माण होईल.',
      career: 'कठीण कामांमध्ये यश संपादन कराल. नोकरीत प्रभाव वाढेल.',
      love: 'जोडीदारावर विश्वास ठेवा. कौटुंबिक सौख्य चांगले लाभेल.',
      health: 'पोटाच्या तक्रारींकडे दुर्लक्ष करू नका. सात्त्विक आहार घ्या.',
      weekly: 'कोर्ट-कचेरीच्या कामात यश मिळेल. जुने कर्ज फेडता येईल.',
      luckyColor: 'तांबडा आणि लाल',
      luckyNumber: '९',
      luckyTime: 'दुपारी ०१:३० ते ०३:३०'
    },
    gu: {
      general: 'મંગળદેવના પ્રભાવથી સાહસ અને ઉત્સાહમાં વધારો થશે. સંશોધન કાર્યોમાં સફળતા મળશે.',
      career: 'વિરોધીઓ પરાસ્ત થશે. કાર્યક્ષેત્રે તમારી મહેનત રંગ લાવશે.',
      love: 'જીવનસાથી સાથે પારદર્શક સંબંધ રાખવો. વિશ્વાસમાં વધારો થશે.',
      health: 'મસાલેદાર ખોરાકથી દૂર રહેવું. સ્વાસ્થ્યનું ધ્યાન રાખવું.',
      weekly: 'કાનૂની વિવાદોમાં જીત થશે. આર્થિક લાભના અવસર મળશે.',
      luckyColor: 'મેરૂન અને લાલ',
      luckyNumber: '૯',
      luckyTime: 'બપોરે ૦૧:૩૦ થી ૦૩:૩૦'
    }
  },
  dhanu: {
    en: {
      general: 'Brihaspati Dev blesses your spiritual wisdom and philosophical optimism. Higher learning and teaching succeed.',
      career: 'Educational expansions, publishing breakthroughs, and mentorship roles bring high prestige.',
      love: 'Joyful philosophical conversations with your partner. Travel planning for pilgrimage brings mutual cheer.',
      health: 'Liver vitality requires mindful dining. Avoid rich, sugary sweets.',
      weekly: 'Auspicious spiritual merits accumulate. Long-distance pilgrimage or study abroad journey manifests.',
      luckyColor: 'Bright Saffron & Turmeric Yellow',
      luckyNumber: '3',
      luckyTime: '09:00 AM to 11:00 AM'
    },
    hi: {
      general: 'देवगुरु बृहस्पति की कृपा से ज्ञान, बुद्धि एवं विवेक में वृद्धि होगी। धार्मिक यात्रा के योग बनेंगे। गुरुजनों का आशीर्वाद मिलेगा।',
      career: 'शिक्षा, अध्यापन, कानून और परामर्श से जुड़े जातकों को विशेष सम्मान प्राप्त होगा। नई उपलब्धियां जुड़ेंगी।',
      love: 'परिवार में मांगलिक वातावरण रहेगा। जीवनसाथी के साथ तीर्थाटन या धार्मिक यात्रा की योजना बनेगी।',
      health: 'स्वास्थ्य उत्तम रहेगा। मीठे व भारी भोजन पर नियंत्रण रखें।',
      weekly: 'धार्मिक एवं आध्यात्मिक कार्यों में मन लगेगा। विदेश या दूरस्थ यात्रा के योग बनेंगे।',
      luckyColor: 'हल्दी पीला एवं केसरिया',
      luckyNumber: '३',
      luckyTime: 'प्रातः ०९:०० से ११:००'
    },
    mr: {
      general: 'गुरुदेवांच्या आशीर्वादाने ज्ञानात भर पडेल. अध्यात्मिक कार्यात रस वाटेल. वरिष्ठांचे मार्गदर्शन लाभेल.',
      career: 'शिक्षण, सल्लागार व कायदा क्षेत्रातील लोकांना मोठे यश लाभेल.',
      love: 'कुटुंबात आनंदी व धार्मिक वातावरण राहील. तीर्थयात्रेचे योग येतील.',
      health: 'यकृत आणि पोटाची काळजी घ्या. गोड पदार्थ कमी खा.',
      weekly: 'प्रवासातून लाभ होईल. भाग्याची उत्तम साथ लाभेल.',
      luckyColor: 'पिवळा आणि केशरी',
      luckyNumber: '३',
      luckyTime: 'सकाळी ०९:०० ते ११:००'
    },
    gu: {
      general: 'ગુરુદેવની કૃપાથી જ્ઞાન અને બુદ્ધિનો વિકાસ થશે. ધાર્મિક યાત્રાના યોગ બનશે.',
      career: 'શિક્ષણ અને કન્સલ્ટિંગ ક્ષેત્રે જોડાયેલા લોકોને મોટો ફાયદો થશે.',
      love: 'પરિવારમાં માંગલિક કાર્યોનું આયોજન થશે. જીવનસાથીનો સહયોગ મળશે.',
      health: 'સ્વાસ્થ્ય સારું રહેશે. વધુ પડતી મીઠાઈ ખાવાનું ટાળવું.',
      weekly: 'ધાર્મિક કાર્યોમાં રુચિ વધશે. લાંબા પ્રવાસથી લાભ થશે.',
      luckyColor: 'પીળો અને કેસરી',
      luckyNumber: '૩',
      luckyTime: 'સવારે ૦૯:૦૦ થી ૧૧:૦૦'
    }
  },
  makara: {
    en: {
      general: 'Shani Dev reinforces discipline, patience, and meticulous organization. Long-term goals progress steadily.',
      career: 'Industry operations, civil infrastructure, and corporate administration proceed reliably without error.',
      love: 'Quiet, dependable commitment reassures your family. Practical domestic support cements marital harmony.',
      health: 'Knee and joint flexibility exercises recommended. Keep warm during morning hours.',
      weekly: 'Professional stability solidifies. Hard work done over past months begins bearing tangible returns.',
      luckyColor: 'Navy Blue & Steel Grey',
      luckyNumber: '8',
      luckyTime: '04:15 PM to 06:00 PM'
    },
    hi: {
      general: 'शनि देव के प्रभाव से कर्मठता और धैर्य में वृद्धि होगी। कठिन परिश्रम का सुखद परिणाम प्राप्त होगा। व्यर्थ की चिंताओं से बचें।',
      career: 'उद्योग, विनिर्माण, खनिज एवं प्रबंधन से जुड़े जातकों को कार्यक्षेत्र में स्थायित्व व उन्नति मिलेगी।',
      love: 'दाम्पत्य जीवन में गंभीरता एवं एक-दूसरे के प्रति समर्पण बढ़ेगा। पारिवारिक उत्तरदायित्वों को भली-भांति निभाएंगे।',
      health: 'घुटनों व जोड़ों में दर्द से बचाव के लिए नियमित व्यायाम करें। पर्याप्त धूप लें।',
      weekly: 'कार्यक्षेत्र में स्थिरता आएगी। विगत महीनों की गई मेहनत का मीठा फल मिलेगा।',
      luckyColor: 'गहरा नीला एवं स्लेटी',
      luckyNumber: '८',
      luckyTime: 'अपराह्न ०४:१५ से सायं ०६:००'
    },
    mr: {
      general: 'शनिदेवाच्या कृपेने कष्टाचे चीज होईल. संयम आणि चिकाटीने केलेली कामे यशस्वी ठरतील.',
      career: 'कारखाना, बांधकाम व प्रशासकीय सेवेतील लोकांना पदोन्नतीचे योग आहेत.',
      love: 'कुटुंबाप्रती कर्तव्ये चोख पार पाडाल. जोडीदाराशी संबंध दृढ राहतील.',
      health: 'सांधेदुखीपासून सावध राहा. नियमित चालण्याचा व्यायाम करा.',
      weekly: 'आर्थिक स्थिरता लाभेल. दीर्घकालीन योजनांना गती मिळेल.',
      luckyColor: 'निळा आणि राखाडी',
      luckyNumber: '८',
      luckyTime: 'दुपारी ०४:१५ ते संध्याकाळी ०६:००'
    },
    gu: {
      general: 'શનિદેવના પ્રભાવથી ધીરજ અને પરિશ્રમનું ઉત્તમ પરિણામ મળશે. માનસિક મજબૂતી રહેશે.',
      career: 'ઉદ્યોગ અને વહીવટ સાથે સંકળાયેલા લોકોને નવી તકો મળશે.',
      love: 'પારિવારિક જવાબદારીઓ સારી રીતે નિભાવશો. દાંપત્યજીવન સુખમય રહેશે.',
      health: 'સાંધાના દુખાવાની કાળજી લેવી. હળવી કસરત કરવી.',
      weekly: 'કાર્યક્ષેત્રે સ્થિરતા આવશે. આર્થિક લાભની નવી તકો મળશે.',
      luckyColor: 'વાદળી અને રાખોડી',
      luckyNumber: '૮',
      luckyTime: 'બપોરે ૦૪:૧૫ થી સાંજે ૦૬:૦૦'
    }
  },
  kumbha: {
    en: {
      general: 'Innovative visions and humanitarian pursuits dominate your mindset. Community connections open surprising doors.',
      career: 'Technological innovations, social media campaigns, and collaborative research receive wide commendation.',
      love: 'Celebrate uniqueness in your relationship. Intellectual companionship and shared dreams bring joy.',
      health: 'Calf muscles and circulatory wellness require hydration and light stretching.',
      weekly: 'Unexpected windfall or sudden financial resolution of a lingering issue brings relief.',
      luckyColor: 'Electric Cyan & Indigo',
      luckyNumber: '8',
      luckyTime: '01:00 PM to 02:45 PM'
    },
    hi: {
      general: 'शनि व राहु के सम्मिलित प्रभाव से नए विचार व योजनाएं मन में आएंगी। सामाजिक कार्यों में सहभागिता बढ़ेगी। मित्रों का साथ मिलेगा।',
      career: 'विज्ञान, तकनीकी, अनुसंधान व डिजिटल मीडिया से जुड़े लोगों को बड़ी सफलता हाथ लगेगी। नई परियोजना शुरू हो सकती है।',
      love: 'प्रेम संबंधों में नयापन आएगा। जीवनसाथी के साथ भविष्य की योजनाओं पर सकारात्मक विमर्श होगा।',
      health: 'पैरों और पिंडलियों में खिंचाव से बचें। पर्याप्त पानी पिएं एवं नियमित टहलें।',
      weekly: 'आकस्मिक धन लाभ के योग हैं। सामाजिक संस्थाओं से सम्मान प्राप्त होगा।',
      luckyColor: 'नीला एवं आसमानी',
      luckyNumber: '८',
      luckyTime: 'दोपहर ०१:०० से ०२:४५'
    },
    mr: {
      general: 'नवे विचार आणि तंत्रज्ञानाचा चांगला उपयोग कराल. मित्रपरिवाराचे उत्तम सहकार्य लाभेल.',
      career: 'संशोधन, संगणक व सामाजिक क्षेत्रातील लोकांना मोठे यश मिळेल.',
      love: 'नात्यात मोकळेपणा आणि विश्वास राहील. जीवनसाथी सोबत आनंदात वेळ जाईल.',
      health: 'पायांची काळजी घ्या. भरपूर पाणी प्या आणि ताजी हवा घ्या.',
      weekly: 'अचानक धनलाभाची शक्यता आहे. मित्रांचे सहकार्य लाभेल.',
      luckyColor: 'जांभळा आणि निळा',
      luckyNumber: '८',
      luckyTime: 'दुपारी ०१:०० ते ०२:४५'
    },
    gu: {
      general: 'નવા વિચારો અને આધુનિક પદ્ધતિઓથી કામ કરશો. મિત્રોનો સંપૂર્ણ સાથ મળશે.',
      career: 'ટેકનોલોજી અને ડિજિટલ ક્ષેત્રે અભૂતપૂર્વ સફળતા પ્રાપ્ત થશે.',
      love: 'પ્રેમ સંબંધોમાં મધુરતા રહેશે. જીવનસાથી સાથે સારો સમય વીતશે.',
      health: 'શરીરમાં પાણીની માત્રા જાળવવી. ચાલવાની ટેવ રાખવી.',
      weekly: 'અચાનક આર્થિક લાભ થશે. સમાજમાં સન્માન વધશે.',
      luckyColor: 'વાદળી અને જાંબલી',
      luckyNumber: '૮',
      luckyTime: 'બપોરે ૦૧:૦૦ થી ૦૨:૪૫'
    }
  },
  meena: {
    en: {
      general: 'Brihaspati Dev awakens profound compassionate intuition and spiritual bliss. Meditation yields transcendent clarity.',
      career: 'Healing arts, creative music, spiritual counseling, and philanthropic ventures thrive with public blessings.',
      love: 'Deep soulmate bonding. Unspoken mutual understanding brings profound comfort to both partners.',
      health: 'Foot care and grounding exercises beneficial. Keep sleep hours tranquil and serene.',
      weekly: 'Auspicious spiritual growth, charity merits, and blessings from saints enhance your destiny.',
      luckyColor: 'Sea Green & Golden Saffron',
      luckyNumber: '3',
      luckyTime: '07:00 AM to 08:45 AM'
    },
    hi: {
      general: 'देवगुरु बृहस्पति की अनुकंपा से आध्यात्मिक शांति एवं आत्मिक संतोष की अनुभूति होगी। दान-पुण्य के कार्यों में रुचि बढ़ेगी।',
      career: 'कला, संगीत, अध्यात्म, चिकित्सा एवं परामर्श से जुड़े लोगों के लिए दिन अत्यंत मंगलकारी रहेगा।',
      love: 'दांपत्य जीवन में असीम प्रेम और समर्पण रहेगा। एक-दूसरे की भावनाओं का आदर करेंगे।',
      health: 'मानसिक शांति बनी रहेगी। पैरों की देखभाल करें और शांत वातावरण में गहरी नींद लें।',
      weekly: 'तीर्थ यात्रा के शुभ योग बनेंगे। संतों-महात्माओं का सानिध्य प्राप्त होगा।',
      luckyColor: 'केसरिया पीला एवं समुद्री हरा',
      luckyNumber: '३',
      luckyTime: 'प्रातः ०७:०० से ०८:४५'
    },
    mr: {
      general: 'गुरुदेवांच्या आशीर्वादाने मानसिक शांतता लाभेल. धार्मिक व परोपकारी कामात मन रमेल.',
      career: 'वैद्यकीय, कला व समुपदेशन क्षेत्रातील व्यक्तींना खूप चांगले यश मिळेल.',
      love: 'नात्यात समजूतदारपणा आणि गाढ प्रेम राहील. संसार सुखाचा होईल.',
      health: 'आरोग्य उत्तम राहील. शांत झोप आणि ध्यानाचा सराव करा.',
      weekly: 'तीर्थाटनाचे योग येतील. पुण्यकार्यात सहभाग वाढेल.',
      luckyColor: 'पिवळा आणि फिकट हिरवा',
      luckyNumber: '३',
      luckyTime: 'सकाळी ०७:०० ते ०८:४५'
    },
    gu: {
      general: 'ગુરુદેવની કૃપાથી આધ્યાત્મિક શાંતિ મળશે. દાન-પુણ્યના કાર્યોમાં રુચિ વધશે.',
      career: 'કલા, સંગીત અને ચિકિત્સા ક્ષેત્રે ઉત્તમ સિદ્ધિઓ પ્રાપ્ત થશે.',
      love: 'જીવનસાથી સાથે આત્મીયતા વધશે. પારિવારિક શાંતિ રહેશે.',
      health: 'સ્વાસ્થ્ય ઉત્તમ રહેશે. પૂરતી ઊંઘ અને ધ્યાન કરવું.',
      weekly: 'તીર્થયાત્રાના શુભ યોગ બનશે. સંતોના આશીર્વાદ પ્રાપ્ત થશે.',
      luckyColor: 'કેસરી અને લીલો',
      luckyNumber: '૩',
      luckyTime: 'સવારે ૦૭:૦૦ થી ૦૮:૪૫'
    }
  }
};

export function getLocalizedRashiPrediction(
  rashiId: string,
  lang: LanguageCode,
  fallbackPrediction?: any
): LocalizedRashiPrediction {
  const rashiEntry = RASHI_LOCALIZED_PREDICTIONS[rashiId];
  if (rashiEntry) {
    if (rashiEntry[lang]) {
      return rashiEntry[lang]!;
    }
    // If exact language is not present but Hindi is requested
    if (lang === 'hi' && rashiEntry.hi) return rashiEntry.hi;
    if (rashiEntry.en) return rashiEntry.en;
  }
  return {
    general: fallbackPrediction?.general || '',
    career: fallbackPrediction?.career || '',
    love: fallbackPrediction?.love || '',
    health: fallbackPrediction?.health || '',
    weekly: fallbackPrediction?.weekly || 'Favorable transits support progress.',
    luckyColor: fallbackPrediction?.luckyColor || 'Gold',
    luckyNumber: fallbackPrediction?.luckyNumber || '7',
    luckyTime: fallbackPrediction?.luckyTime || '10:00 AM'
  };
}

export function getLocalizedHoroscope(
  rashiId: string,
  lang: LanguageCode
): { prediction: string; career: string; love: string; health: string } | null {
  const pred = getLocalizedRashiPrediction(rashiId, lang);
  if (!pred) return null;
  return {
    prediction: pred.general,
    career: pred.career,
    love: pred.love,
    health: pred.health
  };
}
