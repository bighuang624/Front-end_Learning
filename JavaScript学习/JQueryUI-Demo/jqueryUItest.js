$(document).ready(function(){
	$("#div").draggable();

	$("#Rect1").draggable();
	$("#Rect2").droppable();

	$("#Rect2").on("drop",function(event,ui){
		$("#Rect2").text("drop事件");
	});

	$("#a_btn").button();
	$("#select").selectable();
	$("#a_btn").on("click",function(){
		if($("#right").hasClass("ui-selected")){
			$("#dialog").dialog();
		}
	});

	$("#accordion").accordion();

	var autotags = ["Kyon","Piggy","Huang","Andy","Sakura"];
	$("#tags").autocomplete({
		source:autotags
	});
});