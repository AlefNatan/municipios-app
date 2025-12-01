import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipiosService } from '../../services/municipios.service';
import { Municipio } from '../../models/municipio.interface';
import { ESTADOS_BRASIL, Estado } from '../../models/estado.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  municipios = signal<Municipio[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  estados = ESTADOS_BRASIL;
  selectedEstado = signal<string>('RJ');

  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(10);

  paginatedMunicipios = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.municipios().slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.municipios().length / this.itemsPerPage());
  });

  hasPreviousPage = computed(() => this.currentPage() > 1);
  hasNextPage = computed(() => this.currentPage() < this.totalPages());

  paginationInfo = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage() + 1;
    const end = Math.min(this.currentPage() * this.itemsPerPage(), this.municipios().length);
    return { start, end, total: this.municipios().length };
  });

  pageNumbers = computed(() => {
    const pages: (number | 'ellipsis')[] = [];
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (current <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(total);
      } else if (current >= total - 2) {
        pages.push('ellipsis');
        for (let i = total - 3; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push('ellipsis');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(total);
      }
    }

    return pages;
  });

  constructor(private municipiosService: MunicipiosService) {}

  ngOnInit(): void {
    this.loadMunicipios();
  }

  loadMunicipios(): void {
    this.loading.set(true);
    this.error.set(null);
    this.currentPage.set(1);

    this.municipiosService.getMunicipiosByEstado(this.selectedEstado()).subscribe({
      next: (data) => {
        this.municipios.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar municípios. Por favor, tente novamente.');
        this.loading.set(false);
        console.error('Erro ao carregar municípios:', err);
      },
    });
  }

  onEstadoChange(uf: string): void {
    this.selectedEstado.set(uf);
    this.loadMunicipios();
  }

  getEstadoNome(uf: string): string {
    const estado = this.estados.find((e) => e.uf === uf);
    return estado ? estado.nome : '';
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage.update((page) => page - 1);
    }
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage.update((page) => page + 1);
    }
  }

  changeItemsPerPage(items: number): void {
    this.itemsPerPage.set(items);
    this.currentPage.set(1);
  }
}
