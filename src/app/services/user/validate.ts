type User = {
    username: string | undefined,
    email: string | undefined,
    password: string | undefined;
};

export function validate({ username, email, password }: User) {
    const errors = [];
    if (!username) {
        errors.push({ field: "username", mesaage: "username undefined" });
    }
    if (!email) {
        errors.push({ field: "email", mesaage: "email undefined" });
    }
    if (!password) {
        errors.push({ field: "password", mesaage: "password undefined" });
    }
    if (password && password?.length <= 5) {
        errors.push({ field: "password", mesaage: "password must be greater then 5 or equal to 6" });
    }
    if (!email?.match("^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$")) {
        errors.push({ field: "email", mesaage: "provided email is invalid" });
    }
    return errors;
}