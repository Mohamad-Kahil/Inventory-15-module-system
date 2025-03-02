import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  t: (key: string) => string;
  toggleLanguage: () => void;
  changeLanguage: (lang: Language) => void;
}

// Default translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    "app.title": "Inventar",
    "app.loading": "Loading...",
    "app.error": "An error occurred",
    "app.save": "Save",
    "app.cancel": "Cancel",
    "app.delete": "Delete",
    "app.edit": "Edit",
    "app.add": "Add",
    "app.search": "Search",
    "app.filter": "Filter",
    "app.sort": "Sort",
    "app.actions": "Actions",
    "app.confirm": "Confirm",
    "app.back": "Back",
    "app.next": "Next",
    "app.submit": "Submit",
    "app.help": "Help",
    "app.version": "Version",
    "app.copyright": "All rights reserved",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.users": "User Management",
    "nav.products": "Product Management",
    "nav.customers": "Customer Management",
    "nav.suppliers": "Supplier Management",
    "nav.purchases": "Purchase Management",
    "nav.inventory": "Inventory Management",
    "nav.sales": "Sales Management",
    "nav.pos": "POS",
    "nav.invoicing": "Invoicing",
    "nav.logistics": "Logistics & Delivery",
    "nav.production": "Production",
    "nav.accounting": "Accounting",
    "nav.analytics": "Analytics & Reports",
    "nav.planning": "Planning",
    "nav.marketing": "Marketing",
    "nav.settings": "Settings",
    "nav.logout": "Logout",
    "nav.help": "Help & Support",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome back",
    "dashboard.overview": "Here's an overview of your system",
    "dashboard.metrics": "Key Metrics",
    "dashboard.charts": "Business Analytics",
    "dashboard.modules": "Quick Access",

    // User Management
    "users.title": "User Management",
    "users.add": "Add User",
    "users.edit": "Edit User",
    "users.delete": "Delete User",
    "users.firstName": "First Name",
    "users.lastName": "Last Name",
    "users.email": "Email",
    "users.phone": "Phone",
    "users.department": "Department",
    "users.role": "Role",
    "users.status": "Status",
    "users.active": "Active",
    "users.inactive": "Inactive",
    "users.password": "Password",
    "users.confirmPassword": "Confirm Password",
    "users.all": "All Users",
    "users.roles": "Roles & Permissions",
    "users.permissions": "User Permissions",

    // Access
    "access.denied": "Access Denied",
    "access.noPermission": "You do not have permission to access this module",
    "access.contactAdmin": "Please contact your administrator for access",

    // Settings
    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.theme": "Theme",
    "settings.notifications": "Notifications",
    "settings.profile": "Profile",
    "settings.security": "Security",

    // Modules
    "modules.users.title": "User Management",
    "modules.users.description": "Manage users, roles and permissions",
    "modules.products.title": "Product Management",
    "modules.products.description": "Manage your product catalog",
    "modules.customers.title": "Customer Management",
    "modules.customers.description": "Manage customer information",
    "modules.suppliers.title": "Supplier Management",
    "modules.suppliers.description": "Manage supplier information",
    "modules.purchases.title": "Purchase Management",
    "modules.purchases.description": "Manage purchase orders",
    "modules.inventory.title": "Inventory Management",
    "modules.inventory.description": "Track and manage inventory",
    "modules.sales.title": "Sales Management",
    "modules.sales.description": "Manage sales orders",
    "modules.pos.title": "Point of Sale",
    "modules.pos.description": "Process sales transactions",

    // User
    "user.myAccount": "My Account",
    "user.profile": "Profile",
    "user.settings": "Settings",
    "user.help": "Help",
    "user.logout": "Logout",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.empty": "No notifications",
    "notifications.markAllRead": "Mark all as read",

    // Theme
    "theme.light": "Switch to Light Mode",
    "theme.dark": "Switch to Dark Mode",

    // Roles
    "roles.administrator": "Administrator",
    "roles.manager": "Manager",
    "roles.user": "User",
    "roles.guest": "Guest",
  },
  ar: {
    // Common
    "app.title": "إنفنتار",
    "app.loading": "جار التحميل...",
    "app.error": "حدث خطأ",
    "app.save": "حفظ",
    "app.cancel": "إلغاء",
    "app.delete": "حذف",
    "app.edit": "تعديل",
    "app.add": "إضافة",
    "app.search": "بحث",
    "app.filter": "تصفية",
    "app.sort": "ترتيب",
    "app.actions": "إجراءات",
    "app.confirm": "تأكيد",
    "app.back": "رجوع",
    "app.next": "التالي",
    "app.submit": "إرسال",
    "app.help": "مساعدة",
    "app.version": "الإصدار",
    "app.copyright": "جميع الحقوق محفوظة",

    // Navigation
    "nav.dashboard": "لوحة المعلومات",
    "nav.users": "إدارة المستخدمين",
    "nav.products": "إدارة المنتجات",
    "nav.customers": "إدارة العملاء",
    "nav.suppliers": "إدارة الموردين",
    "nav.purchases": "إدارة المشتريات",
    "nav.inventory": "إدارة المخزون",
    "nav.sales": "إدارة المبيعات",
    "nav.pos": "نقطة البيع",
    "nav.invoicing": "الفواتير",
    "nav.logistics": "الخدمات اللوجستية والتسليم",
    "nav.production": "الإنتاج",
    "nav.accounting": "المحاسبة",
    "nav.analytics": "التحليلات والتقارير",
    "nav.planning": "التخطيط",
    "nav.marketing": "التسويق",
    "nav.settings": "الإعدادات",
    "nav.logout": "تسجيل الخروج",
    "nav.help": "المساعدة والدعم",

    // Dashboard
    "dashboard.title": "لوحة المعلومات",
    "dashboard.welcome": "مرحبًا بعودتك",
    "dashboard.overview": "إليك نظرة عامة على نظامك",
    "dashboard.metrics": "المقاييس الرئيسية",
    "dashboard.charts": "تحليلات الأعمال",
    "dashboard.modules": "وصول سريع",

    // User Management
    "users.title": "إدارة المستخدمين",
    "users.add": "إضافة مستخدم",
    "users.edit": "تعديل المستخدم",
    "users.delete": "حذف المستخدم",
    "users.firstName": "الاسم الأول",
    "users.lastName": "اسم العائلة",
    "users.email": "البريد الإلكتروني",
    "users.phone": "الهاتف",
    "users.department": "القسم",
    "users.role": "الدور",
    "users.status": "الحالة",
    "users.active": "نشط",
    "users.inactive": "غير نشط",
    "users.password": "كلمة المرور",
    "users.confirmPassword": "تأكيد كلمة المرور",
    "users.all": "جميع المستخدمين",
    "users.roles": "الأدوار والصلاحيات",
    "users.permissions": "صلاحيات المستخدم",

    // Access
    "access.denied": "تم رفض الوصول",
    "access.noPermission": "ليس لديك إذن للوصول إلى هذه الوحدة",
    "access.contactAdmin": "يرجى الاتصال بالمسؤول للحصول على حق الوصول",

    // Settings
    "settings.title": "الإعدادات",
    "settings.language": "اللغة",
    "settings.theme": "السمة",
    "settings.notifications": "الإشعارات",
    "settings.profile": "الملف الشخصي",
    "settings.security": "الأمان",

    // Modules
    "modules.users.title": "إدارة المستخدمين",
    "modules.users.description": "إدارة المستخدمين والأدوار والصلاحيات",
    "modules.products.title": "إدارة المنتجات",
    "modules.products.description": "إدارة كتالوج المنتجات الخاص بك",
    "modules.customers.title": "إدارة العملاء",
    "modules.customers.description": "إدارة معلومات العملاء",
    "modules.suppliers.title": "إدارة الموردين",
    "modules.suppliers.description": "إدارة معلومات الموردين",
    "modules.purchases.title": "إدارة المشتريات",
    "modules.purchases.description": "إدارة أوامر الشراء",
    "modules.inventory.title": "إدارة المخزون",
    "modules.inventory.description": "تتبع وإدارة المخزون",
    "modules.sales.title": "إدارة المبيعات",
    "modules.sales.description": "إدارة أوامر المبيعات",
    "modules.pos.title": "نقطة البيع",
    "modules.pos.description": "معالجة معاملات المبيعات",

    // User
    "user.myAccount": "حسابي",
    "user.profile": "الملف الشخصي",
    "user.settings": "الإعدادات",
    "user.help": "المساعدة",
    "user.logout": "تسجيل الخروج",

    // Notifications
    "notifications.title": "الإشعارات",
    "notifications.empty": "لا توجد إشعارات",
    "notifications.markAllRead": "تعيين الكل كمقروء",

    // Theme
    "theme.light": "التبديل إلى الوضع الفاتح",
    "theme.dark": "التبديل إلى الوضع الداكن",

    // Roles
    "roles.administrator": "مدير النظام",
    "roles.manager": "مدير",
    "roles.user": "مستخدم",
    "roles.guest": "ضيف",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider = ({
  children,
  initialLanguage = "en",
}: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const direction: Direction = language === "ar" ? "rtl" : "ltr";

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;

    // Add appropriate class for RTL/LTR styling
    if (direction === "rtl") {
      document.documentElement.classList.add("rtl");
      document.documentElement.classList.remove("ltr");
    } else {
      document.documentElement.classList.add("ltr");
      document.documentElement.classList.remove("rtl");
    }

    // Save to localStorage
    localStorage.setItem("language", language);
  }, [language, direction]);

  const value = {
    language,
    direction,
    t,
    toggleLanguage,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default useLanguage;
