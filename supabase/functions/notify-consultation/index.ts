
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get consultation data from request
    const { data: consultation } = await req.json();
    
    // Send immediate notification email
    const { error: emailError } = await resend.emails.send({
      from: 'Landmark Construction <onboarding@resend.dev>',
      to: ['your-email@example.com'], // Replace with your email in the Supabase Edge Function settings
      subject: 'Free Consultation Request',
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${consultation.first_name} ${consultation.last_name}</p>
        <p><strong>Email:</strong> ${consultation.email}</p>
        <p><strong>Phone:</strong> ${consultation.phone}</p>
        <p><strong>Service:</strong> ${consultation.service}</p>
      `,
    });

    if (emailError) throw emailError;

    // Mark notification as sent
    const { error: updateError } = await supabase
      .from('consultation_requests')
      .update({ notification_sent: true })
      .eq('id', consultation.id);

    if (updateError) throw updateError;

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
