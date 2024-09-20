require("dotenv").config();
const {createClient} = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const testConnection = async () => {
  try {
    const {data, error} = await supabase.from("Coffee").select("*");

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      console.log("Data fetched successfully:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

testConnection();
