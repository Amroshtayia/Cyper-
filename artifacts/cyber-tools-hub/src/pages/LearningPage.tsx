import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Network, Terminal, Shield, Lock, Search,
  ChevronDown, ChevronRight, Lightbulb, ExternalLink,
} from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";

interface Topic {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  sections: { heading: string; body: string; code?: string }[];
}

const TOPICS: Topic[] = [
  {
    id: "fundamentals",
    icon: <Shield className="w-5 h-5" />,
    title: "Cybersecurity Fundamentals",
    subtitle: "Core concepts every security professional must know",
    color: "text-cyan-400",
    sections: [
      {
        heading: "The CIA Triad",
        body: "Every security decision is built around three principles:\n\n• Confidentiality — Ensuring data is only accessible to authorized parties. Enforced through encryption, access controls, and authentication.\n\n• Integrity — Guaranteeing data hasn't been altered without authorization. Enforced through hashing, digital signatures, and checksums.\n\n• Availability — Ensuring systems and data are accessible when needed. Protected through redundancy, backups, and DDoS mitigation.",
      },
      {
        heading: "Attack Surface",
        body: "The attack surface is the sum of all possible entry points an attacker could exploit. It includes:\n\n• Network services and open ports\n• Web application endpoints\n• Physical access points\n• Human factors (social engineering)\n• Third-party software dependencies\n\nMinimizing your attack surface is one of the most effective security strategies.",
      },
      {
        heading: "Threat Modeling",
        body: "Threat modeling identifies, communicates, and addresses security threats. The STRIDE model covers:\n\n• Spoofing — Impersonating another user or system\n• Tampering — Unauthorized modification of data\n• Repudiation — Denying actions were taken\n• Information Disclosure — Exposing data to unauthorized users\n• Denial of Service — Making a service unavailable\n• Elevation of Privilege — Gaining unauthorized permissions",
      },
      {
        heading: "Defense in Depth",
        body: "Defense in depth layers multiple security controls so that if one fails, others still protect the system. Layers include:\n\n• Perimeter defense (firewalls, IDS/IPS)\n• Network segmentation\n• Endpoint protection\n• Application security\n• Data encryption\n• User education and awareness",
      },
    ],
  },
  {
    id: "networking",
    icon: <Network className="w-5 h-5" />,
    title: "Networking Basics",
    subtitle: "TCP/IP, ports, protocols, and how networks actually work",
    color: "text-blue-400",
    sections: [
      {
        heading: "The OSI Model",
        body: "The OSI model describes network communication in 7 layers:\n\n• Layer 7 — Application (HTTP, FTP, DNS)\n• Layer 6 — Presentation (SSL/TLS, encoding)\n• Layer 5 — Session (session management)\n• Layer 4 — Transport (TCP, UDP)\n• Layer 3 — Network (IP, ICMP, routing)\n• Layer 2 — Data Link (Ethernet, MAC addresses)\n• Layer 1 — Physical (cables, signals)\n\nUnderstanding the OSI model helps you reason about where attacks and defenses operate.",
      },
      {
        heading: "TCP vs UDP",
        body: "TCP (Transmission Control Protocol): Connection-oriented, reliable delivery, ordered packets. Used by HTTP, SSH, FTP. Has a three-way handshake (SYN → SYN-ACK → ACK).\n\nUDP (User Datagram Protocol): Connectionless, no guarantee of delivery, faster. Used by DNS, DHCP, VoIP, online gaming.\n\nSecurity implication: TCP's handshake is exploitable (SYN flood attacks). UDP is used for DNS amplification attacks.",
      },
      {
        heading: "Common Ports",
        body: "Well-known port numbers to memorize:\n\n• 21 — FTP\n• 22 — SSH\n• 23 — Telnet (insecure)\n• 25 — SMTP\n• 53 — DNS\n• 80 — HTTP\n• 443 — HTTPS\n• 3306 — MySQL\n• 3389 — RDP\n• 8080 — HTTP Alternate",
        code: "nmap -sV -p 21,22,80,443,3306 <target>",
      },
      {
        heading: "Subnetting",
        body: "IP addresses are divided into network and host portions. CIDR notation: 192.168.1.0/24 means the first 24 bits are the network portion.\n\n• /8  → 16,777,214 hosts (Class A)\n• /16 → 65,534 hosts (Class B)\n• /24 → 254 hosts (Class C)\n• /30 → 2 hosts (point-to-point links)\n\nPrivate ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
      },
    ],
  },
  {
    id: "linux",
    icon: <Terminal className="w-5 h-5" />,
    title: "Linux Basics",
    subtitle: "Essential Linux commands for security work",
    color: "text-green-400",
    sections: [
      {
        heading: "Filesystem Navigation",
        body: "Key directories in Linux:\n\n• /etc — System configuration files\n• /var/log — Log files (critical for forensics)\n• /home — User home directories\n• /tmp — Temporary files (often writable by all)\n• /usr/bin — User executables\n• /root — Root user's home directory",
        code: "ls -la /etc\ncat /etc/passwd\ntail -f /var/log/auth.log",
      },
      {
        heading: "File Permissions",
        body: "Linux permissions are represented as rwxrwxrwx (owner / group / others).\n\n• r = 4 (read)\n• w = 2 (write)\n• x = 1 (execute)\n\nchmod 755 file → rwxr-xr-x\nchmod 600 file → rw------- (private key files)\n\nSUID bit (chmod 4755): runs as file owner. A common privilege escalation vector.",
        code: "find / -perm -4000 -type f 2>/dev/null",
      },
      {
        heading: "Process Management",
        body: "Essential process commands:\n\n• ps aux — list all running processes\n• top / htop — interactive process viewer\n• kill <PID> — terminate a process\n• netstat -tlnp — list listening ports\n• ss -tlnp — modern netstat replacement\n• lsof -i — list open network connections",
        code: "ps aux | grep suspicious\nnetstat -tlnp | grep LISTEN",
      },
      {
        heading: "Log Analysis",
        body: "Critical log files for security analysis:\n\n• /var/log/auth.log — SSH and sudo attempts\n• /var/log/syslog — General system events\n• /var/log/apache2/access.log — Web server access\n• /var/log/fail2ban.log — Blocked IPs\n• ~/.bash_history — Command history (can be cleared)\n\nUse grep, awk, and cut to parse logs efficiently.",
        code: "grep 'Failed password' /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn | head",
      },
    ],
  },
  {
    id: "osint",
    icon: <Search className="w-5 h-5" />,
    title: "OSINT Techniques",
    subtitle: "Open source intelligence gathering for authorized reconnaissance",
    color: "text-purple-400",
    sections: [
      {
        heading: "What is OSINT?",
        body: "Open Source Intelligence (OSINT) is the collection and analysis of information from publicly available sources. In security, it is used to:\n\n• Understand an organization's public attack surface\n• Discover exposed credentials and data\n• Map network infrastructure from public records\n• Build target profiles during authorized engagements\n\nOSINT is legal and ethical when used on your own assets or with explicit permission.",
      },
      {
        heading: "Passive Reconnaissance",
        body: "Passive recon gathers information without directly touching the target:\n\n• WHOIS lookups — domain registration details\n• DNS records — MX, A, AAAA, TXT, CNAME records\n• Certificate Transparency logs — enumerate subdomains\n• Shodan — find internet-exposed services\n• Google dorks — advanced search operators\n• LinkedIn/social media — employee enumeration",
        code: "whois example.com\ndig example.com ANY\ncurl https://crt.sh/?q=example.com&output=json",
      },
      {
        heading: "Google Dorking",
        body: "Google advanced operators for finding exposed information:\n\n• site:example.com — restrict to domain\n• filetype:pdf — find specific file types\n• inurl:admin — find admin panels\n• intitle:\"index of\" — find open directories\n• \"password\" filetype:txt site:example.com — find exposed passwords\n\nAll searches are passive and publicly accessible — no special tools needed.",
      },
      {
        heading: "Subdomain Enumeration",
        body: "Finding subdomains reveals more attack surface:\n\n1. Passive: Certificate transparency, DNS brute-force wordlists, Shodan\n2. Active: DNS zone transfers (rare), brute-forcing with tools like Amass or Subfinder\n\nTools: TheHarvester, Amass, Subfinder, Recon-ng\n\nAlways obtain written authorization before active enumeration against third-party domains.",
        code: "theHarvester -d example.com -b google\nsubfinder -d example.com -silent",
      },
    ],
  },
  {
    id: "encryption",
    icon: <Lock className="w-5 h-5" />,
    title: "Cryptography & Hashing",
    subtitle: "How encryption, hashing, and digital signatures protect data",
    color: "text-amber-400",
    sections: [
      {
        heading: "Symmetric vs Asymmetric Encryption",
        body: "Symmetric encryption uses the same key to encrypt and decrypt. Fast, but requires secure key exchange. Examples: AES, 3DES.\n\nAsymmetric encryption uses a public/private key pair. The public key encrypts; only the private key decrypts. Slower but solves the key distribution problem. Examples: RSA, ECDSA, Ed25519.\n\nIn practice, TLS combines both: asymmetric encryption to exchange a symmetric session key, then fast symmetric encryption for the bulk data transfer.",
      },
      {
        heading: "Hashing",
        body: "A hash function maps any input to a fixed-length digest. Properties:\n\n• Deterministic — same input always produces same output\n• One-way — you cannot reverse a hash\n• Avalanche effect — tiny input change drastically changes output\n• Collision-resistant — hard to find two inputs with the same hash\n\nCommon algorithms:\n• MD5 / SHA-1 — deprecated, collision vulnerabilities\n• SHA-256 / SHA-3 — current standard\n• bcrypt / Argon2 — designed for password storage (slow by design)",
        code: "echo -n 'password' | sha256sum\nprintf '%s' 'password' | md5sum",
      },
      {
        heading: "Password Storage",
        body: "Never store passwords in plaintext. Correct approaches:\n\n1. Hash with a slow algorithm (bcrypt, Argon2, scrypt)\n2. Always add a unique random salt per password to prevent rainbow table attacks\n3. Use a high work factor / iteration count\n\nTools like Hashcat and John the Ripper exploit weak password hashing in authorized assessments to demonstrate risk to organizations.",
      },
      {
        heading: "PKI & Certificates",
        body: "Public Key Infrastructure (PKI) establishes trust in public keys via Certificate Authorities (CAs).\n\nAn X.509 certificate contains:\n• Subject domain name\n• Subject's public key\n• Issuer (CA) information\n• Validity dates\n• CA's digital signature\n\nWhen you see HTTPS, your browser validates the server's certificate against its trusted CA store. HSTS (HTTP Strict Transport Security) prevents downgrade attacks.",
      },
    ],
  },
  {
    id: "tools",
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Tool Explainers",
    subtitle: "How the most important security tools actually work",
    color: "text-rose-400",
    sections: [
      {
        heading: "How Nmap Works",
        body: "Nmap sends specially crafted packets and analyzes responses to map network topology:\n\n• SYN scan (-sS): Sends TCP SYN, waits for SYN-ACK (open) or RST (closed). Fastest and stealthiest — doesn't complete the handshake.\n• Version detection (-sV): Probes open ports to identify service/version.\n• OS detection (-O): Analyzes TCP/IP stack fingerprint.\n• Script engine (-sC): Runs NSE scripts for additional info.\n\nNmap is used legitimately for network inventory, security auditing, and finding open ports during authorized penetration tests.",
        code: "nmap -sS -sV -O -T4 <target>",
      },
      {
        heading: "How Wireshark / Tcpdump Works",
        body: "Network analyzers put the network interface into promiscuous mode, capturing all packets passing through — not just those addressed to your machine.\n\nKey concepts:\n• BPF filters: Efficiently filter packets at the kernel level\n• Dissectors: Decode protocol-specific packet structures\n• Follow TCP Stream: Reassemble an entire conversation\n• Statistics: Protocol hierarchy, endpoints, conversations\n\nUse tshark for command-line capture and analysis in scripts or remote sessions.",
        code: "tshark -i eth0 -f 'port 80' -w capture.pcap\ntshark -r capture.pcap -Y 'http.request' -T fields -e http.host -e http.request.uri",
      },
      {
        heading: "How Metasploit Works",
        body: "Metasploit is a framework, not a single tool. It organizes:\n\n• Exploits: Code that targets specific vulnerabilities\n• Payloads: Code executed on the target after exploitation (e.g., Meterpreter shell)\n• Auxiliary modules: Scanners, fuzzers, tools that don't require exploitation\n• Post modules: Actions taken after compromise (privilege escalation, persistence)\n\nThe workflow: choose exploit → set target options → choose payload → run. Always used in authorized lab environments or with explicit written permission.",
        code: "msfconsole\nuse exploit/multi/handler\nset PAYLOAD linux/x64/meterpreter/reverse_tcp\nset LHOST 0.0.0.0\nrun",
      },
      {
        heading: "How Burp Suite Works",
        body: "Burp Suite acts as an intercepting HTTP proxy between your browser and the target web application:\n\n1. Configure your browser to use 127.0.0.1:8080 as its HTTP proxy\n2. Burp captures all HTTP/S traffic\n3. The Proxy tab lets you modify requests in-flight\n4. The Scanner identifies common vulnerabilities (SQLi, XSS, SSRF)\n5. The Intruder automates parameter fuzzing and brute-force attacks\n6. The Repeater lets you manually craft and replay requests\n\nEssential for web application penetration testing.",
      },
    ],
  },
];

