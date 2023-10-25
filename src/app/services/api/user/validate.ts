type User = {
    username: string | undefined,
    email: string | undefined,
    password: string | undefined;
};

export function validate({ username, email, password }: User) {
    const errors = [];
    if (!username) {
        errors.push({ field: "username", message: "username undefined" });
    }
    if (!email) {
        errors.push({ field: "email", message: "email undefined" });
    }
    if (!password) {
        errors.push({ field: "password", message: "password undefined" });
    }
    if (password && password?.length <= 5) {
        errors.push({ field: "password", message: "password must be greater then 5 or equal to 6" });
    }
    if (!email?.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")) {
        errors.push({ field: "email", message: "provided email is invalid" });
    }
    return errors;
}