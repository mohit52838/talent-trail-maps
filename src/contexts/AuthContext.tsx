import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AppUser = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  isAdmin?: boolean;
};

type AuthContextValue = {
  user: AppUser | null;
  isAdmin: boolean;
  login: (email: string, password: string, name?: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const LOCAL_KEY = "user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_KEY);
      if (saved) {
        const parsed: AppUser = JSON.parse(saved);
        setUser(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_KEY);
    }
  }, [user]);

  const login: AuthContextValue["login"] = async (email, password, name) => {
    // Admin - Mohit Patil
    if (email === "mohitpatil52838@gmail.com" && password === "Raje@1234") {
      const adminUser: AppUser = {
        id: "admin",
        email,
        name: name || "Admin",
        isAdmin: true,
        avatar: "/favicon.ico",
      };
      setUser(adminUser);
      return { ok: true };
    }

    //Admin - Krish Parmar
    if (email === "krishparmar116@gmail.com" && password === "Krish@1234") {
        const adminUser: AppUser = {
          id: "admin",
          email,
          name: name || "Admin",
          isAdmin: true,
          avatar: "/favicon.ico",
        };
        setUser(adminUser);
        return { ok: true };
      }

    //Admin - Anuj Pisal
    if (email === "anujpisalcn@gmail.com" && password === "Anuj@1234") {
        const adminUser: AppUser = {
          id: "admin",
          email,
          name: name || "Admin",
          isAdmin: true,
          avatar: "/favicon.ico",
        };
        setUser(adminUser);
        return { ok: true };
      }

    //Admin - Smita Panse
    if (email === "smitapanse8@gmail.com" && password === "Smita@1234") {
        const adminUser: AppUser = {
          id: "admin",
          email,
          name: name || "Admin",
          isAdmin: true,
          avatar: "/favicon.ico",
        };
        setUser(adminUser);
        return { ok: true };
      }

    //Admin - Rutuja Navgire
    if (email === "rutuja.nav12@gmail.com" && password === "Rat@1234") {
      const adminUser: AppUser = {
        id: "admin",
        email,
        name: name || "Admin",
        isAdmin: true,
        avatar: "/favicon.ico",
      };
      setUser(adminUser);
      return { ok: true };
    }

    // Basic user mock auth (accept any non-empty email/password)
    if (email && password) {
      const appUser: AppUser = {
        id: crypto.randomUUID(),
        email,
        name: name || email.split("@")[0],
        isAdmin: false,
        avatar: "/favicon.ico",
      };
      setUser(appUser);
      return { ok: true };
    }

    return { ok: false, error: "Invalid credentials" };
  };

  const logout = () => setUser(null);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAdmin: Boolean(user?.isAdmin),
    login,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


