import { Book } from "./bookModel";

export interface BookCart {
    // id: number;
    book: Book;
    choosed: boolean;
    quantity: number;
    // total: number;
}
