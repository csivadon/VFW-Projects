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
	
	
	
	
	//Variable default
	var time = ["--What time of day would you like this meeting to take place?--", "morning", "afternoon", "evening"];

	//Set Link & Submit Click Events
	var displayData = $("Show meeting requests");
	displayData.addEventListener("click", getData);
	var clearData = $("clear");
	clearData.addEventListener("click", clearData);
	var request = $("button");
});