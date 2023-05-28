export interface ILayoutProps {
  children: React.ReactNode;
}

export interface ILogin {
  password: string;
  email: string;
}

export interface IRegister extends ILogin {
  userName: string;
  confirmPassword: string;
}
