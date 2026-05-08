import {UserStatus as Client} from "../dto";
import {UserStatus as DB} from "generated/prisma/enums";


const toDBMap: Record<Client, DB> = {
    [Client.Active]: DB.active,
    [Client.Banned]: DB.banned,
};

const fromDBMap: Record<DB, Client> = {
    [DB.active]: Client.Active,
    [DB.banned]: Client.Banned,
}

export const mapUserStatusToDB = (value: Client): DB => toDBMap[value]
export const mapUserStatusFromDB = (value: DB): Client => fromDBMap[value]