import React from 'react';

export const meta = {
  slug: 'terms',
  title: 'Terms of Service — SMRTscan',
  description:
    'Terms of Service governing access to and use of the SMRTscan mobile application and related services provided by 1001474709 Ontario Inc.',
};

export default function Terms() {
  return (
    <>
      <span className="eyebrow">SMRTscan</span>
      <h1>Terms of Service</h1>
      <p className="legal-meta">
        <span><strong>Effective:</strong> January 23, 2026</span>
        <span><strong>Last updated:</strong> January 23, 2026</span>
      </p>

      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the SMRTscan mobile
        application and related services (the &ldquo;Service&rdquo;) provided by 1001474709 Ontario Inc.
        operating as SMRTscan (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
        By using the Service, you agree to these Terms. If you do not agree, do not use the Service.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 13 years old (or the age of digital consent in your region) to use the Service.
        By using the Service, you represent that you meet this requirement. If you are under 18, you represent
        that you have your parent or guardian&rsquo;s permission to use the Service.
      </p>

      <h2>2. Account and Security</h2>
      <p>You are responsible for:</p>
      <ul>
        <li>Maintaining the confidentiality of your account credentials.</li>
        <li>All activity that occurs under your account.</li>
        <li>Safeguarding any biometric authentication settings.</li>
      </ul>
      <p>Notify us immediately of any unauthorized use of your account.</p>

      <h2>3. The Service</h2>
      <p>The Service lets you:</p>
      <ul>
        <li>Scan and extract data from receipts and documents using AI technology.</li>
        <li>Organize and categorize expenses.</li>
        <li>Track mileage for business purposes.</li>
        <li>Set warranty and return reminders.</li>
        <li>Export data in various formats.</li>
        <li>Back up data to cloud storage (optional).</li>
      </ul>
      <p>Some features may require a paid subscription.</p>

      <h2>4. Subscriptions and Payments</h2>

      <h3>4.1 Billing</h3>
      <ul>
        <li>Subscriptions are billed through the Apple App Store or Google Play Store.</li>
        <li>Pricing, billing cycles, and renewal terms are displayed at purchase time.</li>
        <li>Subscriptions auto-renew unless canceled at least 24 hours before the end of the current period.</li>
      </ul>

      <h3>4.2 Managing subscriptions</h3>
      <ul>
        <li>Cancel or manage subscriptions through your device&rsquo;s app store settings.</li>
        <li>We do not directly process payments or handle refunds.</li>
      </ul>

      <h3>4.3 Refunds</h3>
      <p>
        Refunds are handled by the applicable app store, subject to their policies.
        Contact Apple or Google for refund requests.
      </p>

      <h3>4.4 Free tier</h3>
      <p>The free tier includes limited features (5 AI scans per month). Premium features require a paid subscription.</p>

      <h2>5. User Content</h2>

      <h3>5.1 Ownership</h3>
      <p>You retain ownership of all content you upload (&ldquo;User Content&rdquo;), including receipts, documents, images, and data.</p>

      <h3>5.2 License to us</h3>
      <p>
        You grant us a limited, non-exclusive, royalty-free license to process your User Content solely
        to provide the Service (scanning, extracting, storing, backing up, and exporting).
      </p>

      <h3>5.3 Your responsibilities</h3>
      <p>You agree not to upload content that:</p>
      <ul>
        <li>Violates any laws or regulations.</li>
        <li>Infringes on third-party intellectual property rights.</li>
        <li>Contains illegal financial records or fraudulent documents.</li>
      </ul>

      <h2>6. Acceptable Use</h2>
      <p>You agree NOT to:</p>
      <ul>
        <li>Use the Service for any unlawful purpose.</li>
        <li>Reverse engineer, decompile, or disassemble the Service.</li>
        <li>Attempt to access data or accounts that are not yours.</li>
        <li>Interfere with or disrupt the Service&rsquo;s functionality.</li>
        <li>Use automated tools (bots, scrapers) to access the Service.</li>
        <li>Circumvent subscription restrictions or usage limits.</li>
        <li>Share your account credentials with others.</li>
      </ul>

      <h2>7. AI Processing and Accuracy</h2>

      <h3>7.1 AI extraction</h3>
      <p>The Service uses artificial intelligence to extract data from receipt images. You acknowledge that:</p>
      <ul>
        <li>AI extraction may not be 100% accurate.</li>
        <li>You are responsible for verifying extracted data.</li>
        <li>We are not liable for errors in AI-processed data.</li>
      </ul>

      <h3>7.2 No professional advice</h3>
      <p>The Service is a tool for organizing receipts and expenses. It does NOT provide:</p>
      <ul>
        <li>Financial advice.</li>
        <li>Tax advice.</li>
        <li>Accounting services.</li>
        <li>Legal advice.</li>
      </ul>
      <p>Consult qualified professionals for financial, tax, or legal matters.</p>

      <h2>8. Third-Party Services</h2>
      <p>The Service integrates with third-party services:</p>
      <ul>
        <li><strong>Anthropic (Claude API):</strong> AI receipt extraction.</li>
        <li><strong>Google ML Kit:</strong> Offline text recognition.</li>
        <li><strong>Supabase:</strong> Authentication.</li>
        <li><strong>RevenueCat:</strong> Subscription management.</li>
        <li><strong>iCloud / Google Drive:</strong> Cloud backup (optional).</li>
      </ul>
      <p>Your use of these services is governed by their respective terms and privacy policies.</p>

      <h2>9. Data Backup and Loss</h2>

      <h3>9.1 Your responsibility</h3>
      <p>
        You are responsible for backing up your data. We strongly recommend enabling cloud backup or
        regularly exporting your data.
      </p>

      <h3>9.2 No liability for data loss</h3>
      <p>We are not liable for data loss resulting from:</p>
      <ul>
        <li>Device loss, theft, or damage.</li>
        <li>App deletion or reinstallation.</li>
        <li>Software bugs or crashes.</li>
        <li>Cloud service provider failures.</li>
        <li>Your failure to maintain backups.</li>
      </ul>

      <h2>10. Updates and Changes</h2>
      <p>We may modify the Service or these Terms from time to time. When we make changes:</p>
      <ul>
        <li>We will update the &ldquo;Last updated&rdquo; date above.</li>
        <li>We may provide notice within the app.</li>
        <li>For material changes, we may request your acknowledgment.</li>
      </ul>
      <p>Continued use after changes means you accept the updated Terms.</p>

      <h2>11. Disclaimers</h2>
      <p>
        THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
      </p>
      <ul>
        <li>MERCHANTABILITY.</li>
        <li>FITNESS FOR A PARTICULAR PURPOSE.</li>
        <li>NON-INFRINGEMENT.</li>
        <li>ACCURACY OR COMPLETENESS OF DATA.</li>
      </ul>
      <p>We do not guarantee that the Service will be uninterrupted, error-free, or secure.</p>

      <h2>12. Limitation of Liability</h2>
      <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, 1001474709 ONTARIO INC. WILL NOT BE LIABLE FOR:</p>
      <ul>
        <li>Indirect, incidental, special, consequential, or punitive damages.</li>
        <li>Loss of data, profits, revenue, or business opportunities.</li>
        <li>Damages arising from use or inability to use the Service.</li>
        <li>Any amount exceeding the fees paid by you in the past 12 months.</li>
      </ul>
      <p>
        Some jurisdictions do not allow limitation of liability for certain damages. In such cases,
        our liability is limited to the maximum extent permitted by law.
      </p>

      <h2>13. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless 1001474709 Ontario Inc. and its officers,
        directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:
      </p>
      <ul>
        <li>Your use of the Service.</li>
        <li>Your violation of these Terms.</li>
        <li>Your violation of any third-party rights.</li>
        <li>Your User Content.</li>
      </ul>

      <h2>14. Termination</h2>

      <h3>14.1 By you</h3>
      <p>You may stop using the Service at any time. To fully terminate:</p>
      <ul>
        <li>Delete the app from your device.</li>
        <li>Cancel any active subscription through your app store.</li>
        <li>Request account deletion by contacting us.</li>
      </ul>

      <h3>14.2 By us</h3>
      <p>We may suspend or terminate your access if you:</p>
      <ul>
        <li>Violate these Terms.</li>
        <li>Engage in fraudulent activity.</li>
        <li>Abuse the Service.</li>
      </ul>

      <h3>14.3 Effect of termination</h3>
      <p>Upon termination:</p>
      <ul>
        <li>Your license to use the Service ends.</li>
        <li>Export your data before termination if desired.</li>
        <li>We may delete your data after a reasonable period.</li>
      </ul>

      <h2>15. Governing Law and Disputes</h2>

      <h3>15.1 Governing law</h3>
      <p>
        These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada
        applicable therein, without regard to conflict-of-laws rules.
      </p>

      <h3>15.2 Dispute resolution</h3>
      <p>Any disputes shall be resolved through:</p>
      <ol>
        <li><strong>Informal resolution:</strong> Contact us first to attempt resolution.</li>
        <li><strong>Mediation or arbitration:</strong> If informal resolution fails, disputes will be resolved through binding arbitration in Ontario, Canada.</li>
        <li><strong>Class-action waiver:</strong> You agree to resolve disputes individually, not as part of a class action.</li>
      </ol>

      <h3>15.3 Exceptions</h3>
      <p>Either party may seek injunctive relief in court for intellectual property matters.</p>

      <h2>16. General Provisions</h2>

      <h3>16.1 Entire agreement</h3>
      <p>
        These Terms, together with our Privacy Policy, constitute the entire agreement between you and
        1001474709 Ontario Inc. regarding the Service.
      </p>

      <h3>16.2 Severability</h3>
      <p>If any provision is found unenforceable, the remaining provisions continue in effect.</p>

      <h3>16.3 Waiver</h3>
      <p>Our failure to enforce any provision does not constitute a waiver of that provision.</p>

      <h3>16.4 Assignment</h3>
      <p>You may not assign your rights under these Terms. We may assign our rights without restriction.</p>

      <h3>16.5 Force majeure</h3>
      <p>We are not liable for failures caused by circumstances beyond our reasonable control.</p>

      <h2>17. Contact</h2>
      <p>If you have questions about these Terms, contact:</p>
      <p>
        <strong>1001474709 Ontario Inc. operating as SMRTscan</strong><br />
        Email: <a href="mailto:legal@smrtscan.app">legal@smrtscan.app</a><br />
        Address: 148 Marksam Road, Guelph, Ontario N1H 6T6, Canada
      </p>

      <h2>Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Key points</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Service</strong></td><td>Receipt scanning, expense tracking, mileage logging</td></tr>
          <tr><td><strong>Subscriptions</strong></td><td>Billed via App Store/Play Store; auto-renews</td></tr>
          <tr><td><strong>Your content</strong></td><td>You own it; we process it to provide the Service</td></tr>
          <tr><td><strong>AI accuracy</strong></td><td>Not guaranteed; verify important data</td></tr>
          <tr><td><strong>Data backup</strong></td><td>Your responsibility; enable cloud backup</td></tr>
          <tr><td><strong>Liability</strong></td><td>Limited; use at your own risk</td></tr>
          <tr><td><strong>Termination</strong></td><td>You can leave anytime; export data first</td></tr>
          <tr><td><strong>Governing law</strong></td><td>Ontario, Canada</td></tr>
        </tbody>
      </table>
      <p><strong>Questions?</strong> Contact <a href="mailto:legal@smrtscan.app">legal@smrtscan.app</a>.</p>
    </>
  );
}
