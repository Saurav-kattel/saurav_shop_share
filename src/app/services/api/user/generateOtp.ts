export function generateOtp() {
  let otp: string = "";
  for (let i = 0; i < 5; i++) {
    otp += Math.ceil(Math.random() * 9).toString();
  }
  return parseInt(otp);
}
