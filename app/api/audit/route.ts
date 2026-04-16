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
    console.log("📧 Attempting to send email to:", email);
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
  console.log("📊 ========== appendToSheet START ==========");
  console.log("📊 Timestamp:", new Date().toISOString());
  
  // 1. Verifică variabilele de mediu
  console.log("🔑 GOOGLE_CLIENT_EMAIL exists:", !!process.env.GOOGLE_CLIENT_EMAIL);
  console.log("🔑 GOOGLE_CLIENT_EMAIL value:", process.env.GOOGLE_CLIENT_EMAIL ? process.env.GOOGLE_CLIENT_EMAIL.substring(0, 30) + "..." : "MISSING");
  console.log("🔑 GOOGLE_PRIVATE_KEY exists:", !!process.env.GOOGLE_PRIVATE_KEY);
  console.log("🔑 GOOGLE_PRIVATE_KEY length:", process.env.GOOGLE_PRIVATE_KEY?.length || 0);
  console.log("🔑 GOOGLE_PRIVATE_KEY starts with:", process.env.GOOGLE_PRIVATE_KEY?.substring(0, 30) || "MISSING");
  console.log("🔑 GOOGLE_PRIVATE_KEY contains BEGIN:", process.env.GOOGLE_PRIVATE_KEY?.includes("BEGIN") || false);
  console.log("🔑 GOOGLE_PRIVATE_KEY contains END:", process.env.GOOGLE_PRIVATE_KEY?.includes("END") || false);
  
  // 2. Verifică toate variabilele de mediu disponibile
  const allEnvKeys = Object.keys(process.env);
  const relevantKeys = allEnvKeys.filter(k => 
    k.includes("GOOGLE") || 
    k.includes("PAGESPEED") || 
    k.includes("RESEND") || 
    k.includes("SHEET")
  );
  console.log("📋 Relevant env keys found:", relevantKeys);
  
  // 3. Verifică valorile efective (parțial, pentru securitate)
  relevantKeys.forEach(key => {
    const value = process.env[key];
    if (value) {
      console.log(`   - ${key}: ${value.substring(0, 20)}... (length: ${value.length})`);
    } else {
      console.log(`   - ${key}: MISSING`);
    }
  });
  
  if (!process.env.GOOGLE_CLIENT_EMAIL) {
    console.error("❌ GOOGLE_CLIENT_EMAIL is MISSING - cannot proceed");
    return;
  }
  
  if (!process.env.GOOGLE_PRIVATE_KEY) {
    console.error("❌ GOOGLE_PRIVATE_KEY is MISSING - cannot proceed");
    return;
  }

  try {
    console.log("🔄 Creating Google Auth client...");
    
    // Încearcă să parseze private key
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    console.log("🔄 Private key before replace - contains \\n:", privateKey.includes("\\n"));
    
    // Înlocuiește \n literal cu newline real
    privateKey = privateKey.replace(/\\n/g, '\n');
    console.log("🔄 Private key after replace - contains \\n:", privateKey.includes("\\n"));
    console.log("🔄 Private key after replace - contains newline:", privateKey.includes("\n"));
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    console.log("🔄 Getting sheets client...");
    const sheets = google.sheets({ version: "v4", auth });

    console.log("🔄 Appending to sheet...");
    console.log("📊 SHEET_ID:", SHEET_ID);
    console.log("📊 SHEET_NAME:", SHEET_NAME);
    console.log("📊 Data to append:", JSON.stringify({
      timestamp: data.timestamp,
      website: data.website,
      email: data.email,
      average: data.average,
    }));
    
    const appendResult = await sheets.spreadsheets.values.append({
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
    console.log("📊 Append result:", appendResult.status, appendResult.statusText);
  } catch (error) {
    console.error("❌ Google Sheets error:", error);
    if (error instanceof Error) {
      console.error("📋 Error name:", error.name);
      console.error("📋 Error message:", error.message);
      console.error("📋 Error stack:", error.stack?.substring(0, 1000));
      
      // Verifică tipuri specifice de erori
      if (error.message.includes("auth") || error.message.includes("credential")) {
        console.error("🔐 AUTH ERROR - check credentials format");
      }
      if (error.message.includes("permission") || error.message.includes("access")) {
        console.error("🚫 PERMISSION ERROR - check if sheet is shared with:", process.env.GOOGLE_CLIENT_EMAIL);
      }
      if (error.message.includes("invalid_grant")) {
        console.error("🔑 INVALID GRANT - private key may be malformed");
      }
      if (error.message.includes("not found") || error.message.includes("404")) {
        console.error("📁 SHEET NOT FOUND - check SHEET_ID:", SHEET_ID);
      }
    }
  }
  console.log("📊 ========== appendToSheet END ==========");
}

export async function POST(request: NextRequest) {
  console.log("🚀 ========== API /api/audit CALLED ==========");
  console.log("🚀 Timestamp:", new Date().toISOString());
  
  try {
    const body = await request.json();
    const { website, email } = body;

    console.log("📥 Request body:", { website, email });

    if (!website) {
      console.log("❌ No website provided");
      return NextResponse.json(
        { error: "Website URL is required" },
        { status: 400 },
      );
    }

    console.log("🔍 Running audit for:", website);
    console.log("🔑 PAGESPEED_API_KEY exists:", !!apiKey);
    console.log("📧 RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
    console.log("📊 GOOGLE_CLIENT_EMAIL exists:", !!process.env.GOOGLE_CLIENT_EMAIL);
    console.log("📊 GOOGLE_PRIVATE_KEY exists:", !!process.env.GOOGLE_PRIVATE_KEY);

    if (!apiKey) {
      console.error("❌ PAGESPEED_API_KEY is missing");
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 },
      );
    }

    const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(website)}&key=${apiKey}&strategy=desktop&category=performance&category=seo&category=accessibility&category=best-practices`;

    console.log("🔄 Calling PageSpeed API...");
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

    console.log("📊 Audit result:", {
      website,
      average,
      priority,
    });

    // Salvează în Google Sheets
    console.log("🔄 Calling appendToSheet...");
    appendToSheet(result).catch(console.error);

    // Trimite email cu raportul
    if (email) {
      console.log("🔄 Calling sendAuditEmail...");
      sendAuditEmail(email, website, scores, average, priority).catch(console.error);
    }

    console.log("✅ API call successful");
    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ AUDIT ERROR:", error instanceof Error ? error.message : String(error));
    console.error("❌ ERROR STACK:", error instanceof Error ? error.stack : "No stack");
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}