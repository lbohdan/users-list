describe('ttUsers component:', function () {
    var $componentController;
    var ctrl;

    beforeEach(function () {
        module('testTask');

        inject(function (_$componentController_) {
            $componentController = _$componentController_;
        });

        ctrl = $componentController('ttUsers', null);
    });

    afterEach(function () {
        $componentController = null;
        ctrl = null;
    });

    describe('selectUser(): ', function () {
        var newSelectedUser;

        beforeEach(function () {
            newSelectedUser = {
                name: 'new user',
                selected: true
            };
        });

        it('should unselect selected user if the same user was selected', function () {
            ctrl.selectedUser = newSelectedUser;
            ctrl.selectUser(newSelectedUser);

            expect(ctrl.selectedUser).toBeNull();
            expect(newSelectedUser.selected).toBeFalsy();
        });

        it('should select new user', function () {
            newSelectedUser.selected = false;
            ctrl.selectedUser = {
                name: 'some user',
                selected: true
            };

            ctrl.selectUser(newSelectedUser);
            expect(ctrl.selectedUser.name).toBe(newSelectedUser.name);
            expect(ctrl.selectedUser.selected).toBeTruthy();
        });

        afterEach(function () {
            newSelectedUser = null;
        });
    });
});