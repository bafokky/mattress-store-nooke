// utils/auth.js

// Хеширование пароля
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Регистрация пользователя
export const registerUser = async (username, password) => {
  const hashedPassword = await hashPassword(password);

  // Получаем массив пользователей
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Проверяем, есть ли пользователь с таким именем
  if (users.find(u => u.username === username)) {
    return { success: false, message: "Пользователь уже зарегистрирован" };
  }

  // Добавляем нового пользователя
  users.push({ username, password: hashedPassword });
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true, message: "Регистрация успешна" };
};

// Вход пользователя
export const loginUser = async (username, password) => {
  const hashedPassword = await hashPassword(password);
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.username === username);
  if (!user) {
    return { success: false, message: "Пользователь не найден" };
  }

  if (user.password === hashedPassword) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, message: "Вход выполнен успешно" };
  }

  return { success: false, message: "Неверный логин или пароль" };
};

// Проверка авторизации
export const isAuthenticated = () => localStorage.getItem("isAuthenticated") === "true";

// Выход
export const logout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("currentUser");
};
