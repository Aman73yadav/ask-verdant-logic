import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 px-4 py-6 bg-muted/30 animate-fade-in">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1">
        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
      </div>
    </div>
  );
};
