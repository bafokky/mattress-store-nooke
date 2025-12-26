import "../styles/aboutUsSection.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from "./Button";

const AboutUsSection: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = (): void => {
        setIsModalOpen(true);
    };

    const closeModal = (): void => {
        setIsModalOpen(false);
    };

    return(
        <div className="about-us-section">
            <div className="content-container">
                <div className="separation-container">
                    <div className="title-container">
                        <h1 className="title">О салоне «NOOKE»</h1>
                    </div>
                    <div className="separation-line-1"></div>
                    <div className="text-info">
                        <p className="before-text">
                            Здоровый сон, комфорт и инновационные технологии
                        </p>
                        <p className="main-text">
                            Салон матрасов «NOOKE» уже несколько лет является лидером на рынке здорового сна, заслужив доверие тысяч благодарных клиентов по всей Беларуси.
                            Мы предлагаем широкий ассортимент ортопедических матрасов, разработанных с учетом анатомических особенностей и индивидуальных предпочтений каждого покупателя.
                            Гордимся тем, что используем только сертифицированные материалы и передовые технологии производства, что позволяет нам создавать матрасы, 
                            которые не только обеспечивают комфортный отдых, но и способствуют здоровью вашего позвоночника. Приобретая матрас в нашем салоне, 
                            вы получаете гарантийное обслуживание и профессиональную поддержку на всех этапах эксплуатации.
                        </p>
                    </div>
                    <div className="button-with-line">
                        <Link to='/about'>
                            <Button className="button-link-aboutUs" text="Узнать больше" />
                        </Link>
                        <div className="separation-line-2"></div>
                    </div>
                </div>
                <div className="separation-container">
                </div>
            </div>
        </div>
    );
}

export default AboutUsSection;