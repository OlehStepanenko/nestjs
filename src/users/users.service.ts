import {BanUserDto, CreateUserDto, UserRole, UserStatus, ViewUserDto} from "./dto";
import {randomUUID} from "node:crypto";
const user = {
    id: 'qwqwqwqwqwqwqwqw',
    role: 'admin',
    firstName: 'Vasya',
    lastName: 'Vasylyiv',
    email: 'vasya@example.com',
    status: 'active',
    createdAt: '2021-05-01T00:00:00.000Z',
    createdBy: '28',
}
export class UsersService {
    create(data: CreateUserDto): ViewUserDto {
        return {
            id: randomUUID(),
            role: UserRole.Admin,
            firstName: 'Vasya',
            lastName: 'Vasylyiv',
            email: 'vasya@example.com',
            status: UserStatus.Active,
            createdAt: new Date(),
            createdBy: '28',
        }
    }

    get(): ViewUserDto[] {
        return [{
            id: randomUUID(),
            role: UserRole.Admin,
            firstName: 'Vasya',
            lastName: 'Vasylyiv',
            email: 'vasya@example.com',
            status: UserStatus.Active,
            createdAt: new Date(),
            createdBy: '28',
        }]
    }

    getOne(id: string): ViewUserDto {
        return {
            id: randomUUID(),
            role: UserRole.Admin,
            firstName: 'Vasya',
            lastName: 'Vasylyiv',
            email: 'vasya@example.com',
            status: UserStatus.Active,
            createdAt: new Date(),
            createdBy: '28',
        }
    }

    update(id: string, data: CreateUserDto): ViewUserDto {
        return {
            id: randomUUID(),
            role: UserRole.Admin,
            firstName: 'Vasya',
            lastName: 'Vasylyiv',
            email: 'vasya@example.com',
            status: UserStatus.Active,
            createdAt: new Date(),
            createdBy: '28',
        }
    }

    ban(id: string, data: BanUserDto): ViewUserDto {
        return {
            id: randomUUID(),
            role: UserRole.Admin,
            firstName: 'Vasya',
            lastName: 'Vasylyiv',
            email: 'vasya@example.com',
            status: UserStatus.Active,
            createdAt: new Date(),
            createdBy: '28',
        }
    }
}