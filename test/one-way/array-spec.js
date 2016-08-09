describe('one-way, arrays', function() {
  it('should have the same array', function() {
    browser.get('http://127.0.0.1:8000/test/one-way/array-spec.html');
    
    var ngArrayItems;
    var wcArrayItems;
    var ngButton = element(by.id('ng-button'));
    var wcButton = element(by.id('wc-button'));

    ngArrayItems = element.all(by.css('.ng-array-item'));
    ngArrayItems.last().getText().then(function(text) {
      expect(text).toEqual('Alice');
    });
    wcArrayItems = element.all(by.css('.wc-array-item'));
    wcArrayItems.last().getText().then(function(text) {
      expect(text).toEqual('Alice');
    });

    ngButton.click();
    ngArrayItems = element.all(by.css('.ng-array-item'));
    ngArrayItems.last().getText().then(function(text) {
      expect(text).toEqual('Paul');
    });
    wcArrayItems = element.all(by.css('.wc-array-item'));
    wcArrayItems.last().getText().then(function(text) {
      expect(text).toEqual('Paul');
    });

    wcButton.click();
    ngArrayItems = element.all(by.css('.ng-array-item'));
    ngArrayItems.last().getText().then(function(text) {
      expect(text).toEqual('Sam');
    });
    wcArrayItems = element.all(by.css('.wc-array-item'));
    wcArrayItems.last().getText().then(function(text) {
      expect(text).toEqual('Sam');
    });
  });
});