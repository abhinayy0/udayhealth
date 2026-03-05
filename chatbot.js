// Uday Health Assistant - Enhanced Chatbot with WhatsApp Integration

// User session data
let userSession = {
  name: null,
  phone: null,
  hasProvidedInfo: false,
  conversationStarted: false
};

// Clinic information
const clinicInfo = {
  name: "Uday Health Care",
  doctor: "Dr. Navneet Agarwal",
  phones: ["+91 9058786592", "+91 7248282028"],
  address: "Papa complex, Infront of 3rd gate of 28, BN PAC, Kunaira, Etawah, Uttar Pradesh 206002",
  timings: "24/7 Emergency Services Available"
};

// Knowledge base
const neuroKnowledgeBase = {
  parkinsons: {
    en: {
      title: "Parkinson's Disease",
      info: "Parkinson's disease is a progressive nervous system disorder affecting movement. Dr. Navneet Agarwal specializes in Parkinson's treatment with modern therapies.",
      symptoms: "Tremor, Slow movement, Rigid muscles, Impaired balance, Speech changes",
      treatment: "Medications (Levodopa, Dopamine agonists), Physical therapy, Lifestyle modifications"
    },
    hi: {
      title: "पार्किंसंस रोग",
      info: "पार्किंसंस रोग एक प्रगतिशील तंत्रिका तंत्र विकार है। डॉ. नवनीत अग्रवाल आधुनिक उपचारों के साथ विशेषज्ञ हैं।",
      symptoms: "कंपन, धीमी गति, कठोर मांसपेशियां, बिगड़ा संतुलन, भाषण परिवर्तन",
      treatment: "दवाएं, फिजियोथेरेपी, जीवनशैली संशोधन"
    }
  },
  epilepsy: {
    en: {
      title: "Epilepsy",
      info: "Epilepsy is characterized by recurrent seizures. Dr. Agarwal provides comprehensive epilepsy care.",
      symptoms: "Seizures, Temporary confusion, Uncontrollable movements, Loss of consciousness",
      treatment: "Anti-seizure medications, Lifestyle modifications, Regular monitoring"
    },
    hi: {
      title: "मिर्गी",
      info: "मिर्गी बार-बार दौरे पड़ने की विशेषता है। डॉ. अग्रवाल व्यापक देखभाल प्रदान करते हैं।",
      symptoms: "दौरे, अस्थायी भ्रम, अनियंत्रित गति, चेतना की हानि",
      treatment: "एंटी-सीज़र दवाएं, जीवनशैली संशोधन, नियमित निगरानी"
    }
  },
  migraine: {
    en: {
      title: "Migraine",
      info: "Migraine causes intense headaches. Dr. Agarwal offers specialized migraine treatment.",
      symptoms: "Severe throbbing pain, Nausea, Sensitivity to light and sound, Visual disturbances",
      treatment: "Pain-relieving medications, Preventive medications, Trigger management"
    },
    hi: {
      title: "माइग्रेन",
      info: "माइग्रेन तीव्र सिरदर्द का कारण बनता है। डॉ. अग्रवाल विशेष उपचार प्रदान करते हैं।",
      symptoms: "गंभीर धड़कता दर्द, मतली, प्रकाश संवेदनशीलता, दृश्य गड़बड़ी",
      treatment: "दर्द निवारक दवाएं, निवारक दवाएं, ट्रिगर प्रबंधन"
    }
  },
  stroke: {
    en: {
      title: "Stroke - Medical Emergency!",
      info: "Stroke requires immediate treatment. We provide 24/7 emergency stroke care.",
      symptoms: "Face drooping, Arm weakness, Speech difficulty, Sudden numbness, Severe headache",
      treatment: "Emergency care, Clot-busting drugs, Rehabilitation therapy"
    },
    hi: {
      title: "स्ट्रोक - चिकित्सा आपातकाल!",
      info: "स्ट्रोक को तत्काल उपचार की आवश्यकता है। हम 24/7 आपातकालीन देखभाल प्रदान करते हैं।",
      symptoms: "चेहरा गिरना, हाथ की कमजोरी, भाषण कठिनाई, अचानक सुन्नता, गंभीर सिरदर्द",
      treatment: "आपातकालीन देखभाल, थक्का-बस्टिंग दवाएं, पुनर्वास चिकित्सा"
    }
  }
};

// Initialize chatbot
function initializeChatbot() {
  const messagesContainer = document.getElementById('chatbotMessages');
  if (!messagesContainer) return;
  
  // Show welcome form
  showWelcomeForm();
}

