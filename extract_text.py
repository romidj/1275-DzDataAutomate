import pypdf

def extract_pdf_text(pdf_path, txt_path):
    print(f"Reading {pdf_path}...")
    reader = pypdf.PdfReader(pdf_path)
    num_pages = len(reader.pages)
    print(f"Total pages: {num_pages}")
    
    with open(txt_path, "w", encoding="utf-8") as f:
        for i in range(num_pages):
            page = reader.pages[i]
            text = page.extract_text()
            f.write(f"--- PAGE {i+1} ---\n")
            f.write(text)
            f.write("\n\n")
    print(f"Extraction complete! Text saved to {txt_path}")

if __name__ == "__main__":
    extract_pdf_text("1275_BENOUDJIT_CHIKHI_DJOUZI_IA&DS.pdf", "memoire_text.txt")
