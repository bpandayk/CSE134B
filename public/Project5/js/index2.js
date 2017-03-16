$(function() {
    $('#signIn-form-tab').click(function(e) {

		$("#signIn-form").delay(100).fadeIn(100);

 		$("#signUp-form").fadeOut(100);
		$('#signUp-form-tab').removeClass('active');

		$(this).addClass('active');
		e.preventDefault();
	});

	$('#signUp-form-tab').click(function(e) {

		$("#signUp-form").delay(100).fadeIn(100);

 		$("#signIn-form").fadeOut(100);
		$('#signIn-form-tab').removeClass('active');

		$(this).addClass('active');
		e.preventDefault();
	});

});
