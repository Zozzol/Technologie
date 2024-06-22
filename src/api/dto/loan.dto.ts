import { BookDto } from './book.dto';
import { UserDto } from './user.dto';

export class LoanDto {
  id: number | undefined;
  loanStartDate: Date | undefined;
  loanEndDate: Date | undefined;
  bookReturnDate: Date | undefined;
  userLoan: UserDto | undefined;
  bookLoan: BookDto | undefined;
}
