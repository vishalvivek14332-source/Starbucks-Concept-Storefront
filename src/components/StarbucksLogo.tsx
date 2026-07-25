import React from 'react';

interface StarbucksLogoProps {
  className?: string;
}

export const StarbucksLogo: React.FC<StarbucksLogoProps> = ({ 
  className = "w-10 h-10",
}) => {
  return (
    <div className={`relative rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 drop-shadow-md transition-transform duration-200 group-hover:scale-105 ${className}`}>
      <img 
        src="/starbucklady.jpg" 
        alt="Starbucks Logo"
        className="w-full h-full object-cover rounded-full select-none"
      />
    </div>
  );
};
