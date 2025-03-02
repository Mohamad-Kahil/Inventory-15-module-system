import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define types for our contexts
type ThemeType = "light" | "dark";
type LanguageType = "en" | "ar";
type DirectionType = "ltr" | "rtl";

// Theme context type
interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

// Language context type
interface LanguageContextType {
  language: LanguageType;
  direction: DirectionType;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Create contexts with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  direction: "ltr",
  toggleLanguage: () => {},
  t: (key: string) => key,
});

// Translation dictionaries
const translations: Record<LanguageType, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    users: "Users",
    settings: "Settings",
    profile: "Profile",
    logout: "Logout",
    totalRevenue: "Total Revenue",
    activeUsers: "Active Users",
    newOrders: "New Orders",
    conversionRate: "Conversion Rate",
    // Add more translations as needed
  },
  ar: {
    dashboard: "لوحة القيادة",
    users: "المستخدمين",
    settings: "الإعدادات",
    profile: "الملف الشخصي",
    logout: "تسجيل الخروج",
    totalRevenue: "إجمالي الإيرادات",
    activeUsers: "المستخدمين النشطين",
    newOrders: "طلبات جديدة",
    conversionRate: "معدل التحويل",
    // Add more translations as needed
  },
};

interface AppProviderProps {
  children: ReactNode;
  initialTheme?: ThemeType;
  initialLanguage?: LanguageType;
}

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  initialTheme = "light",
  initialLanguage = "en",
}) => {
  // Theme state
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme") as ThemeType;
    return savedTheme || initialTheme;
  });

  // Language state
  const [language, setLanguage] = useState<LanguageType>(() => {
    // Check if language is stored in localStorage
    const savedLanguage = localStorage.getItem("language") as LanguageType;
    return savedLanguage || initialLanguage;
  });

  // Direction is derived from language
  const direction: DirectionType = language === "ar" ? "rtl" : "ltr";

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // Toggle language function
  const toggleLanguage = () => {
    setLanguage((prevLang) => {
      const newLang = prevLang === "en" ? "ar" : "en";
      localStorage.setItem("language", newLang);
      return newLang;
    });
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Apply theme and direction to document
  useEffect(() => {
    // Apply theme class to document
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    // Apply direction to document
    document.documentElement.dir = direction;
    document.documentElement.lang = language;

    // Apply RTL-specific styles if needed
    if (direction === "rtl") {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }, [theme, direction, language]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider
        value={{ language, direction, toggleLanguage, t }}
      >
        {children}
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

// Custom hooks to use the contexts
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within an AppProvider");
  }
  return context;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;
