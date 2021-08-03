const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Meet Your Goals',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({
    helpers: {
        checkMilestoneStatus: function(milestone, options) {
            switch (milestone.status) {
                case "To Do":
                    return ('<i class="fas fa-list-ul" id="icon"></i>');
                case "In Progress":
                    return ('<i class="fas fa-check text-success" id="icon"></i>');
                case "Complete":
                    return ('<i class="fas fa-medal fa-4x text-primary" id="icon"></i>');
            }
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening - If local --- http://localhost:${PORT}`));
});