const express = require('express')
const app = express()
app.use(express.json());

const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')

const cors = require('cors');  
const { use } = require('react');
app.use(cors());

const jwt = require('jsonwebtoken')
const session = require("express-session");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }),
);

const secret = "mysecret";

let conn = null
const initMySQL = async () => {
    conn = await mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hiewhub',
    port : 3306
    })
}

/// RUNNER

// Read ข้อมูลทั้งหมดจาก post
app.get('/post', async (req, res) => {
    try {
    // get post ในรูปแบบ json
    const results = await conn.query('SELECT * FROM runner')
    res.json(results[0])
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
    
})

app.get('/post/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const [results] = await conn.query('SELECT * FROM runner WHERE user_id = ?', [user_id]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user posts', error: error.message });
  }
})


// Creat ข้อมูลลงใน posts
app.post('/post', async (req, res) => {
    try {
        const data = req.body;
        console.log(data)    
        const results = await conn.query('INSERT INTO runner SET ?', data);

        res.json({
            message: 'Insert Success',
            data: results
    });    
    } catch (error) {
        res.status(500).json({
          message : "error somthing wrong",
          errorMessage : error.message
        })
        
    }
});



// Update 
app.put('/post/:id', async (req, res) => {
    try {
        // รับค่า id จาก param
        let id = req.params.id
        // updateUser = อ่านข้อมูลจากหน้า body
        let updateUser = req.body

        const results = await conn.query('UPDATE runner SET ? WHERE id = ?', [updateUser, id]);

        res.json({
            message: 'Update Success',
            data: results[0]
    })
    } catch (error) {
        res.status(500).json({
          message : "error somthing wrong",
          errorMessage : error.message
        })
        
    }
})



// delete 
app.delete('/post/:id', async (req, res) => {
    try {
        let id = req.params.id
        let user_id = req.params.user_id


        const [results] = await conn.query('DELETE FROM runner WHERE id = ?', [id]);

        res.json({
            message: 'Delete sucsess',
            data: results[0]
    })
    } catch (error) {
        res.status(500).json({
          message : "error somthing wrong",
          errorMessage : error.message
        })
        
    }
})




// FINDDDDD

// Read ข้อมูลทั้งหมดจาก FIND
app.get('/find', async (req, res) => {
    try {
    // get post ในรูปแบบ json
    const results = await conn.query('SELECT * FROM find')
    res.json(results[0])
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
    
})


app.get('/find/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const [results] = await conn.query('SELECT * FROM find WHERE user_id = ?', [user_id]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user posts', error: error.message });
  }
})


// Crate ข้อมูลลงใน posts
app.post('/find', async (req, res) => {
    try {
        const data = req.body;
        console.log(data)    
        const results = await conn.query('INSERT INTO find SET ?', data);

        res.json({
            message: 'Insert Success',
            data: results
    });    
    } catch (error) {
        res.status(500).json({
          message : "error somthing wrong",
          errorMessage : error.message
        })
    }
});

// Update 
app.put('/find/:id', async (req, res) => {
    try {
        // รับค่า id จาก param
        let id = req.params.id
        // updateUser = อ่านข้อมูลจากหน้า body
        let updateUser = req.body

        const results = await conn.query('UPDATE find SET ? WHERE id = ?', [updateUser, id]);

        res.json({
            message: 'Update Success',
            data: results[0]
    })
    } catch (error) {
        res.status(500).json({
          message : "error somthing wrong",
          errorMessage : error.message
        })
        
    }
})


app.delete('/find/:id', async (req, res) => {
    try {
        let id = req.params.id
        let user_id = req.params.user_id


        const [results] = await conn.query('DELETE FROM find WHERE id = ?', [id]);

        res.json({
            message: 'Delete sucsess',
            data: results[0]
    })
    } catch (error) {
        res.status(500).json({
          message : "error somthing wrong",
          errorMessage : error.message
        })
        
    }
})



/// sign in

app.post('/api/login', async (req, res) => {
    try {

        const { email, password } = req.body
        console.log(email)
        
        const [results] = await conn.query('SELECT * from users where email = ?', [email])
        const userData_db = results[0]
        console.log(userData_db)


        if (!userData_db) {
            return res.status(401).json({
                message: 'User not found'
            });
        }

        if (userData_db.password !== password) {
            return res.status(401).json({
                message: 'Incorrect password'
            });
        }
        const token = jwt.sign({ email, role: 'admin'}, secret, { expiresIn: '1h'})

        if (userData_db.password == password) {
            res.json({
            message: 'Login successful',
            token,
            user: {
                id: userData_db.id,
                user_id : userData_db.user_id,
                email: userData_db.email,
                username: userData_db.username
            }
        });
        }


    } catch {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const authHeader = req.headers['authorization']
        let authToken = ''
       
        if (authHeader) {
            authToken = authHeader.split(' ')[1]
        } 
        console.log(authToken)
        const user = jwt.verify(authToken, secret)
        console.log(user)

        
        const [Checkresults] = await conn.query('SELECT * FROM users where email = ?', user.email)

        if (!Checkresults[0]) {
            throw { message: 'user not found'}
        }
        console.log(Checkresults)

        const [results] = await conn.query('SELECT * FROM users')
        res.json({
            user : results
        })

    } catch (error) {
        console.log('error', error)
        res.status(403).json({
            message: 'Authentication fail',
            error
        })
    }
})


/// sign up

app.post('/api/register', async (req, res) => {
    try {
        const data = req.body;
        console.log(data)    
        const results = await conn.query('INSERT INTO users SET ?', data);

        res.json({
            message: 'Insert Success',
            data: results
    });    
    } catch (error) {
        res.status(500).json({
          message : "error somthing wrong",
          errorMessage : error.message
        })
    }
});

const port = 3000
app.listen(port, async (req, res) => {
    await initMySQL()
    console.log('http sever run at : ' + port)
})