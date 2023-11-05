type User = {
    username: string | undefined,
    email: string | undefined,
    password: string | undefined;
};

export function validate({ username, email, password }: User) {
    if (!username) {
        return { field: "username", message: "invalid usernmae" };
    }
    if (!email) {
        return { field: "email", message: "invalid email" };
    }
    if (!password) {
        return { field: "password", message: "invalid password" };
    }
    if (password && password?.length <= 5) {
        return { field: "password", message: "weak password" };
    }
    if (!email?.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")) {
        return { field: "email", message: " invalid email" };
    }

}