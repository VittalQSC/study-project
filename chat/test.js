var uniqueId = function() {
	var date = Date.now();
	var random = Math.random() * Math.random();

	return Math.floor(date * random).toString();
};

var theMsg = function(info,msg, removed){
	return {
		information: info,
		message: msg ,
		removed: !!removed,
		id: uniqueId()
	};
};

var user = "Username";

var msgList = [];

var msgCount=0;
var currentName=document.createElement('btn-primary');

function run () {
	var allMsgs = restore() || [user];	
		user = allMsgs[0];
	var username = document.getElementsByClassName('username')[0].value;
		username = user;	
		msgList[0] = user;

		document.getElementsByClassName('glyphicon-refresh')[0].addEventListener('click', delegateRename);
		document.getElementsByClassName('btn-primary')[0].addEventListener('click', onSendButtonClick);
		document.getElementsByClassName('input')[0].addEventListener('keydown', onInputEnter);

		createAllMsgs(allMsgs);
		output(msgList);	

}

function onInputEnter(evtObj){
	if(evtObj.keyCode == 13)
	{
		onSendButtonClick(evtObj);	
	}
}

function onSendButtonClick(evtObj){

	var text = document.getElementsByClassName('input')[0];
	var newMsg = theMsg(getInfo(),text.value,false)
	
	if(text.length == 0) 
		return;

	addMsg(newMsg);	
	cleanInput(text);	
	
	store(msgList);
}

function delegateDel(obj){
var li = document.getElementById(obj.id);	
	//li.remove();
	li.classList.add('removed');
	msgList[obj.id].removed = true; 
	store(msgList);

}

function delegateEdit(obj){
var person = prompt("Edit your message", msgList[obj.id].message);
var msgText = document.getElementById(obj.id+'My').firstChild;
	if(person != null) {
		msgText.textContent = person;
		msgList[obj.id].message = person;
		store(msgList);
	}
}	

function cleanInput(text) {

	text.value = "";
}

function delegateRename() {
	var allMsgs = restore() || [user];
	
	user = document.getElementsByClassName('username')[0].value;
	msgList[0] = user;
}

function getInfo(){

		var username = document.getElementsByName('username')[0];
		var currentdate = new Date();
		var datetime = currentdate.getDay() + "/"+currentdate.getMonth() 
		+ "/" + currentdate.getFullYear() + " @ " 
		+ currentdate.getHours() + ":" 
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds() + " @ " + user;
		return datetime;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addMsg(msg){
	msgCount++;
	var item = createItem(msg);
	var items = document.getElementsByClassName('conversation')[0];

	msgList.push(msg);
	items.appendChild(item);
	item.scrollIntoView();
}
function createItem(msg){

		var temp = document.createElement('li');//id="'+msgCount+'"
			temp.setAttribute('class','item removed')
			temp.setAttribute('data-task-id','идентификатор');
			temp.setAttribute('id',msgCount);
		var htmlAsText =  '<li class="freespace" ></li>'
							+'<div class="myInfo">Информация</div>'
							+'<div class="my" id="'+msgCount+'My'+'">'
									+'Сообщение</br>'
									+'<button class="glyphicon glyphicon-edit" id="'+msgCount+'" aria-hidden="true" onclick="delegateEdit(this)"></button>'
									+'<button class="glyphicon glyphicon-trash" aria-hidden="true" id="'+msgCount+'" onclick="delegateDel(this)"></button>'
									+'<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>'
								
							+'</div>';
						
			temp.innerHTML = htmlAsText;
			updateItem(temp, msg);
		return temp;				
}

function updateItem(divItem, msg){
	if(msg.removed) {
		divItem.classList.add('removed');
	
	} else {
		divItem.classList.remove('removed');
	
	}
	divItem.setAttribute('data-task-id', msg.id);

	var info = divItem.getElementsByClassName('myInfo')[0];
	info.textContent  = msg.information;

	var	message = divItem.getElementsByClassName('my')[0];
		message.firstChild.textContent = msg.message/*.textContent*/;	
}

function store(listToSave){
	output(listToSave);

	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("CHATs msgList", JSON.stringify(listToSave));	
}

function createAllMsgs(allMsgs){
	user = allMsgs[0];
	input = document.getElementsByClassName('username')[0];
	input.value = user;
	for(var i = 1; i < allMsgs.length; i++) {
		addMsg(allMsgs[i]);
	}	
}

function output(value){
	var output = document.getElementById('output');

	output.innerText = "var taskList = " + JSON.stringify(value, null, 2) + ";";
}

function restore(){
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem("CHATs msgList");

	return item && JSON.parse(item);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////