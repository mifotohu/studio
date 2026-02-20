import React, { useState, useEffect } from 'react';
import { Sparkles, ChefHat } from 'lucide-react';

const messages = [
  "Our digital chef is inspecting your fridge...",
  "Analyzing ingredients for gourmet potential...",
  "Flipping through digital cookbooks...",
  "Perfecting the spice combination...",
  "Sharpening the virtual knives...",
  "Consulting the secret recipe archive...",
  "Almost there! Simmering the flavors...",
  "Thinking like a master chef..."
];

export function ChefLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <ChefHat className="w-16 h-16 text-primary relative animate-bounce" />
        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-pulse" />
      </div>
      <div className="space-y-2">
        <h3 className="font-headline text-2xl font-bold tracking-tight">Mixing up magic...</h3>
        <p className="text-muted-foreground font-medium italic transition-all duration-500">
          {messages[messageIndex]}
        </p>
      </div>
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
      </div>
    </div>
  );
}
