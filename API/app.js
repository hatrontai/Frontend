// import logger from './logger.js'
// import {logger} from './index.js';
// import {noti} from './index.js'
// // import defaut module

// // import { TYPE_ERROR, TYPE_LOG, TYPE_WARN } from './app/constant.js'
// // import * as constants from './app/constant.js'
// import * as constants from './index.js'
// // import distructuring


// logger('what the dog are you doing', constants.TYPE_ERROR)

// console.log(constants);
// logger('what the dog are you doing', constants.TYPE_WARN)

// noti('Who are you?')

/// practice with promise

var users = [
    {
        id: 1,
        name: 'Trong Tai',
        sex: 'male'
    },
    {
        id: 2,
        name: 'Nhat Hoang',
        sex: 'male'
    },
    {
        id: 3,
        name: 'Thu Phuong',
        sex: 'female'
    }
]

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'You look very beatiful ^^'
    },
    {
        id: 2,
        user_id: 3,
        content: 'Thank you :33'
    }
]

// promise: pending, fulfilled, rejected
// fulfilled -> resolve (then)
// rejected -> reject  (catch)
// function getComments() {
//     return new Promise(function(resolve) {
//         setTimeout(() => {
//             resolve(comments)
//         }, 1000);
//     })
// }

// function getUserByIds(userIds) {
//     return new Promise(function(resolve) {
//         var result = users.filter((user) => {
//             return userIds.includes(user.id) 
//         })
//         resolve(result)
//     })
// }

// getComments()
//     .then(function(comments) {
//         var user_ids = comments.map((comment) => {
//             return comment.user_id
//         })
//         // console.log(user_ids);
//         return getUserByIds(user_ids).then((users) => {
//             return {
//                 users: users,
//                 comments: comments
//             }
//         })
//     })
//     .then((data) => {
//         // console.log(data)
//         var commentBlock = document.getElementById('comment-block')
//         // console.log(commentBlock)
//         var html = ''
//         data.comments.forEach((comment) => {
//             var user = data.users.find(user => user.id === comment.user_id)
//             // console.log(user)
//             html += `<li> <h4> ${user.name} </h4> <p> ${comment.content} </p> </li>`
//             // console.log(html)
//         });
//         commentBlock.innerHTML = html
//     })
//     .catch((error) => {
//         console.warn(error)
//     })



/// Fetch get JSON by API

// var postApi = 'http://localhost:3000/courses'
// fetch(postApi)
//     .then(response => response.json())
//     // response.json => json.parse
//     .then(data => {
//         console.log(data)
//         var coursesBlock = document.getElementById('courses-block')
//         var html = coursesBlock.innerHTML
//         data.forEach((courses) => {
//             html += `<li> <h2> ${courses.name} </h2> <p> ${courses.description} </p> </li>`
//         })
//         coursesBlock.innerHTML = html
//     })
//     .catch((error) => {
//         console.log(error)
//     })


/// Create, edit, delete by API
//start()
//render() - refesh code 
//create()
//

var postApi = 'http://localhost:3000/courses'

function start() {
    getCourses(renderCode)
    handleCreated()
}

start()

function getCourses(callBack) {
    fetch(postApi)
        .then(Response => Response.json())
        .then(callBack)
        .catch((error) => {
            console.error(error)
        })
}

function renderCode(data) {
    console.log(data);
    var htmls = data.map((course) => {
        return `<li> 
                    <h4>${course.name}</h4>
                    <p>${course.description}</p> 
                    <button onclick="deleteCourse('${course.id}')">Delete</button>
                    <button onclick="handleEditCourse(event, '${course.id}')">Edit</button>
                </li>`
    })
    var coursesBlock = document.getElementById('courses-block')
    coursesBlock.innerHTML = htmls.join('')
    
}

function deleteCourse(id) {
    fetch(postApi + '/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .catch(error => console.error(error))
}

function handleEditCourse(e, id) {
    var course = e.target.parentElement
    var name = course.querySelector('h4').innerText
    var description = course.querySelector('p').innerText
    // console.log(course, name, description)
    var html = `<label for="">Name</label>
            <input type="text" name="name" class="name" value= "${name}">
            <br>
            <label for="">description</label>
            <input type="text" name="description" class="description" value= "${description}">
            <br>
            <button class="send">Send</button>`
    
    course.innerHTML = html
    var inputName = course.querySelector('.name')
    var inputDescription = course.querySelector('.description')
    var btnSend = course.querySelector('.send')
    
    btnSend.onclick = function(e) {
        data = {
            name: inputName.value,
            description: inputDescription.value
        }
        e.stopPropagation()
        editCourse(data, id)
    }
    // console.log(inputName, inputDescription, btnSend, data)
}

function editCourse(data, id) {
    console.log("sent", data, id)
    fetch(postApi + '/' + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('updated:', data);
    })
    .catch(error => console.error(error)) 
}

function handleCreated() {
    var name = document.getElementById('name')
    var description = document.getElementById('description')
    var btnCreate = document.getElementById('create')
    btnCreate.onclick = function () {
        var formData = {
            name: name.value,
            description: description.value
        }
        createCourse(formData)
    }
}

function createCourse(data) {
    fetch(postApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => console.error(error)) 
}

