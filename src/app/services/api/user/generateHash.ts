import bcrypt from "bcryptjs";
export default function generateHash(password: string) {
    try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return { hash };
    } catch (err: any) {
        return { hashError: err.messgae };
    }
}