var form1 = undefined;
var form2 = undefined;

function main(){
    
   $(".title").hide().fadeIn(1000).delay(3500).fadeTo(1000,0);
    $(".caption").hide().fadeIn(2000).delay(2000).fadeTo(1000,0);
    
    $(".overlay").delay(6000).fadeOut(200)
 
    $(".screen").delay(6000).animate({
        left: "+=100%",
    },500); 
   
   //$(".debug").hide();
    
    $(".decBut").on('click',function(){
        form1 = true;
        if(form2 == true){
            form2 = false;
           $(".binToDec").fadeTo(100,0);
        }
        $(".binToDec").removeClass("priority");
        $(".decToBin").addClass("priority").fadeTo(400,1);
    })
   
    $(".binBut").on('click',function(){
        form2 = true;
        if(form1 == true){
            form1 = false;
           $(".decToBin").fadeTo(100,0);
        }
        $(".decToBin").removeClass("priority");
        $(".binToDec").addClass("priority").fadeTo(400,1);
    }) 
    
    $("#submit").on('click',function(){
        //var result_length = document.getElementById('resultbin').text();
        console.log("Length: ");
        $(".result-wrapper").css({"width":"result_length"});
    })
}

$(document).ready(main());