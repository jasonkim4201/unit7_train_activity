$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCSCG5yqlYnA5St0gmPYsN3AeR3tfMwggs",
    authDomain: "classwork-e25ed.firebaseapp.com",
    databaseURL: "https://classwork-e25ed.firebaseio.com",
    projectId: "classwork-e25ed",
    storageBucket: "classwork-e25ed.appspot.com",
    messagingSenderId: "865144142578"
  };
  firebase.initializeApp(config);

  var database = firebase.database();



//prevent default on submit button
  $("#submitBtn").on("click", function(event) {
    event.preventDefault();

    var trainData = {
      name: $("#trainName").val().trim(),
      destination: $("#destination").val().trim(),
      frequency: $("#trainTime").val().trim(),
      nextArrival: w,
      minAway: w

    };

  })
})