import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Network, Terminal, Shield, Lock, Search,
  ChevronDown, ChevronRight, ChevronLeft, Lightbulb, ExternalLink,
} from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";

interface Section {
  heading: string;
  headingAr: string;
  body: string;
  bodyAr?: string;
  code?: string;
}

interface Topic {
  id: string;
  icon: React.ReactNode;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  color: string;
  sections: Section[];
}

const TOPICS: Topic[] = [
  {
    id: "fundamentals",
    icon: <Shield className="w-5 h-5" />,
    titleEn: "Cybersecurity Fundamentals",
    titleAr: "أساسيات الأمن السيبراني",
    subtitleEn: "Core concepts every security professional must know",
    subtitleAr: "المفاهيم الأساسية التي يجب أن يعرفها كل متخصص في الأمن",
    color: "text-cyan-400",
    sections: [
      {
        heading: "The CIA Triad",
        headingAr: "ثالوث CIA",
        body: "Every security decision is built around three principles:\n\n• Confidentiality — Ensuring data is only accessible to authorized parties. Enforced through encryption, access controls, and authentication.\n\n• Integrity — Guaranteeing data hasn't been altered without authorization. Enforced through hashing, digital signatures, and checksums.\n\n• Availability — Ensuring systems and data are accessible when needed. Protected through redundancy, backups, and DDoS mitigation.",
        bodyAr: "كل قرار أمني مبني على ثلاثة مبادئ:\n\n• السرية — ضمان أن البيانات متاحة فقط للأطراف المصرح لها، من خلال التشفير وضوابط الوصول والمصادقة.\n\n• النزاهة — ضمان عدم تغيير البيانات دون تصريح، من خلال التجزئة والتوقيعات الرقمية.\n\n• التوافر — ضمان إمكانية الوصول إلى الأنظمة والبيانات عند الحاجة، عن طريق التكرار والنسخ الاحتياطي.",
      },
      {
        heading: "Attack Surface",
        headingAr: "سطح الهجوم",
        body: "The attack surface is the sum of all possible entry points an attacker could exploit. It includes:\n\n• Network services and open ports\n• Web application endpoints\n• Physical access points\n• Human factors (social engineering)\n• Third-party software dependencies\n\nMinimizing your attack surface is one of the most effective security strategies.",
        bodyAr: "سطح الهجوم هو مجموع جميع نقاط الدخول المحتملة التي يمكن للمهاجم استغلالها:\n\n• خدمات الشبكة والمنافذ المفتوحة\n• نقاط نهاية تطبيقات الويب\n• نقاط الوصول الفيزيائية\n• العوامل البشرية (الهندسة الاجتماعية)\n• تبعيات برامج الطرف الثالث",
      },
      {
        heading: "Threat Modeling",
        headingAr: "نمذجة التهديدات",
        body: "Threat modeling identifies, communicates, and addresses security threats. The STRIDE model covers:\n\n• Spoofing — Impersonating another user or system\n• Tampering — Unauthorized modification of data\n• Repudiation — Denying actions were taken\n• Information Disclosure — Exposing data to unauthorized users\n• Denial of Service — Making a service unavailable\n• Elevation of Privilege — Gaining unauthorized permissions",
      },
      {
        heading: "Defense in Depth",
        headingAr: "الدفاع بالعمق",
        body: "Defense in depth layers multiple security controls so that if one fails, others still protect the system. Layers include:\n\n• Perimeter defense (firewalls, IDS/IPS)\n• Network segmentation\n• Endpoint protection\n• Application security\n• Data encryption\n• User education and awareness",
      },
    ],
  },
  {
    id: "networking",
    icon: <Network className="w-5 h-5" />,
    titleEn: "Networking Basics",
    titleAr: "أساسيات الشبكات",
    subtitleEn: "TCP/IP, ports, protocols, and how networks actually work",
    subtitleAr: "بروتوكولات TCP/IP والمنافذ وكيفية عمل الشبكات",
    color: "text-blue-400",
    sections: [
      {
        heading: "The OSI Model",
        headingAr: "نموذج OSI",
        body: "The OSI model describes network communication in 7 layers:\n\n• Layer 7 — Application (HTTP, FTP, DNS)\n• Layer 6 — Presentation (SSL/TLS, encoding)\n• Layer 5 — Session (session management)\n• Layer 4 — Transport (TCP, UDP)\n• Layer 3 — Network (IP, ICMP, routing)\n• Layer 2 — Data Link (Ethernet, MAC addresses)\n• Layer 1 — Physical (cables, signals)",
      },
      {
        heading: "TCP vs UDP",
        headingAr: "TCP مقابل UDP",
        body: "TCP (Transmission Control Protocol): Connection-oriented, reliable delivery, ordered packets. Used by HTTP, SSH, FTP. Has a three-way handshake (SYN → SYN-ACK → ACK).\n\nUDP (User Datagram Protocol): Connectionless, no guarantee of delivery, faster. Used by DNS, DHCP, VoIP, online gaming.",
      },
      {
        heading: "Common Ports",
        headingAr: "المنافذ الشائعة",
        body: "Well-known port numbers to memorize:\n\n• 21 — FTP\n• 22 — SSH\n• 23 — Telnet (insecure)\n• 25 — SMTP\n• 53 — DNS\n• 80 — HTTP\n• 443 — HTTPS\n• 3306 — MySQL\n• 3389 — RDP\n• 8080 — HTTP Alternate",
        code: "nmap -sV -p 21,22,80,443,3306 <target>",
      },
      {
        heading: "Subnetting",
        headingAr: "التقسيم الفرعي للشبكات",
        body: "IP addresses are divided into network and host portions. CIDR notation: 192.168.1.0/24 means the first 24 bits are the network portion.\n\n• /8  → 16,777,214 hosts\n• /16 → 65,534 hosts\n• /24 → 254 hosts\n• /30 → 2 hosts\n\nPrivate ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
      },
    ],
  },
  {
    id: "linux",
    icon: <Terminal className="w-5 h-5" />,
    titleEn: "Linux Basics",
    titleAr: "أساسيات لينكس",
    subtitleEn: "Essential Linux commands for security work",
    subtitleAr: "أوامر لينكس الأساسية للعمل الأمني",
    color: "text-green-400",
    sections: [
      {
        heading: "Filesystem Navigation",
        headingAr: "التنقل في نظام الملفات",
        body: "Key directories in Linux:\n\n• /etc — System configuration files\n• /var/log — Log files (critical for forensics)\n• /home — User home directories\n• /tmp — Temporary files (often writable by all)\n• /usr/bin — User executables\n• /root — Root user's home directory",
        code: "ls -la /etc\ncat /etc/passwd\ntail -f /var/log/auth.log",
      },
      {
        heading: "File Permissions",
        headingAr: "صلاحيات الملفات",
        body: "Linux permissions are represented as rwxrwxrwx (owner / group / others).\n\n• r = 4 (read)\n• w = 2 (write)\n• x = 1 (execute)\n\nchmod 755 file → rwxr-xr-x\nchmod 600 file → rw------- (private key files)\n\nSUID bit (chmod 4755): runs as file owner. A common privilege escalation vector.",
        code: "find / -perm -4000 -type f 2>/dev/null",
      },
      {
        heading: "Process Management",
        headingAr: "إدارة العمليات",
        body: "Essential process commands:\n\n• ps aux — list all running processes\n• top / htop — interactive process viewer\n• kill <PID> — terminate a process\n• netstat -tlnp — list listening ports\n• ss -tlnp — modern netstat replacement\n• lsof -i — list open network connections",
        code: "ps aux | grep suspicious\nnetstat -tlnp | grep LISTEN",
      },
      {
        heading: "Log Analysis",
        headingAr: "تحليل السجلات",
        body: "Critical log files for security analysis:\n\n• /var/log/auth.log — SSH and sudo attempts\n• /var/log/syslog — General system events\n• /var/log/apache2/access.log — Web server access\n• /var/log/fail2ban.log — Blocked IPs\n• ~/.bash_history — Command history",
        code: "grep 'Failed password' /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn | head",
      },
    ],
  },
  {
    id: "osint",
    icon: <Search className="w-5 h-5" />,
    titleEn: "OSINT Techniques",
    titleAr: "تقنيات OSINT",
    subtitleEn: "Open source intelligence gathering for authorized reconnaissance",
    subtitleAr: "جمع المعلومات الاستخباراتية من المصادر المفتوحة",
    color: "text-purple-400",
    sections: [
      {
        heading: "What is OSINT?",
        headingAr: "ما هو OSINT؟",
        body: "Open Source Intelligence (OSINT) is the collection and analysis of information from publicly available sources. In security, it is used to:\n\n• Understand an organization's public attack surface\n• Discover exposed credentials and data\n• Map network infrastructure from public records\n• Build target profiles during authorized engagements",
        bodyAr: "استخبارات المصادر المفتوحة هي جمع وتحليل المعلومات من المصادر المتاحة للعموم. في مجال الأمن، تُستخدم لـ:\n\n• فهم سطح الهجوم العام للمنظمة\n• اكتشاف بيانات الاعتماد والبيانات المكشوفة\n• رسم خريطة البنية التحتية للشبكة من السجلات العامة",
      },
      {
        heading: "Passive Reconnaissance",
        headingAr: "الاستطلاع السلبي",
        body: "Passive recon gathers information without directly touching the target:\n\n• WHOIS lookups — domain registration details\n• DNS records — MX, A, AAAA, TXT, CNAME records\n• Certificate Transparency logs — enumerate subdomains\n• Shodan — find internet-exposed services\n• Google dorks — advanced search operators",
        code: "whois example.com\ndig example.com ANY\ncurl https://crt.sh/?q=example.com&output=json",
      },
      {
        heading: "Google Dorking",
        headingAr: "Google Dorking",
        body: "Google advanced operators for finding exposed information:\n\n• site:example.com — restrict to domain\n• filetype:pdf — find specific file types\n• inurl:admin — find admin panels\n• intitle:\"index of\" — find open directories\n• \"password\" filetype:txt site:example.com — find exposed passwords",
      },
      {
        heading: "Subdomain Enumeration",
        headingAr: "تعداد النطاقات الفرعية",
        body: "Finding subdomains reveals more attack surface:\n\n1. Passive: Certificate transparency, DNS brute-force wordlists\n2. Active: DNS zone transfers (rare), brute-forcing with Amass or Subfinder\n\nTools: TheHarvester, Amass, Subfinder, Recon-ng\n\nAlways obtain written authorization before active enumeration.",
        code: "theHarvester -d example.com -b google\nsubfinder -d example.com -silent",
      },
    ],
  },
  {
    id: "encryption",
    icon: <Lock className="w-5 h-5" />,
    titleEn: "Cryptography & Hashing",
    titleAr: "التشفير والتجزئة",
    subtitleEn: "How encryption, hashing, and digital signatures protect data",
    subtitleAr: "كيف يحمي التشفير والتجزئة والتوقيعات الرقمية البيانات",
    color: "text-amber-400",
    sections: [
      {
        heading: "Symmetric vs Asymmetric Encryption",
        headingAr: "التشفير المتماثل وغير المتماثل",
        body: "Symmetric encryption uses the same key to encrypt and decrypt. Fast, but requires secure key exchange. Examples: AES, 3DES.\n\nAsymmetric encryption uses a public/private key pair. The public key encrypts; only the private key decrypts. Slower but solves the key distribution problem. Examples: RSA, ECDSA, Ed25519.",
      },
      {
        heading: "Hashing",
        headingAr: "التجزئة",
        body: "A hash function maps any input to a fixed-length digest. Properties:\n\n• Deterministic — same input always produces same output\n• One-way — you cannot reverse a hash\n• Avalanche effect — tiny input change drastically changes output\n• Collision-resistant — hard to find two inputs with the same hash\n\nAlgorithms: MD5/SHA-1 (deprecated) → SHA-256/SHA-3 (current) → bcrypt/Argon2 (passwords)",
        code: "echo -n 'password' | sha256sum\nprintf '%s' 'password' | md5sum",
      },
      {
        heading: "Password Storage",
        headingAr: "تخزين كلمات المرور",
        body: "Never store passwords in plaintext. Correct approaches:\n\n1. Hash with a slow algorithm (bcrypt, Argon2, scrypt)\n2. Always add a unique random salt per password to prevent rainbow table attacks\n3. Use a high work factor / iteration count",
      },
      {
        heading: "PKI & Certificates",
        headingAr: "البنية التحتية للمفاتيح العامة",
        body: "Public Key Infrastructure (PKI) establishes trust in public keys via Certificate Authorities (CAs).\n\nAn X.509 certificate contains subject domain, public key, issuer info, validity dates, and CA digital signature.\n\nWhen you see HTTPS, your browser validates the server's certificate against its trusted CA store.",
      },
    ],
  },
  {
    id: "tools",
    icon: <Lightbulb className="w-5 h-5" />,
    titleEn: "Tool Explainers",
    titleAr: "شرح الأدوات",
    subtitleEn: "How the most important security tools actually work",
    subtitleAr: "كيف تعمل أهم أدوات الأمن السيبراني",
    color: "text-rose-400",
    sections: [
      {
        heading: "How Nmap Works",
        headingAr: "كيف يعمل Nmap",
        body: "Nmap sends specially crafted packets and analyzes responses to map network topology:\n\n• SYN scan (-sS): Sends TCP SYN, waits for SYN-ACK (open) or RST (closed). Fastest and stealthiest.\n• Version detection (-sV): Probes open ports to identify service/version.\n• OS detection (-O): Analyzes TCP/IP stack fingerprint.\n• Script engine (-sC): Runs NSE scripts for additional info.",
        code: "nmap -sS -sV -O -T4 <target>",
      },
      {
        heading: "How Wireshark Works",
        headingAr: "كيف يعمل Wireshark",
        body: "Network analyzers put the network interface into promiscuous mode, capturing all packets passing through.\n\nKey concepts:\n• BPF filters: Efficiently filter packets at the kernel level\n• Dissectors: Decode protocol-specific packet structures\n• Follow TCP Stream: Reassemble an entire conversation\n• tshark: Command-line version for scripts and remote sessions",
        code: "tshark -i eth0 -f 'port 80' -w capture.pcap\ntshark -r capture.pcap -Y 'http.request' -T fields -e http.host",
      },
      {
        heading: "How Metasploit Works",
        headingAr: "كيف يعمل Metasploit",
        body: "Metasploit is a framework that organizes:\n\n• Exploits: Code that targets specific vulnerabilities\n• Payloads: Code executed on the target after exploitation\n• Auxiliary modules: Scanners, fuzzers, tools\n• Post modules: Actions after compromise\n\nAlways used in authorized lab environments with explicit written permission.",
        code: "msfconsole\nuse exploit/multi/handler\nset PAYLOAD linux/x64/meterpreter/reverse_tcp\nrun",
      },
      {
        heading: "How Burp Suite Works",
        headingAr: "كيف يعمل Burp Suite",
        body: "Burp Suite acts as an intercepting HTTP proxy between your browser and the target web application:\n\n1. Configure browser to use 127.0.0.1:8080 as HTTP proxy\n2. Burp captures all HTTP/S traffic\n3. Proxy tab lets you modify requests in-flight\n4. Scanner identifies vulnerabilities (SQLi, XSS, SSRF)\n5. Intruder automates parameter fuzzing\n6. Repeater lets you manually craft and replay requests",
      },
    ],
  },
];

