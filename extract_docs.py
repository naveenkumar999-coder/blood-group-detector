import os

def collect_source_code():
    output_file = "source_code_documentation.md"
    
    # Define directories and file extensions to include
    include_dirs = ["src", "backend"]
    include_exts = [".js", ".jsx", ".py", ".css", ".html"]
    
    # Also include files from root
    root_files = ["index.html", "vite.config.js", "eslint.config.js", "package.json"]
    
    with open(output_file, 'w', encoding='utf-8') as outfile:
        outfile.write("# Blood Group Detector Source Code\\n\\n")
        
        # Write root files
        for filename in root_files:
            if os.path.exists(filename):
                outfile.write(f"## {filename}\\n\\n")
                ext = filename.split('.')[-1]
                language_map = {'js': 'javascript', 'jsx': 'jsx', 'json': 'json', 'html': 'html', 'css': 'css', 'py': 'python'}
                lang = language_map.get(ext, 'text')
                outfile.write(f"```{lang}\\n")
                with open(filename, 'r', encoding='utf-8') as infile:
                    outfile.write(infile.read())
                outfile.write("\\n```\\n\\n")
                
        # Write files from directories
        for d in include_dirs:
            for root, _, files in os.walk(d):
                for file in files:
                    if any(file.endswith(ext) for ext in include_exts):
                        filepath = os.path.join(root, file)
                        # Normalize path for display
                        display_path = filepath.replace('\\\\', '/')
                        outfile.write(f"## {display_path}\\n\\n")
                        ext = file.split('.')[-1]
                        language_map = {'js': 'javascript', 'jsx': 'jsx', 'html': 'html', 'css': 'css', 'py': 'python'}
                        lang = language_map.get(ext, 'text')
                        outfile.write(f"```{lang}\\n")
                        try:
                            with open(filepath, 'r', encoding='utf-8') as infile:
                                outfile.write(infile.read())
                        except Exception as e:
                            outfile.write(f"Error reading file: {e}")
                        outfile.write("\\n```\\n\\n")

if __name__ == "__main__":
    collect_source_code()
    print("Source code successfully collected into source_code_documentation.md")
