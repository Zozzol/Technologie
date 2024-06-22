export class LoginDto {
  login: string | undefined;
  password: string | undefined;
}

export class LoginResponseDto {
  token: string | undefined;
  role: string | undefined;
}
