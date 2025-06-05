# run.py
import os
from app import create_app

# create_app is defined in app/__init__.py
app = create_app(os.getenv('FLASK_CONFIG', 'default'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
