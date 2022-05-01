export default function randomString(length) {
  const symbols =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result = symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return result;
}
