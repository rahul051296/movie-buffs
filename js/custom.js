/*----------------
    Preloader
------------------ */

$(window).on('load', function()
    {
       
     $('#preloader').delay(2050).fadeOut();
    
    }); 
        
/*-------------------------
    Navbar Color Change
---------------------------*/

// $(document).ready(function()
//     {       
   
//         var scroll_start = 0;
//         var startchange = $('#tagline');
//         var offset = startchange.offset();
      
// $(document).scroll(function() 
//     { 
//         scroll_start = $(this).scrollTop();
//         if(scroll_start > offset.top)
//             {
//                 $('.navbar-custom').css('background-color', 'rgb(0, 0, 0)');
//              } 
//          else
//              {
//                  $('.navbar-custom').css('background-color', 'rgba(12, 19, 12, 0.20)');
//             }
//     });
//     });
$("ul > li > a").click(function() {
                    $("body").animate({
                        scrollTop: $("#detail").offset().top
                    });
                      $(".navbar-collapse").collapse('hide')
                
                });
/*--------------------
    Scroll on Click
----------------------*/

$(document).ready(function()
    {
        $("a").on('click', function(event)
            {
                if (this.hash !== "")
                    {
                        event.preventDefault();
                        var hash = this.hash;
        $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function()
                        {
                        window.location.hash = hash;
                        });
                    } 
            });
    });


/*---------------------------
    Collapse NavBar on Blur
-----------------------------*/

 $(document).ready(function()
    {
                
        $("#sbutton").click(function()
                {
                    
                   $(".navbar-collapse").collapse('hide')
                });
                $("#sbutton1").click(function()
                {
                    
                   $(".navbar-collapse").collapse('hide')
                });
                
            });  


$(document).ready(function(){
   $("#srch").blur(function(){
       $(this).css("color","white")
   }); 
    $("#srch").focus(function(){
       $(this).css("color","black")
   });
    $("#srch1").blur(function(){
       $(this).css("color","white")
   }); 
    $("#srch1").focus(function(){
       $(this).css("color","black")
   });
});
/*------------------
    Toggle Caret
--------------------*/

 $(document).ready(function() 
    {
        
        $('#directors').click(function()
            {
                $(this).next('.directors').slideToggle();
                $(this).find('i').toggleClass('fa-caret-square-o-up fa-caret-square-o-down')
             });
         $('#actors').click(function()
             {
                $(this).next('.actors').slideToggle();
                $(this).find('i').toggleClass('fa-caret-square-o-up fa-caret-square-o-down')
             });
                 
    });

/*---------------
    Auto Scroll
-----------------*/

$(document).ready(function ()
     {
    // Handler for .ready() called.
        $('html, body').animate({
        scrollTop: $('#detail').offset().top
        }, 1000);
    });
