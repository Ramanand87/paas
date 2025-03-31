"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Clock, ExternalLink, Github, RefreshCcw, Search, Filter, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockProjects = [
  {
    id: "proj-123456",
    name: "My Portfolio",
    github_repo: "https://github.com/username/portfolio",
    status: "Live",
    created_at: "2023-04-15T10:30:00Z",
    updated_at: "2023-04-15T14:30:00Z",
    deployments: 5,
    url: "https://my-portfolio.onrender.com",
    description: "Personal portfolio website showcasing my work and skills",
  },
  {
    id: "proj-234567",
    name: "E-commerce App",
    github_repo: "https://github.com/username/ecommerce",
    status: "Live",
    created_at: "2023-04-14T15:45:00Z",
    updated_at: "2023-04-15T09:15:00Z",
    deployments: 12,
    url: "https://ecommerce-app.onrender.com",
    description: "Full-featured e-commerce platform with payment processing",
  },
  {
    id: "proj-345678",
    name: "Blog Site",
    github_repo: "https://github.com/username/blog",
    status: "Failed",
    created_at: "2023-04-13T09:15:00Z",
    updated_at: "2023-04-13T10:45:00Z",
    deployments: 3,
    url: null,
    description: "Personal blog built with Next.js and MDX",
  },
  {
    id: "proj-456789",
    name: "API Service",
    github_repo: "https://github.com/username/api-service",
    status: "Live",
    created_at: "2023-04-10T11:20:00Z",
    updated_at: "2023-04-14T16:30:00Z",
    deployments: 8,
    url: "https://api-service.onrender.com",
    description: "RESTful API service for data processing and analytics",
  },
  {
    id: "proj-567890",
    name: "Mobile App Backend",
    github_repo: "https://github.com/username/mobile-backend",
    status: "Deploying",
    created_at: "2023-04-08T14:10:00Z",
    updated_at: "2023-04-15T13:25:00Z",
    deployments: 15,
    url: null,
    description: "Backend services for iOS and Android mobile applications",
  },
  {
    id: "proj-678901",
    name: "Dashboard UI",
    github_repo: "https://github.com/username/dashboard-ui",
    status: "Live",
    created_at: "2023-04-05T09:45:00Z",
    updated_at: "2023-04-12T11:30:00Z",
    deployments: 7,
    url: "https://dashboard-ui.onrender.com",
    description: "Admin dashboard interface with analytics and reporting",
  },
]

export default function ProjectsPage() {
  const { toast } = useToast()
  const [projects, setProjects] = useState(mockProjects)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(mockProjects)

  // In a real application, you would fetch projects from your API
  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // In a real app: const response = await fetch('/api/projects')
      // const data = await response.json()
      // setProjects(data)

      // Using mock data for demonstration
      setProjects(mockProjects)
      setFilteredProjects(mockProjects)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredProjects(filtered)
    } else {
      setFilteredProjects(projects)
    }
  }, [searchQuery, projects])

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "live":
        return <Badge className="bg-green-500">Live</Badge>
      case "deploying":
        return <Badge className="bg-blue-500">Deploying</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col items-start gap-6">
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">Manage and monitor your projects.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchProjects} disabled={isLoading}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Link href="/deploy">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="deploying">Deploying</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      {getStatusBadge(project.status)}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Github className="h-3 w-3" />
                      {project.github_repo.split("/").slice(-2).join("/")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Updated {formatDate(project.updated_at)}
                      </div>
                      <div>
                        {project.deployments} deployment{project.deployments !== 1 ? "s" : ""}
                      </div>
                    </div>
                    {project.url && (
                      <div className="mt-2">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary flex items-center gap-1 hover:underline"
                        >
                          {project.url.replace(/^https?:\/\//, "")}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-1 border-t bg-muted/50">
                    <div className="flex justify-between w-full">
                      <Link href={`/projects/${project.id}`}>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </Link>
                      {project.status.toLowerCase() === "live" && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost">
                            Visit
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Filter tabs would have similar content with filtered data */}
          <TabsContent value="live" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects
                .filter((p) => p.status.toLowerCase() === "live")
                .map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                        {getStatusBadge(project.status)}
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Github className="h-3 w-3" />
                        {project.github_repo.split("/").slice(-2).join("/")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Updated {formatDate(project.updated_at)}
                        </div>
                        <div>
                          {project.deployments} deployment{project.deployments !== 1 ? "s" : ""}
                        </div>
                      </div>
                      {project.url && (
                        <div className="mt-2">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary flex items-center gap-1 hover:underline"
                          >
                            {project.url.replace(/^https?:\/\//, "")}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-1 border-t bg-muted/50">
                      <div className="flex justify-between w-full">
                        <Link href={`/projects/${project.id}`}>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </Link>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost">
                            Visit
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Similar content for other tabs */}
        </Tabs>
      </div>
    </div>
  )
}

