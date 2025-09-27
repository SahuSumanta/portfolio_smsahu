import { Injectable } from '@angular/core';
import { createClient, Entry, EntryCollection } from 'contentful';
import { from, map, Observable } from 'rxjs';
import { Project } from '../../shared/models/project.model';
import { HttpClient } from '@angular/common/http';
import { Certification } from '../../shared/models/certification.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private client = createClient({
    space: '3p1nh43dylrx',
    accessToken: 'rL7H1x088Q3xR7a6quQYG6xhpTJ_ebCt5WO3AgJqBbw'
  });
  constructor(private http: HttpClient) { }


  /**
   * Fetches projects from Contentful and maps them to the Project interface.
   * @returns An Observable of an array of Project objects.
   */

  // async getProjects(): Promise<void> {
  //   try {
  //     console.log('Attempting to fetch data from Contentful...');

  //     const entries = await this.client.getEntries({
  //       content_type: 'project' // <-- Paste your Project's Content Type ID here
  //     });

  //     console.log('✅ SUCCESS!', entries);

  //   
  // }

  sendContactForm(formData: { name: string, email: string, message: string }) {
    // Netlify automatically exposes functions at this endpoint
    const functionUrl = '/.netlify/functions/send-email';
    return this.http.post(functionUrl, formData);
  }



  getProjects(): Observable<Project[]> {
    const promise = this.client.getEntries<any>({ content_type: 'project' });

    return from(promise).pipe(
      map(entries => {
        return entries.items.map(item => {
          // The 'as' keyword tells TypeScript to trust us on the data type.
          return {
            title: item.fields['title'] as string,
            description: (item.fields['description'] as any)?.content[0]?.content[0]?.value || 'No description.',
            tags: (item.fields['tags'] as string[]) || [],
            liveUrl: (item.fields['liveUrl'] as string) || '#',
            githubUrl: (item.fields['githubUrl'] as string) || '#',
            imageUrl: item.fields['imageUrl'] ? 'https:' + (item.fields['imageUrl'] as any).fields.file.url : ''
          };
        });
      })
    );
  }


  getCertifications(): Observable<Certification[]> {
  const promise = this.client.getEntries<any>({ content_type: 'certification' });

  return from(promise).pipe(
    map(entries => {
      return entries.items.map(item => {
        return {
          name: item.fields['name'] as string,
          issuer: item.fields['issuer'] as string,
          credentialUrl: item.fields['credentialUrl'] as string,
          issuerLogoUrl: item.fields['issuerLogo'] as string
        };
      });
    })
  );
}


}
