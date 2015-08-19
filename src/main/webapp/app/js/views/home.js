app.views.home = Backbone.View.extend({
	events: {
		"click a.addPerson":"addPerson",
		"submit":"addFormSubmit"
	},
	initialize:function() {
		this.model = new app.models.person();
		this.model.fetchMetadata();	
		this.collection = new app.collections.persons({model:app.models.Person});
		this.collection.fetch({success:this.render});
//		this.findAll = new app.views.findAll({el:$('#persons')});
	},
	render:function() {
		var _this = this;
		$.get('/app/templates/home.html',function(data) {
			_this.template = _.template(data);
			_this.$el.html(_this.template({
				columns:_this.model.metaData,
				rows:_this.collection.toJSON()
			}));
			return _this;
		},'html');		
	},
	displayResults:function() {
		var _this = this;
		$('#results').remove();//clear off
		$.get('/app/templates/results.html',function(data) {
			template = _.template(data);
			_this.$el.append(template({
				results:_this.collection.toJSON()
				}));
		});
	},
	addPerson:function() {
		var _this = this;
		$('#modalContent').empty();
		//show the box
		$.get('/app/templates/addForm.html',function(data) {
			template = _.template(data);
			$('#modalContent').append(template({
				fields:_this.model.metaData
			}));
			$('#addPersonModal').modal('show');
		});
	},
	addFormSubmit:function(e) {
		e.preventDefault();
		var _this = this;
		//populate this model
		$.each($(e.currentTarget).find('input'),function(idx,value) {
			_this.model.set(value.name,value.val)
		});
		//save the model
		this.model.save();
		//refresh the collection
		this.collection.fetch({success:this.render()});
		//exit
		return false;//
	}
});