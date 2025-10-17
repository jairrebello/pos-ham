import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend@4.0.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  course_id: string;
  course_title?: string;
  interest: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const resend = new Resend(resendApiKey);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { submissionId } = await req.json();

    if (!submissionId) {
      throw new Error("submissionId is required");
    }

    // Get submission data
    const { data: submission, error: fetchError } = await supabase
      .from("contact_submissions")
      .select(`
        id,
        name,
        email,
        phone,
        course_id,
        interest,
        pos_cursos (title)
      `)
      .eq("id", submissionId)
      .single();

    if (fetchError) throw fetchError;
    if (!submission) throw new Error("Submission not found");

    const courseTitle = submission.pos_cursos?.title || "Curso não especificado";
    const interestLabel = submission.interest === "matricular" ? "Matricular-se" : "Conhecer mais";

    // Send email using Resend with onboarding@resend.dev (for testing without domain)
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["jair.rebello@gmail.com"],
      subject: `Novo contato: ${interestLabel} - ${courseTitle}`,
      html: `
        <h2>Novo contato recebido</h2>
        <p><strong>Nome:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Telefone:</strong> ${submission.phone}</p>
        <p><strong>Curso de interesse:</strong> ${courseTitle}</p>
        <p><strong>Tipo de interesse:</strong> ${interestLabel}</p>
        <hr>
        <p><small>Enviado em ${new Date().toLocaleString("pt-BR")}</small></p>
      `,
    });

    if (emailError) {
      // Update submission with error
      await supabase
        .from("contact_submissions")
        .update({
          email_sent: false,
          email_error: emailError.message,
        })
        .eq("id", submissionId);

      throw emailError;
    }

    // Update submission as sent
    await supabase
      .from("contact_submissions")
      .update({
        email_sent: true,
        email_error: null,
      })
      .eq("id", submissionId);

    return new Response(
      JSON.stringify({
        success: true,
        emailId: emailData?.id,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
