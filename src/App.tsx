import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayIcon, Loader2Icon } from "lucide-react";
import { generateVideo } from "@/services/videoService";
import type { AIResponse } from "@/services/videoService";
import VideoPlayer from "@/components/VideoPlayer";

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      setError("Please enter your learning requirement");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const data = await generateVideo(inputText);
      console.log({ data });
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("Video generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  console.log({ response });
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-svh w-full max-w-4xl mx-auto p-6 gap-8 font-sans">
      <div className="relative mt-8 mb-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary/80 via-primary to-primary/80 hover:scale-105 transition-transform duration-300 cursor-default select-none">
          Math
          <span className="inline-block mx-1 animate-pulse">.</span>
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
            AI
          </span>
        </h1>
        <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="w-full space-y-4">
        <div className="relative w-full">
          <label htmlFor="prompt" className="sr-only">
            What would you like to learn today?
          </label>
          <textarea
            id="prompt"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What would you like to learn today?"
            className="w-full min-h-[120px] p-4 rounded-lg border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Learning requirement input"
            aria-describedby={error ? "error-message" : undefined}
            disabled={isLoading}
          />
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="absolute bottom-4 right-4"
            aria-label={isLoading ? "Generating video..." : "Generate video"}
          >
            {isLoading ? (
              <Loader2Icon className="w-5 h-5 animate-spin" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
          </Button>
        </div>

        {error && (
          <div
            id="error-message"
            role="alert"
            className="text-destructive text-sm"
          >
            {error}
          </div>
        )}

        {isLoading && (
          <div role="status" className="text-muted-foreground text-sm">
            Generating your learning video...
          </div>
        )}

        {response?.video_url && (
          <VideoPlayer videoUrl={response.video_url} className="w-full" />
        )}
      </div>
    </main>
  );
}

export default App;
