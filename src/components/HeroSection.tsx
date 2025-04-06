
import React from 'react';
import Model3D from './Model3D';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-4 py-16">
      <div className="container mx-auto flex flex-col items-center">
        <div className="w-full max-w-3xl aspect-square mb-12">
          <Model3D />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
