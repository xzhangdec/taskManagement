import { TaskManageProjectPage } from './app.po';

describe('task-manage-project App', function() {
  let page: TaskManageProjectPage;

  beforeEach(() => {
    page = new TaskManageProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
