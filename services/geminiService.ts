
import { GoogleGenAI, Type } from "@google/genai";

// Safely access process.env to prevent ReferenceError in browser environments
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env) ? process.env.API_KEY || "" : "";
  } catch (e) {
    return "";
  }
};

export const getGeminiClient = () => {
  const key = getApiKey();
  if (!key) {
    console.warn("API_KEY is missing. AI features will not work.");
  }
  return new GoogleGenAI({ apiKey: key });
};

export async function findPackageName(appName: string): Promise<string> {
  const ai = getGeminiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Identify the Android package name (application ID) for: "${appName}". Return ONLY the package name (e.g., com.google.android.youtube). If you don't know, return "unknown".`,
      config: {
        temperature: 0.1,
        maxOutputTokens: 50,
      }
    });

    return response.text?.trim() || "unknown";
  } catch (err) {
    console.error("Gemini API error:", err);
    return "unknown";
  }
}

export async function getPopularPackages(): Promise<{ name: string; id: string; iconUrl?: string }[]> {
  const ai = getGeminiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'List 6 very popular Android apps (like WhatsApp, Instagram, YouTube, etc.), their package IDs, and a direct URL to a high-quality square icon for them (e.g., from a CDN or official site).',
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              id: { type: Type.STRING },
              iconUrl: { type: Type.STRING, description: "Direct URL to the app icon image" }
            },
            required: ["name", "id"]
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || "[]");
    return parsed;
  } catch (e) {
    return [
      { name: "WhatsApp", id: "com.whatsapp", iconUrl: "https://img.icons8.com/color/96/000000/whatsapp--v1.png" },
      { name: "YouTube", id: "com.google.android.youtube", iconUrl: "https://img.icons8.com/color/96/000000/youtube-play.png" },
      { name: "Instagram", id: "com.instagram.android", iconUrl: "https://img.icons8.com/color/96/000000/instagram-new--v1.png" },
      { name: "Netflix", id: "com.netflix.mediaclient", iconUrl: "https://img.icons8.com/color/96/000000/netflix.png" },
      { name: "Spotify", id: "com.spotify.music", iconUrl: "https://img.icons8.com/color/96/000000/spotify--v1.png" },
      { name: "TikTok", id: "com.zhiliaoapp.musically", iconUrl: "https://img.icons8.com/color/96/000000/tiktok.png" }
    ];
  }
}
