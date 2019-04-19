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
    const { username, password, email, name, bio, profile_pic } = req.body;
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
      let user = await db.auth.register({
        username,
        password: hash,
        email,
        name,
        bio,
        profile_pic
      });
      user = user[0];
      session.user = user;
      res.status(200).send(session.user);
    } catch (err) {
      console.log(err);
    }
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
    const { profile_pic, name, bio } = req.body;
    try {
      await db.profile.update_profile({
        profile_pic,
        bio,
        name,
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
    const db = req.app.get("db");
    const { user } = req.session;
    const { session } = req;

    setTimeout(async () => {
      if (user) {
        let newUser = await db.auth.get_user(user.user_id);
        session.user = newUser[0];
        res.status(200).send(newUser[0]);
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
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    const data = await db.survey.get_survey_results(user_id);

    res.status(200).send(data);
  },

  lineGraphResults: async (req, res) => {
    const { user_id } = req.session.user;
    const user_id = 2;
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    
    const data = await db.survey.line_graph_results(user_id);
    console.log(req.session.user)

    res.status(200).send(data);
  }
};
