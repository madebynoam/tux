export interface Options {
  browserEntry?: string
  serverEntry?: string
  entry?: string
  output?: string
  target?: string
  quiet?: boolean
  https?: boolean
  port?: number
  host?: string
  tux?: {
    admin?: boolean
  }
  env?: {
    [key: string]: string
  }
}

export interface Args {
  options: Options
  ssr: boolean
  middleware: any[]
}