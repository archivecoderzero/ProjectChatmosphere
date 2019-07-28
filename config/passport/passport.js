//load bcrypt
const bCrypt = require('bcrypt-nodejs');

module.exports = (passport, user) => {
  const User = user;
  const LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  // used to deserialize the user
  passport.deserializeUser((username, done) => {
    User.findById(username).then(user => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function (req, username, password, done) {
        var generateHash = password => {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        console.log(req.body.password)
        console.log(req.body.password2)
        User.findOne({ where: { username: username } }).then(user => {
          if (user) {
            return done(null, false, {
              message: "That username is already taken"
            });
          }
          else if (req.body.password !== req.body.password2) {
            return done(null, false, {
              message: "Passwords don't match"
            });
          }
          else {
            var userPassword = generateHash(password);
            var data = {
              username: username,
              password: userPassword
            };

            User.create(data).then((newUser, created) => {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  //LOCAL LOGIN
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function (req, username, password, done) {
        var User = user;

        var isValidPassword = (userpass, password) => {
          return bCrypt.compareSync(password, userpass);
        };

        User.findOne({ where: { username: username } })
          .then(user => {
            if (!user) {
              return done(null, false, { message: 'Username does not exist' });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, { message: 'Incorrect password, try again!' });
            }

            var userinfo = user.get();

            return done(null, userinfo);
          })
          .catch(err => {
            console.log('Error:', err);

            return done(null, false, {
              message: 'Something went wrong with your login'
            });
          });
      }
    )
  );
};