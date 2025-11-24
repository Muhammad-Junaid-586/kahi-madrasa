"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PlusCircle } from "lucide-react"; // ← ICON IMPORT
import RegistrationForm from "../RegistrationForm2";

const FormDialog = () => {
  return (
    <div className="flex justify-end items-center h-auto">
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 flex items-center gap-2 text-lg">
            <PlusCircle size={22} className="text-white" />
            طالب علم رجسٹر کریں
          </button>
        </DialogTrigger>

        <DialogContent
          className="max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-lg"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader></DialogHeader>

          <RegistrationForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
