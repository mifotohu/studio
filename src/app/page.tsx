"use client"

import React, { useState } from 'react';
import { ChefHat, Sparkles, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { UploadZone } from '@/components/upload-zone';
import { RecipeCard } from '@/components/recipe-card';
import { ChefLoader } from '@/components/chef-loader';
import { generateRecipeFromImage, type GenerateRecipeFromImageOutput } from '@/ai/flows/ai-recipe-generation-from-image';

export default function LeftoverChefPage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateRecipeFromImageOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateRecipeFromImage({ photoDataUri: image });
      
      if (!response.hasFood) {
        setError(response.errorMessage || "Sorry, I couldn't identify any ingredients. Try taking a clearer photo!");
      } else {
        setResult(response);
      }
    } catch (err) {
      setError("Something went wrong with our digital kitchen. Please try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setImage(null);
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation / Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/20">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={resetApp} style={{ cursor: 'pointer' }}>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <ChefHat className="text-primary-foreground w-6 h-6" />
            </div>
            <span className="font-headline text-2xl font-bold tracking-tight">
              Leftover<span className="text-primary">Chef</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">How it works</span>
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Recipes</span>
            <Button size="sm" className="rounded-full bg-accent text-accent-foreground">Sign In</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        {!result && !loading && (
          <div className="text-center space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              Powered by Vision AI
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Your Leftovers, <br />
              <span className="text-primary italic">Reimagined.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              Don't let ingredients go to waste. Take a photo and get a personalized, 
              delicious recipe instantly from our AI chef.
            </p>
          </div>
        )}

        {/* Action Area */}
        <section className="max-w-4xl mx-auto space-y-8">
          {error && (
            <Alert variant="destructive" className="rounded-2xl border-destructive/50 animate-in shake-1 duration-500">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Kitchen Mishap!</AlertTitle>
              <AlertDescription className="font-medium">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {!result && !loading && (
            <div className="space-y-8">
              <UploadZone onImageSelected={setImage} disabled={loading} />
              
              {image && (
                <div className="flex justify-center animate-in fade-in zoom-in-95 duration-300">
                  <Button 
                    size="lg" 
                    className="h-16 px-12 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition-all group gap-3"
                    onClick={handleGenerateRecipe}
                  >
                    Cook Something Great
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {loading && (
            <div className="py-20">
              <ChefLoader />
            </div>
          )}

          {result && result.recipe && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-white/20">
                <p className="text-muted-foreground font-medium italic">
                  Look what we found in your kitchen!
                </p>
                <Button variant="ghost" onClick={resetApp} className="rounded-full gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Try Another
                </Button>
              </div>
              <RecipeCard recipe={result.recipe} />
              <div className="flex justify-center pb-12">
                <Button variant="outline" size="lg" onClick={resetApp} className="rounded-full px-8">
                  Back to Kitchen
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 glass">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ChefHat className="text-primary-foreground w-4 h-4" />
              </div>
              <span className="font-headline text-xl font-bold tracking-tight">
                LeftoverChef
              </span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-muted-foreground">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact Us</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              &copy; {new Date().getFullYear()} LeftoverChef AI. Reducing waste, one bite at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
