import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const apiKey = process.env.API_KEY;
let chatSession: Chat | null = null;

const getClient = (): GoogleGenAI => {
  if (!apiKey) {
    console.error("API Key is missing");
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = getClient();
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    }
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I didn't catch that. Could you please rephrase?";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having a little trouble connecting to the wedding planner right now. Please try again in a moment.";
  }
};