// `shell` tells the reader where to run a section: WSL management runs from Windows,
// everything else runs inside the Ubuntu (Bash) terminal.
export const LINUX_COMMANDS = [
  /* ===================== WSL SETUP ===================== */
  {
    category: "WSL Setup",
    shell: "PowerShell",
    commands: [
      { cmd: "wsl --install", desc: "Install WSL with Ubuntu (run as admin)" },
      { cmd: "wsl --install -d Ubuntu", desc: "Install a specific distro" },
      { cmd: "wsl --list --online", desc: "List distros available to install" },
      { cmd: "wsl -l -v", desc: "List installed distros and WSL versions" },
      { cmd: "wsl --set-default-version 2", desc: "Use WSL 2 for new distros" },
      { cmd: "wsl --set-version Ubuntu 2", desc: "Convert a distro to WSL 2" },
      { cmd: "wsl --set-default Ubuntu", desc: "Set the default distro" },
      { cmd: "wsl --update", desc: "Update the WSL kernel" },
    ],
  },

  /* ===================== WSL MANAGEMENT ===================== */
  {
    category: "WSL Management",
    shell: "PowerShell",
    commands: [
      { cmd: "wsl", desc: "Open the default distro" },
      { cmd: "wsl -d Ubuntu", desc: "Open a specific distro" },
      { cmd: "wsl --status", desc: "Show WSL status and default distro" },
      { cmd: "wsl --shutdown", desc: "Stop all distros (frees memory)" },
      { cmd: "wsl --terminate Ubuntu", desc: "Stop one distro" },
      {
        cmd: "wsl --export Ubuntu ubuntu-backup.tar",
        desc: "Back up a distro to a file",
      },
      {
        cmd: "wsl --import Ubuntu-2 C:\\WSL\\Ubuntu-2 ubuntu-backup.tar",
        desc: "Restore a backup as a new distro",
      },
      {
        cmd: "wsl --unregister Ubuntu",
        desc: "Delete a distro and ALL its files",
      },
    ],
  },

  /* ===================== WINDOWS INTEROP ===================== */
  {
    category: "WSL ↔ Windows",
    shell: "Bash",
    commands: [
      { cmd: "explorer.exe .", desc: "Open current folder in File Explorer" },
      { cmd: "code .", desc: "Open current folder in VS Code" },
      { cmd: "cd /mnt/c/Users", desc: "Go to the Windows C: drive" },
      { cmd: "wslpath -w ~/project", desc: "Convert Linux path to Windows path" },
      {
        cmd: "wslpath -u 'C:\\Users'",
        desc: "Convert Windows path to Linux path",
      },
      { cmd: "cat file.txt | clip.exe", desc: "Copy output to Windows clipboard" },
      { cmd: "notepad.exe file.txt", desc: "Open a file in a Windows app" },
      { cmd: "sudo nano /etc/wsl.conf", desc: "Edit WSL settings for this distro" },
    ],
  },

  /* ===================== PACKAGES ===================== */
  {
    category: "Packages (apt)",
    shell: "Bash",
    commands: [
      { cmd: "sudo apt update", desc: "Refresh the package list" },
      { cmd: "sudo apt upgrade -y", desc: "Upgrade installed packages" },
      { cmd: "sudo apt install <package>", desc: "Install a package" },
      { cmd: "sudo apt remove <package>", desc: "Uninstall a package" },
      { cmd: "sudo apt autoremove", desc: "Remove unused dependencies" },
      { cmd: "apt search <keyword>", desc: "Search for a package" },
      { cmd: "apt show <package>", desc: "Show package details" },
      { cmd: "apt list --installed", desc: "List installed packages" },
    ],
  },

  /* ===================== NAVIGATION & FILES ===================== */
  {
    category: "Navigation & Files",
    shell: "Bash",
    commands: [
      { cmd: "pwd", desc: "Print current directory" },
      { cmd: "ls -la", desc: "List all files with details" },
      { cmd: "cd ~", desc: "Go to home directory" },
      { cmd: "mkdir -p dir/sub", desc: "Create nested folders" },
      { cmd: "touch file.txt", desc: "Create an empty file" },
      { cmd: "cp -r src/ dest/", desc: "Copy a folder" },
      { cmd: "mv old.txt new.txt", desc: "Move or rename" },
      { cmd: "rm -rf <dir>", desc: "Delete a folder permanently (careful!)" },
    ],
  },

  /* ===================== VIEWING & SEARCHING ===================== */
  {
    category: "Viewing & Searching",
    shell: "Bash",
    commands: [
      { cmd: "cat file.txt", desc: "Print a file" },
      { cmd: "less file.txt", desc: "Scroll through a file (q to quit)" },
      { cmd: "head -n 20 file.txt", desc: "Show the first 20 lines" },
      { cmd: "tail -f app.log", desc: "Follow a log file live" },
      { cmd: 'grep -rn "text" .', desc: "Search text in files recursively" },
      { cmd: 'find . -name "*.js"', desc: "Find files by name" },
      { cmd: "wc -l file.txt", desc: "Count lines" },
      { cmd: "du -sh *", desc: "Size of each item in folder" },
    ],
  },

  /* ===================== PERMISSIONS & USERS ===================== */
  {
    category: "Permissions & Users",
    shell: "Bash",
    commands: [
      { cmd: "sudo <command>", desc: "Run a command as root" },
      { cmd: "chmod +x script.sh", desc: "Make a file executable" },
      { cmd: "chmod 644 file.txt", desc: "Owner read/write, others read" },
      { cmd: "sudo chown -R $USER:$USER <dir>", desc: "Take ownership of a folder" },
      { cmd: "whoami", desc: "Show current user" },
      { cmd: "sudo adduser <name>", desc: "Create a new user" },
      { cmd: "sudo usermod -aG sudo <name>", desc: "Give a user sudo rights" },
      { cmd: "passwd", desc: "Change your password" },
    ],
  },

  /* ===================== PROCESSES & SYSTEM ===================== */
  {
    category: "Processes & System",
    shell: "Bash",
    commands: [
      { cmd: "htop", desc: "Interactive process viewer" },
      { cmd: "ps aux", desc: "List all running processes" },
      { cmd: "kill <pid>", desc: "Stop a process" },
      { cmd: "kill -9 <pid>", desc: "Force-kill a process" },
      { cmd: "df -h", desc: "Disk space usage" },
      { cmd: "free -h", desc: "Memory usage" },
      { cmd: "uname -a", desc: "Kernel and system info" },
      { cmd: "lsb_release -a", desc: "Ubuntu version" },
    ],
  },

  /* ===================== NETWORKING ===================== */
  {
    category: "Networking",
    shell: "Bash",
    commands: [
      { cmd: "ip a", desc: "Show network interfaces and IPs" },
      { cmd: "hostname -I", desc: "Show this machine's IP address" },
      { cmd: "ping -c 4 google.com", desc: "Test connectivity" },
      { cmd: "curl -I https://example.com", desc: "Fetch response headers" },
      { cmd: "wget <url>", desc: "Download a file" },
      { cmd: "ss -tulpn", desc: "List listening ports" },
      { cmd: "sudo lsof -i :3000", desc: "Find what's using a port" },
      { cmd: "ssh user@host", desc: "Connect to a remote server" },
    ],
  },

  /* ===================== ARCHIVES & TRANSFER ===================== */
  {
    category: "Archives & Transfer",
    shell: "Bash",
    commands: [
      { cmd: "tar -czvf archive.tar.gz <dir>", desc: "Create a .tar.gz archive" },
      { cmd: "tar -xzvf archive.tar.gz", desc: "Extract a .tar.gz archive" },
      { cmd: "zip -r archive.zip <dir>", desc: "Create a .zip archive" },
      { cmd: "unzip archive.zip", desc: "Extract a .zip archive" },
      { cmd: "scp file.txt user@host:/path", desc: "Copy a file to a server" },
      { cmd: "rsync -avz src/ user@host:/path", desc: "Sync a folder to a server" },
      { cmd: "sha256sum file.iso", desc: "Verify a file checksum" },
      { cmd: "ln -s <target> <link>", desc: "Create a symbolic link" },
    ],
  },

  /* ===================== SHELL & ENVIRONMENT ===================== */
  {
    category: "Shell & Environment",
    shell: "Bash",
    commands: [
      { cmd: "echo $PATH", desc: "Show the PATH variable" },
      { cmd: "export NAME=value", desc: "Set a variable for this session" },
      { cmd: "nano ~/.bashrc", desc: "Edit shell startup settings" },
      { cmd: "source ~/.bashrc", desc: "Reload shell settings" },
      { cmd: "alias ll='ls -la'", desc: "Create a command shortcut" },
      { cmd: "history", desc: "Show command history" },
      { cmd: "which <command>", desc: "Show where a command lives" },
      { cmd: "sudo service <name> start", desc: "Start a service (e.g. postgresql)" },
    ],
  },
];

export const TERMINAL_SHORTCUTS = [
  { keys: "Tab", desc: "Autocomplete commands and paths" },
  { keys: "Ctrl + C", desc: "Cancel the running command" },
  { keys: "Ctrl + R", desc: "Search command history" },
  { keys: "Ctrl + L", desc: "Clear the screen" },
  { keys: "Ctrl + A / E", desc: "Jump to start / end of line" },
  { keys: "Ctrl + U", desc: "Delete to start of line" },
  { keys: "!!", desc: "Repeat the last command (e.g. sudo !!)" },
  { keys: "↑ / ↓", desc: "Browse previous commands" },
];
