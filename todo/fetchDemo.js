// fetch('http://127.0.0.1:8000/api/login', {
//             method: "POST",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(userLogin)
//         }).then((result) => {
//             if (result.status === 200) {
//                 result.json().then((response) => {
//                     let _token = response.access
//                     localStorage.setItem("token", _token)
//                     setToken(_token)
//                 })
//             }
//             else {
//                 toastContentForFailure()
//                 localStorage.clear()
//             }
//             setToastTrigger(true)
//         })


// fetch('http://127.0.0.1:8000/api/todos', {
//     method: "POST",
//     headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//         'Authorization': "Bearer " + localStorage.getItem("token")
//     },
//     body: JSON.stringify(todo)
// }).then((result) => {
//     if (result.status === 200) {
//         result.json().then((response) => {
//             console.log("Todo Added Successfully");
//             // setTodoCreate(response)
//         })
//     }
//     else {
//         console.log("Something went wrong");
//         // setTodoCreate([])
//     }
// })

 {/* <main id="myMain">
                
                </main> */}
                
