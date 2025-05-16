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
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'hiewhub',
        port: 3306
    })
}

/// RUNNER PART ///

    // Read (Container) ข้อมูลทั้งหมดจาก post ฝั่งผู้รับหิ้ว 
app.get('/post', async (req, res) => {
    try {
        const results = await conn.query('SELECT * FROM runner')
        res.json(results[0])
    } catch (error) {
        console.error("Get posts Error :", error);
    }

})

    // Read (PostRunner) รับข้อมูลโพสต์ทั้งหมดเฉพาะ user ที่ล็อกอิน
app.get('/post/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const [results] = await conn.query('SELECT * FROM runner WHERE user_id = ?', [user_id]);

        res.json(results);
    } catch (error) {
        res.status(500).json({ 
            message: 'Get fetching user posts Error',
            error: error.message });
    }
})


    // Create (FormRunner) เพิ่มข้อมูลที่ผู้ใช้เพิ่มจาก from
app.post('/post', async (req, res) => {
    try {
        const data = req.body;
        const results = await conn.query('INSERT INTO runner SET ?', data);

        res.json({
            message: 'Insert Success',
            data: results
        });
    } catch (error) {
        res.status(500).json({
            message: "error somthing wrong",
            errorMessage: error.message
        })

    }
});


    // Update (EditRunner) 
app.put('/post/:id', async (req, res) => {
    try {
        let id = req.params.id
        let updateUser = req.body

        const results = await conn.query('UPDATE runner SET ? WHERE id = ?', [updateUser, id]);

        res.json({
            message: 'Update Success',
            data: results[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "error somthing wrong",
            errorMessage: error.message
        })

    }
})


    // Delete (PostRunner)
app.delete('/post/:id', async (req, res) => {
    try {
        let id = req.params.id

        const [results] = await conn.query('DELETE FROM runner WHERE id = ?', [id]);

        res.json({
            message: 'Delete sucsess',
            data: results[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "error somthing wrong",
            errorMessage: error.message
        })

    }
})





/// FIND PART ///

    // Read (ContainerFind) ข้อมูลทั้งหมดจาก post ฝั่งผู้ตามหา 
app.get('/find', async (req, res) => {
    try {
        const results = await conn.query('SELECT * FROM find')
        res.json(results[0])
    } catch (error) {
        console.error("Error fetching posts:", error);
    }

})


    // Read (PostFind) รับข้อมูลโพสต์ทั้งหมดเฉพาะ user ที่ล็อกอิน
app.get('/find/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const [results] = await conn.query('SELECT * FROM find WHERE user_id = ?', [user_id]);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user posts', error: error.message });
    }
})


    // Create (FormFind) เพิ่มข้อมูลที่ผู้ใช้เพิ่มจาก from
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
            message: "error somthing wrong",
            errorMessage: error.message
        })
    }
});

    // Update (EditFind)  
app.put('/find/:id', async (req, res) => {
    try {

        let id = req.params.id
        let updateUser = req.body

        const results = await conn.query('UPDATE find SET ? WHERE id = ?', [updateUser, id]);

        res.json({
            message: 'Update Success',
            data: results[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "error somthing wrong",
            errorMessage: error.message
        })

    }
})


    // Delete (PostFind)
app.delete('/find/:id', async (req, res) => {
    try {
        let id = req.params.id

        const [results] = await conn.query('DELETE FROM find WHERE id = ?', [id]);

        res.json({
            message: 'Delete sucsess',
            data: results[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "error somthing wrong",
            errorMessage: error.message
        })

    }
})



/// SIGN IN ///

    // (SignIn) ตรวจสอบรหัสผ่าน และสร้าง token
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const [results] = await conn.query('SELECT * from users where email = ?', [email])
        const userData_db = results[0]

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

        const token = jwt.sign({ email, role: 'admin' }, secret, { expiresIn: '1h' })

        if (userData_db.password == password) {
            res.json({
                message: 'Login successful',
                token : token,
                user: {
                    id: userData_db.id,
                    user_id: userData_db.user_id,
                    email: userData_db.email,
                    username: userData_db.username
                }
            });
        }
    } catch {
        console.error(error);
        res.status(500).json({
            message: 'error something wrong',
            errorMessage: error.message
        });
    }
})

    // เก็บข้อมูล (SignIn) ตรวจสอบ token และรับ user
app.get('/api/users', async (req, res) => {
    try {
        const authHeader = req.headers['authorization']
        let authToken = ''

        if (authHeader) {
            authToken = authHeader.split(' ')[1]
        }

        const user = jwt.verify(authToken, secret)
        const [CheckUser] = await conn.query('SELECT * FROM users where email = ?', user.email)

        if (!CheckUser[0]) {
            throw { message: 'user not found' }
        }

        const [results] = await conn.query('SELECT * FROM users')
        res.json({
            user: results
        })

    } catch (error) {
        res.status(403).json({
            message: 'Authentication fail',
            error
        })
    }
})


/// SIGN UP ///

    // (SignUp) สร้าง user
app.post('/api/register', async (req, res) => {
    try {
        const data = req.body;
        const results = await conn.query('INSERT INTO users SET ?', data);

        res.json({
            message: 'Insert Success',
            data: results
        });
    } catch (error) {
        res.status(500).json({
            message: "error somthing wrong",
            errorMessage: error.message
        })
    }
});

const port = 3000
app.listen(port, async (req, res) => {
    await initMySQL()
    console.log('http sever run at : ' + port)
})