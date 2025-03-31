"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Copy, Eye, EyeOff, Key, Lock, Plus, RefreshCcw, Search, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for environment variables
const mockEnvironmentVariables = [
  {
    id: "env-1",
    key: "API_URL",
    value: "https://api.example.com",
    isSecret: false,
    projectId: "proj-123456",
    projectName: "My Portfolio",
    environment: "production",
  },
  {
    id: "env-2",
    key: "API_KEY",
    value: "sk_test_abcdefghijklmnopqrstuvwxyz",
    isSecret: true,
    projectId: "proj-123456",
    projectName: "My Portfolio",
    environment: "production",
  },
  {
    id: "env-3",
    key: "DATABASE_URL",
    value: "postgres://user:password@localhost:5432/mydb",
    isSecret: true,
    projectId: "proj-123456",
    projectName: "My Portfolio",
    environment: "production",
  },
  {
    id: "env-4",
    key: "DEBUG",
    value: "false",
    isSecret: false,
    projectId: "proj-123456",
    projectName: "My Portfolio",
    environment: "production",
  },
  {
    id: "env-5",
    key: "NODE_ENV",
    value: "production",
    isSecret: false,
    projectId: "proj-123456",
    projectName: "My Portfolio",
    environment: "production",
  },
  {
    id: "env-6",
    key: "API_URL",
    value: "https://dev-api.example.com",
    isSecret: false,
    projectId: "proj-123456",
    projectName: "My Portfolio",
    environment: "development",
  },
  {
    id: "env-7",
    key: "API_KEY",
    value: "sk_test_dev_abcdefghijklmnopqrstuvwxyz",
    isSecret: true,
    projectId: "proj-123456",
    projectName: "My Portfolio",
    environment: "development",
  },
]

