"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Download, Info, RefreshCcw, Search, Terminal } from "lucide-react"

// Mock data for logs
const mockLogs = [
  {
    id: "log-1",
    timestamp: "2023-04-15T14:30:25Z",
    level: "info",
    message: "Deployment started for project 'My Portfolio'",
    source: "deployment-service",
    projectId: "proj-123456",
    projectName: "My Portfolio",
  },
  {
    id: "log-2",
    timestamp: "2023-04-15T14:30:30Z",
    level: "info",
    message: "Cloning repository from GitHub",
    source: "git-service",
    projectId: "proj-123456",
    projectName: "My Portfolio",
  },
  {
    id: "log-3",
    timestamp: "2023-04-15T14:30:45Z",
    level: "info",
    message: "Running build command: npm run build",
    source: "build-service",
    projectId: "proj-123456",
    projectName: "My Portfolio",
  },
  {
    id: "log-4",
    timestamp: "2023-04-15T14:31:15Z",
    level: "warning",
    message: "Deprecated dependency detected: react-scripts@4.0.3",
    source: "build-service",
    projectId: "proj-123456",
    projectName: "My Portfolio",
  },
  {
    id: "log-5",
    timestamp: "2023-04-15T14:32:30Z",
    level: "info",
    message: "Build completed successfully",
    source: "build-service",
    projectId: "proj-123456",
    projectName: "My Portfolio",
  },
  {
    id: "log-6",
    timestamp: "2023-04-15T14:32:45Z",
    level: "info",
    message: "Deploying to production environment",
    source: "deployment-service",
    projectId: "proj-123456",
    projectName: "My Portfolio",
  },
  {
    id: "log-7",
    timestamp: "2023-04-15T14:33:10Z",
    level: "error",
    message: "Failed to upload assets: Connection timeout",
    source: "cdn-service",
    projectId: "proj-123456",
    projectName: "My Portfolio",
  },
  {
    id: "log-8",
    timestamp: "2023-04-15T14:33:25Z",
    level: "info",
    message: "Retrying asset upload (attempt 1/3)",
    source: "cdn-service",
    projectId: "proj-123456",
    projectName: "My Portfolio",
  },
  {
    id: "log-9",
    timestamp: "2023-04-15T14:33:40Z",
    level: "info",
    message: "Asset upload successful",
    source: "cdn-service",
    projectId: "proj-123456",
    projectName: "My Portfolio",
  },
  {
    id: "log-10",
    timestamp: "2023-04-15T14:34:00Z",
    level: "info",
    message: "Deployment completed successfully",
    source: "deployment-service",
    projectId: "proj-123456",
    projectName: "My Portfolio",
  },
  {
    id: "log-11",
    timestamp: "2023-04-15T14:34:15Z",
    level: "info",
    message: "Domain 'portfolio.example.com' configured",
    source: "domain-service",
    projectId: "proj-123456",
    projectName: "My Portfolio",
  },
  {
    id: "log-12",
    timestamp: "2023-04-15T14:34:30Z",
    level: "info",
    message: "SSL certificate issued successfully",
    source: "ssl-service",
    projectId: "proj-123456",
    projectName: "My Portfolio",
  },
]

export default function LogsPage() {
  const [logs, setLogs] = useState(mockLogs)
  const [searchQuery, setSearchQuery] = useState("")
  const [projectFilter, setProjectFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [filteredLogs, setFilteredLogs] = useState(mockLogs)

  // Filter logs based on search query and filters
  useState(() => {
    let filtered = logs

    if (searchQuery) {
      filtered = filtered.filter(
        (log) =>
          log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.source.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (projectFilter !== "all") {
      filtered = filtered.filter((log) => log.projectId === projectFilter)
    }

    if (levelFilter !== "all") {
      filtered = filtered.filter((log) => log.level === levelFilter)
    }

    setFilteredLogs(filtered)
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getLevelClass = (level: string) => {
    switch (level) {
      case "info":
        return "text-blue-500 bg-blue-500/10"
      case "warning":
        return "text-amber-500 bg-amber-500/10"
      case "error":
        return "text-red-500 bg-red-500/10"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Logs</h1>
            <p className="text-muted-foreground">View and search system logs for your projects.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search logs..."
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

          <Select defaultValue={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Logs</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="build">Build</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>View all system logs across your projects.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 font-mono text-sm">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="flex items-start p-2 rounded-md hover:bg-muted/50 transition-colors">
                      <div className="w-44 shrink-0 text-xs text-muted-foreground">{formatDate(log.timestamp)}</div>
                      <div className="w-24 shrink-0 flex items-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getLevelClass(log.level)}`}>
                          {log.level}
                        </span>
                      </div>
                      <div className="w-32 shrink-0 text-xs text-muted-foreground">{log.source}</div>
                      <div className="flex-1 break-all">{log.message}</div>
                    </div>
                  ))}

                  {filteredLogs.length === 0 && (
                    <div className="py-8 text-center">
                      <Terminal className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">No logs found matching your filters.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployment" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Logs</CardTitle>
                <CardDescription>View logs related to project deployments.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 font-mono text-sm">
                  {filteredLogs
                    .filter((log) => log.source.includes("deployment"))
                    .map((log) => (
                      <div key={log.id} className="flex items-start p-2 rounded-md hover:bg-muted/50 transition-colors">
                        <div className="w-44 shrink-0 text-xs text-muted-foreground">{formatDate(log.timestamp)}</div>
                        <div className="w-24 shrink-0 flex items-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${getLevelClass(log.level)}`}>
                            {log.level}
                          </span>
                        </div>
                        <div className="w-32 shrink-0 text-xs text-muted-foreground">{log.source}</div>
                        <div className="flex-1 break-all">{log.message}</div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Similar content for other tabs */}
        </Tabs>
      </div>
    </div>
  )
}

