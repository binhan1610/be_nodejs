const express = require('express')
const mongoose = require('mongoose')
const { userRouter } = require('./routes/user')
const jwt = require('jsonwebtoken')
const { users, userModel } = require('./models/user')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const authenticationCheck = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, '123@lol');
    
    const { username } = decoded
    // Check user co trong co so du lieu khong 
    const user = await userModel.findOne({ username: username })

    if (user) {
        req.user = user
        next()
    } else {
        res.send('User khong ton tai')
    }
}

app.use('/users', authenticationCheck, userRouter)
// app.use('/song', songRouter)

app.get('/', (req, res) => {
    res.send('Home router')
})

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        // kiểm tra trong db
        const user = await userModel.findOne({ username })
        
        // nếu có người dùng thì tạo token, ngược lại trả về lỗi
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ username: username }, '123@lol')
            // Tra token cho client
            res.send(token)
        } else {
            console.log(req.body);
            res.send('khong tim thay')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Đã có lỗi xảy ra');
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        // check trùng username trong db 
        const existingUser = await userModel.findOne({ username })
        // nếu trùng thì không cho tạo , nếu không trùng thì tạo user 
        // tim user có usename == req.body.username
        // nếu tồn tại thì res.send('user da ton tại )
        // nếu ko thì create
        if (existingUser) {
            res.send('user đã tồn tại')
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password,salt)
            const user = await userModel.create({ username, password: hashPassword, role: ['user'] })
            res.send(user)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Có lỗi xảy ra!')
    }
})
app.put('/update', async (req, res) => {
    const { username, password } = res.body
})

app.listen(3001)
console.log('Server running')
module.exports = { app }