
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ConsultationFormValues } from '../validation/consultationSchema';

interface ContactFieldsProps {
  form: UseFormReturn<ConsultationFormValues>;
}

export function ContactFields({ form }: ContactFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="name@example.com"
                type="email"
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
        name="phone"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input
                placeholder="(123) 456-7890"
                type="tel"
                className="h-11"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
