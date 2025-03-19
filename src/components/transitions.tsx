
import React from 'react';
import { cn } from '@/lib/utils';

interface FadeProps {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export const Fade: React.FC<FadeProps> = ({ 
  show, 
  children, 
  className,
  duration = 300
}) => {
  const [render, setRender] = React.useState(show);

  React.useEffect(() => {
    if (show) setRender(true);
    
    const timer = setTimeout(() => {
      if (!show) setRender(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [show, duration]);

  if (!render) return null;

  return (
    <div
      className={cn(
        "transition-opacity duration-300 ease-in-out",
        show ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
};

interface SlideProps {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export const Slide: React.FC<SlideProps> = ({
  show,
  children,
  className,
  direction = 'up',
  duration = 300
}) => {
  const [render, setRender] = React.useState(show);

  React.useEffect(() => {
    if (show) setRender(true);
    
    const timer = setTimeout(() => {
      if (!show) setRender(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [show, duration]);

  if (!render) return null;

  const getTransform = () => {
    if (!show) {
      switch (direction) {
        case 'up': return 'translate3d(0, 20px, 0)';
        case 'down': return 'translate3d(0, -20px, 0)';
        case 'left': return 'translate3d(20px, 0, 0)';
        case 'right': return 'translate3d(-20px, 0, 0)';
        default: return 'translate3d(0, 0, 0)';
      }
    }
    return 'translate3d(0, 0, 0)';
  };

  return (
    <div
      className={cn(
        "transition-all ease-in-out",
        show ? "opacity-100" : "opacity-0",
        className
      )}
      style={{ 
        transform: getTransform(),
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};

interface ScaleProps {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export const Scale: React.FC<ScaleProps> = ({
  show,
  children,
  className,
  duration = 300
}) => {
  const [render, setRender] = React.useState(show);

  React.useEffect(() => {
    if (show) setRender(true);
    
    const timer = setTimeout(() => {
      if (!show) setRender(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [show, duration]);

  if (!render) return null;

  return (
    <div
      className={cn(
        "transition-all ease-in-out",
        show ? "opacity-100 scale-100" : "opacity-0 scale-95",
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};
