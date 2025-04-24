
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const supabaseUrl = 'https://ipncjsbjvdepjsowdhkj.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

// Email address for all notifications
const RECIPIENT_EMAIL = 'Dev@landmarkconstruction.org';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse consultation data from request body
    const consultation = await req.json();
    
    console.log('Received consultation data:', consultation);

    // Send immediate notification email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use the default Resend sender for testing
      to: [RECIPIENT_EMAIL], 
      subject: 'Free Consultation Request',
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${consultation.first_name} ${consultation.last_name}</p>
        <p><strong>Email:</strong> ${consultation.email}</p>
        <p><strong>Phone:</strong> ${consultation.phone}</p>
        <p><strong>Service:</strong> ${consultation.service}</p>
      `,
    });

    if (emailError) {
      console.error('Email sending error:', emailError);
      throw emailError;
    }

    console.log('Email sent successfully:', emailData);

    return new Response(
      JSON.stringify({ message: 'Notification sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
