import {ViewUserDto} from "../dto";
import {User} from "generated/prisma/client";
import {mapUserRoleFromDB} from "./user-role.mapper";
import {mapUserStatusFromDB} from "./user-status.mapper";

export class UserViewMapper {
    mapOne(data: User): ViewUserDto {
        return {
            id: data.id,
            role: mapUserRoleFromDB(data.role),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            status: mapUserStatusFromDB(data.status),
            createdAt: data.createdAt,
            createdBy: data.createdBy,
        }
    }

    mapMany(data: User[]): ViewUserDto[] {
        return data.map((one) => this.mapOne(one))
    }
}