function TopicSection({ section }: { section: Topic["sections"][number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-card/60 transition-colors duration-150"
        data-testid={`button-section-${section.heading.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <span className="font-semibold text-sm">{section.heading}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-5 border-t border-border/50">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line mt-4">
                {section.body}
              </p>
              {section.code && (
                <div className="mt-4 bg-[#060a10] border border-primary/15 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-[10px] text-muted-foreground/50 font-mono">terminal</span>
                  </div>
                  <pre className="px-4 py-3 font-mono text-xs text-green-300/90 overflow-x-auto leading-relaxed">
                    {section.code}
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LearningPage() {
  const [activeTopic, setActiveTopic] = useState(TOPICS[0].id);
  const topic = TOPICS.find((t) => t.id === activeTopic) ?? TOPICS[0];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col dark">
      <Navbar />

      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        <div className="relative container mx-auto px-4 max-w-6xl py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Educational Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Learning <span className="text-primary glow-text">Center</span>
            </h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Cybersecurity fundamentals, networking concepts, Linux basics, and tool explainers
              for ethical security professionals.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 max-w-6xl py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Topic Picker */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-2">
                Topics
              </p>
              {TOPICS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTopic(t.id)}
                  data-testid={`button-topic-${t.id}`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-150 ${
                    activeTopic === t.id
                      ? "bg-primary/10 border border-primary/25 text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-card border border-transparent"
                  }`}
                >
                  <span className={activeTopic === t.id ? t.color : "text-muted-foreground/60"}>
                    {t.icon}
                  </span>
                  <span className="leading-tight">{t.title}</span>
                  {activeTopic === t.id && <ChevronRight className="w-3.5 h-3.5 ml-auto text-primary/60" />}
                </button>
              ))}

              {/* Link to tools */}
              <div className="mt-6 px-3">
                <Link href="/tools">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Browse the Tools Library
                  </div>
                </Link>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <motion.div
            key={activeTopic}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-w-0"
          >
            {/* Topic Header */}
            <div className="glass-card rounded-2xl p-6 mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 p-3 rounded-xl bg-card border border-border ${topic.color}`}>
                  {topic.icon}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold mb-1">{topic.title}</h2>
                  <p className="text-sm text-muted-foreground">{topic.subtitle}</p>
                  <p className="text-xs text-muted-foreground/50 mt-2">
                    {topic.sections.length} sections
                  </p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-3">
              {topic.sections.map((section) => (
                <TopicSection key={section.heading} section={section} />
              ))}
            </div>

            {/* Navigation Footer */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-border">
              <span className="text-sm text-muted-foreground">
                {TOPICS.findIndex((t) => t.id === activeTopic) + 1} of {TOPICS.length} topics
              </span>
              {TOPICS.findIndex((t) => t.id === activeTopic) < TOPICS.length - 1 && (
                <button
                  onClick={() => {
                    const idx = TOPICS.findIndex((t) => t.id === activeTopic);
                    setActiveTopic(TOPICS[idx + 1].id);
                  }}
                  data-testid="button-next-topic"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/25 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  Next Topic
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 max-w-6xl py-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">
          <span>
            <span className="text-foreground font-medium">Cyber Tools Hub</span> — Educational
            cybersecurity tools &amp; learning platform.
          </span>
          <span className="text-xs opacity-50">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
