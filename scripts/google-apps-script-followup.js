const SHEET_NAME = 'Sheet1';

function sendFollowUpEmails() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const now = new Date();
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const email = row[2]; // Coloana C (Email)
    const website = row[1]; // Coloana B (Website)
    const timestamp = new Date(row[0]); // Coloana A (Timestamp)
    const status = row[10]; // Coloana K (Status)
    const followUp1 = row[11]; // Coloana L (FollowUp1)
    const followUp2 = row[12]; // Coloana M (FollowUp2)
    
    if (!email || email === 'not provided') continue;
    
    const daysSinceAudit = Math.floor((now - timestamp) / (1000 * 60 * 60 * 24));
    
    // Follow-up 1: după 2 zile
    if (!status && daysSinceAudit >= 2 && !followUp1) {
      MailApp.sendEmail({
        to: email,
        subject: `Follow-up: Your Website Audit for ${website}`,
        body: `Hi there,\n\nI wanted to follow up on the free website audit you requested for ${website}.\n\nDid you have a chance to review the report? I'd be happy to discuss how we can improve your scores.\n\nBook a free call: https://calendly.com/hello-newbotic/30min\n\nBest regards,\nAdi @ NewBotic\nnewbotic.co.uk`
      });
      sheet.getRange(i + 1, 12).setValue(new Date());
    }
    
    // Follow-up 2: după 5 zile
    if (!status && daysSinceAudit >= 5 && followUp1 && !followUp2) {
      MailApp.sendEmail({
        to: email,
        subject: `Last chance: Special offer for ${website}`,
        body: `Hi there,\n\nThis is my final follow-up regarding your website audit for ${website}.\n\nI'm offering a special 50% discount if you book this week.\n\nBook here: https://calendly.com/hello-newbotic/30min\n\nBest regards,\nAdi @ NewBotic\nnewbotic.co.uk`
      });
      sheet.getRange(i + 1, 13).setValue(new Date());
      sheet.getRange(i + 1, 11).setValue('Followed Up');
    }
  }
}

function setupTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  ScriptApp.newTrigger('sendFollowUpEmails')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
}

function testFollowUp() {
  sendFollowUpEmails();
}
