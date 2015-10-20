var $masking = $masking || {};

$masking.masking = function () {
	$('.mask-calendar').mask('09/09/9999',{placeholder: 'MM/DD/YYYY'});
	$('.mask-year').mask('9999',{placeholder: 'YYYY'});
	$('.mask-gpa').mask('9.99');
	var mask = 0;
	$('.mask-numeric').each(function(index, el) {
		mask = Array($(el).prop('maxlength') + 1).join('0');
		$(this).mask(mask);
	});
	$('.mask-zip').mask('00000-000');
	$('.mask-phone-input').mask('(000) 000-0000');
	$('.mask-international-phone-input').mask('(00) 00000000000000');
	$('.phone-input').unmask('999-999-9999');
}