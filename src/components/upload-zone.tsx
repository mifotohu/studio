"use client"

import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onImageSelected: (dataUri: string) => void;
  disabled?: boolean;
}

export function UploadZone({ onImageSelected, disabled }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      setPreview(dataUri);
      onImageSelected(dataUri);
    };
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile, disabled]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const clearPreview = () => {
    setPreview(null);
    onImageSelected('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {!preview ? (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={cn(
            "relative group cursor-pointer border-2 border-dashed rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-6",
            isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            accept="image/*"
            className="hidden"
            disabled={disabled}
          />
          
          <div className="p-6 bg-white dark:bg-zinc-800 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
            <ImageIcon className="w-12 h-12 text-primary" />
          </div>

          <div className="space-y-2">
            <h3 className="font-headline text-2xl font-bold tracking-tight">Upload Your Leftovers</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Drag & drop ingredients or snap a photo of your fridge to see the magic happen.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="rounded-full gap-2 px-6">
              <Upload className="w-4 h-4" />
              Upload Photo
            </Button>
            <Button className="rounded-full gap-2 px-6 bg-accent text-accent-foreground hover:bg-accent/90">
              <Camera className="w-4 h-4" />
              Take Photo
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
          <img src={preview} alt="Ingredient preview" className="w-full h-80 object-cover" />
          <div className="absolute inset-0 bg-black/20" />
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-4 right-4 rounded-full shadow-lg"
            onClick={clearPreview}
            disabled={disabled}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="absolute bottom-6 left-6 right-6 flex justify-center">
            <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-6 py-3 rounded-full shadow-xl border border-white/20">
              <p className="font-medium text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Image ready for processing
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
