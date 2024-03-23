// Importando os módulos necessários
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator'

// Definindo o componente
@Component({
  selector: 'app-cards', // O nome do componente
  standalone: true, // Indica que este componente pode ser usado de forma independente
  imports: [CommonModule, HttpClientModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, MatPaginatorModule ], // Importando outros módulos que este componente precisa
  templateUrl: './cards.component.html', // O arquivo HTML para este componente
  styleUrl: './cards.component.scss' // O arquivo de estilos para este componente
})

// A classe do componente
export class CardsComponent implements OnInit {

  httpClient = inject(HttpClient); // Injetando o HttpClient para fazer requisições HTTP

  data: any[] = []; // Armazena os dados recebidos da API

  public pageSlice = this.data.slice(0, 10); // Armazena uma fatia dos dados para ser exibida na página

  filteredItems = []; // Armazena os itens filtrados

  // Esta função é chamada quando a página é alterada no paginador
  OnPageChange(event: PageEvent) {
    console.log(event);

    const startIndex = event.pageIndex * event.pageSize; // Calcula o índice inicial dos dados para esta página
    let endIndex = startIndex + event.pageSize; // Calcula o índice final dos dados para esta página
    if (endIndex > this.data.length) {
      endIndex = this.data.length; // Se o índice final é maior que o comprimento dos dados, ajusta o índice final
    }
    this.pageSlice = this.data.slice(startIndex, endIndex); // Atualiza a fatia de dados para a nova página
  }

  // Esta função é chamada quando o componente é inicializado
  ngOnInit(): void {
    this.fetchData(); // Busca os dados da API
  }

  // Esta função busca os dados da API
  fetchData() {
    this.httpClient
    .get('https://jsonplaceholder.typicode.com/photos/') // Faz uma requisição GET para a API
    .subscribe((data: any) => { // Inscreve-se para receber os dados quando eles estiverem disponíveis
      this.data = data; // Armazena os dados recebidos
      this.pageSlice = this.data.slice(0, 10); // Atualiza a fatia de dados para a primeira página
    });
  }
}
