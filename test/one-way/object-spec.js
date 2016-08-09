describe('one-way, objects', function() {
  it('should have the same sub-property', function() {
    browser.get('http://127.0.0.1:8000/test/one-way/object-spec.html');

    var ngObject;
    var wcObject;
    var ngButton = element(by.id('ng-button'));
    var wcButton = element(by.id('wc-button'));

    ngObject = element(by.id('ng-object'));
    wcObject = element(by.id('wc-object'));
    expect(ngObject.getText()).toEqual('Lisa');
    expect(wcObject.getText()).toEqual('Lisa');

    ngButton.click();
    expect(ngObject.getText()).toEqual('Joe');
    expect(wcObject.getText()).toEqual('Joe');

    wcButton.click();
    expect(ngObject.getText()).toEqual('Alex');
    expect(wcObject.getText()).toEqual('Alex');
  });
});