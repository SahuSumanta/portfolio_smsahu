import React from 'react';
import { Camera, ImagePlus, Sparkles } from 'lucide-react';

// Placeholder structure for photos - user will add their own
const photoPlaceholders = [
  { id: 1, label: 'Moment 1', aspect: 'square' },
  { id: 2, label: 'Moment 2', aspect: 'portrait' },
  { id: 3, label: 'Moment 3', aspect: 'landscape' },
  { id: 4, label: 'Moment 4', aspect: 'square' },
  { id: 5, label: 'Moment 5', aspect: 'portrait' },
  { id: 6, label: 'Moment 6', aspect: 'landscape' },
];

export const CoolMoments = () => {
  return (
    <section id="moments" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
            // GALLERY
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Cool <span className="text-gradient-hud">Moments</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A glimpse into the best moments of my life — coming soon!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4"></div>
        </div>

        {/* Photo Grid - Masonry Style Placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {photoPlaceholders.map((photo, index) => (
            <div
              key={photo.id}
              className={`glass-card rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-500 ${
                photo.aspect === 'portrait' ? 'row-span-2' : ''
              } ${photo.aspect === 'landscape' ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <div
                className={`relative flex items-center justify-center bg-gradient-to-br from-secondary/50 to-secondary/30 ${
                  photo.aspect === 'portrait'
                    ? 'h-80 lg:h-96'
                    : photo.aspect === 'landscape'
                    ? 'h-48'
                    : 'h-48 lg:h-64'
                }`}
              >
                {/* Placeholder Content */}
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ImagePlus className="w-8 h-8 text-primary/50" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {photo.label}
                  </p>
                  <p className="text-xs text-muted-foreground/50 mt-1">
                    Photo coming soon
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">Memory #{photo.id}</span>
                    </div>
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Note */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 glass-card px-6 py-4 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Camera className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Photos Coming Soon</p>
              <p className="text-xs text-muted-foreground">Best moments will be added here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoolMoments;
