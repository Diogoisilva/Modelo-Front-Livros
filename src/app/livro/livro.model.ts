export interface Autor {
  codAu: number;
  nome?: string; // Torna o nome opcional
}

export interface Assunto {
  codAssunto: number;
  descricao?: string; // Torna a descrição opcional
}

export interface Livro {
  codL: number ;
  titulo: string;
  editora: string;
  edicao: string;
  anoPublicacao: string;
  preco: number;
  formaCompra: string;
  autor: Autor | null;
  assunto: Assunto | null;
}