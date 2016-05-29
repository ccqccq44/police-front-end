'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/login");
  });

  describe('portal', function() {

    beforeEach(function() {
      browser.get('index.html#/portal');
    });


    it('should render portal when user navigates to /portal', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
          toMatch(/partial for portal/);
    });

  });

    describe('login', function() {

        beforeEach(function() {
            browser.get('index.html#/login');
        });


        it('should render login when user navigates to /login', function() {
            expect(element.all(by.css('[ng-view] p')).first().getText()).
                toMatch(/partial for login/);
        });

    });


});
