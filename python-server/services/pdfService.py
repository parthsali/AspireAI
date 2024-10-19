import pdfplumber

def extract_text_from_pdf(pdf_path):
    # Open the PDF file
    with pdfplumber.open(pdf_path) as pdf:
        # Initialize a string to store all extracted text
        all_text = ""
        
        # Loop through all the pages in the PDF
        for page_index, page in enumerate(pdf.pages):
            # Extract text from the current page
            page_text = page.extract_text()
            if page_text:  # Check if there's any text on the page
                all_text += page_text
            

    # Save the extracted text to a .txt file
    return all_text

\
