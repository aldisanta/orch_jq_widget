var $masking = $masking || {};

$masking.masking = function () {
	$('.mask-year').mask('9999');
	$('.mask-gpa').mask('9.99');
	var mask = 0;
	$('.mask-numeric').each(function(index, el) {
		mask = Array($(el).prop('maxlength') + 1).join('0');
		$(this).mask(mask);
	});
	$('.mask-zip').mask('00000-000');
	$('.mask-phone-input').mask('999-999-9999');
	$('.phone-input').unmask('999-999-9999');
}