describe('angular-cmelion generator homepage', function() {
  it('should say Hello', function() {
    browser.get('#/');

    var message = element(by.binding('vm.message'));
    expect(message.getText()).toEqual('Hello world!');
  });
});
