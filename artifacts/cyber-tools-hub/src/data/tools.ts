export type ToolCategory = "Network" | "Web" | "Forensics" | "Recon" | "Passwords";
export type OSType = "Termux" | "Linux" | "Arch" | "Debian/Ubuntu";

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  github: string | null;
  commands: Record<OSType, string>;
  usage: string;
}

export const toolsData: Tool[] = [
  {
    id: "nmap",
    name: "Nmap",
    category: "Network",
    description: "Network exploration and security auditing tool. Maps hosts, open ports, and running services.",
    github: "https://github.com/nmap/nmap",
    commands: {
      "Termux": "pkg update && pkg install nmap",
      "Linux": "sudo apt install nmap",
      "Arch": "sudo pacman -S nmap",
      "Debian/Ubuntu": "sudo apt update && sudo apt install nmap"
    },
    usage: "nmap -sV -p 1-1000 <target>"
  },
  {
    id: "wireshark",
    name: "Wireshark",
    category: "Network",
    description: "World's most popular network protocol analyzer. Captures and interactively browses traffic.",
    github: "https://github.com/wireshark/wireshark",
    commands: {
      "Termux": "pkg install tshark",
      "Linux": "sudo apt install wireshark",
      "Arch": "sudo pacman -S wireshark-qt",
      "Debian/Ubuntu": "sudo apt update && sudo apt install wireshark"
    },
    usage: "tshark -i eth0 -w capture.pcap"
  },
  {
    id: "burpsuite",
    name: "Burp Suite",
    category: "Web",
    description: "Integrated platform for web application security testing. Intercepts HTTP/S traffic.",
    github: "https://github.com/PortSwigger/burp-extensions-montoya-api",
    commands: {
      "Termux": "N/A",
      "Linux": "Download from https://portswigger.net/burp/releases",
      "Arch": "yay -S burpsuite",
      "Debian/Ubuntu": "Download from https://portswigger.net/burp/releases"
    },
    usage: "java -jar burpsuite_community.jar"
  },
  {
    id: "metasploit",
    name: "Metasploit Framework",
    category: "Network",
    description: "The world's most used penetration testing framework. For authorized testing only.",
    github: "https://github.com/rapid7/metasploit-framework",
    commands: {
      "Termux": "pkg install unstable-repo && pkg install metasploit",
      "Linux": "curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && chmod 755 msfinstall && ./msfinstall",
      "Arch": "yay -S metasploit",
      "Debian/Ubuntu": "curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && chmod 755 msfinstall && ./msfinstall"
    },
    usage: "msfconsole"
  },
  {
    id: "hydra",
    name: "Hydra",
    category: "Passwords",
    description: "Fast and flexible online password auditing tool for authorized lab testing.",
    github: "https://github.com/vanhauser-thc/thc-hydra",
    commands: {
      "Termux": "pkg install hydra",
      "Linux": "sudo apt install hydra",
      "Arch": "sudo pacman -S hydra",
      "Debian/Ubuntu": "sudo apt update && sudo apt install hydra"
    },
    usage: "hydra -l admin -P wordlist.txt ssh://<target>"
  },
  {
    id: "nikto",
    name: "Nikto",
    category: "Web",
    description: "Open-source web server scanner that performs comprehensive tests against servers.",
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
    category: "Web",
    description: "Directory/file, DNS and VHost busting tool written in Go for authorized security assessments.",
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
    category: "Network",
    description: "802.11 WEP and WPA/WPA2-PSK key cracking program for authorized wireless security auditing.",
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
    category: "Web",
    description: "Automatic SQL injection and database takeover tool for authorized web application testing.",
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
    category: "Network",
    description: "The \"Swiss-army knife\" of networking. Read and write data across network connections.",
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
    category: "Recon",
    description: "Interactive data mining tool for link analysis and open-source intelligence (OSINT).",
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
    category: "Recon",
    description: "Gathers emails, names, subdomains, IPs and URLs using multiple public data sources.",
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
    github: "https://github.com/volatilityfoundation/volatility3",
    commands: {
      "Termux": "pip install volatility3",
      "Linux": "pip install volatility3",
      "Arch": "pip install volatility3",
      "Debian/Ubuntu": "pip install volatility3"
    },
    usage: "vol -f memory.dump windows.pslist"
  }
];