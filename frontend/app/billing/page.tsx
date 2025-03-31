"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Download, FileText, HelpCircle, RefreshCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for billing
const mockBillingData = {
  plan: "Pro",
  status: "active",
  nextBillingDate: "2023-05-15T00:00:00Z",
  amount: 49,
  currency: "USD",
  paymentMethod: {
    type: "card",
    last4: "4242",
    expMonth: 12,
    expYear: 2024,
    brand: "Visa",
  },
  usage: {
    deployments: {
      used: 75,
      limit: 100,
      percentage: 75,
    },
    bandwidth: {
      used: 120,
      limit: 500,
      percentage: 24,
    },
    buildMinutes: {
      used: 250,
      limit: 500,
      percentage: 50,
    },
  },
  invoices: [
    {
      id: "inv-1234",
      date: "2023-04-15T00:00:00Z",
      amount: 49,
      currency: "USD",
      status: "paid",
    },
    {
      id: "inv-1233",
      date: "2023-03-15T00:00:00Z",
      amount: 49,
      currency: "USD",
      status: "paid",
    },
    {
      id: "inv-1232",
      date: "2023-02-15T00:00:00Z",
      amount: 49,
      currency: "USD",
      status: "paid",
    },
  ],
}

export default function BillingPage() {
  const { toast } = useToast()
  const [billingData, setBillingData] = useState(mockBillingData)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoiceId} has been downloaded.`,
    })
  }

  const handleChangePlan = () => {
    toast({
      title: "Change Plan",
      description: "You'll be redirected to the plan selection page.",
    })
  }

  const handleUpdatePayment = () => {
    toast({
      title: "Update Payment Method",
      description: "You'll be redirected to update your payment information.",
    })
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Billing & Usage</h1>
            <p className="text-muted-foreground">Manage your subscription and monitor your usage.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <CreditCard className="h-4 w-4 mr-2" />
              Update Payment
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your current subscription plan and status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{billingData.plan} Plan</div>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(billingData.amount, billingData.currency)} per month
                  </div>
                </div>
                <Badge className="bg-green-500">Active</Badge>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">Next billing date</div>
                  <div>{formatDate(billingData.nextBillingDate)}</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">Payment method</div>
                  <div className="flex items-center gap-1">
                    {billingData.paymentMethod.brand} •••• {billingData.paymentMethod.last4}
                    <span className="text-xs text-muted-foreground">
                      (Expires {billingData.paymentMethod.expMonth}/{billingData.paymentMethod.expYear})
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-between">
              <Button variant="outline" onClick={handleUpdatePayment}>
                Update Payment
              </Button>
              <Button onClick={handleChangePlan}>Change Plan</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
              <CardDescription>Your current usage and limits.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>Deployments</div>
                    <div className="font-medium">
                      {billingData.usage.deployments.used} / {billingData.usage.deployments.limit}
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${billingData.usage.deployments.percentage > 80 ? "bg-red-500" : "bg-primary"}`}
                      style={{ width: `${billingData.usage.deployments.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>Bandwidth</div>
                    <div className="font-medium">
                      {billingData.usage.bandwidth.used} GB / {billingData.usage.bandwidth.limit} GB
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${billingData.usage.bandwidth.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>Build Minutes</div>
                    <div className="font-medium">
                      {billingData.usage.buildMinutes.used} / {billingData.usage.buildMinutes.limit}
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${billingData.usage.buildMinutes.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button variant="outline" className="w-full">
                <HelpCircle className="h-4 w-4 mr-2" />
                Usage FAQ
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Your billing history and past invoices.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingData.invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Invoice #{invoice.id}</div>
                      <div className="text-sm text-muted-foreground">{formatDate(invoice.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-medium">{formatCurrency(invoice.amount, invoice.currency)}</div>
                    <Badge className="bg-green-500">Paid</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>Compare plans and choose the best option for your needs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$19</span>
                    <span className="text-muted-foreground"> / month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>50 deployments / month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>100 GB bandwidth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>200 build minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>5 team members</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Choose Plan
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pro</CardTitle>
                    <Badge>Current Plan</Badge>
                  </div>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$49</span>
                    <span className="text-muted-foreground"> / month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>100 deployments / month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>500 GB bandwidth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>500 build minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>10 team members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Custom domains</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Current Plan</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$199</span>
                    <span className="text-muted-foreground"> / month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Check
                        className="h
-4 w-4 text-green-500"
                      />
                      <span>Unlimited deployments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>2 TB bandwidth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Unlimited build minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Unlimited team members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Priority support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Custom contract</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

