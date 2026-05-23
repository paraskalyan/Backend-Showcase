import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CommonDialogProps {
  trigger: React.ReactNode;

  title: string;
  description: string;

  confirmText?: string;
  cancelText?: string;

  onConfirm?: () => void;
  onCancel?: () => void;

  children?: React.ReactNode;
  variant? : string;
}

const CommonDialog = ({
  trigger,
  title,
  description,
  confirmText = "Continue",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  children,
  variant,
}: CommonDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {children}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction onClick={onConfirm} className={variant === "destructive" ? "bg-red-600 text-white hover:bg-red-500" : ""}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommonDialog;