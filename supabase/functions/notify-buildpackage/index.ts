import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend("re_EeqqA9wq_N3oDz1wCyK5T2gNbAX4RF5Xa");
const supabaseUrl = "https://ipncjsbjvdepjsowdhkj.supabase.co";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SENDER_EMAIL = "onboarding@resend.dev";
const RECIPIENT_EMAIL = "dev@landmarkconstruction.org";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { build_package, special_notes } = await req.json();

    const html = `
      <h2>New Build Package Request</h2>
      <p><strong>Special Notes:</strong> ${special_notes || "N/A"}</p>
      <pre>${JSON.stringify(build_package, null, 2)}</pre>
    `;

    const { error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [RECIPIENT_EMAIL],
      subject: "New Build Package Submission",
      html,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ message: "Email sent" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error sending build package email:", err);
    return new Response(
      JSON.stringify({ message: "Failed to send email", error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
