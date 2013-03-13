// Connie Sivadon
// VFW1303
// 14 March 2013
// Project 1 main.js

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
	
	function storeData(){
		var id			= Math.floor(Math.random()*100000001);
		var item		= {};
		    item.gTag		= ["Gamer Tag:", $("gTag").value];
		    item.email		= ["Email:", $("email").value];
		    item.url		= ["Url:", $("url").value];
		    item.date		= ["Date:", $("date").value];
		    // item.meetingType	= ["Meeting Type:", meetingType.value];
		    // item.game		= ["Game:", gameValue];
		    item.time		= ["Time of Day:", $("time").value];
		    item.howLong	= ["For How Long:", $("howLong").value];
		    item.moreInfo	= ["More Info:", $("moreInfo").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Meeting Requested!");
	}
	//Variable default
	var timeOfDay = ["--Choose Time Frame--", "morning", "afternoon", "evening"];
	
	//Set Link & Submit Click Events
	/*var displayData = $("Show meeting requests");
	displayData.addEventListener("click", getData);
	var clearData = $("clear");
	clearData.addEventListener("click", clearData);*/
	var request = $("button");
	request.addEventListener("click", storeData);
	
	//Function Calls
	createElements();
});