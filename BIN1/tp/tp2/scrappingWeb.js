/**
 * Scrapper la page "https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP"
 * et ressortir un objet indexé par le code HTTP et pour valeur le message associé.
 *  Résultat attendu:
 *    {
 *      ...,
 *      200: "OK",
 *      201: "Created",
 *      ...
 *    }
 *
 * Reprendre la classe Scrapper et la modifier pour gérer le HTML
 *
 * Pro tips: utiliser la lib jsdom
 *  Commande : npm install --save jsdom
 *
 * Rendu sur Devinci Online
 */
const Scrapper = require("./Scrapper");

new Scrapper({
  url: "https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP",
  processData: (document) => {
    const trs = document.querySelectorAll("table tr:not(:first-child)");

    return Array.from(trs).reduce((acc, item) => {
      const key = item.querySelector("th").textContent.trim();
      const value = item.querySelector("td:first-of-type").textContent.trim();
      acc[key] = value;

      return acc;
    }, {});
  },
})
  .prepare()
  .start();
