

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
var uploader;

var myMovie = '<div class = "titles"><h3 class="act"><span class = "genre"> '+
'Action </span></h3>'+
'<div class = "action" id="Act">'+
    
'</div><div class = "titles">'+
'<h3><span class = "genre"> Comedy </span></h3></div>'+
'<div class = "comedy" id="Com">'+  
  
'</div><div class = "titles">'+
'<h3><span class = "genre"> Drama </span></h3></div>'+
'<div class = "drama" id="Dma">'+

'</div><div class = "titles">'+
'<h3><span class = "genre"> Family and Kids </span></h3></div>'+
'<div class = "family-kids" id="F&K">'+

'</div> <div class = "titles">'+
 '<h3><span class = "genre"> Horror and Scifi </span></h3></div>'+
'<div class = "horror-scifi" id="H&S">'+


'</div> <div class = "titles" >'+
'<h3><span class = "genre"> Documentries </span></h3></div>'+
'<div class = "documentries"  id="Doc">'+
  
'</div> </div>';


var searchMovie;


var addMovieD = ' <div class=" second-level" id="secondlvl">' +
   '<div class="col21">'+
    ' <div>'+
     ' <form class="form-horizontal" id = "addmov1">'+
      '<label for="mname" id="l1">Movie Name</label>'+
      '<input type="text" id="mname" name="moviename" placeholder="Latest movie you watched ..." style="color:black;">'+

      '<label for="date1" id="l2">Movie watched on</label>'+
      '<input type="date" name="wday" id="movdate" style="color:black;">'+

      '<label for="genre" id="l3">Genre</label>'+
      '<select id="Genre" name="Genre" style="color:black;">'+
    '<option value="None" selected></option>'+
		'<option value="Action">Action</option>'+
		'<option value="Comedy">Comedy</option>'+
		'<option value="Drama">Drama</option>'+
		'<option value="Family&Kids">Family & Kids</option>'+
		'<option value="Horror&Scifi">Horror & Scifi</option>'+
		'<option value="Documentries">Documentries</option>'+
    '</select>'+

     ' <label for="rate" id="l4">Rating</label>'+
      '<select id="rrate" name="Rate" style="color:black;">'+
    '<option value="0" selected></option>'+
		'<option value="1">1</option>'+
		'<option value="2">2</option>'+
		'<option value="3">3</option>'+
		'<option value="4">4</option>'+
		'<option value="5">5</option>'+
    '</select>'+

    '<label for="enjoy" id="l5">Did you Enjoy the movie?</label>'+
      '<select id="enjoy" name="enjoy" style="color:black;">'+
    '<option value="None"></option>'+
		'<option value="yes">Yes</option>'+
		'<option value="no">No</option>'+
    '</select>'+

    '<label for="desc" id="l6">Movie Description</label>'+
    '<textarea rows="8"  id="desc1" style="color:black;"> </textarea>'+

    '<label for="movimg" id="l7">Movie Image </br></label>'+
    '<input type="file" id="movimg" name="movimage" accept=".jpg,.jpeg,.png">'+
    '<div class="addsub">'+
    '<input type="button" value="Submit" onclick="submitData()"></div>'+
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
  var username = parser.displayName;
  var em;
	var email = parser.email;
	if(username){
		username = username.toUpperCase();
	   // document.getElementById("menu").innerHTML='Hi '+ username;
	} else {
	    em = email.split('@');
		//document.getElementById("menu").innerHTML='Hi '+ em[0];
	}
  console.log(parser);

 function accInfo(){

    var pro = parser.providerId;
    var imgurl= parser.photoURL;
    var temp = ' <div class = "movdetail" >';
    if(username) {
    	temp = temp + '<div><h2>Hello '+username +'!</h2></div>';
    } else {
        temp = temp + '<div><h2>Hello '+email +'!</h2></div>';
    }
  

   temp = temp + '<div class="second-level">'+
    ' <div class="col1">'+
     '<img src='+imgurl+' style="width:200px; height:200px;">'+
     '</div>'+
     
  ' <div class="col2">';
  
      if(username) {
    	temp = temp +   ' <div class="name"> <span>'+ username +'</span></div>';
    } 
     
     temp = temp + ' <div class="desc"> <span> Memeber since 2017 </span></div>'+
     '<div class="desc"> <span> Email: '+ email +' </span></div>'+
     '<div class="desc"> <span> <a href="javascript:void(0);" onclick="resetPassword()" > Reset Password </a></div>'+
     '<div class="desc2"><span id="confirm" style="color:red;"></span><div>'+
  ' </div>'+
  ' </div>';

   document.getElementById("sub-contain").innerHTML=temp;
} 

