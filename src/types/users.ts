export type LoginParamsT = {
  userName: string;
  password: string;
};

export type LoginResultT<T> = {
  code: number;
  results?: T;
  message: string;
  status: string;
  error?: string;
};

export type User = {
  user: any;
  firstName: string;
  middleName: string | null;
  lastName: string;
  suffix: string | null;
  empEmail: string | null;
  group: string;
  permissions: Permissions;
  active: boolean;

};
export type Permissions = {
  roleName: string;
  permissionViews: string[];
};

export type UsersPaginationProps = {
  id: number;
  userName: string;
  dateCreated: string;
  employeesDTO: {
    empNo: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    suffix?: string;
    empEmail: string;
    group: string;
    department: string;
  };
  roleDTO: {
    id: number;
    name: string;
    dateCreated: string;
    dateModified: string;
    active: boolean;
  };
  active: boolean;
};
