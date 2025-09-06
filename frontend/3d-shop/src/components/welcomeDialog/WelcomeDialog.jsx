import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../dialog/Dialog';
import { Button } from '../button/Button';

export const WelcomeDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('hasSeenWelcome', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 backdrop-blur-lg border border-gray-200/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold primary-text">
            Willkommen bei Configure3D
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed pt-2">
            Dies ist ein <strong>Demo-Shop</strong> zur Präsentation unserer 3D-Konfigurator-Technologie.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          <p className="text-sm text-muted-foreground">
            ⚠️ <strong>Wichtiger Hinweis:</strong>
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside ml-2">
            <li>Es werden keine echten Produkte verkauft</li>
            <li>Alle eingegebenen Daten werden nicht gespeichert</li>
            <li>Dies dient nur zu Demonstrationszwecken</li>
          </ul>
        </div>

        <DialogFooter>
          <Button onClick={handleClose} className="w-full">
            Verstanden, weiter zum Shop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};