describe('Index route', function () {
   var protractor = protractor.getInstance();
    
    describe('index', function () {
        it('should display the correct title', function() {
            protractor.get('/#');
            expect(protractor.getTitle()).toContain('generator-angular-xl');
        });
    })
});