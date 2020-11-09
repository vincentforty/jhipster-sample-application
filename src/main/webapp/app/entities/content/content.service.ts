import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContent } from 'app/shared/model/content.model';

type EntityResponseType = HttpResponse<IContent>;
type EntityArrayResponseType = HttpResponse<IContent[]>;

@Injectable({ providedIn: 'root' })
export class ContentService {
  public resourceUrl = SERVER_API_URL + 'api/contents';

  constructor(protected http: HttpClient) {}

  create(content: IContent): Observable<EntityResponseType> {
    return this.http.post<IContent>(this.resourceUrl, content, { observe: 'response' });
  }

  update(content: IContent): Observable<EntityResponseType> {
    return this.http.put<IContent>(this.resourceUrl, content, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
