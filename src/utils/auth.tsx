export interface User {
  username: string;
  password?: string; 
}

//ответы функции авторизации
export interface AuthResponse {
  success: boolean;
  message: string;
}

//хеширование пароля
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  //хеш SHA-256
  const hashBuffer: ArrayBuffer = await crypto.subtle.digest("SHA-256", data);
  
  const hashArray: number[] = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

//регистрация 
export const registerUser = async (username: string, password: string): Promise<AuthResponse> => {
  const hashedPassword = await hashPassword(password);

  //список пользователей
  const storedUsers = localStorage.getItem("users");
  let users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

  //существует ли пользователь
  if (users.find((u: User) => u.username === username)) {
    return { success: false, message: "Пользователь уже зарегистрирован" };
  }

  //добавление пользователя
  const newUser: User = { username, password: hashedPassword };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true, message: "Регистрация успешна" };
};

//вход в систему
export const loginUser = async (username: string, password: string): Promise<AuthResponse> => {
  const hashedPassword = await hashPassword(password);
  
  const storedUsers = localStorage.getItem("users");
  const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

  const user = users.find((u: User) => u.username === username);
  
  if (!user) {
    return { success: false, message: "Пользователь не найден" };
  }

  if (user.password === hashedPassword) {
    localStorage.setItem("isAuthenticated", "true");
    
    //сохранение
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

    window.dispatchEvent(new Event('auth-change'));
    
    return { success: true, message: "Вход выполнен успешно" };
  }

  return { success: false, message: "Неверный логин или пароль" };
};

//проверка авторизации
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("isAuthenticated") === "true";
};

//выход
export const logout = (): void => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("currentUser");

  window.dispatchEvent(new Event('auth-change'));
};