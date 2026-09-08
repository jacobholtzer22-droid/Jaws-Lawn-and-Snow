/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Legacy URLs that are still indexed by Google. /get-a-quote was the old quote
   * page; it 404s since the site moved to /contact, and Google is still serving
   * cached copies that contain outdated contact details. 301 so the old URL and
   * its equity land on the live page.
   *
   * `statusCode: 301` rather than `permanent: true` — Next's `permanent` emits a
   * 308, which Google treats identically but older crawlers and link checkers
   * don't all understand. The client asked for a 301; this is a 301.
   */
  async redirects() {
    return [
      { source: "/get-a-quote", destination: "/contact", statusCode: 301 },
      { source: "/quote", destination: "/contact", statusCode: 301 },
      { source: "/request-a-quote", destination: "/contact", statusCode: 301 },
    ];
  },
};

export default nextConfig;
