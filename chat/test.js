var msgCount=0;
var currentName=document.createElement('btn-primary');
function run () {
	var eSend = document.getElementsByClassName('btn-primary')[0];
		eSend.addEventListener('click', delegateEvent);
}

function delegateDel(obj){
	//alert(obj.id);
var li = document.getElementById(obj.id);	
	li.remove();
}



function delegateEvent(evtObj,conversation){
	if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-primary')){		
		var msgs = document.getElementsByClassName('conversation')[0];
		var text = document.getElementsByClassName('input');
		var textnode = document.createTextNode(text[0].value);
			
			createMsg(msgs,textnode,msgCount);
			cleanInput(text);		

	}
}



function cleanInput(text) {

	text[0].value = "";
}

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

function getInfo(){

		//////		
		//alert(currentName.value);
		var username = document.getElementsByName('username')[0];
		if(username.value != currentName.value){
			changingName(username,currentName);
		}
		var currentdate = new Date();
		var datetime = currentdate.getDay() + "/"+currentdate.getMonth() 
		+ "/" + currentdate.getFullYear() + " @ " 
		+ currentdate.getHours() + ":" 
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds() + " @ " + username.value;
		////////
		return datetime;
}

function changingName(username,currentName){
	var value = username.value;
	for(var i = 0; i < msgCount; i++){
		var item = document.getElementById(i);
		if(item != null){
		 	var data = item.getElementsByClassName('myInfo')[0].innerHTML;
			var newData = data.replace(data.substring(data.lastIndexOf(" @ ") + 3,data.length),username.value);
			document.getElementById(i).getElementsByClassName('myInfo')[0].innerHTML = newData;		
		}
	}
	currentName.setAttribute('value',value);
}

function createMsg(msgs,textnode,numMsg){
	if(textnode.length != 0){

		var msg = document.createElement('div');
			msg.setAttribute('class','my');
			msg.setAttribute('float','right');
		
		var infoMsg = document.createElement('div');
			infoMsg.setAttribute('class','myInfo');
			infoMsg.setAttribute('float','right');
		var info = document.createTextNode(getInfo());	
			infoMsg.appendChild(info); 
		
		var bodyMsg = document.createElement('div');
		//	bodyMsg.setAttribute('float','right');

		var span1 = document.createElement('button');
			span1.setAttribute('class','glyphicon glyphicon-edit');	
			span1.setAttribute('aria-hidden','true');

		var span2 = document.createElement('button');		
			span2.setAttribute('class','glyphicon glyphicon-trash');
			span2.setAttribute('aria-hidden','true');			
			span2.setAttribute('id',msgCount);			
			span2.setAttribute('onclick','delegateDel(this)');

		var span3 = document.createElement('span');
			span3.setAttribute('class','glyphicon glyphicon-exclamation-sign');
			span3.setAttribute('aria-hidden','true');
		var br = document.createElement('br');
		
		
			bodyMsg.appendChild(textnode);
			bodyMsg.appendChild(br);
			bodyMsg.appendChild(span1);		
			bodyMsg.appendChild(span2);
			bodyMsg.appendChild(span3);

			msg.appendChild(bodyMsg);



		var emptyDiv = document.createElement('div');
		

		var li = document.createElement('li');	
		var freespace = document.createElement('li');
			freespace.setAttribute('class','freespace');
		var freespaceAfter = document.createElement('li');
			freespaceAfter.setAttribute('class','freespace');

				
			li.appendChild(freespace);			
			li.appendChild(infoMsg);	
			li.appendChild(msg);
			li.appendChild(freespaceAfter);
			li.setAttribute('id',numMsg);
			msgs.appendChild(li);


			msg.scrollIntoView();
		msgCount++;
	}
	
}
