// @ts-nocheck
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Send, ChevronRight, ArrowLeft } from "lucide-react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Type definitions for component props
type ComponentProps = {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
};

// Dashboard style components
const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-[#14112d] min-h-screen border-r border-white/10">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image src="/Logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold text-white">
            Alpha<span className="text-purple-400">Gen</span>
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-2">
          <Link
            href="/Dashboard"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-purple-500/20 hover:text-white transition-all"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
            </div>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/analytics-chatbot"
            className="flex items-center gap-3 p-3 rounded-lg bg-purple-600 text-white transition-all"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span>Analytics Chatbot</span>
          </Link>

          <Link
            href="/analytics-report"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-purple-500/20 hover:text-white transition-all"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
            </div>
            <span>Analytics Report</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

// Message interfaces
interface Message {
  role: "user" | "assistant";
  content: string;
}

const YouTubeAnalyticsChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your YouTube Analytics assistant. How can I help you with your YouTube channel today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      // Make API request to your analytics endpoint
      const response = await fetch(
        "http://localhost:8000/analytics/chatbot-query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: userMessage,
            analysis_type: "youtube_analytics",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response from the API");
      }

      const data = await response.json();

      // Add AI response to chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I encountered an error while processing your request. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-[#0c0a1d] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#14112d]/60 backdrop-blur-md border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="md:hidden text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-bold">YouTube Analytics Chatbot</h1>
            </div>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-[#14112d] border border-purple-500/30"
                  }`}
                >
                  {message.role === "assistant" ? (
                    // @ts-ignore
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // @ts-ignore
                          code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) {
                            const match = /language-(\w+)/.exec(
                              className || ""
                            );
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={atomDark}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            ) : (
                              <code
                                className={`${className} bg-gray-800 rounded px-1 py-0.5`}
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },
                          ul({ node, children, ...props }) {
                            return (
                              <ul
                                className="list-disc pl-6 space-y-1 my-2"
                                {...props}
                              >
                                {children}
                              </ul>
                            );
                          },
                          ol({ node, children, ...props }) {
                            return (
                              <ol
                                className="list-decimal pl-6 space-y-1 my-2"
                                {...props}
                              >
                                {children}
                              </ol>
                            );
                          },
                          li({ node, children, ...props }) {
                            return (
                              <li className="my-0.5" {...props}>
                                {children}
                              </li>
                            );
                          },
                          p({ node, children, ...props }) {
                            return (
                              <p className="mb-2" {...props}>
                                {children}
                              </p>
                            );
                          },
                          h1({ node, children, ...props }) {
                            return (
                              <h1 className="text-xl font-bold my-3" {...props}>
                                {children}
                              </h1>
                            );
                          },
                          h2({ node, children, ...props }) {
                            return (
                              <h2 className="text-lg font-bold my-2" {...props}>
                                {children}
                              </h2>
                            );
                          },
                          h3({ node, children, ...props }) {
                            return (
                              <h3
                                className="text-base font-bold my-2"
                                {...props}
                              >
                                {children}
                              </h3>
                            );
                          },
                          a({ node, children, ...props }) {
                            return (
                              <a
                                className="text-purple-400 hover:underline"
                                {...props}
                              >
                                {children}
                              </a>
                            );
                          },
                          blockquote({ node, children, ...props }) {
                            return (
                              <blockquote
                                className="border-l-4 border-purple-500 pl-4 italic my-3"
                                {...props}
                              >
                                {children}
                              </blockquote>
                            );
                          },
                          strong({ node, children, ...props }) {
                            return (
                              <strong className="font-bold" {...props}>
                                {children}
                              </strong>
                            );
                          },
                          em({ node, children, ...props }) {
                            return (
                              <em className="italic" {...props}>
                                {children}
                              </em>
                            );
                          },
                          table({ node, children, ...props }) {
                            return (
                              <div className="overflow-x-auto my-4">
                                <table
                                  className="min-w-full border border-purple-500/30 rounded-lg"
                                  {...props}
                                >
                                  {children}
                                </table>
                              </div>
                            );
                          },
                          thead({ node, children, ...props }) {
                            return (
                              <thead className="bg-purple-500/20" {...props}>
                                {children}
                              </thead>
                            );
                          },
                          tr({ node, children, ...props }) {
                            return (
                              <tr
                                className="border-b border-purple-500/30"
                                {...props}
                              >
                                {children}
                              </tr>
                            );
                          },
                          th({ node, children, ...props }) {
                            return (
                              <th
                                className="px-4 py-2 text-left font-semibold"
                                {...props}
                              >
                                {children}
                              </th>
                            );
                          },
                          td({ node, children, ...props }) {
                            return (
                              <td className="px-4 py-2" {...props}>
                                {children}
                              </td>
                            );
                          },
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#14112d] rounded-lg p-4 border border-purple-500/30 flex items-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  <span>Processing your request...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-[#14112d]/60 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about your YouTube analytics..."
                className="w-full py-3 px-4 pr-12 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all min-h-[50px] max-h-[150px]"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Press Enter to send, Shift+Enter for a new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeAnalyticsChatbot;
