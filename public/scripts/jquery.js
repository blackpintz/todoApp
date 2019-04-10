/* global $ */

$(() => {
    $.getJSON("/api/todos").then((data) => {
        data.forEach((data) => {
            addTodo(data)
        })
    }).catch((err) => {
        console.log(err)
    })
    
    
    $("#todoInput").keypress((e) => {
        if(e.which == 13) {
           createToDo();
        }
    })
    
    //the class list will be there when the page loads so the jQuery should work
    $(".list").on("click", "span", function (e) {
        e.stopPropagation() //stops the event from bubbling up so that when we click on the span, it will not also trigger the parent <li>
      const id = $(this).parent().data("id")
      $.ajax({
          method: "DELETE",
          url: `/api/todos/${id}`
      }).then((data) => {
          
        e.target.parentElement.remove();
      }).catch((err) => {
          console.log(err)
      })
    })
    $(".list").on("click", "li", function (e) {
        let liTodo = $(this)
        console.log(liTodo)
        const id = liTodo.data("id")
        const isDone = !liTodo.data("completed")
        const updateInfo = {completed: isDone}
        
        $.ajax({
            method: "PUT",
            url: `/api/todos/${id}`,
            data: updateInfo
        }).then(function (updatedData) {
            console.log($(this))
            console.log(e.target)
            liTodo.toggleClass("done");
             liTodo.data("completed", isDone);
             console.log(updatedData)
        }).catch((err) => {
            console.log(err)
        })
    })
})

function addTodo (data) {
    const newTodo = $(`<li id="deleteTodo"> ${data.name} <span>X</span></li>.`)
            newTodo.addClass("task");
            newTodo.data("id", data._id)
            newTodo.data("completed", data.completed)
            if(data.completed) {
                newTodo.addClass("done");
                }
    $(".list").append(newTodo)
}

function createToDo () {
    let userInput = $("#todoInput").val()
    $.post("/api/todos", {name: userInput}).then((createdTodo) => {
        $("#todoInput").val('')
        addTodo(createdTodo)
    }).catch((err) => {
        console.log(err)
    })
    
}