"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Code,
  Github,
  Globe,
  MoreVertical,
  RefreshCcw,
  Settings,
  Terminal,
  Trash2,
  RotateCcw,
  Play,
  Pause,
  AlertTriangle,
  Folder,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

// Mock data for demonstration
const mockProject = {
  id: "proj-123456",
  name: "My Portfolio",
  github_repo: "https://github.com/username/portfolio",
  status: "Live",
  created_at: "2023-04-15T10:30:00Z",
  updated_at: "2023-04-15T14:30:00Z",
  deployments: 5,
  url: "https://my-portfolio.onrender.com",
  description: "Personal portfolio website showcasing my work and skills",
  branch: "main",
  publishDir: "build",
  buildCommand: "npm run build",
  environment: "production",
  region: "us-west",
  domains: [
    { id: "dom-1", name: "portfolio.example.com", verified: true, primary: true },
    { id: "dom-2", name: "www.portfolio.example.com", verified: true, primary: false },
  ],
  deploymentHistory: [
    {
      id: "dep-1",
      status: "Success",
      created_at: "2023-04-15T14:30:00Z",
      commit: "a1b2c3d",
      message: "Update hero section",
    },
    {
      id: "dep-2",
      status: "Success",
      created_at: "2023-04-14T11:20:00Z",
      commit: "e4f5g6h",
      message: "Fix mobile responsiveness",
    },
    {
      id: "dep-3",
      status: "Failed",
      created_at: "2023-04-13T09:45:00Z",
      commit: "i7j8k9l",
      message: "Add contact form",
    },
    {
      id: "dep-4",
      status: "Success",
      created_at: "2023-04-12T16:15:00Z",
      commit: "m1n2o3p",
      message: "Initial deployment",
    },
  ],
  environmentVariables: [
    { id: "env-1", key: "API_URL", value: "https://api.example.com", isSecret: false },
    { id: "env-2", key: "API_KEY", value: "••••••••••••••••", isSecret: true },
  ],
  metrics: {
    requests: 12500,
    bandwidth: 2.4, // GB
    buildTime: 45, // seconds
    uptime: 99.9, // percentage
  },
}

