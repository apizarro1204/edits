import express from "express";
//import { createHash } from "crypto";
import mongoose from "mongoose";
import UserModel from "./../models/userSchema.js"
//import { createHash, isValidPassword } from "./bCryptPass.js";
import bCrypt from "bCrypt"

import passport from "passport";
import { Strategy } from "passport-local";


const localStrategy = Strategy;



passport.use("register", new localStrategy(
    { passReqToCallback: true},
    async (req, username, password, done) => {
        console.log("User Registred has", username + " " + password);
        mongoose.connect("mongodb+srv://Apizarro:darbeta12@cluster0.ho8uwm4.mongodb.net/?retryWrites=true&");

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
            console.log("Este try de register")
        } catch (error) {
            console.log({ error: 'Usuario ya existe' })
            return done(error, null);
        }
    }));

passport.use("login",
    new localStrategy({passReqToCallback: true, usernameField: 'username', passwordField: 'password'},(req, username, password, done) => {
        mongoose.connect("mongodb+srv://Apizarro:darbeta12@cluster0.ho8uwm4.mongodb.net/?retryWrites=true&");
        try{
            UserModel.findOne({username},(err, user)=>{
                if(err){
                    return done(err, null)
                }
                if(!user){
                    return done(null, false)
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



passport.serializeUser((usuario, done) => {
	console.log(usuario);
	done(null, usuario.username);
});

passport.deserializeUser((id, done) => {
	UserModel.findById(id, done);
});

function createHash(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10),null)
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password)
}

export default passport;