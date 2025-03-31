"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Copy, Mail, MoreHorizontal, Search, Settings, Shield, User, UserPlus, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for team members
const mockTeamMembers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Owner",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2023-01-15T10:30:00Z",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Admin",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2023-02-20T14:45:00Z",
  },
  {
    id: "user-3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2023-03-10T09:15:00Z",
  },
  {
    id: "user-4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2023-03-25T11:30:00Z",
  },
  {
    id: "user-5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "Viewer",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2023-04-05T16:20:00Z",
  },
]

// Mock data for pending invitations
const mockInvitations = [
  {
    id: "inv-1",
    email: "david.miller@example.com",
    role: "Developer",
    invitedAt: "2023-04-10T13:45:00Z",
  },
  {
    id: "inv-2",
    email: "sarah.jones@example.com",
    role: "Viewer",
    invitedAt: "2023-04-12T10:30:00Z",
  },
]

export default function TeamsPage() {
  const { toast } = useToast()
  const [members, setMembers] = useState(mockTeamMembers)
  const [invitations, setInvitations] = useState(mockInvitations)
  const [searchQuery, setSearchQuery] = useState("")
  const [newInvitation, setNewInvitation] = useState({ email: "", role: "Developer" })

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText("https://deployhub.example.com/invite/team123")
    toast({
      title: "Invite link copied",
      description: "Team invitation link has been copied to your clipboard.",
    })
  }

  const handleSendInvite = () => {
    if (!newInvitation.email) {
      toast({
        title: "Error",
        description: "Email address is required.",
        variant: "destructive",
      })
      return
    }

    const newId = `inv-${invitations.length + 1}`
    const newInvite = {
      id: newId,
      email: newInvitation.email,
      role: newInvitation.role,
      invitedAt: new Date().toISOString(),
    }

    setInvitations([...invitations, newInvite])
    setNewInvitation({ email: "", role: "Developer" })

    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${newInvitation.email}.`,
    })
  }

  const handleCancelInvitation = (id: string) => {
    setInvitations(invitations.filter((inv) => inv.id !== id))

    toast({
      title: "Invitation Cancelled",
      description: "The invitation has been cancelled.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case "owner":
        return <Badge className="bg-purple-500">Owner</Badge>
      case "admin":
        return <Badge className="bg-blue-500">Admin</Badge>
      case "developer":
        return <Badge>Developer</Badge>
      case "viewer":
        return <Badge variant="outline">Viewer</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
            <p className="text-muted-foreground">Manage your team members and permissions.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyInviteLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Invite Link
            </Button>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </div>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search team members..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage your team members and their access levels.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getRoleBadge(member.role)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Remove from Team</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {filteredMembers.length === 0 && (
                <div className="py-8 text-center">
                  <Users className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No team members found matching your search.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
            <CardDescription>Manage your pending team invitations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invitations.map((invitation) => (
                <div key={invitation.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{invitation.email}</div>
                      <div className="text-sm text-muted-foreground">Invited on {formatDate(invitation.invitedAt)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getRoleBadge(invitation.role)}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleCancelInvitation(invitation.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}

              {invitations.length === 0 && (
                <div className="py-8 text-center">
                  <Mail className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No pending invitations.</p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Invite New Member</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    placeholder="Email address"
                    type="email"
                    value={newInvitation.email}
                    onChange={(e) => setNewInvitation({ ...newInvitation, email: e.target.value })}
                    className="flex-1"
                  />
                  <select
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={newInvitation.role}
                    onChange={(e) => setNewInvitation({ ...newInvitation, role: e.target.value })}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Developer">Developer</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                  <Button onClick={handleSendInvite}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Send Invite
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>Understanding the different access levels in your team.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium">Owner</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Full access to all resources. Can manage team members, billing, and organization settings. Cannot be
                    removed from the team.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Admin</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Can manage team members and all projects. Has access to most settings except billing and
                    organization deletion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Developer</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Can create and manage projects. Can deploy to production. Cannot manage team members or billing
                    information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-muted-foreground/20 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Viewer</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Read-only access to projects. Cannot make changes or deploy. Useful for stakeholders who need to
                    monitor progress.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

