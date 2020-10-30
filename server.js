const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const { response } = require("express");
const app = express();


app.use(cors());
app.use(bodyParser.json());

const welcomeMessage = [
  {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
},
  {
  id: 1,
  from: "Homer",
  text: "Welcome to CYF chat system!",
},
  {
  id: 2,
  from: "Marge",
  text: "Welcome to CYF chat system!",
},
  {
  id: 3,
  from: "Lisa",
  text: "Welcome to CYF chat system!",
},
  {
  id: 4,
  from: "Maggie",
  text: "Welcome to CYF chat system!",
},
  {
  id: 5,
  from: "Ned",
  text: "Welcome to CYF chat system!",
},
  {
  id: 6,
  from: "Burns",
  text: "Welcome to CYF chat system!",
},
  {
  id: 7,
  from: "Smithers",
  text: "Welcome to CYF chat system!",
},
  {
  id: 8,
  from: "Milhouse",
  text: "Welcome to CYF chat system!",
},
  {
  id: 9,
  from: "Bob",
  text: "Welcome to CYF chat system!",
},
 {
  id: 10,
  from: "Jack",
  text: "Welcome to CYF chat system ah!",
}
];

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// all messages

app.get("/messages", (req, res) => {
  res.json(messages);
});

//recent ten messages

app.get("/messages/latest", (req, res ) => {
  res.json(welcomeMessage.slice(1).slice(-10));
});

// message by id

app.get("/messages/:id", (req, res) => {
  let {id} = req.params;
  let foundMessage = welcomeMessage.filter(message => message.id == id);
  res.send(foundMessage);
})

// posting new message

app.post("/messages", (req, res) => {
  const newMess = req.body;
  if(
    typeof newMess.text == "string" && 
    newMess.text.length > 0 && 
    typeof newMess.from == "string" && 
    newMess.from.length > 0
  ) {
    const id = welcomeMessage.length;
    newMess.id = id;
    welcomeMessage.push(newMess);
    res.json({success: true});
  } else {
    res.sendStatus(400);
  }
});

// deleting message

app.delete("/messages/:id", (req, res) => {
  const {id} = req.params;
  welcomeMessage.forEach((item, index) =>{
    if(id ==item.id){
      welcomeMessage.splice(index, 1);
      res.send(`Message id ${id} was deleted`)
    }
  })
});

// searching for messages by text

app.get("/messages/search", (req, res) => {
  const searched = req.query.text;
  const searchedMessage = welcomeMessage.filter((item) =>
    item.text.toLowerCase().includes(searched.toLowerCase())
  );
  if(searchedMessage.length < 1) {
    res.sendStatus(404);
  } else {
    res.json(searchedMessage);
  }
});

//listening port

app.listen(3000);
