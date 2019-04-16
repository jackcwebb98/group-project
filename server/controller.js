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
    if (authenticated) {
      delete user.password;
      session.user = user;

      res.status(200).send(session.user);
    } else {
      res.sendStatus(401);
    }
  },

  register: async (req, res) => {
    const { username, password, email } = req.body;
    const { session } = req;
    const db = req.app.get("db");
    let takenUsername = await db.auth.check_username({ username });
    let takenEmail = await db.auth.check_email({ email });
    takenEmail = +takenEmail[0].count;
    takenUsername = +takenUsername[0].count;
    try {
      if (takenUsername != 0) {
        return res.send("username");
      }
      if (takenEmail != 0) {
        return res.status(409).send("email");
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
    user_id = parseInt(user_id);
    const db = req.app.get("db");
    try {
      let profile = await db.profile.get_profile({ user_id });
      res.status(200).send(profile);
    } catch (err) {
      console.log(err);
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
      res.status(200).send("profile updated");
    } catch (err) {
      console.log(err);
    }
  },

  landingPage: async (req, res) => {
    const db = req.app.get("db");
    try {
      let allUsers = await db.profile.get_all_users();
      res.status(200).send(allUsers);
    } catch (err) {
      console.log(err);
    }
  },

  surveyQuestions: async (req, res) => {
    const db = req.app.get("db");
    try {
      let allQuestions = await db.survey.get_all_questions();
      res.status(200).send(allQuestions);
    } catch (err) {
      console.log(err);
    }
  },

  currentUser: async (req, res) => {
    setTimeout(() => {
      const { user } = req.session;
      if (user) {
        res.status(200).send(user);
      } else {
        res.send("no user");
      }
    }, 0);
  },

  logout: (req, res) => {
    req.session.destroy(function() {
      res.sendStatus(200);
    });
  },

  surveySubmit: (req, res) => {
    const { answerArray, questionee_id, date } = req.body;
    const { user_id } = req.session.user;
    const db = req.app.get("db");

    for (let i = 0; i <= answerArray.length; i++) {
      if (answerArray[i]) {
        Object.keys(answerArray[i]).forEach(key => {
          let question_id = key;
          let answer_id = answerArray[i][key];
          db.survey.survey_submit({
            question_id,
            answer_val: answer_id,
            user_id,
            questionee_id,
            date
          });
        });
      }
    }
  },

  surveyResults: async (req, res) => {
    // const { user_id } = req.session.user;
    const user_id = 2
    const db = req.app.get("db");
    const data = await db.survey.get_survey_results(user_id);

    res.status(200).send(data);
  }
};