export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.toLowerCase();
    const response = await env.ASSETS.fetch(request);

    if (pathname === '/sitemap.xml') {
      const headers = new Headers(response.headers);
      headers.set('Content-Type', 'application/xml; charset=UTF-8');
      headers.set('X-Content-Type-Options', 'nosniff');
      headers.set('Cache-Control', 'public, max-age=3600');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    return response;
  },
};
