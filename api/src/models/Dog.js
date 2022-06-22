const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura_max:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    altura_min:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    peso_max:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    peso_min:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    años_de_vida:{
      type: DataTypes.STRING
    },
    imagen: {
      type: DataTypes.STRING,
    }
  },{
    timestamps: false
  });
  
};

 