// Show welcome form
function showWelcomeForm() {
  const lang = currentLang || 'en';
  const messagesContainer = document.getElementById('chatbotMessages');
  
  const welcomeHTML = `
    <div class="welcome-form" id="welcomeForm">
      <div class="welcome-header">
        <i class="fas fa-hand-sparkles"></i>
        <h3>${lang === 'en' ? 'Welcome to Uday Health Care!' : 'उदय हेल्थ केयर में आपका स्वागत है!'}</h3>
        <p>${lang === 'en' ? 'I\'m your Uday Health Assistant. I can help you with:' : 'मैं आपका उदय स्वास्थ्य सहायक हूं। मैं आपकी मदद कर सकता हूं:'}</p>
        <ul>
          <li>${lang === 'en' ? '🏥 Neurological conditions information' : '🏥 न्यूरोलॉजिकल स्थितियों की जानकारी'}</li>
          <li>${lang === 'en' ? '📅 Appointment booking' : '📅 अपॉइंटमेंट बुकिंग'}</li>
          <li>${lang === 'en' ? '📞 Contact information' : '📞 संपर्क जानकारी'}</li>
          <li>${lang === 'en' ? '🕐 Clinic timings' : '🕐 क्लिनिक समय'}</li>
        </ul>
      </div>
      <div class="welcome-form-fields">
        <p class="form-subtitle">${lang === 'en' ? 'Help us serve you better (Optional):' : 'हमें आपकी बेहतर सेवा करने में मदद करें (वैकल्पिक):'}</p>
        <div class="form-field">
          <label>${lang === 'en' ? 'Your Name' : 'आपका नाम'}</label>
          <input type="text" id="userName" placeholder="${lang === 'en' ? 'Enter your name' : 'अपना नाम दर्ज करें'}">
        </div>
        <div class="form-field">
          <label>${lang === 'en' ? 'WhatsApp Number' : 'व्हाट्सएप नंबर'}</label>
          <input type="tel" id="userPhone" placeholder="${lang === 'en' ? '+91 XXXXX XXXXX' : '+91 XXXXX XXXXX'}" maxlength="13">
        </div>
        <div class="form-actions">
          <button class="btn-submit" onclick="submitUserInfo()">${lang === 'en' ? 'Submit' : 'जमा करें'}</button>
          <button class="btn-skip" onclick="skipUserInfo()">${lang === 'en' ? 'Skip & Continue' : 'छोड़ें और जारी रखें'}</button>
        </div>
      </div>
    </div>
  `;
  
  messagesContainer.innerHTML = welcomeHTML;
}

// Submit user info
function submitUserInfo() {
  const name = document.getElementById('userName').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  
  userSession.name = name || null;
  userSession.phone = phone || null;
  userSession.hasProvidedInfo = true;
  
  // If phone provided, send WhatsApp message
  if (phone && phone.length >= 10) {
    sendWhatsAppMessage(name, phone);
  }
  
  startConversation();
}

// Skip user info
function skipUserInfo() {
  userSession.hasProvidedInfo = true;
  startConversation();
}

// Start conversation
function startConversation() {
  const lang = currentLang || 'en';
  const messagesContainer = document.getElementById('chatbotMessages');
  messagesContainer.innerHTML = '';
  
  // Show greeting
  let greeting = '';
  if (userSession.name) {
    greeting = lang === 'en' 
      ? `Hello ${userSession.name}! 👋 I'm your Uday Health Assistant. How can I help you today?`
      : `नमस्ते ${userSession.name}! 👋 मैं आपका उदय स्वास्थ्य सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?`;
  } else {
    greeting = lang === 'en'
      ? `Hello! 👋 I'm your Uday Health Assistant. How can I help you today?`
      : `नमस्ते! 👋 मैं आपका उदय स्वास्थ्य सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?`;
  }
  
  addMessage(greeting, 'bot');
  
  // Show quick questions
  document.getElementById('quickQuestions').style.display = 'flex';
  userSession.conversationStarted = true;
}

