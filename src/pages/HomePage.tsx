import React from "react";
import Location from "../components/Location";
import ShadowSlider from "../components/ShadowSlider";
import PreferencesContainer from "../components/PreferencesContainer";
import AboutUsSection from "../components/AboutUsSection";
import Parallax from "../components/Parallax";
import UpCatalogSection from "../components/CatalogSection";
import { Helmet } from "react-helmet";

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Главная — NOOKE</title>
      </Helmet>

      <ShadowSlider />
      <PreferencesContainer />
      <UpCatalogSection />
      <AboutUsSection />
      <Parallax />
      <Location />
    </>
  );
};

export default HomePage;
