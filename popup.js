var addTask = document.getElementById("addTask")
var taskAddDiv = document.getElementById("taskAddDiv")
var del1 = document.getElementById("delete1")
var saveButton = document.getElementById("save")

addTask.addEventListener("click", function(){
	var childNumber = taskAddDiv.children.length+1
	var parentDiv = document.createElement("div");
	parentDiv.id = `div${childNumber}`

	var node1 = document.createElement("input")
	node1.type = "text"
	node1.id = `inputnode${childNumber}`

	var node2 = document.createElement("input");
	node2.type = "time"
	node2.id = `timenode${childNumber}`

	var node3 = document.createElement("button");
	node3.innerText = "delete"
	node3.id = `delete${childNumber}`
	node3.addEventListener('click', function(e){
		console.log('e', e)
	})

	node3.addEventListener('click', function(){
		parentDiv.remove()
	})
	
	parentDiv.appendChild(node1)
	parentDiv.appendChild(node2)
	parentDiv.appendChild(node3)
	taskAddDiv.appendChild(parentDiv)
})

del1.addEventListener("click", function(e){
	var el = document.getElementById("div1");
	el.remove();
})

saveButton.addEventListener("click", function(){
	
	console.log("taskAddDiv", taskAddDiv.children.length)
	var savingArr = []

	for (i=0; i<taskAddDiv.children.length; i++) {
		console.log("i", i)
		savingArr.push({
			id: `input${i+1}`,
			task: taskAddDiv.children[i].firstElementChild.value,
			time: taskAddDiv.children[i].children[1].value
		})
	}
	console.log("savingArr", savingArr)
	localStorage.setItem("savingArr", JSON.stringify(savingArr))
	let port = chrome.runtime.connect({ name: "knockknock" })
	port.postMessage({ payload: savingArr })
})