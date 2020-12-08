module.exports = (sequelize, DataTypes) => {
    const login = sequelize.define("login", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      votecount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isadmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      voted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
    });

    //foreign key
  login.associate = models => {
    login.hasOne(models.candidatedetails, {
      foreignKey: 'loginid'
    });
    };
    return login;
  };