
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import * as XLSX from 'npm:xlsx@0.18.5';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = 'https://ipncjsbjvdepjsowdhkj.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const resend = new Resend('re_EeqqA9wq_N3oDz1wCyK5T2gNbAX4RF5Xa');

// Email configuration
const SENDER_EMAIL = 'onboarding@resend.dev';
const RECIPIENT_EMAIL = 'dev@landmarkconstruction.org';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Fetch consultation requests
    const { data: consultations, error } = await supabase
      .from('consultation_requests')
      .select('*')
      .eq('exported_in_daily', false)
      .gte('created_at', new Date(new Date().setHours(0,0,0,0)).toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;

    // If no new consultations, don't send email
    if (!consultations || consultations.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No new consultation requests to export' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${consultations.length} consultations to export`);

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(consultations);
    XLSX.utils.book_append_sheet(wb, ws, "Consultation Requests");

    // Convert to buffer
    const excelBuffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    const base64Excel = btoa(String.fromCharCode(...new Uint8Array(excelBuffer)));

    // Send email with attachment
    const { data, error: emailError } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [RECIPIENT_EMAIL],
      subject: 'Daily Consultation Requests Export',
      html: '<p>Please find attached the daily consultation requests export.</p>',
      attachments: [{
        filename: 'consultation-requests.xlsx',
        content: base64Excel,
      }],
    });

    if (emailError) {
      console.error('Email sending error:', emailError);
      throw emailError;
    }

    console.log('Export email sent successfully:', data);

    // After sending the email, mark records as exported
    if (consultations && consultations.length > 0) {
      const { error: updateError } = await supabase
        .from('consultation_requests')
        .update({ exported_in_daily: true })
        .in('id', consultations.map(c => c.id));
      
      if (updateError) {
        console.error('Error marking consultations as exported:', updateError);
      }
    }

    return new Response(
      JSON.stringify({ message: 'Export sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
