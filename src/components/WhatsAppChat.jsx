import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppChat = () => {
  const phoneNumber = "+94702370470"; 
  const message = "Hello! I'm interested in your floral services. Can you show me your best designs?";
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
  onClick={handleWhatsAppClick}
  style={{ backgroundColor: "oklch(52.7% 0.154 150.069)" }}
  className="fixed bottom-6 right-6 text-white h-16 w-16 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 group"
>
      <img src="/src/whatsapp.webp" alt="WhatsApp" className="h-10 w-10 object-contain" />
      <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-sage-700 text-black px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
       <b>Chat with us</b> 
      </span>
    </button>
  );
};

export default WhatsAppChat;