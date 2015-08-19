app.views.home = Backbone.View.extend({
	events: {
		"click a.addPerson":"addPerson",
		"submit":"addFormSubmit",
		"click a.deleteRecord":"deletePerson"
	},
	initialize:function() {
		_.bindAll(this,'render','addPerson','addFormSubmit');
		this.model = new app.models.person();
		this.model.fetchMetadata();	
		this.collection = new app.collections.persons({model:app.models.Person});
		this.collection.fetch({success:this.render});
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
	deletePerson:function(e) {
		var dataId = $(e.currentTarget).data('id');
		var model = this.collection.get(dataId).destroy();
		this.render();
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
		var model = {}
		$.each($(e.currentTarget).find('input'),function(idx,value) {
			model[value.name] = $(value).val();
		});
		//add the model
		this.collection.add(this.model);
		this.model.save(model,{success:function(data,model) {
			$('#addPersonModal').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();			
			_this.render();
		}});
		//exit
		return false;//
	}
});