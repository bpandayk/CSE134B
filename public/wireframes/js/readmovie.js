
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAupx69r_nEJqhkmzUAelKgZhPoguFrbXY",
    authDomain: "cse134b-team-alpha.firebaseapp.com",
    databaseURL: "https://cse134b-team-alpha.firebaseio.com",
    storageBucket: "cse134b-team-alpha.appspot.com",
    messagingSenderId: "730498444325"
  };
  firebase.initializeApp(config);


var obj;
var actionvar;
var comedyvar;
var dramavar;
var familyvar;
var horrorvar;
var sifivar;
var documentaryvar;

var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  // var username = snapshot.val().username;
  // var moviename = snapshot.val().
  obj = JSON.parse(snapshot);

});





function displayContent (genre, obj) {

	

	var genres = 0; // genre in every userID
	var movies = 0; //movies in every genre

	for (genres = 0; genres < obj.length(); genres++) {
		for (movies in obj[genres]) {
			if (genres = "")
		}
		var tempaction="<div> <a href=" + #+ "> <img src=" + # + "></a></div>"
		actionvar = actionvar + tempaction;
	}

	document.getElementById('actionmovies').innerHTML = displayvar;

}
