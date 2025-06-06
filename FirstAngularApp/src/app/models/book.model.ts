export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  language: string;
  publisher: string;
  price: number;
  pagecount: number;
  stockquantity: number;
  isavailable?: boolean;
  publisheddate: string; // Use ISO string or format acceptable to .NET backend
}
