"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown, ArrowUp, BarChart3, Clock, Download, Globe, Users } from "lucide-react"

// Mock data for charts
const mockRequestsData = [
  { date: "2023-04-01", value: 1200 },
  { date: "2023-04-02", value: 1800 },
  { date: "2023-04-03", value: 1400 },
  { date: "2023-04-04", value: 2200 },
  { date: "2023-04-05", value: 2600 },
  { date: "2023-04-06", value: 2900 },
  { date: "2023-04-07", value: 3100 },
  { date: "2023-04-08", value: 2800 },
  { date: "2023-04-09", value: 3200 },
  { date: "2023-04-10", value: 3600 },
  { date: "2023-04-11", value: 3400 },
  { date: "2023-04-12", value: 3800 },
  { date: "2023-04-13", value: 4200 },
  { date: "2023-04-14", value: 4600 },
  { date: "2023-04-15", value: 5000 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  // Calculate some metrics for display
  const totalRequests = mockRequestsData.reduce((sum, item) => sum + item.value, 0)
  const averageRequests = Math.round(totalRequests / mockRequestsData.length)
  const lastValue = mockRequestsData[mockRequestsData.length - 1].value
  const previousValue = mockRequestsData[mockRequestsData.length - 2].value
  const percentChange = Math.round(((lastValue - previousValue) / previousValue) * 100)

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Monitor your platform's performance and usage.</p>
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRequests.toLocaleString()}</div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span className={`flex items-center ${percentChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {percentChange >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  {Math.abs(percentChange)}%
                </span>
                <span>from previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127ms</div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span className="flex items-center text-green-500">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  12%
                </span>
                <span>from previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span className="flex items-center text-green-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  8%
                </span>
                <span>from previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bandwidth Used</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42.8 GB</div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span className="flex items-center text-red-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  18%
                </span>
                <span>from previous period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="traffic" className="w-full">
          <TabsList>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>

          <TabsContent value="traffic" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Traffic</CardTitle>
                <CardDescription>Number of requests over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  {/* Chart would go here - using a placeholder */}
                  <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0">
                      <svg viewBox="0 0 100 20" className="w-full h-full">
                        <path
                          d={`M 0,${20 - (mockRequestsData[0].value / 5000) * 20} ${mockRequestsData
                            .map((d, i) => {
                              const x = (i / (mockRequestsData.length - 1)) * 100
                              const y = 20 - (d.value / 5000) * 20
                              return `L ${x},${y}`
                            })
                            .join(" ")}`}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="0.5"
                        />
                        <path
                          d={`M 0,${20 - (mockRequestsData[0].value / 5000) * 20} ${mockRequestsData
                            .map((d, i) => {
                              const x = (i / (mockRequestsData.length - 1)) * 100
                              const y = 20 - (d.value / 5000) * 20
                              return `L ${x},${y}`
                            })
                            .join(" ")} L 100,20 L 0,20 Z`}
                          fill="hsl(var(--primary)/0.1)"
                        />
                      </svg>
                    </div>
                    <div className="text-center z-10 bg-background/80 p-4 rounded-md">
                      <p className="text-sm text-muted-foreground">Interactive chart would be displayed here</p>
                      <p className="text-xs mt-1">
                        Showing data for the last{" "}
                        {timeRange === "24h"
                          ? "24 hours"
                          : timeRange === "7d"
                            ? "7 days"
                            : timeRange === "30d"
                              ? "30 days"
                              : "90 days"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Response times and server performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Performance metrics chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Metrics</CardTitle>
                <CardDescription>Build times and deployment frequency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Deployment metrics chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Error Tracking</CardTitle>
                <CardDescription>Error rates and common issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Error tracking chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Projects</CardTitle>
              <CardDescription>Projects with the most traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "E-commerce App", requests: 12500, change: 15 },
                  { name: "Portfolio", requests: 8700, change: 5 },
                  { name: "API Service", requests: 6200, change: -3 },
                  { name: "Dashboard UI", requests: 4800, change: 12 },
                  { name: "Blog Site", requests: 3100, change: -8 },
                ].map((project, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{project.name}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">{project.requests.toLocaleString()} requests</div>
                      <div
                        className={`flex items-center text-xs ${project.change >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {project.change >= 0 ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(project.change)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Traffic by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { region: "United States", percentage: 42 },
                  { region: "Europe", percentage: 28 },
                  { region: "Asia", percentage: 18 },
                  { region: "South America", percentage: 7 },
                  { region: "Other", percentage: 5 },
                ].map((region, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{region.region}</div>
                      <div className="text-sm text-muted-foreground">{region.percentage}%</div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${region.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

