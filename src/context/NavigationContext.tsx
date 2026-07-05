import React, { createContext, useContext, useState, useEffect } from "react";

export type PageType = "home" | "about" | "services" | "blog" | "faq" | "contact" | "frameworks";

interface NavigationContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  activeBlogPostId: string | null;
  setActiveBlogPostId: (id: string | null) => void;
  isDatabaseModalOpen: boolean;
  setIsDatabaseModalOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDatabaseModalOpen, setIsDatabaseModalOpen] = useState(false);
  const [currentPage, setCurrentPageState] = useState<PageType>(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, "");
    if (path.startsWith("blog")) return "blog";
    if (path === "service") return "services";
    const validPages: PageType[] = ["home", "about", "services", "blog", "faq", "contact", "frameworks"];
    if (validPages.includes(path as PageType)) {
      return path as PageType;
    }
    return "home";
  });

  const [activeBlogPostId, setActiveBlogPostIdState] = useState<string | null>(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, "");
    if (path.startsWith("blog/")) {
      return path.substring(5);
    }
    return null;
  });

  const setCurrentPage = (page: PageType) => {
    setCurrentPageState(page);
    setActiveBlogPostIdState(null);
    const path = page === "home" ? "/" : `/${page}`;
    window.history.pushState({ page, activeBlogPostId: null }, "", path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setActiveBlogPostId = (id: string | null) => {
    setActiveBlogPostIdState(id);
    if (id) {
      setCurrentPageState("blog");
      window.history.pushState({ page: "blog", activeBlogPostId: id }, "", `/blog/${id}`);
    } else {
      window.history.pushState({ page: "blog", activeBlogPostId: null }, "", "/blog");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, "");
      if (path.startsWith("blog")) {
        setCurrentPageState("blog");
        const parts = path.split("/");
        if (parts.length > 1 && parts[1]) {
          setActiveBlogPostIdState(parts[1]);
        } else {
          setActiveBlogPostIdState(null);
        }
        return;
      }
      if (path === "service") {
        setCurrentPageState("services");
        setActiveBlogPostIdState(null);
        return;
      }
      const validPages: PageType[] = ["home", "about", "services", "blog", "faq", "contact", "frameworks"];
      if (validPages.includes(path as PageType)) {
        setCurrentPageState(path as PageType);
        setActiveBlogPostIdState(null);
      } else if (!path || path === "") {
        setCurrentPageState("home");
        setActiveBlogPostIdState(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage, activeBlogPostId, setActiveBlogPostId, isDatabaseModalOpen, setIsDatabaseModalOpen }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
