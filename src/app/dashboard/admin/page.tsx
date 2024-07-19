"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [syncingUser, setSyncingUser] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("/api/admin");
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    } else if (response.status === 403) {
      toast.error("You don't have permission to access this page");
    } else {
      toast.error("Failed to fetch users");
    }
  };

  const updateUserRole = async (userId: string, newRole: "user" | "admin") => {
    const response = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole }),
    });

    if (response.ok) {
      fetchUsers();
      toast.success("User role updated successfully");
    } else {
      toast.error("Failed to update user role");
    }
  };

  const syncUserOrders = async (userId: string) => {
    setSyncingUser(userId);
    const response = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      const data = await response.json();
      toast.success(data.message);
    } else {
      toast.error("Failed to sync user orders");
    }
    setSyncingUser(null);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Switch
                  checked={user.role === "admin"}
                  onCheckedChange={(checked) =>
                    updateUserRole(user.id, checked ? "admin" : "user")
                  }
                  disabled={user.role === "admin"}
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => syncUserOrders(user.id)}
                  disabled={syncingUser === user.id}
                >
                  {syncingUser === user.id ? "Syncing..." : "Sync Orders"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
