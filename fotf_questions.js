
// the widget definition, where "orchestrate" is the namespace,
// "fotf_questions" the widget name
// bind on form containing the record list table
$.widget( "orchestrate.fotf_questions", {
	// default options
	options: {
		is_country_state_toggle : false
		, disabled : false
		, is_portal : false
		, is_validate : true
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

		if (opts.disabled) {
			// disabled all
			this._disableAll();
		} else {
			// masking
			this._inputMasking();

			if (opts.is_validate) {
				// validates
				this._validation();
			} else {
				//remove required class
				//TODO : cached element missing ?
				this.cached['.input_required'].removeClass('required');
				//but retain asterix
				this._addAsterix();
			}
		}
		
		// bind UI actions
		this._bindUIActions();
		
		
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
		cached['.input_mask_zip'].mask('00000-000');
		cached['.input_mask_gpa'].mask('9.99');
		cached['.input_mask_numeric'].mask('99');
		cached['.input_mask_long_numeric'].mask('999999999999');
		cached['.input_mask_absolute_phone_us'].mask('999-999-9999');
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
	
	_bindDropdownToggle: function() {
		var self = this,
				cached = this.cached,
				opts = this.options;
		$('input.question-field-toggle').each(function(index, el) {
			var value = $(el).val();
			var parent = $(el).parent('tr');
			var next_1   = parent.next('tr');
			var next_2   = next_1.next('tr');
			var field_toggle_text = next_2.children('.question-field-toggle-text');
			if (value == -1) {
				field_toggle_text.show();
			} else {
				field_toggle_text.hide();
			}
		});

		$('input.question-field-toggle').change(function(event) {
			var value = $(this).val();
			var parent = $(this).parent('tr');
			var next_1   = parent.next('tr');
			var next_2   = next_1.next('tr');
			var field_toggle_text = next_2.children('.question-field-toggle-text');
			if (value == -1) {
				field_toggle_text.show();
			} else {
				field_toggle_text.hide();
			}
		});

	}, 

	_bindTextAreaWordCount: function() {
		var self = this,
				cached = this.cached,
				opts = this.options;
		$('textarea.word-count').each(function(index, el) {
				//console.log($(el).attr('id'));
				var pTempContent = $('#' + $(el).attr('id') + '_count');
				if (pTempContent) pTempContent.html("0");
				// start counting
				var pText = trim($(el).val());
				var stripText = pText.replace(/(<([^>]+)>)/ig,"")
															.replace(/<\/?[^>]+>/g, "")
															.replace(/(\r\n|\n|\r)/gm," ")
															.replace(/(&nbsp;)/g," ")
															.replace(/  +/g, " ")
															.replace("&nbsp;"," ")
															.replace(/^[\s(&nbsp;)]+/g,"")
															.replace(/[\s(&nbsp;)]+$/g,"");
				var pCount = stripText.split(" ").length
				if ((trim(stripText) == "") || (trim(stripText) == "<p><sub></sub></p>")) {
					if (pTempContent) pTempContent.html("0");
				} else {
					if (pTempContent) pTempContent.html(pCount);
				}
		});
		
		$('textarea.word-count').keyup(function(event) {
				var pTempContent = $('#' + $(this).attr('id') + '_count');
				if (pTempContent) pTempContent.html("0");
				// start counting
				var pText = trim($(this).val());
				var stripText = pText.replace(/(<([^>]+)>)/ig,"")
															.replace(/<\/?[^>]+>/g, "")
															.replace(/(\r\n|\n|\r)/gm," ")
															.replace(/(&nbsp;)/g," ")
															.replace(/  +/g, " ")
															.replace("&nbsp;"," ")
															.replace(/^[\s(&nbsp;)]+/g,"")
															.replace(/[\s(&nbsp;)]+$/g,"");
				var pCount = stripText.split(" ").length
				if ((trim(stripText) == "") || (trim(stripText) == "<p><sub></sub></p>")) {
					if (pTempContent) pTempContent.html("0");
				} else {
					if (pTempContent) pTempContent.html(pCount);
				}
		});
		
		$('textarea.word-count').keydown(function(event) {
				var pTempContent = $('#' + $(this).attr('id') + '_count');
				if (pTempContent) pTempContent.html("0");
				// start counting
				var pText = trim($(this).val());
				var stripText = pText.replace(/(<([^>]+)>)/ig,"")
															.replace(/<\/?[^>]+>/g, "")
															.replace(/(\r\n|\n|\r)/gm," ")
															.replace(/(&nbsp;)/g," ")
															.replace(/  +/g, " ")
															.replace("&nbsp;"," ")
															.replace(/^[\s(&nbsp;)]+/g,"")
															.replace(/[\s(&nbsp;)]+$/g,"");
				var pCount = stripText.split(" ").length
				if ((trim(stripText) == "") || (trim(stripText) == "<p><sub></sub></p>")) {
					if (pTempContent) pTempContent.html("0");
				} else {
					if (pTempContent) pTempContent.html(pCount);
				}
		});
	}, 

	_bindCountryStateToggle: function() {
		var self = this,
				cached = this.cached,
				opts = this.options;

		var country = cached['table'].find('input[type=hidden].country-toggle');
		if ( country.val() == 201) {
			$('#' + country.data('select-state')).addClass('required');
			$('#' + country.data('select-state')).parent('td').show();
			$('#' + country.data('select-state'))
				.closest('tr.required')
				.find('span.required-asterix')
				.show();
			$('#' + country.data('textbox-state')).removeClass('required');
			$('#' + country.data('textbox-state')).parent('td').hide();
			
			$('#' + country.data('select-state'))
				.closest('tr.required')
				.next('tr.required')
				.find('span.required-asterix')
				.show();

			if (opts.is_validate) {
				$('#' + country.data('select-state'))
					.closest('tr.required')
					.next('tr.required')
					.find('input.mask-zip')
					.addClass('required');
			}
		} else {
			$('#' + country.data('select-state')).removeClass('required');
			$('#' + country.data('select-state')).parent('td').hide();
			$('#' + country.data('select-state'))
				.closest('tr.required')
				.find('span.required-asterix')
				.hide();
			$('#' + country.data('textbox-state')).removeClass('required');
			$('#' + country.data('textbox-state')).parent('td').show();
			
			$('#' + country.data('select-state'))
				.closest('tr.required')
				.next('tr.required')
				.find('span.required-asterix')
				.hide();
			if (opts.is_validate) {
				$('#' + country.data('select-state'))
					.closest('tr.required')
					.next('tr.required')
					.find('input.mask-zip')
					.removeClass('required');
			}
		}

		$('select.country-toggle').change(function(event) {
			country = $('#hd_' + $(this).attr('id'));
			//console.log(country.data('select-state'));
			if ( country.val() == 201) {
				$('#' + country.data('select-state')).addClass('required');
				$('#' + country.data('select-state')).parent('td').show();
				$('#' + country.data('select-state'))
					.closest('tr.required')
					.find('span.required-asterix')
					.show();
				$('#' + country.data('textbox-state')).removeClass('required');
				$('#' + country.data('textbox-state')).parent('td').hide();
				
				$('#' + country.data('select-state'))
					.closest('tr.required')
					.next('tr.required')
					.find('span.required-asterix')
					.show();
				if (opts.is_validate) {
					$('#' + country.data('select-state'))
						.closest('tr.required')
						.next('tr.required')
						.find('input.mask-zip')
						.addClass('required');
				}
			} else {
				$('#' + country.data('select-state')).removeClass('required');
				$('#' + country.data('select-state')).parent('td').hide();
				$('#' + country.data('select-state'))
					.closest('tr.required')
					.find('span.required-asterix')
					.hide();
				$('#' + country.data('textbox-state')).removeClass('required');
				$('#' + country.data('textbox-state')).parent('td').show();
				
				$('#' + country.data('select-state'))
					.closest('tr.required')
					.next('tr.required')
					.find('span.required-asterix')
					.hide();
				if (opts.is_validate) {
					$('#' + country.data('select-state'))
						.closest('tr.required')
						.next('tr.required')
						.find('input.mask-zip')
						.removeClass('required');
				}
			}
		});
	}, 

	_phoneMasking: function(el) {
		var cached = this.cached,
				opts = this.options;
		//this.element.find('input.mask-phone_us').mask('(999) 999-9999? x99999');
		this.element.find('input.mask-phone_us').mask('999-999-9999');
		//this.element.find('input.mask-phone_international').mask('+99 99 9999 9999');
		this.element.find('input.mask-phone_international').unmask('999-999-9999');
	},

	_addAsterix: function() {
		var self = this
				, opts = self.options
				, cached = self.cached;	

		cached['.required']
											.children('td :first-child')
											.append('<span class="required-asterix">&nbsp;<font color=red>*</font></span>');
	},

	_validation: function() {
		var self = this
				, opts = self.options
				, cached = self.cached;	
		
		
		/* style */
		cached['table'].find('label.error').css('color', 'red');
		
		self._addAsterix();

		self.form_elem.validate({
			errorPlacement: function (er, el) {
				el.parent('td').append(er);
			}
		});
		
		if (opts.is_portal) {
			cached['.portal_input_required'].each(function(index, el) {
				$(el).rules("add", { 
				  required:true
				});
			});
		}

		/* common email */
		cached['.input_common_email'].each(function(index, el) {
			$(el).rules('add'
					, {email : true}
			);
		});
		
		/* file upload */
		cached['.input_transcript'].each(function(index, el) {
			$(el).rules('add'
					, {
						extension : 'pdf|doc|docx|jpg|jpeg|png'
						, messages : {
							extension : 'Valid file format pdf|doc|docx|jpg|jpeg|png'
						}
					}
			);
		});
		
		cached['.input_resume'].each(function(index, el) {
			$(el).rules('add'
					, {extension : 'pdf|doc|docx'
						, messages : {
							extension : 'Valid file format pdf|doc|docx'
						}
					}
			);
		});
		
		/* gpa */
		cached['.input_gpa'].each(function(index, el) {
			$(el).rules('add'
					, {gpa : true}
			);
		});
		
		/* numeric */
		cached['.input_numeric'].each(function(index, el) {
			$(el).rules('add'
					, {number : true}
			);
		});
		
		/* long_numeric */
		cached['.input_long_numeric'].each(function(index, el) {
			$(el).rules('add'
					, {number : true}
			);
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
										orch_password : true,
										equalTo : '#txt' + confirm
									}
				);
			} else {
				var origin = confirm.replace('confirm_confirm_', '');
				//secondary
				$(el).rules('add'
									, {
										minlength : 6,
										orch_password : true,
										equalTo : '#txt' + origin
									}
				);
			}
		});
		
		/* console password */
		cached['.input_console_password'].each(function(index, el) {
			var confirm = $(el).data('match');
			if (confirm.indexOf('confirm_confirm_') < 0) {
				//primary
				$(el).rules('add'
									, {
										required : true,
										equalTo : '#txt' + confirm
									}
				);
			} else {
				var origin = confirm.replace('confirm_confirm_', '');
				//secondary
				$(el).rules('add'
									, {
										required : true,
										equalTo : '#txt' + origin
									}
				);
			}
		});
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
			$('#' + id).val($(this).val()).trigger('change');;
		});
		
		//checkbox
		cached['.fotf_checkbox'].change(function(event) {
			var id = 'hd_' + $(this).attr('name');
			if ($(this).prop('checked')) {
				$('#' + id).val(true).trigger('change');;
			} else {
				$('#' + id).val(false).trigger('change');;
			}
		});
		
		//dropdown
		cached['.fotf_dropdown'].change(function(event) {
			var id = 'hd_' + $(this).attr('name')
			$('#' + id).val($(this).val()).trigger('change');
		});

		if (opts.is_portal) {
			$('select.fotf_dropdown').dropdown();
		}
		
		//us / international textbox and checkbox
		this._bindPhoneUSInternationalToggle();
		
		//generic dropdown toggle
		this._bindDropdownToggle();
		
		//text area word count
		this._bindTextAreaWordCount();

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
				, $input_required = $table.find('input.required, select.required, textarea.required')
				, $portal_input_required = $table.find('input.input_required, select.input_required')
				, $input_password = $table.find('input.validate-password')
				, $input_console_password = $table.find('input.validate-console_password')
				, $input_sql_year = $table.find('input.validate-sql_year')
				, $input_email = $table.find('input.validate-email')
				, $input_common_email = $table.find('input.validate-common_email')
				, $input_gpa = $table.find('input.validate-gpa')
				, $input_numeric = $table.find('input.validate-numeric')
				, $input_long_numeric = $table.find('input.validate-long_numeric')
				, $input_transcript = $table.find('input.validate-transcript')
				, $input_resume = $table.find('input.validate-resume')
				, $fotf_radio = $table.find('.fotf_radio')
				, $fotf_checkbox = $table.find('.fotf_checkbox')
				, $fotf_dropdown = $table.find('select.fotf_dropdown')
				, $input_mask_year = $table.find('input.mask-year')
				, $input_mask_zip = $table.find('input.mask-zip')
				, $input_mask_gpa = $table.find('input.mask-gpa')
				, $input_mask_numeric = $table.find('input.mask-numeric')
				, $input_mask_long_numeric = $table.find('input.mask-long_numeric')
				, $input_mask_absolute_phone_us = $table.find('input.mask-absolute_phone_us')
				, $input_checkbox_phone_international = $table.find('input.checkbox-phone_international');
		
		this.cached = {
			'table' : $table
			, 'field_all' : $field_all
			, '.button_action' : $button_action
			, '.required' : $required
			, '.input_required' : $input_required
			, '.portal_input_required' : $portal_input_required
			, '.input_password' : $input_password
			, '.input_console_password' : $input_console_password
			, '.input_sql_year' : $input_sql_year
			, '.input_email' : $input_email
			, '.input_common_email' : $input_common_email
			, '.input_gpa' : $input_gpa
			, '.input_numeric' : $input_numeric
			, '.input_long_numeric' : $input_long_numeric
			, '.input_transcript' : $input_transcript
			, '.input_resume' : $input_resume
			, '.fotf_radio' : $fotf_radio
			, '.fotf_checkbox' : $fotf_checkbox
			, '.fotf_dropdown' : $fotf_dropdown
			, '.input_mask_year' : $input_mask_year
			, '.input_mask_zip' : $input_mask_zip
			, '.input_mask_gpa' : $input_mask_gpa
			, '.input_mask_numeric' : $input_mask_numeric
			, '.input_mask_long_numeric' : $input_mask_long_numeric
			, '.input_mask_absolute_phone_us' : $input_mask_absolute_phone_us
			, '.input_checkbox_phone_international' : $input_checkbox_phone_international
		};
	}
});

