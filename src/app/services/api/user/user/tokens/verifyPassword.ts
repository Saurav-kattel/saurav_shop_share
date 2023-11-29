import bcrypt from "bcryptjs";
export default async function verifyPassword({ hash, password }: { hash: string, password: string; }) {
    try {
        let isCorrectPassword = await bcrypt.compare(password, hash);
        return { isCorrectPassword };
    } catch (err: any) {
        return { verificationError: "Error Occured" };
    }
}