
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ConsultationFormValues } from '../validation/consultationSchema';

interface PersonalInfoFieldsProps {
  form: UseFormReturn<ConsultationFormValues>;
}

export function PersonalInfoFields({ form }: PersonalInfoFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input
                placeholder="John"
                className="h-11"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Doe"
                className="h-11"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
