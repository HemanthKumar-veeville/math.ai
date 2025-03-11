import { useState } from "react";
import ReactPlayer from "react-player";
import { generateVideo, AIResponse } from "../services/videoService";

export const VideoGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  console.log({ result });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateVideo(prompt);
      console.group("Video Generation API Response");
      console.log("Status: Success");
      console.log("Timestamp:", new Date().toISOString());
      console.log("Prompt:", prompt);
      console.log("Response Data:", response);
      console.groupEnd();
      setResult(response);
    } catch (err) {
      console.group("Video Generation API Error");
      console.error("Status: Failed");
      console.error("Timestamp:", new Date().toISOString());
      console.error("Prompt:", prompt);
      console.error("Error:", err);
      console.groupEnd();
      setError("Failed to generate video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="prompt"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter your video prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={handlePromptChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Describe the video you want to generate..."
            required
            aria-label="Video generation prompt"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isLoading ? "Generating video..." : "Generate video"}
        >
          {isLoading ? "Generating..." : "Generate Video"}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result?.video_url && (
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <ReactPlayer
            url={result.video_url}
            width="100%"
            height="100%"
            controls
            playing={false}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
};
