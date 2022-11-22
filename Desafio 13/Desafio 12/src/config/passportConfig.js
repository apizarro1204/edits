import bCrypt from "bcrypt";
import { createHash } from "crypto";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy } from "passport";
import UserModel from "./../models/userSchema.js"
import { createHash, isValidPassword } from "./bCryptPass.js";


passport.use("register", new localStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
        console.log("User Registred has", username + " " + password);
        mongoose.connect(process.env.DB_MONGO);

        try {
            UserModel.create(
                {
                    username,
                    password: createHash(password),
                    address: req.body.address
                },
                (err, userWithId) => {
                    if (err) {
                        console.log(`User already exist: ${err}`)
                        return done(err, null);
                    }
                    return done(null, userWithId);
                }
            );
        } catch (error) {
            console.warning({ error: 'Usuario ya existe' })
            return done(error, null);
        }
    }));

passport.use("login",
    new localStrategy((username, password, done) => {
        mongoose.connect(process.env.DB_MONGO);
        try{
            UserModel.findOne({username},(err, user)=>{
                if(err){
                    return done(err, null)
                }
                if(!user){
                    return Node(null, false)
                }
                if(!isValidPassword(user, password)){
                    return done(null, false)
                }
                return done(null, user)
            });
        }catch(error){
            console.log({error: 'No se pudo validar usuario'})
            return done(error, null);
        }
}));



