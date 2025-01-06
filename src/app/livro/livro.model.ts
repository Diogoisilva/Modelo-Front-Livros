export interface Assunto {
  descricao: string;
}

export interface Autor {
  id: number;
  nome: string;
}

export interface Livro {
  codl: number | null;
  titulo: string;
  editora: string;
  edicao: string;
  anoPublicacao: string;
  preco: string;
  formaCompra: string;
  autor: Autor | null;
  assunto: Assunto; // Adicionando o campo assunto
}
