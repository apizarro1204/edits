import express from "express"
import session from "express-session"
import path from 'path'
import MongoStore from 'connect-mongo'
import config from '../../../connection.js';
import { webAuth } from "../../auth/index.js";



const router = express.Router();

router.use(session({ // definir conexión mongoStore
    //store: MongoStore.create({ mongoUrl: config.mongoLocal.cxnStr }),
    secret: 'a',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cxnStr }),
    cookie: {
        maxAge: 60000
    }
}))


router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/home', webAuth, (req, res) => {
    const username = req.session?.username
    res.render(path.join(process.cwd(), '/views/home.ejs'),{username}) 
})


router.get('/login', (req, res) => {
    const username = req.session?.username
    if (username) {
        res.redirect('/home')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/partials/login.html'))
    }
})

router.get('/logout', (req, res) => {
    const username = req.session?.username
    if (username) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/views/logout.ejs'), {username})
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
});

router.post('/login', (req, res) => {
    console.log(req.session)
    console.log(req.body)

    req.session.username = req.body.username

    res.redirect('/home')
})

export default router;