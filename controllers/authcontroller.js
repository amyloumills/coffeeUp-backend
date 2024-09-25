const {createClient} = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const signUpUser = async (email, password) => {
  const {user, error: signUpError} = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    console.error("sign-up error", signUpError);
    throw new Error(
      `Sign-up failed: ${signUpError.message || "Unknown error"}`
    );
  }

  const {error: insertError} = await supabase
    .from("users")
    .insert([{id: user.id, email}]);

  if (insertError) {
    console.error("Database insert error: ", insertError);
    throw new Error(
      `Failed to insert user into database: ${
        insertError.message || "Unknown error"
      }`
    );
  }

  return user;
};

const loginUser = async (email, password) => {
  const {user, error: loginError} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    console.error("Login error: ", loginError);
    throw new Error(`Login failed: ${loginError.message || "Unknown error"}`);
  }

  return user;
};

module.exports = {
  signUpUser,
  loginUser,
};
