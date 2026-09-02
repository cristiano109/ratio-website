/**
 * RATIO — Cloudflare Worker
 *
 * Responsabilità:
 * 1. Serve sitemap.xml con Content-Type corretto
 * 2. Redirect intelligente sulla root (/ e /index.html):
 *    - Se l'utente ha già scelto manualmente la lingua (cookie ratio_lang)
 *      → rispetta la sua preferenza
 *    - Altrimenti legge Accept-Language del browser:
 *      → "it" → index.html (italiano)
 *      → qualsiasi altra lingua → en_index.html (inglese, default internazionale)
 * 3. Language switcher: quando l'utente clicca EN o IT nel switcher,
 *    il JS della pagina imposta il cookie ratio_lang=en|it (1 anno).
 *    Il worker lo legge e lo rispetta nelle visite successive.
 *
 * ZERO impatto su: URL, SEO, canonical, hreflang, sitemap, contenuti.
 * Tutte le URL esistenti continuano a funzionare invariate.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // ──────────────────────────────────────────────
    // 1. SITEMAP — Content-Type fix
    // ──────────────────────────────────────────────
    if (pathname === '/sitemap.xml') {
      const response = await env.ASSETS.fetch(request);
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Content-Type', 'application/xml; charset=utf-8');
      return newResponse;
    }

    // ──────────────────────────────────────────────
    // 2. LANGUAGE REDIRECT — solo su root e /index.html
    // ──────────────────────────────────────────────
    const isRoot      = pathname === '/' || pathname === '';
    const isIndexHtml = pathname === '/index.html';

    if (isRoot || isIndexHtml) {

      // 2a. Controlla il cookie di preferenza manuale (ratio_lang)
      const cookieHeader = request.headers.get('Cookie') || '';
      const langCookieMatch = cookieHeader.match(/(?:^|;\s*)ratio_lang=([^;]+)/);
      const savedLang = langCookieMatch ? langCookieMatch[1].trim() : null;

      let targetLang; // 'it' o 'en'

      if (savedLang === 'it' || savedLang === 'en') {
        // Preferenza manuale salvata → la rispettiamo sempre
        targetLang = savedLang;
      } else {
        // 2b. Nessuna preferenza → rileva dal browser (Accept-Language)
        const acceptLang = request.headers.get('Accept-Language') || '';
        targetLang = detectLanguage(acceptLang);
      }

      // 2c. Costruisci URL di destinazione
      const targetPath = targetLang === 'it' ? '/index.html' : '/en_index.html';

      // 2d. Se siamo già sulla pagina giusta, non redirigere
      // (evita loop su /index.html → /index.html)
      if (isIndexHtml && targetPath === '/index.html') {
        return env.ASSETS.fetch(request);
      }

      // 2e. Redirect 302 con no-cache (il redirect dipende dal browser/cookie)
      return new Response(null, {
        status: 302,
        headers: {
          'Location': new URL(targetPath, url.origin).href,
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Vary': 'Accept-Language, Cookie',
        }
      });
    }

    // ──────────────────────────────────────────────
    // 3. Tutte le altre richieste → asset statici normali
    //    Per i file .html: forza no-cache così Cloudflare
    //    non serve mai una versione stantia dopo un deploy.
    // ──────────────────────────────────────────────
    const assetResponse = await env.ASSETS.fetch(request);

    if (pathname.endsWith('.html') || pathname.endsWith('/')) {
      const newRes = new Response(assetResponse.body, assetResponse);
      newRes.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      return newRes;
    }

    return assetResponse;
  }
};

/**
 * Rileva la lingua preferita dal header Accept-Language.
 * Restituisce 'it' se la lingua primaria è italiano,
 * 'en' per qualsiasi altra lingua (default internazionale).
 *
 * Esempi:
 *   "it-IT,it;q=0.9,en;q=0.8"  → 'it'
 *   "it;q=0.9,en-US;q=0.8"     → 'it'
 *   "en-US,en;q=0.9"            → 'en'
 *   "fr-FR,fr;q=0.9"            → 'en'
 *   "de-DE"                     → 'en'
 *   ""                          → 'en'
 */
function detectLanguage(acceptLang) {
  if (!acceptLang) return 'en';

  // Prende solo la prima lingua (quella con priorità più alta)
  // Accept-Language: "it-IT,it;q=0.9,en;q=0.8"  → "it-IT"
  const primaryLang = acceptLang
    .split(',')[0]          // prende il primo tag
    .split(';')[0]          // rimuove q=value
    .trim()
    .toLowerCase();

  // È italiano se inizia con "it"
  if (primaryLang.startsWith('it')) return 'it';

  return 'en';
}
