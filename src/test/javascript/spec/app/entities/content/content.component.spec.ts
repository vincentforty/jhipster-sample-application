import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ContentComponent } from 'app/entities/content/content.component';
import { ContentService } from 'app/entities/content/content.service';
import { Content } from 'app/shared/model/content.model';

describe('Component Tests', () => {
  describe('Content Management Component', () => {
    let comp: ContentComponent;
    let fixture: ComponentFixture<ContentComponent>;
    let service: ContentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ContentComponent],
      })
        .overrideTemplate(ContentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Content(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.contents && comp.contents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
