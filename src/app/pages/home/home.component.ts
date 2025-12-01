import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipiosService } from '../../services/municipios.service';
import { Municipio } from '../../models/municipio.interface';
import { ESTADOS_BRASIL } from '../../models/estado.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  estados = ESTADOS_BRASIL;

  selectedEstado = signal<string>('RJ');
  municipios = signal<Municipio[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  currentPage = signal<number>(1);
  pageSize = signal<number>(20);

  totalPages = signal<number>(1);
  totalItems = signal<number>(0);

  constructor(private municipiosService: MunicipiosService) {}

  ngOnInit(): void {
    this.loadMunicipios();
  }

  loadMunicipios(): void {
    this.loading.set(true);
    this.error.set(null);

    this.municipiosService
      .getMunicipios(this.selectedEstado(), this.currentPage(), this.pageSize())
      .subscribe({
        next: (res) => {
          this.municipios.set(res.items);
          this.totalPages.set(res.totalPages);
          this.totalItems.set(res.totalItems);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Erro ao carregar municípios.');
          this.loading.set(false);
        }
      });
  }

  onEstadoChange(uf: string): void {
    this.selectedEstado.set(uf);
    this.currentPage.set(1);
    this.loadMunicipios();
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
      this.loadMunicipios();
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.loadMunicipios();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadMunicipios();
    }
  }

  changePageSize(size: number): void {
    this.pageSize.set(Number(size));
    this.currentPage.set(1);
    this.loadMunicipios();
  }

}
