const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 8080;

const users = [
  {
    id: "1",
    name: "Xiyare",
    surname: "Balakisiyeva",
    age: "32",
    password:"xiyare32",
    email: "xiyare.balakisi@mail.ru",
   
  },
  {
    id: "2",
    name: "Qiymexanim",
    surname: "Pirmemmedquluzade",
    age: "32",
    password:"qiymexanim32",
    email: "qiymexanim@gmail.com",
    
  },
  {
    id: "3",
    name: "Setka",
    surname: "Agabalayeva",
    password:"setka32",
    age: "32",
    email: "setka.agabalanski@code.edu.az",
    
  },
  {
    id: "4",
    name: "Ördək",
    surname: "Xasiyeva",
    password:"ordek32",
    age: "32",
    email: "xasiyeva.ordek@gmail.com",
    
  },
  {
    id: "5",
    name: "Rac",
    surname: "Memmedov",
    age: "32",
    password:"rackapur32",
    email: "rac.kapur@hotmail.com",
    
  },
  {
    id: "6",
    name: "Heci",
    surname: "Qarabalayev",
    age: "32",
    password:"heciqara32",
    email: "heciqara.balayev@gmail.com",
    
  },
];
const posts = [
  {
    id: "1",
    description: "lorem ipsum dolor",
    createdOn: "17.01.2023",
    user: {
      userId: "1",
      name: "Xiyare",
      surname: "Balakisiyeva",
      email: "xiyare.balakisi@mail.ru",
    },
  },
  {
    id: "2",
    description: "lorem ipsum dolor",
    createdOn: "17.01.2023",
    user: {
      userId: "2",
      name: "Qiymexanim",
      surname: "Pirmemmedquluzade",
      email: "qiymexanim@gmail.com",
    },
  },
  {
    id: "3",
    description: "lorem ipsum dolor",
    createdOn: "17.01.2023",
    user: {
      userId: "3",
      name: "Setka",
      surname: "Agabalayeva",
      email: "setka.agabalanski@code.edu.az",
    },
  },
  {
    id: "4",
    description: "lorem ipsum dolor",
    createdOn: "17.01.2023",
    user: {
      userId: "4",
      name: "Ördək",
      surname: "Xasiyeva",
      email: "xasiyeva.ordek@gmail.com",
    },
  },
  {
    id: "5",
    description: "lorem ipsum dolor",
    createdOn: "17.01.2023",
    user: {
      userId: "5",
      name: "Rac",
      surname: "Memmedov",
      email: "rac.kapur@hotmail.com",
    },
  },
  {
    id: "6",
    description: "lorem ipsum dolor",
    createdOn: "17.01.2023",
    user: {
      userId: "6",
      name: "Heci",
      surname: "Qarabalayev",
      email: "heciqara.balayev@gmail.com",
    },
  },
];

let isLoggedIn = false;


app.use(express.json());

app.post('/api/login', (req,res)=>{
    const{email,password}=req.body;
let maillg = users.find((mlg) => mlg.email === email);
let passlg = users.find((plg) => plg.password === password);
if(!maillg && !passlg){isLoggedIn=false;res.send({message:"error"});}
isLoggedIn=true;res.send({message:"success"});
});
app.get("/api", (req, res) => {
    res.send("Welcome to the game");
  });
  
  app.get("/api/users", (req, res) => {
    res.send({ message: "successfully got", users });
  });
  app.get("/api/posts", (req, res) => {
    res.send({ message: "successfully got", posts });
  });
  
app.post("/api/register", (req, res) => {
  
    const { name, surname, age, email,password } = req.body;
    let maillg = users.find((mlg) => mlg.email === email);
    if (maillg) {res.status(400).send({ message: "this email exists" });
    return;}
    if (!name || !surname || !age || !email || !password) {
      res.status(400).send({ message: "Name,surname,age emal and password are required!" });
      return;
    }
    let newUser = {
      id: uuidv4(),
      name,
      surname,
      age,
      email,
      password,
    };
    users.push(newUser);
    res
      .status(201)
      .send({ message: "user successfully registered", user: newUser });
  });
app.post("/api/posts",(req,res)=>{

});
app.use((req,res,next)=>{
    if(!isLoggedIn){
        res.status(401).send({message:"please login"});
        return;
    }
   next();
})
app.post('/api/logout', (req,res)=>{
isLoggedIn=false;

});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, surname, age } = req.body;
  let user = users.find((u) => u.id === id);
  if (!user) {return res.status(204).send();}
  if (!name && !surname && !age) {
    return res.status(400).send({ message: "Name or type or price required" });
  }
  if (name) {
    user.name = name;
  }
  if (surname) {
    user.name = surname;
  }
  if (age) {
    user.name = age;
  }
 
  res.send({message:"user edited", user});
});

app.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    let post = posts.find((p) => p.id === id);
    if (!post) {return res.status(204).send();}
    if (!description) {
      return res.status(400).send({ message: "description required" });
    }
    if (description) {
      post.description = description;
    }
  
   
    res.send({message:"post edited", post});
  });
app.delete("/api/users/:id",(req,res)=>{
    const { id } = req.params;
  let userIndex = users.findIndex((u) => u.id === id);
  if (!userIndex === -1) {return res.status(204).send();}
  let deletedUser = users.splice(userIndex,1);
  res.send({message:"user deleted", deletedUser,})

});
app.delete("/api/posts/:id",(req,res)=>{
    const { id } = req.params;
  let postIndex = posts.findIndex((p) => p.id === id);
  if (!postIndex === -1) {return res.status(204).send();}
  let deletedPost = posts.splice(postIndex,1);
  res.send({message:"post deleted", deletedPost,})

});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
