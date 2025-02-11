
export const fetchUsers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};
