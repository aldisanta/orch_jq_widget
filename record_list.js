
// the widget definition, where "squareui" is the namespace,
// "record_list" the widget name
// bind on form containing the record list table
$.widget( "orchestrate.record_list", {
	// default options
	options: {
		filter : {},
		insert_action : ''
	},

	/**
	 * _create : constructor
	 */
	_create: function() {

		// get the select element
		var opts = this.options;
		this.record_list = $(this.element);
			
		//disable submit on enter
		this.record_list.keydown(function(event){
			if( (event.keyCode == 13)) {
				event.preventDefault();
				return false;
			}
		});

		// cache commonly used elements
		this._cacheElements();

		// bind UI actions
		this._bindUIActions();

		// refresh
		this._refresh();
	},

	// called when created, and later when changing options
	_refresh: function() {
	},

	// events bound via _on are removed automatically
	// revert other modifications here
	_destroy: function() {
	},

	_bindInsertAction: function() {
		var cached = this.cached,
			opts = this.options,
			self = this;
		
		cached['.record_content'].find('.insert-it').click(function(event) {
			/* Act on the event */
			var url = $(this).data('url');
			window.opener.$('.form-reviewer_name').html('<strong>' + url + '</strong>');
		});
	},

	_bindUIRecordFilter: function() {
		var cached = this.cached,
			opts = this.options,
			self = this;
		
		$.each(opts.filter, function(index, val) {
			cached['.record_list'].find('#sel_' + val).change(function(event) {
				event.preventDefault();
				//updates hidden value
				cached['.record_list'].find('#hdPageCriteriaChanged').val(true);
				cached['.record_list'].find('#hd' + val).val($(this).val());
				//submit form
				self._fetchRecordList();
			});
		});
		
		cached['.record_list'].find('input[name=txtsearchAjax]').keyup(function(event) {
			//disable previously binded event
			event.preventDefault();
			cached['.record_list'].find('#hdPageCriteriaChanged').val(true);
			cached['.record_list'].find('#hdSearchAjax').val($(this).val());
			self._fetchRecordList();
		});
	},

	_bindUIRecordNavigation: function() {
		var cached = this.cached,
			opts = this.options,
			self = this;
		
		cached['.record_navigation'].find('a[id^=lnkNav_]').each(function(index, el) {
			$(this).click(function(event) {
				event.preventDefault();
				var page = el.id.replace('lnkNav_', '');
				cached['.record_list'].find('#hdCurrentPage').val(page);
				self._fetchRecordList();
			});
		});
		
		cached['.record_navigation'].find('#sel_page').change(function(event) {
			event.preventDefault();
			cached['.record_list'].find('#hdNumPerPage').val($(this).val());
			cached['.record_list'].find('#hdNumPerPageChanged').val(true);
			cached['.record_list'].find('#hdCurrentPage').val(1);
			self._fetchRecordList();
		});
	},

	_clearArrows: function() {
		var cached = this.cached,
			opts = this.options,
			self = this;

		cached['.column-sort'].each(function(index, el) {
			$(this).children('img').prop('src', '/console/images/sort_blank.gif');
		});
	},

	_bindUIRecordSort: function(event) {
		var cached = this.cached,
			opts = this.options,
			self = this;

			cached['.column-sort'].click(function(event) {
				/* Act on the event */
				event.preventDefault();
				cached['#hdPrevOrderBy'].val(cached['#hdOrderBy'].val());
				cached['#hdOrderBy'].val($(this).data('record-column'));
				var a = cached['#hdPrevOrderBy'].val();
				var b = cached['#hdOrderBy'].val();
				if (a == b) {
					if (cached['#hdSortBy'].val() == 'DESC') {
						cached['#hdSortBy'].val('ASC');
					} else {
						cached['#hdSortBy'].val('DESC');
					}
				} else {
					cached['#hdSortBy'].val('ASC');
				}

				self._clearArrows();
				var c = cached['#hdSortBy'].val();
				if (c == 'DESC') {
					$(this).children('img').prop('src', '/console/images/sort_up.gif');
				} else {
					$(this).children('img').prop('src', '/console/images/sort_down.gif');
				}
				self._fetchRecordList();
			});
	},
	
	_styleRecordRow: function(event) {
		var cached = this.cached,
			opts = this.options,
			self = this;
			var record = cached['.record_content'].find('.record-row');
			record.mouseover(function(event) {
				/* Act on the event */
				$(this).css('background-color', $(this).data('hover-color'));
				$(this).css('cursor', 'pointer');
			});
			record.mouseout(function(event) {
				/* Act on the event */
				$(this).css('background-color', $(this).data('color'));
				$(this).css('cursor', 'default');
			});
	},

	_fetchRecordList: function() {
		var cached = this.cached,
			opts = this.options,
			url = this.record_list.attr('action'),
			self = this;

		$.ajax({
			url: url,
			data: new FormData(this.record_list[0]),
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
		})
		.done(function (data, textStatus, jqXHR) {
			if ( data.indexOf('||~~~||') > -1 ) {
				var array = data.split('||~~~||');
				cached['.record_content'].html(cached['.record_content'].children('tr').first());
				cached['.record_content'].append(array[0]);
				cached['.record_navigation'].html('');
				cached['.record_navigation'].append(array[1]);
				cached['.record_list'].find('#hdNumPerPageChanged').val(false);
				cached['.record_list'].find('#hdPageCriteriaChanged').val(false);
			}
			
			self._bindUIRecordNavigation();
			self._bindUIRecordSort();
			self._styleRecordRow();
			if (opts.insert_action != '') {
				self._bindInsertAction();
			}
			console.log("success");
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	},

	/**
	 * _bindUIActions : bind UI Event on record_list
	 */
	_bindUIActions: function() {
		var cached = this.cached,
			opts = this.options;
		if (cached['#hdOrderBy'].val() > 0) {
			var i = cached['#hdOrderBy'].val() - 1;
			if (cached['#hdSortBy'].val() == 'ASC') {
				$(cached['.column-sort'][i]).children('img').prop('src', '/console/images/sort_down.gif');
			} else {
				$(cached['.column-sort'][i]).children('img').prop('src', '/console/images/sort_up.gif');
			}
		}
		//bind filter
		this._bindUIRecordFilter();
		//record list
		this._fetchRecordList();
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
		var $record_list = this.record_list,
			$hdPrevOrderBy = $record_list.find('#hdPrevOrderBy'),
			$hdOrderBy     = $record_list.find('#hdOrderBy'),
			$hdSortBy      = $record_list.find('#hdSortBy'),
			$record_content = $record_list.find('.record_content'),
			$record_header = $record_content.find('tr').first(),
			$record_navigation = $record_list.find('.record_navigation'),
			$column_sort = $record_header.find('.column-sort');
		
		this.cached = {
			'.record_list' : $record_list,
			'#hdPrevOrderBy' : $hdPrevOrderBy,
			'#hdOrderBy'     : $hdOrderBy,
			'#hdSortBy'      : $hdSortBy,
			'.record_content' : $record_content,
			'.record_header' : $record_header,
			'.record_navigation' : $record_navigation,
			'.column-sort' : $column_sort
		};
	}
});
