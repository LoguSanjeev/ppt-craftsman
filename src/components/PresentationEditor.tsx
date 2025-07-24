import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Trash2, 
  Type, 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Play,
  Download,
  Palette
} from 'lucide-react';
import { toast } from 'sonner';

interface Slide {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
}

const PresentationEditor = () => {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: '1',
      title: 'Welcome to PPT Craftsman',
      content: 'Create beautiful presentations with ease',
      backgroundColor: 'bg-gradient-primary'
    }
  ]);
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [presentationTitle, setPresentationTitle] = useState('My Presentation');

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'New Slide',
      content: 'Add your content here...',
      backgroundColor: 'bg-gradient-card'
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
    toast.success('New slide added!');
  };

  const deleteSlide = (index: number) => {
    if (slides.length === 1) {
      toast.error('Cannot delete the last slide');
      return;
    }
    
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1);
    }
    
    toast.success('Slide deleted');
  };

  const updateSlide = (field: 'title' | 'content', value: string) => {
    const updatedSlides = slides.map((slide, index) => 
      index === currentSlideIndex 
        ? { ...slide, [field]: value }
        : slide
    );
    setSlides(updatedSlides);
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            PPT Craftsman
          </h1>
          <Input
            value={presentationTitle}
            onChange={(e) => setPresentationTitle(e.target.value)}
            className="max-w-xs"
            placeholder="Presentation title"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Present
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Slide Navigator */}
        <aside className="w-64 bg-card border-r border-border p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm text-muted-foreground">SLIDES</h2>
            <Button variant="ghost" size="sm" onClick={addSlide}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {slides.map((slide, index) => (
              <Card
                key={slide.id}
                className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-elegant ${
                  index === currentSlideIndex 
                    ? 'ring-2 ring-primary shadow-glow' 
                    : ''
                }`}
                onClick={() => setCurrentSlideIndex(index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">
                    Slide {index + 1}
                  </span>
                  {slides.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSlide(index);
                      }}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                
                <div className={`${slide.backgroundColor} rounded p-2 mb-2 aspect-video`}>
                  <div className="text-xs text-white font-medium truncate">
                    {slide.title}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground truncate">
                  {slide.content}
                </div>
              </Card>
            ))}
          </div>
        </aside>

        {/* Main Editor */}
        <main className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-card border-b border-border p-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm">
                <Type className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="w-px h-6 bg-border mx-2" />
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm">
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignCenter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="w-px h-6 bg-border mx-2" />
            
            <Button variant="ghost" size="sm">
              <Palette className="w-4 h-4" />
            </Button>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-card shadow-elegant p-8 aspect-[16/9] relative">
                <div className="h-full flex flex-col">
                  <Input
                    value={currentSlide.title}
                    onChange={(e) => updateSlide('title', e.target.value)}
                    className="text-2xl font-bold bg-transparent border-none p-0 mb-6 text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
                    placeholder="Slide title..."
                  />
                  
                  <Textarea
                    value={currentSlide.content}
                    onChange={(e) => updateSlide('content', e.target.value)}
                    className="flex-1 bg-transparent border-none p-0 resize-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
                    placeholder="Add your content here..."
                  />
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PresentationEditor;