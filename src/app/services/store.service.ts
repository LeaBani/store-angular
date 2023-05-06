import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const STORE_BASE_URL = 'https://fakestoreapi.com'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
// ici, on cherche à utiliser l'API. On passe par httpClient, intégré à Angular
  constructor(private httpClient : HttpClient) { }

  /**
   * Cette fonction cherche à récuperer la liste de produits de l'Api
   * @param limit on limite la recherche
   * @param sort on trie la recherche
   * @returns la liste des produits de l'Api
   */
  getAllProducts(limit='12', sort='desc'): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`
    )

  }
}
