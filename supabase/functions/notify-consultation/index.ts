
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

    try {
      // Send immediate notification email with careful error handling
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'onboarding@resend.dev',
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
        
        // Update the database to note the notification attempt
        await supabase
          .from('consultation_requests')
          .update({ 
            notification_sent: false,
            notification_error: JSON.stringify(emailError)
          })
          .eq('email', consultation.email)
          .eq('phone', consultation.phone);
          
        return new Response(
          JSON.stringify({ 
            message: 'Consultation saved but email notification failed',
            details: emailError,
            note: "To use Resend's free tier with the default sender, verify your email at Resend.com"
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Email sent successfully:', emailData);
      
      // Update the database to note successful notification
      await supabase
        .from('consultation_requests')
        .update({ notification_sent: true })
        .eq('email', consultation.email)
        .eq('phone', consultation.phone);

      return new Response(
        JSON.stringify({ message: 'Notification sent successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (emailSendingError) {
      console.error('Email exception:', emailSendingError);
      
      return new Response(
        JSON.stringify({ 
          message: 'Email sending exception occurred', 
          error: emailSendingError.message,
          note: "Resend's free tier requires email domain verification for custom senders"
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('General error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
