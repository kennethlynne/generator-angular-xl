describe('Model Repository: <%= classedName %>Repository', function () {

    var <%= classedName %>Repository, BaseRepository;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_<%= classedName %>Repository_, _BaseRepository_) {
            BaseRepository = _BaseRepository_;
            <%= classedName %>Repository = _<%= classedName %>Repository_;
        });

    });

    it('should be an instance of BaseRepository', function () {
        expect(<%= classedName %>Repository instanceof BaseRepository).toBetruthy();
    });

});