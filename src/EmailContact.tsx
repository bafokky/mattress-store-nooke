import React, { useState, ChangeEvent, FormEvent } from "react";
import InputMask from "react-input-mask";
import "./styles/email.css";
import Button from "./components/Button";
import "./styles/parallax.css";


interface ContactFormProps {
  modalClose?: () => void;
  onSuccess?: () => void;
}


interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const EmailContact: React.FC<ContactFormProps> = ({
  modalClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  
    const fullMessage = `
      НОВОЕ СООБЩЕНИЕ С САЙТА:
      
      Имя: ${formData.name}
      Телефон: ${formData.phone}
      Email: ${formData.email}
      
      СООБЩЕНИЕ:
      ${formData.message}
    `;

    const apiData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: fullMessage,
      access_key: "0d82c953-64d1-4813-9aa0-f835df357442",
      subject: `Вопрос от клиента: ${formData.name || 'Гость'}`
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(apiData),
      });

      const data = await res.json();

      if (data.success) {
        setFormData({ name: "", phone: "", email: "", message: "" });
        onSuccess?.();
        alert("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
        modalClose?.();
      } else {
        console.error("Ошибка отправки:", data);
        alert("Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.");
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      alert("Произошла ошибка сети. Пожалуйста, проверьте подключение к интернету.");
    }
  };

  return (
    <div className="email-container">
      <div className="email-header">
        <h2>Остались вопросы?</h2>
        <h3>Заполните форму, и мы свяжемся с вами для консультации</h3>
      </div>

      <form onSubmit={onSubmit} className="email-form">
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="name">Ваше имя:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
         
         />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Ваш номер телефона:</label>
            <InputMask
              mask="+375(99)-999-99-99"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+375(xx)-xxx-xx-xx"
            >
              {/* @ts-ignore - InputMask typing issue workaround */}
              {(inputProps: any) => <input type="text" {...inputProps} />}
            </InputMask>
          </div>
          <div className="input-group">
            <label htmlFor="email">Ваша почта:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              
            />
          </div>
        </div>

        <div className="input-group-textarea-group">
          <div className="text-only">
            <label htmlFor="message">Ваш вопрос или сообщение:</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Напишите здесь ваш вопрос..."
            />
          </div>
          <div className="submit-group">
            <Button text="Отправить" type="submit" className="send-btn" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailContact;