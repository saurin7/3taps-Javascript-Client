describe('3taps', function() {

	var client;

	beforeEach(function() {
		client = new threeTapsClient('75c8e3851e874fe692a8199022a06645');
	});


	it('should be able to execute /search', function() {

		var self = this;

		var searchResults;
	
		runs(function() {	
			client.search.search({
				text: 'honda',
				rpp: 4,
				source: 'CRAIG'
			}, function(searchResults) {
				console.log(searchResults);
				self.searchResults = searchResults; 
			});
		});

		waits(5000);

		runs(function () {
			expect(self.searchResults.success).toBeTruthy();
		});
	});


	it('should be able to execute /search/count', function() {

		var self = this;

		var count;
	
		runs(function() {	
			client.search.count({
				text: 'honda',
				rpp: 4,
				source: 'CRAIG'
			}, function(count) {
				console.log(count);
				self.count = count; 
			});
		});

		waits(5000);

		runs(function () {
			expect(self.count.count).toBeGreaterThan(0);
		});
	});


	it('should be able to execute /search/summary', function() {

		var self = this;

		var summary;
	
		runs(function() {	
			client.search.summary({}, function(summary) {
				console.log(summary);
				self.summary = summary; 
			});
		});

		waits(10000);

		runs(function () {
			expect(self.summary.totals).toBeTruthy();
		});
	});


	it('should be able to execute /reference/categories', function() {

		var self = this;

		var category;
	
		runs(function() {	
			client.reference.categories(function(category) {
				console.log(category);
				self.category = category; 
			});
		});

		waits(5000);

		runs(function () {
			expect(self.category.length).toBeGreaterThan(0);
		});
	});
});
