
// the widget definition, where "squareui" is the namespace,
// "fotf_questions" the widget name
// bind on form containing the record list table
$.widget( "orchestrate.fotf_questions", {
	// default options
	options: {
		is_country_state_toggle : false
		, disabled : false
	},

	/**
	 * _create : constructor
	 */
	_create: function() {
		// get the select element
		var opts = this.options;
		
		// cache commonly used elements
		this.form_elem = $(this.element);

		// cache commonly used elements
		this._cacheElements();

		// bind UI actions
		this._bindUIActions();
		
		if (opts.disabled) {
			// disabled all
			this._disableAll();
		} else {
			// masking
			this._inputMasking();

			// validates
			this._validation();
		}
		
		// refresh
		this._refresh();
	},

	// called when created, and later when changing options
	_refresh: function() {
	},

	_disableAll: function() {
		var cached = this.cached,
				opts = this.options;
		cached['field_all'].attr('disabled', 'disabled');
		cached['.button_action'].attr('disabled', false);
	},

	_inputMasking: function() {
		var cached = this.cached,
				opts = this.options;
		cached['.input_mask_year'].mask('9999',{placeholder:'YYYY'});
		cached['.input_mask_zip'].mask('99999?');
	},
	
	_bindPhoneUSInternationalToggle: function() {
		var self = this,
				cached = this.cached,
				opts = this.options;
		cached['.input_checkbox_phone_international'].each(function(index, el) {
			if ($(el).prop('checked')) {
				$(el).prev('input').removeClass('mask-phone_us')
				$(el).prev('input').addClass('mask-phone_international')
			} else {
				$(el).prev('input').addClass('mask-phone_us')
				$(el).prev('input').removeClass('mask-phone_international')
			}
			self._phoneMasking();
		});

		cached['.input_checkbox_phone_international'].change(function(event) {
			/* Act on the event */
			if ($(this).prop('checked')) {
				$(this).prev('input').removeClass('mask-phone_us')
				$(this).prev('input').addClass('mask-phone_international')
			} else {
				$(this).prev('input').addClass('mask-phone_us')
				$(this).prev('input').removeClass('mask-phone_international')
			}
			self._phoneMasking();
		});
	}, 
	
	_bindCountryStateToggle: function() {
		var self = this,
				cached = this.cached,
				opts = this.options;

		var country = cached['table'].find('input[type=hidden].country-toggle');
		if ( country.val() == 201) {
			$('#' + country.data('select-state')).parent('td').show();
			$('#' + country.data('textbox-state')).parent('td').hide();
		} else {
			$('#' + country.data('select-state')).parent('td').hide();
			$('#' + country.data('textbox-state')).parent('td').show();
		}

		$('select.country-toggle').change(function(event) {
			country = $('#hd_' + $(this).attr('id'));
			if ( country.val() == 201) {
				$('#' + country.data('select-state')).parent('td').show();
				$('#' + country.data('textbox-state')).parent('td').hide();
			} else {
				$('#' + country.data('select-state')).parent('td').hide();
				$('#' + country.data('textbox-state')).parent('td').show();
			}
		});
	}, 

	_phoneMasking: function(el) {
		var cached = this.cached,
				opts = this.options;
		this.element.find('input.mask-phone_us').mask('(999) 999-9999? x99999');
		this.element.find('input.mask-phone_international').mask('+99 99 9999 9999');
	},

	_validation: function() {
		var self = this
				, opts = self.options
				, cached = self.cached;	
		
		/* style */
		cached['table'].find('label.error').css('color', 'red');
		cached['.required']
											.children('td :first-child')
											.append('<span>&nbsp;<font color=red>*</font></span>');
		self.form_elem.validate({
			errorPlacement: function (er, el) {
				el.parent('td').append(er);
			}
		});
		
		/* email */
		cached['.input_email'].each(function(index, el) {
			$(el).rules('add'
								, {
									email : true,
					 				remote: {
											url: "ajax/ajax_email_ssn_jquery_validation.asp",
											url: "ajax/ajax_email_ssn_jquery_validation.asp",
											type: "post",
											data: {
											applicantID: function() {
												return $(el).data('applicantid');
											}, 
											type: function() {
												return $(el).data('type');
											}
										}
									}
									, messages : {
										remote : 'Email Already Taken'
									}
								}
			);
		});
	
		/* sql year */
		cached['.input_sql_year'].each(function(index, el) {
				$(el).rules('add'
					, {
						sql_year : true
					}
				);
		});
		
		/* password */
		cached['.input_password'].each(function(index, el) {
			var confirm = $(el).data('match');
			if (confirm.indexOf('confirm_confirm_') < 0) {
				//primary
				$(el).rules('add'
									, {
										minlength : 6,
										alphanumeric : true,
										equalTo : '#txt' + confirm,
									}
				);
			} else {
				var origin = confirm.replace('confirm_confirm_', '');
				//secondary
				$(el).rules('add'
									, {
										minlength : 6,
										alphanumeric : true,
										equalTo : '#txt' + origin,
									}
				);
			}
		});

		/*
		cached['.input_required'].rules("add", { 
		  required:true
		});
		 */
	},
	/**
	 * _bindUIActions : bind UI Event on record_list
	 */
	_bindUIActions: function() {
		var cached = this.cached,
				opts = this.options;
		
		//radio
		cached['.fotf_radio'].change(function(event) {
			var id = 'hd_' + $(this).attr('name')
			$('#' + id).val($(this).val());
		});
		
		//checkbox
		cached['.fotf_checkbox'].change(function(event) {
			var id = 'hd_' + $(this).attr('name');
			if ($(this).prop('checked')) {
				$('#' + id).val(true);
			} else {
				$('#' + id).val(false);
			}
		});
		
		//dropdown
		cached['.fotf_dropdown'].change(function(event) {
			var id = 'hd_' + $(this).attr('name')
			$('#' + id).val($(this).val());
		});
		
		//us / international textbox and checkbox
		this._bindPhoneUSInternationalToggle();
		
		if (opts.is_country_state_toggle) {
			//country state toggle, there's difference on flat ui, turn this off
			this._bindCountryStateToggle();
		}
	},

	// _setOptions is called with a hash of all options that are changing
	// always refresh when changing options
	_setOptions: function() {
		// _super and _superApply handle keeping the right this-context
		this._superApply( arguments );
		this._refresh();
	},

	// _setOption is called for each individual option that is changing
	_setOption: function( key, value ) {
		this._super( key, value );
	},

	/**
	 * _cacheElements : cached DOM Elements
	 */
	_cacheElements: function() {
		var $table = this.form_elem.children('table')
				, $field_all = $table.find('input, select, textarea')
				, $button_action = $table.find('.button-action')
				, $required = $table.find('tr.required')
				, $input_required = $table.find('input.required, select.required')
				, $input_password = $table.find('input.validate-password')
				, $input_sql_year = $table.find('input.validate-sql_year')
				, $input_email = $table.find('input.validate-email')
				, $fotf_radio = $table.find('.fotf_radio')
				, $fotf_checkbox = $table.find('.fotf_checkbox')
				, $fotf_dropdown = $table.find('select.fotf_dropdown')
				, $input_mask_year = $table.find('input.mask-year')
				, $input_mask_zip = $table.find('input.mask-zip')
				, $input_checkbox_phone_international = $table.find('input.checkbox-phone_international');
		
		this.cached = {
			'table' : $required
			, 'field_all' : $field_all
			, '.button_action' : $button_action
			, '.required' : $required
			, '.input_required' : $input_required
			, '.input_password' : $input_password
			, '.input_sql_year' : $input_sql_year
			, '.input_email' : $input_email
			, '.fotf_radio' : $fotf_radio
			, '.fotf_checkbox' : $fotf_checkbox
			, '.fotf_dropdown' : $fotf_dropdown
			, '.input_mask_year' : $input_mask_year
			, '.input_mask_zip' : $input_mask_zip
			, '.input_checkbox_phone_international' : $input_checkbox_phone_international
		};
	}
});
