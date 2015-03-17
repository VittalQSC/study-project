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

var msgList = [];

var msgCount=0;
var currentName=document.createElement('btn-primary');

function run () {
	document.getElementsByClassName('btn-primary')[0].addEventListener('click', onSendButtonClick);
	document.getElementsByClassName('input')[0].addEventListener('keydown', onInputEnter);

	var allMsgs = restore() || [];

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
	var msgs = document.getElementsByClassName('conversation')[0];
	var text = document.getElementsByClassName('input');
	var textnode = document.createTextNode(text[0].value);

	var newMsg = theMsg(getInfo(),textnode.textContent,false)
	
	if(textnode.length == 0) 
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
	output(msgList);
}

function delegateEdit(obj){
	alert("!!");
//var li = document.getElementById(obj.id);

}	

function cleanInput(text) {

	text[0].value = "";
}

function getInfo(){

		var username = document.getElementsByName('username')[0];
		var currentdate = new Date();
		var datetime = currentdate.getDay() + "/"+currentdate.getMonth() 
		+ "/" + currentdate.getFullYear() + " @ " 
		+ currentdate.getHours() + ":" 
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds() + " @ " + username.value;
		return datetime;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addMsg(msg){
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
							+'<div class="my">'
									+'Сообщение</br>'
									+'<button class="glyphicon glyphicon-edit" aria-hidden="true" onclick="delegateEdit(this)"></button>'
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
	var field = divItem.getElementsByClassName('myInfo')[0];
	field.textContent  = msg.information;

	var	field2 = divItem.getElementsByClassName('my')[0];
		field2.firstChild.textContent = msg.message/*.textContent*/;	
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
	for(var i = 0; i < allMsgs.length; i++) {
		addMsg(allMsgs[i]);
		msgCount++;
		//allMsgs[i].scrollIntoView();
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