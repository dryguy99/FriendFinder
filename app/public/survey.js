var mypost = false;
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
$(document).ready( function () {
	console.log("Starting up");
	$(document).on("click", ".q0", function () {
		$(this).attr("data-selected", "true");
		q1 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	$(document).on("click", ".q1", function () {
		$(this).attr("data-selected", "true");
		q2 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	$(document).on("click", ".q2", function () {
		$(this).attr("data-selected", "true");
		q3 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	$(document).on("click", ".q3", function () {
		$(this).attr("data-selected", "true");
		q4 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	$(document).on("click", ".q4", function () {
		$(this).attr("data-selected", "true");
		q5 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	$(document).on("click", ".q5", function () {
		$(this).attr("data-selected", "true");
		q6 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	$(document).on("click", ".q6", function () {
		$(this).attr("data-selected", "true");
		q7 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	$(document).on("click", ".q7", function () {
		$(this).attr("data-selected", "true");
		q8 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	$(document).on("click", ".q8", function () {
		$(this).attr("data-selected", "true");
		q9 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	$(document).on("click", ".q9", function () {
		$(this).attr("data-selected", "true");
		q10 = parseInt($(this).attr("value"));
		$(this).siblings().attr("data-selected", "false");

	});
	
	$(document).on("click", ".mybtn", function () {
		$(".error").css("display", "none");
		name = $('#name').val();
		address = $('#mypic').val();
		
		// $(this).attr("data-selected", "true");
		
		if (q1 != 0 && q2 != 0 && q3 !=0 && name != "" && (address.includes("http://") || address.includes("https://") )) {
			myObj.name = name;
			myObj.photo = address;
			console.log("MyOBJ: " + myObj);
			$("#group1").css("display","none");
			$("#group2").css("display", "block");
			qArray.push(q1, q2, q3, q4);
			name = "";
			address = "";
			$('#name').val("");
			$('#mypic').val("");
			$('.setup').css("display", "none");

		} else if (q8 != 0 && q9 != 0 && q10 != 0){
			qArray.push(q8, q9, q10);
			var total = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10;
			myObj.scores = qArray;
			myObj.total = total;
			$("myiframe").css("display", "none");
			console.log(myObj);
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
			q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 = 0;
			qArray = [];
			$("#navbtns").css("display", "block");
			$('#survey').css("display", "block");
			$('#myModal').modal("show");

		} else if (q4 != 0 && q5 != 0 && q6 != 0 && q7 != 0) {
			$("#group2").css("display","none");
			$("#group3").css("display", "block")
			qArray.push(q5, q6, q7);

		} else {
			$(".error").css("display", "block");
		}

	});
	$(document).on("click", "#survey", function () {
		$('#survey').css("display", "none");
		$('#navbtns').css("display", "none");
		$('#myiframe').css("display", "block");
		$('.setup').css("display", "block");
		$('#direct').css("display", "block");
		$('#group1').css("display", "block");
		$('#myq3').css('display', 'block');
	});
	$(document).on("click", "#navbtns", function () {
		getItem();
	});

});

// post item to server
function postItem(myJson) {
	myurl = "http://localhost:3000/survey"
	var urlTemp = myurl + "/";
        $.ajax({
            type: "POST",
            url: urlTemp,
            timeout: 2000,
            data: myJson,
            success: function(data) {
                //show content
                console.log(JSON.stringify(data));
                response = true;
                // $('.response').css('display', 'block');
                // $('.response').html("<h3 class='text-center'>Success: Card Created!</h3>");
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+textStatus+', err '+err);
                if (err === "timeout") {
                	console.log("waiting for server...");
                	postItem(myJson);
                }
                // response = true;
                // $('.response').css('display', 'block');
                // $('.response').html("<h3 class='text-center'>Status: " + textStatus + ", Error: "+ err + "<br> Please contact System Admin.</h3>");
            }
        });
    mypost = true;

}//postItem()

function getItem() {
		myurl = "http://localhost:3000/"
        $.ajax({
            type: "GET",
            url: myurl,
            timeout: 4000,
            //data: { deck: utype },
            success: function(data) {
                //show content
                console.log('Success!:');
                var idIndex = data.length - 1;
                var thisName = data[idIndex].name;
                var thisTotal = data[idIndex].total;
                var thisId = data[idIndex].id;
                data.sort(function(a, b){
				  return a.total < b.total;
				});
				for (var i = 0; i < data.length; i++) {
					var tempTotal = Math.abs(thisTotal - data[i].total);
					if (tempTotal === 0 && thisId != data[i].id) {
						$("#friend").html(data[i].name);
                		$("#photo").attr("src", data[i].photo);
                		break;
					} else if (tempTotal === 0 && thisId == data[i].id && i === 0) {
						$("#friend").html(data[i+1].name);
                		$("#photo").attr("src", data[i+1].photo);
					} else if (tempTotal === 0 && thisId == data[i].id) {
						var f1 = Math.abs(thisTotal - data[i-1].total);
						var f2 = Math.abs(thisTotal - data[i+1].total);
						if (f1 > f2) {
							$("#friend").html(data[i+1].name);
                			$("#photo").attr("src", data[i+1].photo);
						} else {
							$("#friend").html(data[i-1].name);
                			$("#photo").attr("src", data[i-1].photo);
						}
					} 
				}
				
                for (i=0; i<data.length; i++){
                	console.log("ID: " + data[i].id + " Name: " + data[i].name + " " + data[i].photo + " Total: " + data[i].total);
                }
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