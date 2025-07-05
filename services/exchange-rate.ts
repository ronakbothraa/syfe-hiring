"use client";

const FALLBACK_RATE = 83.5;

export const ExchangeRateService = async (): Promise<number> => {
  try {

    const response = await fetch("/api/exchange-rate");

    if (!response.ok) {
      return FALLBACK_RATE;
    }

    const data = await response.json();

    if (data.rate && typeof data.rate === "number") {
      return data.rate;
    } else {
      return FALLBACK_RATE;
    }
  } catch (error) {
    return FALLBACK_RATE;
  }
};
