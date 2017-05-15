import { RestaurantePage } from './app.po';

describe('restaurante App', () => {
  let page: RestaurantePage;

  beforeEach(() => {
    page = new RestaurantePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
