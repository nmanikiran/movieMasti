import { MovieMastiPage } from './app.po';

describe('movie-masti App', () => {
  let page: MovieMastiPage;

  beforeEach(() => {
    page = new MovieMastiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
