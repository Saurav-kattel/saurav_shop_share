import bcrypt from "bcryptjs";
export default async function verifyPassword({ hash, password }: { hash: string, password: string; }) {
    try {
        let isCorrectPassword = await bcrypt.compare(hash, password);
        return { isCorrectPassword };
    } catch (err: any) {
        return { verificationError: err.messgae };
    }
}