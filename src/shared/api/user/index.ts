import { baseInstance } from "../base"
import { User } from "../types"

export const user = {
  findMe: () => {
    return baseInstance.get<User>('/users/me');
  }
}