import React from "react";
import "../styles/location.css";

const MapComponent: React.FC = () => {
  return (
    <div className="map">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2353.761319371655!2d27.45359797599913!3d53.8471089724388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbda7820337909%3A0x688b8187153bb3ae!2z0YPQuy4g0JrQvtGB0LzQvtC90LDQstGC0L7QsiA0MSwg0JzQuNC90YHQutCw0Y8g0L7QsdC70LDRgdGC0Yw!5e0!3m2!1sru!2sby!4v1765039773053!5m2!1sru!2sby" 
        allowFullScreen={true} 
        loading="eager" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
        style={{ border: 0, width: "100%", height: "100%" }}
      ></iframe>

    </div>
  );
}

export default MapComponent;