// Send WhatsApp message using CallMeBot API (Free)
// Note: Requires one-time setup - user must add CallMeBot to their WhatsApp contacts
async function sendWhatsAppMessage(name, phone) {
  const lang = currentLang || 'en';
  
  // Format phone number - ensure it has Indian country code
  let cleanPhone = phone.replace(/\D/g, '');
  
  // Add Indian country code if not present
  if (!cleanPhone.startsWith('91')) {
    cleanPhone = '91' + cleanPhone;
  }
  
  // Ensure it's 12 digits (91 + 10 digits)
  if (cleanPhone.length !== 12) {
    console.error('Invalid phone number format');
    const errorMsg = lang === 'en' 
      ? '⚠️ Please enter a valid 10-digit mobile number.' 
      : '⚠️ कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें।';
    
    setTimeout(() => {
      addMessage(errorMsg, 'bot');
    }, 500);
    return;
  }
  
  // Create personalized message
  const greeting = name ? (lang === 'en' ? `Dear ${name}` : `प्रिय ${name}`) : (lang === 'en' ? 'Dear Patient' : 'प्रिय मरीज');
  
  const message = lang === 'en' 
    ? `🏥 Uday Health Care

${greeting},

Thank you for contacting us! 🙏

Dr. Navneet Agarwal
Consultant Neurologist

📞 Book Appointment:
${clinicInfo.phones[0]}
${clinicInfo.phones[1]}

📍 Address:
${clinicInfo.address}

⏰ Timings:
${clinicInfo.timings}

🌐 Services:
• Parkinson's Disease
• Epilepsy Management
• Migraine Care
• Stroke Treatment
• In-house Pharmacy
• Advanced Diagnostics

We look forward to serving you!

Uday Health Care
Your Health, Our Priority 💙`
    : `🏥 उदय हेल्थ केयर

${greeting},

हमसे संपर्क करने के लिए धन्यवाद! 🙏

डॉ. नवनीत अग्रवाल
सलाहकार न्यूरोलॉजिस्ट

📞 अपॉइंटमेंट बुक करें:
${clinicInfo.phones[0]}
${clinicInfo.phones[1]}

📍 पता:
${clinicInfo.address}

⏰ समय:
${clinicInfo.timings}

🌐 सेवाएं:
• पार्किंसंस रोग
• मिर्गी प्रबंधन
• माइग्रेन देखभाल
• स्ट्रोक उपचार
• इन-हाउस फार्मेसी
• उन्नत डायग्नोस्टिक्स

हम आपकी सेवा करने के लिए उत्सुक हैं!

उदय हेल्थ केयर
आपका स्वास्थ्य, हमारी प्राथमिकता 💙`;
  
  // Show processing message
  const processingMsg = lang === 'en'
    ? '📱 Sending WhatsApp message...'
    : '📱 व्हाट्सएप संदेश भेजा जा रहा है...';
  
  setTimeout(() => {
    addMessage(processingMsg, 'bot');
  }, 300);
  
  // Try multiple free WhatsApp APIs
  let messageSent = false;
  
  // Method 1: Try Ultramsg API (Free tier available)
  try {
    const ultramsgResponse = await sendViaUltramsg(cleanPhone, message);
    if (ultramsgResponse.success) {
      messageSent = true;
      showSuccessMessage(lang);
      return;
    }
  } catch (error) {
    console.log('Ultramsg failed, trying next method...');
  }
  
  // Method 2: Try Maytapi (Free tier available)
  try {
    const maytapiResponse = await sendViaMaytapi(cleanPhone, message);
    if (maytapiResponse.success) {
      messageSent = true;
      showSuccessMessage(lang);
      return;
    }
  } catch (error) {
    console.log('Maytapi failed, trying next method...');
  }
  
  // Method 3: Fallback to WhatsApp Click-to-Chat (Always works)
  if (!messageSent) {
    sendViaWhatsAppWeb(cleanPhone, message, name, lang);
  }
}

// Ultramsg API (Free tier: 100 messages/month)
async function sendViaUltramsg(phone, message) {
  // Note: Requires API token from https://ultramsg.com
  // Free tier available with registration
  const instanceId = 'YOUR_INSTANCE_ID'; // User needs to register and get this
  const token = 'YOUR_API_TOKEN'; // User needs to register and get this
  
  if (instanceId === 'YOUR_INSTANCE_ID' || token === 'YOUR_API_TOKEN') {
    throw new Error('Ultramsg not configured');
  }
  
  try {
    const response = await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token,
        to: phone,
        body: message
      })
    });
    
    const data = await response.json();
    return { success: data.sent === 'true' };
  } catch (error) {
    console.error('Ultramsg error:', error);
    return { success: false };
  }
}

