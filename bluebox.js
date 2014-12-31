// the widget definition, where "squareui" is the namespace,
// "bluebox" the widget name
$.widget( "orchestrate.bluebox", {
	// default options
	options: {
		record_button : '',
		isShow : false,
		form_button : '',
		form_target : '',
		form_id : '',
		is_upload : false,
		upload : {},
		validation : {}
	},

	/**
	 * _create : constructor
	 */
	_create: function() {

		// get the select element
		var opts = this.options;
		this.bluebox = $(this.element);

		// cache commonly used elements
		this._cacheElements();

		// bind UI actions
		this._bindUIActions();

		this._refresh();
	},

	// called when created, and later when changing options
	_refresh: function() {
	},

	// events bound via _on are removed automatically
	// revert other modifications here
	_destroy: function() {
		this.bluebox.remove();
		this.element.show();
	},

	_popup: function(URL, pWidth, pHeight){
		var iHandle = window.open(URL,'_blank','width=' + pWidth + ',height=' + pHeight + ',toolbar=no,top=100,left=100,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,copyhistory=no,resizable=yes');
		popupHandle[ iTotalPopup++ ] = iHandle;
		return true;
	},

	/**
	 * [uploadAcceptFileType description]
	 * @return {[type]} [description]
	 */
	uploadAcceptFileType: function() {
		var cached = this.cached,
				valid = true,
				opts = this.options;
		
		if (opts.upload) {
			$.each(opts.upload, function(index, val) {
				opts.validation[index] = true;
				if ($('#' + index).val() != '') {
					var ext = $('#' + index).val().split('.').pop().toLowerCase();
						if($.inArray(ext, val) == -1) {
							opts.validation[index] = 'please upload correct format [' + val + ']';
					    	valid = false;
						}
				}
			});
		}
		return valid;
	},

	_openContent: function(a,b, pTrigger) {
		var cached = this.cached,
				form = cached['.bluebox-toggle_form'],
				view = cached['.bluebox-toggle_view'];

		if(
			( !a && !b ) 
			|| ( a || b ) && !( a && b ) 
			) 
		{
			cached['.bluebox-content'].slideToggle();
		} else {
			if (pTrigger == 'view') {
				form.data('open', false);
			} else if (pTrigger == 'form') {
				view.data('open', false);
			}
		}
	},
	
	_viewBox: function(e) {
		var cached = this.cached,
				form = cached['.bluebox-toggle_form'],
				view = cached['.bluebox-toggle_view'],
				label = view.html();
		e.preventDefault();
		
		if (label == 'Hide') {
			label = 'Show';
			view.data('open', false);
		} else {
			label = 'Hide';
			view.data('open', true);
			if (form.data('open')) {
				cached['.bluebox-form'].slideToggle();
			}
			form.html('Edit');
		}
		this._openContent(view.data('open'),form.data('open'), 'view');

		view.html('');
		view.html(label);
		cached['.bluebox-view'].slideToggle();
	},
	
	_formBox: function(e) {
		var cached = this.cached,
				form = cached['.bluebox-toggle_form'],
				view = cached['.bluebox-toggle_view'],
				label = form.html();
		e.preventDefault();

		if (label == 'Cancel') {
			label = 'Edit';
			form.data('open', false);
		} else {
			label = 'Cancel';
			form.data('open', true);
			if (view.data('open')) {
				cached['.bluebox-view'].slideToggle();
			}
			view.html('Show');
		}
		this._openContent(view.data('open'),form.data('open'), 'form');
		
		form.html('');
		form.html(label);
		cached['.bluebox-form'].slideToggle();
	},

	_hideAll: function() {
		var cached = this.cached;
		$.each(cached, function(index, val) {
			val.hide();
		});
	},
	
	_showAll: function() {
		var cached = this.cached;
		$.each(cached, function(index, val) {
			val.show();
		});
	},
	
	_showUploadHiddenField: function() {
		var cached = this.cached,
				opts = this.options;		
		cached['.bluebox-form'].find('.upload-hidden_ori').each(function(index, el) {
			//console.log($(el).val());
			if ($(el).val() != '') {
				$(el).parent('.upload-hidden').show();
				$(el).parent('.upload-hidden').siblings('.upload-hidden').show();
			}
		});
	},

	_formAction: function(e) {
		var self = this,
				cached = this.cached,
				opts = this.options;
		
		//validation rules
		var valid = true
		if (opts.is_upload) {
			valid = self.uploadAcceptFileType();
		}

		if (!valid) {
			var message = "";
			$.each(opts.validation, function(index, val) {
				message += "- " + val;
			});
			alert(message);
		} else {
			self.form_data = new FormData($(opts.form_id)[0]);

			$.ajax({
				url: opts.form_target,
				data: self.form_data,
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				beforeSend : function () {
					if ($.blockUI) {
						$.blockUI({ 
								message: 'UPDATED', 
								fadeIn: 700, 
								fadeOut: 700, 
								timeout: 2000, 
								showOverlay: false, 
								centerY: false, 
								css: { 
										width: '350px', 
										top: '10px', 
										left: '', 
										right: '10px', 
										border: 'none', 
										padding: '5px', 
										backgroundColor: '#000', 
										'-webkit-border-radius': '10px', 
										'-moz-border-radius': '10px', 
										opacity: .6, 
										color: '#fff' 
								} 
						}); 
					} else {
						alert('record updated');
					}
				}
			})
			.done(function (data, textStatus, jqXHR) {
				if ( data.indexOf('<!--DELIMITER-->') > -1 ) {
					var array = data.split('<!--DELIMITER-->');
					//view
					cached['.bluebox-view'].children('table').html(array[0])
					
					//form
					var status = '';
					if ( array[1].indexOf('||~~~||') > -1 ) {
						var values = array[1].split('||~~~||');
						//console.log('input debug');
						//console.log(cached['.bluebox-form'].find('textarea, input:not([type=file]):not([type=button]):not([type=radio])'));
						cached['.bluebox-form'].find('textarea, input:not([type=file]):not([type=button]):not([type=radio])').each(function(index, el) {
							$(el).val(values[index]);
							//console.log(el.name);
							if (el.name == 'hdstatus') {
								status = values[index]
							}
						});
					}
					self._showUploadHiddenField();
					self._changeStatusColor();
				}
				console.log('success');
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			})
			.always(function() {
				console.log("complete");
			});
		}
	},

	_changeStatusColor: function() {
		var cached = this.cached,
			opts = this.options;

		var status = cached['.bluebox-form'].find('.hidden-status').val();
		if (status < 1) {
			cached['.header-application_status'].removeClass('green');
			cached['.header-application_status'].addClass('red');
		} else {
			cached['.header-application_status'].removeClass('red');
			cached['.header-application_status'].addClass('green');
		}
	},

	/**
	 * _bindUIActions : bind UI Event on bluebox
	 */
	_bindUIActions: function() {
		var cached = this.cached,
			opts = this.options;
		// hide select element 
		// initial show/hide
		this._hideAll();
		if (this.options.isShow) {
			this._showAll();
		}
		cached['.header-application_status'].show();
		cached['.bluebox-toggle_view'].show();
		cached['.bluebox-toggle_form'].show();
		cached['.bluebox-toggle_view'].data('open', false);
		cached['.bluebox-toggle_form'].data('open', false);
		
		//show/hide
		this._on(cached['.bluebox-toggle_view'], {
			click: '_viewBox'
		});
		
		//view/form
		this._on(cached['.bluebox-toggle_form'], {
			click: '_formBox'
		});
		
		//header column status change
		this._changeStatusColor();

		//action
		if (opts.form_button != '') {
			this._on($(opts.form_button), {
				click: '_formAction',
			});
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
		var $bluebox = this.bluebox,
			$header    = $bluebox.find('.header-application_status'),
			$toggle_form    = $bluebox.find('.bluebox-toggle_form'),
			$toggle_view = $bluebox.find('.bluebox-toggle_view'),
			$content = $bluebox.find('.bluebox-content'),
			$view    = $bluebox.find('.bluebox-view'),
			$form    = $bluebox.find('.bluebox-form'),
			$form_field    = $bluebox.find('.bluebox-form_field');

		this.cached = {
			'.header-application_status'    : $header,
			'.bluebox-toggle_form'    : $toggle_form,
			'.bluebox-toggle_view' : $toggle_view,
			'.bluebox-content' : $content,
			'.bluebox-view'    : $view,
			'.bluebox-form'    : $form,
			'.bluebox-form_field'    : $form_field
		};
	}
});

$.widget( "orchestrate.course_bluebox", $.orchestrate.bluebox, {
	
	_formActionSubmit: function(self, cached, opts) {

		self.form_data = new FormData($(opts.form_id)[0]);
		$.ajax({
			url: opts.form_target,
			data: self.form_data,
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			beforeSend : function () {
				if ($.blockUI) {
					$.blockUI({ 
							message: 'UPDATED', 
							fadeIn: 700, 
							fadeOut: 700, 
							timeout: 2000, 
							showOverlay: false, 
							centerY: false, 
							css: { 
									width: '350px', 
									top: '10px', 
									left: '', 
									right: '10px', 
									border: 'none', 
									padding: '5px', 
									backgroundColor: '#000', 
									'-webkit-border-radius': '10px', 
									'-moz-border-radius': '10px', 
									opacity: .6, 
									color: '#fff' 
							} 
					}); 
				} else {
					alert('record updated');
				}
			}
		})
		.done(function (data, textStatus, jqXHR) {
			if ( data.indexOf('<!--DELIMITER-->') > -1 ) {
				var array = data.split('<!--DELIMITER-->');
				//view
				cached['.bluebox-view'].children('table').html(array[0])
				
				//form
				var status = '';
				var course_title = '';
				if ( array[1].indexOf('||~~~||') > -1 ) {
					var values = array[1].split('||~~~||');
					//console.log('input debug');
					//console.log(cached['.bluebox-form'].find('textarea, input:not([type=file]):not([type=button]):not([type=radio])'));
					cached['.bluebox-form'].find('textarea, input:not([type=file]):not([type=button]):not([type=radio])').each(function(index, el) {
						$(el).val(values[index]);
						//console.log(el.name);
						if (el.name == 'hdstatus') {
							status = values[index]
						}
						else if (el.name == 'hdCourseTitle') {
							course_title = values[index]
						}
					});
				}
				self._showUploadHiddenField();
				self._changeStatusColor();
				self._synchedDropdownAfterAction();
				self.bluebox.find('.header-application_status').html(course_title);
				self.bluebox.find('.header-application_status_details').html('(' + status + ')');
				self.bluebox.find('.form-application_status').html('<strong>' + status + '</strong>');
				self.bluebox.find('.form-application_course_title').html('<strong>' + course_title + '</strong>');
			} else if ( data.indexOf('<!--RELOAD-->') > -1 ) {
				window.location.reload();
			}
			console.log('success');
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			console.log(errorThrown);
		})
		.always(function() {
			console.log("complete");
		});
	},
		
	_formCancel: function(e) {
		var self = this,
				cached = self.cached,
				opts = self.options;
		cached['.bluebox-toggle_form'].trigger('click');
	},
	
	_formAction: function(e) {
		var self = this,
				cached = this.cached,
				opts = this.options;
		
		//validation rules
		var valid = true
		if (opts.is_upload) {
			valid = self.uploadAcceptFileType();
		}

		
		if (!valid) {
			var message = "";
			$.each(opts.validation, function(index, val) {
				message += "- " + val;
			});
			alert(message);
		} else {
			var new_courseid = cached['.bluebox-form'].find('#selPreference').val();
			var old_courseid = cached['.bluebox-form'].find('#hd_selPreference').val();
			console.log(new_courseid);
			console.log(old_courseid);
			if (new_courseid != old_courseid) {
				var dialog = '<div id="dialog-confirm" title="Change Preference?">' +
											'<p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 80px 0;"></span>' + 
											' Changing the course will reset <br/>the related course-specific <br/>question.' +
											'<br/>Would you like to continue?.</p>' +
											'</div>'
				//dialog before submit on changed preference
				$(dialog).dialog({
					resizable: false,
					height: 300,
					width: 300,
					modal: true,
					position: {my: 'left', at:'center', of:cached['.bluebox-content']},
					buttons: {
						Yes : function (e) {
							self.form_data = new FormData($(opts.form_id)[0]);
							$.ajax({
								url: opts.form_target,
								data: self.form_data,
								cache: false,
								contentType: false,
								processData: false,
								type: 'POST',
								beforeSend : function () {
									if ($.blockUI) {
										$.blockUI({ 
												message: 'UPDATED', 
												fadeIn: 700, 
												fadeOut: 700, 
												timeout: 2000, 
												showOverlay: false, 
												centerY: false, 
												css: { 
														width: '350px', 
														top: '10px', 
														left: '', 
														right: '10px', 
														border: 'none', 
														padding: '5px', 
														backgroundColor: '#000', 
														'-webkit-border-radius': '10px', 
														'-moz-border-radius': '10px', 
														opacity: .6, 
														color: '#fff' 
												} 
										}); 
									} else {
										alert('record updated');
									}
								}
							})
							.done(function (data, textStatus, jqXHR) {
								if ( data.indexOf('<!--DELIMITER-->') > -1 ) {
									var array = data.split('<!--DELIMITER-->');
									//view
									cached['.bluebox-view'].children('table').html(array[0])
									
									//form
									var status = '';
									var course_title = '';
									if ( array[1].indexOf('||~~~||') > -1 ) {
										var values = array[1].split('||~~~||');
										//console.log('input debug');
										//console.log(cached['.bluebox-form'].find('textarea, input:not([type=file]):not([type=button]):not([type=radio])'));
										cached['.bluebox-form'].find('textarea, input:not([type=file]):not([type=button]):not([type=radio])').each(function(index, el) {
											$(el).val(values[index]);
											//console.log(el.name);
											if (el.name == 'hdstatus') {
												status = values[index]
											}
											else if (el.name == 'hdCourseTitle') {
												course_title = values[index]
											}
										});
									}
									self._showUploadHiddenField();
									self._changeStatusColor();
									self._synchedDropdownAfterAction();
									self.bluebox.find('.header-application_status').html(course_title);
									self.bluebox.find('.header-application_status_details').html('(' + status + ')');
									self.bluebox.find('.form-application_status').html('<strong>' + status + '</strong>');
									self.bluebox.find('.form-application_course_title').html('<strong>' + course_title + '</strong>');
								} else if ( data.indexOf('<!--RELOAD-->') > -1 ) {
									window.location.reload();
								}
								console.log('success');
								//TODO
								//ajax please
								window.location.reload();
							})
							.fail(function (jqXHR, textStatus, errorThrown) {
								console.log(errorThrown);
							})
							.always(function() {
								console.log("complete");
							});
							$(this).dialog('close');
						},
						No : function (e) {
							$(this).dialog('close');
						}
					}
				});
			} else {
				self.form_data = new FormData($(opts.form_id)[0]);
				$.ajax({
					url: opts.form_target,
					data: self.form_data,
					cache: false,
					contentType: false,
					processData: false,
					type: 'POST',
					beforeSend : function () {
						if ($.blockUI) {
							$.blockUI({ 
									message: 'UPDATED', 
									fadeIn: 700, 
									fadeOut: 700, 
									timeout: 2000, 
									showOverlay: false, 
									centerY: false, 
									css: { 
											width: '350px', 
											top: '10px', 
											left: '', 
											right: '10px', 
											border: 'none', 
											padding: '5px', 
											backgroundColor: '#000', 
											'-webkit-border-radius': '10px', 
											'-moz-border-radius': '10px', 
											opacity: .6, 
											color: '#fff' 
									} 
							}); 
						} else {
							alert('record updated');
						}
					}
				})
				.done(function (data, textStatus, jqXHR) {
					if ( data.indexOf('<!--DELIMITER-->') > -1 ) {
						var array = data.split('<!--DELIMITER-->');
						//view
						cached['.bluebox-view'].children('table').html(array[0])
						
						//form
						var status = '';
						var course_title = '';
						if ( array[1].indexOf('||~~~||') > -1 ) {
							var values = array[1].split('||~~~||');
							//console.log('input debug');
							//console.log(cached['.bluebox-form'].find('textarea, input:not([type=file]):not([type=button]):not([type=radio])'));
							cached['.bluebox-form'].find('textarea, input:not([type=file]):not([type=button]):not([type=radio])').each(function(index, el) {
								$(el).val(values[index]);
								//console.log(el.name);
								if (el.name == 'hdstatus') {
									status = values[index]
								}
								else if (el.name == 'hdCourseTitle') {
									course_title = values[index]
								}
							});
						}
						self._showUploadHiddenField();
						self._changeStatusColor();
						self._synchedDropdownAfterAction();
						self.bluebox.find('.header-application_status').html(course_title);
						self.bluebox.find('.header-application_status_details').html('(' + status + ')');
						self.bluebox.find('.form-application_status').html('<strong>' + status + '</strong>');
						self.bluebox.find('.form-application_course_title').html('<strong>' + course_title + '</strong>');
					} else if ( data.indexOf('<!--RELOAD-->') > -1 ) {
						window.location.reload();
					}
					console.log('success');
				})
				.fail(function (jqXHR, textStatus, errorThrown) {
					console.log(errorThrown);
				})
				.always(function() {
					console.log("complete");
				});
			}
		}
	},

	_recordButtonBind: function(e) {
		var cached = this.cached,
				opts = this.options;
				self = this;
		
		if (opts.record_button != '') {
			cached['.bluebox-form'].find('input.bluebox-record_popup').click(function(event) {
				/* Act on the event */
				var url = $(this).data('url');
				self._popup(url, 600, 300);
			});
		}
	},

	_courseSpecificQuestion: function(e) {
		var cached = this.cached,
				opts = this.options;
		
		var courseid = cached['.bluebox-form'].find('#hdc').val();
		var order = cached['.bluebox-form'].find('#hdOrder').val();
		cached['.bluebox-form'].find('.table_row-course').hide();
		cached['.bluebox-form'].find('#table_row-course_' + order + '_' + courseid ).show();
	},

	_preferenceDropdownAction: function(revid, courseid, order) {
		var cached = this.cached,
				opts = this.options,
				self = this;

		if (revid > 0 && courseid > 0) {
			var course_to_reviewer = cached['.bluebox-form'].find('input.ReviewerToName').val();
			var reviewer_id = 0
			var reviewer_title = 0
			var found = false
			cached['.bluebox-form'].find('.table_row-course').hide();
			if (course_to_reviewer) {
				if (course_to_reviewer.indexOf('||') > 0) {
					arrTmp1 = course_to_reviewer.split('||');
					$.each(arrTmp1, function(index, val) {
						if (!found) {
							if (val.indexOf('~') > 0) {
								arrTmp2 = val.split('~');
								reviewer_id   = arrTmp2[0];
								reviewer_title = arrTmp2[1];
								if (revid == reviewer_id) {
									found = true
									cached['.bluebox-form'].find('.AssociatedReviewer').children('td').next().html(reviewer_title);
									cached['.bluebox-form'].find('#hdr').val(reviewer_id);
									cached['.bluebox-form'].find('#hdc').val(courseid);
									cached['.bluebox-form'].find('#table_row-course_' + order + '_' + courseid ).show();
								}
							}
						}
					});
				}
			}
		} else {
			cached['.bluebox-form'].find('.AssociatedReviewer').children('td').next().html('-');
			cached['.bluebox-form'].find('#hdr').val(0);
			cached['.bluebox-form'].find('#hdc').val(0);
		}
	},

	_synchedDropdownAfterAction: function() {
		var cached = this.cached,
				opts = this.options,
				self = this;

		if ($('#BlueBoxCourseSecondPreference')) {
			var course_1 = $('#BlueBoxCourseFirstPreference').find('#hdc').val();
			var course_2 = $('#BlueBoxCourseSecondPreference').find('#hdc').val();
			$('#BlueBoxCourseFirstPreference')
				.find('.PreferenceDropdown').children('option.hidden-options').show();
			$('#BlueBoxCourseSecondPreference')
				.find('.PreferenceDropdown').children('option.hidden-options').show();
			$('#BlueBoxCourseSecondPreference')
				.find('.PreferenceDropdown').children('option[value=' + course_1 + ']').hide();
			$('#BlueBoxCourseSecondPreference')
				.find('.PreferenceDropdown').children('option[value=' + course_1 + ']').addClass('hidden-options');
			$('#BlueBoxCourseFirstPreference')
				.find('.PreferenceDropdown').children('option[value=' + course_2 + ']').hide();
			$('#BlueBoxCourseFirstPreference')
				.find('.PreferenceDropdown').children('option[value=' + course_2 + ']').addClass('hidden-options');
		}
	},

	_synchedDropdown: function(revid, courseid, order) {
		var cached = this.cached,
				opts = this.options,
				self = this;

		if ($('#BlueBoxCourseSecondPreference')) {
			var course_1 = $('#BlueBoxCourseFirstPreference').find('#hdc').val();
			var course_2 = $('#BlueBoxCourseSecondPreference').find('#hdc').val();
			if (course_1 == course_2) {
				if (order == 1) {
					$('#BlueBoxCourseSecondPreference')
						.find('.PreferenceDropdown').children('option[value=0]').prop('selected', true);
					$('#BlueBoxCourseSecondPreference')
						.find('.PreferenceDropdown').children('option.hidden-options').show();
					$('#BlueBoxCourseSecondPreference')
						.find('.PreferenceDropdown').children('option[value=' + course_1 + ']').hide();
					$('#BlueBoxCourseSecondPreference')
						.find('.PreferenceDropdown').children('option[value=' + course_1 + ']').addClass('hidden-options');
				} else if (order == 2) {
					$('#BlueBoxCourseFirstPreference')
						.find('.PreferenceDropdown').children('option[value=0]').prop('selected', true);
					$('#BlueBoxCourseFirstPreference')
						.find('.PreferenceDropdown').children('option.hidden-options').show();
					$('#BlueBoxCourseFirstPreference')
						.find('.PreferenceDropdown').children('option[value=' + course_2 + ']').hide();
					$('#BlueBoxCourseFirstPreference')
						.find('.PreferenceDropdown').children('option[value=' + course_2 + ']').addClass('hidden-options');
				}
				self._preferenceDropdownActionOpposite(0, 0, order);
			}
		}
	},

	_preferenceDropdownActionOpposite: function(revid, courseid, order) {
		var cached = this.cached,
				opts = this.options,
				self = this;
		
		var	object = $('#BlueBoxCourseFirstPreference');
		if (order == 1) {
			object = $('#BlueBoxCourseSecondPreference');
		}

		if (revid > 0 && courseid > 0) {
			var course_to_reviewer = object.find('input.ReviewerToName').val();
			var reviewer_id = 0
			var reviewer_title = 0
			var found = false
			object.find('.table_row-course').hide();
			if (course_to_reviewer) {
				if (course_to_reviewer.indexOf('||') > 0) {
					arrTmp1 = course_to_reviewer.split('||');
					$.each(arrTmp1, function(index, val) {
						if (!found) {
							if (val.indexOf('~') > 0) {
								arrTmp2 = val.split('~');
								reviewer_id   = arrTmp2[0];
								reviewer_title = arrTmp2[1];
								if (revid == reviewer_id) {
									found = true
									object.find('.AssociatedReviewer').children('td').next().html(reviewer_title);
									object.find('#hdr').val(reviewer_id);
									object.find('#hdc').val(courseid);
									object.find('#table_row-course_' + order + '_' + courseid ).show();
								}
							}
						}
					});
				}
			}
		} else {
			object.find('.AssociatedReviewer').children('td').next().html('-');
			object.find('#hdr').val(0);
			object.find('#hdc').val(0);
		}
	},
		
	_preferenceDropdown: function(e) {
		var cached = this.cached,
				opts = this.options,
				self = this;

		var revid = cached['.bluebox-form'].find('.PreferenceDropdown :selected').data('revid');
		var courseid = cached['.bluebox-form'].find('.PreferenceDropdown :selected').val();
		var order = cached['.bluebox-form'].find('#hdOrder').val();
		self._preferenceDropdownAction(revid, courseid, order);
		//synched dropdown
		self._synchedDropdown(revid, courseid, order);
	},

	/**
	 * _bindUIActions : bind UI Event on bluebox
	 */
	_bindUIActions: function() {
		var cached = this.cached,
			opts = this.options;
		// hide select element 
		// initial show/hide
		this._hideAll();
		if (this.options.isShow) {
			this._showAll();
		}
		cached['.header-application_status'].show();
		cached['.bluebox-toggle_view'].show();
		cached['.bluebox-toggle_form'].show();
		cached['.bluebox-toggle_view'].data('open', false);
		cached['.bluebox-toggle_form'].data('open', false);
		
		//show/hide
		this._on(cached['.bluebox-toggle_view'], {
			click: '_viewBox'
		});
		
		//view/form
		this._on(cached['.bluebox-toggle_form'], {
			click: '_formBox'
		});
		
		//header column status change
		this._changeStatusColor();
		
		//record button bind
		this._recordButtonBind();

		//init dropdown bind
		this._courseSpecificQuestion();
		
		//dropdown bind
		cached['.bluebox-form']
			.find('.PreferenceDropdown')
			.children('option.hidden-options').hide();
		this._on(cached['.bluebox-form'].find('.PreferenceDropdown'), {
			change: '_preferenceDropdown'
		});

		//action
		if (opts.form_button != '') {
			this._on($(opts.form_button), {
				click: '_formAction',
			});
		}
		
		//additional cancel
		if (opts.form_cancel != '') {
			this._on($(opts.form_cancel), {
				click: '_formCancel',
			});
		}
	}
});

$.widget( "orchestrate.honoree_bluebox", $.orchestrate.bluebox, {
	
	/**
	 * [updateChangeTo description]
	 * @param  {[type]} a [description]
	 * @param  {[type]} b [description]
	 * @return {[type]}   [description]
	 */
	updateChangeTo: function(a,b) {
		if(b) {
			if (a >= 5 && b >= 2) {
				$('#btnHonoreeAcceptanceUpdateChangeTo').show();
			} else {
				$('#btnHonoreeAcceptanceUpdateChangeTo').hide();
			}
		}
	},

	_updateAcceptanceStatus: function() {
		var self = this,
				cached = this.cached,
				opts = this.options;

		var status = cached['.hidden-status'].val();
		$.ajax({
			url: '/console/scholarships/applications/honoree_ajax_utility.asp',
			type: 'POST',
			dataType: 'html',
			data: {status: status},
		})
		.done(function (data, textStatus, jqXHR) {
			self.bluebox.find('.header-application_status').html(data);
			self.bluebox.find('.form-application_status').html('<strong>' + data + '</strong>');
			console.log("success");
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	},

	_formAction: function(e) {
		var self = this,
				cached = this.cached,
				opts = this.options;
		
		//validation rules
		valid = self.uploadAcceptFileType();
		if (!valid) {
			var message = "";
			$.each(opts.validation, function(index, val) {
				message += "- " + val;
			});
			alert(message);
		} else {
			self.form_data = new FormData($(opts.form_id)[0]);

			$.ajax({
				url: opts.form_target,
				data: self.form_data,
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				beforeSend : function () {
					/**
					css: { 
			            border: 'none', 
			            padding: '15px', 
			            backgroundColor: '#000', 
			            '-webkit-border-radius': '10px', 
			            '-moz-border-radius': '10px', 
			            opacity: .5, 
			            color: '#fff' 
				        }
					/**/
					if ($.blockUI) {
						$.blockUI({ 
								message: 'UPDATED', 
								fadeIn: 700, 
								fadeOut: 700, 
								timeout: 2000, 
								showOverlay: false, 
								centerY: false, 
								css: { 
										width: '350px', 
										top: '10px', 
										left: '', 
										right: '10px', 
										border: 'none', 
										padding: '5px', 
										backgroundColor: '#000', 
										'-webkit-border-radius': '10px', 
										'-moz-border-radius': '10px', 
										opacity: .6, 
										color: '#fff' 
								} 
						}); 
					} else {
						alert('record updated');
					}
				}
			})
			.done(function (data, textStatus, jqXHR) {
				if ( data.indexOf('<!--DELIMITER-->') > -1 ) {
					var array = data.split('<!--DELIMITER-->');
					//view
					cached['.bluebox-view'].children('table').html(array[0])
					
					//form
					if ( array[1].indexOf('||~~~||') > -1 ) {
						var values = array[1].split('||~~~||');
						cached['.bluebox-form'].find('input:not([type=file]):not([type=button]):not([type=radio])').each(function(index, el) {
							$(el).val(values[index]);
						});
					}

					self._showUploadHiddenField();
					self._changeStatusColor();
					self._updateAcceptanceStatus();
					var a = cached['.bluebox-form'].find('#hdstatus').val();
					var b = cached['.bluebox-form'].find('#hd_selHonoreeAcceptanceStatus').val();
					self.updateChangeTo(a,b);
				}
				console.log('success');
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			})
			.always(function() {
				console.log("complete");
			});
		}
	},

	/**
	 * _cacheElements : cached DOM Elements
	 */
	_cacheElements: function() {
		var $bluebox = this.bluebox,
			$header    = $bluebox.find('.header-application_status'),
			$toggle_form    = $bluebox.find('.bluebox-toggle_form'),
			$toggle_view = $bluebox.find('.bluebox-toggle_view'),
			$content = $bluebox.find('.bluebox-content'),
			$view    = $bluebox.find('.bluebox-view'),
			$form    = $bluebox.find('.bluebox-form'),
			$status    = $form.find('.hidden-status'),
			$form_field    = $bluebox.find('.bluebox-form_field');

		this.cached = {
			'.header-application_status'    : $header,
			'.bluebox-toggle_form'    : $toggle_form,
			'.bluebox-toggle_view' : $toggle_view,
			'.bluebox-content' : $content,
			'.bluebox-view'    : $view,
			'.bluebox-form'    : $form,
			'.hidden-status'    : $status,
			'.bluebox-form_field'    : $form_field
		};
	}
});