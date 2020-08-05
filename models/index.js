const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});
const { STRING, TEXT, ENUM } = Sequelize;

const Page = db.define('page', {
  title: {
    type: STRING,
    allowNull: false
  },
  slug: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: TEXT,
    allowNull: false
  },
  status: ENUM('open', 'closed')
});

const User = db.define('user', {
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false,
    isEmail: true
  }
});

// Page.beforeValidate(page => {
//   set slug name if there isn't one based on the title of the page
// })

Page.belongsTo(User, { as: "author" })

module.exports = {
  db, Page, User
}
