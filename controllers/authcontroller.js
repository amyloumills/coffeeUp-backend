const {createClient} = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const signUpUser = async (email, password) => {
  const {user, error} = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const {error: insertError} = await supabase
    .from("users")
    .insert([{id: user.id, email}]);

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
