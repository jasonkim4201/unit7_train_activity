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
      trainName: $("#trainName").val().trim(),
      destination: $("#destination").val().trim(),
      trainTime: $("#trainTime").val().trim(),
      nextArrival: parseInt($("#frequency").val().trim())
    };
    console.log(trainData);
  
  // add train info to firebase
  database.ref("HW7").push(trainData);

  //clear boxes on submit
  
  $("#trainName").val("");
  $("#destination").val("");
  $("#trainTime").val("");
  $("#frequency").val("");

  });

  //event listener for firebase for new train info
  database.ref("HW7").on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var trainFrequency = childSnapshot.val().nextArrival;

    console.log(childSnapshot.key);
    
    


  // add table row for train information
  var tableRow = $("<tr>");
  tableRow.attr("trainInfoKey", childSnapshot.key);
  tableRow.append("<td>" + trainName + "</td>");
  tableRow.append("<td>" + destination + "</td>");
  tableRow.append("<td>" + trainFrequency + "</td>");
  tableRow.append(`<td>~</td>`);

  $("tbody#trainInfo").append(tableRow);

  });

});