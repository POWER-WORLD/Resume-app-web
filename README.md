# 📄 Resume App

A full-stack web application to create, manage, and showcase professional resumes built with React and Node.js.

---

## 🖼️ Screenshots

![Screenshot 1](client/public/screenshots/Screenshot%202025-10-25%20123938.png)

![Screenshot 2](client/public/screenshots/Screenshot%202025-10-25%20124039.png)

![Screenshot 3](client/public/screenshots/Screenshot%202025-10-25%20124134.png)

![Screenshot 4](client/public/screenshots/Screenshot%202025-10-25%20124200.png)

![Screenshot 5](client/public/screenshots/Screenshot%202025-10-25%20124230.png)

![Screenshot 6](client/public/screenshots/Screenshot%202025-10-27%20215644.png)

![Screenshot 7](client/public/screenshots/Screenshot%202025-10-27%20220113.png)

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm

### Installation

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Running the App

```bash
# Start the client
cd client
npm start

# Start the server
cd server
npm start
```

---

## 🛠️ Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB

---

## 📁 Project Structure

- **client/src/components/**: Contains all major UI components (Navbar, Footer, Auth, Cards, Forms, etc.)
- **client/src/context/**: Provides authentication and theme context for the app.
- **client/src/services/**: Handles API requests and authentication logic.
- **server/controllers/**: Implements business logic for each resource (auth, experience, project, skill, stats).
- **server/routes/**: Defines RESTful API endpoints for each resource.
- **server/middlewares/**: Includes authentication and validation middleware for secure API access.
- **server/models/**: Mongoose schemas for MongoDB collections (User, Experience, Project, Skill).

---

## ✨ Main Features

- **User Authentication**: Register, login, and JWT-based session management.
- **Role Support**: User roles for access control (e.g., admin, user).
- **Resume Builder**: Add, edit, and delete work experience, skills, and projects.
- **Project & Skill Management**: CRUD operations for projects and skills.
- **Statistics Dashboard**: View statistics about your resume content.
- **Responsive UI**: Modern, mobile-friendly design with light/dark theme toggle.
- **Animated Auth**: Engaging animated authentication experience.
- **API Security**: All sensitive routes protected by JWT authentication middleware.
- **Validation**: Robust input validation on both client and server.
- **Deployment Ready**: Configured for deployment on Netlify (frontend) and Render/Railway (backend).

---

## 🔒 Authentication & Authorization

- **JWT Auth**: All protected API routes require a valid JWT token in the `Authorization` header.
- **Auth Middleware**: Verifies token and attaches user info to requests.
- **Register/Login**: Endpoints for user registration and login. Passwords are hashed with bcrypt.
- **Role-based Access**: User roles can be leveraged for admin-only features.

---

## 🧩 API Endpoints Overview

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/auth/verify` — Verify token (protected)

### Projects

- `POST /api/projects/` — Create project (auth required)
- `GET /api/projects/` — List all projects (auth required)
- `GET /api/projects/:id` — Get project by ID (auth required)
- `PUT /api/projects/:id` — Update project (auth required)
- `DELETE /api/projects/:id` — Delete project (auth required)

### Skills

- `POST /api/skills/` — Create skill (auth required)
- `GET /api/skills/` — List all skills (auth required)
- `GET /api/skills/:id` — Get skill by ID (auth required)
- `PUT /api/skills/:id` — Update skill (auth required)
- `DELETE /api/skills/:id` — Delete skill (auth required)

### Experience

- `POST /api/experiences/` — Create experience (auth required)
- `GET /api/experiences/` — List all experiences (auth required)
- `GET /api/experiences/:id` — Get experience by ID (auth required)
- `PUT /api/experiences/:id` — Update experience (auth required)
- `DELETE /api/experiences/:id` — Delete experience (auth required)

### Statistics

- `GET /api/stats/` — Get resume statistics (auth required)

---

## 🏗️ Example API Request (using fetch)

```js
// Example: Login
fetch('https://resumeappfirstone.onrender.com/api/auth/login', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ email: 'user@example.com', password: 'yourpassword' })
})
	.then(res => res.json())
	.then(data => console.log(data));
```

---

## 🖥️ Frontend Overview

- **React SPA**: Uses React Router for navigation between Home, About, Projects, Skills, Work Experience, etc.
- **Context API**: Auth and Theme context for global state management.
- **Reusable Components**: Cards, Forms, Navbar, Footer, Spinner, etc.
- **Animated Auth**: Custom animated login/register experience.
- **API Integration**: Uses Axios for HTTP requests to backend API.
- **Form Validation**: Client-side validation for all forms.
- **Screenshots**: See above for UI previews.

---

## 🗄️ Backend Overview

- **Express.js REST API**: Modular route/controller structure.
- **MongoDB**: Mongoose ODM for schema and data modeling.
- **Authentication**: JWT-based, with middleware for route protection.
- **Validation**: Custom middleware for validating experience, project, and skill data.
- **Statistics**: API endpoint for resume stats (e.g., total projects, skills, experiences).

---

## ⚙️ Customization & Deployment

- **Environment Variables**: Configure MongoDB URI, JWT secret, and port in `server/configs/configenv.js` or via environment variables.
- **Frontend Base URL**: Set API base URL in `client/src/services/api.js` for local or production use.
- **Deployment**: Frontend deployable to Netlify; backend to Render, Railway, or similar.

---

## 🧪 Testing & Validation

- **Manual Testing**: Test all CRUD operations and authentication via the UI or API tools (Postman, Insomnia).
- **Validation**: Both client and server validate input data for all forms and API requests.

---

## 📚 Example Usage Scenarios

1. **Create a Resume**: Register, login, and add your work experience, skills, and projects. View and edit your resume sections.
2. **Showcase Projects**: Add detailed project entries with descriptions, links, and technologies used.
3. **Track Progress**: Use the statistics dashboard to see your resume's completeness and highlights.
4. **Switch Themes**: Toggle between light and dark mode for a personalized look.

---

## 📝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features.

---

## 📄 License

This project is licensed under the MIT License.
