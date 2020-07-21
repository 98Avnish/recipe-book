import {Injectable} from '@angular/core';
import {CredentialModel} from './credential.model';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CredentialService {
  private url = 'https://recipebook-8b63c.firebaseio.com/';

  constructor(private http: HttpClient) {}

  submitData(credential: CredentialModel) {
    return this.http.post<{name: string}>(this.url+'/credentials.json', credential);
  }

  fetchData() {
    return this.http.get<Array<CredentialModel>>(this.url+'/credentials.json')
      .pipe(map(resData => {
        let credentials :Array<CredentialModel> = [];
        for(let key in resData) {
          if(resData.hasOwnProperty(key)) {
            credentials.push({ id: key, ...resData[key] });
          }
        }
        return credentials;
      }));
  }

  deleteData() {
    return this.http.delete(this.url+'/credentials.json');
  }
}