function resetPassword(){
		firebase.auth().sendPasswordResetEmail(email).then(function() {
  		// Email sent.
      
      document.getElementById("confirm").innerHTML= "Email has been sent to "+ email + " to reset the Password.";
		}, function(error) {
  		// An error happened.
		});
}
  
function mybodyLoad() {
	if(username){
	    document.getElementById("menu").innerHTML='Hi '+ username;
	} else {
		document.getElementById("menu").innerHTML='Hi '+ em[0];
	}
  //document.getElementById("dropmenu").innerHTML="Hi "+ username + "  !";
  var status = localStorage.getItem("current");
  if (status == "addMovie"){
     addMovieDom();
  } else if (status == "myMovie" || !status){
     myMovieDom();
  }else if(status == "viewdetail") {
     var det = localStorage.getItem("detail");
     showDetail(det);
     
  } else {
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
    uploader=document.getElementById("movimg").files;

}





function addMovieDom() {
    document.getElementById("sub-contain").innerHTML=addMovieD;
    if (typeof(Storage) !== "undefined"){
      localStorage.setItem("current", "addMovie");

    }
}




function myMovieDom() {
    document.getElementById("sub-contain").innerHTML=myMovie;
	getData("Action", "Act");
	getData("Comedy", "Com");
	getData("Family&kids", "F&K");
	getData("Drama", "Dma");
	getData("Horror&scifi", "H&S");
	getData("Documentries", "Doc");
	

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
	
	
	if(uploader.length == 0) {
		document.getElementById("l7").style.color="red";
		ret=false;
	} else {
		document.getElementById("l7").style.color="white";

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
		var mdet,mname, mgenre,mrate, menjoy,mdate,mdesc,murl;
		
		if(ret) {
		var key = Object.keys(ret);
		
		
		for (var i in key){
		  mdet = key[i];
		  mname=ret[key[i]].m_name; 
		  mdate=ret[key[i]].m_date; 
		  mrate=ret[key[i]].m_rating; 
		  menjoy=ret[key[i]].m_enjoy; 
		  mgenre=ret[key[i]].m_genre; 
		  mdesc=ret[key[i]].m_desc; 
		  murl=ret[key[i]].m_url; 
		  

		  var temp =  '<div class="viewimg"> <img src=' + murl +
		  ' onclick='+'"showDetail(\''+ mdet +'%'+genre+'\')" class="mainimg"> </div>';
		  
		  		  
		  strin = strin + temp;
		  
		 }
		}

		 document.getElementById(id).innerHTML = strin;
	});	
}




function showDetail(mdetail){
var name,date,enjoy,rate,url,desc;
console.log(mdetail);
var detArray = mdetail.split("%");
var path = '/users/'+UID+'/'+detArray[1]+'/'+ detArray[0];


	return firebase.database().ref(path).once('value').then(function(snapshot){

		ret = snapshot.val();
		var strin=" ";
		var mname, mgenre,mrate, menjoy,mdate,mdesc,murl;
		
		if(ret) {  
		  mname=ret.m_name; 
		  mdate=ret.m_date; 
		  mrate=ret.m_rating; 
		  menjoy=ret.m_enjoy; 
		  mgenre=ret.m_genre; 
		  mdesc=ret.m_desc; 
		  murl=ret.m_url; 
		}
		
	  var viewdetail = ' <div class = "movdetail" >'+
  '<div><h2>'+mname+'</h2></div>'+
   '<div class="second-level">'+
     '<div class="col1">'+
     '<img src='+murl+' class="detailimg">'+
     '<div class="rating">'+
       '<span id="star0">☆</span><span id="star1">☆</span><span id="star2">☆</span>'+
       '<span id="star3">☆</span><span id="star4">☆</span>'+
     '</div>'+
     '</div>'+
     
   '<div class="col2" id="updatedom">'+
    ' <div class="name"> <span> '+mname+' </span></div>'+
     '<div class= "desc"> <p id="desc123">'+ mdesc+' </p>  </div>'+
     '<div class= "genre1"> <span> Genre </span> <span class="gen2">'+ mgenre+' </span> </div>'+
     '<div class= "refer"> <span> Enjoyed </span> <span class="gen2">'+ menjoy+' </span> </div>'+
     '<div class= "date"> <span> Watched on </span> <span class="gen2">'+ mdate+' </span> </div>'+

   '</div>'+
   '</div>'+
   '<div class="addsub">'+
    '<input type="button" id="update" value="Update" onclick="updateData(\''+ mdetail+'\')"></div>'+
    '<div class="addsub">'+
    '<input type="button" id = "del" value="Delete" onclick="deleteData(\''+ mdetail+'\')"></div>'+
  '</div>';

		 document.getElementById("sub-contain").innerHTML=viewdetail;
	    if (typeof(Storage) !== "undefined"){
      		localStorage.setItem("current", "viewdetail");
      		localStorage.setItem("detail",mdetail);
      	}
		 
		 if(mrate==1){
		     document.getElementById("star0").style.color="gold";
		     document.getElementById("star1").style.color="white";
		     document.getElementById("star2").style.color="white";	
		     document.getElementById("star3").style.color="white";
		     document.getElementById("star4").style.color="white";   		     
		 }
		 
		 if(mrate==2){
		     document.getElementById("star0").style.color="gold";
		     document.getElementById("star1").style.color="gold";
		     document.getElementById("star2").style.color="white";	
		     document.getElementById("star3").style.color="white";
		     document.getElementById("star4").style.color="white";   		     
		 }
		 if(mrate==3){
		     document.getElementById("star0").style.color="gold";
		     document.getElementById("star1").style.color="gold";
		     document.getElementById("star2").style.color="gold";	
		     document.getElementById("star3").style.color="white";
		     document.getElementById("star4").style.color="white";   		     
		 }
		 if(mrate==4){
		     document.getElementById("star0").style.color="gold";
		     document.getElementById("star1").style.color="gold";
		     document.getElementById("star2").style.color="gold";	
		     document.getElementById("star3").style.color="gold";
		     document.getElementById("star4").style.color="white";   		     
		 }
		 if(mrate==5){
		     document.getElementById("star0").style.color="gold";
		     document.getElementById("star1").style.color="gold";
		     document.getElementById("star2").style.color="gold";	
		     document.getElementById("star3").style.color="gold";
		     document.getElementById("star4").style.color="gold";   		     
		 }
	});
	
}







