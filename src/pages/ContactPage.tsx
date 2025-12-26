import React, { useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import EmailContact from "../EmailContact"; 
import "../styles/contact/contact.css";
import ContactCardContainer from "../components/Contacts/ContactCardContainer";
import { Helmet } from "react-helmet";

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Контакты — NOOKE</title>
      </Helmet>

      <Breadcrumbs title="Контакты" />
      <div className="contact-container-all">
        <div className="contact-container">
          <ContactCardContainer />
          
          <div className="tw-flex tw-justify-center tw-bg-[var(--bg-primary)] tw-rounded-[5px] tw-shadow-[0_2px_4px_rgba(0,0,0,0.1)] tw-w-full tw-h-full lg:tw-w-[60%]">
                    <EmailContact
              modalClose={() => {}}
              onSuccess={() => console.log("Форма успешно отправлена")}
            />
          </div>
        </div>
      </div>
      
      <div className="tw-mb-[110px] tw-h-[400px]">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2353.761319371655!2d27.45359797599913!3d53.8471089724388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbda7820337909%3A0x688b8187153bb3ae!2z0YPQuy4g0JrQvtGB0LzQvtC90LDQstGC0L7QsiA0MSwg0JzQuNC90YHQuiwg0JzQuNC90YHQutCw0Y8g0L7QsdC70LDRgdGC0Yw!5e0!3m2!1sru!2sby!4v1765039773053!5m2!1sru!2sby"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
};

export default ContactPage;