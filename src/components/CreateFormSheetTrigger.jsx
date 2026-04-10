import { SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CreateFormSheetTrigger({ text }) {
  return (
    <SheetTrigger asChild>
      <Button
        className="w-full sm:w-auto bg-maroon hover:bg-maroon-dark text-white"
      >
        <Plus className="w-4 h-4 mr-1" />
        {text}
      </Button>
    </SheetTrigger>
  );
}