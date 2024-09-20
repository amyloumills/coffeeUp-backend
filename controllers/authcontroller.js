const {createClient} = require("@supabase/supabase-js");

const supabaseUrl = "https://<your-project-id>.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const signUpUser = async (email, password) => {
  // Create a user with Supabase Auth
  const {user, error} = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  // Insert the user into the custom users table
  const {error: insertError} = await supabase
    .from("users")
    .insert([{id: user.id, email}]); // Use the user ID from Supabase Auth

  if (insertError) {
    throw new Error(insertError.message);
  }

  return user;
};

const loginUser = async (email, password) => {
  const {user, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

module.exports = {
  signUpUser,
  loginUser,
};
