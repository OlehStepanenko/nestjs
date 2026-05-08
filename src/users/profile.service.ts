import {UserRole, ViewProfileDto} from "./dto";

export class ProfileService {
    public getSelf(id: string): ViewProfileDto {
        return {
            id,
            role: UserRole.User,
            firstName: 'Vasya1',
            lastName: 'Vasylyiv1',
            email: 'vasya@example.com',
        }
    }
}