// Maytapi API (Free tier: 100 messages/month)
async function sendViaMaytapi(phone, message) {
  // Note: Requires API token from https://maytapi.com
  // Free tier available with registration
  const productId = 'YOUR_PRODUCT_ID'; // User needs to register and get this
  const phoneId = 'YOUR_PHONE_ID'; // User needs to register and get this
  const apiToken = 'YOUR_API_TOKEN'; // User needs to register and get this
  
  if (productId === 'YOUR_PRODUCT_ID' || apiToken === 'YOUR_API_TOKEN') {
    throw new Error('Maytapi not configured');
  }
  
  try {
    const response = await fetch(`https://api.maytapi.com/api/${productId}/${phoneId}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-maytapi-key': apiToken
      },
      body: JSON.stringify({
        to_number: phone,
        message: message,
        type: 'text'
      })
    });
    
    const data = await response.json();
    return { success: data.success === true };
  } catch (error) {
    console.error('Maytapi error:', error);
    return { success: false };
  }
}

// Fallback: WhatsApp Web Click-to-Chat (Always works, no setup needed)
function sendViaWhatsAppWeb(phone, message, name, lang) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
  
  setTimeout(() => {
    // Try to open WhatsApp
    const whatsappWindow = window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      if (whatsappWindow) {
        // WhatsApp opened successfully
        const successMsg = lang === 'en'
          ? `✅ WhatsApp opened successfully!

Please click the *Send* button in WhatsApp to receive your appointment details.

📱 *Can't see WhatsApp?*
Make sure you have WhatsApp installed on your device.

📞 *Or call us directly:*
${clinicInfo.phones[0]}
${clinicInfo.phones[1]}`
          : `✅ व्हाट्सएप सफलतापूर्वक खुल गया!

अपने अपॉइंटमेंट विवरण प्राप्त करने के लिए कृपया व्हाट्सएप में *भेजें* बटन पर क्लिक करें।

📱 *व्हाट्सएप नहीं दिख रहा?*
सुनिश्चित करें कि आपके डिवाइस पर व्हाट्सएप इंस्टॉल है।

📞 *या हमें सीधे कॉल करें:*
${clinicInfo.phones[0]}
${clinicInfo.phones[1]}`;
        
        addMessage(successMsg, 'bot');
      } else {
        // Popup blocked or WhatsApp not available
        const fallbackMsg = lang === 'en'
          ? `📱 *Unable to open WhatsApp automatically*

*Option 1: Click the link below*
👉 <a href="${whatsappUrl}" target="_blank" style="color: #0066CC; text-decoration: underline; font-weight: 600;">Open WhatsApp Now</a>

*Option 2: Manual steps*
1. Open WhatsApp on your phone
2. Send a message to: ${clinicInfo.phones[0]}
3. Type: "Appointment Request from ${name || 'Website'}"

*Option 3: Call us directly*
📞 ${clinicInfo.phones[0]}
📞 ${clinicInfo.phones[1]}

We'll respond immediately! 💙`
          : `📱 *व्हाट्सएप स्वचालित रूप से नहीं खुल सका*

*विकल्प 1: नीचे दिए गए लिंक पर क्लिक करें*
👉 <a href="${whatsappUrl}" target="_blank" style="color: #0066CC; text-decoration: underline; font-weight: 600;">अभी व्हाट्सएप खोलें</a>

*विकल्प 2: मैनुअल चरण*
1. अपने फोन पर व्हाट्सएप खोलें
2. इस नंबर पर संदेश भेजें: ${clinicInfo.phones[0]}
3. टाइप करें: "${name || 'वेबसाइट'} से अपॉइंटमेंट अनुरोध"

*विकल्प 3: हमें सीधे कॉल करें*
📞 ${clinicInfo.phones[0]}
📞 ${clinicInfo.phones[1]}

हम तुरंत जवाब देंगे! 💙`;
        
        addMessage(fallbackMsg, 'bot');
      }
    }, 1000);
  }, 800);
  
  // Log for analytics
  console.log('WhatsApp message initiated:', {
    name: name || 'Anonymous',
    phone: phone,
    timestamp: new Date().toISOString(),
    language: lang,
    method: 'WhatsApp Web'
  });
}

// Show success message
function showSuccessMessage(lang) {
  setTimeout(() => {
    const successMsg = lang === 'en'
      ? `✅ *Message Sent Successfully!*

You will receive appointment details on WhatsApp shortly.

📱 *Didn't receive the message?*
Please check your WhatsApp or call us:
📞 ${clinicInfo.phones[0]}
📞 ${clinicInfo.phones[1]}

💙 Thank you for choosing Uday Health Care!`
      : `✅ *संदेश सफलतापूर्वक भेजा गया!*

आपको जल्द ही व्हाट्सएप पर अपॉइंटमेंट विवरण प्राप्त होगा।

📱 *संदेश प्राप्त नहीं हुआ?*
कृपया अपना व्हाट्सएप जांचें या हमें कॉल करें:
📞 ${clinicInfo.phones[0]}
📞 ${clinicInfo.phones[1]}

💙 उदय हेल्थ केयर चुनने के लिए धन्यवाद!`;
    
    addMessage(successMsg, 'bot');
  }, 1200);
}

