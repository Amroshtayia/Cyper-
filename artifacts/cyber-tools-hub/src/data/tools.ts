export type ToolCategory = 
  | "Reconnaissance"
  | "Network Analysis"  
  | "Web Security"
  | "Wireless"
  | "Passwords"
  | "OSINT"
  | "Forensics"
  | "Exploitation"
  | "System Utilities"
  | "Learning";

export type OSType = "Termux" | "Linux" | "Arch" | "Debian/Ubuntu";

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  tags: string[];
  github: string | null;
  commands: Record<OSType, string>;
  usage: string;
  featured?: boolean;
}

export const toolsData: Tool[] = [
  {
    id: "nmap",
    name: "Nmap",
    category: "Network Analysis",
    description: "Network exploration and security auditing tool. Maps hosts, open ports, and running services.",
    tags: ["scanning", "ports", "discovery"],
    github: "https://github.com/nmap/nmap",
    commands: {
      "Termux": "pkg update && pkg install nmap",
      "Linux": "sudo apt install nmap",
      "Arch": "sudo pacman -S nmap",
      "Debian/Ubuntu": "sudo apt update && sudo apt install nmap"
    },
    usage: "nmap -sV -p 1-1000 <target>",
    featured: true
  },
  {
    id: "wireshark",
    name: "Wireshark",
    category: "Network Analysis",
    description: "World's most popular network protocol analyzer. Captures and interactively browses traffic.",
    tags: ["packets", "capture", "analysis"],
    github: "https://github.com/wireshark/wireshark",
    commands: {
      "Termux": "pkg install tshark",
      "Linux": "sudo apt install wireshark",
      "Arch": "sudo pacman -S wireshark-qt",
      "Debian/Ubuntu": "sudo apt update && sudo apt install wireshark"
    },
    usage: "tshark -i eth0 -w capture.pcap",
    featured: true
  },
  {
    id: "burpsuite",
    name: "Burp Suite",
    category: "Web Security",
    description: "Integrated platform for web application security testing. Intercepts HTTP/S traffic.",
    tags: ["proxy", "http", "testing"],
    github: "https://github.com/PortSwigger/burp-extensions-montoya-api",
    commands: {
      "Termux": "N/A",
      "Linux": "Download from https://portswigger.net/burp/releases",
      "Arch": "yay -S burpsuite",
      "Debian/Ubuntu": "Download from https://portswigger.net/burp/releases"
    },
    usage: "java -jar burpsuite_community.jar",
    featured: true
  },
  {
    id: "metasploit",
    name: "Metasploit",
    category: "Exploitation",
    description: "The world's most used penetration testing framework. For authorized testing only.",
    tags: ["framework", "pentest", "modules"],
    github: "https://github.com/rapid7/metasploit-framework",
    commands: {
      "Termux": "pkg install unstable-repo && pkg install metasploit",
      "Linux": "curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && chmod 755 msfinstall && ./msfinstall",
      "Arch": "yay -S metasploit",
      "Debian/Ubuntu": "curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && chmod 755 msfinstall && ./msfinstall"
    },
    usage: "msfconsole",
    featured: true
  },
  {
    id: "hydra",
    name: "Hydra",
    category: "Passwords",
    description: "Fast and flexible online password auditing tool for authorized lab testing.",
    tags: ["bruteforce", "login", "auth"],
    github: "https://github.com/vanhauser-thc/thc-hydra",
    commands: {
      "Termux": "pkg install hydra",
      "Linux": "sudo apt install hydra",
      "Arch": "sudo pacman -S hydra",
      "Debian/Ubuntu": "sudo apt update && sudo apt install hydra"
    },
    usage: "hydra -l admin -P wordlist.txt ssh://<target>",
    featured: true
  },
  {
    id: "nikto",
    name: "Nikto",
    category: "Web Security",
    description: "Open-source web server scanner that performs comprehensive tests against servers.",
    tags: ["scanner", "vulnerabilities", "server"],
    github: "https://github.com/sullo/nikto",
    commands: {
      "Termux": "pkg install perl && git clone https://github.com/sullo/nikto && cd nikto/program && perl nikto.pl -Help",
      "Linux": "sudo apt install nikto",
      "Arch": "sudo pacman -S nikto",
      "Debian/Ubuntu": "sudo apt update && sudo apt install nikto"
    },
    usage: "nikto -h http://<target>"
  },
  {
    id: "gobuster",
    name: "Gobuster",
    category: "Web Security",
    description: "Directory/file, DNS and VHost busting tool written in Go for authorized security assessments.",
    tags: ["directory", "enumeration", "fuzzing"],
    github: "https://github.com/OJ/gobuster",
    commands: {
      "Termux": "pkg install golang && go install github.com/OJ/gobuster/v3@latest",
      "Linux": "sudo apt install gobuster",
      "Arch": "sudo pacman -S gobuster",
      "Debian/Ubuntu": "sudo apt update && sudo apt install gobuster"
    },
    usage: "gobuster dir -u http://<target> -w /usr/share/wordlists/dirb/common.txt"
  },
  {
    id: "aircrack-ng",
    name: "Aircrack-ng",
    category: "Wireless",
    description: "802.11 WEP and WPA/WPA2-PSK key cracking program for authorized wireless security auditing.",
    tags: ["wifi", "wpa", "cracking"],
    github: "https://github.com/aircrack-ng/aircrack-ng",
    commands: {
      "Termux": "pkg install aircrack-ng",
      "Linux": "sudo apt install aircrack-ng",
      "Arch": "sudo pacman -S aircrack-ng",
      "Debian/Ubuntu": "sudo apt update && sudo apt install aircrack-ng"
    },
    usage: "aircrack-ng -w wordlist.txt capture.cap"
  },
  {
    id: "john",
    name: "John the Ripper",
    category: "Passwords",
    description: "Open-source password security auditing tool. Detects weak passwords in authorized assessments.",
    tags: ["hash", "crack", "wordlist"],
    github: "https://github.com/openwall/john",
    commands: {
      "Termux": "pkg install john",
      "Linux": "sudo apt install john",
      "Arch": "sudo pacman -S john",
      "Debian/Ubuntu": "sudo apt update && sudo apt install john"
    },
    usage: "john --wordlist=wordlist.txt hashes.txt"
  },
  {
    id: "sqlmap",
    name: "SQLMap",
    category: "Web Security",
    description: "Automatic SQL injection and database takeover tool for authorized web application testing.",
    tags: ["sql", "injection", "database"],
    github: "https://github.com/sqlmapproject/sqlmap",
    commands: {
      "Termux": "pkg install python && pip install sqlmap",
      "Linux": "sudo apt install sqlmap",
      "Arch": "sudo pacman -S sqlmap",
      "Debian/Ubuntu": "sudo apt update && sudo apt install sqlmap"
    },
    usage: "sqlmap -u \"http://<target>/page?id=1\" --dbs"
  },
  {
    id: "netcat",
    name: "Netcat",
    category: "Network Analysis",
    description: "The \"Swiss-army knife\" of networking. Read and write data across network connections.",
    tags: ["listener", "transfer", "tcp"],
    github: "https://github.com/diegocr/netcat",
    commands: {
      "Termux": "pkg install netcat-openbsd",
      "Linux": "sudo apt install netcat",
      "Arch": "sudo pacman -S openbsd-netcat",
      "Debian/Ubuntu": "sudo apt install netcat-openbsd"
    },
    usage: "nc -lvnp 4444"
  },
  {
    id: "hashcat",
    name: "Hashcat",
    category: "Passwords",
    description: "Advanced CPU-based password recovery utility supporting hundreds of hash-types.",
    tags: ["gpu", "hash", "recovery"],
    github: "https://github.com/hashcat/hashcat",
    commands: {
      "Termux": "pkg install hashcat",
      "Linux": "sudo apt install hashcat",
      "Arch": "sudo pacman -S hashcat",
      "Debian/Ubuntu": "sudo apt update && sudo apt install hashcat"
    },
    usage: "hashcat -m 0 -a 0 hashes.txt wordlist.txt"
  },
  {
    id: "maltego",
    name: "Maltego",
    category: "OSINT",
    description: "Interactive data mining tool for link analysis and open-source intelligence (OSINT).",
    tags: ["links", "intelligence", "graph"],
    github: null,
    commands: {
      "Termux": "N/A",
      "Linux": "Download from https://www.maltego.com/downloads/",
      "Arch": "yay -S maltego",
      "Debian/Ubuntu": "Download from https://www.maltego.com/downloads/"
    },
    usage: "Launch GUI and use built-in transforms"
  },
  {
    id: "theharvester",
    name: "TheHarvester",
    category: "Reconnaissance",
    description: "Gathers emails, names, subdomains, IPs and URLs using multiple public data sources.",
    tags: ["emails", "subdomains", "osint"],
    github: "https://github.com/laramies/theHarvester",
    commands: {
      "Termux": "pkg install python && pip install theHarvester",
      "Linux": "sudo apt install theharvester",
      "Arch": "yay -S theharvester",
      "Debian/Ubuntu": "sudo apt update && sudo apt install theharvester"
    },
    usage: "theHarvester -d example.com -b google"
  },
  {
    id: "volatility",
    name: "Volatility",
    category: "Forensics",
    description: "Advanced memory forensics framework for incident response and malware analysis.",
    tags: ["memory", "malware", "analysis"],
    github: "https://github.com/volatilityfoundation/volatility3",
    commands: {
      "Termux": "pip install volatility3",
      "Linux": "pip install volatility3",
      "Arch": "pip install volatility3",
      "Debian/Ubuntu": "pip install volatility3"
    },
    usage: "vol -f memory.dump windows.pslist"
  },
  {
    id: "amass",
    name: "Amass",
    category: "Reconnaissance",
    description: "In-depth subdomain enumeration and network mapping for attack surface discovery.",
    tags: ["subdomains", "dns", "enumeration", "recon"],
    github: "https://github.com/owasp-amass/amass",
    commands: { "Termux": "pkg install amass", "Linux": "go install github.com/owasp-amass/amass/v3/...@master", "Arch": "yay -S amass", "Debian/Ubuntu": "sudo apt install amass" },
    usage: "amass enum -d example.com"
  },
  {
    id: "recon-ng",
    name: "Recon-ng",
    category: "Reconnaissance",
    description: "Full-featured web reconnaissance framework with independent modules.",
    tags: ["framework", "recon", "modules", "web"],
    github: "https://github.com/lanmaster53/recon-ng",
    commands: { "Termux": "pip install recon-ng", "Linux": "pip install recon-ng", "Arch": "yay -S recon-ng", "Debian/Ubuntu": "pip install recon-ng" },
    usage: "recon-ng"
  },
  {
    id: "subfinder",
    name: "Subfinder",
    category: "Reconnaissance",
    description: "Fast passive subdomain discovery tool using passive sources.",
    tags: ["subdomains", "passive", "dns", "recon"],
    github: "https://github.com/projectdiscovery/subfinder",
    commands: { "Termux": "go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest", "Linux": "go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest", "Arch": "yay -S subfinder", "Debian/Ubuntu": "go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest" },
    usage: "subfinder -d example.com"
  },
  {
    id: "dirsearch",
    name: "Dirsearch",
    category: "Web Security",
    description: "Advanced web path scanner. Find hidden files and directories.",
    tags: ["directory", "fuzzing", "web", "scanner"],
    github: "https://github.com/maurosoria/dirsearch",
    commands: { "Termux": "pip install dirsearch", "Linux": "pip install dirsearch", "Arch": "yay -S dirsearch", "Debian/Ubuntu": "pip install dirsearch" },
    usage: "dirsearch -u http://<target>"
  },
  {
    id: "ffuf",
    name: "FFUF",
    category: "Web Security",
    description: "Fast web fuzzer written in Go for content discovery and parameter fuzzing.",
    tags: ["fuzzing", "discovery", "web", "fast"],
    github: "https://github.com/ffuf/ffuf",
    commands: { "Termux": "go install github.com/ffuf/ffuf/v2@latest", "Linux": "sudo apt install ffuf", "Arch": "sudo pacman -S ffuf", "Debian/Ubuntu": "sudo apt install ffuf" },
    usage: "ffuf -w wordlist.txt -u http://<target>/FUZZ"
  },
  {
    id: "wpscan",
    name: "WPScan",
    category: "Web Security",
    description: "WordPress vulnerability scanner — detects plugins, themes, and user enumeration.",
    tags: ["wordpress", "cms", "scanner", "web"],
    github: "https://github.com/wpscanteam/wpscan",
    commands: { "Termux": "gem install wpscan", "Linux": "gem install wpscan", "Arch": "yay -S wpscan", "Debian/Ubuntu": "sudo apt install wpscan" },
    usage: "wpscan --url http://<target>"
  },
  {
    id: "nuclei",
    name: "Nuclei",
    category: "Web Security",
    description: "Fast, template-based vulnerability scanner for massive target scanning.",
    tags: ["templates", "scanner", "fast", "web"],
    github: "https://github.com/projectdiscovery/nuclei",
    commands: { "Termux": "go install github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest", "Linux": "go install github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest", "Arch": "yay -S nuclei", "Debian/Ubuntu": "sudo apt install nuclei" },
    usage: "nuclei -u https://<target> -t nuclei-templates/"
  },
  {
    id: "tcpdump",
    name: "Tcpdump",
    category: "Network Analysis",
    description: "Powerful command-line packet analyzer for real-time traffic inspection.",
    tags: ["packets", "capture", "network", "cli"],
    github: "https://github.com/the-tcpdump-group/tcpdump",
    commands: { "Termux": "pkg install tcpdump", "Linux": "sudo apt install tcpdump", "Arch": "sudo pacman -S tcpdump", "Debian/Ubuntu": "sudo apt install tcpdump" },
    usage: "tcpdump -i eth0 -w output.pcap"
  },
  {
    id: "masscan",
    name: "Masscan",
    category: "Network Analysis",
    description: "World's fastest port scanner — scans the entire internet in under 6 minutes.",
    tags: ["scanning", "fast", "ports", "network"],
    github: "https://github.com/robertdavidgraham/masscan",
    commands: { "Termux": "pkg install masscan", "Linux": "sudo apt install masscan", "Arch": "sudo pacman -S masscan", "Debian/Ubuntu": "sudo apt install masscan" },
    usage: "masscan -p 1-65535 <target> --rate=1000"
  },
  {
    id: "zmap",
    name: "Zmap",
    category: "Network Analysis",
    description: "Open-source network scanner for large-scale network surveys.",
    tags: ["scanning", "survey", "network", "research"],
    github: "https://github.com/zmap/zmap",
    commands: { "Termux": "N/A", "Linux": "sudo apt install zmap", "Arch": "sudo pacman -S zmap", "Debian/Ubuntu": "sudo apt install zmap" },
    usage: "zmap -p 80 <target>"
  },
  {
    id: "shodan-cli",
    name: "Shodan CLI",
    category: "OSINT",
    description: "Command-line interface for the Shodan search engine — find internet-connected devices.",
    tags: ["shodan", "iot", "search", "internet"],
    github: "https://github.com/achillean/shodan-python",
    commands: { "Termux": "pip install shodan", "Linux": "pip install shodan", "Arch": "pip install shodan", "Debian/Ubuntu": "pip install shodan" },
    usage: "shodan search 'port:22'"
  },
  {
    id: "spiderfoot",
    name: "SpiderFoot",
    category: "OSINT",
    description: "Automated OSINT tool for threat intelligence and recon across 200+ data sources.",
    tags: ["osint", "intelligence", "automated", "recon"],
    github: "https://github.com/smicallef/spiderfoot",
    commands: { "Termux": "pip install spiderfoot", "Linux": "pip install spiderfoot", "Arch": "yay -S spiderfoot", "Debian/Ubuntu": "pip install spiderfoot" },
    usage: "python3 sf.py -l 127.0.0.1:5001"
  },
  {
    id: "metagoofil",
    name: "Metagoofil",
    category: "OSINT",
    description: "Metadata extractor for public documents — PDFs, DOCX, XLS, and more.",
    tags: ["metadata", "documents", "osint", "extraction"],
    github: "https://github.com/laramies/metagoofil",
    commands: { "Termux": "pip install metagoofil", "Linux": "pip install metagoofil", "Arch": "yay -S metagoofil", "Debian/Ubuntu": "pip install metagoofil" },
    usage: "python3 metagoofil.py -d example.com -t pdf -l 20"
  },
  {
    id: "reaver",
    name: "Reaver",
    category: "Wireless",
    description: "Brute-force attack against WPS (Wi-Fi Protected Setup) for authorized auditing.",
    tags: ["wps", "wifi", "bruteforce", "wireless"],
    github: "https://github.com/t6x/reaver-wps-fork-t6x",
    commands: { "Termux": "pkg install root-repo && pkg install reaver", "Linux": "sudo apt install reaver", "Arch": "sudo pacman -S reaver", "Debian/Ubuntu": "sudo apt install reaver" },
    usage: "reaver -i wlan0mon -b <BSSID> -vv"
  },
  {
    id: "kismet",
    name: "Kismet",
    category: "Wireless",
    description: "Wireless network detector, sniffer, and IDS for 802.11 networks.",
    tags: ["wifi", "sniffer", "ids", "detection"],
    github: "https://github.com/kismetwireless/kismet",
    commands: { "Termux": "N/A", "Linux": "sudo apt install kismet", "Arch": "sudo pacman -S kismet", "Debian/Ubuntu": "sudo apt install kismet" },
    usage: "kismet -c wlan0"
  },
  {
    id: "crunch",
    name: "Crunch",
    category: "Passwords",
    description: "Wordlist generator that creates wordlists based on specified criteria.",
    tags: ["wordlist", "generator", "dictionary", "passwords"],
    github: null,
    commands: { "Termux": "pkg install crunch", "Linux": "sudo apt install crunch", "Arch": "sudo pacman -S crunch", "Debian/Ubuntu": "sudo apt install crunch" },
    usage: "crunch 6 8 abcdefghijklmnopqrstuvwxyz0123456789 -o wordlist.txt"
  },
  {
    id: "medusa",
    name: "Medusa",
    category: "Passwords",
    description: "Speedy, massively parallel, modular login brute-forcer for authorized testing.",
    tags: ["bruteforce", "login", "parallel", "auth"],
    github: "https://github.com/jmk-foofus/medusa",
    commands: { "Termux": "pkg install medusa", "Linux": "sudo apt install medusa", "Arch": "sudo pacman -S medusa", "Debian/Ubuntu": "sudo apt install medusa" },
    usage: "medusa -h <target> -u admin -P wordlist.txt -M ssh"
  },
  {
    id: "binwalk",
    name: "Binwalk",
    category: "Forensics",
    description: "Firmware analysis and extraction tool — reverse engineer binary files.",
    tags: ["firmware", "extraction", "reverse", "binary"],
    github: "https://github.com/ReFirmLabs/binwalk",
    commands: { "Termux": "pip install binwalk", "Linux": "sudo apt install binwalk", "Arch": "sudo pacman -S binwalk", "Debian/Ubuntu": "sudo apt install binwalk" },
    usage: "binwalk -e firmware.bin"
  },
  {
    id: "autopsy",
    name: "Autopsy",
    category: "Forensics",
    description: "Digital forensics platform and GUI to The Sleuth Kit — disk image analysis.",
    tags: ["disk", "image", "forensics", "gui"],
    github: "https://github.com/sleuthkit/autopsy",
    commands: { "Termux": "N/A", "Linux": "sudo apt install autopsy", "Arch": "yay -S autopsy", "Debian/Ubuntu": "sudo apt install autopsy" },
    usage: "autopsy"
  },
  {
    id: "strings",
    name: "Strings",
    category: "Forensics",
    description: "Extract printable strings from binary files for static malware analysis.",
    tags: ["strings", "binary", "static", "malware"],
    github: null,
    commands: { "Termux": "pkg install binutils", "Linux": "sudo apt install binutils", "Arch": "sudo pacman -S binutils", "Debian/Ubuntu": "sudo apt install binutils" },
    usage: "strings malware.exe | grep -i password"
  },
  {
    id: "gdb",
    name: "GDB",
    category: "Exploitation",
    description: "GNU Debugger — debug programs, inspect memory, analyze crashes.",
    tags: ["debugger", "binary", "memory", "analysis"],
    github: "https://github.com/bminor/binutils-gdb",
    commands: { "Termux": "pkg install gdb", "Linux": "sudo apt install gdb", "Arch": "sudo pacman -S gdb", "Debian/Ubuntu": "sudo apt install gdb" },
    usage: "gdb ./program"
  },
  {
    id: "pwndbg",
    name: "Pwndbg",
    category: "Exploitation",
    description: "GDB plugin that makes debugging and exploit development easier.",
    tags: ["gdb", "plugin", "exploit", "pwn"],
    github: "https://github.com/pwndbg/pwndbg",
    commands: { "Termux": "git clone https://github.com/pwndbg/pwndbg && cd pwndbg && ./setup.sh", "Linux": "git clone https://github.com/pwndbg/pwndbg && cd pwndbg && ./setup.sh", "Arch": "yay -S pwndbg", "Debian/Ubuntu": "git clone https://github.com/pwndbg/pwndbg && cd pwndbg && ./setup.sh" },
    usage: "gdb -ex 'source pwndbg/gdbinit.py' ./program"
  },
  {
    id: "radare2",
    name: "Radare2",
    category: "Exploitation",
    description: "Open-source reverse engineering framework for binary analysis.",
    tags: ["reverse", "binary", "disassembly", "analysis"],
    github: "https://github.com/radareorg/radare2",
    commands: { "Termux": "pkg install radare2", "Linux": "sudo apt install radare2", "Arch": "sudo pacman -S radare2", "Debian/Ubuntu": "sudo apt install radare2" },
    usage: "r2 ./binary"
  },
  {
    id: "iptables",
    name: "IPTables",
    category: "System Utilities",
    description: "Linux kernel firewall — filter packets, NAT, and network traffic control.",
    tags: ["firewall", "network", "linux", "security"],
    github: null,
    commands: { "Termux": "N/A", "Linux": "sudo apt install iptables", "Arch": "sudo pacman -S iptables", "Debian/Ubuntu": "sudo apt install iptables" },
    usage: "iptables -L -n -v"
  },
  {
    id: "fail2ban",
    name: "Fail2Ban",
    category: "System Utilities",
    description: "Intrusion prevention software that bans IPs after repeated failed login attempts.",
    tags: ["ids", "ban", "ssh", "protection"],
    github: "https://github.com/fail2ban/fail2ban",
    commands: { "Termux": "N/A", "Linux": "sudo apt install fail2ban", "Arch": "sudo pacman -S fail2ban", "Debian/Ubuntu": "sudo apt install fail2ban" },
    usage: "sudo fail2ban-client status"
  },
  {
    id: "lynis",
    name: "Lynis",
    category: "System Utilities",
    description: "Security auditing tool for Linux systems — check config and vulnerabilities.",
    tags: ["audit", "linux", "hardening", "config"],
    github: "https://github.com/CISOfy/lynis",
    commands: { "Termux": "N/A", "Linux": "sudo apt install lynis", "Arch": "sudo pacman -S lynis", "Debian/Ubuntu": "sudo apt install lynis" },
    usage: "sudo lynis audit system"
  },
  {
    id: "openvas",
    name: "OpenVAS",
    category: "System Utilities",
    description: "Open Vulnerability Assessment Scanner — comprehensive vulnerability scanning.",
    tags: ["vulnerability", "scanner", "assessment", "network"],
    github: "https://github.com/greenbone/openvas-scanner",
    commands: { "Termux": "N/A", "Linux": "sudo apt install openvas", "Arch": "yay -S openvas", "Debian/Ubuntu": "sudo apt install openvas" },
    usage: "gvm-start"
  },
  {
    id: "wigle",
    name: "WiGLE WiFi",
    category: "OSINT",
    description: "Maps and queries a crowdsourced database of wireless networks worldwide.",
    tags: ["wifi", "mapping", "osint", "location"],
    github: null,
    commands: { "Termux": "N/A (use web: wigle.net)", "Linux": "N/A (use web: wigle.net)", "Arch": "N/A (use web: wigle.net)", "Debian/Ubuntu": "N/A (use web: wigle.net)" },
    usage: "Use the web interface at wigle.net"
  },
  {
    id: "cewl",
    name: "CeWL",
    category: "Passwords",
    description: "Custom wordlist generator that spiders websites for relevant keywords.",
    tags: ["wordlist", "spider", "web", "custom"],
    github: "https://github.com/digininja/CeWL",
    commands: { "Termux": "gem install cewl", "Linux": "sudo apt install cewl", "Arch": "yay -S cewl", "Debian/Ubuntu": "sudo apt install cewl" },
    usage: "cewl http://<target> -d 2 -m 5 -w wordlist.txt"
  },
  {
    id: "seclists",
    name: "SecLists",
    category: "Learning",
    description: "Collection of security testing wordlists, payloads, and fuzzing data.",
    tags: ["wordlists", "payloads", "fuzzing", "collection"],
    github: "https://github.com/danielmiessler/SecLists",
    commands: { "Termux": "git clone https://github.com/danielmiessler/SecLists", "Linux": "sudo apt install seclists", "Arch": "yay -S seclists", "Debian/Ubuntu": "sudo apt install seclists" },
    usage: "ls /usr/share/seclists/"
  },
  {
    id: "pwncat",
    name: "Pwncat",
    category: "Exploitation",
    description: "Post-exploitation tool that provides advanced reverse shell management.",
    tags: ["shell", "reverse", "post-exploitation", "listener"],
    github: "https://github.com/calebstewart/pwncat",
    commands: { "Termux": "pip install pwncat-cs", "Linux": "pip install pwncat-cs", "Arch": "pip install pwncat-cs", "Debian/Ubuntu": "pip install pwncat-cs" },
    usage: "pwncat-cs -lp 4444"
  },
  {
    id: "tshark",
    name: "TShark",
    category: "Network Analysis",
    description: "Terminal-based Wireshark — live capture and offline analysis of network traffic.",
    tags: ["packets", "capture", "cli", "analysis"],
    github: "https://github.com/wireshark/wireshark",
    commands: { "Termux": "pkg install tshark", "Linux": "sudo apt install tshark", "Arch": "sudo pacman -S wireshark-cli", "Debian/Ubuntu": "sudo apt install tshark" },
    usage: "tshark -i eth0 -f 'port 80'"
  },
  {
    id: "sqlninja",
    name: "Sqlninja",
    category: "Web Security",
    description: "SQL Server injection and takeover tool for authorized penetration testing.",
    tags: ["sql", "mssql", "injection", "server"],
    github: "https://github.com/xxgrunge/sqlninja",
    commands: { "Termux": "N/A", "Linux": "sudo apt install sqlninja", "Arch": "yay -S sqlninja", "Debian/Ubuntu": "sudo apt install sqlninja" },
    usage: "sqlninja -m t -f sqlninja.conf"
  },
  {
    id: "netdiscover",
    name: "Netdiscover",
    category: "Reconnaissance",
    description: "Active/passive ARP scanner for network host discovery on local networks.",
    tags: ["arp", "discovery", "hosts", "local"],
    github: null,
    commands: { "Termux": "pkg install netdiscover", "Linux": "sudo apt install netdiscover", "Arch": "sudo pacman -S netdiscover", "Debian/Ubuntu": "sudo apt install netdiscover" },
    usage: "netdiscover -r 192.168.1.0/24"
  },
  {
    id: "responder",
    name: "Responder",
    category: "Network Analysis",
    description: "LLMNR, NBT-NS, and MDNS poisoner for network credential capture in authorized tests.",
    tags: ["llmnr", "poisoning", "credentials", "network"],
    github: "https://github.com/lgandx/Responder",
    commands: { "Termux": "git clone https://github.com/lgandx/Responder", "Linux": "git clone https://github.com/lgandx/Responder", "Arch": "yay -S responder", "Debian/Ubuntu": "sudo apt install responder" },
    usage: "python3 Responder.py -I eth0 -wrd"
  }
];
