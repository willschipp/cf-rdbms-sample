app.views.home = Backbone.View.extend({
	events: {
		"click a.addPerson":"addPerson"
	},
	initialize:function() {
		
	},
	render:function() {
		var _this = this;
		$.get('/app/templates/home.html',function(data) {
			_this.template = _.template(data);
			_this.$el.html(_this.template({}));
			_this.findAll = new app.views.findAll({
				el:$('#persons')
			});
			return _this;
		},'html');		
	},
	formSubmit:function(e) {
		e.preventDefault();
		//get the field value
		var searchString = $('#searchInput').val();
		console.log(searchString);
		//parameterize & load
		this.collection.performSearch(searchString);
	},
	displayResults:function() {
		var _this = this;
		$('#results').remove();//clear off
		console.log(this.collection.toJSON());
		$.get('/app/templates/results.html',function(data) {
			template = _.template(data);
			_this.$el.append(template({
				results:_this.collection.toJSON()
				}));
		});
	},
	addPerson:function() {
		//load up the meta data
		//show the box
	}
});