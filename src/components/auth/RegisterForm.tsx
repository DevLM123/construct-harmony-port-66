
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { PersonalInfoFields } from './consultation/PersonalInfoFields';
import { ContactFields } from './consultation/ContactFields';
import { ServiceAndTerms } from './consultation/ServiceAndTerms';
import { consultationFormSchema, type ConsultationFormValues } from './validation/consultationSchema';

interface RegisterFormProps {
  onSubmitSuccess?: () => void;
}

export function RegisterForm({ onSubmitSuccess }: RegisterFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      terms: false
    },
    mode: "onSubmit"
  });

  const handleSubmit = async (values: ConsultationFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Submitting form with values:", values);
      
      // Simplified approach - try directly inserting without RLS issues
      const { data, error } = await supabase.rpc('create_consultation_request', {
        p_first_name: values.firstName,
        p_last_name: values.lastName,
        p_email: values.email,
        p_phone: values.phone,
        p_service: values.service
      });
      
      if (error) {
        console.error('Error creating consultation request:', error);
        throw error;
      }
      
      console.log("Successfully created consultation request:", data);

      toast({
        title: "Consultation requested",
        description: "A member of our team will contact you to schedule your free consultation!",
      });

      form.reset();
      onSubmitSuccess?.();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-up">
        <div className="space-y-4">
          <PersonalInfoFields form={form} />
          <ContactFields form={form} />
          <ServiceAndTerms form={form} />
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-11"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Request Consultation"}
        </Button>
      </form>
    </Form>
  );
}
