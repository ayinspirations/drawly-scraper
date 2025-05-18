const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/scrape-instagram', async (req, res) => {
  const { postUrl } = req.body;
  if (!postUrl) return res.status(400).send({ error: 'postUrl fehlt' });

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(postUrl, { waitUntil: 'networkidle2' });

    // Warten auf Kommentare
    await page.waitForSelector('ul > li');

    const comments = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('ul > li'));
      return items.map(el => {
        const user = el.querySelector('a')?.innerText || 'unbekannt';
        const text = el.querySelector('span')?.innerText || '';
        return { user, text };
      });
    });

    await browser.close();
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Fehler beim Scrapen' });
  }
});

app.listen(3000, () => {
  console.log('Scraper läuft auf Port 3000');
});
