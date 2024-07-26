export function findByEmail(email: string) {
  const user = JSON.parse(localStorage.getItem("users") || "{}").find(
    (obj: { email: string }) => {
      return obj.email === email;
    }
  );
  return user;
}
