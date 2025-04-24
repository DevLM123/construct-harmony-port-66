
import * as z from 'zod';

export const consultationFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }).refine((val) => /^[0-9()\-\s]+$/.test(val), {
    message: "Phone number can only contain digits, spaces, and these characters: () -"
  }),
  service: z.string().min(1, {
    message: "Please select a service.",
  }),
  terms: z.boolean({
    required_error: "You must agree to be contacted",
  }).refine(val => val === true, {
    message: "You must agree to be contacted",
  })
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;