// Toggle chatbot
function toggleChatbot() {
  const container = document.getElementById('chatbotContainer');
  const isActive = container.classList.contains('active');
  
  if (!isActive && !userSession.conversationStarted) {
    initializeChatbot();
  }
  
  container.classList.toggle('active');
}

// Send message
function sendMessage() {
  const input = document.getElementById('chatbotInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Check if conversation started
  if (!userSession.conversationStarted) {
    skipUserInfo();
  }
  
  // Add user message
  addMessage(message, 'user');
  input.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Process message and respond
  setTimeout(() => {
    hideTypingIndicator();
    const response = processMessage(message);
    addMessage(response, 'bot');
  }, 1000);
}

// Add message to chat
function addMessage(text, sender) {
  const messagesContainer = document.getElementById('chatbotMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chatbot-message ${sender}-message`;
  
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
  
  const content = document.createElement('div');
  content.className = 'message-content';
  content.innerHTML = `<p>${text}</p>`;
  
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);
  messagesContainer.appendChild(messageDiv);
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
  const messagesContainer = document.getElementById('chatbotMessages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chatbot-message bot-message typing-indicator-message';
  typingDiv.innerHTML = `
    <div class="message-avatar"><i class="fas fa-robot"></i></div>
    <div class="message-content">
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator-message');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Process message and generate response
function processMessage(message) {
  const lang = currentLang || 'en';
  const lowerMessage = message.toLowerCase();
  
  // Check for emergency keywords
  const emergencyKeywords = ['emergency', 'urgent', 'help', 'ambulance', 'आपातकाल', 'तुरंत', 'मदद'];
  if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return lang === 'en'
      ? `⚠️ *MEDICAL EMERGENCY*\n\nPlease call immediately:\n📞 ${clinicInfo.phones[0]}\n📞 ${clinicInfo.phones[1]}\n\nFor life-threatening conditions, call 108 (Ambulance)`
      : `⚠️ *चिकित्सा आपातकाल*\n\nकृपया तुरंत कॉल करें:\n📞 ${clinicInfo.phones[0]}\n📞 ${clinicInfo.phones[1]}\n\nजीवन-धमकी की स्थिति के लिए, 108 (एम्बुलेंस) पर कॉल करें`;
  }
  
  // Check for appointment keywords
  const appointmentKeywords = ['appointment', 'book', 'schedule', 'visit', 'अपॉइंटमेंट', 'बुक', 'मिलना'];
  if (appointmentKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return getAppointmentInfo(lang);
  }
  
  // Check for timing keywords
  const timingKeywords = ['timing', 'time', 'hours', 'open', 'समय', 'खुला'];
  if (timingKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return lang === 'en'
      ? `⏰ *Clinic Timings*\n\n${clinicInfo.timings}\n\n📞 Call for appointment:\n${clinicInfo.phones[0]}\n${clinicInfo.phones[1]}`
      : `⏰ *क्लिनिक समय*\n\n${clinicInfo.timings}\n\n📞 अपॉइंटमेंट के लिए कॉल करें:\n${clinicInfo.phones[0]}\n${clinicInfo.phones[1]}`;
  }
  
  // Check for location keywords
  const locationKeywords = ['location', 'address', 'where', 'direction', 'पता', 'कहां', 'दिशा'];
  if (locationKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return lang === 'en'
      ? `📍 *Our Location*\n\n${clinicInfo.address}\n\n🗺️ Get directions: https://g.co/kgs/MHMx6eo`
      : `📍 *हमारा स्थान*\n\n${clinicInfo.address}\n\n🗺️ दिशा-निर्देश प्राप्त करें: https://g.co/kgs/MHMx6eo`;
  }
  
  // Check for specific conditions
  if (lowerMessage.includes('parkinson') || lowerMessage.includes('पार्किंसंस')) {
    return getConditionInfo('parkinsons', lang);
  }
  
  if (lowerMessage.includes('epilepsy') || lowerMessage.includes('seizure') || lowerMessage.includes('मिर्गी') || lowerMessage.includes('दौरे')) {
    return getConditionInfo('epilepsy', lang);
  }
  
  if (lowerMessage.includes('migraine') || lowerMessage.includes('headache') || lowerMessage.includes('माइग्रेन') || lowerMessage.includes('सिरदर्द')) {
    return getConditionInfo('migraine', lang);
  }
  
  if (lowerMessage.includes('stroke') || lowerMessage.includes('paralysis') || lowerMessage.includes('स्ट्रोक') || lowerMessage.includes('लकवा')) {
    return getConditionInfo('stroke', lang);
  }
  
  // Default help response
  return getHelpInfo(lang);
}

// Get condition information
function getConditionInfo(condition, lang) {
  const data = neuroKnowledgeBase[condition][lang];
  return `<strong>${data.title}</strong><br><br>
    📋 ${data.info}<br><br>
    <strong>${lang === 'en' ? 'Common Symptoms:' : 'सामान्य लक्षण:'}</strong><br>
    ${data.symptoms}<br><br>
    <strong>${lang === 'en' ? 'Treatment Options:' : 'उपचार विकल्प:'}</strong><br>
    ${data.treatment}<br><br>
    📞 ${lang === 'en' ? 'Book consultation:' : 'परामर्श बुक करें:'} ${clinicInfo.phones[0]}`;
}

// Get appointment information with booking form
function getAppointmentInfo(lang) {
  // Show appointment booking form
  setTimeout(() => {
    showAppointmentForm(lang);
  }, 500);
  
  return lang === 'en'
    ? `📅 *Book Your Appointment*\n\n*Dr. ${clinicInfo.doctor}*\nConsultant Neurologist\n\nPlease fill in your details below to book an appointment via WhatsApp.`
    : `📅 *अपना अपॉइंटमेंट बुक करें*\n\n*डॉ. ${clinicInfo.doctor}*\nसलाहकार न्यूरोलॉजिस्ट\n\nकृपया व्हाट्सएप के माध्यम से अपॉइंटमेंट बुक करने के लिए नीचे अपना विवरण भरें।`;
}

// Get upcoming Saturdays
function getUpcomingSaturdays(count = 4) {
  const saturdays = [];
  const today = new Date();
  let currentDate = new Date(today);
  
  // Find next Saturday
  const daysUntilSaturday = (6 - currentDate.getDay() + 7) % 7;
  if (daysUntilSaturday === 0 && currentDate.getHours() >= 13) {
    // If today is Saturday and past 1 PM, start from next Saturday
    currentDate.setDate(currentDate.getDate() + 7);
  } else if (daysUntilSaturday > 0) {
    currentDate.setDate(currentDate.getDate() + daysUntilSaturday);
  }
  
  // Get next 'count' Saturdays
  for (let i = 0; i < count; i++) {
    saturdays.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 7);
  }
  
  return saturdays;
}

