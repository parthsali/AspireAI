from pypdf import PdfReader

def extract_text_from_pdf(pdf_path):
    # Open the PDF file
    with open(pdf_path, 'rb') as file:
        reader = PdfReader(file)
        
        # Initialize a string to store all extracted text
        all_text = ""
        
        # Loop through all the pages in the PDF
        for page in reader.pages:
            # Extract text from the current page
            page_text = page.extract_text()
            if page_text:  # Check if there's any text on the page
                all_text += page_text

    # Save the extracted text to a .txt file (optional)

    return all_text