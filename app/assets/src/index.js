$( document ).ready( function() {

//********** Header scroll stuff ****************//
var didScroll;
var scrollY; 
var lastY = 0; 

$(window).scroll(function(event){
	didScroll = true;
	scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
	if(scrollY === 0) {
		$('header').removeClass('nav-up').addClass('nav-down');
	}
	else if(scrollY - lastY > 0 && scrollY > 70) {
		$('header').removeClass('nav-down').addClass('nav-up');
	} else if (scrollY - lastY < 0 && scrollY > 70) {
		$('header').removeClass('nav-up').addClass('nav-down');
	}

	lastY = scrollY; 
}
    
	
    //********************************************** */
    //********************************************** */
    //********************************************** */

	//Google Maps JS   https://codepen.io/hubpork/pen/xriIz 
	//Set Map
	function initialize() {
			var myLatlng = new google.maps.LatLng(28.306171,-81.439076);
			var imagePath = 'http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png'
			var mapOptions = {
				zoom: 15,
				center: myLatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
//
		var map = new google.maps.Map(document.getElementById('map'), mapOptions);
		//Callout Content
		var contentString = 
            '<h3 id="firstHeading" class="firstHeading">Life Solutions Counseling</h3>'+
            '<div id="bodyContent">'+
            	'<p>We are located in La Mirada Plaza off Vine Street in Kissimmee, FL.</p>'+
            '</div>';
		//Set window width + content
		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 300
		});

		//Add Marker
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			// animation: google.maps.Animation.DROP,
			icon: imagePath,
			title: 'Life Solutions Counseling'
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});

		//Resize Function
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});
	}

	google.maps.event.addDomListener(window, 'load', initialize);

	//********************************************** */
    //********************************************** */
	//********************************************** */
	
	//Fade in on scroll stuff

	$(window).scroll( function(){
			/* Check the location of each desired element */
			$('.hideme').each( function(i){
				
				var bottom_of_object = $(this).position().top + $(this).outerHeight();
				var bottom_of_window = $(window).scrollTop() + $(window).height();
				
				/* If the object is completely visible in the window, fade it it */
				if( bottom_of_window > bottom_of_object ){
					
					$(this).animate({'opacity':'1'},1000);
						
				}
				
			}); 

})

//********************************************** */
//********************************************** */
//********************************************** */

//Smooth Scroll Stuff


// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
	location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
	&& 
	location.hostname == this.hostname
  ) {
	// Figure out element to scroll to
	var target = $(this.hash);
	target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	// Does a scroll target exist?
	if (target.length) {
	  // Only prevent default if animation is actually gonna happen
	  event.preventDefault();
	  $('html, body').animate({
		scrollTop: target.offset().top
	  }, 1000, function() {
		// Callback after animation
		// Must change focus!
		var $target = $(target);
		$target.focus();
		if ($target.is(":focus")) { // Checking if the target was focused
		  return false;
		} else {
		  $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
		  $target.focus(); // Set focus again
		}
	  });
	}
  }
});

});