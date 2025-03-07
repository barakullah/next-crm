import Cookies from "js-cookie";

export function checkLeadOwenerInLeadDetails(leadOwner: number) {
  let loggedInPerson: any = Cookies.get("userData");
  loggedInPerson = parseInt(loggedInPerson);
  if (loggedInPerson === leadOwner) return true;
  else return false;
}
