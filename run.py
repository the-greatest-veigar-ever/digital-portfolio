import os
from flask import Flask
from config.config import config

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config['default'])

    from app.routes import main
    app.register_blueprint(main)

    return app

if __name__ == '__main__':
    app = create_app(os.getenv('FLASK_CONFIG', 'default'))
    app.run(host='0.0.0.0', port=5001, debug=True)