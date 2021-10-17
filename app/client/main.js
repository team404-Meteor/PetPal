import '../imports/startup/client/Startup';
import './style.css';
import {$, jQuery} from 'meteor/jquery';

/***********************************************
 **************** Navbar Sidebar ***************
 **********************************************/
$(document).ready(function() {

    $('#navbarSideButton').on('click', function() {
      $('#navbarSide').addClass('reveal');
      $('.overlay').show();
    });
  
    $('.overlay').on('click', function(){
      $('#navbarSide').removeClass('reveal');
      $('.overlay').hide();
    });
  
  });

/***********************************************
 **************** Navbar Sidebar ***************
 **********************************************/
 $("#theSolutionClick").click(function() {
  $('html, body').animate({
      scrollTop: $("learn#theSolution").offset().top
  }, 2000);
});