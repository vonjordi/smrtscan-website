import React from 'react';

export const meta = {
  slug: 'privacy',
  title: 'Privacy Policy — SMRTscan',
  description:
    'How 1001474709 Ontario Inc. operating as SMRTscan collects, uses, and shares information when you use the SMRTscan mobile application and related services.',
};

export default function Privacy() {
  return (
    <>
      <span className="eyebrow">SMRTscan</span>
      <h1>Privacy Policy</h1>
      <p className="legal-meta">
        <span><strong>Effective:</strong> January 23, 2026</span>
        <span><strong>Last updated:</strong> January 23, 2026</span>
      </p>

      <p>
        This Privacy Policy explains how 1001474709 Ontario Inc. operating as SMRTscan
        (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares
        information when you use the SMRTscan mobile application and related services
        (the &ldquo;Service&rdquo;). If you do not agree with this policy, do not use the Service.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>1.1 Information you provide</h3>
      <ul>
        <li><strong>Account information:</strong> Email address, phone number (optional), and display name.</li>
        <li><strong>Receipt and document data:</strong> Images, PDFs, and extracted data including merchant names, dates, totals, line items, categories, tags, notes, job names, and reference numbers.</li>
        <li><strong>Mileage data:</strong> Trip details including start/end locations, distances, purposes, and odometer readings (if you use mileage tracking).</li>
        <li><strong>Settings and preferences:</strong> Custom categories, tags, saved locations, and export options.</li>
        <li><strong>Support requests:</strong> Communications when you contact us for help.</li>
      </ul>

      <h3>1.2 Information collected automatically</h3>
      <ul>
        <li><strong>Usage data:</strong> Features used, scan counts, and interaction patterns within the app.</li>
        <li><strong>Device data:</strong> Device type, operating system version, app version, and unique device identifiers.</li>
        <li><strong>Diagnostic data:</strong> Crash reports and error logs to improve app stability.</li>
      </ul>

      <h3>1.3 Payments and subscriptions</h3>
      <p>
        Payments are processed by Apple App Store or Google Play (or their payment providers).{' '}
        <strong>We do not collect or store your payment card details.</strong> We receive only
        subscription status and entitlement data from our subscription management provider (RevenueCat).
      </p>

      <h3>1.4 Cloud backups (optional)</h3>
      <p>
        If you enable cloud backup, receipt images and data may be uploaded to your connected cloud
        provider (iCloud or Google Drive). <strong>You control whether this is enabled</strong>, and
        backups are stored in your personal cloud account — not on our servers.
      </p>

      <h3>1.5 AI processing</h3>
      <p>
        When you scan receipts, images are sent to Anthropic&rsquo;s Claude API for text extraction.{' '}
        <strong>Images are processed in real-time and are not stored by Anthropic</strong> beyond the processing request.
      </p>

      <h2>2. How We Use Information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li><strong>Provide the Service:</strong> Scan, extract, store, categorize, and export your receipts and mileage data.</li>
        <li><strong>Process subscriptions:</strong> Manage your subscription status and enforce plan limits.</li>
        <li><strong>Sync and backup:</strong> Store your data when you enable cloud backup features.</li>
        <li><strong>Improve the Service:</strong> Analyze usage patterns to enhance features, fix bugs, and improve reliability.</li>
        <li><strong>Provide support:</strong> Respond to your inquiries and troubleshoot issues.</li>
        <li><strong>Send notifications:</strong> Warranty reminders, return-window alerts, and price-drop notifications (with your permission).</li>
        <li><strong>Comply with law:</strong> Meet legal obligations and respond to lawful requests.</li>
      </ul>

      <h2>3. How We Share Information</h2>
      <p><strong>We do not sell your personal information by default.</strong></p>

      <h3>3.1 Optional data-sharing program</h3>
      <p>
        You may choose to participate in our optional Data Sharing Program through the app settings.{' '}
        <strong>This is entirely voluntary and does not affect your use of the Service.</strong>
      </p>
      <p>If you opt in, we may share <strong>anonymized and aggregated</strong> data with third parties for:</p>
      <ul>
        <li><strong>Market research:</strong> Anonymized spending trends and patterns (e.g., &ldquo;X% of users in Ontario shop at grocery stores on weekends&rdquo;).</li>
        <li><strong>Product improvement:</strong> Understanding how receipt formats vary to improve our AI extraction.</li>
        <li><strong>Industry analytics:</strong> Aggregated insights about retail and consumer behavior.</li>
      </ul>
      <p><strong>What we do NOT share even if you opt in:</strong></p>
      <ul>
        <li>Your name, email, phone number, or any personally identifiable information.</li>
        <li>Individual receipt images.</li>
        <li>Your specific purchase history linked to you.</li>
        <li>Your location beyond general region (province/state level only).</li>
      </ul>
      <p>
        <strong>You can opt out at any time</strong> through Settings → Privacy → Data Sharing.
        Opting out will stop future data sharing immediately.
      </p>

      <h3>3.2 Other sharing</h3>
      <p>We may also share information in these circumstances:</p>
      <ul>
        <li><strong>Service providers:</strong> Third parties who process data on our behalf to operate the Service (see Section 4).</li>
        <li><strong>Cloud storage providers:</strong> Your chosen backup provider (iCloud or Google Drive) when you enable backups.</li>
        <li><strong>Legal requirements:</strong> Law enforcement or government authorities if required by law, court order, or to protect rights, safety, or security.</li>
        <li><strong>Business transfers:</strong> If we merge with or are acquired by another company, your information may be transferred as part of that transaction. We will notify you of any such change.</li>
      </ul>

      <h2>4. Service Providers</h2>
      <p>We use the following third-party services to operate the Service:</p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Purpose</th>
            <th>Data processed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Anthropic (Claude API)</strong></td>
            <td>AI receipt data extraction</td>
            <td>Receipt images (real-time, not stored)</td>
          </tr>
          <tr>
            <td><strong>Google ML Kit</strong></td>
            <td>On-device offline OCR</td>
            <td>Receipt images (processed locally)</td>
          </tr>
          <tr>
            <td><strong>Supabase</strong></td>
            <td>Authentication and user data</td>
            <td>Account credentials, user profile</td>
          </tr>
          <tr>
            <td><strong>RevenueCat</strong></td>
            <td>Subscription management</td>
            <td>Anonymous user ID, subscription status</td>
          </tr>
          <tr>
            <td><strong>Apple iCloud</strong></td>
            <td>Cloud backup (optional)</td>
            <td>Receipt data and images (your account)</td>
          </tr>
          <tr>
            <td><strong>Google Drive</strong></td>
            <td>Cloud backup (optional)</td>
            <td>Receipt data and images (your account)</td>
          </tr>
        </tbody>
      </table>
      <p>These providers process data as needed to provide their services and are governed by their own privacy policies.</p>

      <h2>5. Data Storage and Security</h2>

      <h3>5.1 Local storage</h3>
      <ul>
        <li>All receipt data, images, and personal information are stored <strong>locally on your device</strong> by default.</li>
        <li>Data is stored using encrypted databases and secure storage mechanisms.</li>
        <li>Biometric authentication (Face ID/Touch ID) is available to protect app access.</li>
      </ul>

      <h3>5.2 Cloud storage (optional)</h3>
      <ul>
        <li>If you enable cloud backup, data is encrypted before upload to your personal cloud account.</li>
        <li><strong>We do not have access to your cloud storage credentials or backup data.</strong></li>
      </ul>

      <h3>5.3 Security measures</h3>
      <ul>
        <li>All network communications use HTTPS/TLS encryption.</li>
        <li>Sensitive data (API keys, credentials) is stored in device secure storage.</li>
        <li>We use reasonable administrative, technical, and organizational measures to protect data.</li>
      </ul>
      <p>
        <strong>No method of transmission or storage is 100% secure.</strong> We cannot guarantee absolute security,
        but we take data protection seriously.
      </p>

      <h2>6. Data Retention</h2>
      <ul>
        <li><strong>Active use:</strong> We retain data for as long as you keep it in the app.</li>
        <li><strong>Deleted items:</strong> Moved to &ldquo;Recently Deleted&rdquo; for 30 days, then permanently removed.</li>
        <li><strong>Cloud backups:</strong> Remain in your cloud account until you manually delete them.</li>
        <li><strong>Account deletion:</strong> All data is permanently deleted within 30 days of account deletion request.</li>
      </ul>

      <h2>7. Your Rights and Choices</h2>
      <p>You can:</p>
      <ul>
        <li><strong>Access your data:</strong> View all stored data within the app.</li>
        <li><strong>Export your data:</strong> Export receipts to CSV, PDF, or ZIP at any time.</li>
        <li><strong>Update or delete data:</strong> Edit or delete individual receipts, trips, or reminders.</li>
        <li><strong>Disable cloud backups:</strong> Turn off backups to keep all data local-only.</li>
        <li><strong>Disable notifications:</strong> Manage push notifications in your device settings.</li>
        <li><strong>Request account deletion:</strong> Contact us to delete your account and all associated data.</li>
      </ul>

      <h3>For Canadian residents (PIPEDA)</h3>
      <p>You have the right to access, correct, and request deletion of your personal information. Contact us to exercise these rights.</p>

      <h3>For California residents (CCPA)</h3>
      <p>You have the right to:</p>
      <ul>
        <li>Know what personal information is collected.</li>
        <li>Request deletion of personal information.</li>
        <li>Opt out of the sale of personal information (we only share anonymized data if you opt in).</li>
        <li>Non-discrimination for exercising privacy rights.</li>
      </ul>

      <h3>For European residents (GDPR)</h3>
      <p>You have additional rights including:</p>
      <ul>
        <li>Right to access, rectification, and erasure.</li>
        <li>Right to restrict or object to processing.</li>
        <li>Right to data portability.</li>
        <li>Right to withdraw consent.</li>
        <li>Right to lodge a complaint with a supervisory authority.</li>
      </ul>

      <h2>8. Children&rsquo;s Privacy</h2>
      <p>
        The Service is not directed to children under 13 (or the applicable age of digital consent in your jurisdiction).
        We do not knowingly collect personal information from children. If you believe we have collected such information,
        please contact us immediately and we will delete it.
      </p>

      <h2>9. International Data Transfers</h2>
      <p>
        If you use the Service outside Canada, your data may be processed in other jurisdictions where our service
        providers operate (including the United States). By using the Service, you consent to such transfers.
        We ensure appropriate safeguards are in place for international transfers.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. When we make material changes, we will:</p>
      <ul>
        <li>Update the &ldquo;Last updated&rdquo; date at the top.</li>
        <li>Provide notice within the app.</li>
        <li>For significant changes, request your acknowledgment.</li>
      </ul>
      <p>Your continued use of the Service after changes constitutes acceptance of the updated Privacy Policy.</p>

      <h2>11. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, wish to exercise your privacy rights, or need to report a concern, contact us at:</p>
      <p>
        <strong>1001474709 Ontario Inc. operating as SMRTscan</strong><br />
        Email: <a href="mailto:privacy@smrtscan.app">privacy@smrtscan.app</a><br />
        Location: Guelph, Ontario, Canada
      </p>

      <h2>Summary</h2>
      <table>
        <thead>
          <tr>
            <th>What we collect</th>
            <th>How we use it</th>
            <th>Your control</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Account info</td><td>Provide service</td><td>Update or delete</td></tr>
          <tr><td>Receipt scans &amp; data</td><td>Process and organize</td><td>Delete anytime</td></tr>
          <tr><td>Mileage trips</td><td>Track business travel</td><td>Full control</td></tr>
          <tr><td>Usage data</td><td>Improve the app</td><td>N/A (anonymized)</td></tr>
          <tr><td>Device info</td><td>Troubleshooting</td><td>N/A (automatic)</td></tr>
        </tbody>
      </table>
      <p><strong>Your data stays on your device unless you choose cloud backup. We only share anonymized data if you explicitly opt in.</strong></p>
    </>
  );
}
