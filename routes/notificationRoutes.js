const express = require("express");
const router = express.Router();
const supabase = require("../models/supabase");

router.get("/retards", async (req, res) => {
  const MOIS = [
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
  ];

  const { data: eleves, error } = await supabase
    .from("eleves")
    .select("*, parents(*)");

  if (error) return res.status(400).json({ error: error.message });

  const resultats = [];

  for (const eleve of eleves) {
    const { data: paiements } = await supabase
      .from("paiements")
      .select("mois")
      .eq("eleve_id", eleve.id);

    const moisPayes = paiements.map((p) => p.mois);
    const impayes = MOIS.filter((m) => !moisPayes.includes(m));

    if (impayes.length > 0 && eleve.parents) {
      resultats.push({
        eleve: eleve.nom,
        parent: eleve.parents.nom,
        telephone: eleve.parents.telephone,
        telegram_id: eleve.parents.telegram_id,
        mois_impayes: impayes,
        nb_impayes: impayes.length,
        montant_du: impayes.length * 15000,
      });
    }
  }

  res.json(resultats);
});

module.exports = router;
