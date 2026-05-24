import { ToolCategory } from "./tools";

export interface Category {
  id: string;
  name: ToolCategory;
  icon: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const categoriesData: Category[] = [
  {
    id: "reconnaissance",
    name: "Reconnaissance",
    icon: "Search",
    description: "Discover targets, subdomains, and network assets",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20"
  },
  {
    id: "network-analysis",
    name: "Network Analysis",
    icon: "Network",
    description: "Analyze, capture, and inspect network traffic",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/20"
  },
  {
    id: "web-security",
    name: "Web Security",
    icon: "Globe",
    description: "Test web applications for vulnerabilities",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20"
  },
  {
    id: "wireless",
    name: "Wireless",
    icon: "Wifi",
    description: "Audit wireless networks in authorized environments",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/20"
  },
  {
    id: "passwords",
    name: "Passwords",
    icon: "Lock",
    description: "Hash cracking and password auditing tools",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/20"
  },
  {
    id: "osint",
    name: "OSINT",
    icon: "Eye",
    description: "Open source intelligence gathering tools",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/20"
  },
  {
    id: "forensics",
    name: "Forensics",
    icon: "Microscope",
    description: "Digital forensics and memory analysis",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/20"
  },
  {
    id: "exploitation",
    name: "Exploitation",
    icon: "Bug",
    description: "Ethical exploitation frameworks for CTF and labs",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/20"
  },
  {
    id: "system-utilities",
    name: "System Utilities",
    icon: "Settings",
    description: "System hardening and security configuration",
    color: "text-slate-400",
    bgColor: "bg-slate-400/10",
    borderColor: "border-slate-400/20"
  },
  {
    id: "learning",
    name: "Learning",
    icon: "BookOpen",
    description: "Resources and wordlists for security education",
    color: "text-teal-400",
    bgColor: "bg-teal-400/10",
    borderColor: "border-teal-400/20"
  }
];
