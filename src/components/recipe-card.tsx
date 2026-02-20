import React from 'react';
import { CheckCircle2, ListOrdered, Lightbulb, Clock, Utensils } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface RecipeCardProps {
  recipe: {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    tips?: string[];
  };
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="glass shadow-2xl border-white/20 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
      <CardHeader className="space-y-4 pb-8 border-b border-white/10 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/10 px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">
              Séf Ajánlata
            </Badge>
            <CardTitle className="font-headline text-4xl font-bold tracking-tight text-foreground">
              {recipe.title}
            </CardTitle>
          </div>
          <div className="p-4 bg-accent/20 rounded-2xl">
            <Utensils className="w-8 h-8 text-accent" />
          </div>
        </div>
        <CardDescription className="text-lg text-foreground/80 leading-relaxed italic">
          "{recipe.description}"
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8 space-y-12">
        {/* Ingredients Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-headline text-2xl font-bold">Hozzávalók</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipe.ingredients.map((ingredient, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20">
                <span className="w-2 h-2 bg-accent rounded-full shrink-0" />
                <span className="font-medium text-foreground/90">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Instructions Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <ListOrdered className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-headline text-2xl font-bold">Lépésről lépésre</h3>
          </div>
          <div className="space-y-8 relative">
            {recipe.instructions.map((step, idx) => (
              <div key={idx} className="flex gap-6 relative group">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg z-10 group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  {idx !== recipe.instructions.length - 1 && (
                    <div className="w-0.5 h-full bg-primary/20 absolute top-10" />
                  )}
                </div>
                <div className="pt-1.5 pb-4">
                  <p className="text-lg leading-relaxed text-foreground/90 font-medium">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {recipe.tips && recipe.tips.length > 0 && (
          <>
            <Separator className="bg-white/10" />
            {/* Tips Section */}
            <div className="space-y-6 bg-accent/5 p-8 rounded-3xl border border-accent/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-headline text-2xl font-bold">A Séf Titkai</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recipe.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-foreground/80 leading-relaxed italic font-medium">
                    <span className="text-accent">✦</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
