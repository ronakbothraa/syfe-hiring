import { NextResponse } from "next/server";


const FALLBACK_RATE = 83.5;

export async function GET() {
  try {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ rate: FALLBACK_RATE, source: "fallback" });
    }

    const data = await response.json();

    if (data.result === "success" && data.conversion_rates) {
      return NextResponse.json({
        rate: data.conversion_rates.INR,
        source: "api",
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json({ rate: FALLBACK_RATE, source: "fallback" });
    }
  } catch (error) {
    console.error("Exchange rate fetch error: ", error);
    return NextResponse.json({ rate: FALLBACK_RATE, source: "fallback" });
  }
}
