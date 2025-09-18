"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RegistrationForm from "../RegistrationForm";

const FormDialog = () => {
  return (
    <div className="flex justify-center items-center h-auto">
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
            داخلہ فارم کھولیں
          </button>
        </DialogTrigger>

        <DialogContent
          className="max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-lg"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            
          </DialogHeader>

          <RegistrationForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
