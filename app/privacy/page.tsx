'use client';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#00f0ff] mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: May 2026</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[#00f0ff] mb-3">1. Information We Collect</h2>
            <p className="mb-2">When you use Newbotic AI, we collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Account data:</strong> Name, email address, company name</li>
              <li><strong>Social media connections:</strong> Access tokens for Facebook, LinkedIn (only with your consent)</li>
              <li><strong>Content:</strong> Posts, hashtags, images you create or schedule</li>
              <li><strong>Usage data:</strong> Conversations with AI agents, bookings, maintenance reports</li>
              <li><strong>Technical data:</strong> IP address, browser type, device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00f0ff] mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide AI-powered social media and customer support services</li>
              <li>To publish content on your behalf on Facebook, LinkedIn (only when you approve)</li>
              <li>To improve our AI models and user experience</li>
              <li>To communicate with you about updates and support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00f0ff] mb-3">3. Data Storage</h2>
            <p>Your data is stored securely on Supabase (European Union servers) and Railway cloud infrastructure. All data is encrypted in transit (HTTPS) and at rest.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00f0ff] mb-3">4. Data Sharing</h2>
            <p>We share your data only:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>With your explicit consent (e.g., posting to your Facebook page)</li>
              <li>With service providers (Supabase, Railway, Google Gemini API)</li>
              <li>When required by law</li>
            </ul>
            <p className="mt-2">We never sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00f0ff] mb-3">5. Your Rights (GDPR)</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-2">To exercise these rights, email <a href="mailto:hello@newbotic.co.uk" className="text-[#00f0ff] hover:underline">hello@newbotic.co.uk</a></p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00f0ff] mb-3">6. Data Retention</h2>
            <p>We keep your data as long as your account is active. You may delete your account at any time. Deleted data is removed within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00f0ff] mb-3">7. Cookies</h2>
            <p>We use essential cookies for authentication and functionality. You can disable cookies in your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00f0ff] mb-3">8. Contact Us</h2>
            <p>Email: <a href="mailto:hello@newbotic.co.uk" className="text-[#00f0ff] hover:underline">hello@newbotic.co.uk</a></p>
            <p>WhatsApp: +44 7891 897558</p>
          </section>
        </div>
      </div>
    </div>
  );
}
