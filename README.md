# 🌟 Modern Portfolio Website

A stunning, modern portfolio website built with Flask, featuring a green-jade glassmorphism design. Perfect for IT professionals, developers, and tech enthusiasts.

![Portfolio Preview](app/static/images/portfolio-preview.png)

## ✨ Features

- **🎨 Modern Glassmorphism Design** - Beautiful green-jade theme with glass effects
- **📱 Fully Responsive** - Works perfectly on all devices
- **🚀 Fast Performance** - Optimized for speed and user experience
- **🔧 Easy Content Management** - Update content via JSON files
- **💫 Smooth Animations** - Eye-catching animations and transitions
- **🎯 SEO Optimized** - Built with SEO best practices
- **🌐 Modern Technologies** - Flask, HTML5, CSS3, JavaScript ES6+

## 🛠 Tech Stack

- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript
- **Design**: Glassmorphism, CSS Grid, Flexbox
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## 🚀 Quick Start

### Prerequisites

- Python 3.7 or higher
- Git (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Create .env file
   echo "FLASK_DEBUG=True" > .env
   echo "SECRET_KEY=your-secret-key-here" >> .env
   ```

5. **Run the application**
   ```bash
   python run.py
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
portfolio-website/
├── app/
│   ├── __init__.py
│   ├── routes.py
│   ├── models.py
│   ├── static/
│   │   ├── css/
│   │   │   ├── main.css
│   │   │   ├── components.css
│   │   │   └── glassmorphism.css
│   │   ├── js/
│   │   │   ├── main.js
│   │   │   └── animations.js
│   │   ├── images/
│   │   │   ├── projects/
│   │   │   ├── achievements/
│   │   │   └── icons/
│   │   └── data/
│   │       ├── personal.json
│   │       ├── projects.json
│   │       ├── skills.json
│   │       ├── achievements.json
│   │       └── experience.json
│   └── templates/
│       ├── base.html
│       ├── index.html
│       └── components/
├── config/
│   └── config.py
├── tests/
├── .env
├── .gitignore
├── README.md
├── requirements.txt
└── run.py
```

## 🎨 Customization

### 1. Personal Information
Edit `app/static/data/personal.json`:
```json
{
  "name": "Your Name",
  "title": "Full Stack Developer",
  "tagline": "Crafting innovative solutions with modern technology",
  "bio": "Your bio here...",
  "location": "Your Location",
  "email": "your.email@example.com",
  "phone": "+1 234 567 8901",
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "twitter": "https://twitter.com/yourhandle"
  },
  "resume_url": "/static/files/resume.pdf",
  "profile_image": "/static/images/profile.jpg"
}
```

### 2. Skills
Update `app/static/data/skills.json`:
```json
{
  "categories": [
    {
      "name": "Frontend",
      "skills": [
        {"name": "React", "level": 90, "icon": "⚛️"},
        {"name": "Vue.js", "level": 85, "icon": "🟢"}
      ]
    }
  ]
}
```

### 3. Projects
Modify `app/static/data/projects.json`:
```json
{
  "projects": [
    {
      "id": 1,
      "title": "Project Name",
      "description": "Project description",
      "image": "/static/images/projects/project1.jpg",
      "technologies": ["React", "Node.js", "MongoDB"],
      "github_url": "https://github.com/user/project",
      "live_url": "https://project-demo.com",
      "status": "completed",
      "date": "2024-03"
    }
  ]
}
```

### 4. Achievements
Edit `app/static/data/achievements.json`:
```json
{
  "achievements": [
    {
      "id": 1,
      "title": "Award Name",
      "organization": "Organization",
      "date": "2024-04",
      "description": "Description of achievement",
      "category": "competition",
      "icon": "🏆"
    }
  ]
}
```

### 5. Experience
Update `app/static/data/experience.json` with your work history and education.

## 🎨 Design Customization

### Color Scheme
The website uses a green-jade color palette. To change colors, modify the CSS variables in `app/static/css/glassmorphism.css`:

```css
:root {
  --jade-primary: #10B981;
  --jade-secondary: #059669;
  --jade-light: #34D399;
  --jade-dark: #047857;
  --jade-accent: #6EE7B7;
}
```

### Typography
Change fonts by updating the Google Fonts import in `app/static/css/main.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700;800&display=swap');
```

## 📸 Adding Images

1. **Profile Image**: Add your photo as `app/static/images/profile.jpg`
2. **Project Images**: Add project screenshots to `app/static/images/projects/`
3. **Achievement Images**: Add certificates/awards to `app/static/images/achievements/`

## 🚀 Deployment

### Heroku Deployment

1. **Install Heroku CLI**
2. **Create Heroku app**
   ```bash
   heroku create your-portfolio-name
   ```

3. **Add Procfile**
   ```bash
   echo "web: python run.py" > Procfile
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

### Netlify Deployment (Static Export)

1. Generate static files
2. Upload `dist/` folder to Netlify

### VPS Deployment

1. **Install dependencies on server**
2. **Set up Nginx reverse proxy**
3. **Use Gunicorn for production**
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:8000 run:app
   ```

## 🔧 Development

### Adding New Sections

1. **Create template component** in `app/templates/components/`
2. **Add styles** in `app/static/css/components.css`
3. **Include in main template** `app/templates/index.html`
4. **Add data file** in `app/static/data/` if needed

### Adding New Routes

1. **Add route** in `app/routes.py`
2. **Create template** in `app/templates/`
3. **Add navigation link** if needed

## 🧪 Testing

Run tests with:
```bash
python -m pytest tests/
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you have any questions or need help customizing your portfolio:

- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/portfolio/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/portfolio/discussions)

## 🎯 Roadmap

- [ ] Dark/Light theme toggle
- [ ] Blog integration
- [ ] Contact form backend
- [ ] Multi-language support
- [ ] Performance analytics
- [ ] PWA features

## 📊 Performance

- **Lighthouse Score**: 95+
- **Load Time**: < 2s
- **Mobile Friendly**: ✅
- **SEO Optimized**: ✅

---

**Built with ❤️ using Flask and modern web technologies**