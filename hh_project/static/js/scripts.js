$("#comment_form").on('submit', function(e){
	e.preventDefault();
	var valid = true;
	$(".needs-validation").each(function(i, el) {
		if($(el).val() == '') {
			$(el).addClass('is-invalid');
			valid = false;
		}
		else {
			$(el).removeClass('is-invalid');
		}
	});
	$(".validation-email").each(function(i, el) {
		if($(el).val() != '' && $(el).val().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) {
			$(el).addClass('is-invalid');
			valid = false;
		}
		else if($(el).val() != '') {
			$(el).removeClass('is-invalid');
		}
	});
	if(valid) {
			const formData = {
				username: $("#username").val(),
				email: $("#email").val(),
				content: $("#comment").val(),
				csrfmiddlewaretoken: $("#comment_form input[name='csrfmiddlewaretoken']").val()
			}
			$("#add_comment").html('<i class="fa fa-spinner fa-spin loader mr-1" style="font-size:24px"></i>Записать');
			$.ajax({
				method: 'POST',
				url: 'add_comment',
				data: formData,
				dataType: 'json',
				success: function(data) {
					if(data.status == 'success') {
						$('.no-data').remove();
						$("#comments .card").each(function(i, el) {
							if($(el).attr('class').search('card-1') > -1) {
								$(el).removeClass('card-1').addClass('card-2');
							}
							else {
								$(el).removeClass('card-2').addClass('card-1');
							}
						});
						$("#comment_list").prepend('<div class="col-12 col-md-4 mb-3"><div class="card card-1"><div class="card-header text-center"><h5>' + formData.username + '</h5></div><div class="card-body text-center pl-2 pr-2 pt-3 pb-4"><h5 class="card-title pb-3">' + formData.email + '</h5><p class="card-text">' + formData.content + '</p></div></div></div>');
					}
					else {
						$(".invalid-feedback").html('');
						$(".send-area").before('<div class="col-12 text-center invalid-feedback">' + data.message + '</div>');
						$("#comment_form .invalid-feedback").show();
					}
					$("#add_comment").html('Записать')
				},
				error: function(data) {
					$(".invalid-feedback").html('');
					$(".send-area").before('<div class="col-12 text-center invalid-feedback">Произошла ошибка при добавлении комментария</div>');
					$("#comment_form .invalid-feedback").show();
					$("#add_comment").html('Записать')
				}
			});
	}
});