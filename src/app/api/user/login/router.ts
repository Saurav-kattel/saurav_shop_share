import { createUser } from "@/app/services/user/createuser";
import generateHash from "@/app/services/user/generateHash";
import { getUser } from "@/app/services/user/getUser";
import { validate } from "@/app/services/user/validate";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler({ req, res }: { req: NextApiRequest; res: NextApiResponse; }) {
    if (req.method !== "post") {
        return res.status(405).json({ messgae: "invalid method" });
    }

    let { username, email, password } = req.body;
    let errors = validate({ username, email, password });

    if (errors.length > 0) {
        return res.status(400).json({ ...errors });
    }
    let isUser = await getUser({ email });

    if (isUser) {
        return res.status(401).json({ messgae: "user already exists" });
    }
    let { hashError, hash } = generateHash(password);

    if (hashError || !hash) {
        return res.status(500).json({ messgae: "Internal Server Error" });
    }
    let { user, error } = await createUser({ username, email, hash });

    if (error) {
        return res.status(500).json({ message: "Internal Serval Error" });
    }
}