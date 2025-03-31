"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Check, Copy, Globe, Plus, RefreshCcw, Search, Settings, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockDomains = [
  {
    id: "dom-1",
    name: "portfolio.example.com",
    verified: true,
    primary: true,
    projectId: "proj-123456",
    projectName: "My Portfolio",
    status: "Active",
    created_at: "2023-04-10T11:20:00Z",
    dns: {
      type: "CNAME",
      name: "portfolio.example.com",
      value: "cname.deployhub.com",
      verified: true,
    },
  },
  {
    id: "dom-2",
    name: "www.portfolio.example.com",
    verified: true,
    primary: false,
    projectId: "proj-123456",
    projectName: "My Portfolio",
    status: "Active",
    created_at: "2023-04-10T11:25:00Z",
    dns: {
      type: "CNAME",
      name: "www.portfolio.example.com",
      value: "cname.deployhub.com",
      verified: true,
    },
  },
  {
    id: "dom-3",
    name: "ecommerce.example.com",
    verified: false,
    primary: false,
    projectId: "proj-234567",
    projectName: "E-commerce App",
    status: "Pending",
    created_at: "2023-04-15T09:15:00Z",
    dns: {
      type: "CNAME",
      name: "ecommerce.example.com",
      value: "cname.deployhub.com",
      verified: false,
    },
  },
  {
    id: "dom-4",
    name: "api.example.com",
    verified: true,
    primary: true,
    projectId: "proj-456789",
    projectName: "API Service",
    status: "Active",
    created_at: "2023-04-14T16:30:00Z",
    dns: {
      type: "CNAME",
      name: "api.example.com",
      value: "cname.deployhub.com",
      verified: true,
    },
  },
  {
    id: "dom-5",
    name: "blog.example.com",
    verified: true,
    primary: true,
    projectId: "proj-345678",
    projectName: "Blog Site",
    status: "Active",
    created_at: "2023-04-13T10:45:00Z",
    dns: {
      type: "CNAME",
      name: "blog.example.com",
      value: "cname.deployhub.com",
      verified: true,
    },
  },
]

