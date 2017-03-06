

//global variables to store form values

var moviename;
var date;
var genre;
var rating;
var enjoyed;
var description;
var myMovie=false;
var addMovie=false;
var search=false;

var myMovie = '<div class = "titles"><h3 class="act"><span class = "genre"> Action </span></h3>'+
'<div class = "action" id="Act">'+
  
  '<div> <a href="./viewdetail.html"> <img src="images/1.jpg"></a></div>'+
  
'</div><div class = "titles">'+
'<h3><span class = "genre"> Comedy </span></h3></div>'+
'<div class = "comedy" id="Com">'+  
  '<div> <a href="./viewdetail.html"> <img src="images/8.jpg"></a></div>'+
  
'</div><div class = "titles">'+
'<h3><span class = "genre"> Drama </span></h3></div>'+
'<div class = "drama" id="Dma">'+
 ' <div> <a href="./viewdetail.html"> <img src="images/15.jpg"></a></div>'+
'</div><div class = "titles">'+
'<h3><span class = "genre"> Family and Kids </span></h3></div>'+
'<div class = "family-kids" id="F&K">'+

  '<div> <a href="./viewdetail.html"> <img src="images/11.jpg"></a></div>'+
  '<div> <a href="./viewdetail.html"> <img src="images/21.jpg"></a></div>'+

'</div> <div class = "titles">'+
 '<h3><span class = "genre"> Horror and Scifi </span></h3></div>'+
'<div class = "horror-scifi" id="H&S">'+
 ' <div> <a href="./viewdetail.html"> <img src="images/19.jpg"></a></div>'+

'</div> <div class = "titles" >'+
'<h3><span class = "genre"> Documentries </span></h3></div>'+
'<div class = "documentries"  id="Doc">'+
  
   '<div> <a href="./viewdetail.html"> <img src="images/13.jpg"></a></div>'+
  
'</div> </div>';


var searchMovie;


var addMovieD = ' <div class="second-level" id="secondlvl">' +
     '<div class="col1">'+
      '<div class="tit1"> <span class="sp1"> Recently Watched </span></div>'+
      '<div class="imag"><a href=" "><img src="images/12.jpg"></a></div>'+
      '<div class="imag"><a href=" "><img src="images/21.jpg"></a></div>'+
     ' <div class="imag"><a href=" "><img src="images/13.jpg"></a></div>'+
     '<div class="rating">'+
       '<span class="star">☆</span><span class="star">☆</span><span class="star">☆</span><span class="star">☆</span><span class="star5">☆</span>'+
     '</div>' +
   '</div>'+
     
   '<div class="col2">'+
    ' <div>'+
     ' <form>'+
      '<label for="mname" id="l1">Movie Name</label>'+
      '<input type="text" id="mname" name="moviename" placeholder="Latest movie you watched ...">'+

      '<label for="date1" id="l2">When did you watch this movie?</label>'+
      '<input type="date" name="wday" id="movdate">'+

      '<label for="genre" id="l3">Genre</label>'+
      '<select id="Genre" name="Genre">'+
    '<option value="None" selected></option>'+
		'<option value="Action">Action</option>'+
		'<option value="Comedy">Comedy</option>'+
		'<option value="Drama">Drama</option>'+
		'<option value="Family&Kids">Family & Kids</option>'+
		'<option value="Horror&Scifi">Horror & Scifi</option>'+
		'<option value="Documentries">Documentries</option>'+
    '</select>'+

     ' <label for="rate" id="l4">Rating</label>'+
      '<select id="rrate" name="Rate">'+
    '<option value="0" selected></option>'+
		'<option value="1">1</option>'+
		'<option value="2">2</option>'+
		'<option value="3">3</option>'+
		'<option value="4">4</option>'+
		'<option value="5">5</option>'+
    '</select>'+

    '<label for="enjoy" id="l5">Did you Enjoy the movie?</label>'+
      '<select id="enjoy" name="enjoy">'+
    '<option value="None"></option>'+
		'<option value="yes">Yes</option>'+
		'<option value="no">No</option>'+
    '</select>'+

    '<label for="desc" id="l6">Movie Description</label>'+
    '<textarea rows="8"  id="desc1"> </textarea>'+


  
    '<input type="button" value="Submit" onclick="submitData()">'+
   '</form>'+
   '</div>'+

   '</div>'+
   '</div>';




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
  var storage=firebase.storage();



  var user = localStorage.getItem("firebase:authUser:AIzaSyAupx69r_nEJqhkmzUAelKgZhPoguFrbXY:[DEFAULT]");
  var parser = JSON.parse(user);
  var UID = parser.uid;
  

  
function mybodyLoad() {
  var status = localStorage.getItem("current");
  if (status == "addMovie"){
     addMovieDom();
  }
  
    if (status == "myMovie" || !status){
     myMovieDom();
  }
}


function getFormValues(){
	moviename=document.getElementById("mname").value;
	date=document.getElementById("movdate").value;
	genre=document.getElementById("Genre").value;
	rating=document.getElementById("rrate").value;
	enjoyed=document.getElementById("enjoy").value;
	description=document.getElementById("desc1").value;
}


function addMovieDom() {
	
    document.getElementById("sub-contain").innerHTML=addMovieD;
    if (typeof(Storage) !== "undefined"){
      localStorage.setItem("current", "addMovie");

    }
}



function myMovieDom() {
	var ret = getData("Family&kids", "F&K");
	//console.log(ret);
    document.getElementById("sub-contain").innerHTML=myMovie;
    if (typeof(Storage) !== "undefined"){
      localStorage.setItem("current", "myMovie");

    }

}

function validateForm(){
	var ret = true;
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



	if(enjoyed=="None") {
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




function getData(genre, id) {
	var path = '/users/'+UID+'/'+genre;
	var ret;
	//var i;
	
	return firebase.database().ref(path).once('value').then(function(snapshot){
		ret = snapshot.val();
		var strin=" ";
		
		var key = Object.keys(ret);
		for (var i in key){
		  
		  var temp =  '<div> <img src="#">'+ ret[key[i]].m_name +' </div>';
		  strin = strin + temp;
		  
		}
		console.log(strin);
		 document.getElementById(id).innerHTML = strin;
		
	
	});	
}


//this function connects to firebase database, creats the json object of data
//and creates a new movie profile.
function submitData(){
	var ret = validateForm();



	if(ret){
		var path;
		if(genre == "Action"){
		  path = 'users/'+UID+'/Action';
		}
		
		///users/sXdcXGsrg8dBBBf3d1RdcKS3T412/Action
		
		if(genre == "Comedy"){
		  path = 'users/'+UID+'/Comedy';
		}


		if(genre == "Drama"){
		  path = 'users/'+UID+'/Drama';
		}


		if(genre == "Family&Kids"){
		  path = 'users/'+UID+'/Family&kids';
		}

		if(genre == "Horror&Scifi"){
		  path = 'users/'+UID+'/Horror&scifi';
		}
		
				if(genre == "Documentries"){
		  path = 'users/'+UID+'/Documentries';
		}
       
         var fullUrl= path + '/' + moviename;
         	console.log(fullUrl);
         firebase.database().ref(fullUrl).set({
         	m_name: moviename,
         	m_date: date,
         	m_genre: genre,
         	m_rating: rating,
         	m_enjoy:enjoyed,
         	m_desc:description        
         });
         
         console.log("success");
	}
}


