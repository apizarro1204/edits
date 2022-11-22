import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import hbs from "express-handlebars";
import bCrypt from "bcrypt";
import mongoose from "mongoose";
import UsuariosSchema from "../ejercicio/models/estudiantes.model.js";

//passport imports
import passport from "passport";
import { Strategy } from "passport-local";

const localStrategy = Strategy;

const app = express();

//servidor
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*----------- Session -----------*/
app.use(cookieParser());
app.use(
	session({
		secret: "SECRETO",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 10000, //10 mins seg
		},
	})
);

//middlewares passport
app.use(passport.initialize());
app.use(passport.session());

//estrategias
passport.use(
	"register",
	new localStrategy(
		{ passReqToCallback: true },
		async (req, username, password, done) => {
			console.log("Potopeo", username + password);
			mongoose.connect(
				"mongodb+srv://Apizarro:darbeta12@cluster0.ho8uwm4.mongodb.net/?retryWrites=true&w=majority"
			);
			
			try {
				UsuariosSchema.create(
					{
						username,
						password: createHash(password),
						direccion: req.body.direccion,
					},
					(err, userWithId) => {
						if (err) {
							console.log(err)
							return done(err, null);
						}
						return done(null, userWithId);
					}
				);
			} catch (e) {
				return done(e, null);
			}
		}
	)
);

passport.use(
	"login",
	new localStrategy((username, password, done) => {
		mongoose.connect(
			"mongodb+srv://Apizarro:darbeta12@cluster0.ho8uwm4.mongodb.net/?retryWrites=true&w=majority"
		);
		try {
			UsuariosSchema.findOne(
				{
					username,
				
				},
				(err, user) => {
					if (err) {
						return done(err, null);
					}
					

					if (!user){
						return done(null, false)
					}

					if(!isValidPassword(user, password)){
						return done(null, false)
					}

					return done(null, user)
				}
			);
		} catch (e) {
			return done(e, null);
		}
	})
);

//serializar y deserializar

passport.serializeUser((usuario, done) => {
	console.log(usuario);
	done(null, usuario._id);
});

passport.deserializeUser((id, done) => {
	UsuariosSchema.findById(id, done);
});

//
function createHash(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
	return bCrypt.compareSync(password, user.password);
}
   
// motor de vistas
app.set("views", "./src/views");

app.engine(
	".hbs",
	hbs.engine({
		defaultLayout: "main",
		layoutsDir: "./src/views/layouts",
		extname: ".hbs",
	})
);
app.set("view engine", ".hbs");
//rutas
app.get("/login", (req, res) => {
	res.render("login");
});

app.post(
	"/login",
	passport.authenticate("login", {
		successRedirect: "/datos",
		failureRedirect: "/login-error",
	})
);

app.get("/login-error", (req, res) => {
	res.render("login-error");
});

app.get("/registrar", (req, res) => {
	res.render("register");
});

app.get("/datos", (req, res) => {
	res.json({mensaje: 'sesion iniciada'});
});

app.post(
	"/registrar",
	passport.authenticate("register", {
		successRedirect: "/login",
		failureRedirect: "/login-error",
	})
);

//servidor
app.listen(8181, () => {
	console.log("servidor levantado");
});
