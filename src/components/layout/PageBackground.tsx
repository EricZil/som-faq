interface PageBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageBackground({ children, className = '' }: PageBackgroundProps) {
  return (
    <div className={`min-h-screen bg-cover bg-center bg-fixed bg-no-repeat ${className}`} style={{backgroundImage: 'url(/bg.svg)'}}>
      <div className="min-h-screen">
        {children}
      </div>
    </div>
  );
}