import React from 'react';
import { X } from 'lucide-react';

export function Dialog({ children, open, onOpenChange }) {
  if (!open) return null;
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onOpenChange) {
      onOpenChange(false);
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {children}
    </div>
  );
}

export function DialogContent({ children, className = '', ...props }) {
  return (
    <div 
      className={`rounded-lg border shadow-lg max-w-lg w-full mx-4 p-6 animate-in fade-in-0 zoom-in-95 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ className = '', ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />
  );
}

export function DialogTitle({ className = '', ...props }) {
  return (
    <h3 
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props} 
    />
  );
}

export function DialogDescription({ className = '', ...props }) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props} />
  );
}

export function DialogFooter({ className = '', ...props }) {
  return (
    <div 
      className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
      {...props} 
    />
  );
}

export function DialogClose({ className = '', onClick, ...props }) {
  return (
    <button
      className={`absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground ${className}`}
      onClick={onClick}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Schließen</span>
    </button>
  );
}