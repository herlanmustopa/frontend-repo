
export const fetchUsers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

export const getUserById = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};
export const updateUser = async ({ id, name, email }: { id: string; name: string; email: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};
