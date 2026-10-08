import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { portfolioApi } from "../services/api";
import initialFallbackData from "../../portfolioData.json";

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(initialFallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await portfolioApi.get();
      if (res.success && res.data) {
        setPortfolio(res.data);
        setError(null);
      }
    } catch (err) {
      console.warn("Could not fetch portfolio from backend, using baseline fallback:", err);
      setError("Using local cache");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const updateSection = async (sectionName, sectionData) => {
    try {
      const res = await portfolioApi.updateSection(sectionName, sectionData);
      if (res.success) {
        setPortfolio((prev) => {
          if (sectionName === "profile" || sectionName === "navigation") {
            return { ...prev, [sectionName]: res.data };
          }
          return {
            ...prev,
            sections: {
              ...prev.sections,
              [sectionName]: res.data,
            },
          };
        });
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message || "Failed to update section" };
    } catch (err) {
      console.error(`Error updating section ${sectionName}:`, err);
      return {
        success: false,
        message: err.response?.data?.message || err.message || "Update failed",
      };
    }
  };

  const updateAll = async (newPortfolioData) => {
    try {
      const res = await portfolioApi.update(newPortfolioData);
      if (res.success && res.data) {
        setPortfolio(res.data);
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message || "Failed to update portfolio" };
    } catch (err) {
      console.error("Error updating portfolio:", err);
      return {
        success: false,
        message: err.response?.data?.message || err.message || "Update failed",
      };
    }
  };

  const resetToDefault = async () => {
    try {
      const res = await portfolioApi.reset();
      if (res.success && res.data) {
        setPortfolio(res.data);
        return { success: true, message: res.message };
      }
      return { success: false, message: "Reset failed" };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Reset failed",
      };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        isLoading,
        error,
        refreshPortfolio: fetchPortfolio,
        updateSection,
        updateAll,
        resetToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
