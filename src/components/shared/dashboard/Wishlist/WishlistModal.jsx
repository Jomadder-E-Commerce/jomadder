import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const WishlistModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog className="max-w-[300px] rounded-lg" open={isOpen} onOpenChange={onClose} >
      <DialogContent className="max-w-[300px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Remove product</DialogTitle>
          <DialogDescription>
            Remove product from wishlist
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistModal;
