const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let userArray = [];
let userFound = false;

app.get("/", (req, res) => {
  res.send({ firstName: "John", lastName: "Doe", age: 50, eyeColor: "blue" });
});

app.post("/login", (req, res) => {
  userArray.map((ele) => {
    if (ele.email == req.body.email) {
      return ele;
    }
  });
});

app.post("/register", (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const email = req.body.email;
  let userData = {
    name: name,
    email: email,
    password: req.body.password,
  };

  if (!userArray == []) {
    userArray.push(userData);
  }
    if (userArray.length > 1) {
      userArray.map(ele => {
          if (ele.email == userData.email) {
            userArray = userArray.filter(ele => ele.email !== userData.email)
            userArray.push(userData)
          }
        })
  
  } else {
    console.log("Already registered !");
  }
});


app.post("/facebook", (req, res) => {
console.log(userArray == []);
  const name = req.body.name;
  const email = req.body.email;
  const image = req.body.picture.data.url;
  let userData = {
    name: name,
    email: email,
    imageUrl: image,
  };
  if (!userArray == []) {
    userArray.push(userData);
  }
  if (userArray.length === 0 || userArray.length > 1) {
    if (userArray.length > 1) {
      userArray.map(ele => {
          if (ele.email == email) {
            userArray = userArray.filter(ele => ele.email !== email)
            userArray.push(userData)
          }
        })
    }

    
  } else {
    console.log("Already registered !");
  }
});

app.post("/google", (req, res) => {
  let userData = req.body.profileObj;
  let user = {
    name: userData.name,
    email: userData.email,
    imageUrl: userData.imageUrl,
  }

  if (!userArray == []) {
    userArray.push(userData);
  }
  if (userArray.length === 0 || userArray.length > 1) {
    if (userArray.length > 1) {
      userArray.map(ele => {
          if (ele.email == user.email) {
            userArray = userArray.filter(ele => ele.email !== user.email)
            userArray.push(user)
          }
        })
    }

    
  } else {
    console.log("Already registered !");
  }
  // if (!userFound) {
  //         userArray.push({
  //             name: userData.name,
  //             email: userData.email,
  //             imageUrl: userData.imageUrl
  //         })
  // }
});

app.get("/users", (req, res) => {
  res.send(userArray);
});

app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port 8000");
});
