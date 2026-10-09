import os

files_to_include = [
    r"c:\Users\Boddupalli\OneDrive\Desktop\文件\Desktop\blood-group-detector\src\App.jsx",
    r"c:\Users\Boddupalli\OneDrive\Desktop\文件\Desktop\blood-group-detector\src\pages\Dashboard.jsx",
    r"c:\Users\Boddupalli\OneDrive\Desktop\文件\Desktop\blood-group-detector\src\pages\LoginPage.jsx",
    r"c:\Users\Boddupalli\OneDrive\Desktop\文件\Desktop\blood-group-detector\src\pages\DatasetPage.jsx",
    r"c:\Users\Boddupalli\OneDrive\Desktop\文件\Desktop\blood-group-detector\backend\auth_server.py"
]

output_path = r"C:\Users\Boddupalli\.gemini\antigravity\brain\5085586f-4bd6-4c98-8225-7a5789031038\core_source_code.md"

with open(output_path, "w", encoding="utf-8") as f:
    f.write("# Core Source Code\n\nThis document contains the main frontend and backend source files of the Blood Group Detector application.\n\n")
    for file_path in files_to_include:
        f.write(f"## `{os.path.basename(file_path)}`\n")
        f.write(f"Path: `{file_path}`\n\n")
        ext = os.path.splitext(file_path)[1][1:]
        if ext == 'jsx':
            ext = 'jsx'
        elif ext == 'py':
            ext = 'python'
        f.write(f"```{ext}\n")
        try:
            with open(file_path, "r", encoding="utf-8") as inf:
                f.write(inf.read())
        except Exception as e:
            f.write(f"// Error reading file: {e}\n")
        f.write("\n```\n\n")
