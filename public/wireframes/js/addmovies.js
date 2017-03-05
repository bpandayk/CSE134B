

//global variables to store form values

var moviename;
var date;
var genre;
var rating;
var enjoyed;
var description;



// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAupx69r_nEJqhkmzUAelKgZhPoguFrbXY",
    authDomain: "cse134b-team-alpha.firebaseapp.com",
    databaseURL: "https://cse134b-team-alpha.firebaseio.com",
    storageBucket: "cse134b-team-alpha.appspot.com",
    messagingSenderId: "730498444325"
  };
  firebase.initializeApp(config);

  var database=firebase.database();


function getFormValues(){
	moviename=document.getElementById("mname").value;
	date=document.getElementById("movdate").value;
	genre=document.getElementById("Genre").value;
	rating=document.getElementById("rrate").value;
	enjoyed=document.getElementById("enjoy").value;
	description=document.getElementById("desc1").value;
}


function validateForm(){
	var ret = false;
	getFormValues();

	if(!moviename) {
		document.getElementById("l1").style.color="red";
		ret=false;
	} else {
		document.getElementById("l1").style.color="white";

	}


	if(!date) {
		document.getElementById("l2").style.color="red";
		ret=false;
	} else {
		document.getElementById("l2").style.color="white";

	}



	if(genre=="None") {
		document.getElementById("l3").style.color="red";
		ret=false;
	} else {
		document.getElementById("l3").style.color="white";

	}


	if(rating=="0") {
		document.getElementById("l4").style.color="red";
		ret=false;
	} else {
		document.getElementById("l4").style.color="white";

	}



	if(enjoyed="none") {
		document.getElementById("l5").style.color="red";
		ret=false;
	} else {
		document.getElementById("l5").style.color="white";

	}

	if(!description) {
		document.getElementById("l6").style.color="red";
		ret=false;
	} else {
		document.getElementById("l6").style.color="white";

	}

 
	return ret;


}

//this function connects to firebase database, creats the json object of data
//and creates a new movie profile.
function submitData(){
	var ret = validateForm();

	if(ret){
		



	}
}

