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
myurl = "http://localhost:3000/survey"
// post item to server
function postItem(myJson) {
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
                data.sort(function(a, b){
				  return a.total < b.total;
				});
                for (i=0; i<data.length; i++){
                	console.log("Name: " + data[i].name + " " + data[i].photo + " Total: " + data[i].total);
                }
                $("#friend").html(data[0].name);
                $("#photo").attr("src", data[0].photo);
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