
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function ExportButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) {
        throw new Error('No user email found');
      }

      const { data, error } = await supabase.functions.invoke('export-consultations', {
        body: { email: user.email },
      });

      if (error) throw error;

      toast({
        title: "Export Successful",
        description: "Check your email for the consultation requests export.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was a problem exporting the consultation requests.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isLoading}
      className="w-full sm:w-auto"
    >
      {isLoading ? "Exporting..." : "Export to Excel"}
    </Button>
  );
}
