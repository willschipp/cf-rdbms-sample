app.views.findAll = Backbone.View.extend({
	initialize:function() {
		var _this = this;
		this.collection = new app.collections.persons({model:app.models.Person});
		this.collection.fetch({success:function() {
			_this.process();
			_this.render();
		}});
		this.columns = [];
	},
	render:function() {
		console.log(this.columns);
		var _this = this;
		$.get('/app/templates/persons.html',function(data) {
			_this.template = _.template(data);
			_this.$el.html(_this.template({
				columns:_this.columns,
				rows:_this.collection.toJSON()
			}));
			return _this;
		},'html');				
	},
	process:function(data) {
		var _this = this;
		var person = this.collection.first();
		$.each(person.toJSON(),function(key,value) {
			_this.columns.push(key);
		});
	}
});