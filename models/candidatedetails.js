module.exports = (sequelize, DataTypes) => {
  const candidatedetails = sequelize.define("candidatedetails", {
    loginid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    challengessolved: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    expertlevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    algorithm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    c: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    java: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    phyton: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  });
  //foreign key
  candidatedetails.associate = models => {
    candidatedetails.belongsTo(models.login, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return candidatedetails;
};