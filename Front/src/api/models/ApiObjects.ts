import { HashType } from "../../common/enums";

export interface HashTask {
    Token: HashProcessToken
    HashType: HashType,
    Checksum: string,
    Progress: number
}

export interface HashProcessToken {
    filePath: string,
    token: string,
}