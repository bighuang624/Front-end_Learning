var pb;
var max = 100;
var current = 0;

var valueSpan,slider;

$(document).ready(function(){
	pb = $("#progressbar");
	pb.progressbar({max:100});
	setInterval(changePb,100);

	$("#menu").menu({position:{at:"left bottom"}});

	slider = $("#slider");
    valueSpan = $("#span");

    slider.slider({
    	// change:function(event,ui){
    	slide:function(event,ui){
    		valueSpan.text(slider.slider("option","value"));
    	}
    });

    $("#input").spinner();
    $("#input").spinner("value","10");
    $("#btn").on("click",function(){
    	alert($("#input").spinner("value"));
    });

    $("#tabs").tabs();
});

function changePb(){
	current++;
	if(current >= max){
		current = 0;
	}
	pb.progressbar("option","value",current);
}