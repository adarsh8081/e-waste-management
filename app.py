from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS
from ML_model.chatbot import MultilingualEWasteChatbot
from ML_model.ewaste_classifier import EWasteClassifier
import os
from werkzeug.utils import secure_filename
import threading
import base64
import json
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
CHAT_HISTORY_FOLDER = 'chat_history'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CHAT_HISTORY_FOLDER'] = CHAT_HISTORY_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Create required folders
for folder in [UPLOAD_FOLDER, CHAT_HISTORY_FOLDER]:
    if not os.path.exists(folder):
        try:
            os.makedirs(folder)
        except Exception as e:
            print(f"Error creating folder {folder}: {str(e)}")
            raise

# Initialize components in background thread
chatbot = None
classifier = None
initialization_error = None

def initialize_components():
    global chatbot, classifier, initialization_error
    try:
        print("Initializing chatbot...")
        chatbot = MultilingualEWasteChatbot()
        
        print("Initializing classifier...")
        classifier = EWasteClassifier()
        
        print("Components initialized successfully!")
    except Exception as e:
        initialization_error = str(e)
        print(f"Error during initialization: {str(e)}")

# Start initialization in background
init_thread = threading.Thread(target=initialize_components)
init_thread.daemon = True
init_thread.start()

# Chat history management
class ChatHistory:
    def __init__(self):
        self.chats = {}
        self.load_chats()

    def load_chats(self):
        """Load existing chats from storage"""
        try:
            history_file = os.path.join(CHAT_HISTORY_FOLDER, 'chat_history.json')
            if os.path.exists(history_file):
                with open(history_file, 'r') as f:
                    self.chats = json.load(f)
        except Exception as e:
            print(f"Error loading chat history: {str(e)}")
            self.chats = {}

    def save_chats(self):
        """Save chats to storage"""
        try:
            history_file = os.path.join(CHAT_HISTORY_FOLDER, 'chat_history.json')
            with open(history_file, 'w') as f:
                json.dump(self.chats, f)
        except Exception as e:
            print(f"Error saving chat history: {str(e)}")

    def create_chat(self, name=None):
        """Create a new chat"""
        chat_id = str(uuid.uuid4())
        timestamp = datetime.now().isoformat()
        self.chats[chat_id] = {
            'id': chat_id,
            'name': name or f"Chat {len(self.chats) + 1}",
            'messages': [],
            'created_at': timestamp,
            'updated_at': timestamp
        }
        self.save_chats()
        return chat_id

    def add_message(self, chat_id, message, response):
        """Add a message to a chat"""
        if chat_id not in self.chats:
            chat_id = self.create_chat()
        
        timestamp = datetime.now().isoformat()
        self.chats[chat_id]['messages'].append({
            'user_message': message,
            'bot_response': response,
            'timestamp': timestamp
        })
        self.chats[chat_id]['updated_at'] = timestamp
        self.save_chats()

    def rename_chat(self, chat_id, new_name):
        """Rename a chat"""
        if chat_id in self.chats:
            self.chats[chat_id]['name'] = new_name
            self.chats[chat_id]['updated_at'] = datetime.now().isoformat()
            self.save_chats()
            return True
        return False

    def delete_chat(self, chat_id):
        """Delete a chat"""
        if chat_id in self.chats:
            del self.chats[chat_id]
            self.save_chats()
            return True
        return False

    def get_chat(self, chat_id):
        """Get a specific chat"""
        return self.chats.get(chat_id)

    def get_all_chats(self):
        """Get all chats"""
        return [{
            'id': chat_id,
            'name': chat['name'],
            'created_at': chat['created_at'],
            'updated_at': chat['updated_at'],
            'message_count': len(chat['messages'])
        } for chat_id, chat in self.chats.items()]

# Initialize chat history
chat_history = ChatHistory()

