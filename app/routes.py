from flask import Blueprint, render_template, jsonify
import json
import os
from datetime import datetime

main = Blueprint('main', __name__)


def load_json_data(filename):
    """Load data from JSON file"""
    file_path = os.path.join('app', 'static', 'data', filename)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}


@main.route('/')
def index():
    """Main portfolio page"""
    # Load all data
    personal_data = load_json_data('personal.json')
    projects_data = load_json_data('projects.json')
    skills_data = load_json_data('skills.json')
    achievements_data = load_json_data('achievements.json')
    experience_data = load_json_data('experience.json')

    return render_template('index.html',
                           personal=personal_data,
                           projects=projects_data,
                           skills=skills_data,
                           achievements=achievements_data,
                           experience=experience_data,
                           current_year=datetime.now().year)


@main.route('/api/achievements')
def get_achievements():
    """API endpoint to get achievements data"""
    return jsonify(load_json_data('achievements.json'))


@main.route('/api/projects')
def get_projects():
    """API endpoint to get projects data"""
    return jsonify(load_json_data('projects.json'))


@main.route('/api/skills')
def get_skills():
    """API endpoint to get skills data"""
    return jsonify(load_json_data('skills.json'))