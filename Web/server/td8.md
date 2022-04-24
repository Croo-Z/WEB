# TD 8 :

## 5.1

### 1 : 

Flexibilité sans perte perf

### 2 :

Collection document JSON

### 3 :

```js
var DataStore = require('nedb')
db = new DataStore()
db = {}
db.users = new DataStore()
db.messages = new DataStore()

db.users.loadDatabase()
// Same message 
```

## 5.2

### 1 :

```json
{
    message : "Bonjour",
    timestamp : "139880",
    authorID : 2,
    authorName : "ToTo",
    like : [
        {authorID : 3 , timestamp : "140553"},
        {authorID : 4 , timestamp : "158000"}
    ]
}
```

### 2 :

```js
m = { message : "Bonjour", ......}
db.messages.insert(m)
```

### 3 :

```js
new Promise((res,rej) => {
   db.messages.find({message : "Bonjour" , authorID : 4},function(err,docs){
       if (err){rej(err)}
       else res(docs)     
    }) 
})
```

### 4 :

### 5 : 

```js
db.messages.find({},{message:1,id:1},function(err,docs){})

Out : [ {message:"Bonjour",id=889},]

```

### 6 : 

```js
db.messages.find({authorID : 168},{message:1},function(err,docs){})
```

### 7 :

```js

const getMessageID(AuthorID,Message){
    return new Promise((resolve,reject) => {
        db.messages.find({authorID:AuthorID,message:Message},{_id:1,message:1},function(err,docs){
            if (err) reject(err)
            resolve(docs[0]._id)
        })
    })
}
```

### 8 :

```js

var p = getMessageID(168,"Bonjour")
p.then((id) => {
    console.log(id)
}).catch(() => {})
```

## 5.3

### 1 :

```js
var date = new Date() //AJD
hier = date - (24 * 60 * 60 * 1000)

db.find({authorID : 168, date : {$gte : hier , $lte : date}},function(err,docs){})
```

## 5.4 

```js
db.message.find({authorID : {$in : [155,198]}},function(err,docs){})
```

## 5.5 

```js
var p = db.friend.find({friend1 : 256},{friend2},function(err,docs){
    var ami = docs.map((index,el) => {
        el.friend2
    })
    db.message.find({authorID : {$in : ami}},function(err,docs){
        console.log(docs)
    })
})
```