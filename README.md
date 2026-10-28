# RATIO — Sistema Decisionale Executive

## 📋 Panoramica

RATIO è una piattaforma di Decision Intelligence premium per la selezione executive e i critical appointments nello sport professionistico. Il design è stato concepito come un sistema analitico interno riservato — dark, tecnico, stratificato — con l'estetica di una piattaforma ad alto livello utilizzata da analisti e top executive.

**URL Produzione**: https://ratioapp.co  
**Repo**: Static HTML/CSS/JS — deploy via GitHub → Cloudflare Workers

---

## 🗺️ Sitemap Completa (30 URL — 15 IT + 15 EN) — aggiornato 2026-08-19

| Pagina | IT | EN |
|--------|----|----|
| Homepage | `index.html` | `en_index.html` |
| Insights listing | `insights.html` | `en_insights.html` |
| Chi è / About | `cristiano-ludovisi.html` | `en_cristiano-ludovisi.html` |
| Volume I | `libro-vol1.html` | `en_libro-vol1.html` |
| **Professional Sport** | **`sport.html`** | **`en_sport.html`** |
| Insight 1–11 | `insight-1.html` … `insight-11.html` | `en_insight-1.html` … `en_insight-11.html` |

---

## ✅ Fasi Completate

### Fase 1 — Volume I Digital Book (DEPLOYATO)
- `libro-vol1.html` + `en_libro-vol1.html` — libro digitale 10 capitoli
- VOLUMI link aggiunto a tutte le navbar
- Volume I banner su insight 1–10 (IT + EN)
- Cards insight listing aggiornate
- sitemap.xml aggiornato

### Fase 2 — Insight #11 (DEPLOYATO)
- `insight-11.html` + `en_insight-11.html` — "Più dati = decisioni migliori?"
- `.cover-11` aggiunto a `insights.css`
- Cards in `insights.html` + `en_insights.html`
- Backlink bidirezionale insight-10 ↔ insight-11
- sitemap.xml aggiornato (28 URL, 2026-08-18)

### Fase 3 — Professional Sport Vertical (COMPLETO — in attesa di deploy)
- `sport.html` — pagina Italian Professional Sport, 10 sezioni
- `en_sport.html` — pagina English Professional Sport, 10 sezioni
- Sezione "RATIO · PROFESSIONAL SPORT" aggiunta a `index.html` e `en_index.html`
- sitemap.xml aggiornato (30 URL, 2026-08-19)

---

## ✅ Features Implementate (Sito Principale)

### Struttura delle Sezioni (invariata rispetto al design originale)
- **Hero** — Layout split 60/40: headline massiva + pannello assessment preview
- **Contesto Operativo** — 3 data cards con metriche critiche
- **Architettura del Sistema** — 3 moduli analitici con features e metriche
- **Processo Operativo** — Timeline a 4 step con output evidenziato
- **Output Decisionale** — Report mockup classificato + copy + CTA
- **CTA Banner** — Banner verde con accesso enterprise
- **Contatti** — Form validato + sidebar info
- **Footer** — Info sistema, navigazione, hash di certificazione

### Profondità Visiva & Atmosfera
- Grid tecnica a sfondo fisso + scanlines
- Texture noise SVG su tutto il body
- Layer radial gradient nella hero
- Overlay geometrici e transizioni tra sezioni
- Subtle grain per evitare flat black

### Hero Right Panel (Dashboard)
- Campi tabellari con field-label + field-value
- 4 metriche animate con barre, delta, threshold
- Raccomandazione con dot colorato
- Footer con timestamp live, hash SHA, badge CONFIDENTIAL
- Stato: RISERVATO (badge rosso)

### Data Visual Enhancement
- Barre metriche animate via IntersectionObserver
- Micro-bars animate on hover nelle data cards
- Numeri con counter animation (da 0 al valore target)
- Ghost bars + segmentazione sulle metric-bar-track
- Delta indicators (↑ ↔) colorati

### Typography Hierarchy
- Eyebrow labels uppercase con codice modulo
- Section headline massive
- Secondary labels, annotations, micro-text
- Font mono per tutti i valori tecnici (JetBrains Mono)

### Output Section
- Report mockup con struttura da documento classificato
- Metadata: ref, data, candidato anonimizzato, revisore, versione modello
- Metriche con barre animate
- Note analista, hash SHA-256, timestamp
- Feature icons con hover states tecnici

### Interazioni
- Scroll progress bar nella nav
- Active nav link tracking via scroll
- Typing effect sull'eyebrow dell'hero
- Cursor trail verde (solo desktop)
- Grid parallax lieve con mouse
- Module cards: sequential feature highlight on hover
- Metric rows: brightness pulse on hover
- Panel/report field rows: highlight on hover
- Micro-bars: animazione casuale on hover
- Form: validazione real-time + submit simulato con spinner

### Form Contatti
- Validazione campi obbligatori
- Validazione formato email
- Feedback errore per campo
- Messaggio di successo dopo submit
- Loading state con spinner