export default function EnvironmentPage() {
  const { toast } = useToast()
  const [envVars, setEnvVars] = useState(mockEnvironmentVariables)
  const [searchQuery, setSearchQuery] = useState("")
  const [projectFilter, setProjectFilter] = useState("all")
  const [environmentFilter, setEnvironmentFilter] = useState("production")
  const [filteredEnvVars, setFilteredEnvVars] = useState(
    mockEnvironmentVariables.filter((env) => env.environment === "production"),
  )
  const [visibleSecrets, setVisibleSecrets] = useState<Record<string, boolean>>({})
  const [newEnvVar, setNewEnvVar] = useState({ key: "", value: "", isSecret: false })

  // Filter environment variables based on search query and filters
  useState(() => {
    let filtered = envVars.filter((env) => env.environment === environmentFilter)

    if (searchQuery) {
      filtered = filtered.filter(
        (env) =>
          env.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (!env.isSecret && env.value.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (projectFilter !== "all") {
      filtered = filtered.filter((env) => env.projectId === projectFilter)
    }

    setFilteredEnvVars(filtered)
  })

  const toggleSecretVisibility = (id: string) => {
    setVisibleSecrets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleCopyValue = (value: string) => {
    navigator.clipboard.writeText(value)
    toast({
      title: "Copied to clipboard",
      description: "Environment variable value has been copied to your clipboard.",
    })
  }

  const handleAddEnvVar = () => {
    if (!newEnvVar.key || !newEnvVar.value) {
      toast({
        title: "Error",
        description: "Both key and value are required.",
        variant: "destructive",
      })
      return
    }

    const newId = `env-${envVars.length + 1}`
    const newVariable = {
      id: newId,
      key: newEnvVar.key,
      value: newEnvVar.value,
      isSecret: newEnvVar.isSecret,
      projectId: "proj-123456", // Default project for demo
      projectName: "My Portfolio", // Default project for demo
      environment: environmentFilter,
    }

    setEnvVars([...envVars, newVariable])
    setNewEnvVar({ key: "", value: "", isSecret: false })

    toast({
      title: "Environment Variable Added",
      description: `${newEnvVar.key} has been added to ${environmentFilter} environment.`,
    })
  }

  const handleDeleteEnvVar = (id: string) => {
    setEnvVars(envVars.filter((env) => env.id !== id))

    toast({
      title: "Environment Variable Deleted",
      description: "The environment variable has been deleted.",
    })
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Environment Variables</h1>
            <p className="text-muted-foreground">Manage environment variables for your projects.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search environment variables..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select defaultValue={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="proj-123456">My Portfolio</SelectItem>
              <SelectItem value="proj-234567">E-commerce App</SelectItem>
              <SelectItem value="proj-345678">Blog Site</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="production" className="w-full" onValueChange={setEnvironmentFilter}>
          <TabsList>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="production" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Production Environment Variables</CardTitle>
                <CardDescription>
                  Variables for the production environment. These are used when your app is deployed to production.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEnvVars.map((env) => (
                    <div key={env.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-2 overflow-hidden">
                        {env.isSecret ? (
                          <Lock className="h-4 w-4 text-amber-500 shrink-0" />
                        ) : (
                          <Key className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                        <div className="font-mono text-sm font-medium overflow-hidden text-ellipsis">{env.key}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="font-mono text-sm max-w-[300px] overflow-hidden text-ellipsis">
                          {env.isSecret && !visibleSecrets[env.id] ? "••••••••••••••••" : env.value}
                        </div>
                        <div className="flex items-center">
                          {env.isSecret && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toggleSecretVisibility(env.id)}
                            >
                              {visibleSecrets[env.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleCopyValue(env.value)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDeleteEnvVar(env.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredEnvVars.length === 0 && (
                    <div className="py-8 text-center">
                      <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        No environment variables found matching your filters.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Add New Environment Variable</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="env-key">Key</Label>
                        <Input
                          id="env-key"
                          placeholder="API_KEY"
                          value={newEnvVar.key}
                          onChange={(e) => setNewEnvVar({ ...newEnvVar, key: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="env-value">Value</Label>
                        <Input
                          id="env-value"
                          placeholder="your-api-key-value"
                          type={newEnvVar.isSecret ? "password" : "text"}
                          value={newEnvVar.value}
                          onChange={(e) => setNewEnvVar({ ...newEnvVar, value: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is-secret"
                        checked={newEnvVar.isSecret}
                        onCheckedChange={(checked) => setNewEnvVar({ ...newEnvVar, isSecret: checked })}
                      />
                      <Label htmlFor="is-secret">Treat as secret</Label>
                    </div>
                    <Button onClick={handleAddEnvVar} className="w-full md:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Environment Variable
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="development" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Development Environment Variables</CardTitle>
                <CardDescription>
                  Variables for the development environment. These are used during local development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Similar content as production tab, filtered for development environment */}
                <div className="space-y-4">
                  {filteredEnvVars.map((env) => (
                    <div key={env.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-2 overflow-hidden">
                        {env.isSecret ? (
                          <Lock className="h-4 w-4 text-amber-500 shrink-0" />
                        ) : (
                          <Key className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                        <div className="font-mono text-sm font-medium overflow-hidden text-ellipsis">{env.key}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="font-mono text-sm max-w-[300px] overflow-hidden text-ellipsis">
                          {env.isSecret && !visibleSecrets[env.id] ? "••••••••••••••••" : env.value}
                        </div>
                        <div className="flex items-center">
                          {env.isSecret && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toggleSecretVisibility(env.id)}
                            >
                              {visibleSecrets[env.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleCopyValue(env.value)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDeleteEnvVar(env.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Add New Environment Variable</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="env-key-dev">Key</Label>
                        <Input
                          id="env-key-dev"
                          placeholder="API_KEY"
                          value={newEnvVar.key}
                          onChange={(e) => setNewEnvVar({ ...newEnvVar, key: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="env-value-dev">Value</Label>
                        <Input
                          id="env-value-dev"
                          placeholder="your-api-key-value"
                          type={newEnvVar.isSecret ? "password" : "text"}
                          value={newEnvVar.value}
                          onChange={(e) => setNewEnvVar({ ...newEnvVar, value: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is-secret-dev"
                        checked={newEnvVar.isSecret}
                        onCheckedChange={(checked) => setNewEnvVar({ ...newEnvVar, isSecret: checked })}
                      />
                      <Label htmlFor="is-secret-dev">Treat as secret</Label>
                    </div>
                    <Button onClick={handleAddEnvVar} className="w-full md:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Environment Variable
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview Environment Variables</CardTitle>
                <CardDescription>
                  Variables for preview environments. These are used for preview deployments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center">
                  <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No preview environment variables configured yet.</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Variable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