export default function DomainsPage() {
  const { toast } = useToast()
  const [domains, setDomains] = useState(mockDomains)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDomains, setFilteredDomains] = useState(mockDomains)

  const handleCopyDNS = (value: string) => {
    navigator.clipboard.writeText(value)
    toast({
      title: "Copied to clipboard",
      description: "DNS value has been copied to your clipboard.",
    })
  }

  const handleVerifyDomain = (domainId: string) => {
    toast({
      title: "Verification in progress",
      description: "Checking DNS records for verification...",
    })

    // Simulate verification process
    setTimeout(() => {
      setDomains(
        domains.map((domain) =>
          domain.id === domainId
            ? { ...domain, verified: true, status: "Active", dns: { ...domain.dns, verified: true } }
            : domain,
        ),
      )

      toast({
        title: "Domain verified",
        description: "Your domain has been successfully verified.",
      })
    }, 2000)
  }

  // Filter domains based on search query
  useState(() => {
    if (searchQuery) {
      const filtered = domains.filter(
        (domain) =>
          domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          domain.projectName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredDomains(filtered)
    } else {
      setFilteredDomains(domains)
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Domains</h1>
            <p className="text-muted-foreground">Manage custom domains for your projects.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Domain
            </Button>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search domains..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Domains</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Domains</CardTitle>
                <CardDescription>Manage and configure custom domains for your projects.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDomains.map((domain) => (
                    <Card key={domain.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              {domain.name}
                            </CardTitle>
                            <CardDescription>Project: {domain.projectName}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            {domain.verified ? (
                              <Badge className="bg-green-500">Verified</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/10">
                                Pending
                              </Badge>
                            )}
                            {domain.primary && <Badge variant="outline">Primary</Badge>}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-muted-foreground">Status:</div>
                            <div className="font-medium">{domain.status}</div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-muted-foreground">Added on:</div>
                            <div>{formatDate(domain.created_at)}</div>
                          </div>

                          <div className="bg-muted p-3 rounded-md">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-medium">DNS Configuration</div>
                              {domain.dns.verified ? (
                                <div className="flex items-center text-xs text-green-500">
                                  <Check className="h-3 w-3 mr-1" />
                                  Verified
                                </div>
                              ) : (
                                <div className="flex items-center text-xs text-amber-500">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Not Verified
                                </div>
                              )}
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-muted-foreground">Type</div>
                                <div className="col-span-2 font-mono">{domain.dns.type}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-muted-foreground">Name</div>
                                <div className="col-span-2 font-mono">{domain.dns.name}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-muted-foreground">Value</div>
                                <div className="col-span-2 font-mono flex items-center gap-2">
                                  {domain.dns.value}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5"
                                    onClick={() => handleCopyDNS(domain.dns.value)}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-muted/50 flex justify-between">
                        {!domain.verified ? (
                          <Button size="sm" onClick={() => handleVerifyDomain(domain.id)}>
                            <RefreshCcw className="h-4 w-4 mr-2" />
                            Verify DNS
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Domains</CardTitle>
                <CardDescription>Domains that are verified and active.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDomains
                    .filter((domain) => domain.verified)
                    .map((domain) => (
                      <Card key={domain.id} className="overflow-hidden">
                        {/* Same card content as above for active domains */}
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                {domain.name}
                              </CardTitle>
                              <CardDescription>Project: {domain.projectName}</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500">Verified</Badge>
                              {domain.primary && <Badge variant="outline">Primary</Badge>}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                              <div className="text-muted-foreground">Status:</div>
                              <div className="font-medium">{domain.status}</div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="text-muted-foreground">Added on:</div>
                              <div>{formatDate(domain.created_at)}</div>
                            </div>

                            <div className="bg-muted p-3 rounded-md">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">DNS Configuration</div>
                                <div className="flex items-center text-xs text-green-500">
                                  <Check className="h-3 w-3 mr-1" />
                                  Verified
                                </div>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="text-muted-foreground">Type</div>
                                  <div className="col-span-2 font-mono">{domain.dns.type}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="text-muted-foreground">Name</div>
                                  <div className="col-span-2 font-mono">{domain.dns.name}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="text-muted-foreground">Value</div>
                                  <div className="col-span-2 font-mono flex items-center gap-2">
                                    {domain.dns.value}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-5 w-5"
                                      onClick={() => handleCopyDNS(domain.dns.value)}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t bg-muted/50 flex justify-between">
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Domains</CardTitle>
                <CardDescription>Domains that are waiting for DNS verification.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDomains
                    .filter((domain) => !domain.verified)
                    .map((domain) => (
                      <Card key={domain.id} className="overflow-hidden">
                        {/* Same card content as above for pending domains */}
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                {domain.name}
                              </CardTitle>
                              <CardDescription>Project: {domain.projectName}</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/10">
                                Pending
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                              <div className="text-muted-foreground">Status:</div>
                              <div className="font-medium">{domain.status}</div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="text-muted-foreground">Added on:</div>
                              <div>{formatDate(domain.created_at)}</div>
                            </div>

                            <div className="bg-muted p-3 rounded-md">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">DNS Configuration</div>
                                <div className="flex items-center text-xs text-amber-500">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Not Verified
                                </div>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="text-muted-foreground">Type</div>
                                  <div className="col-span-2 font-mono">{domain.dns.type}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="text-muted-foreground">Name</div>
                                  <div className="col-span-2 font-mono">{domain.dns.name}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="text-muted-foreground">Value</div>
                                  <div className="col-span-2 font-mono flex items-center gap-2">
                                    {domain.dns.value}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-5 w-5"
                                      onClick={() => handleCopyDNS(domain.dns.value)}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t bg-muted/50 flex justify-between">
                          <Button size="sm" onClick={() => handleVerifyDomain(domain.id)}>
                            <RefreshCcw className="h-4 w-4 mr-2" />
                            Verify DNS
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

