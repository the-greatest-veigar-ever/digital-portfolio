from flask import Flask
from config.config import config


def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    from app.routes import main
    app.register_blueprint(main)

    return app