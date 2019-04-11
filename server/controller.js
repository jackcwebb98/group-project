const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const { session } = req;
    const db = req.app.get("db");
    let user = await db.auth.login({ username });

    user = user[0];

    if (!user) {
      return res.sendStatus(404);
    }
    let authenticated = bcrypt.compareSync(password, user.password);
    console.log({ authenticated });
    if (authenticated) {
      delete user.password;
      session.user = user;

      res.status(200).send(session.user);
    } else {
      res.sendStatus(401);
    }
  },

  register: async (req, res) => {
    console.log(req.body)
    const { username, password, email } = req.body;
    const { session } = req;
    const db = req.app.get("db");
    let takenUsername = await db.auth.check_username({ username });
    let takenEmail = await db.auth.check_email({ email });
    takenEmail = +takenEmail[0].count
    takenUsername = +takenUsername[0].count;
    try {
      if (takenUsername != 0) {
        return res.send("username");
      }
      if (takenEmail !=0){
        return res.status(409).send("email")
      }
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);
      let user = await db.auth.register({ username, password: hash, email });
      user = user[0];
      session.user = user;

      res.status(200).send("register working");
    } catch (err) {
      console.log(err);
    }
  },

  accountCreation: async (req, res) => {
    const { profile_pic, bio } = req.body;
    const { session } = req;
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    let user = await db.auth.accountCreation({ profile_pic, bio, user_id });
    user = user[0];
    session.user = user;
    res.status(200).send("accountCreation working");
  },

  getProfile: async (req, res) => {
    let { user_id } = req.params;
    user_id = parseInt(user_id)
    console.log(user_id)
    const db = req.app.get("db");
    try {
        let profile = await db.profile.get_profile({ user_id });
        res.status(200).send(profile);
    } catch (err) {
        console.log(err)
    }
  },

  updateProfile: async (req, res) => {
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    const { profile_pic } = req.body;
    try {
      let updatedUser = await db.profile.update_profile({
        profile_pic,
        user_id
      });
      console.log(updatedUser);
      res.status(200).send("profile updated");
    } catch (err) {
      console.log(err);
    }
  },

  landingPage: async (req, res) => {
    const db = req.app.get("db");
    try {
      let allUsers = await db.profile.get_all_users();
      res.status(200).send(allUsers)
    } catch (err) {
      console.log(err);
    }
  },

  surveyQuestions: async (req, res) => {
    const db = req.app.get("db");
    try {
        let allQuestions = await db.survey.get_all_questions();
        res.status(200).send(allQuestions)
    } catch (err) {
        console.log(err)
    }
  },

  currentUser: async (req, res) =>{
    setTimeout(() => {
        const { user } = req.session;
        if (user) {
          res.status(200).send(user);
        } else {
          res.send('no user')
        }
      }, 0);
  }
};
