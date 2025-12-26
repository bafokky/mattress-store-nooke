import React, { useState, useEffect, ChangeEvent, FormEvent, useMemo } from "react";
import InputMask from "react-input-mask";
import "./styles/email.css";
import Button from "./components/Button";
import "./styles/parallax.css";

interface CartItem {
  name: string;
  type: string;
  quantity: number;
  price: number;
  selectedSize?: string;
  displaySize?: string;
}

interface EmailProps {
  modalClose?: () => void;
  cartItems?: CartItem[];
  totalPrice?: number;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const Email: React.FC<EmailProps> = ({
  modalClose,
  cartItems = [],
  totalPrice = 0,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  //мемоизация списка товаров для отображения
  const renderedCartItems = useMemo(() => {
    return cartItems.map((item, index) => {
      const size = item.displaySize || item.selectedSize;
      return (
        <div key={index} className="order-item">
          <div className="order-item-name">
            {item.name} ({item.type})
            {size && <span className="order-item-size"> - {size}</span>}
          </div>
          <div className="order-item-details">
            <span>{item.quantity} шт.</span>
            <span className="order-item-price">
              {item.price * item.quantity} BYN
            </span>
          </div>
        </div>
      );
    });
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const cartText = cartItems
        .map((item) => {
          const size = item.displaySize || item.selectedSize;
          const sizeText = size ? ` - Размер: ${size}` : "";
          return `${item.name} (${item.type})${sizeText} - ${item.quantity} шт. - ${
            item.price * item.quantity
          } BYN`;
        })
        .join("\n");

      const fullText = `Заказ из корзины:\n\n${cartText}\n\nОбщая сумма: ${totalPrice} BYN`;

      setFormData((prev) => ({ ...prev, message: fullText }));
    }
  }, [cartItems, totalPrice]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const detailedMessage =
      cartItems.length > 0
        ? cartItems
            .map((item) => {
              const size = item.displaySize || item.selectedSize;
              const sizeText = size ? `\nРазмер: ${size}` : "";
              return `Товар: ${item.name}\nТип: ${
                item.type
              }${sizeText}\nЦена: ${item.price} BYN\nКоличество: ${
                item.quantity
              } шт.\nСумма: ${item.price * item.quantity} BYN\n-------------------`;
            })
            .join("\n")
        : "";

    const fullMessage = detailedMessage
      ? `ДЕТАЛИ ЗАКАЗА:\n\n${detailedMessage}\n\nОБЩАЯ СУММА: ${totalPrice} BYN\n\nКОНТАКТНЫЕ ДАННЫЕ:\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\n\nДОПОЛНИТЕЛЬНЫЕ КОММЕНТАРИИ:\n${formData.message}`
      : formData.message;

    const orderData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: fullMessage,
      access_key: "0d82c953-64d1-4813-9aa0-f835df357442",
      subject: `Новый заказ от ${formData.name || "клиента"}`,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        setFormData({ name: "", phone: "", email: "", message: "" });
        onSuccess?.();
        alert("Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.");
        modalClose?.();
      } else {
        console.error("Ошибка отправки:", data);
        alert(
          "Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз."
        );
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      alert(
        "Произошла ошибка сети. Пожалуйста, проверьте подключение к интернету."
      );
    }
  };

  return (
    <div className="email-container">
      <div className="email-header">
        <h2>Оформление заказа</h2>
        <h3>Заполните данные для оформления заказа из корзины</h3>
      </div>

      {cartItems.length > 0 && (
        <div className="order-preview">
          <h4>Ваш заказ:</h4>
          
          <div className="order-items-list">{renderedCartItems}</div>
          
          <div className="order-total">
            <span>Общая сумма:</span>
            <span className="total-amount">{totalPrice} BYN</span>
          </div>
        </div>
      )}

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
             {(inputProps) => <input type="text" {...inputProps} />}
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
            <label htmlFor="message">Детали заказа:</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
            />
            <p className="form-note">
              Поле автоматически заполнено товарами из вашей корзины с указанием
              размеров. Вы можете добавить свои комментарии.
            </p>
          </div>
          <div className="submit-group">
            <Button text="Отправить заказ" type="submit" className="send-btn" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Email;