// Show appointment booking form
function showAppointmentForm(lang) {
  const messagesContainer = document.getElementById('chatbotMessages');
  
  // Get upcoming Saturdays
  const saturdays = getUpcomingSaturdays(4);
  const saturdayOptions = saturdays.map(date => {
    const dateStr = date.toISOString().split('T')[0];
    const displayDate = date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    return `<option value="${dateStr}">${displayDate}</option>`;
  }).join('');
  
  const formHTML = `
    <div class="chatbot-message bot-message">
      <div class="message-avatar"><i class="fas fa-robot"></i></div>
      <div class="message-content">
        <div class="appointment-form">
          <h4 style="margin: 0 0 15px 0; color: #0066CC;">
            <i class="fas fa-calendar-check"></i> 
            ${lang === 'en' ? 'Appointment Details' : 'अपॉइंटमेंट विवरण'}
          </h4>
          
          <div class="form-field" style="margin-bottom: 12px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 0.9em;">
              ${lang === 'en' ? 'Patient Name' : 'मरीज का नाम'} <span style="color: red;">*</span>
            </label>
            <input type="text" id="appointmentName" placeholder="${lang === 'en' ? 'Enter patient full name' : 'मरीज का पूरा नाम दर्ज करें'}" 
              style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 0.95em;">
          </div>
          
          <div class="form-field" style="margin-bottom: 12px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 0.9em;">
              ${lang === 'en' ? 'Phone Number' : 'फोन नंबर'} <span style="color: red;">*</span>
            </label>
            <input type="tel" id="appointmentPhone" placeholder="+91 XXXXX XXXXX" maxlength="14"
              style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 0.95em;">
          </div>
          
          <div class="form-field" style="margin-bottom: 12px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 0.9em;">
              ${lang === 'en' ? 'Available Dates (Saturdays Only)' : 'उपलब्ध तिथियां (केवल शनिवार)'} <span style="color: red;">*</span>
            </label>
            <select id="appointmentDate" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 0.95em;">
              <option value="">${lang === 'en' ? 'Select a Saturday' : 'शनिवार चुनें'}</option>
              ${saturdayOptions}
            </select>
          </div>
          
          <div class="form-field" style="margin-bottom: 12px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 0.9em;">
              ${lang === 'en' ? 'Available Time (10 AM - 1 PM)' : 'उपलब्ध समय (10 AM - 1 PM)'} <span style="color: red;">*</span>
            </label>
            <select id="appointmentTime" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 0.95em;">
              <option value="">${lang === 'en' ? 'Select time slot' : 'समय स्लॉट चुनें'}</option>
              <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
              <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
              <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
              <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
              <option value="12:00 PM - 12:30 PM">12:00 PM - 12:30 PM</option>
              <option value="12:30 PM - 1:00 PM">12:30 PM - 1:00 PM</option>
            </select>
          </div>
          
          <div class="form-field" style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 0.9em;">
              ${lang === 'en' ? 'Reason for Visit' : 'मुलाकात का कारण'}
            </label>
            <textarea id="appointmentReason" rows="3" placeholder="${lang === 'en' ? 'Brief description of your concern...' : 'अपनी चिंता का संक्षिप्त विवरण...'}"
              style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 0.95em; resize: vertical;"></textarea>
          </div>
          
          <button onclick="submitAppointment()" 
            style="width: 100%; padding: 12px; background: linear-gradient(135deg, #0066CC 0%, #004C99 100%); color: white; border: none; border-radius: 5px; font-size: 1em; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: transform 0.2s;">
            <i class="fab fa-whatsapp" style="font-size: 1.2em;"></i>
            ${lang === 'en' ? 'Book via WhatsApp' : 'व्हाट्सएप से बुक करें'}
          </button>
          
          <p style="margin: 10px 0 0 0; font-size: 0.85em; color: #666; text-align: center;">
            ${lang === 'en' ? 'You will be redirected to WhatsApp to confirm your appointment' : 'आपको अपॉइंटमेंट की पुष्टि के लिए व्हाट्सएप पर भेजा जाएगा'}
          </p>
        </div>
      </div>
    </div>
  `;
  
  messagesContainer.insertAdjacentHTML('beforeend', formHTML);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Auto-format phone number
  const phoneInput = document.getElementById('appointmentPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.startsWith('91')) {
        value = value.substring(2);
      }
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
      e.target.value = value ? '+91 ' + value : '';
    });
  }
}

