
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { ConsultationFormValues } from '../validation/consultationSchema';

interface ServiceAndTermsProps {
  form: UseFormReturn<ConsultationFormValues>;
}

export function ServiceAndTerms({ form }: ServiceAndTermsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="service"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Interested In</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="home-building">Home Building</SelectItem>
                <SelectItem value="home-elevation">Home Elevation</SelectItem>
                <SelectItem value="interior-design">Interior Design</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="terms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-2 space-y-0 mt-4">
            <FormControl>
              <Checkbox 
                checked={field.value} 
                onCheckedChange={field.onChange} 
                id="terms"
              />
            </FormControl>
            <FormLabel htmlFor="terms" className="text-sm font-normal leading-none pt-1">
              I agree to be contacted about Landmark services
            </FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
