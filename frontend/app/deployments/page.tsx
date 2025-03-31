"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Clock, ExternalLink, Github, RefreshCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockDeployments = [
  {
    id: "srv-123456",
    name: "My Portfolio",
    github_repo: "https://github.com/username/portfolio",
    status: "Live",
    created_at: "2023-04-15T10:30:00Z",
    url: "https://my-portfolio.onrender.com",
  },
  {
    id: "srv-234567",
    name: "E-commerce App",
    github_repo: "https://github.com/username/ecommerce",
    status: "Deploying",
    created_at: "2023-04-14T15:45:00Z",
    url: null,
  },
  {
    id: "srv-345678",
    name: "Blog Site",
    github_repo: "https://github.com/username/blog",
    status: "Failed",
    created_at: "2023-04-13T09:15:00Z",
    url: null,
  },
]

export default function DeploymentsPage() {
  const { toast } = useToast()
  const [deployments, setDeployments] = useState(mockDeployments)
  const [isLoading, setIsLoading] = useState(false)

  // In a real application, you would fetch deployments from your API
  const fetchDeployments = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // In a real app: const response = await fetch('/api/deployments')
      // const data = await response.json()
      // setDeployments(data)

      // Using mock data for demonstration
      setDeployments(mockDeployments)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch deployments",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDeployments()
  }, [])

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
            <h1 className="text-3xl font-bold tracking-tight">Deployments</h1>
            <p className="text-muted-foreground">Manage and monitor your deployed projects.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchDeployments} disabled={isLoading}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Link href="/deploy">
              <Button size="sm">New Deployment</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="deploying">Deploying</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {deployments.map((deployment) => (
                <Card key={deployment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{deployment.name}</CardTitle>
                      {getStatusBadge(deployment.status)}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Github className="h-3 w-3" />
                      {deployment.github_repo.split("/").slice(-2).join("/")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Deployed on {formatDate(deployment.created_at)}
                    </div>
                    {deployment.url && (
                      <div className="mt-2">
                        <a
                          href={deployment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary flex items-center gap-1 hover:underline"
                        >
                          {deployment.url.replace(/^https?:\/\//, "")}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-1">
                    <div className="flex justify-between w-full">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      {deployment.status.toLowerCase() === "live" && (
                        <a href={deployment.url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="secondary">
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
              {deployments
                .filter((d) => d.status.toLowerCase() === "live")
                .map((deployment) => (
                  <Card key={deployment.id}>
                    {/* Same card content as above */}
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">{deployment.name}</CardTitle>
                        {getStatusBadge(deployment.status)}
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Github className="h-3 w-3" />
                        {deployment.github_repo.split("/").slice(-2).join("/")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Deployed on {formatDate(deployment.created_at)}
                      </div>
                      {deployment.url && (
                        <div className="mt-2">
                          <a
                            href={deployment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary flex items-center gap-1 hover:underline"
                          >
                            {deployment.url.replace(/^https?:\/\//, "")}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-1">
                      <div className="flex justify-between w-full">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        <a href={deployment.url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="secondary">
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

