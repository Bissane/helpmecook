import { TestBed } from '@angular/core/testing';

import { MatFileUploadQueueComponent } from './matFileUploadQueue.component';

describe('MatFileUploadQueueComponent', () => {
 beforeEach(() => {
   TestBed.configureTestingModule({ declarations: [MatFileUploadQueueComponent]});
 });

 it ('should work', () => {
   let fixture = TestBed.createComponent(MatFileUploadQueueComponent);
   expect(fixture.componentInstance instanceof MatFileUploadQueueComponent).toBe(true, 'should create MatFileUploadQueueComponent');
 });
});
