import { X, Minus, Plus } from 'lucide-react';
import { Button } from '../button/Button';

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) {
  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-md h-full bg-background shadow-lg p-6 flex flex-col animate-in slide-in-from-right">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Warenkorb</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">Ihr Warenkorb ist leer</p>
            <p className="text-muted-foreground mt-1">Fügen Sie Produkte hinzu, um zu beginnen</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto -mx-6 px-6">
              {items.map((item) => (
                <div key={item.id} className="flex py-4 border-b">
                  <div className="w-16 h-16 rounded bg-muted flex items-center justify-center mr-4">
                    <span className="text-muted-foreground text-xs">{item.name.substring(0, 2)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <Button variant="ghost" size="sm" onClick={() => onRemoveItem(item.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.color}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity || 1}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="font-medium">€{item.price * (item.quantity || 1)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-4 space-y-4">
              <div className="flex justify-between font-medium">
                <span>Gesamtsumme</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <Button className="w-full">Zur Kasse</Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Weiter einkaufen
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { ShoppingCart } from 'lucide-react';