function TopicSection({ section, language }: { section: Section; language: string }) {
  const [open, setOpen] = useState(false);
  const isAr = language === "ar";
  const heading = isAr ? section.headingAr : section.heading;
  const body = isAr && section.bodyAr ? section.bodyAr : section.body;

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-5 py-4 text-left hover:bg-card/60 transition-colors duration-150 ${isAr ? "flex-row-reverse text-right" : ""}`}
      >
        <span className="font-semibold text-sm">{heading}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`px-5 pb-5 border-t border-border/50 ${isAr ? "text-right" : ""}`}>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line mt-4">
                {body}
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
  const { language, isRTL } = useLanguage();
  const topic = TOPICS.find((t) => t.id === activeTopic) ?? TOPICS[0];
  const currentIdx = TOPICS.findIndex((t) => t.id === activeTopic);

  const NavIcon = isRTL ? ChevronLeft : ChevronRight;
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col dark">
      <Navbar />

      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        <div className="relative container mx-auto px-4 max-w-6xl py-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <BackButton fallbackHref="/" className="mb-4" />
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              {language === "ar" ? "موارد تعليمية" : "Educational Resources"}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              {language === "ar" ? (
                <><span className="text-primary glow-text">مركز</span> التعلم</>
              ) : (
                <>Learning <span className="text-primary glow-text">Center</span></>
              )}
            </h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              {language === "ar"
                ? "أساسيات الأمن السيبراني ومفاهيم الشبكات وأساسيات لينكس وشروح الأدوات للمتخصصين الأمنيين."
                : "Cybersecurity fundamentals, networking concepts, Linux basics, and tool explainers for ethical security professionals."}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 max-w-6xl py-10">
        <div className={`flex flex-col lg:flex-row gap-8 ${isRTL ? "lg:flex-row-reverse" : ""}`}>

          {/* Sidebar Topic Picker */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-1">
              <p className={`text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-2 ${isRTL ? "text-right" : ""}`}>
                {language === "ar" ? "المواضيع" : "Topics"}
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
                  } ${isRTL ? "flex-row-reverse text-right" : ""}`}
                >
                  <span className={activeTopic === t.id ? t.color : "text-muted-foreground/60"}>
                    {t.icon}
                  </span>
                  <span className="leading-tight flex-1">
                    {language === "ar" ? t.titleAr : t.titleEn}
                  </span>
                  {activeTopic === t.id && (
                    <NavIcon className={`w-3.5 h-3.5 text-primary/60 flex-shrink-0 ${isRTL ? "mr-auto" : "ml-auto"}`} />
                  )}
                </button>
              ))}

              <div className={`mt-6 px-3 ${isRTL ? "text-right" : ""}`}>
                <Link href="/tools">
                  <div className={`flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}>
                    <ExternalLink className="w-3.5 h-3.5" />
                    {language === "ar" ? "تصفح مكتبة الأدوات" : "Browse the Tools Library"}
                  </div>
                </Link>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <motion.div
            key={activeTopic}
            initial={{ opacity: 0, x: isRTL ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-w-0"
          >
            {/* Topic Header */}
            <div className="glass-card rounded-2xl p-6 mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className={`flex-shrink-0 p-3 rounded-xl bg-card border border-border ${topic.color}`}>
                  {topic.icon}
                </div>
                <div className={isRTL ? "text-right" : ""}>
                  <h2 className="text-xl font-extrabold mb-1">
                    {language === "ar" ? topic.titleAr : topic.titleEn}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? topic.subtitleAr : topic.subtitleEn}
                  </p>
                  <p className="text-xs text-muted-foreground/50 mt-2">
                    {topic.sections.length} {language === "ar" ? "أقسام" : "sections"}
                  </p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-3">
              {topic.sections.map((section) => (
                <TopicSection key={section.heading} section={section} language={language} />
              ))}
            </div>

            {/* Prev / Next Navigation */}
            <div className={`mt-8 flex items-center justify-between pt-6 border-t border-border ${isRTL ? "flex-row-reverse" : ""}`}>
              {/* Back / Prev topic */}
              <div className="flex items-center gap-3">
                {currentIdx > 0 ? (
                  <button
                    onClick={() => setActiveTopic(TOPICS[currentIdx - 1].id)}
                    data-testid="button-prev-topic"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground text-sm font-medium hover:text-foreground hover:border-primary/30 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <PrevIcon className="w-4 h-4" />
                    {language === "ar" ? "السابق" : "Previous"}
                  </button>
                ) : (
                  <span />
                )}
              </div>

              <span className="text-sm text-muted-foreground">
                {currentIdx + 1} / {TOPICS.length}
              </span>

              {/* Next topic */}
              {currentIdx < TOPICS.length - 1 ? (
                <button
                  onClick={() => setActiveTopic(TOPICS[currentIdx + 1].id)}
                  data-testid="button-next-topic"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/25 text-primary text-sm font-medium hover:bg-primary/20 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {language === "ar" ? "التالي" : "Next Topic"}
                  <NavIcon className="w-4 h-4" />
                </button>
              ) : (
                <span />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="border-t border-border bg-card mt-auto">
        <div className={`container mx-auto px-4 max-w-6xl py-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-muted-foreground ${isRTL ? "md:flex-row-reverse" : ""}`}>
          <span>
            <span className="text-foreground font-medium">Cyber Tools Hub</span>{" "}
            {language === "ar"
              ? "— منصة أدوات وتعليم الأمن السيبراني."
              : "— Educational cybersecurity tools & learning platform."}
          </span>
          <span className="text-xs opacity-50">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
