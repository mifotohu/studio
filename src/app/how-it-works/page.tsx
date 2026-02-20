
"use client"

import React, { useState, useEffect } from 'react';
import { ChefHat, Camera, Cpu, Utensils, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HowItWorksPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass border-b border-white/20">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <ChefHat className="text-primary-foreground w-6 h-6" />
            </div>
            <span className="font-headline text-2xl font-bold tracking-tight">
              Maradék<span className="text-primary">Séf</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-12 max-w-4xl">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Hogyan működik a <span className="text-primary italic">MaradékSéf</span>?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Küldetésünk az élelmiszerpazarlás csökkentése a technológia és a kreativitás segítségével.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl space-y-4 border-white/20 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                <Camera className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">1. Fotózzon</h3>
              <p className="text-muted-foreground">
                Készítsen egy fényképet a hűtője tartalmáról vagy a pulton maradt alapanyagokról. Akár több hozzávalót is a képre tehet egyszerre.
              </p>
            </div>

            <div className="glass p-8 rounded-3xl space-y-4 border-white/20 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
                <Cpu className="text-accent w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">2. AI Elemzés</h3>
              <p className="text-muted-foreground">
                Fejlett látás-alapú mesterséges intelligenciánk felismeri az alapanyagokat és keresi a legjobb párosításokat a digitális recepttárában.
              </p>
            </div>

            <div className="glass p-8 rounded-3xl space-y-4 border-white/20 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                <Utensils className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">3. Főzzön jót</h3>
              <p className="text-muted-foreground">
                Másodpercek alatt kap egy teljes receptet, pontos utasításokkal és profi tippekkel. Nincs több gondolkodás a vacsorán!
              </p>
            </div>
          </div>

          <div className="glass p-10 rounded-[2rem] border-white/20 space-y-6">
            <h2 className="text-3xl font-bold font-headline">Hogyan töltsek fel képet?</h2>
            <div className="space-y-4 text-lg">
              <p>A főoldalon található feltöltési zónában két lehetősége van:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><span className="font-bold text-foreground">Kép kiválasztása:</span> Kattintson a feltöltés ikonra a számítógépén vagy telefonján lévő galéria megnyitásához.</li>
                <li><span className="font-bold text-foreground">Fotó készítése:</span> Mobileszközön közvetlenül a kamerájával is készíthet képet a hűtőről.</li>
                <li><span className="font-bold text-foreground">Behúzás:</span> Asztali gépen egyszerűen húzza rá a képfájlt a szaggatott vonalú területre.</li>
              </ul>
              <p className="pt-4 italic text-sm text-muted-foreground">
                Tipp: A legjobb eredmény érdekében ügyeljen a jó megvilágításra, és arra, hogy az alapanyagok jól láthatóak legyenek a képen.
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <Link href="/">
              <Button size="lg" className="rounded-full gap-2 px-8 h-14 text-lg font-bold">
                <ArrowLeft className="w-5 h-5" />
                Vissza a főoldalra
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/10 glass mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MaradékSéf AI. Minden jog fenntartva.
          </p>
        </div>
      </footer>
    </div>
  );
}
