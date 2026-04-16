import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Resend } from "resend";

// Folosește variabile de mediu
const apiKey = process.env.PAGESPEED_API_KEY;
const SHEET_NAME = "Sheet1";
const SHEET_ID = "100SwBN-fqrpbUcpAiS8fRuA5BVDHeKWy7MgMpkF1Kjk";

// Inițializează Resend
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendAuditEmail(
  email: string,
  website: string,
  scores: any,
  average: number,
  priority: string,
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "NewBotic <audit@newbotic.co.uk>",
      to: [email],
      subject: `Your Website Audit Report for ${website}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">🔍 Your Website Audit Report</h2>
          <p>Hi there,</p>
          <p>Thank you for requesting a free website audit from <strong>NewBotic</strong>!</p>
          <p>Here's what we found for <strong>${website}</strong>:</p>
          
          <div style="background: #f8f8fc; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #1e3a5f; margin-top: 0;">📊 Overall Score: ${average}/100</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td>⚡ Performance:</td><td><strong>${scores.performance}/100</strong></td></tr>
              <tr><td>🔍 SEO:</td><td><strong>${scores.seo}/100</strong></td></tr>
              <tr><td>♿ Accessibility:</td><td><strong>${scores.accessibility}/100</strong></td></tr>
              <tr><td>✅ Best Practices:</td><td><strong>${scores.bestPractices}/100</strong></td></tr>
            </table>
            <p style="margin-top: 10px;"><strong>Priority:</strong> ${priority}</p>
          </div>
          
          <div style="background: #1e3a5f; color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 30px 0;">
            <h3 style="color: white; margin-top: 0;">Want to fix these issues?</h3>
            <p>Book a free strategy call with us:</p>
            <a href="https://calendly.com/hello-newbotic/30min" style="background: white; color: #1e3a5f; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block;">Book Free Call →</a>
          </div>
          
          <p>Best regards,<br>Adi @ NewBotic<br>newbotic.co.uk</p>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Resend error:", error);
    } else {
      console.log("✅ Email sent to:", email, "ID:", data?.id);
    }
  } catch (error) {
    console.error("❌ Email error:", error);
  }
}

async function appendToSheet(data: any) {
  console.log("📊 appendToSheet called");
  console.log("🔑 GOOGLE_CLIENT_EMAIL exists:", !!process.env.GOOGLE_CLIENT_EMAIL);
  console.log("🔑 GOOGLE_PRIVATE_KEY exists:", !!process.env.GOOGLE_PRIVATE_KEY);
  
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.error("❌ Missing Google credentials in environment");
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:J`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            data.timestamp,
            data.website,
            data.email,
            data.strategy,
            data.scores.performance,
            data.scores.seo,
            data.scores.accessibility,
            data.scores.bestPractices,
            data.average,
            data.priority,
          ],
        ],
      },
    });

    console.log("✅ Saved to Google Sheets");
  } catch (error) {
    console.error("❌ Google Sheets error:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
  }
}

export async function POST(request: NextRequest) {
  console.log("🚀 API /api/audit called");
  
  try {
    const body = await request.json();
    const { website, email } = body;

    if (!website) {
      return NextResponse.json(
        { error: "Website URL is required" },
        { status: 400 },
      );
    }

    console.log("🔍 Running audit for:", website);
    console.log("🔑 PAGESPEED_API_KEY exists:", !!apiKey);
    console.log("📧 RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 },
      );
    }

    const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(website)}&key=${apiKey}&strategy=desktop&category=performance&category=seo&category=accessibility&category=best-practices`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("❌ PageSpeed API error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    if (!data.lighthouseResult?.categories) {
      console.error("❌ No lighthouseResult categories");
      return NextResponse.json(
        { error: "Could not complete audit" },
        { status: 500 },
      );
    }

    const categories = data.lighthouseResult.categories;

    const scores = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round(
        (categories["best-practices"]?.score || 0) * 100,
      ),
    };

    const average = Math.round(
      (scores.performance +
        scores.seo +
        scores.accessibility +
        scores.bestPractices) /
        4,
    );

    let priority = "Low";
    if (average < 50) priority = "High";
    else if (average < 75) priority = "Medium";

    const result = {
      website,
      email: email || "not provided",
      strategy: "desktop",
      scores,
      average,
      priority,
      timestamp: new Date().toISOString(),
    };

    // Salvează în Google Sheets
    appendToSheet(result).catch(console.error);

    // Trimite email cu raportul
    if (email) {
      sendAuditEmail(email, website, scores, average, priority).catch(console.error);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ AUDIT ERROR:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}