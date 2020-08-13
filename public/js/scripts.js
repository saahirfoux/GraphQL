(function($) {
    "use strict"; 
	
	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});


	var fetchUser = () => {
        const query = window.location.search.substring(1)
	    const token = query.split('access_token=')[1]

        // Call the user info API
        fetch('https://api.github.com/user', {
                headers: {
                    Authorization: 'token ' + token
                }
            })
            .then(res => res.json())
            .then(() => {
                setTimeout(() => {
                    window.location = '/challenge';
                }, 3000);
            })
    }

})(jQuery);