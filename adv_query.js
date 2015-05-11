Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

// the widget definition, where "orchestrate" is the namespace,
// "adv_query" the widget name
// bind on form containing the record list table
$.widget( "orchestrate.adv_query", {
	//TODO :
	//hide content based on input hidden
	//filter hide all, if multiplefilter <> "" show multiple
	//advanced & simple toggle
	//clear options on toggle
	//button remove
	//update hidden value on change select, multiple
	//create callback on change event, related to
	//differ "change" scope on filter:
	//	remove, add,
	//simple trigger change
	// simple not trigger reset
	//advanced trigger change 
	//application dropdown 
	
	/**
	 * _create : constructor
	 */
	_create: function() {
		// get the select element
		var opts = this.options;
		
		// cache commonly used elements
		this.elem = $(this.element);

		// cache commonly used elements
		this._cacheElements();
		
		// sets up popup object
		this.popup = {} || this.popup;
		// sets up object callback for popup filter
		this._windowPopupFilterCallback();
		// sets up ajax object
		this.ajax = {} || this.ajax;
		// sets up object callback for ajax filter
		this._ajaxFilterCallback();

		// bind UI actions
		this._bindUIActions();
		
		// refresh
		this._refresh();
	},
	
	/**
	 * _filterHideAll : filter hide all filter, shown if multiple filter not empty
	 */
	_filterHideAll: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;
		$.each(cached['.multiple_filter'], function(index, val) {
			var values = $(this).children('.hd_multiple_filter').val();
			if (values) {
				$(this).show();
				$(this).prev('tr').hide();
			} else {
				$(this).hide();
				$(this).prev('tr').show();
			}
		});
	},
	
	/**
	 * _multipleOptionsToggle : toggle visibility on multiple options
		_multipleOptionsToggle: function() {
			var self = this,
					cached = self.cached,
					opts = self.options;
			
			$.each(cached['.multiple_filter'], function(index, val) {
				var options = $(this).find('option');
				var values = $(this).children('.hd_multiple_filter').val();
				if (values) {
					var array = values.split(',');
					$.each(options, function(index, val) {
						if ($.inArray(val.value, array) != -1) {
							$(this).show();
						} else {
							$(this).hide();
						}
					});
				} else {
					//do nothing
				}
			});
		},
	*/
	
	/**
	 * _singleOptionsToggleListener : single options toggle listener
	 */
	_singleOptionsToggleListener: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;
		$.each(cached['.single_filter_select'], function(index, val) {
			/* iterate through single_filter_select */
			$(val).change(function(event) {
				$(this).closest('.single_filter')
								.children('.hd_single_filter')
								.val($(this).val())
								.trigger('change');
				/* filter */
				var query_filter = $(this).closest('.filter')
																	.prevAll('.query_filter:first');
				//ajax callback
				var data = {} || data;
				if (query_filter.data('ajax-callback')) {
					switch(query_filter.data('ajax-callback')) {
						case 'session':
							data.session = $(this).val();

							break;
						case 'program':
							if ($('#hdsel_SessionMultiple').val() != '') {
								data.session = $('#hdsel_SessionMultiple').val();
							} else if ($('#hdsel_SessionSingle').val() != '' 
								&& $('#hdsel_SessionSingle').val() != 0
							) {
								data.session = $('#hdsel_SessionSingle').val();
							} else {
								data.session = '';
							}
							data.program = $(this).val();
							break;
						default : 
					}

					self.ajax.filter[query_filter.data('ajax-callback')](data);
				} else {
					//nothing
				}
			});
		});
	},
	
	/**
		* _multipleOptionsToggleListener : multiple options toggle listener
	*/
	_multipleOptionsToggleListener: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;
		
		$.each(cached['.multiple_filter_select'], function(index, val) {
			$(val).change(function(event) {
				var options = $(this).children('option');
				var values = [];
				$.each(options, function(index, val) {
					values.push($(val).val());
				});
				var query_filter = $(this).closest('.filter')
																	.prevAll('.query_filter:first');
				if (values && query_filter.data('change-trigger')) {
					values = values.join(',');
					$(this).closest('.multiple_filter')
									.children('.hd_multiple_filter')
									.val(values)
									.trigger('change');
					//ajax callback
					var data = {} || data;
					if (query_filter.data('ajax-callback')) {
						switch(query_filter.data('ajax-callback')) {
							case 'session':
								data.session = values;
								break;
							case 'program':
								if ($('#hdsel_SessionMultiple').val() != '') {
									data.session = $('#hdsel_SessionMultiple').val();
								} else if ($('#hdsel_SessionSingle').val() != '' 
									&& $('#hdsel_SessionSingle').val() != 0
								) {
									data.session = $('#hdsel_SessionSingle').val();
								} else {
									data.session = '';
								}
								data.program = values;
								break;
							default : 
						}

						self.ajax.filter[query_filter.data('ajax-callback')](data);
					} else {
						//nothing
					}
				} else {
					$(this).closest('.multiple_filter').val('')
									.children('.hd_multiple_filter')
									.trigger('change');
				}
				//reset trigger back to false
				query_filter.data('change-trigger', false);
			});
		});
	},
	
	/**
	 * _removeMultipleOptions : toggle filter
	 */
	_removeMultipleOptions: function(obj) {
		var self = this,
				cached = self.cached,
				opts = self.options;
		var select = obj.find('select');
		
		select.children('option').each(function(index, el) {
			$(el).remove();
		});
		this._resetValue(obj)
	},
	
	/**
	 * _removeSingleOptions : toggle filter
	 */
	_removeSingleOptions: function(obj) {
		var self = this,
				cached = self.cached,
				opts = self.options;
		var select = obj.find('select');
		this._resetValue(obj)
	},

	/**
	 * _resetValue : reset filter obj value
	 */
	_resetValue: function(obj) {
		var self = this,
				cached = self.cached,
				opts = self.options;
		
		if (obj.hasClass('single_filter')) {
			var single = obj.find('.hd_single_filter');
			var multiple = obj.next('.filter').find('.hd_multiple_filter');
		} else if (obj.hasClass('multiple_filter')) {
			var single = obj.prev('.filter').find('.hd_single_filter');
			var multiple = obj.find('.hd_multiple_filter');
		} else {
			var single = obj.find('.hd_single_filter');
			var multiple = obj.find('.hd_multiple_filter');
		}
		
		if (multiple) {
			multiple.val('').trigger('change');
		} else {
			//do nothing;
		}

		single.val('').trigger('change');
	},

	/**
	 * _buttonAdvancedSimpleToggle : toggle filter
	 */
	_buttonAdvancedSimpleToggle: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;

		$.each(cached['.btn_toggle-advanced'], function(index, val) {
			$(this).click(function(event) {
				/* Act on the event */
				var filter = $(this).closest('.filter');
				filter.hide();
				filter.next('.filter').show();
				var lyr = filter.next('.filter');
				self._removeMultipleOptions(lyr);
				//trigger multiple change
				filter.prev('.query_filter:first').data('change-trigger', true);
				lyr.find('.multiple_filter_select').trigger('change');
			});
		});	
		
		$.each(cached['.btn_toggle-simple'], function(index, val) {
			$(this).click(function(event) {
				var filter = $(this).closest('.filter');
				filter.hide();
				filter.prev('.filter').show();
				var lyr = filter.prev('.filter');
				self._removeSingleOptions(lyr);
				//trigger single change
				filter.prevAll('.query_filter:first').data('change-trigger', true);
				lyr.find('.single_filter_select').trigger('change');
			});
		});	
	},

	/**
	 * _popupAdvancedFilter : popup advanced filter
	 */
	_popupAdvancedFilter: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;
				win_filter = self.options;
		
		$.each(cached['.btn_popup-filter'], function(index, val) {
			$(val).click(function(event) {
				var popup_name = $(this).data('popup');
				var data = {} || data;
				data.program = '';
				data.session = '';
				
				switch(popup_name) {
					case 'program':
						if ($('#hdsel_SessionMultiple').val() != '') {
							data.session = $('#hdsel_SessionMultiple').val();
						} else if ($('#hdsel_SessionSingle').val() != '' 
							&& $('#hdsel_SessionSingle').val() != 0
						) {
							data.session = $('#hdsel_SessionSingle').val();
						} else {
							data.session = '';
						}

						break;
					case 'app_profile':
						if ($('#hdsel_SessionMultiple').val() != '') {
							data.session = $('#hdsel_SessionMultiple').val();
						} else if ($('#hdsel_SessionSingle').val() != '' 
							&& $('#hdsel_SessionSingle').val() != 0
						) {
							data.session = $('#hdsel_SessionSingle').val();
						} else {
							data.session = '';
						}

						if ($('#hdsel_ProgramMultiple').val() != '') {
							data.program = $('#hdsel_ProgramMultiple').val();
						} else if ($('#hdsel_ProgramSingle').val() != '' 
							&& $('#hdsel_ProgramSingle').val() != 0
						) {
							data.program = $('#hdsel_SessionSingle').val();
						} else {
							data.program = '';
						}

						break;
					default : 
				}
				
				//call popup filter
				self.popup.filter[popup_name](data);
			});
		});
	},
	
	/**
	 * _buttonMultipleOptionsRemove : button multiple options
	 */
	_buttonMultipleOptionsRemove: function() {
		var cached = this.cached,
				opts = this.options;

		$.each(cached['.btn-remove'], function(index, val) {
			$(val).click(function(event) {
				var lyr = $(this).closest('.multiple_filter');
				var select = lyr.find('.multiple_filter_select');
				
				//gets hidden value
				var hd_value = lyr.find('.hd_multiple_filter').val();
				if (hd_value) {
					if (hd_value.indexOf(',') > -1) {
						hd_value = hd_value.split(',');
					} else {
						hd_value = [hd_value];
					}
				} else {
					hd_value = [0];
				}

				//alter value
				if (select.val()) {
					var value = select.val();
					var diff_hd_value = [];
					$.each(value, function(index, val) {
						select.find('option[value=' + val + ']').remove();
						if ($.inArray(val, hd_value) > -1 ) {
							diff_hd_value.push(val);
						} else {
							//do nothing
						}
					});

					new_hd_value = hd_value.diff(diff_hd_value);
					//settings filter change flag
					$(val).closest('.filter').prevAll('.query_filter:first')
																		.data('change-trigger', true);
					//setting new hidden value
					select.trigger('change');
					/*
					overlapping
					lyr.find('.hd_multiple_filter').val(new_hd_value.join(','))
																				 .trigger('change');
					 */
				} else {
					//nothing
				}
			});
		});
	},

	/**
	 * _bindUIActions : bind UI Event on record_list
	 */
	_bindUIActions: function() {
		var cached = this.cached,
				opts = this.options;
		// initial filter hide all
		this._filterHideAll();
		// initial options toggle : 
		//this._multipleOptionsToggle();
		// event listener on single changed value
		this._singleOptionsToggleListener();
		// event listener on multiple changed value
		this._multipleOptionsToggleListener();
		//button toggle
		this._buttonAdvancedSimpleToggle();
		//button popup
		this._popupAdvancedFilter();
		//button remove
		this._buttonMultipleOptionsRemove();
	},

	// called when created, and later when changing options
	_refresh: function() {
	},
	
	/**
	 * _windowPopupFilterCallback : cached popup filter using state design
	 */
	_windowPopupFilterCallback: function() {
		var win = {} || win;

		//session filter popup
		win.session = function (data) {
			var iHandle = window.open('popup_session_add.asp','_blank'
																,'width=650,height=350,toolbar=no,top=100' +
																',left=100,location=no,directories=no' +
																',status=yes,menubar=no,scrollbars=yes' +
																',copyhistory=no,resizable=yes');
			popupHandle[ iTotalPopup++ ] = iHandle;
			return true;
		}
		
		//program filter popup
		win.program = function (data) {
			var iHandle = window.open('popup_program_add.asp?session=' + data.session 
																,'_blank'
																,'width=650,height=350,toolbar=no,top=100' +
																',left=100,location=no,directories=no' +
																',status=yes,menubar=no,scrollbars=yes' +
																',copyhistory=no,resizable=yes');
			popupHandle[ iTotalPopup++ ] = iHandle;
			return true;
		}
		
		//app_profile filter popup
		win.app_profile = function (data) {
			var iHandle = window.open('popup_application_add.asp?session=' 
																+ data.session + '&program=' 
																+ data.program,'_blank'
																,'width=650,height=350,toolbar=no,top=100' +
																',left=100,location=no,directories=no' +
																',status=yes,menubar=no,scrollbars=yes' +
																',copyhistory=no,resizable=yes');
			popupHandle[ iTotalPopup++ ] = iHandle;
			return true;
		}
		
		//status filter popup
		win.status = function (data) {
			var iHandle = window.open('popup_status_add.asp','_blank'
																,'width=650,height=350,toolbar=no,top=100' +
																',left=100,location=no,directories=no' +
																',status=yes,menubar=no,scrollbars=yes' +
																',copyhistory=no,resizable=yes');
			popupHandle[ iTotalPopup++ ] = iHandle;
			return true;
		}

		this.popup.filter = win;
	},
	
	/**
	 * [_splitData description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	_splitData: function(data, objName) {
		var self = this,
				cached = self.cached,
				opts = self.options;
		
		if (data && data.indexOf('|||~~|||') > -1) {
			var all = data.split('|||~~|||');
		
			var app_string = all[0];
			$('#' + objName).html('');
			$('#' + objName).append('<option value="0">All</option>');
			if (app_string && app_string.indexOf('~|~|~') > -1) {
				var app = app_string.split('~|~|~');
				$.each(app, function(index, val) {
					if (val && val.indexOf('~~~') > -1) {
						var array = val.split('~~~');
						$('#' + objName)
							.append('<option value="' + 
							array[0] + '">' + 
							decodeURIComponent(array[1]) + '</option>');
					} else {
						//nothing
					}
				});
			} else if (app_string){
				var val = app_string;
				if (val && val.indexOf('~~~') > -1) {
					var array = val.split('~~~');
					$('#' + objName)
						.append('<option value="' + 
						array[0] + '">' + 
						decodeURIComponent(array[1]) + '</option>');
				} else {
					//nothing
				}
			} else {
				//nothing
			}
		} else {
			//nothing
		}
	},

	/*
		_splitProgramAppData: function(data) {
			var self = this,
					cached = self.cached,
					opts = self.options;

			if (data && data.indexOf('|||~~|||') > -1) {
				var all = data.split('|||~~|||');
				var program_string = all[0];
				$('#sel_program').html('');
				$('#sel_program').append('<option value="0">All</option>');
				if (program_string && program_string.indexOf('~|~|~') > -1) {
					var program = program_string.split('~|~|~');
					$.each(program, function(index, val) {
						if (val && val.indexOf('~~~') > -1) {
							var array = val.split('~~~');
							$('#sel_program')
								.append('<option value="' + 
								array[0] + '">' + 
								decodeURI(array[1]) + '</option>');
						} else {
							//nothing
						}
					});
				} else if (program_string) {
					var val = program_string
					if (val && val.indexOf('~~~') > -1) {
						var array = val.split('~~~');
						$('#sel_program')
							.append('<option value="' + 
							array[0] + '">' + 
							decodeURI(array[1]) + '</option>');
					} else {
						//nothing
					}
				} else {
					//nothing
				}
				
				var app_string = all[1];
				$('#sel_application').html('');
				$('#sel_application').append('<option value="0">All</option>');
				if (app_string && app_string.indexOf('~|~|~') > -1) {
					var app = app_string.split('~|~|~');
					$.each(app, function(index, val) {
						if (val && val.indexOf('~~~') > -1) {
							var array = val.split('~~~');
							$('#sel_application')
								.append('<option value="' + 
								array[0] + '">' + 
								decodeURI(array[1]) + '</option>');
						} else {
							//nothing
						}
					});
				} else {
					//nothing
				}
			} else {
				//nothing
			}
		},

		_splitAppData: function(data) {
			if (data && data.indexOf('|||~~|||') > -1) {
				var all = data.split('|||~~|f||');
			
				var app_string = all[0];
				$('#sel_application').html('');
				$('#sel_application').append('<option value="0">All</option>');
				if (app_string && app_string.indexOf('~|~|~') > -1) {
					var app = app_string.split('~|~|~');
					$.each(app, function(index, val) {
						if (val && val.indexOf('~~~') > -1) {
							var array = val.split('~~~');
							$('#sel_application')
								.append('<option value="' + 
								array[0] + '">' + 
								decodeURIComponent(array[1]) + '</option>');
						} else {
							//nothing
						}
					});
				} else if (app_string){
					var val = app_string;
					if (val && val.indexOf('~~~') > -1) {
						var array = val.split('~~~');
						$('#sel_application')
							.append('<option value="' + 
							array[0] + '">' + 
							decodeURIComponent(array[1]) + '</option>');
					} else {
						//nothing
					}
				} else {
					//nothing
				}
			} else {
				//nothing
			}
		},
	*/

	/**
	 * _ajaxFilterCallback : cached popup filter using state design
	 */
	_ajaxFilterCallback: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;

		var ajaxXHR = {} || ajaxXHR;

		//session ajax filter
		ajaxXHR.session = function (data) {
			$.ajax({
				url: '/console/scholarships/advanced_search/getProgramApplicationSite.asp',
				type: 'GET',
				data: {session: data.session},
			})
			.done(function (data, textStatus, jqXHR) {
				self._splitData(data, 'sel_program');
				$('#lyrProgramMultiple').find('.btn_toggle-simple').trigger('click');
				$('#lyrAppMultiple').find('.btn_toggle-simple').trigger('click');
				console.log("success");
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
			return true;
		}
		
		//program ajax filter
		ajaxXHR.program = function (data) {
			$.ajax({
				url: '/console/scholarships/advanced_search/getApplicationSite.asp',
				type: 'GET',
				data: {session: data.session, program: data.program},
			})
			.done(function (data, textStatus, jqXHR) {
				self._splitData(data, 'sel_application');
				$('#lyrAppMultiple').find('.btn_toggle-simple').trigger('click');
				console.log("success");
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
			return true;
		}
		
		//app_profile ajax filter
		ajaxXHR.app_profile = function (data) {
			return true;
		}
		
		//status ajax filter
		ajaxXHR.status = function (data) {
			return true;
		}

		this.ajax.filter = ajaxXHR;
	},

	/**
	 * _cacheElements : cached DOM Elements
	 */
	_cacheElements: function() {
		var $div = this.elem
				, $filter = $div.find('.filter')
				, $query_filter = $div.find('.query_filter')
				, $single_filter = $div.find('.single_filter')
				, $single_filter_select = $div.find('.single_filter_select')
				, $multiple_filter = $div.find('.multiple_filter')
				, $multiple_filter_select = $multiple_filter
																		.find('.multiple_filter_select')
				, $btn_toggle_advanced = $div.find('.btn_toggle-advanced')
				, $btn_toggle_simple = $div.find('.btn_toggle-simple')
				, $btn_popup_filter = $div.find('.btn_popup-filter')
				, $btn_remove = $div.find('.btn-remove');
		
		this.cached = {
			'div' : $div
			, '.filter' : $filter
			, '.query_filter' : $query_filter
			, '.single_filter' : $single_filter
			, '.single_filter_select' : $single_filter_select
			, '.multiple_filter' : $multiple_filter
			, '.multiple_filter_select' : $multiple_filter_select
			, '.btn_toggle-advanced' : $btn_toggle_advanced
			, '.btn_toggle-simple' : $btn_toggle_simple
			, '.btn_popup-filter' : $btn_popup_filter
			, '.btn-remove' : $btn_remove
		};
	}
});

/** extension **/
$.widget( "orchestrate.adv_query_questions", $.orchestrate.adv_query, {
	
	/**
		* _multipleOptionsToggleListener : multiple options toggle listener
	*/
	_multipleOptionsToggleListener: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;
		
		$.each(cached['.multiple_filter_select'], function(index, val) {
			$(val).change(function(event) {
				var options = $(this).children('option');
				var values = [];
				$.each(options, function(index, val) {
					values.push($(val).val());
				});
				var query_filter = $(this).closest('.filter')
																	.prevAll('.query_filter:first');
				if (values) {
					values = values.join(',');
					self.elem
									.find('.hd_multiple_filter')
									.val(values)
									.trigger('change');
				} else {
					self.elem
									.find('.hd_multiple_filter')
									.trigger('change');
				}
				//reset trigger back to false
				query_filter.data('change-trigger', false);
			});
		});
	},

	/**
	 * _buttonMultipleOptionsRemove : button multiple options
	 */
	_buttonMultipleOptionsRemove: function() {
		var self = this,
				cached = this.cached,
				opts = this.options;

		$.each(cached['.btn-remove'], function(index, val) {
			$(val).click(function(event) {
				var lyr = $(this).closest('.multiple_filter');
				var select = lyr.find('.multiple_filter_select');
				//gets hidden value
				var hd_value = self.elem.find('.hd_multiple_filter').val();
				if (hd_value) {
					if (hd_value.indexOf(',') > -1) {
						hd_value = hd_value.split(',');
					} else {
						hd_value = [hd_value];
					}
				} else {
					hd_value = [0];
				}

				//alter value
				if (select.val()) {
					var value = select.val();
					var diff_hd_value = [];
					$.each(value, function(index, val) {
						select.find('option[value=' + val + ']').remove();
						if ($.inArray(val, hd_value) > -1 ) {
							diff_hd_value.push(val);
						} else {
							//do nothing
						}
					});

					new_hd_value = hd_value.diff(diff_hd_value);
					//settings filter change flag
					$(val).closest('.filter').prevAll('.query_filter:first')
																		.data('change-trigger', true);
					//setting new hidden value
					select.trigger('change');
					/*
					overlapping
					lyr.find('.hd_multiple_filter').val(new_hd_value.join(','))
																				 .trigger('change');
					 */
				} else {
					//nothing
				}
			});
		});
	},
	
	/**
	 * _filterHideAll : filter hide all filter, shown if multiple filter not empty
	 */
	_filterHideAll: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;
		$.each(cached['.multiple_filter'], function(index, val) {
			var values = self.elem.find('.hd_multiple_filter').val();
			if (values.indexOf(',') > -1) {
				$(this).show();
				$(this).prev('tr').hide();
			} else {
				$(this).hide();
				$(this).prev('tr').show();
			}
		});
	},

	/**
	 * _popupAdvancedFilter : popup advanced filter
	 */
	_popupAdvancedFilter: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;
				win_filter = self.options;
		
		$.each(cached['.btn_popup-filter'], function(index, val) {
			$(val).click(function(event) {
				var r = $(this).closest('tbody.dropdown-multiple-alternate')
												.find('input.hd_multiple_filter').val();
				var popup_name = $(this).data('popup');
				var url = $(this).data('popup-url');
				var data = {} || data;
				data.url = url;
				data.param1 = $(this).data('param1');
				data.param2 = $(this).data('param2');
				data.param3 = $(this).data('param3');
				
				//call popup filter
				var iHandle = window.open(data.url + '?r=' + r
																	+ '&param1=' + data.param1 
																	+ '&param2=' + data.param2
																	+ '&param3=' + data.param3
																	,'_blank'
																	,'width=650,height=350,toolbar=no,top=100' +
																	',left=100,location=no,directories=no' +
																	',status=yes,menubar=no,scrollbars=yes' +
																	',copyhistory=no,resizable=yes');
				popupHandle[ iTotalPopup++ ] = iHandle;
				return true;
			});
		});
	}
});