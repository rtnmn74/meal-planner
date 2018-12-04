import { AppPage } from './app.po';
import {browser} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });



  it('should redirect to dashboard', async () => {
    page.navigateTo();
    const url = await browser.getCurrentUrl();
    expect(url).toContain('/menu');
  });


  it('should display Weekly Meal Menu', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Weekly Meal Menu');
  });
});
