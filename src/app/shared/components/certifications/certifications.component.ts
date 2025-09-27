import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Certification } from '../../models/certification.model';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-certifications',
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificationsComponent { 

   certifications$!: Observable<Certification[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.certifications$ = this.apiService.getCertifications();
  }

}
