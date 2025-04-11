export function getDevBackend() {
  var address = "http://127.0.0.1";
  const tokens = address.split(":");
  // if last char of tokens[1] is "/", remove it:
  if (tokens[1].charAt(tokens[1].length - 1) === "/") {
      tokens[1] = tokens[1].slice(0, -1);
  }
  address = tokens[0] + ":" + tokens[1] + ":8000/";
  return address;
}