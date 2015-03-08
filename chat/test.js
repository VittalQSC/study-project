function run () {
	var e = document.getElementsByClassName('btn-primary')[0];
	e.addEventListener('click', delegateEvent);
	
}


function delegateEvent(evtObj,conversation){
	if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-primary')){		
		var msgs = document.getElementsByClassName('conversation')[0];
		var text = document.getElementsByClassName('input');
		var textnode = document.createTextNode(text[0].value);
			createMsg(msgs,textnode,text[0].value);
			cleanInput(text);			
	}
}



function cleanInput(text) {

	text[0].value = "";
}

function createMsg(msgs,textnode,text){
	if(text.length != 0){
		var pE = document.createElement('p');
			pE.appendChild(textnode); 
		var msg = document.createElement('div');
			msg.setAttribute('class','my');
		var span1 = document.createElement('span');
			span1.setAttribute('class','glyphicon-pencil');	
			span1.setAttribute('aria-hidden','true');		
		var span2 = document.createElement('span');
			span2.setAttribute('class','glyphicon glyphicon-trash');
			span2.setAttribute('aria-hidden','true');
		var span3 = document.createElement('span');
			span3.setAttribute('class','glyphicon glyphicon-exclamation-sign');
			span3.setAttribute('aria-hidden','false');
			msg.appendChild(pE);
			msg.appendChild(span1);
			msg.appendChild(span2);
			msg.appendChild(span3);	

		var li = document.createElement('li');	
		var freespace = document.createElement('li');
			freespace.setAttribute('class','freespace');		
			li.appendChild(msg);
			msgs.appendChild(freespace);
			msgs.appendChild(li);

			msg.scrollIntoView();
	}
	
}
/*
                                        <li class="my">
                                        <p>Yeeeah...</p>
                                            <span class="glyphicon-pencil" aria-hidden="true"></span>
                                            <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                        </li> 
*/