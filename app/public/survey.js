
const myurl = "https://friend-dryguy.herokuapp.com";//current url of server & app
var q1 = 0;
var q2 = 0;
var q3 = 0;
var q4 = 0;
var q5 = 0;
var q6 = 0;
var q7 = 0;
var q8 = 0;
var q9 = 0;
var q10 = 0;
var qArray = [];
var myObj = {
			name: "",
			photo: "",
			scores:[],
			total:0};
var name = "";
var address = "";
// on load set my listeners for the survey
$(document).ready( function () {
	
	// handles question 1 selection
	$(document).on("click", ".q0", function () {
		$(this).attr("data-selected", "true");
		q1 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	// handles question 2 selection
	$(document).on("click", ".q1", function () {
		$(this).attr("data-selected", "true");
		q2 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	// handles question 3 selection
	$(document).on("click", ".q2", function () {
		$(this).attr("data-selected", "true");
		q3 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	// handles question 4 selection
	$(document).on("click", ".q3", function () {
		$(this).attr("data-selected", "true");
		q4 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	// handles question 5 selection
	$(document).on("click", ".q4", function () {
		$(this).attr("data-selected", "true");
		q5 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	// handles question 6 selection
	$(document).on("click", ".q5", function () {
		$(this).attr("data-selected", "true");
		q6 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	// handles question 7 selection
	$(document).on("click", ".q6", function () {
		$(this).attr("data-selected", "true");
		q7 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	// handles question 8 selection
	$(document).on("click", ".q7", function () {
		$(this).attr("data-selected", "true");
		q8 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	// handles question 9 selection
	$(document).on("click", ".q8", function () {
		$(this).attr("data-selected", "true");
		q9 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	// handles question 10 selection
	$(document).on("click", ".q9", function () {
		$(this).attr("data-selected", "true");
		q10 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
// handles completing survey, posting to database and retrieving results
	$(document).on("click", ".mybtn", function () {
		$(".error").css("display", "none");
		name = $('#name').val();
		address = $('#mypic').val();
		// test to see if all questions were answered before moving on to next section
		if (q1 != 0 && q2 != 0 && q3 !=0 && name != "" && (address.includes("http://") || address.includes("https://") )) {
			myObj.name = name;
			myObj.photo = address;
			$("#group1").css("display","none");
			$("#group2").css("display", "block");
			qArray.push(q1, q2, q3);
			name = "";
			address = "";
			$('#name').val("");
			$('#mypic').val("");
			$('.setup').css("display", "none");
		// test to see if survey is complete before displaying result and resetting survey
		} else if (q8 != 0 && q9 != 0 && q10 != 0){
			qArray.push(q8, q9, q10);
			var friendTotal = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10;
			myObj.scores = qArray;
			myObj.total = friendTotal;
			$("myiframe").css("display", "none");
			// send data to database
			postItem(myObj);
			$('#direct').css('display', 'none');
			$('#group3').css('display', 'none');
			$('.setup').css("display", "none");
			$('#myq3').css('display', 'none');
			// reset form for next survey
			for (var i = 0; i < 10; i++) {
				$(".q"+i).attr('data-selected', "false");
			}
			myObj = {
				name: "",
				photo: "",
				scores:[],
				total:0};
			name = "";
			address = "";
			friendTotal = 0;
			q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 = 0;
			qArray = [];
			$("#navbtns").css("display", "block");
			$('#survey').css("display", "block");
			getItem();
		// test to see if current section has been completed prior to moving on
		} else if (q4 != 0 && q5 != 0 && q6 != 0 && q7 != 0) {
			$("#group2").css("display","none");
			$("#group3").css("display", "block");
			qArray.push(q4, q5, q6, q7);
		// if any section is not complete display error message
		} else {
			$(".error").css("display", "block");
		}

	});
	// onclick to handle starting survey
	$(document).on("click", "#survey", function () {
		$('#survey').css("display", "none");
		$('#navbtns').css("display", "none");
		$('#myiframe').css("display", "block");
		$('.setup').css("display", "block");
		$('#direct').css("display", "block");
		$('#group1').css("display", "block");
		$('#myq3').css('display', 'block');
	});

}); // end document ready
//-------------------------------------------------
// post item to server
function postItem(myJson) {

	var urlTemp = myurl + "/survey/";
        $.ajax({
            type: "POST",
            url: urlTemp,
            timeout: 2000,
            data: myJson,
            success: function(data) {
                //show content to console for testing
                //console.log(JSON.stringify(data));
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+textStatus+', err '+err);
                if (err === "timeout") {
                	console.log("waiting for server...");
                	postItem(myJson);
                }
            }
        });

}//postItem()
//------------------------------------------------
// retrieve all data from the friend database
function getItem() {
		var urlTemp = myurl + "/data";
        $.ajax({
            type: "GET",
            url: urlTemp,
            timeout: 4000,
     
            success: function(data) {
                //show content
                var idIndex = data.length - 1;  // index of current user
                var myArray = []; //Array of answers to the questions for current user
                myArray.push(parseInt(data[idIndex].q1));
                myArray.push(parseInt(data[idIndex].q2));
                myArray.push(parseInt(data[idIndex].q3));
                myArray.push(parseInt(data[idIndex].q4));
                myArray.push(parseInt(data[idIndex].q5));
                myArray.push(parseInt(data[idIndex].q6));
                myArray.push(parseInt(data[idIndex].q7));
                myArray.push(parseInt(data[idIndex].q8));
                myArray.push(parseInt(data[idIndex].q9));
                myArray.push(parseInt(data[idIndex].q10));
                
				var findArray = []; //array of differences of answers with other registered friends
				var totalArray = []; // same as findArray but will be sorted
				for (var i = 0; (i+1) < data.length; i++) {
					// create an array of the abs differences in scores
					createCompare(data[i]);
					var temp2 = diff(myArray, compareArray);
					findArray.push(temp2);
					totalArray.push(temp2);
				}
				totalArray.sort();
				var answer = findArray.indexOf(totalArray[0]); // index of closest match
				$("#friend").html(data[answer].name);
                $("#photo").attr("src", data[answer].photo);
                // DISPLAY Friend in Modal
				$('#myModal').modal("show");
				
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+ textStatus +', err '+err);
                if (err === "timeout") {
                	console.log("waiting for server...");
                }
            }
        });
}//getItem()
//-------------------------------------------
// create compare array
var compareArray = [];
function createCompare (data) {
	compareArray = [];
	compareArray.push(parseInt(data.q1));
	compareArray.push(parseInt(data.q2));
	compareArray.push(parseInt(data.q3));
	compareArray.push(parseInt(data.q4));
	compareArray.push(parseInt(data.q5));
	compareArray.push(parseInt(data.q6));
	compareArray.push(parseInt(data.q7));
	compareArray.push(parseInt(data.q8));
	compareArray.push(parseInt(data.q9));
	compareArray.push(parseInt(data.q10));
}
//--------------------------------------------
// find diferences in arrays, return difference
function diff(arrayToCompareTo, comparedArray) {

	var difTotal = 0;
	for(var i = 0; i < arrayToCompareTo.length; i++) {
					
		if (arrayToCompareTo[i] != comparedArray[i]) {
			difTotal += (Math.abs(arrayToCompareTo[i] - comparedArray[i]));
		}
	}
	return difTotal;
}	