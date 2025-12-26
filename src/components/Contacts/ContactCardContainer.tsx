import React from "react";
import "../../styles/contact/contact-card.css";
import ContactCard from "./ContactCard";
import map from "../../assets/maps-and-flags.png";
import phonecall from "../../assets/phone-call.png";
import mail from "../../assets/mail.png";

const ContactCardContainer: React.FC = () => {
    return (
        <div className="contact-details-container">
            <div className="ContContainer">
                <ContactCard 
                    imageSrc={map} 
                    title="Наш адрес: " 
                    description="г. Минск, ул. Космонавтов 41" 
                    media="https://www.google.com/maps/search/?api=1&query=Минск+Космонавтов+41"
                />
                <ContactCard
                    imageSrc={mail}
                    title="Наша почта: "
                    description="bafokky@gmail.com"
                    media="mailto:bafokky@gmail.com"
                />
                <ContactCard
                    imageSrc={phonecall}
                    title="Наш нoмер телефона:"
                    description="+375-(29)-926-37-12"
                    media="tel:+375299263712"
                />
            </div>
        </div>
    );
};

export default ContactCardContainer;