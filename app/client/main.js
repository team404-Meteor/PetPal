import '../imports/startup/client/Startup';
import './style.css';
import {$, jQuery} from 'meteor/jquery';

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
  