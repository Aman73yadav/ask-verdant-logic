import { useState, useRef, useEffect } from "react";
import { streamChat } from "@/lib/streamChat";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    let assistantContent = "";

    const updateAssistantMessage = (content: string) => {
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content } : m
          );
        }
        return [...prev, { role: "assistant", content }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMessage],
        onDelta: (chunk) => {
          assistantContent += chunk;
          updateAssistantMessage(assistantContent);
        },
        onDone: () => {
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Stream error:", error);
          toast.error(error.message || "Failed to get response from AI");
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">AI Assistant</h2>
              <p className="text-muted-foreground">
                Ask me anything! I'm here to help.
              </p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <ChatMessage key={index} role={message.role} content={message.content} />
          ))}
          
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4 bg-background">
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </Card>
    </div>
  );
}