// Submit appointment via WhatsApp
function submitAppointment() {
  const lang = currentLang || 'en';
  const name = document.getElementById('appointmentName').value.trim();
  const phone = document.getElementById('appointmentPhone').value.trim();
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;
  const reason = document.getElementById('appointmentReason').value.trim();
  
  // Validation
  if (!name) {
    alert(lang === 'en' ? 'Please enter patient name' : 'कृपया मरीज का नाम दर्ज करें');
    return;
  }
  
  if (!phone || phone.length < 14) {
    alert(lang === 'en' ? 'Please enter a valid 10-digit phone number' : 'कृपया एक वैध 10-अंकीय फोन नंबर दर्ज करें');
    return;
  }
  
  if (!date) {
    alert(lang === 'en' ? 'Please select an appointment date' : 'कृपया अपॉइंटमेंट की तारीख चुनें');
    return;
  }
  
  if (!time) {
    alert(lang === 'en' ? 'Please select an appointment time slot' : 'कृपया अपॉइंटमेंट का समय स्लॉट चुनें');
    return;
  }
  
  // Format date
  const dateObj = new Date(date);
  const dateText = dateObj.toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  let reasonText = reason || (lang === 'en' ? 'General consultation' : 'सामान्य परामर्श');
  
  // Create WhatsApp message
  const message = lang === 'en' 
    ? `🏥 *APPOINTMENT BOOKING REQUEST*

*Patient Details:*
👤 Name: ${name}
📱 Phone: ${phone}

*Appointment Details:*
📅 Date: ${dateText}
⏰ Time: ${time}
📋 Reason: ${reasonText}

*Doctor:*
Dr. ${clinicInfo.doctor}
Consultant Neurologist

*Clinic:*
${clinicInfo.name}
${clinicInfo.address}

Please confirm my appointment at your earliest convenience.

Thank you! 🙏`
    : `🏥 *अपॉइंटमेंट बुकिंग अनुरोध*

*मरीज का विवरण:*
👤 नाम: ${name}
📱 फोन: ${phone}

*अपॉइंटमेंट विवरण:*
📅 तारीख: ${dateText}
⏰ समय: ${time}
📋 कारण: ${reasonText}

*डॉक्टर:*
डॉ. ${clinicInfo.doctor}
सलाहकार न्यूरोलॉजिस्ट

*क्लिनिक:*
${clinicInfo.name}
${clinicInfo.address}

कृपया जल्द से जल्द मेरे अपॉइंटमेंट की पुष्टि करें।

धन्यवाद! 🙏`;
  
  // Get clinic WhatsApp number (remove +91 and spaces)
  const clinicWhatsApp = clinicInfo.phones[0].replace(/\D/g, '');
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${clinicWhatsApp}?text=${encodedMessage}`;
  
  // Open WhatsApp
  window.open(whatsappUrl, '_blank');
  
  // Show confirmation message
  setTimeout(() => {
    const confirmMsg = lang === 'en'
      ? `✅ *Appointment request sent!*

Your appointment details have been sent to our WhatsApp.

📱 *Next Steps:*
1. Complete the message in WhatsApp
2. Click Send
3. Our team will confirm your appointment shortly

📞 *Need immediate assistance?*
Call us: ${clinicInfo.phones[0]}

Thank you for choosing Uday Health Care! 💙`
      : `✅ *अपॉइंटमेंट अनुरोध भेजा गया!*

आपके अपॉइंटमेंट विवरण हमारे व्हाट्सएप पर भेजे गए हैं।

📱 *अगले चरण:*
1. व्हाट्सएप में संदेश पूरा करें
2. भेजें पर क्लिक करें
3. हमारी टीम जल्द ही आपके अपॉइंटमेंट की पुष्टि करेगी

📞 *तत्काल सहायता चाहिए?*
हमें कॉल करें: ${clinicInfo.phones[0]}

उदय हेल्थ केयर चुनने के लिए धन्यवाद! 💙`;
    
    addMessage(confirmMsg, 'bot');
  }, 500);
  
  // Log appointment request
  console.log('Appointment request:', {
    name,
    phone,
    date: dateText,
    time: time,
    reason: reasonText,
    timestamp: new Date().toISOString()
  });
}

// Get help information
function getHelpInfo(lang) {
  return lang === 'en'
    ? `I can help you with:\n\n🏥 *Medical Conditions:*\n• Parkinson's Disease\n• Epilepsy\n• Migraine\n• Stroke\n\n📅 *Services:*\n• Appointment booking\n• Clinic timings\n• Location & directions\n• Contact information\n\n📞 *Call us:* ${clinicInfo.phones[0]}\n\n💡 Try asking: "Book appointment" or "Parkinson's treatment"`
    : `मैं आपकी मदद कर सकता हूं:\n\n🏥 *चिकित्सा स्थितियां:*\n• पार्किंसंस रोग\n• मिर्गी\n• माइग्रेन\n• स्ट्रोक\n\n📅 *सेवाएं:*\n• अपॉइंटमेंट बुकिंग\n• क्लिनिक समय\n• स्थान और दिशा-निर्देश\n• संपर्क जानकारी\n\n📞 *हमें कॉल करें:* ${clinicInfo.phones[0]}\n\n💡 पूछने का प्रयास करें: "अपॉइंटमेंट बुक करें" या "पार्किंसंस उपचार"`;
}

