var $masking = $masking || {};

$masking.masking = function () {
	$('.mask-year').mask('9999');
	$('.mask-gpa').mask('9.99');
	$('.mask-numeric').mask('09');
	$('.mask-zip').mask('00000-000');
	$('.mask-phone-input').mask('999-999-9999');
	$('.phone-input').unmask('999-999-9999');
}