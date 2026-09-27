import { CityInfo, PanchangData, ChoghadiyaSlot } from '../types';

export const CITIES: CityInfo[] = [
  // Metros & National Hubs
  { id: 'delhi', name: 'New Delhi', nameHi: 'नई दिल्ली', state: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.209, timezone: 'Asia/Kolkata', category: 'metro' },
  { id: 'mumbai', name: 'Mumbai', nameHi: 'मुम्बई', state: 'Maharashtra', country: 'India', latitude: 19.076, longitude: 72.8777, timezone: 'Asia/Kolkata', category: 'metro' },
  { id: 'bengaluru', name: 'Bengaluru', nameHi: 'बेंगलुरु', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata', category: 'metro' },
  { id: 'kolkata', name: 'Kolkata', nameHi: 'कोलकाता', state: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata', category: 'metro' },
  { id: 'chennai', name: 'Chennai', nameHi: 'चेन्नई', state: 'Tamil Nadu', country: 'India', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata', category: 'metro' },
  { id: 'hyderabad', name: 'Hyderabad', nameHi: 'हैदराबाद', state: 'Telangana', country: 'India', latitude: 17.385, longitude: 78.4867, timezone: 'Asia/Kolkata', category: 'metro' },
  { id: 'ahmedabad', name: 'Ahmedabad', nameHi: 'अहमदाबाद', state: 'Gujarat', country: 'India', latitude: 23.0225, longitude: 72.5714, timezone: 'Asia/Kolkata', category: 'metro' },
  { id: 'pune', name: 'Pune', nameHi: 'पुणे', state: 'Maharashtra', country: 'India', latitude: 18.5204, longitude: 73.8567, timezone: 'Asia/Kolkata', category: 'metro' },

  // Sacred Pilgrimage Cities (तीर्थ क्षेत्र)
  { id: 'varanasi', name: 'Varanasi (Kashi)', nameHi: 'वाराणसी (काशी)', state: 'Uttar Pradesh', country: 'India', latitude: 25.3176, longitude: 82.9739, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'ayodhya', name: 'Ayodhya', nameHi: 'अयोध्या धाम', state: 'Uttar Pradesh', country: 'India', latitude: 26.7922, longitude: 82.1998, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'ujjain', name: 'Ujjain (Mahakal)', nameHi: 'उज्जैन (महाकाल)', state: 'Madhya Pradesh', country: 'India', latitude: 23.1765, longitude: 75.7885, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'haridwar', name: 'Haridwar', nameHi: 'हरिद्वार', state: 'Uttarakhand', country: 'India', latitude: 29.9457, longitude: 78.1642, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'rishikesh', name: 'Rishikesh', nameHi: 'ऋषिकेश', state: 'Uttarakhand', country: 'India', latitude: 30.0869, longitude: 78.2676, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'mathura', name: 'Mathura', nameHi: 'मथुरा', state: 'Uttar Pradesh', country: 'India', latitude: 27.4924, longitude: 77.6737, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'vrindavan', name: 'Vrindavan', nameHi: 'वृन्दावन धाम', state: 'Uttar Pradesh', country: 'India', latitude: 27.582, longitude: 77.7006, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'prayagraj', name: 'Prayagraj (Triveni)', nameHi: 'प्रयागराज (संगम)', state: 'Uttar Pradesh', country: 'India', latitude: 25.4358, longitude: 81.8463, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'tirupati', name: 'Tirupati (Balaji)', nameHi: 'तिरुपति (बालाजी)', state: 'Andhra Pradesh', country: 'India', latitude: 13.6288, longitude: 79.4192, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'puri', name: 'Puri (Jagannath)', nameHi: 'पुरी (जगन्नाथ धाम)', state: 'Odisha', country: 'India', latitude: 19.8135, longitude: 85.8312, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'madurai', name: 'Madurai (Meenakshi)', nameHi: 'मदुरै (मीनाक्षी)', state: 'Tamil Nadu', country: 'India', latitude: 9.9252, longitude: 78.1198, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'rameswaram', name: 'Rameswaram', nameHi: 'रामेश्वरम', state: 'Tamil Nadu', country: 'India', latitude: 9.2876, longitude: 79.3129, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'dwarka', name: 'Dwarka', nameHi: 'द्वारकाधीश धाम', state: 'Gujarat', country: 'India', latitude: 22.2442, longitude: 68.9685, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'somnath', name: 'Somnath', nameHi: 'सोमनाथ ज्योतिर्लिंग', state: 'Gujarat', country: 'India', latitude: 20.888, longitude: 70.4013, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'shirdi', name: 'Shirdi', nameHi: 'शिर्डी', state: 'Maharashtra', country: 'India', latitude: 19.7645, longitude: 74.4762, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'badrinath', name: 'Badrinath', nameHi: 'बद्रीनाथ धाम', state: 'Uttarakhand', country: 'India', latitude: 30.7433, longitude: 79.4938, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'kedarnath', name: 'Kedarnath', nameHi: 'केदारनाथ ज्योतिर्लिंग', state: 'Uttarakhand', country: 'India', latitude: 30.7346, longitude: 79.0669, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'gaya', name: 'Gaya (Vishnupad)', nameHi: 'गया (विष्णुपद)', state: 'Bihar', country: 'India', latitude: 24.7914, longitude: 85.0002, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'pushkar', name: 'Pushkar (Brahma)', nameHi: 'पुष्कर (ब्रह्मा मंदिर)', state: 'Rajasthan', country: 'India', latitude: 26.4897, longitude: 74.5511, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'kurukshetra', name: 'Kurukshetra', nameHi: 'कुरुक्षेत्र (गीता भूमि)', state: 'Haryana', country: 'India', latitude: 29.9695, longitude: 76.8783, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'katra', name: 'Katra (Vaishno Devi)', nameHi: 'कटरा (वैष्णो देवी)', state: 'Jammu & Kashmir', country: 'India', latitude: 32.993, longitude: 74.9322, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'deoghar', name: 'Deoghar (Baidyanath)', nameHi: 'देवघर (बैद्यनाथ धाम)', state: 'Jharkhand', country: 'India', latitude: 24.4826, longitude: 86.7001, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'guruvayur', name: 'Guruvayur', nameHi: 'गुरुवायूर', state: 'Kerala', country: 'India', latitude: 10.5946, longitude: 76.0416, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'sabarimala', name: 'Sabarimala (Ayyappa)', nameHi: 'सबरीमाला', state: 'Kerala', country: 'India', latitude: 9.4347, longitude: 77.0818, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'sringeri', name: 'Sringeri (Sharada Peeth)', nameHi: 'शृंगेरी', state: 'Karnataka', country: 'India', latitude: 13.4172, longitude: 75.2559, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'gokarna', name: 'Gokarna (Mahabaleshwar)', nameHi: 'गोकर्ण', state: 'Karnataka', country: 'India', latitude: 14.5479, longitude: 74.3188, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'tiruvannamalai', name: 'Tiruvannamalai (Arunachala)', nameHi: 'तिरुवन्नामलाई (अरुणाचल)', state: 'Tamil Nadu', country: 'India', latitude: 12.2253, longitude: 79.0747, timezone: 'Asia/Kolkata', category: 'pilgrimage' },
  { id: 'kanchipuram', name: 'Kanchipuram (Varadaraja)', nameHi: 'कांचीपुरम', state: 'Tamil Nadu', country: 'India', latitude: 12.8342, longitude: 79.7036, timezone: 'Asia/Kolkata', category: 'pilgrimage' },

  // North India (Delhi NCR, UP, Rajasthan, Punjab, Haryana, Uttarakhand, HP, J&K)
  { id: 'jaipur', name: 'Jaipur', nameHi: 'जयपुर', state: 'Rajasthan', country: 'India', latitude: 26.9124, longitude: 75.7873, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'noida', name: 'Noida (NCR)', nameHi: 'नोएडा', state: 'Uttar Pradesh', country: 'India', latitude: 28.5355, longitude: 77.391, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'gurugram', name: 'Gurugram (Gurgaon)', nameHi: 'गुरुग्राम', state: 'Haryana', country: 'India', latitude: 28.4595, longitude: 77.0266, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'ghaziabad', name: 'Ghaziabad', nameHi: 'गाजियाबाद', state: 'Uttar Pradesh', country: 'India', latitude: 28.6692, longitude: 77.4538, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'faridabad', name: 'Faridabad', nameHi: 'फरीदाबाद', state: 'Haryana', country: 'India', latitude: 28.4089, longitude: 77.3178, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'lucknow', name: 'Lucknow', nameHi: 'लखनऊ', state: 'Uttar Pradesh', country: 'India', latitude: 26.8467, longitude: 80.9462, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'kanpur', name: 'Kanpur', nameHi: 'कानपुर', state: 'Uttar Pradesh', country: 'India', latitude: 26.4499, longitude: 80.3319, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'agra', name: 'Agra', nameHi: 'आगरा', state: 'Uttar Pradesh', country: 'India', latitude: 27.1767, longitude: 78.0081, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'gorakhpur', name: 'Gorakhpur', nameHi: 'गोरखपुर', state: 'Uttar Pradesh', country: 'India', latitude: 26.7606, longitude: 83.3732, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'meerut', name: 'Meerut', nameHi: 'मेरठ', state: 'Uttar Pradesh', country: 'India', latitude: 28.9845, longitude: 77.7064, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'bareilly', name: 'Bareilly', nameHi: 'बरेली', state: 'Uttar Pradesh', country: 'India', latitude: 28.367, longitude: 79.4304, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'aligarh', name: 'Aligarh', nameHi: 'अलीगढ़', state: 'Uttar Pradesh', country: 'India', latitude: 27.8974, longitude: 78.088, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'moradabad', name: 'Moradabad', nameHi: 'मुरादाबाद', state: 'Uttar Pradesh', country: 'India', latitude: 28.8351, longitude: 78.7747, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'saharanpur', name: 'Saharanpur', nameHi: 'सहारनपुर', state: 'Uttar Pradesh', country: 'India', latitude: 29.9671, longitude: 77.545, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'jhansi', name: 'Jhansi', nameHi: 'झांसी', state: 'Uttar Pradesh', country: 'India', latitude: 25.4484, longitude: 78.5685, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'muzaffarnagar', name: 'Muzaffarnagar', nameHi: 'मुजफ्फरनगर', state: 'Uttar Pradesh', country: 'India', latitude: 29.4727, longitude: 77.7085, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'chandigarh', name: 'Chandigarh', nameHi: 'चंडीगढ़', state: 'Punjab / Haryana', country: 'India', latitude: 30.7333, longitude: 76.7794, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'amritsar', name: 'Amritsar', nameHi: 'अमृतसर', state: 'Punjab', country: 'India', latitude: 31.634, longitude: 74.8723, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'ludhiana', name: 'Ludhiana', nameHi: 'लुधियाना', state: 'Punjab', country: 'India', latitude: 30.901, longitude: 75.8573, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'jalandhar', name: 'Jalandhar', nameHi: 'जालंधर', state: 'Punjab', country: 'India', latitude: 31.326, longitude: 75.5762, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'patiala', name: 'Patiala', nameHi: 'पटियाला', state: 'Punjab', country: 'India', latitude: 30.3398, longitude: 76.3869, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'bathinda', name: 'Bathinda', nameHi: 'बठिंडा', state: 'Punjab', country: 'India', latitude: 30.211, longitude: 74.9455, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'mohali', name: 'Mohali (SAS Nagar)', nameHi: 'मोहाली', state: 'Punjab', country: 'India', latitude: 30.7046, longitude: 76.7179, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'panipat', name: 'Panipat', nameHi: 'पानीपत', state: 'Haryana', country: 'India', latitude: 29.3909, longitude: 76.9635, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'karnal', name: 'Karnal', nameHi: 'करनाल', state: 'Haryana', country: 'India', latitude: 29.6857, longitude: 76.9905, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'rohtak', name: 'Rohtak', nameHi: 'रोहतक', state: 'Haryana', country: 'India', latitude: 28.8955, longitude: 76.6066, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'hisar', name: 'Hisar', nameHi: 'हिसार', state: 'Haryana', country: 'India', latitude: 29.1492, longitude: 75.7217, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'sonipat', name: 'Sonipat', nameHi: 'सोनीपत', state: 'Haryana', country: 'India', latitude: 28.9931, longitude: 77.0151, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'dehradun', name: 'Dehradun', nameHi: 'देहरादून', state: 'Uttarakhand', country: 'India', latitude: 30.3165, longitude: 78.0322, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'haldwani', name: 'Haldwani', nameHi: 'हल्द्वानी', state: 'Uttarakhand', country: 'India', latitude: 29.2183, longitude: 79.513, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'roorkee', name: 'Roorkee', nameHi: 'रुड़की', state: 'Uttarakhand', country: 'India', latitude: 29.8543, longitude: 77.888, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'shimla', name: 'Shimla', nameHi: 'शिमला', state: 'Himachal Pradesh', country: 'India', latitude: 31.1048, longitude: 77.1734, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'dharamshala', name: 'Dharamshala', nameHi: 'धर्मशाला', state: 'Himachal Pradesh', country: 'India', latitude: 32.219, longitude: 76.3234, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'solan', name: 'Solan', nameHi: 'सोलन', state: 'Himachal Pradesh', country: 'India', latitude: 30.9084, longitude: 77.0999, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'jammu', name: 'Jammu', nameHi: 'जम्मू', state: 'Jammu & Kashmir', country: 'India', latitude: 32.7266, longitude: 74.857, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'srinagar', name: 'Srinagar', nameHi: 'श्रीनगर', state: 'Jammu & Kashmir', country: 'India', latitude: 34.0837, longitude: 74.7973, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'jodhpur', name: 'Jodhpur', nameHi: 'जोधपुर', state: 'Rajasthan', country: 'India', latitude: 26.2389, longitude: 73.0243, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'udaipur', name: 'Udaipur', nameHi: 'उदयपुर', state: 'Rajasthan', country: 'India', latitude: 24.5854, longitude: 73.7125, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'kota', name: 'Kota', nameHi: 'कोटा', state: 'Rajasthan', country: 'India', latitude: 25.2138, longitude: 75.8648, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'bikaner', name: 'Bikaner', nameHi: 'बीकानेर', state: 'Rajasthan', country: 'India', latitude: 28.0229, longitude: 73.3119, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'ajmer', name: 'Ajmer', nameHi: 'अजमेर', state: 'Rajasthan', country: 'India', latitude: 26.4499, longitude: 74.6399, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'alwar', name: 'Alwar', nameHi: 'अलवर', state: 'Rajasthan', country: 'India', latitude: 27.553, longitude: 76.6346, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'bhilwara', name: 'Bhilwara', nameHi: 'भीलवाड़ा', state: 'Rajasthan', country: 'India', latitude: 25.3407, longitude: 74.6313, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'sriganganagar', name: 'Sri Ganganagar', nameHi: 'श्रीगंगानगर', state: 'Rajasthan', country: 'India', latitude: 29.9094, longitude: 73.8799, timezone: 'Asia/Kolkata', category: 'north' },
  { id: 'sikar', name: 'Sikar', nameHi: 'सीकर', state: 'Rajasthan', country: 'India', latitude: 27.6094, longitude: 75.1398, timezone: 'Asia/Kolkata', category: 'north' },

  // Central India (Madhya Pradesh & Chhattisgarh)
  { id: 'bhopal', name: 'Bhopal', nameHi: 'भोपाल', state: 'Madhya Pradesh', country: 'India', latitude: 23.2599, longitude: 77.4126, timezone: 'Asia/Kolkata', category: 'central' },
  { id: 'indore', name: 'Indore', nameHi: 'इन्दौर', state: 'Madhya Pradesh', country: 'India', latitude: 22.7196, longitude: 75.8577, timezone: 'Asia/Kolkata', category: 'central' },
  { id: 'gwalior', name: 'Gwalior', nameHi: 'ग्वालियर', state: 'Madhya Pradesh', country: 'India', latitude: 26.2183, longitude: 78.1828, timezone: 'Asia/Kolkata', category: 'central' },
  { id: 'jabalpur', name: 'Jabalpur', nameHi: 'जबलपुर', state: 'Madhya Pradesh', country: 'India', latitude: 23.1815, longitude: 79.9864, timezone: 'Asia/Kolkata', category: 'central' },
  { id: 'sagar', name: 'Sagar', nameHi: 'सागर', state: 'Madhya Pradesh', country: 'India', latitude: 23.8388, longitude: 78.7378, timezone: 'Asia/Kolkata', category: 'central' },
  { id: 'ratlam', name: 'Ratlam', nameHi: 'रतलाम', state: 'Madhya Pradesh', country: 'India', latitude: 23.3315, longitude: 75.0367, timezone: 'Asia/Kolkata', category: 'central' },
  { id: 'satna', name: 'Satna', nameHi: 'सतना', state: 'Madhya Pradesh', country: 'India', latitude: 24.6005, longitude: 80.8322, timezone: 'Asia/Kolkata', category: 'central' },
  { id: 'rewa', name: 'Rewa', nameHi: 'रीवा', state: 'Madhya Pradesh', country: 'India', latitude: 24.5373, longitude: 81.3042, timezone: 'Asia/Kolkata', category: 'central' },
  { id: 'dewas', name: 'Dewas', nameHi: 'देवास', state: 'Madhya Pradesh', country: 'India', latitude: 22.9676, longitude: 76.0534, timezone: 'Asia/Kolkata', category: 'central' },
  { id: 'raipur', name: 'Raipur', nameHi: 'रायपुर', state: 'Chhattisgarh', country: 'India', latitude: 21.2514, longitude: 81.6296, timezone: 'Asia/Kolkata', category: 'central' },
  { id: 'bilaspur', name: 'Bilaspur', nameHi: 'बिलासपुर', state: 'Chhattisgarh', country: 'India', latitude: 22.0797, longitude: 82.1409, timezone: 'Asia/Kolkata', category: 'central' },
  { id: 'durg', name: 'Durg-Bhilai', nameHi: 'दुर्ग-भिलाई', state: 'Chhattisgarh', country: 'India', latitude: 21.1904, longitude: 81.2849, timezone: 'Asia/Kolkata', category: 'central' },
  { id: 'korba', name: 'Korba', nameHi: 'कोरबा', state: 'Chhattisgarh', country: 'India', latitude: 22.3595, longitude: 82.7501, timezone: 'Asia/Kolkata', category: 'central' },

  // West India (Maharashtra, Gujarat, Goa)
  { id: 'thane', name: 'Thane', nameHi: 'ठाणे', state: 'Maharashtra', country: 'India', latitude: 19.2183, longitude: 72.9781, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'navimumbai', name: 'Navi Mumbai', nameHi: 'नवी मुंबई', state: 'Maharashtra', country: 'India', latitude: 19.033, longitude: 73.0297, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'kalyan', name: 'Kalyan-Dombivli', nameHi: 'कल्याण-डोंबिवली', state: 'Maharashtra', country: 'India', latitude: 19.2403, longitude: 73.1305, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'nagpur', name: 'Nagpur', nameHi: 'नागपुर', state: 'Maharashtra', country: 'India', latitude: 21.1458, longitude: 79.0882, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'nashik', name: 'Nashik (Trimbak)', nameHi: 'नासिक (त्र्यंबकेश्वर)', state: 'Maharashtra', country: 'India', latitude: 19.9975, longitude: 73.7898, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'sambhajinagar', name: 'Chh. Sambhajinagar', nameHi: 'छत्रपती संभाजीनगर', state: 'Maharashtra', country: 'India', latitude: 19.8762, longitude: 75.3433, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'kolhapur', name: 'Kolhapur (Mahalaxmi)', nameHi: 'कोल्हापुर (महालक्ष्मी)', state: 'Maharashtra', country: 'India', latitude: 16.705, longitude: 74.2433, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'solapur', name: 'Solapur', nameHi: 'सोलापूर', state: 'Maharashtra', country: 'India', latitude: 17.6599, longitude: 75.9064, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'amravati', name: 'Amravati', nameHi: 'अमरावती', state: 'Maharashtra', country: 'India', latitude: 20.9374, longitude: 77.7796, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'nanded', name: 'Nanded (Sachkhand)', nameHi: 'नांदेड', state: 'Maharashtra', country: 'India', latitude: 19.1383, longitude: 77.321, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'jalgaon', name: 'Jalgaon', nameHi: 'जलगांव', state: 'Maharashtra', country: 'India', latitude: 21.0077, longitude: 75.5626, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'akola', name: 'Akola', nameHi: 'अकोला', state: 'Maharashtra', country: 'India', latitude: 20.7002, longitude: 77.0082, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'latur', name: 'Latur', nameHi: 'लातूर', state: 'Maharashtra', country: 'India', latitude: 18.4088, longitude: 76.5604, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'dhule', name: 'Dhule', nameHi: 'धुले', state: 'Maharashtra', country: 'India', latitude: 20.9042, longitude: 74.7749, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'ahmednagar', name: 'Ahilyanagar (Ahmednagar)', nameHi: 'अहिल्यानगर (अहमदनगर)', state: 'Maharashtra', country: 'India', latitude: 19.0948, longitude: 74.748, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'chandrapur', name: 'Chandrapur', nameHi: 'चंद्रपुर', state: 'Maharashtra', country: 'India', latitude: 19.9615, longitude: 79.2961, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'satara', name: 'Satara', nameHi: 'सातारा', state: 'Maharashtra', country: 'India', latitude: 17.6805, longitude: 73.9997, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'sangli', name: 'Sangli-Miraj', nameHi: 'सांगली-मिरज', state: 'Maharashtra', country: 'India', latitude: 16.8524, longitude: 74.5815, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'ratnagiri', name: 'Ratnagiri', nameHi: 'रत्नागिरी', state: 'Maharashtra', country: 'India', latitude: 16.9902, longitude: 73.312, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'surat', name: 'Surat', nameHi: 'सूरत', state: 'Gujarat', country: 'India', latitude: 21.1702, longitude: 72.8311, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'vadodara', name: 'Vadodara', nameHi: 'वडोदरा', state: 'Gujarat', country: 'India', latitude: 22.3072, longitude: 73.1812, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'rajkot', name: 'Rajkot', nameHi: 'राजकोट', state: 'Gujarat', country: 'India', latitude: 22.3039, longitude: 70.8022, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'bhavnagar', name: 'Bhavnagar', nameHi: 'भावनगर', state: 'Gujarat', country: 'India', latitude: 21.7645, longitude: 72.1519, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'jamnagar', name: 'Jamnagar', nameHi: 'जामनगर', state: 'Gujarat', country: 'India', latitude: 22.4707, longitude: 70.0577, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'junagadh', name: 'Junagadh', nameHi: 'जूनागढ़', state: 'Gujarat', country: 'India', latitude: 21.5222, longitude: 70.4579, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'gandhinagar', name: 'Gandhinagar', nameHi: 'गांधीनगर', state: 'Gujarat', country: 'India', latitude: 23.2156, longitude: 72.6369, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'anand', name: 'Anand', nameHi: 'आणंद', state: 'Gujarat', country: 'India', latitude: 22.5645, longitude: 72.9289, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'bharuch', name: 'Bharuch', nameHi: 'भरूच', state: 'Gujarat', country: 'India', latitude: 21.7051, longitude: 72.9959, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'navsari', name: 'Navsari', nameHi: 'नवसारी', state: 'Gujarat', country: 'India', latitude: 20.9467, longitude: 72.952, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'vapi', name: 'Vapi-Valsad', nameHi: 'वापी-वलसाड', state: 'Gujarat', country: 'India', latitude: 20.3893, longitude: 72.9106, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'bhuj', name: 'Bhuj (Kutch)', nameHi: 'भुज (कच्छ)', state: 'Gujarat', country: 'India', latitude: 23.242, longitude: 69.6669, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'morbi', name: 'Morbi', nameHi: 'मोरबी', state: 'Gujarat', country: 'India', latitude: 22.812, longitude: 70.8378, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'mehsana', name: 'Mehsana', nameHi: 'मेहसाणा', state: 'Gujarat', country: 'India', latitude: 23.588, longitude: 72.3693, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'porbandar', name: 'Porbandar', nameHi: 'पोरबंदर', state: 'Gujarat', country: 'India', latitude: 21.6417, longitude: 69.6293, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'panaji', name: 'Panaji (Goa)', nameHi: 'पणजी (गोवा)', state: 'Goa', country: 'India', latitude: 15.4909, longitude: 73.8278, timezone: 'Asia/Kolkata', category: 'west' },
  { id: 'margao', name: 'Margao (Madgaon)', nameHi: 'मडगांव (गोवा)', state: 'Goa', country: 'India', latitude: 15.2832, longitude: 73.9862, timezone: 'Asia/Kolkata', category: 'west' },

  // East & North East India (Bihar, Jharkhand, Bengal, Odisha, Assam, NE)
  { id: 'patna', name: 'Patna', nameHi: 'पटना', state: 'Bihar', country: 'India', latitude: 25.5941, longitude: 85.1376, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'muzaffarpur', name: 'Muzaffarpur', nameHi: 'मुजफ्फरपुर', state: 'Bihar', country: 'India', latitude: 26.1209, longitude: 85.3647, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'bhagalpur', name: 'Bhagalpur', nameHi: 'भागलपुर', state: 'Bihar', country: 'India', latitude: 25.2425, longitude: 86.9842, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'darbhanga', name: 'Darbhanga', nameHi: 'दरभंगा', state: 'Bihar', country: 'India', latitude: 26.1542, longitude: 85.8918, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'purnia', name: 'Purnia', nameHi: 'पूर्णिया', state: 'Bihar', country: 'India', latitude: 25.7771, longitude: 87.4753, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'ranchi', name: 'Ranchi', nameHi: 'राँची', state: 'Jharkhand', country: 'India', latitude: 23.3441, longitude: 85.3096, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'jamshedpur', name: 'Jamshedpur', nameHi: 'जमशेदपुर', state: 'Jharkhand', country: 'India', latitude: 22.8046, longitude: 86.2029, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'dhanbad', name: 'Dhanbad', nameHi: 'धनबाद', state: 'Jharkhand', country: 'India', latitude: 23.7957, longitude: 86.4304, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'bokaro', name: 'Bokaro Steel City', nameHi: 'बोकारो', state: 'Jharkhand', country: 'India', latitude: 23.6693, longitude: 86.1511, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'bhubaneswar', name: 'Bhubaneswar', nameHi: 'भुवनेश्वर', state: 'Odisha', country: 'India', latitude: 20.2961, longitude: 85.8245, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'cuttack', name: 'Cuttack', nameHi: 'कटक', state: 'Odisha', country: 'India', latitude: 20.4625, longitude: 85.883, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'rourkela', name: 'Rourkela', nameHi: 'राउरकेला', state: 'Odisha', country: 'India', latitude: 22.2604, longitude: 84.8536, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'berhampur', name: 'Berhampur (Brahmapur)', nameHi: 'ब्रह्मपुर', state: 'Odisha', country: 'India', latitude: 19.3149, longitude: 84.7941, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'sambalpur', name: 'Sambalpur', nameHi: 'संबलपुर', state: 'Odisha', country: 'India', latitude: 21.4669, longitude: 83.9812, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'howrah', name: 'Howrah', nameHi: 'हावड़ा', state: 'West Bengal', country: 'India', latitude: 22.5958, longitude: 88.2636, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'siliguri', name: 'Siliguri', nameHi: 'सिलीगुड़ी', state: 'West Bengal', country: 'India', latitude: 26.7271, longitude: 88.3953, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'asansol', name: 'Asansol', nameHi: 'आसनसोल', state: 'West Bengal', country: 'India', latitude: 23.6739, longitude: 86.9524, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'durgapur', name: 'Durgapur', nameHi: 'दुर्गापुर', state: 'West Bengal', country: 'India', latitude: 23.5204, longitude: 87.3119, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'guwahati', name: 'Guwahati (Kamakhya)', nameHi: 'गुवाहाटी (कामाख्या)', state: 'Assam', country: 'India', latitude: 26.1445, longitude: 91.7362, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'dibrugarh', name: 'Dibrugarh', nameHi: 'डिब्रूगढ़', state: 'Assam', country: 'India', latitude: 27.4728, longitude: 94.912, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'silchar', name: 'Silchar', nameHi: 'सिलचर', state: 'Assam', country: 'India', latitude: 24.8333, longitude: 92.7789, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'agartala', name: 'Agartala', nameHi: 'अगरतला', state: 'Tripura', country: 'India', latitude: 23.8315, longitude: 91.2868, timezone: 'Asia/Kolkata', category: 'east' },
  { id: 'shillong', name: 'Shillong', nameHi: 'शिलांग', state: 'Meghalaya', country: 'India', latitude: 25.5788, longitude: 91.8933, timezone: 'Asia/Kolkata', category: 'east' },

  // South India (Karnataka, AP, Telangana, Tamil Nadu, Kerala)
  { id: 'mysuru', name: 'Mysuru (Chamundeshwari)', nameHi: 'मैसूर (चामुंडेश्वरी)', state: 'Karnataka', country: 'India', latitude: 12.2958, longitude: 76.6394, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'hubballi', name: 'Hubballi-Dharwad', nameHi: 'हुबली-धारवाड़', state: 'Karnataka', country: 'India', latitude: 15.3647, longitude: 75.124, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'belagavi', name: 'Belagavi (Belgaum)', nameHi: 'बेलगावी (बेलगाम)', state: 'Karnataka', country: 'India', latitude: 15.8497, longitude: 74.4977, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'mangaluru', name: 'Mangaluru', nameHi: 'मंगलुरु', state: 'Karnataka', country: 'India', latitude: 12.9141, longitude: 74.856, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'udupi', name: 'Udupi (Krishna Mutt)', nameHi: 'उडुपी (कृष्ण मठ)', state: 'Karnataka', country: 'India', latitude: 13.3409, longitude: 74.7421, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'davanagere', name: 'Davanagere', nameHi: 'दावणगेरे', state: 'Karnataka', country: 'India', latitude: 14.4644, longitude: 75.9218, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'ballari', name: 'Ballari (Bellary)', nameHi: 'बल्लारी', state: 'Karnataka', country: 'India', latitude: 15.1394, longitude: 76.9214, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'visakhapatnam', name: 'Visakhapatnam', nameHi: 'विशाखापट्टनम', state: 'Andhra Pradesh', country: 'India', latitude: 17.6868, longitude: 83.2185, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'vijayawada', name: 'Vijayawada (Kanaka Durga)', nameHi: 'विजयवाड़ा', state: 'Andhra Pradesh', country: 'India', latitude: 16.5062, longitude: 80.648, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'guntur', name: 'Guntur', nameHi: 'गुंटूर', state: 'Andhra Pradesh', country: 'India', latitude: 16.3067, longitude: 80.4365, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'rajahmundry', name: 'Rajahmundry', nameHi: 'राजमहेंद्री', state: 'Andhra Pradesh', country: 'India', latitude: 17.0005, longitude: 81.804, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'kakinada', name: 'Kakinada', nameHi: 'काकीनाडा', state: 'Andhra Pradesh', country: 'India', latitude: 16.9891, longitude: 82.2475, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'nellore', name: 'Nellore', nameHi: 'नेल्लोर', state: 'Andhra Pradesh', country: 'India', latitude: 14.4426, longitude: 79.9865, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'kurnool', name: 'Kurnool', nameHi: 'कुरनूल', state: 'Andhra Pradesh', country: 'India', latitude: 15.8281, longitude: 78.0373, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'warangal', name: 'Warangal', nameHi: 'वारंगल', state: 'Telangana', country: 'India', latitude: 17.9689, longitude: 79.5941, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'nizamabad', name: 'Nizamabad', nameHi: 'निजामाबाद', state: 'Telangana', country: 'India', latitude: 18.6725, longitude: 78.0941, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'karimnagar', name: 'Karimnagar', nameHi: 'करीमनगर', state: 'Telangana', country: 'India', latitude: 18.4386, longitude: 79.1288, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'coimbatore', name: 'Coimbatore', nameHi: 'कोयंबटूर', state: 'Tamil Nadu', country: 'India', latitude: 11.0168, longitude: 76.9558, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'tiruchirappalli', name: 'Tiruchirappalli (Trichy)', nameHi: 'तिरुचिरापल्ली (श्रीरंगम)', state: 'Tamil Nadu', country: 'India', latitude: 10.7905, longitude: 78.7047, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'salem', name: 'Salem', nameHi: 'सेलम', state: 'Tamil Nadu', country: 'India', latitude: 11.6643, longitude: 78.146, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'tirunelveli', name: 'Tirunelveli', nameHi: 'तिरुनेलवेली', state: 'Tamil Nadu', country: 'India', latitude: 8.7139, longitude: 77.7567, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'erode', name: 'Erode', nameHi: 'ईरोड', state: 'Tamil Nadu', country: 'India', latitude: 11.341, longitude: 77.7172, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'vellore', name: 'Vellore', nameHi: 'वेल्लोर', state: 'Tamil Nadu', country: 'India', latitude: 12.9165, longitude: 79.1325, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'thanjavur', name: 'Thanjavur (Brihadisvara)', nameHi: 'तंजாவूर (बृहदीश्वर)', state: 'Tamil Nadu', country: 'India', latitude: 10.787, longitude: 79.1378, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'kochi', name: 'Kochi', nameHi: 'कोच्चि', state: 'Kerala', country: 'India', latitude: 9.9312, longitude: 76.2673, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', nameHi: 'तिरुवनंतपुरम (पद्मनाभ)', state: 'Kerala', country: 'India', latitude: 8.5241, longitude: 76.9366, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'thrissur', name: 'Thrissur', nameHi: 'त्रिशूर', state: 'Kerala', country: 'India', latitude: 10.5276, longitude: 76.2144, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'kozhikode', name: 'Kozhikode', nameHi: 'कोझिकोड', state: 'Kerala', country: 'India', latitude: 11.2588, longitude: 75.7804, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'kollam', name: 'Kollam', nameHi: 'कोल्लम', state: 'Kerala', country: 'India', latitude: 8.8932, longitude: 76.6141, timezone: 'Asia/Kolkata', category: 'south' },
  { id: 'palakkad', name: 'Palakkad', nameHi: 'पालक्काड़', state: 'Kerala', country: 'India', latitude: 10.7867, longitude: 76.6548, timezone: 'Asia/Kolkata', category: 'south' },

  // Global Diaspora & International (NRI Hubs & Sacred International)
  { id: 'kathmandu', name: 'Kathmandu (Pashupatinath)', nameHi: 'काठमांडू (पशुपतिनाथ)', state: 'Bagmati', country: 'Nepal', latitude: 27.7172, longitude: 85.324, timezone: 'Asia/Kathmandu', category: 'international', region: 'South Asia' },
  { id: 'paris', name: 'Paris', nameHi: 'पेरिस', state: 'Île-de-France', country: 'France', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris', category: 'international', region: 'Europe & United Kingdom' },

  // North America - United States
  { id: 'newyork', name: 'New York City, New York', nameHi: 'न्यूयॉर्क सिटी (New York)', state: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006, timezone: 'America/New_York', category: 'international', region: 'North America' },
  { id: 'edison', name: 'Edison, New Jersey', nameHi: 'एडिसन (New Jersey)', state: 'New Jersey', country: 'United States', latitude: 40.5187, longitude: -74.4121, timezone: 'America/New_York', category: 'international', region: 'North America' },
  { id: 'jerseycity', name: 'Jersey City, New Jersey', nameHi: 'जर्सी सिटी (New Jersey)', state: 'New Jersey', country: 'United States', latitude: 40.7178, longitude: -74.0431, timezone: 'America/New_York', category: 'international', region: 'North America' },
  { id: 'sanjose', name: 'San Jose, California (Silicon Valley)', nameHi: 'सैन जोस (सिलिकॉन वैली)', state: 'California', country: 'United States', latitude: 37.3382, longitude: -121.8863, timezone: 'America/Los_Angeles', category: 'international', region: 'North America' },
  { id: 'sanfrancisco', name: 'San Francisco, California', nameHi: 'सैन फ्रांसिस्को (California)', state: 'California', country: 'United States', latitude: 37.7749, longitude: -122.4194, timezone: 'America/Los_Angeles', category: 'international', region: 'North America' },
  { id: 'chicago', name: 'Chicago, Illinois', nameHi: 'शिकागो (Illinois)', state: 'Illinois', country: 'United States', latitude: 41.8781, longitude: -87.6298, timezone: 'America/Chicago', category: 'international', region: 'North America' },
  { id: 'houston', name: 'Houston, Texas', nameHi: 'ह्यूस्टन (Texas)', state: 'Texas', country: 'United States', latitude: 29.7604, longitude: -95.3698, timezone: 'America/Chicago', category: 'international', region: 'North America' },
  { id: 'dallas', name: 'Dallas, Texas', nameHi: 'डलास (Texas)', state: 'Texas', country: 'United States', latitude: 32.7767, longitude: -96.797, timezone: 'America/Chicago', category: 'international', region: 'North America' },
  { id: 'atlanta', name: 'Atlanta, Georgia', nameHi: 'अटलांटा (Georgia)', state: 'Georgia', country: 'United States', latitude: 33.749, longitude: -84.388, timezone: 'America/New_York', category: 'international', region: 'North America' },
  { id: 'losangeles', name: 'Los Angeles, California', nameHi: 'लॉस एंजिल्स (California)', state: 'California', country: 'United States', latitude: 34.0522, longitude: -118.2437, timezone: 'America/Los_Angeles', category: 'international', region: 'North America' },
  { id: 'seattle', name: 'Seattle, Washington', nameHi: 'सिएटल (Washington)', state: 'Washington', country: 'United States', latitude: 47.6062, longitude: -122.3321, timezone: 'America/Los_Angeles', category: 'international', region: 'North America' },

  // North America - Canada
  { id: 'brampton', name: 'Brampton, Ontario', nameHi: 'ब्रैम्पटन (Ontario)', state: 'Ontario', country: 'Canada', latitude: 43.7315, longitude: -79.7624, timezone: 'America/Toronto', category: 'international', region: 'North America' },
  { id: 'toronto', name: 'Toronto, Ontario', nameHi: 'टोरंटो (Ontario)', state: 'Ontario', country: 'Canada', latitude: 43.6532, longitude: -79.3832, timezone: 'America/Toronto', category: 'international', region: 'North America' },
  { id: 'surrey', name: 'Surrey, British Columbia', nameHi: 'सरे (British Columbia)', state: 'British Columbia', country: 'Canada', latitude: 49.1913, longitude: -122.849, timezone: 'America/Vancouver', category: 'international', region: 'North America' },
  { id: 'vancouver', name: 'Vancouver, British Columbia', nameHi: 'वैंकूवर (British Columbia)', state: 'British Columbia', country: 'Canada', latitude: 49.2827, longitude: -123.1207, timezone: 'America/Vancouver', category: 'international', region: 'North America' },
  { id: 'calgary', name: 'Calgary, Alberta', nameHi: 'कैलगरी (Alberta)', state: 'Alberta', country: 'Canada', latitude: 51.0447, longitude: -114.0719, timezone: 'America/Edmonton', category: 'international', region: 'North America' },
  { id: 'mississauga', name: 'Mississauga, Ontario', nameHi: 'मिसिसॉगा (Ontario)', state: 'Ontario', country: 'Canada', latitude: 43.589, longitude: -79.6441, timezone: 'America/Toronto', category: 'international', region: 'North America' },

  // Europe & United Kingdom - United Kingdom
  { id: 'london', name: 'London (Wembley & Harrow)', nameHi: 'लंदन (वेम्बली व हैरो)', state: 'England', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London', category: 'international', region: 'Europe & United Kingdom' },
  { id: 'leicester', name: 'Leicester', nameHi: 'लीस्टर (Leicester)', state: 'England', country: 'United Kingdom', latitude: 52.6369, longitude: -1.1398, timezone: 'Europe/London', category: 'international', region: 'Europe & United Kingdom' },
  { id: 'birmingham', name: 'Birmingham', nameHi: 'बर्मिंघम (Birmingham)', state: 'England', country: 'United Kingdom', latitude: 52.4862, longitude: -1.8904, timezone: 'Europe/London', category: 'international', region: 'Europe & United Kingdom' },
  { id: 'manchester', name: 'Manchester', nameHi: 'मैनचेस्टर (Manchester)', state: 'England', country: 'United Kingdom', latitude: 53.4808, longitude: -2.2426, timezone: 'Europe/London', category: 'international', region: 'Europe & United Kingdom' },
  { id: 'coventry', name: 'Coventry', nameHi: 'कोवेंट्री (Coventry)', state: 'England', country: 'United Kingdom', latitude: 52.4068, longitude: -1.5197, timezone: 'Europe/London', category: 'international', region: 'Europe & United Kingdom' },

  // Europe & United Kingdom - Germany
  { id: 'berlin', name: 'Berlin', nameHi: 'बर्लिन (Berlin)', state: 'Berlin', country: 'Germany', latitude: 52.52, longitude: 13.405, timezone: 'Europe/Berlin', category: 'international', region: 'Europe & United Kingdom' },
  { id: 'frankfurt', name: 'Frankfurt', nameHi: 'फ्रैंकफर्ट (Frankfurt)', state: 'Hesse', country: 'Germany', latitude: 50.1109, longitude: 8.6821, timezone: 'Europe/Berlin', category: 'international', region: 'Europe & United Kingdom' },
  { id: 'munich', name: 'Munich', nameHi: 'म्यूनिख (Munich)', state: 'Bavaria', country: 'Germany', latitude: 48.1351, longitude: 11.582, timezone: 'Europe/Berlin', category: 'international', region: 'Europe & United Kingdom' },

  // Europe & United Kingdom - Netherlands
  { id: 'thehague', name: 'The Hague', nameHi: 'द हेग (The Hague)', state: 'South Holland', country: 'Netherlands', latitude: 52.0705, longitude: 4.3007, timezone: 'Europe/Amsterdam', category: 'international', region: 'Europe & United Kingdom' },
  { id: 'amsterdam', name: 'Amsterdam', nameHi: 'एम्स्टर्डम (Amsterdam)', state: 'North Holland', country: 'Netherlands', latitude: 52.3676, longitude: 4.9041, timezone: 'Europe/Amsterdam', category: 'international', region: 'Europe & United Kingdom' },

  // Middle East
  { id: 'dubai', name: 'Dubai', nameHi: 'दुबई (Dubai)', state: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708, timezone: 'Asia/Dubai', category: 'international', region: 'Middle East' },
  { id: 'abudhabi', name: 'Abu Dhabi (BAPS Mandir)', nameHi: 'अबू धाबी (Abu Dhabi)', state: 'Abu Dhabi', country: 'United Arab Emirates', latitude: 24.4539, longitude: 54.3773, timezone: 'Asia/Dubai', category: 'international', region: 'Middle East' },
  { id: 'sharjah', name: 'Sharjah', nameHi: 'शारजाह (Sharjah)', state: 'Sharjah', country: 'United Arab Emirates', latitude: 25.3463, longitude: 55.4209, timezone: 'Asia/Dubai', category: 'international', region: 'Middle East' },
  { id: 'riyadh', name: 'Riyadh', nameHi: 'रियाद (Riyadh)', state: 'Riyadh', country: 'Saudi Arabia', latitude: 24.7136, longitude: 46.6753, timezone: 'Asia/Riyadh', category: 'international', region: 'Middle East' },
  { id: 'jeddah', name: 'Jeddah', nameHi: 'जेद्दा (Jeddah)', state: 'Makkah', country: 'Saudi Arabia', latitude: 21.5433, longitude: 39.1728, timezone: 'Asia/Riyadh', category: 'international', region: 'Middle East' },
  { id: 'muscat', name: 'Muscat', nameHi: 'मस्कट (Muscat)', state: 'Muscat', country: 'Oman', latitude: 23.588, longitude: 58.3829, timezone: 'Asia/Muscat', category: 'international', region: 'Middle East' },
  { id: 'kuwait', name: 'Kuwait City', nameHi: 'कुवैत सिटी (Kuwait City)', state: 'Al Asimah', country: 'Kuwait', latitude: 29.3759, longitude: 47.9774, timezone: 'Asia/Kuwait', category: 'international', region: 'Middle East' },
  { id: 'doha', name: 'Doha', nameHi: 'दोहा (Doha)', state: 'Doha', country: 'Qatar', latitude: 25.2854, longitude: 51.531, timezone: 'Asia/Qatar', category: 'international', region: 'Middle East' },

  // Southeast Asia & Oceania
  { id: 'kualalumpur', name: 'Kuala Lumpur', nameHi: 'कुआलालंपुर (बाटू गुफाएं)', state: 'Federal Territory', country: 'Malaysia', latitude: 3.139, longitude: 101.6869, timezone: 'Asia/Kuala_Lumpur', category: 'international', region: 'Southeast Asia & Oceania' },
  { id: 'klang', name: 'Klang', nameHi: 'क्लांग (Klang)', state: 'Selangor', country: 'Malaysia', latitude: 3.0449, longitude: 101.4456, timezone: 'Asia/Kuala_Lumpur', category: 'international', region: 'Southeast Asia & Oceania' },
  { id: 'penang', name: 'Penang', nameHi: 'पेनांग (George Town)', state: 'Penang', country: 'Malaysia', latitude: 5.4141, longitude: 100.3288, timezone: 'Asia/Kuala_Lumpur', category: 'international', region: 'Southeast Asia & Oceania' },
  { id: 'singapore', name: 'Singapore', nameHi: 'सिंगापुर (Singapore)', state: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: 'Asia/Singapore', category: 'international', region: 'Southeast Asia & Oceania' },
  { id: 'sydney', name: 'Sydney, New South Wales', nameHi: 'सिडनी (New South Wales)', state: 'New South Wales', country: 'Australia', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney', category: 'international', region: 'Southeast Asia & Oceania' },
  { id: 'melbourne', name: 'Melbourne, Victoria', nameHi: 'मेलबर्न (Victoria)', state: 'Victoria', country: 'Australia', latitude: -37.8136, longitude: 144.9631, timezone: 'Australia/Melbourne', category: 'international', region: 'Southeast Asia & Oceania' },
  { id: 'brisbane', name: 'Brisbane, Queensland', nameHi: 'ब्रिसबेन (Queensland)', state: 'Queensland', country: 'Australia', latitude: -27.4698, longitude: 153.0251, timezone: 'Australia/Brisbane', category: 'international', region: 'Southeast Asia & Oceania' },
  { id: 'perth', name: 'Perth, Western Australia', nameHi: 'पर्थ (Western Australia)', state: 'Western Australia', country: 'Australia', latitude: -31.9505, longitude: 115.8605, timezone: 'Australia/Perth', category: 'international', region: 'Southeast Asia & Oceania' },
  { id: 'auckland', name: 'Auckland', nameHi: 'ऑकलैंड (Auckland)', state: 'Auckland', country: 'New Zealand', latitude: -36.8485, longitude: 174.7633, timezone: 'Pacific/Auckland', category: 'international', region: 'Southeast Asia & Oceania' },
  { id: 'wellington', name: 'Wellington', nameHi: 'वेलिंगटन (Wellington)', state: 'Wellington', country: 'New Zealand', latitude: -41.2865, longitude: 174.7762, timezone: 'Pacific/Auckland', category: 'international', region: 'Southeast Asia & Oceania' },

  // Historic Diaspora Hubs
  { id: 'portlouis', name: 'Port Louis', nameHi: 'पोर्ट लुईस (Port Louis)', state: 'Port Louis', country: 'Mauritius', latitude: -20.1609, longitude: 57.5012, timezone: 'Indian/Mauritius', category: 'international', region: 'Historic Diaspora Hubs' },
  { id: 'vacoas', name: 'Vacoas-Phoenix', nameHi: 'वाकोआस-फ़ीनिक्स (Vacoas-Phoenix)', state: 'Plaines Wilhems', country: 'Mauritius', latitude: -20.2974, longitude: 57.4988, timezone: 'Indian/Mauritius', category: 'international', region: 'Historic Diaspora Hubs' },
  { id: 'suva', name: 'Suva', nameHi: 'सुवा (Suva)', state: 'Central Division', country: 'Fiji', latitude: -18.1416, longitude: 178.4419, timezone: 'Pacific/Fiji', category: 'international', region: 'Historic Diaspora Hubs' },
  { id: 'nadi', name: 'Nadi', nameHi: 'नादी (Nadi)', state: 'Western Division', country: 'Fiji', latitude: -17.8065, longitude: 177.415, timezone: 'Pacific/Fiji', category: 'international', region: 'Historic Diaspora Hubs' },
  { id: 'durban', name: 'Durban', nameHi: 'डरबन (Durban)', state: 'KwaZulu-Natal', country: 'South Africa', latitude: -29.8587, longitude: 31.0218, timezone: 'Africa/Johannesburg', category: 'international', region: 'Historic Diaspora Hubs' },
  { id: 'johannesburg', name: 'Johannesburg', nameHi: 'जोहान्सबर्ग (Johannesburg)', state: 'Gauteng', country: 'South Africa', latitude: -26.2041, longitude: 28.0473, timezone: 'Africa/Johannesburg', category: 'international', region: 'Historic Diaspora Hubs' },
  { id: 'chaguanas', name: 'Chaguanas', nameHi: 'चागुआनास (Chaguanas)', state: 'Borough of Chaguanas', country: 'Trinidad and Tobago', latitude: 10.5167, longitude: -61.4114, timezone: 'America/Port_of_Spain', category: 'international', region: 'Historic Diaspora Hubs' },
  { id: 'portofspain', name: 'Port of Spain', nameHi: 'पोर्ट ऑफ स्पेन (Port of Spain)', state: 'City of Port of Spain', country: 'Trinidad and Tobago', latitude: 10.6549, longitude: -61.5019, timezone: 'America/Port_of_Spain', category: 'international', region: 'Historic Diaspora Hubs' },
  { id: 'georgetown', name: 'Georgetown', nameHi: 'जॉर्जटाउन (Georgetown)', state: 'Demerara-Mahaica', country: 'Guyana', latitude: 6.8013, longitude: -58.1551, timezone: 'America/Guyana', category: 'international', region: 'Historic Diaspora Hubs' }
];

export const TITHI_NAMES = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
];

export const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const YOGA_NAMES = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda',
  'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva',
  'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan',
  'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla',
  'Brahma', 'Indra', 'Vaidhriti'
];

export const KARANA_NAMES = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Garija', 'Vanija', 'Vishti (Bhadra)',
  'Shakuni', 'Chatushpada', 'Naga', 'Kintughna'
];

export const HINDU_MONTHS = [
  'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada',
  'Ashvina', 'Kartika', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
];

// Helper: Julian Day from Gregorian date
export function getJulianDay(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

// Sunrise and sunset calculation
export function calculateSunTimes(date: Date, lat: number, lon: number) {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const declination = 23.45 * Math.sin(((360 / 365) * (dayOfYear - 81) * Math.PI) / 180);
  const latRad = (lat * Math.PI) / 180;
  const decRad = (declination * Math.PI) / 180;
  
  // Hour angle
  const cosH = -Math.tan(latRad) * Math.tan(decRad);
  const clampedCosH = Math.max(-1, Math.min(1, cosH));
  const hourAngle = (Math.acos(clampedCosH) * 180) / Math.PI;
  
  // Solar noon offset for longitude relative to IST (82.5°E)
  const solarNoonOffsetMinutes = (82.5 - lon) * 4;
  const solarNoonMinutes = 12 * 60 + solarNoonOffsetMinutes;
  const halfDayMinutes = (hourAngle / 15) * 60;
  
  const sunriseMinutes = solarNoonMinutes - halfDayMinutes;
  const sunsetMinutes = solarNoonMinutes + halfDayMinutes;
  
  const toTimeString = (mins: number) => {
    const totalM = Math.floor(mins);
    const h = Math.floor(totalM / 60);
    const m = totalM % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
  };

  return {
    sunriseMins: sunriseMinutes,
    sunsetMins: sunsetMinutes,
    sunrise: toTimeString(sunriseMinutes),
    sunset: toTimeString(sunsetMinutes)
  };
}

// Calculate Moon times approximation
export function calculateMoonTimes(date: Date, lat: number, lon: number, tithiNum: number) {
  // Moon rises ~50 minutes later each day
  // New Moon rises near sunrise, Full Moon near sunset
  const baseRiseMins = (6 * 60 + (tithiNum - 1) * 48) % (24 * 60);
  const baseSetMins = (baseRiseMins + 12 * 60) % (24 * 60);
  
  const toTimeString = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = Math.floor(mins % 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
  };

  return {
    moonrise: toTimeString(baseRiseMins),
    moonset: toTimeString(baseSetMins)
  };
}

// Choghadiya generator based on sunrise, sunset, and weekday
export function getChoghadiyas(dayOfWeek: number, sunriseMins: number, sunsetMins: number): { day: ChoghadiyaSlot[]; night: ChoghadiyaSlot[] } {
  // Day orders per weekday (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const DAY_ORDERS: Record<number, ChoghadiyaSlot['name'][]> = {
    0: ['Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg'], // Sun
    1: ['Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit'], // Mon
    2: ['Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'],   // Tue
    3: ['Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh'],  // Wed
    4: ['Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh'],  // Thu
    5: ['Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal'],  // Fri
    6: ['Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal']   // Sat
  };

  const NIGHT_ORDERS: Record<number, ChoghadiyaSlot['name'][]> = {
    0: ['Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh'],
    1: ['Chal', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal'],
    2: ['Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal'],
    3: ['Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal', 'Labh', 'Udveg'],
    4: ['Amrit', 'Chal', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit'],
    5: ['Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog'],
    6: ['Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal', 'Labh']
  };

  const RULERS: Record<ChoghadiyaSlot['name'], string> = {
    Amrit: 'Moon',
    Shubh: 'Jupiter',
    Labh: 'Mercury',
    Chal: 'Venus',
    Rog: 'Mars',
    Kaal: 'Saturn',
    Udveg: 'Sun'
  };

  const NATURES: Record<ChoghadiyaSlot['name'], ChoghadiyaSlot['nature']> = {
    Amrit: 'Auspicious',
    Shubh: 'Auspicious',
    Labh: 'Auspicious',
    Chal: 'Neutral',
    Rog: 'Inauspicious',
    Kaal: 'Inauspicious',
    Udveg: 'Inauspicious'
  };

  const daySlotDuration = (sunsetMins - sunriseMins) / 8;
  const nightSlotDuration = (24 * 60 - (sunsetMins - sunriseMins)) / 8;

  const formatSlotTime = (m: number) => {
    let normalized = (m % (24 * 60) + 24 * 60) % (24 * 60);
    const hour = Math.floor(normalized / 60);
    const minute = Math.floor(normalized % 60);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayH = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayH.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const daySlots: ChoghadiyaSlot[] = DAY_ORDERS[dayOfWeek].map((name, i) => {
    const start = sunriseMins + i * daySlotDuration;
    const end = start + daySlotDuration;
    return {
      name,
      ruler: RULERS[name],
      nature: NATURES[name],
      start: formatSlotTime(start),
      end: formatSlotTime(end)
    };
  });

  const nightSlots: ChoghadiyaSlot[] = NIGHT_ORDERS[dayOfWeek].map((name, i) => {
    const start = sunsetMins + i * nightSlotDuration;
    const end = start + nightSlotDuration;
    return {
      name,
      ruler: RULERS[name],
      nature: NATURES[name],
      start: formatSlotTime(start),
      end: formatSlotTime(end)
    };
  });

  return { day: daySlots, night: nightSlots };
}

// Calculate Rahu Kaal, Yamaganda, Gulika based on weekday and sunrise
export function calculateInauspiciousPeriods(dayOfWeek: number, sunriseMins: number, sunsetMins: number) {
  const partDuration = (sunsetMins - sunriseMins) / 8;
  
  // Rahu Kaal slot index (1 to 8): Sun=8, Mon=2, Tue=7, Wed=5, Thu=6, Fri=4, Sat=3
  const rahuSlots = [8, 2, 7, 5, 6, 4, 3];
  const yamaSlots = [5, 4, 3, 2, 1, 7, 6];
  const gulikaSlots = [7, 6, 5, 4, 3, 2, 1];

  const toRange = (slotIndex: number) => {
    const start = sunriseMins + (slotIndex - 1) * partDuration;
    const end = start + partDuration;
    const toStr = (mins: number) => {
      const h = Math.floor(mins / 60);
      const m = Math.floor(mins % 60);
      const period = h >= 12 ? 'PM' : 'AM';
      const displayH = h % 12 === 0 ? 12 : h % 12;
      return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
    };
    return { start: toStr(start), end: toStr(end) };
  };

  const noonMins = (sunriseMins + sunsetMins) / 2;
  const abhijitStart = noonMins - 24;
  const abhijitEnd = noonMins + 24;

  const toStr = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = Math.floor(mins % 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
  };

  return {
    rahuKaal: toRange(rahuSlots[dayOfWeek]),
    yamaganda: toRange(yamaSlots[dayOfWeek]),
    gulikaKaal: toRange(gulikaSlots[dayOfWeek]),
    abhijitMuhurat: { start: toStr(abhijitStart), end: toStr(abhijitEnd) },
    brahmaMuhurat: { start: toStr(sunriseMins - 96), end: toStr(sunriseMins - 48) }
  };
}

// Master Panchang Calculation for any Date and City
export function getPanchangForDate(dateObj: Date, cityId: string = 'delhi'): PanchangData {
  const city = CITIES.find((c) => c.id === cityId) || CITIES[0];
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const dayOfWeek = dateObj.getDay();

  const jd = getJulianDay(year, month, day);
  
  // Astronomical positions (accurate to ~0.5 degree, standard Surya Siddhanta elongation model)
  const d = jd - 2451545.0;
  const sunMeanLong = (280.460 + 0.9856474 * d) % 360;
  const moonMeanLong = (218.316 + 13.176396 * d) % 360;
  
  const normSun = (sunMeanLong + 360) % 360;
  const normMoon = (moonMeanLong + 360) % 360;
  
  const elongation = (normMoon - normSun + 360) % 360;
  const tithiIndex = Math.floor(elongation / 12); // 0 to 29
  const tithiNum = tithiIndex + 1;
  const paksha: 'Shukla' | 'Krishna' = tithiNum <= 15 ? 'Shukla' : 'Krishna';
  const tithiName = TITHI_NAMES[tithiIndex];

  const nakshatraIndex = Math.floor(normMoon / (360 / 27)) % 27;
  const nakshatraName = NAKSHATRA_NAMES[nakshatraIndex];

  const yogaIndex = Math.floor(((normSun + normMoon) % 360) / (360 / 27)) % 27;
  const yogaName = YOGA_NAMES[yogaIndex];

  // Karana calculation
  let karanaIndex = 0;
  const halfTithi = Math.floor(elongation / 6);
  if (halfTithi === 0) karanaIndex = 10; // Kintughna
  else if (halfTithi >= 57) karanaIndex = 7 + (halfTithi - 57); // Shakuni, Chatushpada, Naga
  else karanaIndex = (halfTithi - 1) % 7;
  const karanaName = KARANA_NAMES[karanaIndex];

  // Sun and Moon times
  const { sunriseMins, sunsetMins, sunrise, sunset } = calculateSunTimes(dateObj, city.latitude, city.longitude);
  const { moonrise, moonset } = calculateMoonTimes(dateObj, city.latitude, city.longitude, tithiNum);
  const choghadiya = getChoghadiyas(dayOfWeek, sunriseMins, sunsetMins);
  const inauspicious = calculateInauspiciousPeriods(dayOfWeek, sunriseMins, sunsetMins);

  // Month determination (Chaitradi / solar offset)
  // Vikram Samvat is Gregorian Year + 57 (or + 56 before Chaitra)
  const monthOffset = (month + 9) % 12; // approximate Hindu month index
  const hinduMonthAmavasyant = HINDU_MONTHS[monthOffset];
  const hinduMonthPurnimant = paksha === 'Krishna' && tithiNum > 15 ? HINDU_MONTHS[(monthOffset + 1) % 12] : hinduMonthAmavasyant;

  const vikramSamvat = year + 57;
  const shakaSamvat = year - 78;

  const ayana = month >= 1 && month <= 6 ? 'Uttarayana' : 'Dakshinayana';
  const rituNames = ['Shishira (Winter)', 'Vasanta (Spring)', 'Grishma (Summer)', 'Varsha (Monsoon)', 'Sharad (Autumn)', 'Hemanta (Pre-Winter)'];
  const ritu = rituNames[Math.floor((month - 1) / 2) % 6];

  const dayNames = ['Sunday (Ravivara)', 'Monday (Somavara)', 'Tuesday (Mangalavara)', 'Wednesday (Budhavara)', 'Thursday (Guruvara)', 'Friday (Shukravara)', 'Saturday (Shanivara)'];

  const yyyy = year.toString();
  const mm = month.toString().padStart(2, '0');
  const dd = day.toString().padStart(2, '0');

  return {
    date: `${yyyy}-${mm}-${dd}`,
    dayOfWeek: dayNames[dayOfWeek],
    tithi: {
      name: tithiName,
      number: tithiNum,
      paksha
    },
    nakshatra: {
      name: nakshatraName,
      number: nakshatraIndex + 1
    },
    yoga: {
      name: yogaName,
      number: yogaIndex + 1
    },
    karana: {
      name: karanaName,
      number: karanaIndex + 1
    },
    hinduMonthAmavasyant,
    hinduMonthPurnimant,
    shakaSamvat,
    vikramSamvat,
    ritu,
    ayana,
    sunrise,
    sunset,
    moonrise,
    moonset,
    ...inauspicious,
    choghadiya,
    city
  };
}
