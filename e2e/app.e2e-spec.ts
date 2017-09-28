import { AngularDateInputPage } from './app.po';

describe('angular-date-input App', () => {
  let page: AngularDateInputPage;

  beforeEach(() => {
    page = new AngularDateInputPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
