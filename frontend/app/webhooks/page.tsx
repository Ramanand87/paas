"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Copy, Globe, Plus, RefreshCcw, Trash2, Webhook } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for webhooks
const mockWebhooks = [
  {
    id: "wh-1",
    name: "Deployment Notifications",
    url: "https://example.com/webhooks/deployments",
    events: ["deployment.success", "deployment.failure"],
    active: true,
    createdAt: "2023-04-10T13:45:00Z",
    lastTriggered: "2023-04-15T14:30:00Z",
    secret: "whsec_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: "wh-2",
    name: "Build Events",
    url: "https://example.com/webhooks/builds",
    events: ["build.started", "build.success", "build.failure"],
    active: true,
    createdAt: "2023-04-05T10:30:00Z",
    lastTriggered: "2023-04-14T09:15:00Z",
    secret: "whsec_123456789abcdefghijklmnop",
  },
  {
    id: "wh-3",
    name: "Domain Changes",
    url: "https://example.com/webhooks/domains",
    events: ["domain.added", "domain.verified", "domain.removed"],
    active: false,
    createdAt: "2023-03-20T16:45:00Z",
    lastTriggered: null,
    secret: "whsec_qrstuvwxyz123456789abcdef",
  },
]

export default function WebhooksPage() {
  const { toast } = useToast()
  const [webhooks, setWebhooks] = useState(mockWebhooks)
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    url: "",
    events: [] as string[],
    active: true,
  })

  const handleCopySecret = (secret: string) => {
    navigator.clipboard.writeText(secret)
    toast({
      title: "Secret copied",
      description: "Webhook secret has been copied to your clipboard.",
    })
  }

  const handleToggleWebhook = (id: string, active: boolean) => {
    setWebhooks(webhooks.map((webhook) => (webhook.id === id ? { ...webhook, active } : webhook)))

    toast({
      title: active ? "Webhook Enabled" : "Webhook Disabled",
      description: `The webhook has been ${active ? "enabled" : "disabled"}.`,
    })
  }

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter((webhook) => webhook.id !== id))

    toast({
      title: "Webhook Deleted",
      description: "The webhook has been deleted.",
    })
  }

  const handleCreateWebhook = () => {
    if (!newWebhook.name || !newWebhook.url || newWebhook.events.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newId = `wh-${webhooks.length + 1}`
    const secret = `whsec_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`

    const webhook = {
      id: newId,
      name: newWebhook.name,
      url: newWebhook.url,
      events: newWebhook.events,
      active: newWebhook.active,
      createdAt: new Date().toISOString(),
      lastTriggered: null,
      secret,
    }

    setWebhooks([...webhooks, webhook])
    setNewWebhook({ name: "", url: "", events: [], active: true })

    toast({
      title: "Webhook Created",
      description: "Your new webhook has been created successfully.",
    })
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleString()
  }

  const availableEvents = [
    { id: "deployment.success", name: "Deployment Success" },
    { id: "deployment.failure", name: "Deployment Failure" },
    { id: "build.started", name: "Build Started" },
    { id: "build.success", name: "Build Success" },
    { id: "build.failure", name: "Build Failure" },
    { id: "domain.added", name: "Domain Added" },
    { id: "domain.verified", name: "Domain Verified" },
    { id: "domain.removed", name: "Domain Removed" },
  ]

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Webhooks</h1>
            <p className="text-muted-foreground">Manage webhooks to integrate with external services.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Webhook
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Webhooks</CardTitle>
            <CardDescription>Webhooks that are currently receiving event notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {webhooks
                .filter((webhook) => webhook.active)
                .map((webhook) => (
                  <Card key={webhook.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Webhook className="h-4 w-4 text-muted-foreground" />
                            {webhook.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {webhook.url}
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium mb-2">Events</div>
                          <div className="flex flex-wrap gap-2">
                            {webhook.events.map((event) => (
                              <Badge key={event} variant="outline">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Created</div>
                            <div>{formatDate(webhook.createdAt)}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Last Triggered</div>
                            <div>{formatDate(webhook.lastTriggered)}</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-2">Webhook Secret</div>
                          <div className="flex items-center gap-2">
                            <div className="font-mono text-sm bg-muted p-2 rounded-md flex-1 overflow-hidden text-ellipsis">
                              {webhook.secret.substring(0, 10)}•••••••••••••••
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleCopySecret(webhook.secret)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 flex justify-between">
                      <Button variant="ghost" size="sm" onClick={() => handleToggleWebhook(webhook.id, false)}>
                        Disable
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteWebhook(webhook.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

              {webhooks.filter((webhook) => webhook.active).length === 0 && (
                <div className="py-8 text-center">
                  <Webhook className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No active webhooks.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inactive Webhooks</CardTitle>
            <CardDescription>Webhooks that are currently disabled.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {webhooks
                .filter((webhook) => !webhook.active)
                .map((webhook) => (
                  <Card key={webhook.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Webhook className="h-4 w-4 text-muted-foreground" />
                            {webhook.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {webhook.url}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">Inactive</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium mb-2">Events</div>
                          <div className="flex flex-wrap gap-2">
                            {webhook.events.map((event) => (
                              <Badge key={event} variant="outline">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Created</div>
                            <div>{formatDate(webhook.createdAt)}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Last Triggered</div>
                            <div>{formatDate(webhook.lastTriggered)}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 flex justify-between">
                      <Button variant="ghost" size="sm" onClick={() => handleToggleWebhook(webhook.id, true)}>
                        Enable
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteWebhook(webhook.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

              {webhooks.filter((webhook) => !webhook.active).length === 0 && (
                <div className="py-8 text-center">
                  <Webhook className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No inactive webhooks.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create New Webhook</CardTitle>
            <CardDescription>Set up a new webhook to receive event notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="webhook-name">Webhook Name</Label>
                <Input
                  id="webhook-name"
                  placeholder="e.g., Deployment Notifications"
                  value={newWebhook.name}
                  onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Payload URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://example.com/webhooks"
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">The URL where webhook payloads will be sent.</p>
              </div>

              <div className="space-y-2">
                <Label>Events</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {availableEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`event-${event.id}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={newWebhook.events.includes(event.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewWebhook({
                              ...newWebhook,
                              events: [...newWebhook.events, event.id],
                            })
                          } else {
                            setNewWebhook({
                              ...newWebhook,
                              events: newWebhook.events.filter((e) => e !== event.id),
                            })
                          }
                        }}
                      />
                      <Label htmlFor={`event-${event.id}`} className="text-sm">
                        {event.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="webhook-active"
                  checked={newWebhook.active}
                  onCheckedChange={(checked) => setNewWebhook({ ...newWebhook, active: checked })}
                />
                <Label htmlFor="webhook-active">Active</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleCreateWebhook}>
              <Plus className="h-4 w-4 mr-2" />
              Create Webhook
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

