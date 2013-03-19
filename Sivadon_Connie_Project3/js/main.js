// Connie Sivadon
// VFW1303
// 21 March 2013
// Project 3 main.js

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
	function storeData(){
		var id			= Math.floor(Math.random()*10000001);
		getSelectedRadio();
		getSelectedCheckbox();
		var item				= {};
		    item.gTag			= ["Gamer Tag:", $("gTag").value];
		    item.email			= ["Email:", $("email").value];
		    item.url			= ["Url:", $("url").value];
		    item.date			= ["Date:", $("date").value];
		    item.meetingType		= ["Meeting Type:", checkedValue];
		    item.game			= ["Game:", gameValue];
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
			alert("There is not data to display.");
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
		//deleteLink.addEventListener("click", deleteMeetReq);
		deleteLink.innerHTML = deletePhrase;
		linksList.appendChild(deleteLink);
	}
	
	function editMeetReq(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		
		$("gTag").value = item.gTag[1];
		$("email").value = item.email[1];
		$("url").value = item.url[1];
		$("date").value = item.date[1];
		var radios = document.forms[0].meetingType;
		for(var i=0; o<radios.length; i++){
			if(radios[i].value == "chat" && item.meetingType[1] == "chat"){
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "training" && item.meetingType[1] == "training"){
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "clan match" && item.meetingType[1] == "clan match"){
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "private match" && item.meetingType[1] == "private match"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		var checkBox = document.forms[0].game;
		for(var i=0; o<checkBox.length; i++){
			if(checkBox[i].value == "Black Ops 2" && item.check[1] == "Black Ops 2"){
				checkBox[i].setAttribute("checked", "checked");
			}else if (checkBox[i].value == "Gears of War 3" && item.check[1] == "Gears of War 3"){
				checkBox[i].setAttribute("checked", "checked");
			}
		}
		$("time").value = item.time[1];
		$("howLong").value = item.howLong[1];
		$("moreInfo").value = item.moreInfo[1];
		
		request.removeEventListener("click", storeData);
		$("requestNow").value = "Edit Meeting";
		var editMeeting = $("requestNow");
		editMeeting.addEventListener("click", varify);
		editMeeting.key = this.key;
					
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
		var re2 = /^((((0[13578])|([13578])|(1[02]))[\/](([1-9])|([0-2][0-9])|(3[01])))|(((0[469])|([469])|(11))[\/](([1-9])|([0-2][0-9])|(30)))|((2|02)[\/](([1-9])|([0-2][0-9]))))[\/]\d{4}$|^\d{4}$/
		if(!(re2.exec(checkDate.value))){
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
			storeData();
		}
		
	}
	
	//Variable default
	var timeOfDay = ["--Choose Time Frame--", "morning", "afternoon", "evening"];
	var checkedValue;
	var gameValue;
	var errMessage = $("errorMessages");
	
	//Set Link & Submit Click Events
	var displayData = $("showMeetingRequests");
	displayData.addEventListener("click", getData);
	
	var clearData = $("clear");
	clearData.addEventListener("click", clearLink);
	
	var request = $("requestNow");
	request.addEventListener("click", varify);
	
	//Function Calls
	createElements();
	
	
	
});