//this function connects to firebase database, creats the json object of data
//and creates a new movie profile.
function submitData(){
	var ret = validateForm();
	var imgname =  moviename.split(' ').join('');
	moviename = moviename.toUpperCase();
    var downloadURL;


	if(ret){
		//upload image
		if (uploader){
		    var storage = firebase.storage().ref('images/'+imgname);
		    storage.put(uploader[0]).then(function(snapshot){
		       console.log(snapshot.downloadURL);
		       downloadURL=snapshot.downloadURL;
		       
		       
		       
		       
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
       
         var fullUrl= path + '/' + imgname;
         	console.log(fullUrl);
         return firebase.database().ref(fullUrl).set({ 
         	m_name: moviename,
         	m_date: date,
         	m_genre: genre,
         	m_rating: rating,
         	m_enjoy:enjoyed,
         	m_desc:description, 
         	m_url:downloadURL       
         });
		}).then(function(snapshot){
		    console.log("data added");
		    myMovieDom();
		
		});
		
		}
         
         console.log("success");
	}
}


function deleteData(detail){
    var detArray = detail.split("%");
    var path = '/users/'+UID+'/'+detArray[1]+'/'+ detArray[0];
    
        console.log(detArray[0]);
    
    return firebase.database().ref(path).remove().then(function(snapshot){
        console.log("success on delete");
        var storage = firebase.storage().ref('images/'+detArray[0]);
    	storage.delete().then(function(){
        console.log("file deleted");
        myMovieDom();   
    });

    }).catch(function(error){
      console.log(error);
    
    });
}



function updateData(detail){
	var name,date,enjoy,rate,url,desc;
    var detArray = detail.split("%");
    var path = '/users/'+UID+'/'+detArray[1]+'/'+ detArray[0];
    
	return firebase.database().ref(path).once('value').then(function(snapshot){

		ret = snapshot.val();
		var strin=" ";
		var mname, mgenre,mrate, menjoy,mdate,mdesc,murl;
		
		if(ret) {  
		  mname=ret.m_name; 
		  mdate=ret.m_date; 
		  mrate=ret.m_rating; 
		  menjoy=ret.m_enjoy; 
		  mgenre=ret.m_genre; 
		  mdesc=ret.m_desc; 
		  murl=ret.m_url; 
		}    
		
		
 var viewupdate = 
    ' <div>'+
     ' <form>'+
     ' <div class="name" id="spname"> <span> '+mname+' </span></div>'+
     ' <div class="name" id="spname2"> <span> Genre: &nbsp&nbsp'+mgenre+' </span></div>'+

      '<label for="date1" id="l2">When did you watch this movie?</label>'+
      '<input type="date" name="wday" id="movdate" style="color:black;">'+
           
     ' <label for="rate" id="l4">Rating</label>'+
      '<select id="rrate" name="Rate" style="color:black;">'+
    '<option value="0" selected></option>'+
		'<option value="1">1</option>'+
		'<option value="2">2</option>'+
		'<option value="3">3</option>'+
		'<option value="4">4</option>'+
		'<option value="5">5</option>'+
    '</select>'+

    '<label for="enjoy" id="l5">Did you Enjoy the movie?</label>'+
      '<select id="enjoy" name="enjoy" style="color:black;">'+
    '<option value="None"></option>'+
		'<option value="yes">Yes</option>'+
		'<option value="no">No</option>'+
    '</select>'+

    '<label for="desc" id="l6">Movie Description</label>'+
    '<textarea rows="8"  id="desc1" style="color:black;"> </textarea>'+

    '<label for="movimg" id="l7">Movie Image </br></label>'+
    '<input type="file" id="movimg" name="movimage" accept=".jpg,.jpeg,.png">'+
    '<div class="addsub">'+
    '<input type="button" value="Submit" onclick="submitupdateData(\''+ detail +'\')"></div>'+
   '</form>'+
   '</div>';
   
		document.getElementById("updatedom").innerHTML=viewupdate;
		document.getElementById("update").remove();
		document.getElementById("del").remove();
		
		
    });    
}



