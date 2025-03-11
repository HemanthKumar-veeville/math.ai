import axios from 'axios';

export interface AIResponse {
video_url: string;
  error?: string;
}

const API_URL = "https://9a25-106-51-243-165.ngrok-free.app/generate_video/";

export const generateVideo = async (prompt: string): Promise<AIResponse> => {
  try {
    const response = await axios.post(
      API_URL,
      { prompt },
      { 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data as AIResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || error.message || "Failed to generate video");
    }
    throw new Error("Failed to generate video");
  }
}; 