const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

const {createClient} = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// middleware to limit the number of requests

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/coffee", async (req, res) => {
  const {data, error} = await supabase.from("Coffee").select("*");

  if (error) {
    return res.status(500).json({error: error.message});
  }

  res.json(data);
});

app.post("/coffee", async (req, res) => {
  const newCoffee = req.body;

  try {
    const {data, error} = await supabase.from("Coffee").insert([newCoffee]);

    if (error) {
      return res.status(500).json({error: error.message});
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.put("/coffee/:id", async (req, res) => {
  const {id} = req.params;
  const updatedCoffee = req.body;

  try {
    const {error} = await supabase
      .from("Coffee")
      .update(updatedCoffee)
      .eq("id", id);

    if (error) {
      return res.status(500).json({error: error.message});
    }

    res.status(200).json({message: "Coffee updated successfully"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.delete("/coffee/:id", async (req, res) => {
  const {id} = req.params;

  try {
    const {error} = await supabase.from("Coffee").delete().eq("id", id);

    if (error) {
      return res.status(500).json({error: error.message});
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});
