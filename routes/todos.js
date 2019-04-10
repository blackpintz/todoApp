const express = require("express"),
      router  = express.Router(),
      db      = require("../models")


// const newTodo = new db({
//     name: "Watch the ucl match.",
//     completed: true
// })

// newTodo.save();

router.get("/", (req, res) => {
    db.find({}).then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        console.log(err)
    })
})


router.get("/:todoId", (req, res) => {
    db.findById(req.params.todoId).then(
        (foundtodo) => {
            // console.log(foundtodo)
            res.json(foundtodo)
        }).catch((err) => {
            console.log(err)
        })
})


router.post("/", (req, res) => {
    db.create(req.body).then((data)=> {
           res.json(data) 
    }).catch((err) => {
        console.log(err);
    })
})

router.put("/:todoId", (req, res) => {
    db.findByIdAndUpdate(req.params.todoId, req.body, {new: true}).then((data)=> {
        res.json(data)
    }).catch((err) => {
        console.log(err)
    })
})

router.delete("/:todoId", (req, res) => {
    db.findByIdAndDelete(req.params.todoId).then(() => {
        res.json({ message: "The item has been deleted."})
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router 