const USERS_KEY = "vp-code-users";
const TOKEN_KEY = "token";

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

const createToken = (email) =>
  btoa(`${email}:${Date.now()}:${Math.random()}`);

export const registerLocalUser = (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists");
  }

  const user = { email: normalizedEmail, password };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));

  const token = createToken(normalizedEmail);
  localStorage.setItem(TOKEN_KEY, token);
  return { email: normalizedEmail };
};

export const loginLocalUser = (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = readUsers().find(
    (candidate) =>
      candidate.email === normalizedEmail && candidate.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  localStorage.setItem(TOKEN_KEY, createToken(normalizedEmail));
  return { email: normalizedEmail };
};

export const getLocalUser = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const email = atob(token).split(":")[0];
    return readUsers().find((user) => user.email === email) || null;
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
};

export const logoutLocalUser = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const updateLocalPassword = (password) => {
  const currentUser = getLocalUser();
  if (!currentUser) {
    throw new Error("Log in before changing your password");
  }

  const users = readUsers().map((user) =>
    user.email === currentUser.email ? { ...user, password } : user
  );
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};