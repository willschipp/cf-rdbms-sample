app.models.person = Backbone.Model.extend({
	url:'/data/person',
	fetchMetadata:function() {
		var _this = this;
		$.ajax({
			url:'/data/person/fields',
			method:'GET',
			success:function(data) {
				_this.metaData = data;
			}
		});
	}
});