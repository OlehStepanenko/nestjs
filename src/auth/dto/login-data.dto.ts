import {UserRole, UserStatus} from "src/users/dto";

export type LoginDataDto = {
    id: string;
    hash: string;
    role: UserRole;
    status: UserStatus;
}