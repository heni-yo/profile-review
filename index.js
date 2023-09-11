import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:  "https://realtime-datebase-fd95e-default-rtdb.europe-west1.firebasedatabase.app/"
}

let commentDiv = document.getElementById("comment-div")
const commentFieldEl = document.getElementById("comment-field")
const publishButtonEl = document.getElementById("publish-btn")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const commentListInDB = ref(database, "Comment")

onValue(commentListInDB, function(snapshot){
    
    commentDiv.innerHTML = ""
    
    const values = snapshot.val()
    
    if(values){    
        let itemArrayId = Object.keys(values)
        for(let i = 0; i<itemArrayId.length; i++ ){
            const id = itemArrayId[i]
            append(values[id], itemArrayId[i])
        }
    }
})


function append(value, id){
    let txtEl = document.createElement("p")
    txtEl.textContent = value    
    commentDiv.append(txtEl)
    
    txtEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `Comment/${id}`);
    remove(exactLocationOfItemInDB);
  });
}
    
    publishButtonEl.addEventListener("click", function() {
        let commentValue = commentFieldEl.value
        push(commentListInDB, commentValue)
        commentFieldEl.value = ""

})


