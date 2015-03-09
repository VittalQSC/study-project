var msgCount=0;
var currentName=document.createElement('input');
function run () {
	var eSend = document.getElementsByClassName('btn-primary')[0];
	eSend.addEventListener('click', delegateEvent);

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
		var data = item.getElementsByClassName('myInfo')[0].innerHTML;
		var newData = data.replace(data.substring(data.lastIndexOf(" @ ") + 3,data.length),username.value);
			document.getElementById(i).getElementsByClassName('myInfo')[0].innerHTML = newData;		
	}
	currentName.setAttribute('value',value);
}

function createMsg(msgs,textnode,numMsg){
	if(textnode.length != 0){

		var msg = document.createElement('div');
			msg.setAttribute('class','my');
		var infoMsg = document.createElement('div');
			infoMsg.setAttribute('class','myInfo');
		var info = document.createTextNode(getInfo());	
			infoMsg.appendChild(info); 
		var bodyMsg = document.createElement('div');

		/*var btn1 = document.createElement('button');
			btn1.setAttribute('type','button');
			btn1.setAttribute('class','btn btn-primary');
			btn1.setAttribute('id','btn1');*/
		var span1 = document.createElement('span');
			span1.setAttribute('class','glyphicon-pencil');	
			span1.setAttribute('aria-hidden','true');
		/*var btn2 = document.createElement('button');
			btn2.setAttribute('type','button');
			btn2.setAttribute('class','btn btn-primary')
			btn2.setAttribute('id','btn2');*/
		var span2 = document.createElement('span');
			span2.setAttribute('class','glyphicon glyphicon-trash');
			span2.setAttribute('aria-hidden','true');			
		var span3 = document.createElement('span');
			span3.setAttribute('class','glyphicon glyphicon-exclamation-sign');
			span3.setAttribute('aria-hidden','true');
		var br = document.createElement('br');
		
			bodyMsg.appendChild(textnode);
			bodyMsg.appendChild(br);
		//	btn1.appendChild(span1);	
			bodyMsg.appendChild(span1);
		//	btn2.appendChild(span2);
			bodyMsg.appendChild(span2);
			bodyMsg.appendChild(span3);



			msg.appendChild(bodyMsg);
		var emptyP = document.createElement('p');
			emptyP.setAttribute('class','emptyP');	

		var li = document.createElement('li');	
		var freespace = document.createElement('li');
			freespace.setAttribute('class','freespace');
		var freespaceAfter = document.createElement('li');
			freespaceAfter.setAttribute('class','freespace');				
			li.appendChild(infoMsg);
			li.appendChild(emptyP);	
			li.appendChild(msg);
			li.setAttribute('id',numMsg);
			msgs.appendChild(freespace);			
			msgs.appendChild(li);
			msgs.appendChild(freespaceAfter);


			msg.scrollIntoView();
		msgCount++;
	}
	
}
