describe('one-way, strings', function() {
  it('should have the same string', function() {
    browser.get('http://127.0.0.1:8000/test/one-way/string-spec.html');

    var ngString;
    var wcString;
    var ngButton = element(by.id('ng-button'));
    var wcButton = element(by.id('wc-button'));

    ngString = element(by.id('ng-string'));
    wcString = element(by.id('wc-string'));
    expect(ngString.getText()).toEqual('Hello, from Angular!');
    expect(wcString.getText()).toEqual('Hello, from Angular!');

    ngButton.click();
    expect(ngString.getText()).toEqual('String changed in Angular');
    expect(wcString.getText()).toEqual('String changed in Angular');

    wcButton.click();
    expect(ngString.getText()).toEqual('String changed in Polymer');
    expect(wcString.getText()).toEqual('String changed in Polymer');
  });
});