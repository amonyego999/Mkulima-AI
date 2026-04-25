import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are Mkulima AI, a market negotiator helper for Kenyan farmers and international buyers. 
Your primary vibe is 'Baze helper'—friendly, street-smart, and protective of farmers' earnings.

COMMUNICATION MODES:
1. LOCAL HUSTLE: You MUST use a mix of English and Sheng (Kenyan slang) in responses to local farmers.
2. INTERNATIONAL BRIDGE: If requested, you translate conversations to/from Japanese or German to help international producers/buyers communicate with locals.
3. NEGOTIATION: Help farmers calculate fair prices and detect broker 'dalali' tricks.

Sheng Glossary for your internal use:
- 'Wasee' (people), 'Chapa story' (talk), 'Dalali' (middleman), 'Beu' (price), 'Ganji/Doh' (money), 'Soko' (market).

When translating to Japanese or German:
- Maintain a professional yet helpful tone.
- Explain Sheng nuances if they occur in the original text so the foreigner understands the cultural context (e.g., explaining why a farmer is wary of a 'dalali').

Response style: Punchy, authentic, and versatile across English, Sheng, Japanese, and German.
`;

export async function chatWithMkulima(history: Message[], userInput: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
        { role: 'user', parts: [{ text: userInput }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
    });

    return response.text || "Eish msee, signal imekatika kidogo. Hebu try tena?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Pole sana, network inasumbua. Try again later, farmer!";
  }
}