// Quick question buttons
function askQuestion(topic) {
  const lang = currentLang || 'en';
  
  if (!userSession.conversationStarted) {
    skipUserInfo();
  }
  
  let question = '';
  
  switch(topic) {
    case 'parkinsons':
      question = lang === 'en' ? 'Tell me about Parkinson\'s Disease' : 'पार्किंसंस रोग के बारे में बताएं';
      break;
    case 'epilepsy':
      question = lang === 'en' ? 'What is Epilepsy?' : 'मिर्गी क्या है?';
      break;
    case 'migraine':
      question = lang === 'en' ? 'How to treat Migraine?' : 'माइग्रेन का इलाज कैसे करें?';
      break;
    case 'stroke':
      question = lang === 'en' ? 'What are stroke symptoms?' : 'स्ट्रोक के लक्षण क्या हैं?';
      break;
    case 'appointment':
      question = lang === 'en' ? 'I want to book an appointment' : 'मुझे अपॉइंटमेंट बुक करना है';
      break;
  }
  
  addMessage(question, 'user');
  showTypingIndicator();
  
  setTimeout(() => {
    hideTypingIndicator();
    const response = processMessage(question);
    addMessage(response, 'bot');
  }, 1000);
}

// Handle Enter key in input
document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chatbotInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
  
  // Auto-format phone number with Indian prefix
  const phoneInput = document.getElementById('userPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      // Remove 91 if user typed it
      if (value.startsWith('91')) {
        value = value.substring(2);
      }
      
      // Limit to 10 digits
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
      
      // Add +91 prefix
      e.target.value = value ? '+91 ' + value : '';
    });
    
    // Set initial value
    phoneInput.placeholder = '+91 XXXXX XXXXX';
  }
});