def allowed_file(filename):
    """Validate file extensions"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_chat_request(data):
    """Validate the chat request data"""
    if not isinstance(data, dict):
        return False, "Invalid request format"
    if 'message' not in data:
        return False, "No message provided"
    if not isinstance(data['message'], str):
        return False, "Message must be a string"
    if not data['message'].strip():
        return False, "Message cannot be empty"
    return True, None

def validate_image_path(image_path):
    """Validate if an image path exists and is accessible"""
    if not os.path.exists(image_path):
        return False
    try:
        with open(image_path, 'rb') as _:
            return True
    except:
        return False

def check_initialization():
    """Check if components are initialized"""
    if initialization_error:
        return False, f"Initialization failed: {initialization_error}"
    if not chatbot or not classifier:
        return False, "Components are still initializing..."
    return True, None

@app.route('/')
def home():
    try:
        return render_template('index.html')
    except Exception as e:
        print(f"Error rendering template: {str(e)}")
        return jsonify({'error': 'Internal server error', 'success': False}), 500

@app.route('/api/status')
def get_status():
    """Get initialization status"""
    initialized, error = check_initialization()
    return jsonify({
        'initialized': initialized,
        'error': error,
        'success': True
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    print("Received chat request")
    
    # Check initialization
    initialized, error = check_initialization()
    if not initialized:
        return jsonify({
            'error': error,
            'success': False
        }), 503  # Service Unavailable
    
    try:
        # Validate request has JSON data
        if not request.is_json:
            return jsonify({
                'error': 'Request must be JSON',
                'success': False
            }), 400

        try:
            data = request.get_json()
        except json.JSONDecodeError:
            return jsonify({
                'error': 'Invalid JSON format',
                'success': False
            }), 400

        # Validate chat request data
        is_valid, error_message = validate_chat_request(data)
        if not is_valid:
            return jsonify({
                'error': error_message,
                'success': False
            }), 400

        # Get or create chat_id
        chat_id = data.get('chat_id')
        if not chat_id:
            chat_id = chat_history.create_chat()

        # Generate response using chatbot
        print("Generating response...")
        response = chatbot.generate_response(data['message'])
        print(f"Generated response type: {type(response)}")

        # Save to chat history
        chat_history.add_message(chat_id, data['message'], response)

        # Handle image response
        if isinstance(response, dict) and response.get('type') == 'image_response':
            images = []
            for img in response.get('images', []):
                if not isinstance(img, dict) or 'path' not in img:
                    continue

                if not validate_image_path(img['path']):
                    print(f"Image not found or inaccessible: {img['path']}")
                    continue

                try:
                    with open(img['path'], 'rb') as image_file:
                        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
                        images.append({
                            'data': f"data:image/jpeg;base64,{encoded_image}",
                            'caption': img.get('caption', 'E-waste image')
                        })
                except Exception as e:
                    print(f"Error processing image {img['path']}: {str(e)}")
                    continue

            if not images:
                return jsonify({
                    'error': 'No valid images available',
                    'success': False
                }), 404

            return jsonify({
                'type': 'image_response',
                'images': images,
                'chat_id': chat_id,
                'success': True
            })

        # Handle text response
        if not isinstance(response, str):
            return jsonify({
                'error': 'Invalid response from chatbot',
                'success': False
            }), 500

        return jsonify({
            'response': response,
            'chat_id': chat_id,
            'success': True
        })

    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'error': 'An error occurred while processing your request',
            'success': False
        }), 500

@app.route('/api/languages', methods=['GET'])
def get_languages():
    try:
        return jsonify({
            'languages': chatbot.supported_languages,
            'current_language': chatbot.preferred_language,
            'success': True
        })
    except Exception as e:
        print(f"Error getting languages: {str(e)}")
        return jsonify({
            'error': 'Failed to get language information',
            'success': False
        }), 500

@app.route('/api/analyze-image', methods=['POST'])
def analyze_image():
    try:
        if 'image' not in request.files:
            return jsonify({'success': False, 'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'success': False, 'error': 'No selected file'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'success': False, 'error': 'Invalid file type. Allowed types: ' + ', '.join(ALLOWED_EXTENSIONS)}), 400
        
        # Save and process the file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        try:
            file.save(filepath)
            
            # Analyze the image
            result = classifier.classify_image(filepath)
            
            return jsonify(result)
            
        except Exception as e:
            print(f"Error processing image: {str(e)}")
            return jsonify({'success': False, 'error': 'Failed to process image'}), 500
            
        finally:
            # Clean up the temporary file
            if os.path.exists(filepath):
                try:
                    os.remove(filepath)
                except Exception as e:
                    print(f"Error removing temporary file: {str(e)}")
                    
    except Exception as e:
        print(f"Error in analyze-image endpoint: {str(e)}")
        return jsonify({'success': False, 'error': 'An error occurred while processing your request'}), 500

@app.route('/api/dataset-info', methods=['GET'])
def get_dataset_info():
    """Return information about the available e-waste categories and dataset."""
    try:
        return jsonify({
            'data': classifier.get_dataset_info(),
            'success': True
        })
    except Exception as e:
        print(f"Error getting dataset info: {str(e)}")
        return jsonify({
            'error': 'Failed to get dataset information',
            'success': False
        }), 500

@app.errorhandler(413)
def request_entity_too_large(error):
    return jsonify({
        'error': f'File too large. Maximum size is {MAX_CONTENT_LENGTH/(1024*1024)}MB',
        'success': False
    }), 413

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal server error',
        'success': False
    }), 500

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({
        'error': 'Resource not found',
        'success': False
    }), 404

# Chat history management routes
@app.route('/api/chats', methods=['GET'])
def get_chats():
    """Get all chats"""
    try:
        return jsonify({
            'chats': chat_history.get_all_chats(),
            'success': True
        })
    except Exception as e:
        print(f"Error getting chats: {str(e)}")
        return jsonify({
            'error': 'Failed to get chats',
            'success': False
        }), 500

@app.route('/api/chats/<chat_id>', methods=['GET'])
def get_chat(chat_id):
    """Get a specific chat"""
    try:
        chat = chat_history.get_chat(chat_id)
        if chat:
            return jsonify({
                'chat': chat,
                'success': True
            })
        return jsonify({
            'error': 'Chat not found',
            'success': False
        }), 404
    except Exception as e:
        print(f"Error getting chat: {str(e)}")
        return jsonify({
            'error': 'Failed to get chat',
            'success': False
        }), 500

@app.route('/api/chats/<chat_id>/rename', methods=['POST'])
def rename_chat(chat_id):
    """Rename a chat"""
    try:
        if not request.is_json:
            return jsonify({
                'error': 'Request must be JSON',
                'success': False
            }), 400

        data = request.get_json()
        new_name = data.get('name')
        if not new_name:
            return jsonify({
                'error': 'New name not provided',
                'success': False
            }), 400

        if chat_history.rename_chat(chat_id, new_name):
            return jsonify({
                'success': True,
                'message': 'Chat renamed successfully'
            })
        return jsonify({
            'error': 'Chat not found',
            'success': False
        }), 404
    except Exception as e:
        print(f"Error renaming chat: {str(e)}")
        return jsonify({
            'error': 'Failed to rename chat',
            'success': False
        }), 500

@app.route('/api/chats/<chat_id>', methods=['DELETE'])
def delete_chat(chat_id):
    """Delete a chat"""
    try:
        if chat_history.delete_chat(chat_id):
            return jsonify({
                'success': True,
                'message': 'Chat deleted successfully'
            })
        return jsonify({
            'error': 'Chat not found',
            'success': False
        }), 404
    except Exception as e:
        print(f"Error deleting chat: {str(e)}")
        return jsonify({
            'error': 'Failed to delete chat',
            'success': False
        }), 500

@app.route('/api/chats/<chat_id>/share', methods=['GET'])
def share_chat(chat_id):
    """Generate a shareable version of the chat"""
    try:
        chat = chat_history.get_chat(chat_id)
        if not chat:
            return jsonify({
                'error': 'Chat not found',
                'success': False
            }), 404

        # Generate a formatted version of the chat
        formatted_chat = {
            'name': chat['name'],
            'created_at': chat['created_at'],
            'messages': chat['messages']
        }

        return jsonify({
            'chat': formatted_chat,
            'success': True
        })
    except Exception as e:
        print(f"Error sharing chat: {str(e)}")
        return jsonify({
            'error': 'Failed to share chat',
            'success': False
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 