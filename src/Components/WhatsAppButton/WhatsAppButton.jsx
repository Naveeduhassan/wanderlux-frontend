import './WhatsAppButton.css';
const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.me/923001234567?text=Hi%20WanderLux!%20I%20would%20like%20to%20inquire%20about%20your%20travel%20packages.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
      aria-label="Chat with WanderLux on WhatsApp"
      title="Chat with WanderLux Travel Expert"
    >
      <div className="whatsapp-icon-pulse">
        <i className="fab fa-whatsapp"></i>
      </div>
      <span className="d-none d-sm-inline">Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
