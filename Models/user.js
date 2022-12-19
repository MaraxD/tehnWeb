import {sequelize} from "../sequelize.js"
import { DataTypes } from "sequelize"

const User=sequelize.define("user",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        validate:{
            isEmail:true,
            mailValidation(value){
                if(!value.includes("@stud.ase.ro")){
                    throw new Error("you didn t log in with the faculty email")
                }
            }
        }
    },
    phoneNr:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            phoneValidation(number){
                if(number.length<10){
                    throw new Error("invalid phone number")
                }
            }
        }
    },
    enrlYear:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{len:[4]}
    },
    finishYear:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{len:[4]}
    }
});


export {User}