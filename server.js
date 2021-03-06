const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '1',
            name: 'Varda Quraishi',
            email: 'vardaquraishi.vq@gmail.com',
            password: 'Oranges',
            entries: 0,
            date: new Date()
        },
        {
            id: '2',
            name: 'Asad Imtiaz Rana',
            email: 'asadimtiaz711@gmail.com@gmail.com',
            password: 'Apples',
            entries: 0,
            date: new Date()
        },
        {
            id: '3',
            name: 'Abdul Hadi Abid',
            email: 'hadi98abdul@gmail.com@gmail.com',
            password: 'Bananas',
            entries: 0,
            date: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('Success');
    }else{
        res.status(400).json('Error Logging In')
    }
})
app.post('/register', (req, res) =>{
    const { email, name, password } = req.body;
    database.users.push(
        {
            id: '4',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        }
    )
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;

    database.users.forEach(user => {
        if(id === user.id){
            return res.json(user)
        }
    })

    res.status(404).json('User Not Found');
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    
    database.users.forEach(user => {
        if(id === user.id){
            user.entries++;
            return res.json(user.entries);
        }
    })

    res.status(404).json('User Not Found');
})

app.listen(3000, () => {
    console.log('App is running on port 3000')
});