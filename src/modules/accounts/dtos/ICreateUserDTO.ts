
interface ICreateUserDTO {
  name: string
  email: string
  password: string
  driver_license: string
  id?: string
  avatar?: string
  username?: string
}

export type { ICreateUserDTO };