export default function ProjectDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeDeployment, setActiveDeployment] = useState<any>(null)
  const [deploymentProgress, setDeploymentProgress] = useState(0)

  // In a real application, you would fetch project details from your API
  const fetchProjectDetails = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // In a real app: const response = await fetch(`/api/projects/${params.id}`)
      // const data = await response.json()
      // setProject(data)

      // Using mock data for demonstration
      setProject(mockProject)

      // Set the active deployment to the most recent one
      if (mockProject.deploymentHistory.length > 0) {
        setActiveDeployment(mockProject.deploymentHistory[0])
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch project details",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjectDetails()

    // Simulate deployment progress for demonstration
    const interval = setInterval(() => {
      setDeploymentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "live":
      case "success":
        return <Badge className="bg-green-500">Live</Badge>
      case "deploying":
        return <Badge className="bg-blue-500">Deploying</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleRedeploy = () => {
    toast({
      title: "Redeployment Started",
      description: "Your project is being redeployed.",
    })
  }

  const handleRollback = (deploymentId: string) => {
    toast({
      title: "Rollback Initiated",
      description: `Rolling back to deployment ${deploymentId.substring(0, 8)}`,
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-destructive" />
          <h2 className="mt-4 text-2xl font-bold">Project Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The project you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button className="mt-6" onClick={() => router.push("/projects")}>
            Back to Projects
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.push("/projects")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            {getStatusBadge(project.status)}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchProjectDetails}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>

            <Button size="sm" onClick={handleRedeploy}>
              <Play className="h-4 w-4 mr-2" />
              Deploy
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Project Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Terminal className="h-4 w-4 mr-2" />
                  View Logs
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Project
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Github className="h-4 w-4" />
            <a href={project.github_repo} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {project.github_repo.split("/").slice(-2).join("/")}
            </a>
          </div>
          <div className="flex items-center gap-1">
            <Code className="h-4 w-4" />
            {project.branch}
          </div>
          {project.url && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {project.url.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
        </div>

        <p className="text-muted-foreground">{project.description}</p>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="domains">Domains</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.metrics.requests.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Bandwidth Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.metrics.bandwidth} GB</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Build Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.metrics.buildTime}s</div>
                  <p className="text-xs text-muted-foreground">Last deployment</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.metrics.uptime}%</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Latest Deployment</CardTitle>
                  <CardDescription>
                    {activeDeployment ? formatDate(activeDeployment.created_at) : "No deployments yet"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {activeDeployment ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="font-mono text-xs bg-muted p-1 rounded">
                            {activeDeployment.commit.substring(0, 7)}
                          </div>
                          <span className="text-sm">{activeDeployment.message}</span>
                        </div>
                        {getStatusBadge(activeDeployment.status)}
                      </div>

                      {activeDeployment.status.toLowerCase() === "deploying" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Deployment in progress</span>
                            <span>{deploymentProgress}%</span>
                          </div>
                          <Progress value={deploymentProgress} className="h-2" />
                        </div>
                      )}

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleRollback(activeDeployment.id)}>
                          <RotateCcw className="h-3 w-3 mr-2" />
                          Rollback
                        </Button>
                        <Button size="sm" onClick={handleRedeploy}>
                          <RefreshCcw className="h-3 w-3 mr-2" />
                          Redeploy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No deployments yet</p>
                      <Button className="mt-4" size="sm" onClick={handleRedeploy}>
                        Deploy Now
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environment Variables</CardTitle>
                  <CardDescription>Configuration for your project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {project.environmentVariables.map((env: any) => (
                      <div key={env.id} className="flex justify-between items-center p-2 bg-muted rounded-md">
                        <div className="font-mono text-sm">{env.key}</div>
                        <div className="font-mono text-sm">{env.isSecret ? env.value : env.value}</div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Environment Variables
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deployments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Deployment History</CardTitle>
                <CardDescription>Recent deployments for this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.deploymentHistory.map((deployment: any, index: number) => (
                    <div key={deployment.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            deployment.status.toLowerCase() === "success"
                              ? "bg-green-500"
                              : deployment.status.toLowerCase() === "failed"
                                ? "bg-red-500"
                                : "bg-blue-500"
                          }`}
                        ></div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="font-mono text-xs bg-background p-1 rounded">
                              {deployment.commit.substring(0, 7)}
                            </div>
                            <span className="text-sm font-medium">{deployment.message}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{formatDate(deployment.created_at)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Terminal className="h-3 w-3 mr-2" />
                          Logs
                        </Button>
                        {index > 0 && (
                          <Button variant="outline" size="sm" onClick={() => handleRollback(deployment.id)}>
                            <RotateCcw className="h-3 w-3 mr-2" />
                            Rollback
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="domains" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Domains</CardTitle>
                <CardDescription>Manage custom domains for your project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.domains.map((domain: any) => (
                    <div key={domain.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{domain.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            {domain.verified ? (
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/10">
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/10">
                                Pending
                              </Badge>
                            )}
                            {domain.primary && <Badge variant="outline">Primary</Badge>}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-3 w-3 mr-2" />
                        Manage
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  Add Custom Domain
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>Configure your project settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Build Configuration</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">Branch</label>
                      <div className="flex items-center mt-1 p-2 bg-muted rounded-md">
                        <Code className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{project.branch}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Publish Directory</label>
                      <div className="flex items-center mt-1 p-2 bg-muted rounded-md">
                        <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{project.publishDir}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Build Command</label>
                      <div className="flex items-center mt-1 p-2 bg-muted rounded-md">
                        <Terminal className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{project.buildCommand}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Environment</label>
                      <div className="flex items-center mt-1 p-2 bg-muted rounded-md">
                        <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{project.environment}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground">These actions are destructive and cannot be undone.</p>
                  <div className="flex flex-col gap-2 mt-4">
                    <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Project
                    </Button>
                    <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Project
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

