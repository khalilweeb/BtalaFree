import TokenPack from "../models/TokenPack.js";

export const createPack = async (req, res) => {
  try {
    const { name, tokens, priceTND, isActive } = req.body;
    const pack = await TokenPack.create({ name, tokens, priceTND, isActive });
    res.status(201).json(pack);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const updatePack = async (req, res) => {
  try {
    const pack = await TokenPack.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pack) return res.status(404).json({ message: "Pack not found" });
    res.json(pack);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const deletePack = async (req, res) => {
  try {
    const pack = await TokenPack.findByIdAndDelete(req.params.id);
    if (!pack) return res.status(404).json({ message: "Pack not found" });
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const listPacks = async (req, res) => {
  try {
    const packs = await TokenPack.find();
    res.json(packs);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
