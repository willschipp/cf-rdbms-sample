app.views.findAll = Backbone.View.extend({
	initialize:function() {
		var _this = this;
		this.collection = new app.collections.persons({model:app.models.Person});
		this.columns = [];
	},
	render:function() {
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
	process:function() {
		var _this = this;
		this.collection.fetch({success:function() {
			var person = _this.collection.first();
			$.each(person.toJSON(),function(key,value) {
				_this.columns.push(key);
			});
			console.log('finished');
			_this.render();
		}});
	}
});