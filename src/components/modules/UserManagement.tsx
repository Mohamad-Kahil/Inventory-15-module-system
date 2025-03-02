import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  UserCheck,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "pending";
  lastLogin?: string;
}

interface UserManagementProps {
  users?: User[];
  onCreateUser?: (user: any) => void;
  onUpdateUser?: (id: string, user: any) => void;
  onDeleteUser?: (id: string) => void;
  onAssignRole?: (id: string, role: string) => void;
}

const UserManagement = ({
  users = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: "admin",
      department: "engineering",
      status: "active",
      lastLogin: "2023-06-15T10:30:00",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      role: "manager",
      department: "marketing",
      status: "active",
      lastLogin: "2023-06-14T09:45:00",
    },
    {
      id: "3",
      firstName: "Robert",
      lastName: "Johnson",
      email: "robert.johnson@example.com",
      role: "user",
      department: "sales",
      status: "inactive",
      lastLogin: "2023-05-20T14:20:00",
    },
    {
      id: "4",
      firstName: "Emily",
      lastName: "Williams",
      email: "emily.williams@example.com",
      role: "user",
      department: "finance",
      status: "pending",
      lastLogin: null,
    },
    {
      id: "5",
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@example.com",
      role: "manager",
      department: "hr",
      status: "active",
      lastLogin: "2023-06-10T11:15:00",
    },
  ],
  onCreateUser = () => {},
  onUpdateUser = () => {},
  onDeleteUser = () => {},
  onAssignRole = () => {},
}: UserManagementProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("all-users");

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    const matchesDepartment =
      departmentFilter === "all" || user.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesRole && matchesDepartment;
  });

  const handleAddUser = (userData: any) => {
    onCreateUser(userData);
    setIsAddUserOpen(false);
  };

  const handleEditUser = (userData: any) => {
    if (selectedUser) {
      onUpdateUser(selectedUser.id, userData);
    }
    setIsEditUserOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      onDeleteUser(selectedUser.id);
    }
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleAssignRole = (user: User, role: string) => {
    onAssignRole(user.id, role);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background p-6 rounded-lg w-full"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-2xl font-bold">User Management</h1>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with role-based permissions.
                </DialogDescription>
              </DialogHeader>
              <UserForm
                onSubmit={handleAddUser}
                onCancel={() => setIsAddUserOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>User Directory</CardTitle>
            <Tabs
              defaultValue="all-users"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-4"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all-users">All Users</TabsTrigger>
                <TabsTrigger value="active-users">Active</TabsTrigger>
                <TabsTrigger value="inactive-users">
                  Inactive/Pending
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="user">Standard User</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs
                defaultValue="all-users"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsContent value="all-users" className="m-0">
                  <UserTable
                    users={filteredUsers}
                    onEdit={openEditDialog}
                    onDelete={openDeleteDialog}
                    onAssignRole={handleAssignRole}
                  />
                </TabsContent>

                <TabsContent value="active-users" className="m-0">
                  <UserTable
                    users={filteredUsers.filter(
                      (user) => user.status === "active",
                    )}
                    onEdit={openEditDialog}
                    onDelete={openDeleteDialog}
                    onAssignRole={handleAssignRole}
                  />
                </TabsContent>

                <TabsContent value="inactive-users" className="m-0">
                  <UserTable
                    users={filteredUsers.filter(
                      (user) =>
                        user.status === "inactive" || user.status === "pending",
                    )}
                    onEdit={openEditDialog}
                    onDelete={openDeleteDialog}
                    onAssignRole={handleAssignRole}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <UserForm
              user={{
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                email: selectedUser.email,
                department: selectedUser.department,
                role: selectedUser.role,
                isActive: selectedUser.status === "active",
              }}
              onSubmit={handleEditUser}
              onCancel={() => setIsEditUserOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account
              {selectedUser &&
                ` for ${selectedUser.firstName} ${selectedUser.lastName}`}{" "}
              and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default UserManagement;
