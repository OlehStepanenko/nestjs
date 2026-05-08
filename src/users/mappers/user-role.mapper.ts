import {UserRole as Client} from "../dto";
import {UserRole as DB} from "generated/prisma/enums";

const toDBMap: Record<Client, DB> = {
    [Client.Admin]: DB.admin,
    [Client.User]: DB.user,
};

const fromDBMap: Record<DB, Client> = {
    [DB.admin]: Client.Admin,
    [DB.user]: Client.User,
}

export const mapUserRoleToDB = (value: Client): DB => toDBMap[value]
export const mapUserRoleFromDB = (value: DB): Client => fromDBMap[value]