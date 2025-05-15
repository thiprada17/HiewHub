// const express = require('express')
// const app = express()
// app.use(express.json());

// const bodyParser = require('body-parser')
// const mysql = require('mysql2/promise')

// const cors = require('cors');  
// app.use(cors());

// let conn = null
// const initMySQL = async () => {
//     conn = await mysql.createConnection ({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'hiewhub',
//     port : 3306
//     })
// }


// // Read ข้อมูลทั้งหมดจาก post
// app.get('/post', async (req, res) => {
//     try {
//     // get post ในรูปแบบ json
//     const results = await conn.query('SELECT * FROM find')
//     res.json(results[0])
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//     }
    
// })


// // Crate ข้อมูลลงใน posts
// app.post('/post', async (req, res) => {
//     try {
//         const data = req.body;
//         console.log(data)    
//         const results = await conn.query('INSERT INTO find SET ?', data);

//         res.json({
//             message: 'Insert Success',
//             data: results
//     });    
//     } catch (error) {
//         res.status(500).json({
//           message : "error somthing wrong",
//           errorMessage : error.message
//         })
        
//     }
// });


// // // Update 
// // app.put('/post/:id', async (req, res) => {
// //     try {
// //         // รับค่า id จาก param
// //         let id = req.params.id
// //         // updateUser = อ่านข้อมูลจากหน้า body
// //         let updateUser = req.body

// //         const results = await conn.query('UPDATE find SET ? WHERE id = ?', [updateUser, id]);

// //         res.json({
// //             message: 'Update Success',
// //             data: results[0]
// //     })
// //     } catch (error) {
// //         res.status(500).json({
// //           message : "error somthing wrong",
// //           errorMessage : error.message
// //         })
        
// //     }
// // })


// // // delete 
// // app.delete('/post/:id', async (req, res) => {
// //     try {
// //         // รับค่า id จาก param
// //         let id = req.params.id

// //         const [results] = await conn.query('DELETE FROM find WHERE id = ?', [id]);

// //         res.json({
// //             message: 'Delete sucsess',
// //             data: results[0]
// //     })
// //     } catch (error) {
// //         res.status(500).json({
// //           message : "error somthing wrong",
// //           errorMessage : error.message
// //         })
        
// //     }
// // })


// const port = 8000
// app.listen(port, async (req, res) => {
//     await initMySQL()
//     console.log('http sever run at : ' + port)
// })