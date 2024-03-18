const express = require("express")
const fs = require('fs')
const { exit } = require("process")
const bodyParser = require('body-parser');
// const index = express()


const user = {
    name:"michael",
    age:"19"
}
// const fs = require('fs');
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded




app.get('/', (req, res) => {
  const filePath = './dateBase.json';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const jsonData = JSON.parse(data);

    res.json(jsonData);
  });
});
app.get('/:id', (req, res) => {
  const id = req.params.id
  const filePath = './dateBase.json';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const newDate = []
    const jsonData = JSON.parse(data);
    jsonData.forEach((element,index) => {
        if (element.id === id){
            newDate.push(element)
        }
    })
    res.json(newDate);
  });
});

app.post('/', (req, res) => {
    // MAKING THR REQ TO OBJECT 
    const answer = req.body
    res.json(answer)
    if (fs.existsSync('./dateBase.json')){
         fs.readFile('./dateBase.json', 'utf-8',function(err, data){
            const newone = data ;
            const fix = JSON.parse(newone)
            fix.push(answer)
            console.log(fix)
        fs.writeFile('./dateBase.json', JSON.stringify(fix), (err)=>{
            if (err) throw err;
            console.log("all good")
        })
        })
        // console.log(newone)
    // fs.writeFile('./dateBase.json',)
    }

    // exit()
})
app.delete('/:id', (req, res) => {
  const newDate = []
  const id = req.params.id
  const filePath = './dateBase.json';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const jsonData = JSON.parse(data);
    jsonData.forEach((element,index) => {
        if (element.id !== id){
            element.id = index
            newDate.push(element)
        }
    })
    fs.writeFile('./dateBase.json', JSON.stringify(newDate), (err)=>{
      if (err) throw err;
      console.log("all good")
  })
  })
    res.json(newDate);
  });
;

app.listen(3000);

// index.listen((3000), ()=> console.log('the server is runing on port 3000'))