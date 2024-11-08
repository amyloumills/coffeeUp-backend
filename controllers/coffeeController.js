require("dotenv").config();

const {createClient} = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const getCoffee = async (req, res) => {
  const {userId} = req.params;
  if (!userId) {
    return res.status(400).json({error: "Missing user id"});
  }
  const {data, error} = await supabase
    .from("Coffee")
    .select("*")
    .eq("userId", userId);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
};

const addCoffee = async (req, res) => {
  const newCoffee = req.body;
  const { data, error } = await supabase.from("Coffee").insert([newCoffee]);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data);
};

const updateCoffee = async (req, res) => {
  const { id } = req.params;
  const updatedCoffee = req.body;
  const { error } = await supabase.from("Coffee").update(updatedCoffee).eq("id", id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json({ message: "Coffee updated successfully" });
};

const deleteCoffee = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("Coffee").delete().eq("id", id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(204).end();
};

module.exports = {
  getCoffee,
  addCoffee,
  updateCoffee,
  deleteCoffee,
};
