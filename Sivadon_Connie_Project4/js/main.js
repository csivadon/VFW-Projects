// Connie Sivadon
// VFW1303
// 28 March 2013
// Project 4 main.js

// DOM Function
window.addEventListener("DOMContentLoaded", function(){

	//getElementById Function	
	function $(x){
	var theElement = document.getElementById(x);
	return theElement;
	}
	
	
	//Select Field Elements
	function createElements(){
		var formTag = document.getElementsByTagName("form"),
			selectList = $("timeSelect"),
			makeSel = document.createElement("select");
			makeSel.setAttribute("id", "time");
		for(var i=0, j=timeOfDay.length; i<j; i++){
			var makeOpt = document.createElement("option");
			var optionTxt = timeOfDay[i];
			makeOpt.setAttribute("value", optionTxt);
			makeOpt.innerHTML = optionTxt;
			makeSel.appendChild(makeOpt);
		}
		selectList.appendChild(makeSel);
	}

	
	//checkbox value function
	function toggleControls(n){
		switch(n){
			case "on":
				$("clanMeetingForm").style.display = "none";
				$("clear").style.display = "inline";
				$("showMeetingRequests").style.display = "none";
				$("add").style.display = "inline";
				break;
			case "off":
				$("clanMeetingForm").style.display = "block";
				$("clear").style.display = "inline";
				$("showMeetingRequests").style.display = "inline";
				$("add").style.display = "none";
				$("data").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	
	//selected radio button
	function getSelectedRadio(){
		var radio = document.forms[0].meetingtype;
		for(var i=0; i<radio.length; i++){
			if(radio[i].checked){
			checkedValue = radio[i].value;
			}
		}
	}
	
	
	//selected checkbox value
	function getSelectedCheckbox(){
		var checkboxes = document.forms[0].check;
		for(var i=0; i<checkboxes.length; i++){
			if(checkboxes[i].checked){
			gameValue = checkboxes[i].value;
			}
		}
	}
	
	
	//store data function
	function storeData(key){
		if(!key){
			var id	= Math.floor(Math.random()*10000001);
		}else{
			var id = key;
		}
		getSelectedRadio();
		getSelectedCheckbox();
		var item				= {};
		    item.gTag			= ["Gamer Tag:", $("gTag").value];
		    item.email			= ["Email:", $("email").value];
		    item.url			= ["Url:", $("url").value];
		    item.date			= ["Date:", $("date").value];
		    item.meetingtype	= ["Meeting Type:", checkedValue];
		    item.check			= ["Game:", gameValue];
		    item.time			= ["Time of Day:", $("time").value];
		    item.howLong		= ["For How Long:", $("howLong").value];
		    item.moreInfo		= ["More Info:", $("moreInfo").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Meeting Requested!");
	}
	
	
	//get data from local storage
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("No data available, default data added.");
			loadDefaultData();
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "data");
		makeLi = document.createElement("ul");
		makeDiv.appendChild(makeLi);
		document.body.appendChild(makeDiv);
		$("data").style.display = "block";
		for(var i=0, l=localStorage.length; i<l; i++){
			var makeList = document.createElement("li");
			var linksList = document.createElement("li");
			makeLi.appendChild(makeList);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var subList = document.createElement("ul");
			makeList.appendChild(subList);
			getTimeImage(obj.time[1], subList);
			for(var n in obj){
				var makeSub = document.createElement("li");
				subList.appendChild(makeSub);
				var optSubTxt = obj[n][0] + " " + obj[n][1];
				makeSub.innerHTML = optSubTxt;
				subList.appendChild(linksList);
			}
			makeEditLinks(localStorage.key(i), linksList);
		}
	}

	//image function
	function getTimeImage(imgName, subList){
		var imageList = document.createElement("li");
		subList.appendChild(imageList);
		var imgNew = document.createElement("img");
		var setSrc = imgNew.setAttribute("src", "images/"+imgName+".gif");
		imageList.appendChild(imgNew);
		}
	
	
	//default data function
	function loadDefaultData(){
		for(var n in json){
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	//Edit and Delete links
	function makeEditLinks(key, linksList){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editPhrase = "Edit Meeting Request";
		editLink.addEventListener("click", editMeetReq);
		editLink.innerHTML = editPhrase;
		linksList.appendChild(editLink);
		
		var makeBrTag = document.createElement("br");
		linksList.appendChild(makeBrTag);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deletePhrase = "Delete Meeting Request";
		deleteLink.addEventListener("click", deleteMeetReq);
		deleteLink.innerHTML = deletePhrase;
		linksList.appendChild(deleteLink);
	}
	
	
	//Edit function
	function editMeetReq(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		
		$("gTag").value = item.gTag[1];
		$("email").value = item.email[1];
		$("url").value = item.url[1];
		$("date").value = item.date[1];
		var radios = document.forms[0].meetingtype;
		for (var i=0; i<radios.length; i++){
			if(radios[i].value == "chat" && item.meetingtype[1] == "chat"){
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "training" && item.meetingtype[1] == "training"){
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "clan match" && item.meetingtype[1] == "clan match"){
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "private match" && item.meetingtype[1] == "private match"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		var checkbox = document.forms[0].check;
		for (var i=0; i<checkbox.length; i++){
			if(checkbox[i].value == "Black Ops 2" && item.check[1] == "Black Ops 2"){
				checkbox[i].setAttribute("checked", "checked");
			}else if (checkbox[i].value == "Gears of War 3" && item.check[1] == "Gears of War 3"){
				checkbox[i].setAttribute("checked", "checked");
			}
		}
		$("time").value = item.time[1];
		$("howLong").value = item.howLong[1];
		$("moreInfo").value = item.moreInfo[1];
		
		button.removeEventListener("click", storeData);
		$("button").value = "Edit Meeting";
		var editMeeting = $("button");
		editMeeting.addEventListener("click", varify);
		editMeeting.key = this.key;
					
	}
	
	
	//delete function
	function deleteMeetReq(){
		var askUser = confirm("Are you sure you want to delete this request?");
		if(askUser){
			localStorage.removeItem(this.key);
			alert("Request deleted!");
			window.location.reload();
		}else{
			alert("Request not deleted.");
		}
	}
	
	//clear function.
	function clearLink(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All data cleared.");
			window.location.reload();
			return false;
		}
	}
	
	
	//verify function
	function varify(event){
		var checkGtag = $("gTag");
		var checkEmail = $("email");
		var checkDate = $("date");
		
		errMessage.innerHTML = "";
		checkGtag.style.border = "1px solid black";
		checkEmail.style.border = "1px solid black";
		checkDate.style.border = "1px solid black";
		
		var errorMsgs = [];
		if(checkGtag.value === ""){
			var gTagError = "Please provide your Gamer Tag.";
			checkGtag.style.border = "2px solid red";
			errorMsgs.push(gTagError);
		}
		var re1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re1.exec(checkEmail.value))){
			var emailError = "Please provide a valid email address.";
			checkEmail.style.border = "2px solid red";
			errorMsgs.push(emailError);
		}
		if(checkDate.value === ""){
			var dateError = "Please enter a valid date.";
			checkDate.style.border = "2px solid red";
			errorMsgs.push(dateError);
		}
		if(errorMsgs.length >= 1){
			for(var i=0; i<errorMsgs.length; i++){
				var errorTxt = document.createElement("li");
				errorTxt.innerHTML = errorMsgs[i];
				errMessage.appendChild(errorTxt);
			}
			event.preventDefault();
			return false;
		}else{
			storeData(this.key);
		}
		
	}
	
	//Variable default
	var timeOfDay = ["--Choose Time Frame--", "Afternoon", "Evening", "Night"];
	var checkedValue;
	var gameValue;
	var errMessage = $("errorMessages");
	
	//Set Link & Submit Click Events
	var displayData = $("showMeetingRequests");
	displayData.addEventListener("click", getData);
	
	var clearData = $("clear");
	clearData.addEventListener("click", clearLink);
	
	var request = $("button");
	request.addEventListener("click", varify);
	
	//Function Calls
	createElements();
	
	
	
});