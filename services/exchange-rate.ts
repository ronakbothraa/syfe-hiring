"use client";

const API_KEY = "38eae6e4c2d45e37a25acb31";
const FALLBACK_RATE = 83.5;

export const ExchangeRateService = async (): Promise<number> => {
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.result === "success" && data.conversion_rate) {
    return data.conversion_rates.INR;
  } else {
    return FALLBACK_RATE;
  }
};
