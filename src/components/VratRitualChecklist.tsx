import React, { useState, useEffect } from 'react';
import { LanguageCode } from '../types';
import { getRegionalDigits } from '../data/regionalCalendarEngine';
import {
  CheckCircle2,
  Circle,
  RotateCcw,
  Sparkles,
  Trophy,
  Flame,
  Check,
  Share2,
  Clock,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

export interface RitualItem {
  id: string;
  title: string;
  description?: string;
  timingTag?: string;
}

interface VratRitualChecklistProps {
  vratId: string;
  vratName: string;
  rituals: string[] | RitualItem[];
  paranaTime?: string;
  deity?: string;
  currentLang?: LanguageCode;
  className?: string;
}

const UI_TEXTS: Record<LanguageCode, {
  trackerBadge: string;
  checklistSuffix: string;
  description: string;
  share: string;
  copied: string;
  reset: string;
  resetConfirm: string;
  progressLabel: string;
  congratsTitle: string;
  congratsBody: (deity: string) => string;
  stepPrefix: string;
  dietTitle: string;
  dietBody: string;
  paranaTitle: string;
  shastricRule: string;
  localSaveNotice: string;
  shareText: (vrat: string, done: number, total: number) => string;
  timings: {
    earlyMorning: string;
    morningPuja: string;
    allDay: string;
    twilight: string;
    parana: string;
  };
}> = {
  en: {
    trackerBadge: 'Interactive Ritual Tracker',
    checklistSuffix: 'Rituals & Vrat Checklist',
    description: 'Track each fasting ritual step as you complete it. Your progress is automatically saved.',
    share: 'Share',
    copied: 'Copied!',
    reset: 'Reset',
    resetConfirm: 'Reset your ritual checklist progress for this Vrat?',
    progressLabel: 'Rituals Completed:',
    congratsTitle: 'Congratulations! All Vrat Rituals Completed!',
    congratsBody: (d) => `By the divine grace of ${d}, your sacred vows have been faithfully fulfilled. May this observance grant peace, health, and spiritual illumination.`,
    stepPrefix: 'Step',
    dietTitle: 'Dietary Discipline Verification',
    dietBody: 'I maintained sacred Satvik dietary discipline (abstained from grains, regular salt, onion, and garlic).',
    paranaTitle: 'Next Morning Parana Window:',
    shastricRule: 'Shastric Rule',
    localSaveNotice: 'Saved locally on your device',
    shareText: (v, d, t) => `I have completed ${d}/${t} rituals for ${v} on NewsDarshan! 🙏`,
    timings: {
      earlyMorning: 'Early Morning (Brahma Muhurat)',
      morningPuja: 'Morning Shodashopachara',
      allDay: 'Throughout the day',
      twilight: 'Twilight / Sandhya Aarti',
      parana: 'Next Morning Parana'
    }
  },
  hi: {
    trackerBadge: 'डिजिटल व्रत संकल्प ट्रैकर',
    checklistSuffix: 'अनुष्ठान एवं व्रत संकल्प चेकलिस्ट',
    description: 'प्रत्येक पूजा एवं व्रत विधि पूर्ण करने पर टिक करें। आपकी प्रगति स्वतः सुरक्षित हो जाती है।',
    share: 'शेयर',
    copied: 'कॉपी हो गया!',
    reset: 'रीसेट',
    resetConfirm: 'क्या आप इस व्रत की संकल्प प्रगति रीसेट करना चाहते हैं?',
    progressLabel: 'पूर्ण किए गए अनुष्ठान:',
    congratsTitle: 'बधाई! आपका व्रत अनुष्ठान सफलतापूर्वक संपन्न हुआ!',
    congratsBody: (d) => `श्री ${d} की कृपा से आपका पावन व्रत संपन्न हुआ। आपके परिवार को सुख, शांति, आरोग्य एवं आध्यात्मिक समृद्धि प्राप्त हो।`,
    stepPrefix: 'चरण',
    dietTitle: 'आहार नियम प्रतिज्ञा सत्यापन',
    dietBody: 'मैंने दिनभर सात्विक फलाहार का पालन किया तथा अन्न, साधारण नमक और तामसिक पदार्थों का पूर्ण त्याग रखा।',
    paranaTitle: 'अगले दिन प्रातः पारण समय:',
    shastricRule: 'शास्त्र सम्मत नियम',
    localSaveNotice: 'प्रगति आपके डिवाइस पर सुरक्षित है',
    shareText: (v, d, t) => `मैंने NewsDarshan पर ${v} के ${d}/${t} अनुष्ठान पूर्ण कर लिए हैं! 🙏`,
    timings: {
      earlyMorning: 'प्रातःकाल (ब्रह्म मुहूर्त)',
      morningPuja: 'प्रातः षोडशोपचार पूजा',
      allDay: 'दिनभर (सात्विक चर्या)',
      twilight: 'संध्याकालीन आरती व दीपदान',
      parana: 'अगले दिन शुभ पारण'
    }
  },
  mr: {
    trackerBadge: 'डिजिटल व्रत संकल्प ट्रॅकर',
    checklistSuffix: 'विधी व व्रत संकल्प चेकलिस्ट',
    description: 'आपण पूर्ण केलेल्या विधींवर टिक करा. आपली प्रगती आपोआप सेव्ह केली जाईल.',
    share: 'शेअर',
    copied: 'कॉपी झाले!',
    reset: 'रीसेट',
    resetConfirm: 'आपण सर्व विधी प्रगती रीसेट करू इच्छिता का?',
    progressLabel: 'संकल्प प्रगती:',
    congratsTitle: 'अभिनंदन! आपले व्रत यशस्वीपणे पूर्ण झाले!',
    congratsBody: (d) => `श्री ${d} च्या कृपेने आपले व्रत भक्तिभावाने संपन्न झाले आहे. आपल्या कुटुंबाला आरोग्य, शांती व आध्यात्मिक समृद्धी लाभो!`,
    stepPrefix: 'विधी क्र.',
    dietTitle: 'आहार नियम प्रतिज्ञा',
    dietBody: 'मी दिवसभरात सात्त्विक फलाहार पाळला असून अन्न, मीठ व तामसिक पदार्थांचा त्याग केला आहे.',
    paranaTitle: 'पुढील सकाळी पारण वेळ:',
    shastricRule: 'शास्त्र नियम',
    localSaveNotice: 'प्रगती आपल्या ब्राउझरमध्ये सुरक्षित ठेवली जाते',
    shareText: (v, d, t) => `मी NewsDarshan वर ${v} चे ${d}/${t} विधी पूर्ण केले आहेत! 🙏`,
    timings: {
      earlyMorning: 'प्रातःकाळ (ब्रह्म मुहूर्त)',
      morningPuja: 'सकाळची षोडशोपचार पूजा',
      allDay: 'दिवसभर',
      twilight: 'संध्याकाळची आरती',
      parana: 'दुसऱ्या दिवशी पारण'
    }
  },
  gu: {
    trackerBadge: 'ડિજિટલ વ્રત સંકલ્પ ટ્રેકર',
    checklistSuffix: 'પૂજા વિધિ અને વ્રત સંકલ્પ યાદી',
    description: 'દરેક વ્રત વિધિ પૂર્ણ કર્યા પછી ટીક કરો. તમારી પ્રગતિ આપમેળે સેવ થઈ જશે.',
    share: 'શેર કરો',
    copied: 'કોપી થઈ ગયું!',
    reset: 'રીસેટ',
    resetConfirm: 'શું તમે આ વ્રતની પ્રગતિ રીસેટ કરવા માંગો છો?',
    progressLabel: 'પૂર્ણ થયેલ વિધિઓ:',
    congratsTitle: 'અભિનંદન! તમારું વ્રત સફળતાપૂર્વક સંપન્ન થયું!',
    congratsBody: (d) => `શ્રી ${d} ની કૃપાથી તમારું વ્રત પૂર્ણ થયું. આપના પરિવારમાં સુખ, શાંતિ અને સમૃદ્ધિ આવે.`,
    stepPrefix: 'પગલું',
    dietTitle: 'સાત્વિક આહાર નિયમ',
    dietBody: 'મેં આખો દિવસ અન્ન અને મીઠાનો ત્યાગ કરી સાત્વિક ફળાહાર કર્યો છે.',
    paranaTitle: 'બીજા દિવસે સવારે પારણાં સમય:',
    shastricRule: 'શાસ્ત્રોક્ત નિયમ',
    localSaveNotice: 'તમારા ઉપકરણ પર સુરક્ષિત',
    shareText: (v, d, t) => `મેં NewsDarshan પર ${v} ના ${d}/${t} વિધિ પૂર્ણ કર્યા છે! 🙏`,
    timings: {
      earlyMorning: 'પ્રાતઃકાળ (બ્રહ્મ મુહૂર્ત)',
      morningPuja: 'સવારની પૂજા અર્ચના',
      allDay: 'આખો દિવસ',
      twilight: 'સાંજની આરતી',
      parana: 'બીજા દિવસે સવારે પારણાં'
    }
  },
  te: {
    trackerBadge: 'డిజిటల్ వ్రత సంకల్ప ట్రాకర్',
    checklistSuffix: 'పూజా విధానం మరియు వ్రత సంకల్పం',
    description: 'ప్రతి పూజా విధానం పూర్తయిన వెంటనే టిక్ చేయండి. మీ పురోగతి ఆటోమేటిక్‌గా సేవ్ అవుతుంది.',
    share: 'షేర్ చేయండి',
    copied: 'కాపీ అయింది!',
    reset: 'రీసెట్',
    resetConfirm: 'మీరు ఈ వ్రత పురోగతిని రీసెట్ చేయాలనుకుంటున్నారా?',
    progressLabel: 'పూర్తయిన పూజా విధులకు సంఖ్య:',
    congratsTitle: 'అభినందనలు! మీ పవిత్ర వ్రతం విజయవంతంగా పూర్తయింది!',
    congratsBody: (d) => `శ్రీ ${d} అనుగ్రహంతో మీ వ్రతం భక్తిశ్రద్ధలతో పూర్తయింది. మీ కుటుంబానికి ఆయురారోగ్యాలు, ఐశ్వర్యం కలగాలని ప్రార్థన.`,
    stepPrefix: 'దశ',
    dietTitle: 'సాత్విక ఆహార నియమ ధృవీకరణ',
    dietBody: 'నేను రోజంతా ధాన్యాలు, ఉప్పు విసర్జించి పవిత్ర సాత్విక ఫలాహారాన్ని మాత్రమే స్వీకరించాను.',
    paranaTitle: 'మరుసటి రోజు ఉదయం పారణ సమయం:',
    shastricRule: 'శాస్త్రోక్త నియమం',
    localSaveNotice: 'మీ పరికరంలో సురక్షితంగా సేవ్ అయింది',
    shareText: (v, d, t) => `నేను NewsDarshan లో ${v} కోసం ${d}/${t} విధులను పూర్తి చేసాను! 🙏`,
    timings: {
      earlyMorning: 'బ్రహ్మ ముహూర్తం (సూర్యోదయానికి ముందు)',
      morningPuja: 'ఉదయం షోడశోపచార పూజ',
      allDay: 'రోజంతా సాత్విక నిష్ట',
      twilight: 'సాయంత్రం సంధ్యా హారతి',
      parana: 'మరుసటి రోజు ఉదయం పారణ'
    }
  },
  ta: {
    trackerBadge: 'டிஜிட்டல் விரத சங்கல்ப டிராக்கர்',
    checklistSuffix: 'பூஜை முறைகள் மற்றும் விரத வழிபாட்டு பட்டியல்',
    description: 'ஒவ்வொரு வழிபாட்டு முறையையும் பூர்த்தி செய்தவுடன் டிக் செய்யவும். உங்கள் முன்னேற்றம் தானாக சேமிக்கப்படும்.',
    share: 'பகிர்',
    copied: 'நகலெடுக்கப்பட்டது!',
    reset: 'மீட்டமை',
    resetConfirm: 'விரத முன்னேற்றத்தை மீட்டமைக்க விரும்புகிறீர்களா?',
    progressLabel: 'பூர்த்தியான சடங்குகள்:',
    congratsTitle: 'வாழ்த்துகள்! உங்கள் விரதம் சிறப்பாக பூர்த்தியடைந்தது!',
    congratsBody: (d) => `ஸ்ரீ ${d} திருவருளால் உங்கள் விரதம் இனிதே நிறைவேறியது. உங்கள் குடும்பத்திற்கு நல்வாழ்வும் அமைதியும் கிட்டட்டும்.`,
    stepPrefix: 'படி',
    dietTitle: 'உணவு கட்டுப்பாட்டு உறுதிமொழி',
    dietBody: 'நான் நாள் முழுவதும் தானியங்கள் மற்றும் உப்பைத் தவிர்த்து சாத்வீக பழ உணவுகளை மட்டுமே உட்கொண்டேன்.',
    paranaTitle: 'மறுநாள் காலை விரத பாரணை நேரம்:',
    shastricRule: 'சாஸ்திர விதி',
    localSaveNotice: 'உங்கள் சாதனத்தில் பாதுகாப்பாக சேமிக்கப்பட்டுள்ளது',
    shareText: (v, d, t) => `NewsDarshan-ல் ${v} விரதத்தில் ${d}/${t} சடங்குகளை முடித்துவிட்டேன்! 🙏`,
    timings: {
      earlyMorning: 'பிரம்ம முகூர்த்தம்',
      morningPuja: 'காலை சோடசோபசார பூஜை',
      allDay: 'நாள் முழுவதும்',
      twilight: 'மாலை தீபாராதனை',
      parana: 'மறுநாள் காலை பாரணை'
    }
  },
  kn: {
    trackerBadge: 'ಡಿಜಿಟಲ್ ವ್ರತ ಸಂಕಲ್ಪ ಟ್ರ್ಯಾಕರ್',
    checklistSuffix: 'ಪೂಜಾ ವಿಧಿ ಮತ್ತು ವ್ರತ ಸಂಕಲ್ಪ ಪಟ್ಟಿ',
    description: 'ಪ್ರತಿ ಪೂಜಾ ಹಂತವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದಂತೆ ಗುರುತು ಮಾಡಿ. ನಿಮ್ಮ ಪ್ರಗತಿಯು ತಾನಾಗಿಯೇ ಉಳಿಯುತ್ತದೆ.',
    share: 'ಹಂಚಿಕೊಳ್ಳಿ',
    copied: 'ಕಾಪಿಯಾಗಿದೆ!',
    reset: 'ರೀಸೆಟ್',
    resetConfirm: 'ವ್ರತ ಪ್ರಗತಿಯನ್ನು ರೀಸೆಟ್ ಮಾಡಲು ಬಯಸುವಿರಾ?',
    progressLabel: 'ಪೂರ್ಣಗೊಂಡ ವಿಧಿಗಳು:',
    congratsTitle: 'ಅಭಿನಂದನೆಗಳು! ನಿಮ್ಮ ವ್ರತವು ಯಶಸ್ವಿಯಾಗಿ ಸಂಪನ್ನಗೊಂಡಿದೆ!',
    congratsBody: (d) => `ಶ್ರೀ ${d} ದಿವ್ಯ ಕೃಪೆಯಿಂದ ನಿಮ್ಮ ವ್ರತ ಪೂರ್ಣಗೊಂಡಿದೆ. ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಸುಖ, ಶಾಂತಿ ಮತ್ತು ಸಮೃದ್ಧಿ ದೊರಕಲಿ.`,
    stepPrefix: 'ಹಂತ',
    dietTitle: 'ಸಾತ್ವಿಕ ಆಹಾರ ನಿಯಮ ದೃಢೀಕರಣ',
    dietBody: 'ನಾನು ದಿನವಿಡೀ ಧಾನ್ಯ ಮತ್ತು ಉಪ್ಪು ತ್ಯಜಿಸಿ ಸಾತ್ವಿಕ ಫಲಾಹಾರವನ್ನು ಮಾತ್ರ ಸ್ವೀಕರಿಸಿದ್ದೇನೆ.',
    paranaTitle: 'ಮರುದಿನ ಬೆಳಗ್ಗೆ ಪಾರಣೆ ಸಮಯ:',
    shastricRule: 'ಶಾಸ್ತ್ರೋಕ್ತ ನಿಯಮ',
    localSaveNotice: 'ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ',
    shareText: (v, d, t) => `ನಾನು NewsDarshan ನಲ್ಲಿ ${v} ನ ${d}/${t} ವಿಧಿಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೇನೆ! 🙏`,
    timings: {
      earlyMorning: 'ಬ್ರಾಹ್ಮೀ ಮುಹೂರ್ತ',
      morningPuja: 'ಬೆಳಗಿನ ಷೋಡಶೋಪಚಾರ ಪೂಜೆ',
      allDay: 'ದಿನವಿಡೀ',
      twilight: 'ಸಂಜೆ ಮಹಾಮಂಗಳಾರತಿ',
      parana: 'ಮರುದಿನ ಬೆಳಗ್ಗೆ ಪಾರಣೆ'
    }
  },
  ml: {
    trackerBadge: 'ഡിജിറ്റൽ വ്രത സങ്കല്പ ട്രാക്കർ',
    checklistSuffix: 'പൂജാ വിധികളും വ്രതാനുഷ്ഠാന ചെക്ക്‌ലിസ്റ്റും',
    description: 'ഓരോ വ്രതാനുഷ്ഠാനവും പൂർത്തിയാക്കുമ്പോൾ ടിക്ക് ചെയ്യുക. നിങ്ങളുടെ വിവരങ്ങൾ സുരക്ഷിതമായി സൂക്ഷിക്കും.',
    share: 'പങ്കുവെക്കുക',
    copied: 'കോപ്പി ചെയ്തു!',
    reset: 'റീസെറ്റ്',
    resetConfirm: 'വ്രത പുരോഗതി റീസെറ്റ് ചെയ്യണോ?',
    progressLabel: 'പൂർത്തിയായ അനുഷ്ഠാനങ്ങൾ:',
    congratsTitle: 'അഭിനന്ദനങ്ങൾ! നിങ്ങളുടെ വ്രതം ഭക്തിപൂർവ്വം പൂർത്തിയായി!',
    congratsBody: (d) => `ശ്രീ ${d} അനുഗ്രഹത്താൽ നിങ്ങളുടെ വ്രതം സഫലമായി. കുടുംബത്തിന് ഐശ്വര്യവും സമാധാനവും ഉണ്ടാകട്ടെ.`,
    stepPrefix: 'ഘട്ടം',
    dietTitle: 'സാത്വിക ആഹാര നിഷ്ഠ',
    dietBody: 'ധാന്യങ്ങളും ഉപ്പും ഒഴിവാക്കി ശുദ്ധമായ സാത്വിക ഫലാഹാരം മാത്രം അനുഷ്ഠിച്ചു.',
    paranaTitle: 'പിറ്റേന്ന് രാവിലെ പാരണ സമയം:',
    shastricRule: 'ശാസ്ത്രവിധി',
    localSaveNotice: 'ബ്രൗസറിൽ സൂക്ഷിച്ചിരിക്കുന്നു',
    shareText: (v, d, t) => `NewsDarshan-ൽ ${v} വ്രതത്തിന്റെ ${d}/${t} ഘട്ടങ്ങൾ പൂർത്തിയാക്കി! 🙏`,
    timings: {
      earlyMorning: 'ബ്രഹ്മമുഹൂർത്തം',
      morningPuja: 'രാവിലത്തെ പൂജ',
      allDay: 'ദിവസം മുഴുവൻ',
      twilight: 'സന്ധ്യാ ദീപാരാധന',
      parana: 'പിറ്റേന്ന് രാവിലെ പാരണ'
    }
  },
  bn: {
    trackerBadge: 'ডিজিটাল ব্রত সংকল্প ট্র্যাকার',
    checklistSuffix: 'ব্রত ও পূজা বিধি চেকলিস্ট',
    description: 'প্রতিটি পূজা ও ব্রত নিয়ম সম্পন্ন করার পর টিক দিন। আপনার অগ্রগতি স্বয়ংক্রিয়ভাবে সংরক্ষিত হবে।',
    share: 'শেয়ার করুন',
    copied: 'কপি হয়েছে!',
    reset: 'রিসেট',
    resetConfirm: 'আপনি কি এই ব্রতের অগ্রগতি রিসেট করতে চান?',
    progressLabel: 'সম্পন্ন বিধি:',
    congratsTitle: 'অভিনন্দন! আপনার ব্রত সফলভাবে সম্পন্ন হয়েছে!',
    congratsBody: (d) => `শ্রী ${d}-এর কৃপায় আপনার ব্রত সম্পন্ন হলো। আপনার ও পরিবারের সুখ, শান্তি ও আধ্যাত্মিক সমৃদ্ধি হোক।`,
    stepPrefix: 'পদক্ষেপ',
    dietTitle: 'সাত্ত্বিক আহার নিয়ম যাচাই',
    dietBody: 'আমি সারাদিন অন্ন ও সাধারণ লবণ ত্যাগ করে পবিত্র সাত্ত্বিক ফলাহার গ্রহণ করেছি।',
    paranaTitle: 'পরের দিন সকালে পারণ সময়:',
    shastricRule: 'শাস্ত্রসম্মত নিয়ম',
    localSaveNotice: 'আপনার ডিভাইসে সংরক্ষিত',
    shareText: (v, d, t) => `আমি NewsDarshan-এ ${v}-এর ${d}/${t} আচার সম্পন্ন করেছি! 🙏`,
    timings: {
      earlyMorning: 'ব্রাহ্ম মুহূর্ত',
      morningPuja: 'সকালের ষোড়শোপচার পূজা',
      allDay: 'সারাদিন',
      twilight: 'সন্ধ্যা আরতি',
      parana: 'পরের দিন পারণ'
    }
  },
  or: {
    trackerBadge: 'ଡିଜିଟାଲ ବ୍ରତ ସଂକଳ୍ପ ଟ୍ରାକର',
    checklistSuffix: 'ପୂଜା ବିଧି ଓ ବ୍ରତ ସଂକଳ୍ପ ଚେକଲିଷ୍ଟ',
    description: 'ପ୍ରତ୍ୟେକ ବ୍ରତ ଓ ପୂଜା ବିଧି ସମ୍ପନ୍ନ କରିବା ପରେ ଟିକ୍ କରନ୍ତୁ। ଆପଣଙ୍କ ପ୍ରଗତି ଆପେଆପେ ସେଭ୍ ହୋଇଯିବ।',
    share: 'ସେୟାର କରନ୍ତୁ',
    copied: 'କପି ହୋଇଗଲା!',
    reset: 'ରିସେଟ୍',
    resetConfirm: 'ଆପଣ ଏହି ବ୍ରତ ପ୍ରଗତି ରିସେଟ୍ କରିବାକୁ ଚାହାଁନ୍ତି କି?',
    progressLabel: 'ସମ୍ପନ୍ନ ହୋଇଥିବା ବିଧି:',
    congratsTitle: 'ଅଭିନନ୍ଦନ! ଆପଣଙ୍କ ବ୍ରତ ସଫଳତାର ସହ ସମ୍ପନ୍ନ ହେଲା!',
    congratsBody: (d) => `ପ୍ରଭୁ ଶ୍ରୀ ${d}ଙ୍କ କୃପାରୁ ଆପଣଙ୍କ ପବିତ୍ର ବ୍ରତ ସମ୍ପୂର୍ଣ୍ଣ ହେଲା। ପରିବାରରେ ଶାନ୍ତି, ସୁଖ ଓ ଆରୋଗ୍ୟ ଲାଭ ହେଉ।`,
    stepPrefix: 'ପଦକ୍ଷେପ',
    dietTitle: 'ସାତ୍ତ୍ୱିକ ଆହାର ନିୟମ ପ୍ରତିଜ୍ଞା',
    dietBody: 'ମୁଁ ଦିନସାରା ଅନ୍ନ ଓ ସାଧାରଣ ଲୁଣ ତ୍ୟାଗ କରି ଶୁଦ୍ଧ ସାତ୍ତ୍ୱିକ ଫଳାହାର ପାଳନ କରିଛି।',
    paranaTitle: 'ପରଦିନ ସକାଳ ପାରଣ ସମୟ:',
    shastricRule: 'ଶାସ୍ତ୍ରୀୟ ନିୟମ',
    localSaveNotice: 'ଆପଣଙ୍କ ଡିଭାଇସରେ ସୁରକ୍ଷିତ',
    shareText: (v, d, t) => `ମୁଁ NewsDarshan ରେ ${v} ର ${d}/${t} ବିଧି ସମ୍ପୂର୍ଣ୍ଣ କରିଛି! 🙏`,
    timings: {
      earlyMorning: 'ବ୍ରାହ୍ମ ମୁହୂର୍ତ୍ତ (ସୂର୍ଯ୍ୟୋଦୟ ପୂର୍ବରୁ)',
      morningPuja: 'ପ୍ରାତଃ ଷୋଡ଼ଶୋପଚାର ପୂଜା',
      allDay: 'ଦିନସାରା ସାତ୍ତ୍ୱିକ ନିଷ୍ଠା',
      twilight: 'ସନ୍ଧ୍ୟା ଆଳତି',
      parana: 'ପରଦିନ ସକାଳେ ଶୁଭ ପାରଣ'
    }
  },
  pa: {
    trackerBadge: 'ਡਿਜੀਟਲ ਵਰਤ ਸੰਕਲਪ ਟ੍ਰੈਕਰ',
    checklistSuffix: 'ਪੂਜਾ ਵਿਧੀ ਅਤੇ ਵਰਤ ਸੰਕਲਪ',
    description: 'ਹਰ ਵਿਧੀ ਪੂਰੀ ਹੋਣ \'ਤੇ ਟਿੱਕ ਕਰੋ। ਤੁਹਾਡੀ ਪ੍ਰਗਤੀ ਆਪਣੇ ਆਪ ਸੁਰੱਖਿਅਤ ਹੋ ਜਾਵੇਗੀ।',
    share: 'ਸਾਂਝਾ ਕਰੋ',
    copied: 'ਕਾਪੀ ਹੋ ਗਿਆ!',
    reset: 'ਰੀਸੈਟ',
    resetConfirm: 'ਕੀ ਤੁਸੀਂ ਇਸ ਵਰਤ ਦੀ ਪ੍ਰਗਤੀ ਰੀਸੈਟ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
    progressLabel: 'ਪੂਰੀਆਂ ਹੋਈਆਂ ਵਿਧੀਆਂ:',
    congratsTitle: 'ਵਧਾਈ! ਤੁਹਾਡਾ ਵਰਤ ਸਫਲਤਾਪੂਰਵਕ ਸੰਪੰਨ ਹੋਇਆ!',
    congratsBody: (d) => `ਸ਼੍ਰੀ ${d} ਦੀ ਕ੍ਰਿਪਾ ਨਾਲ ਤੁਹਾਡਾ ਪਵਿੱਤਰ ਵਰਤ ਪੂਰਾ ਹੋਇਆ। ਪਰਿਵਾਰ ਵਿੱਚ ਖੁਸ਼ਹਾਲੀ ਅਤੇ ਸ਼ਾਂਤੀ ਆਵੇ।`,
    stepPrefix: 'ਕਦਮ',
    dietTitle: 'ਸਾਤਵਿਕ ਆਹਾਰ ਨਿਯਮ',
    dietBody: 'ਮੈਂ ਸਾਰਾ ਦਿਨ ਅੰਨ ਅਤੇ ਨਮਕ ਦਾ ਤਿਆਗ ਕਰਕੇ ਸਾਤਵਿਕ ਫਲਾਹਾਰ ਕੀਤਾ ਹੈ।',
    paranaTitle: 'ਅਗਲੇ ਦਿਨ ਸਵੇਰੇ ਪਾਰਣਾ ਸਮਾਂ:',
    shastricRule: 'ਸ਼ਾਸਤਰੀ ਨਿਯਮ',
    localSaveNotice: 'ਤੁਹਾਡੇ ਡਿਵਾਈਸ \'ਤੇ ਸੁਰੱਖਿਅਤ',
    shareText: (v, d, t) => `ਮੈਂ NewsDarshan \'ਤੇ ${v} ਦੇ ${d}/${t} ਨੇਮ ਪੂਰੇ ਕਰ ਲਏ ਹਨ! 🙏`,
    timings: {
      earlyMorning: 'ਬ੍ਰਹਮ ਮੁਹੂਰਤ',
      morningPuja: 'ਸਵੇਰ ਦੀ ਪੂਜਾ ਅਰਚਨਾ',
      allDay: 'ਸਾਰਾ ਦਿਨ',
      twilight: 'ਸੰਧਿਆ ਆਰਤੀ',
      parana: 'ਅਗਲੇ ਦਿਨ ਸਵੇਰੇ ਪਾਰਣਾ'
    }
  },
  as: {
    trackerBadge: 'ডিজিটেল ব্ৰত সংকল্প ট্ৰেকাৰ',
    checklistSuffix: 'পূজা বিধি আৰু ব্ৰত সংকল্প',
    description: 'প্ৰতিটো পূজা আৰু ব্ৰত নিয়ম সম্পূৰ্ণ কৰাৰ পিছত টিক দিয়ক।',
    share: 'শ্বেয়াৰ কৰক',
    copied: 'কপি কৰা হ\'ল!',
    reset: 'ৰিচেট',
    resetConfirm: 'আপুনি এই ব্ৰতৰ প্ৰগতি ৰিচেট কৰিব বিচাৰেনে?',
    progressLabel: 'সম্পূৰ্ণ কৰা বিধি:',
    congratsTitle: 'অভিনন্দন! আপোনাৰ ব্ৰত সফলতাৰে সম্পন্ন হ\'ল!',
    congratsBody: (d) => `শ্ৰী ${d}ৰ কৃপাত আপোনাৰ ব্ৰত পূৰ্ণ হ\'ল। পৰিয়াললৈ শান্তি আৰু সমৃদ্ধি আহক।`,
    stepPrefix: 'পদক্ষেপ',
    dietTitle: 'সাত্বিক আহাৰ নিয়ম প্ৰতিজ্ঞা',
    dietBody: 'মই গোটেই দিনটো অন্ন আৰু নিমখ বৰ্জন কৰি পৱিত্ৰ সাত্বিক ফলাহাৰ গ্ৰহণ কৰিছোঁ।',
    paranaTitle: 'পিছদিনা পুৱা পাৰণ সময়:',
    shastricRule: 'শাস্ত্ৰীয় নিয়ম',
    localSaveNotice: 'আপোনাৰ ডিভাইচত সুৰক্ষিত',
    shareText: (v, d, t) => `মই NewsDarshan-ত ${v}ৰ ${d}/${t} বিধি সম্পূৰ্ণ কৰিলোঁ! 🙏`,
    timings: {
      earlyMorning: 'ব্ৰাহ্ম মুহূৰ্ত',
      morningPuja: 'পুৱাৰ ষোড়শোপচাৰ পূজা',
      allDay: 'গোটেই দিন',
      twilight: 'সন্ধ্যা আৰতি',
      parana: 'পিছদিনা পুৱা পাৰণ'
    }
  }
};

// Automatic translation of common ritual phrases across 12 languages
function translateRitualSentence(raw: string, lang: LanguageCode): string {
  if (!raw || lang === 'en') return raw;
  const lower = raw.toLowerCase();

  // 1. Bath / holy dip
  if (lower.includes('bath') || lower.includes('snan') || lower.includes('स्नान')) {
    const bathMap: Record<LanguageCode, string> = {
      en: raw,
      hi: 'ब्रह्म मुहूर्त में पवित्र नदी या गंगाजल युक्त जल से स्नान',
      mr: 'ब्रह्म मुहूर्तावर पवित्र नदीत किंवा गंगाजलयुक्त पाण्याने स्नान',
      gu: 'બ્રહ્મ મુહૂર્તમાં પવિત્ર જળથી સ્નાન',
      te: 'బ్రహ్మ ముహూర్తంలో పవిత్ర నదీ స్నానం లేదా గంగాజల స్నానం',
      ta: 'பிரம்ம முகூர்த்தத்தில் புனித நீராடல்',
      kn: 'ಬ್ರಹ್ಮ ಮುಹೂರ್ತದಲ್ಲಿ ಪವಿತ್ರ ಸ್ನಾನ',
      ml: 'ബ്രഹ്മമുഹൂർത്തത്തിൽ പുണ്യസ്നാനം',
      bn: 'ব্রাহ্ম মুহূর্তে গঙ্গাজল মিশ্রিত জলে পুণ্যস্নান',
      or: 'ବ୍ରାହ୍ମ ମୁହୂର୍ତ୍ତରେ ପବିତ୍ର ଗଙ୍ଗାଜଳ ସ୍ନାନ',
      pa: 'ਬ੍ਰਹਮ ਮੁਹੂਰਤ ਵਿੱਚ ਪਵਿੱਤਰ ਇਸ਼ਨਾਨ',
      as: 'ব্ৰাহ্ম মুহূৰ্তত পৱিত্ৰ স্নান'
    };
    return bathMap[lang] || raw;
  }

  // 2. Surya Arghya
  if (lower.includes('surya') || lower.includes('arghya') || lower.includes('sun')) {
    const suryaMap: Record<LanguageCode, string> = {
      en: raw,
      hi: 'तांबे के लोटे से भगवान सूर्य को अर्घ्य एवं ॐ सूर्याय नमः मंत्र जप',
      mr: 'तांब्याच्या पात्रातून भगवान सूर्यदेवांना अर्घ्य समर्पण व नमस्कार',
      gu: 'તાંબાના લોટાથી સૂર્યદેવને અર્ઘ્ય અને ગાયત્રી મંત્ર જાપ',
      te: 'రాగి పాత్రతో సూర్య భగవానునికి అర్ఘ్య ప్రదానం మరియు సూర్య నమస్కారాలు',
      ta: 'சூரிய பகவானுக்கு செம்பு பாத்திரத்தில் அர்க்கியம் அளித்து வழிபாடு',
      kn: 'ಸೂರ್ಯ ದೇವರಿಗೆ ತಾಮ್ರದ ಪಾತ್ರೆಯಿಂದ ಅರ್ಘ್ಯ ಅರ್ಪಣೆ',
      ml: 'സൂര്യഭഗവാന് അർഘ്യം സമർപ്പിക്കലും പ്രാർത്ഥനയും',
      bn: 'তামার পাত্রে ভগবান সূর্যদেবকে অর্ঘ্য নিবেদন ও প্রণাম',
      or: 'ସୂର୍ଯ୍ୟଦେବଙ୍କୁ ତମ୍ବା ପାତ୍ରରେ ଅର୍ଘ୍ୟ ପ୍ରଦାନ ଓ ନମସ୍କାର',
      pa: 'ਸੂਰਜ ਦੇਵਤਾ ਨੂੰ ਅਰਘ ਦੇਣਾ ਅਤੇ ਪ੍ਰਾਰਥਨਾ',
      as: 'সূৰ্যদেৱক অৰ্ঘ্য প্ৰদান আৰু প্ৰাৰ্থনা'
    };
    return suryaMap[lang] || raw;
  }

  // 3. Donation / Daan (Til, Gud, Khichdi, Clothes)
  if (lower.includes('donation') || lower.includes('daan') || lower.includes('til') || lower.includes('khichdi') || lower.includes('दान')) {
    const daanMap: Record<LanguageCode, string> = {
      en: raw,
      hi: 'तिल, गुड़, खिचड़ी, कंबल एवं दक्षिणा का जरूरतमंदों को दान',
      mr: 'तीळ, गूळ, खिचडी, उबदार कपडे व दानाचे वाटप',
      gu: 'તલ, ગોળ, ખીચડી અને જરૂરિયાતમંદોને વસ્ત્ર દાન',
      te: 'నువ్వులు, బెల్లం, కిచిడీ, పేదలకు వస్త్ర దానం',
      ta: 'எள், வெல்லம், அன்னதானம் மற்றும் ஏழைகளுக்கு வஸ்திர தானம்',
      kn: 'ಎಳ್ಳು-ಬೆಲ್ಲ, ಬಟ್ಟೆ ಹಾಗೂ ಅನ್ನದಾನ ಮಾಡುವುದು',
      ml: 'എള്ള്, ശർക്കര, ധാന്യങ്ങൾ, വസ്ത്രദാനം ചെയ്യൽ',
      bn: 'তিল, গুড়, খিচুড়ি এবং বস্ত্র-দান',
      or: 'ରାଶି, ଗୁଡ଼, ଖେଚୁଡ଼ି ଓ ଗରିବଙ୍କୁ ବସ୍ତ୍ର ଦାନ',
      pa: 'ਤਿਲ, ਗੁੜ, ਖਿਚੜੀ ਅਤੇ ਗਰੀਬਾਂ ਨੂੰ ਦਾਨ',
      as: 'তিল, গুড়, খিচিৰি আৰু দুখীয়াক বস্ত্ৰ দান'
    };
    return daanMap[lang] || raw;
  }

  // 4. Sankalpa
  if (lower.includes('sankalpa') || lower.includes('संकल्प')) {
    const sankalpaMap: Record<LanguageCode, string> = {
      en: raw,
      hi: 'दाहिने हाथ में जल एवं अक्षत लेकर विधिवत व्रत संकल्प',
      mr: 'उजव्या हातात पाणी व अक्षता घेऊन व्रत संकल्प',
      gu: 'જમણા હાથમાં જળ રાખી શાસ્ત્રોક્ત વ્રત સંકલ્પ',
      te: 'చేతిలో పవిత్ర జలంతో వ్రత సంకల్పం స్వీకరించడం',
      ta: 'வலது கையில் தீர்த்தம் ஏந்தி விரத சங்கல்பம் செய்தல்',
      kn: 'ಬಲಗೈಯಲ್ಲಿ ಪವಿತ್ರ ಜಲ ಹಿಡಿದು ವ್ರತ ಸಂಕಲ್ಪ',
      ml: 'വലതുകയ്യിൽ തീർത്ഥമെടുത്ത് വ്രതസങ്കല്പം ചെയ്യൽ',
      bn: 'হাতে জল ও অক্ষত নিয়ে ভক্তিভরে ব্রত সংকল্প',
      or: 'ଡାହାଣ ହାତରେ ଜଳ ନେଇ ବ୍ରତ ସଂକଳ୍ପ',
      pa: 'ਹੱਥ ਵਿੱਚ ਜਲ ਲੈ ਕੇ ਸ਼ਰਧਾਪੂਰਵਕ ਵਰਤ ਦਾ ਸੰਕਲਪ',
      as: 'হাতত পৱিত্ৰ জল লৈ ব্ৰত সংকল্প গ্ৰহণ'
    };
    return sankalpaMap[lang] || raw;
  }

  // 5. Worship / Puja / Shodashopachara
  if (lower.includes('worship') || lower.includes('puja') || lower.includes('lamp') || lower.includes('incense') || lower.includes('पूजा')) {
    const pujaMap: Record<LanguageCode, string> = {
      en: raw,
      hi: 'दीप, धूप, पुष्प, चंदन एवं नैवेद्य से षोडशोपचार पूजन',
      mr: 'धूप, दीप, फुले, चंदन व नैवेद्य अर्पून षोडशोपचार पूजा',
      gu: 'ધૂપ, દીપ, પુષ્પ અને નૈવેદ્યથી ષોડશોપચાર પૂજા',
      te: 'షోడశోపచారాలతో ఇష్టదైవ పూజ మరియు దీపారాధన',
      ta: 'மலர்கள், தூபம், நெய் தீபத்துடன் சோடசோபசார பூஜை',
      kn: 'ಹೂವು, ಧೂಪ, ದೀಪ ಮತ್ತು ನೈವೇದ್ಯಗಳೊಂದಿಗೆ ಷೋಡಶೋಪಚಾರ ಪೂಜೆ',
      ml: 'പുഷ്പങ്ങൾ, ധൂപം, നെയ്‌വിളക്ക് എന്നിവയോടെ ഷോഡശോപചാര പൂജ',
      bn: 'ফুল, চন্দন, ধূপ, ঘৃত প্রদীপ সহযোগে ষোড়শোপচারে পূজা',
      or: 'ଫୁଲ, ଚନ୍ଦନ, ଧୂପ, ଦୀପ ଓ ନୈବେଦ୍ୟ ସହ ଷୋଡ଼ଶୋପଚାର ପୂଜା',
      pa: 'ਧੂਪ, ਦੀਪ, ਫੁੱਲਾਂ ਅਤੇ ਨੈਵੇਦ ਨਾਲ ਪੂਜਾ ਅਰਚਨਾ',
      as: 'ফুল, চন্দন, ধূপ, ঘিউৰ চাকিৰে ষোড়শোপচাৰ পূজা'
    };
    return pujaMap[lang] || raw;
  }

  // 6. Katha / Recitation / Aarti
  if (lower.includes('katha') || lower.includes('recitation') || lower.includes('aarti') || lower.includes('आरती') || lower.includes('कथा')) {
    const kathaMap: Record<LanguageCode, string> = {
      en: raw,
      hi: 'व्रत कथा श्रवण, इष्ट मंत्र जप एवं संध्या आरती',
      mr: 'व्रत कथा वाचन, नामस्मरण व संध्या आरती',
      gu: 'વ્રત કથા શ્રવણ, મંત્ર જાપ અને સાંજની આરતી',
      te: 'వ్రత కథ పారాయణం, స్తోత్ర పఠనం మరియు హారతి',
      ta: 'விரத கதை படித்தல், மந்திர ஜபம் மற்றும் மாலை ஆரத்தி',
      kn: 'ವ್ರತ ಕಥಾ ಶ್ರವಣ, ಮಂತ್ರ ಜಪ ಮತ್ತು ಸಂಧ್ಯಾ ಆರತಿ',
      ml: 'വ്രതകഥാ ശ്രവണം, മന്ത്രജപം, ദീപാരാധന',
      bn: 'ব্রত কথা পাঠ, স্তোত্র পাঠ ও আরতি',
      or: 'ବ୍ରତ କଥା ପାଠ, ମନ୍ତ୍ର ଜପ ଓ ସନ୍ଧ୍ୟା ଆଳତି',
      pa: 'ਵਰਤ ਕਥਾ, ਮੰਤਰ ਜਾਪ ਅਤੇ ਆਰਤੀ',
      as: 'ব্ৰত কথা শ্ৰৱণ, মন্ত্ৰ জপ আৰু আৰতি'
    };
    return kathaMap[lang] || raw;
  }

  // 7. Diet / Phalahar
  if (lower.includes('diet') || lower.includes('phalahar') || lower.includes('grain') || lower.includes('फलाहार')) {
    const dietMap: Record<LanguageCode, string> = {
      en: raw,
      hi: 'अन्न एवं साधारण नमक का त्याग, सात्विक फलाहार',
      mr: 'धान्य व मीठ वर्ज्य करून सात्त्विक फलाहार',
      gu: 'અનાજ અને સામાન્ય મીઠાનો ત્યાગ, સાત્વિક ફળાહાર',
      te: 'ధాన్యాలు మరియు ఉప్పు విసర్జించి సాత్విక ఫలాహారం',
      ta: 'தானியங்கள் தவிர்த்து சாத்வீக பழ உணவுகள் மட்டும் உட்கொள்ளுதல்',
      kn: 'ಧಾನ್ಯ ಹಾಗೂ ಉಪ್ಪು ವರ್ಜಿಸಿ ಸಾತ್ವಿಕ ಫಲಾಹಾರ',
      ml: 'ധാന്യങ്ങളും ഉപ്പും ഉപേക്ഷിച്ച് സാത്വിക ഫലാഹാരം',
      bn: 'অন্ন ও লবণ বর্জন করে পবিত্র ফলমূল আহার',
      or: 'ଅନ୍ନ ଓ ଲବଣ ତ୍ୟାଗ କରି ସାତ୍ତ୍ୱିକ ଫଳାହାର',
      pa: 'ਅੰਨ ਅਤੇ ਨਮਕ ਦਾ ਤਿਆਗ, ਸਾਤਵਿਕ ਫਲਾਹਾਰ',
      as: 'অন্ন আৰু নিমখ ত্যাগ কৰি সাত্বিক ফলাহাৰ'
    };
    return dietMap[lang] || raw;
  }

  // 8. Parana
  if (lower.includes('parana') || lower.includes('पारण')) {
    const paranaMap: Record<LanguageCode, string> = {
      en: raw,
      hi: 'अगले दिन शुभ मुहूर्त में पारण एवं व्रत समापन',
      mr: 'दुसऱ्या दिवशी शुभ मुहूर्तात पारण व व्रताची सांगता',
      gu: 'બીજા દિવસે શુભ મુહૂર્તમાં પારણાં કરી વ્રત પૂર્ણ કરવું',
      te: 'మరుసటి రోజు శుభ ముహూర్తంలో పారణ చేయడం',
      ta: 'மறுநாள் காலை சுப முகூர்த்தத்தில் விரத பாரணை செய்தல்',
      kn: 'ಮರುದಿನ ಬೆಳಗ್ಗೆ ಶುಭ ಮುಹೂರ್ತದಲ್ಲಿ ಪಾರಣೆ',
      ml: 'പിറ്റേന്ന് രാവിലെ ശുഭമുഹൂർത്തത്തിൽ പാരണ നിർവഹിക്കൽ',
      bn: 'পরের দিন শুভ মুহূর্তে পারণ ও ব্রত সমাপ্তি',
      or: 'ପରଦିନ ଶୁଭ ମୁହୂର୍ତ୍ତରେ ପାରଣ ଓ ବ୍ରତ ସମାପନ',
      pa: 'ਅਗਲੇ ਦਿਨ ਸ਼ੁਭ ਮਹੂਰਤ ਵਿੱਚ ਪਾਰਣਾ ਕਰਨਾ',
      as: 'পিছদিনা পুৱা শুভ মুহূৰ্তত পাৰণ আৰু ব্ৰত সমাপন'
    };
    return paranaMap[lang] || raw;
  }

  return raw;
}

export default function VratRitualChecklist({
  vratId,
  vratName,
  rituals,
  paranaTime,
  deity = 'Bhagwan',
  currentLang = 'en',
  className = ''
}: VratRitualChecklistProps) {
  const t = UI_TEXTS[currentLang] || UI_TEXTS.en;
  const storageKey = `nd_vrat_ritual_tracker_${vratId}`;

  // Standardize and localize ritual items
  const normalizedRituals: RitualItem[] = rituals.map((r, idx) => {
    let timing = t.timings.allDay;
    if (idx === 0) timing = t.timings.earlyMorning;
    else if (idx === 1) timing = t.timings.morningPuja;
    else if (idx === rituals.length - 2) timing = t.timings.twilight;
    else if (idx === rituals.length - 1) timing = t.timings.parana;

    if (typeof r === 'string') {
      return {
        id: `step-${idx}`,
        title: translateRitualSentence(r, currentLang),
        timingTag: timing
      };
    }
    return {
      ...r,
      title: translateRitualSentence(r.title, currentLang),
      description: r.description ? translateRitualSentence(r.description, currentLang) : undefined,
      timingTag: r.timingTag || timing
    };
  });

  // Load saved state from localStorage
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) return JSON.parse(saved);
      } catch (err) {
        console.error('Error loading vrat checklist state:', err);
      }
    }
    return {};
  });

  const [dietChecked, setDietChecked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(`${storageKey}_diet`) === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  const [showCelebrationToast, setShowCelebrationToast] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Sync to localStorage
  const saveState = (updated: Record<string, boolean>) => {
    setCompletedSteps(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed saving vrat checklist state:', err);
      }
    }
  };

  const toggleStep = (stepId: string) => {
    const updated = {
      ...completedSteps,
      [stepId]: !completedSteps[stepId]
    };
    saveState(updated);

    const completedCount = normalizedRituals.filter((r) => updated[r.id]).length;
    if (completedCount === normalizedRituals.length) {
      setShowCelebrationToast(true);
      setTimeout(() => setShowCelebrationToast(false), 5000);
    }
  };

  const toggleDiet = () => {
    const nextVal = !dietChecked;
    setDietChecked(nextVal);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${storageKey}_diet`, String(nextVal));
    }
  };

  const handleReset = () => {
    if (window.confirm(t.resetConfirm)) {
      saveState({});
      setDietChecked(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(`${storageKey}_diet`);
      }
    }
  };

  const totalSteps = normalizedRituals.length;
  const completedCount = normalizedRituals.filter((r) => completedSteps[r.id]).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
  const isAllComplete = progressPercent === 100;

  const handleShare = () => {
    const shareText = t.shareText(vratName, completedCount, totalSteps);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    }
  };

  return (
    <div className={`bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#FAF1EC] via-[#FAF5F0] to-[#F5ECE5] border-b border-[#E8DCD4]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-amber-300 text-xs font-bold text-[#9A3412] mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.trackerBadge}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
              {vratName} – {t.checklistSuffix}
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              {t.description}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold rounded-xl border border-stone-300 transition-colors shadow-2xs"
              title="Share progress"
            >
              {shareCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">{t.copied}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-600" />
                  <span>{t.share}</span>
                </>
              )}
            </button>

            {completedCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-rose-50 text-stone-600 hover:text-rose-700 text-xs font-bold rounded-xl border border-stone-200 transition-colors shadow-2xs"
                title="Reset progress"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.reset}</span>
              </button>
            )}
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-stone-700 flex items-center gap-1.5">
              <span>{t.progressLabel}</span>
              <strong className="text-stone-900 font-mono">
                {getRegionalDigits(completedCount, currentLang)} / {getRegionalDigits(totalSteps, currentLang)}
              </strong>
            </span>
            <span
              className={`font-mono text-xs px-2 py-0.5 rounded-full ${
                isAllComplete
                  ? 'bg-emerald-100 text-emerald-900 font-extrabold'
                  : progressPercent > 0
                  ? 'bg-amber-100 text-amber-900 font-extrabold'
                  : 'bg-stone-200 text-stone-700'
              }`}
            >
              {getRegionalDigits(progressPercent, currentLang)}%
            </span>
          </div>

          <div className="w-full h-3 bg-stone-200/90 rounded-full overflow-hidden p-0.5 border border-stone-300/50">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                isAllComplete
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm'
                  : 'bg-gradient-to-r from-[#9A3412] to-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Celebratory Completion Alert */}
      {isAllComplete && (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-b border-emerald-200 flex items-start gap-3.5 text-emerald-950 animate-in fade-in duration-300">
          <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0 mt-0.5 shadow-xs">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black font-serif text-emerald-900 flex items-center gap-1.5">
              <span>{t.congratsTitle}</span>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              {t.congratsBody(deity)}
            </p>
          </div>
        </div>
      )}

      {/* Checklist Items */}
      <div className="p-5 sm:p-6 divide-y divide-stone-100 space-y-1">
        {normalizedRituals.map((ritual, idx) => {
          const isDone = !!completedSteps[ritual.id];
          const nativeIdx = getRegionalDigits(idx + 1, currentLang);

          return (
            <div
              key={ritual.id}
              onClick={() => toggleStep(ritual.id)}
              className={`py-3.5 px-3 rounded-2xl flex items-start gap-3.5 cursor-pointer transition-all ${
                isDone
                  ? 'bg-emerald-50/40 hover:bg-emerald-50/70 text-stone-600'
                  : 'hover:bg-amber-50/40 text-stone-900'
              }`}
            >
              {/* Checkbox Icon */}
              <button
                type="button"
                className={`mt-0.5 shrink-0 transition-transform active:scale-90 ${
                  isDone ? 'text-emerald-600' : 'text-stone-400 hover:text-[#9A3412]'
                }`}
                aria-label={`Toggle ${ritual.title}`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-6 h-6 fill-emerald-100" />
                ) : (
                  <Circle className="w-6 h-6 stroke-[1.8]" />
                )}
              </button>

              {/* Ritual Details */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-stone-500 font-mono">
                    {t.stepPrefix} {nativeIdx}
                  </span>
                  {ritual.timingTag && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{ritual.timingTag}</span>
                    </span>
                  )}
                </div>

                <div
                  className={`text-sm sm:text-base font-semibold mt-1 transition-all ${
                    isDone ? 'line-through text-stone-500 opacity-80' : 'text-stone-900'
                  }`}
                >
                  {ritual.title}
                </div>

                {ritual.description && (
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {ritual.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Dietary Rules Confirmation Checkbox */}
        <div
          onClick={toggleDiet}
          className={`pt-4 mt-2 py-3 px-3 rounded-2xl flex items-start gap-3.5 cursor-pointer transition-all border border-dashed ${
            dietChecked
              ? 'bg-amber-50/60 border-amber-300 text-stone-700'
              : 'bg-stone-50/50 border-stone-200 hover:border-amber-400 text-stone-900'
          }`}
        >
          <button
            type="button"
            className={`mt-0.5 shrink-0 transition-transform active:scale-90 ${
              dietChecked ? 'text-[#9A3412]' : 'text-stone-400'
            }`}
          >
            {dietChecked ? (
              <CheckCircle2 className="w-6 h-6 fill-amber-100" />
            ) : (
              <Circle className="w-6 h-6 stroke-[1.8]" />
            )}
          </button>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">
              {t.dietTitle}
            </div>
            <div className={`text-sm font-bold mt-0.5 ${dietChecked ? 'text-[#9A3412]' : 'text-stone-800'}`}>
              {t.dietBody}
            </div>
          </div>
        </div>

        {/* Parana Timing Banner */}
        {paranaTime && (
          <div className="pt-4 mt-2 flex items-center justify-between bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="font-bold text-emerald-950">{t.paranaTitle} </span>
                <span className="font-extrabold text-emerald-900 font-mono">{paranaTime}</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-emerald-300 shrink-0">
              {t.shastricRule}
            </span>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-6 py-3.5 bg-stone-50/90 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
          <span>{t.localSaveNotice}</span>
        </span>
        <span className="font-mono text-[11px]">{storageKey}</span>
      </div>
    </div>
  );
}
