import re

def replace_in_file(file_path):
    print(f"Processing {file_path}...")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replaces rgba(57, 255, 20, ...) with rgba(168, 85, 247, ...)
    # Handles potential variations in whitespace
    pattern = r'57,\s*255,\s*20'
    modified_content = re.sub(pattern, '168, 85, 247', content)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(modified_content)
    print(f"Finished {file_path}!")

if __name__ == "__main__":
    replace_in_file("presentation.css")
    replace_in_file("index.html")