$.widget( "orchestrate.fotf_adv_query_questions", $.orchestrate.fotf_questions, {
	
	_addCountry: function(pObjName) {
		popup('/console/include/country_list.asp?objName='+pObjName, 600, 250) 
	},

	_addState : function(pObjName)
	{
		popup('/console/include/state_list.asp?objName='+pObjName, 600, 250) 
	},
	
	_addClassLevels : function(pObjName)
	{
		popup('/console/include/classlevels_list.asp?objName='+pObjName, 600, 250) 
	},

	_removeOptions : function(pObjName)
	{
		if (pObjName != '') {
			var val = $('#' + pObjName).val();
			if (val) {
				$.each(val, function(index, val) {
					$('#' + pObjName + ' option[value=' + val + ']').remove();
				});
			} else {
				//console.log('removeOptions : do nothing');
			}
		} else {
			//console.log('removeOptions : pObjName not found');
		}
	},

	_validation: function() {
		var self = this
				, opts = self.options
				, cached = self.cached;	
		
		
		/* style */
		cached['table'].find('label.error').css('color', 'red');
		
		self.form_elem.validate({

		});
		
		$('.input_greater_less').rules("add", { 
			required_on_click:true
		});
	},

	/**
	 * _bindUIActions : bind UI Event on record_list
	 */
	_bindUIActions: function() {
		var self = this,
				cached = this.cached,
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

		//country
		this.form_elem.find('.btn-add_country').each(function(index, el) {
			$(el).click(function(event) {
				event.preventDefault();
				var elem = $(this).data('object-name');
				self._addCountry(elem);
			});
		});

		//state
		this.form_elem.find('.btn-add_state').each(function(index, el) {
			$(el).click(function(event) {
				var elem = $(this).data('object-name');
				self._addState(elem);
			});
		});
		
		//class levels
		this.form_elem.find('.btn-add_classlevels').each(function(index, el) {
			$(el).click(function(event) {
				var elem = $(this).data('object-name');
				self._addClassLevels(elem);
			});
		});
		
		//remove
		this.form_elem.find('.btn-remove').each(function(index, el) {
			$(el).click(function(event) {
				var elem = $(this).data('object-name');
				self._removeOptions(elem);
			});
		});
	},
});