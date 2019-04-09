const bcrypt = require('bcryptjs')

module.exports = {


  login: async (req, res) => {
      const {username, password} = req.body
      const {session} = req;
      const db = req.app.get('db');
      let user = await db.auth.login({username})

      user= user[0]

      if (!user) {
          return (res.sendStatus(404))
      }
      let authenticated = bcrypt.compareSync(password, user.password);
      console.log({authenticated})
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
        const db = req.app.get('db');
        let takenUsername = await db.auth.check_username({username});
        takenUsername = +takenUsername[0].count;
        
        if(takenUsername !== 0){
            return (res.sendStatus(409))
        }
            
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let user = await db.auth.register(
            {username, email, password: hash});
            user = user[0];
            session.user = user;
        
        res.status(200).send('register working')
    },

    accountCreation: async (req, res) => {
        const { profile_pic, bio } = req.body;
        const { session } = req;
        const db = req.app.get('db');
        

        let user = await db.auth.accountCreation({profile_pic, bio});
            user = user[0];
            session.user = user;
        
        res.status(200).send('accountCreation working')
    },

      

}
