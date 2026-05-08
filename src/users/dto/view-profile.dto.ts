import {UserRole} from "./user-role";

export class ViewProfileDto {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    email: string;
}