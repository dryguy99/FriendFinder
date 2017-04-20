
$(document).on("click", "#survey", function () {
		$('#myiframe').attr("src", "./survey.html");
		$('#survey').css("display", "none");
});

$(document).on("click", "#myq3", function () {
	console.log("click + " +mypost);
	$("#navbtns").css("display", "block");
	$('#survey').css("display", "block");
	console.log("buttons appear");
});