## 🗂️ Struttura File

```
index.html          — Pagina principale
css/
  style.css         — Tutti gli stili (dark dashboard premium)
js/
  main.js           — Micro-interazioni e animazioni tecniche
```

## 🔗 Navigazione (URI)

| Sezione | Ancora |
|---------|--------|
| Home / Hero | `#home` |
| Chi Siamo / Contesto | `#chi-siamo` |
| Come Funziona / Processo | `#come-funziona` |
| Output | `#output` |
| Contatti | `#contatti` |

## 🎨 Design System

### Palette
| Token | Valore | Uso |
|-------|--------|-----|
| `--black` | `#080A0D` | Background principale |
| `--green-bright` | `#4DAB7A` | Accento positivo, CTA |
| `--yellow-bright` | `#E2BB3A` | Warning, attenzione |
| `--red-bright` | `#D04040` | Rischio, critico |
| `--white` | `#F0F2F5` | Testo principale |

### Font
- **Inter** — Headlines, body, UI
- **JetBrains Mono** — Dati tecnici, codici, timestamp, metriche

## 📚 Knowledge Base RATIO — Insights (21 Articoli IT + EN)

### Insight 21 — "Il rischio più grande può non essere in una decisione. Ma nella somma di tutte le decisioni." (28 Ottobre 2026)
- `insight-21.html` + `en_insight-21.html`
- Nuovo framework: **Mappa RATIO del Portafoglio Decisionale** (Decisioni → Assunzioni Condivise → Capacità → Interdipendenze → Esposizione Complessiva)
- Nuovo framework: **Verifica RATIO del Portafoglio Decisionale** (7 domande)
- Concetto: **Rischio di Concentrazione Decisionale** (Decision Portfolio Risk)
- `.cover-21` aggiunto a `insights.css`
- Cards aggiunte in `insights.html` + `en_insights.html`; backlink bidirezionale insight-20 ↔ insight-21 (IT+EN)
- sitemap.xml aggiornato

### Insight 20 — "Una decisione non smette di essere rischiosa quando iniziamo a eseguirla." (21 Ottobre 2026)
- `insight-20.html` + `en_insight-20.html`
- Nuovo framework: **Monitor RATIO delle Assunzioni Decisionali** (Assunzione → Evidenza → Segnale → Soglia → Valutazione)
- Concetto: **Deriva delle Assunzioni Decisionali** (Assumption Drift)
- `.cover-20` aggiunto a `insights.css`
- Cards aggiunte in `insights.html` + `en_insights.html`; backlink bidirezionale insight-19 ↔ insight-20
- sitemap.xml aggiornato (aggiunte anche le voci mancanti per insight-19/en_insight-19)


| # | Titolo IT | Titolo EN | Data | Cover |
|---|-----------|-----------|------|-------|
| 1 | insight-1.html | en_insight-1.html | 2026 | cover-1 |
| 2 | insight-2.html | en_insight-2.html | 2026 | cover-2 |
| 3 | insight-3.html | en_insight-3.html | 2026 | cover-3 |
| 4 | insight-4.html | en_insight-4.html | 2026 | cover-4 |
| 5 | insight-5.html | en_insight-5.html | 2026 | cover-5 |
| 6 | insight-6.html | en_insight-6.html | 2026-07-01 | cover-6 |
| 7 | insight-7.html | en_insight-7.html | 2026-07-06 | cover-7 |
| 8 | insight-8.html | en_insight-8.html | 2026-07-22 | cover-8 |
| 9 | insight-9.html | en_insight-9.html | 2026-08-08 | cover-9 |

### Insight 9 — Elementi Speciali
- **Signal Flow Diagram** — 4 step (Segnale → Interpretazione → Problema → Decisione) con punto di vulnerabilità evidenziato in ambra
- **Problem Frame Test Table** — 5 domande × 2 colonne (framework proprietario RATIO)
- **Due Architetture Decisionali** — comparativo a 2 colonne (Approccio A / B)
- **Decision Stress Test Box** — 6 domande con chiusura verde
- **Founder Quote** — Cristiano Ludovisi
- **Nessuna statistica inventata** — solo framework qualitativi RATIO

## ⚠️ Features Non Ancora Implementate

- Backend per form (attualmente simulato)
- CMS per aggiornamento contenuti
- Sistema autenticazione per area riservata
- Analytics/tracking avanzato

## 🚀 Prossimi Passi Consigliati

1. Collegare il form a un backend reale (es. Formspree, Netlify Forms)
2. Aggiungere Insight #10 quando disponibile
3. Implementare una sezione casi studio con report anonimizzati
4. Aggiungere search/filter nella pagina insights
5. Ottimizzare performance (font preload, lazy loading immagini)

## 📡 Deploy

Per pubblicare il sito, vai alla scheda **Publish** e premi il pulsante di pubblicazione.
