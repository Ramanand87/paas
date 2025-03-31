"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitBranch, Github, Folder } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DeployPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentData, setDeploymentData] = useState({
    name: "",
    github_repo: "",
    branch: "main",
    publishDir: "build",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDeploymentData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!deploymentData.github_repo) {
      toast({
        title: "Error",
        description: "GitHub repository URL is required",
        variant: "destructive",
      })
      return
    }

    setIsDeploying(true)

    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deploymentData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Deployment Started",
          description: `Your project is now being deployed. Service ID: ${data.service_id}`,
        })
        router.push("/deployments")
      } else {
        throw new Error(data.error || "Failed to deploy project")
      }
    } catch (error) {
      toast({
        title: "Deployment Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deploy a Project</h1>
          <p className="text-muted-foreground">Deploy your static site or web application from GitHub.</p>
        </div>
        <Tabs defaultValue="github" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-1">
            <TabsTrigger value="github" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </TabsTrigger>
          </TabsList>
          <TabsContent value="github" className="mt-6">
            <Card className="w-full max-w-2xl mx-auto">
              <form onSubmit={handleDeploy}>
                <CardHeader>
                  <CardTitle>GitHub Repository</CardTitle>
                  <CardDescription>Deploy your project directly from a GitHub repository.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="my-awesome-project"
                      value={deploymentData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github_repo">GitHub Repository URL</Label>
                    <Input
                      id="github_repo"
                      name="github_repo"
                      placeholder="https://github.com/username/repo"
                      value={deploymentData.github_repo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="branch" className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4" />
                        Branch
                      </Label>
                      <Input
                        id="branch"
                        name="branch"
                        placeholder="main"
                        value={deploymentData.branch}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="publishDir" className="flex items-center gap-2">
                        <Folder className="h-4 w-4" />
                        Publish Directory
                      </Label>
                      <Input
                        id="publishDir"
                        name="publishDir"
                        placeholder="build"
                        value={deploymentData.publishDir}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.push("/")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isDeploying}>
                    {isDeploying ? "Deploying..." : "Deploy Project"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

