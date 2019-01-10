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
  
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("H:mm"));

    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("H:mm"));

  // add table row for train information
  var tableRow = $("<tr>");
  tableRow.attr("trainInfoKey", childSnapshot.key);
  tableRow.append("<td>" + trainName + "</td>");
  tableRow.append("<td>" + destination + "</td>");
  tableRow.append("<td>" + trainFrequency + "</td>");
  tableRow.append("<td>" + moment(nextTrain).format("H:mm") + "</td>");
  tableRow.append("<td>" + tMinutesTillTrain + "</td>");

  $("tbody#trainInfo").append(tableRow);

  });

});