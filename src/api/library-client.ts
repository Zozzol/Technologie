import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { BookDto } from './dto/book.dto';
import { LoanDto } from './dto/loan.dto';
import { UserDto } from './dto/user.dto';

type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      console.log('Sending request with data:', data);
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/login',
        data,
      );
      console.log('Received response:', response);

      const token = response.data.token;
      const role = response.data.role;

      if (token) {
        this.client.defaults.headers.common['Authorization'] =
          'Bearer ' + token;
        this.client.interceptors.request.use((config) => {
          config.headers['Authorization'] = 'Bearer ' + token;
          return config;
        });
        localStorage.setItem('token', token);
      }

      if (role) {
        localStorage.setItem('role', role);
      }

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error('Error during login request:', axiosError);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBooks(): Promise<ClientResponse<BookDto[] | null>> {
    console.log(this.client.defaults.headers.common['Authorization']);
    try {
      const response: AxiosResponse<BookDto[]> =
        await this.client.get('/book/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addBook(data: BookDto): Promise<ClientResponse<BookDto | null>> {
    try {
      const response: AxiosResponse<BookDto> = await this.client.post(
        '/book/add',
        data,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteBook(
    bookId: number,
  ): Promise<ClientResponse<string | null>> {
    try {
      const response: AxiosResponse<string> = await this.client.delete(
        `/book/delete/${bookId}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBook(
    bookId: number,
  ): Promise<ClientResponse<BookDto | null>> {
    try {
      const response: AxiosResponse<BookDto> = await this.client.get(
        `/book/getBook/${bookId}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getUser(
    userId: number,
  ): Promise<ClientResponse<UserDto | null>> {
    try {
      const response: AxiosResponse<UserDto> = await this.client.get(
        `/user/getUser/${userId}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getLoans(): Promise<ClientResponse<LoanDto[]>> {
    try {
      const response: AxiosResponse<LoanDto[]> =
        await this.client.get('/loan/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: [],
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async updateBookReturnDate(
    loanId: number,
    date: string,
  ): Promise<ClientResponse<string | null>> {
    try {
      const response: AxiosResponse<string> = await this.client.post(
        `/returnDate/${loanId}/${date}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteLoan(
    loanId: number,
  ): Promise<ClientResponse<string | null>> {
    try {
      const response: AxiosResponse<string> = await this.client.delete(
        `/loan/delete/${loanId}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addLoan(
    loanData: LoanDto,
  ): Promise<ClientResponse<LoanDto | null>> {
    try {
      const response: AxiosResponse<LoanDto> = await this.client.post(
        '/loan/add',
        loanData,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllUsers(): Promise<ClientResponse<UserDto[] | null>> {
    try {
      const response: AxiosResponse<UserDto[]> =
        await this.client.get('/user/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteUser(
    userId: number,
  ): Promise<ClientResponse<string | null>> {
    try {
      const response: AxiosResponse<string> = await this.client.delete(
        `/user/delete/${userId}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addUser(data: UserDto): Promise<ClientResponse<UserDto | null>> {
    try {
      const response: AxiosResponse<UserDto> = await this.client.post(
        '/user/add',
        data,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
