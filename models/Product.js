// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
const {type} = require('express/lib/response');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
    },
    product_name:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    price:{
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        isDecimal:true,
      }
      //validates that value is decimal
    },
    stock:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:10,
      validate:{
        isNumeric:true,
      }
      //default value of 10
      //validates that value is numeric
    },
    category_id:{
      type:DataTypes.INTEGER,
      foreignKey:true,
      references:{
        model:'category',
        key:'id',
        unique:false,
      }
      //references categories models id
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
