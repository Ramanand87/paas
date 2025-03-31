import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cloud, Github, Layers, Plus, Server } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6" />
            <span className="text-xl font-bold">DeployHub</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/deployments" className="text-sm font-medium">
              Deployments
            </Link>
            <Link href="/settings" className="text-sm font-medium">
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/deploy">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Deployment
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Deploy Your Projects with Ease</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  A simple and powerful platform to deploy your static sites and web applications in seconds.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/deploy">
                  <Button>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Github className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">GitHub Integration</h3>
                <p className="text-muted-foreground">
                  Connect your GitHub repositories and deploy your projects with a single click.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Server className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Instant Deployment</h3>
                <p className="text-muted-foreground">
                  Deploy your projects instantly with our powerful infrastructure and global CDN.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Layers className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Scalable Platform</h3>
                <p className="text-muted-foreground">
                  Scale your applications effortlessly with our robust and reliable platform.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Deploy?</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Start deploying your projects in minutes with our simple and intuitive platform.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/deploy">
                  <Button>
                    Deploy Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DeployHub. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