function submitupdateData(detail){

    var detArray = detail.split("%");
    var path = '/users/'+UID+'/'+detArray[1]+'/'+detArray[0]+'/';

	date=document.getElementById("movdate").value;
	rating=document.getElementById("rrate").value;
	enjoyed=document.getElementById("enjoy").value;
	description=document.getElementById("desc1").value;
    uploader=document.getElementById("movimg").files;
    


console.log(uploader);

     if(uploader.length != 0){
    	 var storage = firebase.storage().ref('images/'+detArray[0]);
    	 storage.delete();
		 storage.put(uploader[0]).then(function(snapshot){
		 console.log(snapshot.downloadURL);
		 downloadURL=snapshot.downloadURL;
		 
		 
		 var updates = {};
    	 if (date){

    		updates[path+"m_date"]=date;
        }
    
    	if(rating !== "0"){

    		updates[path+"m_rating"]=rating;
    	}
    
   		 if(enjoyed !== "None"){

    		updates[path+"m_enjoy"]=enjoyed;
    	}	   
    
    	if(description!==" "){

    	updates[path+"m_desc"]=description;
    	} 
    	
    	updates[path+"m_url"]=downloadURL;



  		return firebase.database().ref().update(updates).then(function(snapshot){
     	 console.log(snapshot);
     	 showDetail(detail);
 		 }, function(error){
   			  console.log(error);
 		 });
		  
	 });
     
     
     } else {
        

  	var updates = {};
    if (date){

    	updates[path+"m_date"]=date;
    }
    
    if(rating !== "0"){

    	updates[path+"m_rating"]=rating;
    }
    
    if(enjoyed !== "None"){

    updates[path+"m_enjoy"]=enjoyed;
    }   
    
    if(description!==" "){

    	updates[path+"m_desc"]=description;
    } 



  return firebase.database().ref().update(updates).then(function(snapshot){
      console.log(snapshot);
      showDetail(detail);
  }, function(error){
     console.log(error);
  });
     }
}


function searchDom(){
	var term = document.getElementById("srch").value;
	var path1 = '/users/'+UID;

	if(term){
		
        term = term.toUpperCase();
		return firebase.database().ref(path1).once('value').then(function(snapshot){
    var retu=[];
		var ret = snapshot.val();
		var key= Object.keys(ret);
    var temp=" ";

    for (i in key){
    	var key2 = Object.keys(ret[key[i]]);
      for (j in key2){
				if(ret[key[i]][key2[j]].m_name == term){
          retu.push(ret[key[i]][key2[j]]);
			    temp +=  '<div> <img class="mainimg" src=' + retu[0].m_url +
				  ' onclick='+'"showDetail(\''+ key2[j] +'%'+ret[key[i]][key2[j]].m_genre+'\')"> </div>';
        }
      }
        
    }  


         if (retu.length == 0){
           var tem = '<div style="padding-top: 20px; color:red; font-size:25px; "><span > Sorry !'+ term +' could not be found. Please click Add movies to add.';
		   document.getElementById("sub-contain").innerHTML = tem;
        } else {
		 document.getElementById("sub-contain").innerHTML = temp;
		}

	});	
	}

	
}

function logout() {
	firebase.auth().signOut().then(function() {
	    if (typeof(Storage) !== "undefined"){
          localStorage.setItem("current", undefined);
		window.location.href="index.html";
	    console.log("logged out succesfully!");
     	}
	}, function(error){
	     console.log(error);
	});
}




