# E-Waste Management Chatbot

This directory contains the ML model and chatbot implementation for the E-Waste Management System.

## Directory Structure
- `ML_model/` - Contains the chatbot implementation and trained models
- `E-waste-dataset/` - Contains training data and QA databases

## Key Files
- `ML_model/chatbot.py` - Main chatbot implementation
- `ML_model/ewaste_model.pth` - Trained model weights
- `ML_model/ewaste_classifier.py` - Classification model
- `ML_model/qa_database.json` - Question-Answer database
- `ML_model/multilingual_qa_database.json` - Multilingual QA database

## Setup Instructions
1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the chatbot:
   ```bash
   python ML_model/chatbot.py
   ```

## Dependencies
- Python 3.x
- PyTorch
- NLTK
- Other dependencies listed in requirements.txt 