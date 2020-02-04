const express = require('express')
const { getAllBlogs, insertBlog, deleteBlog,removeAllBlogs} = require('./database')

const session = require('express-session')
const passport = require('./setuppassport')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'hbs')

// session start karna hoga for using passport
app.use(
    session({
        secret: 'k2h4b 6k24h j6 b24kj6b 24kj6b 2',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
    }),
    )
    // must come after session middleware
    app.use(passport.initialize())
    app.use(passport.session())
    
    app.get('/', (req, res) => {
        getAllBlogs().then(blogs => {
            const blogId = req.query.blog
            const selectedBlog = blogs.find(b => b._id == blogId)
            console.log(selectedBlog)
            
            res.render('index', { blogs, selectedBlog })
        })
        
    })
    
    app.get('/signIn', (req, res) => {
        res.render('signInAsAdmin')
    })
    
    app.post('/signIn', passport.authenticate('local',{
        successRedirect: '/homepage',
        failureRedirect: '/signInAsAdmin'
    })
    )
    
    app.post('/', (req, res) => {
        insertBlog({
            title: req.body.title,
            body: req.body.body
        }).then(result => {
            res.redirect('/homepage/?blog=' + result.ops[0]._id)
        })
    })
    
    function checkLoggedIn(req, res, next) {
        if (req.user) {
            return next()
        }
        res.redirect('/signInAsAdmin')
    }
    
    // checkLoggedIn
    app.get('/homepage',checkLoggedIn, (req, res) => {
        getAllBlogs().then(blogs => {
            const blogId = req.query.blog
            const selectedBlog = blogs.find(b => b._id == blogId)
            // console.log(selectedBlog)
            
            res.render('homepage', { blogs, selectedBlog })
       })
     })

     app.get('/delete', (req, res) => {
         const  blogId = req.query.blogId
         deleteBlog(blogId)
         console.log('deleted blogId:' + blogId)
        
    
           res.redirect('/homepage')
     
    })
    
    //  checkLoggedIn
    app.get('/add',checkLoggedIn, (req, res) => {
        res.render('add')
    })
    
    app.listen(8080, () =>  console.log("app running on 8080"))
       
