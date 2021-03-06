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
 * Rendu: Envoyer un mail avant 23H59 avec
 *  en sujet: "[ESILV][NODE][BIN2]TP2 Nom prénom"
 *  en pj: scrapper.js et scrappingWeb.js
 */
const Scrapper = require("./scrapper");

new Scrapper({
  url: "https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP",
  processData: (data) =>
    Array.from(data.querySelectorAll("table tr:not(:first-child)")).reduce(
      (acc, item) => {
        const key = item.querySelector("th").innerText.trim();
        const value = item.querySelector("td:first-of-type").innerText.trim();
        acc[key] = value;
        return acc;
      },
      {}
    ),
})
  .prepare()
  .start();
