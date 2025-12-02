import React, { useState, useEffect, useCallback } from 'react';
import { getAllProjects, deleteProject } from '../services/projectService';
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import Spinner from "../components/Spinner";
import "../assets/styles/Projects.css";
import { useAuth } from "../context/AuthContext";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  // Memoized fetchProjects function
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      // if not authenticated, don't call protected API
      if (!user) {
        setProjects([]);
        setError(null);
        return;
      }

      const response = await getAllProjects();

      if (!response || !response.data) {
        throw new Error('Invalid response format');
      }

      setProjects(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError(error.message || "Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Add useEffect to fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects, user]);

  const handleAddClick = () => {
    setEditProject(null);
    setShowForm(true);
  };

  const handleEditClick = (project) => {
    setEditProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchProjects(); // Refresh projects after form close
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      await fetchProjects(); // Refresh the list after deletion
    } catch (error) {
      console.error("Failed to delete project:", error);
      setError("Failed to delete project");
    }
  };

  // if (loading) {
  //   return (
  //     <div className="spinner-container">
  //       <Spinner />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="error-container">
  //       <p className="error-message">{error}</p>
  //       <button className='error-button' onClick={fetchProjects}>Retry</button>
  //     </div>
  //   );
  // }

  return (
    <div className="project-page">
      <div className="page-header">
        <div className="header-info">
          <h1 className="page-title">Projects</h1>
          <p className="page-description">
            Explore some of my recent work — from web apps to full-stack projects.
          </p>
        </div>
        <button className="add-project-btn" onClick={handleAddClick}>
          + Add New Project
        </button>
      </div>

      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className='error-button' onClick={fetchProjects}>Retry</button>
        </div>
      )}

      {!user && !loading ? (
        <div className="no-auth">
          <p>Please sign in to view your projects.</p>
          <button onClick={() => { try { localStorage.removeItem('seenAnimatedLogin'); } catch(e){}; window.location.href = '/'; }}>Sign in</button>
        </div>
      ) : loading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEditClick}
                onDelete={handleDeleteProject}
              />
            ))
          ) : (
            <p className="no-projects-text">No projects found. Add one to get started!</p>
          )}
        </div>
      )}
      {showForm && (
        <ProjectForm
          onClose={handleCloseForm}
          project={editProject}
          onSubmitSuccess={handleCloseForm}
        />
      )}
    </div>
  );
}

export default Projects;