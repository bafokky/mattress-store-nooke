import React, { useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/app.css";
import { Helmet } from "react-helmet";
import AboutUsPageContainer from "../components/aboutus/AboutUsPageContainer";

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>О нас — NOOKE</title>
      </Helmet>

      <Breadcrumbs title="О нас" />
      <AboutUsPageContainer />
    </>
  );
};

export default AboutPage;
