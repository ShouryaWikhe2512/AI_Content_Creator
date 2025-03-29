"use client";

import type React from "react";

import { useState } from "react";
import {
  Video,
  Music,
  ImageIcon,
  BarChart2,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

type MenuItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  color?: string;
};

export function Sidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { icon: Video, label: "Video", href: "#" },
    { icon: Music, label: "Music", href: "#" },
    { icon: ImageIcon, label: "Image", href: "#" },
    { icon: BarChart2, label: "Analytics", href: "#" },
    { icon: BookOpen, label: "Learnings", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: LogOut, label: "Logout", href: "#", color: "text-red-500" },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative w-64 rounded-3xl overflow-hidden"
        style={{
          background: "rgba(45, 10, 80, 0.7)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 animate-gradient-shift" />

        {/* Content container */}
        <div className="relative z-10 flex flex-col h-full py-8 px-6">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              My Dashboard
            </h1>
          </div>

          <nav className="flex-1 space-y-2">
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out",
                      activeItem === item.label
                        ? "bg-white/10"
                        : "hover:bg-white/5",
                      item.color || "text-white",
                      hoveredItem === item.label && "translate-x-1 shadow-lg"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveItem(item.label);
                    }}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className="relative">
                      <item.icon
                        className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          hoveredItem === item.label && "scale-110"
                        )}
                      />

                      {/* Animated circle on hover */}
                      {hoveredItem === item.label && (
                        <span className="absolute inset-0 rounded-full bg-white/10 animate-ping-slow opacity-75" />
                      )}
                    </span>

                    <span
                      className={cn(
                        "font-medium transition-all duration-300",
                        hoveredItem === item.label && "font-semibold"
                      )}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
