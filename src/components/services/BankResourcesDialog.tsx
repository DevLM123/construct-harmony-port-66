
import React from 'react';
import { Landmark, Building } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type BankResourcesDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const banks = [
  {
    name: "Chase Bank",
    description: "Offers competitive home renovation and construction loans"
  },
  {
    name: "Bank of America",
    description: "Provides flexible home improvement financing options"
  },
  {
    name: "Wells Fargo",
    description: "Specializes in construction and renovation lending"
  },
  {
    name: "US Bank",
    description: "Features customizable home improvement loans"
  }
];

export function BankResourcesDialog({ isOpen, onClose }: BankResourcesDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            <span>Financing Resources</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {banks.map((bank, index) => (
            <div key={bank.name} className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-1">{bank.name}</h3>
              <p className="text-sm text-muted-foreground">{bank.description}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
