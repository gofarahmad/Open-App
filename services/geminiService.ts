
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiClient = () => {
  if (!API_KEY) {
    console.error("API_KEY is missing in process.env");
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export async function findPackageName(appName: string): Promise<string> {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Identify the Android package name (application ID) for: "${appName}". Return ONLY the package name (e.g., com.google.android.youtube). If you don't know, return "unknown".`,
    config: {
      temperature: 0.1,
      maxOutputTokens: 50,
    }
  });

  return response.text?.trim() || "unknown";
}

export async function getPopularPackages(): Promise<{ name: string; id: string }[]> {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: 'List 5 very popular Android apps and their package IDs.',
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            id: { type: Type.STRING }
          },
          required: ["name", "id"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    return [
      { name: "WhatsApp", id: "com.whatsapp" },
      { name: "YouTube", id: "com.google.android.youtube" },
      { name: "Instagram", id: "com.instagram.android" }
    ];
  }
}
