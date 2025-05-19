# Drawly Scraper

Ein Scraper-Backend für [Drawly.io], um Instagram- und TikTok-Kommentare von öffentlichen Gewinnspiel-Posts zu extrahieren.

## Features

- Scraping von Instagram-Kommentaren (öffentlich sichtbare Posts)
- Scraping von TikTok-Kommentaren (öffentlich sichtbare Videos)
- REST-API mit JSON-Antworten
- Bereit für Deployment auf Render.com

## Endpunkte

### POST /scrape-instagram

**Body:**
```json
{
  "postUrl": "https://www.instagram.com/p/POST_ID/"
}
